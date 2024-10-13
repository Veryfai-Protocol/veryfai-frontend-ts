export interface FactCheckResponse {
    task_id: string;
  }
  // Interface for individual statement
  interface Statement {
    article_url: string;
    reason: string;
    score: number;
    sentence: string;
    source: string;
  }
  
  // Interface for summary of fact-check
  interface Summary {
    conclusion: string;
    opposing: string;
    supporting: string;
  }
  
  // Interface for the structure of fact-check response dict (per source)
  interface FactCheckSource {
    article_url: string;
    is_opinion: boolean;
    opposing_statements: Statement[];
    stance: string;
    summary: Summary;
    supporting_statements: any[]; // Empty array, could be refined if there's a known structure
    veryfai_score: number;
  }
  
  // Main interface for the fact-check response
 export interface FactCheckResultResponse {
    all_opposing_statements: Statement[];
    all_summary: Summary[];
    all_supporting_statements: any[]; // Empty array, could be refined if there's a known structure
    all_veryfai_score: number[];
    veryfai_score: number;
    can_show_results: boolean;
    num_results: number;
    fact_check_response_dict: {
      [source: string]: FactCheckSource; // Dictionary of source keys like "CNN"
    };
    job_completed: boolean;
  }