import ApiService from "../ApiService";
import { FactCheckResponse, FactCheckResultResponse } from "./FactType";
//@ts-ignore
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface CacheItem {
  result: FactCheckResultResponse;
  timestamp: number;
}
//@ts-ignore
export class Cache {
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

// const cache = new Cache();

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
  ) {
    let factCheckOutputDict: FactCheckResultResponse | null = null;
  
    try {
  
        try {
          const response = await ApiService.post<FactCheckResultResponse>('/api/get-fact-check-results', { task_id });
          factCheckOutputDict = response.data;
  
          console.log(`Results received:`, factCheckOutputDict);
  
          // Cache the result
          if (task_id) {
            localStorage.setItem(task_id, JSON.stringify(factCheckOutputDict))
            console.log(`Cached result for task_id: ${task_id}`);
          }
  
          // Call the onUpdate callback with the latest results
          
          console.log("Results not ready, waiting before next attempt...");
        } catch (error) {
          console.error("Error fetching fact-check results:", error);
        }
  
    } catch (error) {
      console.error("Error during fact-checking process:", error);
      throw error;
    }
  }

}