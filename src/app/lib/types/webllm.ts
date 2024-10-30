export interface WebLLMState {
  timer: unknown;
  processState: string[];
  connected: boolean;
  appLoaded: boolean;
}

export interface Task {
  type: string;
  content: string;
  status: string;
  completion_metadata?: unknown;
}
