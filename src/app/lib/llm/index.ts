import * as webllm from '@mlc-ai/web-llm';
import { getServerStatus, setServerStatus } from '../utils';
import { SERVER_STATUS } from '../enums';
import {
  ArticleDict,
  FactCheckResponse,
  SnippetMetadata,
} from '../types/webllm';
import { processArticleSnippetsForFactCheck } from './process_article';
import { processArticleSnippetAnalysisResultsRaw } from './article_score';
import MapUtils from './maputils';
import { TestDict } from '../constants';

const WEBLLM_DEFAULT_MODEL = 'Llama-3.2-3B-Instruct-q4f16_1-MLC';

const initProgressCallback = (report: webllm.InitProgressReport) => {
  console.log(report.text);
  const status = getServerStatus();
  if (!status.includes(SERVER_STATUS.Model)) {
    setServerStatus([...status, SERVER_STATUS.Model]);
  }
};

async function create_webllm_engine() {
  console.log('Creating WebLLM engine');
  const engine: webllm.MLCEngineInterface =
    await webllm.CreateServiceWorkerMLCEngine(WEBLLM_DEFAULT_MODEL, {
      initProgressCallback: initProgressCallback,
    });

  console.log('WebLLM engine created');

  return engine;
}

async function webllm_prompt(
  engine: webllm.MLCEngineInterface,
  prompt: string
) {
  const reply = await engine.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 256,
  });
  return reply.choices[0].message.content ?? '';
}

export class WebLLMService {
  engine: webllm.MLCEngineInterface | null;
  model: string;

  constructor(model = WEBLLM_DEFAULT_MODEL) {
    this.model = model;
    this.engine = null;
  }

  async initialize() {
    if (!this.engine) {
      this.engine = await create_webllm_engine();
    }
  }

  async generateResponse(prompt: string) {
    await this.initialize();

    const systemMessage =
      'You are an AI assistant specialized in fact-checking and article analysis. Always respond with a valid JSON string.';
    const fullPrompt = `${systemMessage}\n\nUser: ${prompt}`;
    if (!this.engine) return;
    const response = await webllm_prompt(this.engine, fullPrompt);
    return response.trim() || '';
  }
}

export async function initLlm() {
  console.log('Starting...');
  const webllmService = new WebLLMService();
  await webllmService.initialize(); // Initialize the WebLLM engine
  const llmService = webllmService;
  return llmService;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function performFactCheck(task: any, llmService: WebLLMService) {
  const factCheckStatement = task.content;
  const taskId = task.id;
  // const articleDictList = await getGoogleSearchResultsRaw(
  //   factCheckStatement,
  //   NUM_GOOGLE_SEARCH_RESULTS
  // );

  const articleDictList = TestDict;

  const re = articleDictList.map((m) => {
    return new ArticleDict(m);
  });
  console.log(articleDictList);
  console.log(re);

  let start = Date.now();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const snippetMetadataList: any = await processArticleSnippetsForFactCheck(
    taskId,
    factCheckStatement,
    articleDictList,
    llmService
  );
  let millis = (Date.now() - start) / 1000.0;

  console.log(millis.toString());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const snips = snippetMetadataList.map((m: any) => {
    return MapUtils.deserialize(SnippetMetadata, m);
  });

  console.log(snippetMetadataList);
  console.log(snips);

  const factCheckOutputDict = processArticleSnippetAnalysisResultsRaw(
    taskId,
    snippetMetadataList
  );

  start = Date.now();

  const rf = MapUtils.deserialize(FactCheckResponse, factCheckOutputDict);

  millis = (Date.now() - start) / 1000.0;

  console.log(millis.toString());

  console.log(rf);

  return factCheckOutputDict;
}
