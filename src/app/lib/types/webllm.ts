export interface WebLLMState {
  timer: unknown;
}

export interface Task {
  type: string;
  content: string;
  status: string;
  completion_metadata?: unknown;
}
