import ApiService from "../ApiService";
import { FactCheckResponse, FactCheckResultResponse } from "./FactType";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface CacheItem {
  result: FactCheckResultResponse;
  timestamp: number;
}

class Cache {
  private cache: Map<string, CacheItem>;
  private readonly CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  constructor() {
    this.cache = new Map();
    this.loadFromLocalStorage();
  }

  set(key: string, value: FactCheckResultResponse): void {
    const item: CacheItem = { result: value, timestamp: Date.now() };
    this.cache.set(key, item);
    this.saveToLocalStorage();
  }

  get(key: string): FactCheckResultResponse | null {
    const item = this.cache.get(key);
    if (item && Date.now() - item.timestamp < this.CACHE_EXPIRY) {
      return item.result;
    }
    if (item) {
      this.cache.delete(key);
      this.saveToLocalStorage();
    }
    return null;
  }

  private loadFromLocalStorage(): void {
    const savedCache = localStorage.getItem('factCheckCache');
    if (savedCache) {
      const parsedCache = JSON.parse(savedCache);
      this.cache = new Map(Object.entries(parsedCache));
    }
  }

  private saveToLocalStorage(): void {
    const cacheObj = Object.fromEntries(this.cache);
    localStorage.setItem('factCheckCache', JSON.stringify(cacheObj));
  }
}

const cache = new Cache();

export const FactCheckingService = {
  async checkFact(input_statement: string): Promise<FactCheckResponse> {

    const response = await ApiService.post<FactCheckResponse>(
      "/api/send-fact-check-task",
      { input_statement }
    );

    // Store the input_statement along with the task_id
    localStorage.setItem(`input_statement_${response.data.task_id}`, input_statement);

    return response.data;
  },

  async getFactCheckResult(
    task_id: string,
    onUpdate: (result: FactCheckResultResponse) => void,
    maxAttempts: number = 10,
    sleepInterval: number = 5000
  ): Promise<{ factCheckOutputDict: FactCheckResultResponse; timeTaken: number }> {
    // Retrieve the input_statement associated with this task_id
    const input_statement = localStorage.getItem(`input_statement_${task_id}`);

    // Check cache first using task_id or input_statement
    const cachedResult = cache.get(task_id) || (input_statement ? cache.get(input_statement) : null);
    if (cachedResult) {
      console.log("Returning cached result for:", task_id || input_statement);
      return {
        factCheckOutputDict: cachedResult,
        timeTaken: 0, // Cached result, so time taken is 0
      };
    }

    const startTime = Date.now();
    let factCheckOutputDict: FactCheckResultResponse | null = null;

    try {
      for (let i = 0; i < maxAttempts; i++) {
        console.log(`Checking if job is completed: ${i + 1}/${maxAttempts}`);

        try {
          const response = await ApiService.post<FactCheckResultResponse>(`/api/get-fact-check-results`, {
            task_id,
          });

          factCheckOutputDict = response.data;

          console.log(`Results received:`, factCheckOutputDict);

          // Call the onUpdate callback with the latest results
          onUpdate(factCheckOutputDict);

          // Check if results are ready, return immediately if true
          if (factCheckOutputDict.can_show_results === true) {
            console.log("Job completed, results are ready. Exiting loop.");
            const endTime = Date.now();
            const elapsedTime = (endTime - startTime) / 1000;

            // Cache the result using both task_id and input_statement (if available)
            cache.set(task_id, factCheckOutputDict);
            if (input_statement) {
              cache.set(input_statement, factCheckOutputDict);
            }

            return {
              factCheckOutputDict,
              timeTaken: elapsedTime,
            };
          }
        } catch (error: any) {
          console.error("Error fetching fact-check results:", error.message);
        }

        // Only delay if results are not ready
        if (factCheckOutputDict?.can_show_results === false) {
          console.log("Results not ready, waiting before the next attempt...", factCheckOutputDict.can_show_results);
          await delay(sleepInterval);  // Wait before the next attempt
        }
      }

      const endTime = Date.now();
      const elapsedTime = (endTime - startTime) / 1000;
      console.log(`Process completed in ${elapsedTime.toFixed(2)} seconds`);

      if (!factCheckOutputDict) {
        throw new Error("Failed to retrieve fact-check results after maximum attempts");
      }

      return {
        factCheckOutputDict,
        timeTaken: elapsedTime,
      };
    } catch (error: any) {
      console.error("Error during fact-checking process:", error.message);
      throw error;
    } finally {
      // Clean up the stored input_statement
      localStorage.removeItem(`input_statement_${task_id}`);
    }
  }
};