import ApiService from "../ApiService";
import { FactCheckResponse, FactCheckResultResponse } from "./FactType";



const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export const FactCheckingService = {
  async checkFact(input_statement: string): Promise<FactCheckResponse> {
    const response = await ApiService.post<FactCheckResponse>(
      "/send-fact-check-task",
      { input_statement }
    );
    return response.data;
  },

  // New method to perform fact-checking with retries
  async getFactCheckResult(
    task_id?: string,
    maxAttempts: number = 10,
    sleepInterval: number = 5000,
  ): Promise<{ factCheckOutputDict: FactCheckResultResponse; timeTaken: number; }> {
    const startTime = Date.now();
    let factCheckOutputDict;
  
    try {
      // Step 1: Send the fact-check request and get the task ID
      if (!task_id) {
        throw new Error("Task ID not returned from fact-check request");
      }
  
      // Step 2: Polling for the results
      for (let i = 0; i < maxAttempts; i++) {
        console.log(`Checking if job is completed: ${i + 1}/${maxAttempts}`);
  
        try {
          // Get the latest fact-check results for the task ID
          const response = await ApiService.post(`/get-fact-check-results`, {
            task_id,
          });
  
          factCheckOutputDict = response.data;
  
          // Log the results for visibility
          console.log(`Results received:`, factCheckOutputDict);
  
          // Check if results are ready
          if (factCheckOutputDict["can_show_results"]) {
            // Job is completed, log and break out of the loop
            console.log("Job completed, results are ready.");
            break;
          }
  
        } catch (error: any) {
          console.error("Error fetching fact-check results:", error.message);
        }
  
        // Wait for the sleepInterval before the next attempt
        await delay(sleepInterval);
      }
  
      // Step 3: Calculate the time taken
      const endTime = Date.now();
      const elapsedTime = (endTime - startTime) / 1000;
      console.log(`Process completed in ${elapsedTime.toFixed(2)} seconds`);
  
      // Step 4: Return results and time taken
      return {
        factCheckOutputDict, // Always return the most recent results
        timeTaken: elapsedTime,
      };
  
    } catch (error: any) {
      console.error("Error during fact-checking process:", error.message);
      throw error;
    }
  }
  // Utility function for delay
  
};
