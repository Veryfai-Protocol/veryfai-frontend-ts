export interface ApiErrorResponse {
    name: string;
    error: {
      userMessage: string;
      validationError: any[];
    };
    code: number;
    message: string;
    devMessage: string;
    data: null;
}