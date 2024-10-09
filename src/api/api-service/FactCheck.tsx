import ApiService from "../ApiService";
import { FactCheckResponse, FactCheckResultResponse } from "./FactType";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const FactCheckingService = {
  async checkFact(input_statement: string): Promise<FactCheckResponse> {
    const response = await ApiService.post<FactCheckResponse>(
      "/api/send-fact-check-task",
      { input_statement }
    );
    return response.data;
  },

  async getFactCheckResult(
    task_id: string,
    onUpdate: (result: FactCheckResultResponse) => void,
    maxAttempts: number = 10,
    sleepInterval: number = 5000
  ): Promise<{ factCheckOutputDict: FactCheckResultResponse; timeTaken: number }> {
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
    }
  }
  
};