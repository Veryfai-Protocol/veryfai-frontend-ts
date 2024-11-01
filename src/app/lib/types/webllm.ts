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

type Article = {
  link: string;
  position: number;
  snippet: string;
  title: string;
};

export class ArticleDict {
  link: string;
  position: number;
  snippet: string;
  title: string;

  constructor(obj: Article) {
    this.link = obj.link;
    this.position = obj.position;
    this.snippet = obj.snippet;
    this.title = obj.title;
  }
}

export interface Search {
  query: string;
  results(): Promise<Array<ArticleDict>>;
}

interface ArticleMetadata {
  article_fact_check_id: string;
  task_id: string;
  fact_check_statement: string;
  article_title: string;
  article_snippet: string;
  article_url: string;
  source: string | null;
  is_opinion: boolean | null;
  overall_article_stance: string | null;
}

export class SnippetMetadata {
  task_id: string | undefined;
  article_fact_check_id: string | undefined;
  snippet_id: string | undefined;
  stance: string | undefined;
  verdict: string | undefined;
  reasoning: string | undefined;
  source: string | undefined;
  fact_check_statement: string | undefined;
  article_snippet: string | undefined;
  article_metadata: ArticleMetadata | undefined;

  constructor() {
    this.task_id = undefined;
    this.article_fact_check_id = undefined;
    this.snippet_id = undefined;
    this.stance = undefined;
    this.verdict = undefined;
    this.reasoning = undefined;
    this.source = undefined;
    this.fact_check_statement = undefined;
    this.article_snippet = undefined;
    this.article_metadata = undefined;
  }
}

export class FactCheckResponse {
  fact_check_response_dict:
    | {
        [key: string]: {
          article_url: string;
          stance: string;
        };
      }
    | undefined;
  all_supporting_statements:
    | {
        sentence: string;
        reason: string;
        score: number;
        source: string;
        article_url: string;
      }[]
    | undefined;
  all_opposing_statements:
    | {
        sentence: string;
        reason: string;
        score: number;
        source: string;
        article_url: string;
      }[]
    | undefined;
  veryfai_score: number | undefined;
  results_page: string | undefined;
  num_results: number | undefined;
  can_show_results: boolean | undefined;

  constructor() {
    this.fact_check_response_dict = undefined;
    this.all_supporting_statements = undefined;
    this.all_opposing_statements = undefined;
    this.veryfai_score = undefined;
    this.results_page = undefined;
    this.num_results = undefined;
    this.can_show_results = undefined;
  }
}
