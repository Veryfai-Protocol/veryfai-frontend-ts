import { WebLLMService } from '.';
import { MAX_LLM_WORKERS } from '../constants';
import { ArticleDict, SnippetMetadata } from '../types/webllm';
import MapUtils from './maputils';
import { v4 as uuidv4 } from 'uuid';

async function analyzeSnippetForFactCheck(
  factCheckStatement: string,
  articleTitle: string,
  articleSnippet: string,
  articleUrl: string,
  llmService: WebLLMService
) {
  const promptText = `
    Fact-check statement: ${factCheckStatement}

    Article Title: ${articleTitle}

    Article Snippet: ${articleSnippet}

    Article URL: ${articleUrl}

    Your task is to analyze whether the article title and snippet provides full, unquestionable support or opposition for the fact-check statement in every nuance. 
    Unequivocal support means that the title and snippet leaves no room for reasonable doubt and directly supports the fact-check statement. The article title and snippet contains information that proves the fact-check statement is true.
    Unequivocal opposition means that the title and snippet leaves no room for reasonable doubt and directly opposes the fact-check statement. The article title and snippet contains information that proves the fact-check statement is false.

    Output a JSON with the following keys:
    - "stance": (weakly_supporting or weakly_opposing or supporting or opposing, no_signal), is the statement supporting or opposing the fact-check statement? No signal means that the article title and snippet does not provide any information that proves the fact-check statement is true or false.
    - "verdict": (yes, weak_yes, no, or weak_no, no_signal), is the stance unequivocal?. Select 'no' if significant doubt or ambiguity exists, weak_no if there is some doubt or ambiguity, weak_yes if the stance is not unequivocal but there is some context, yes if the stance is unequivocal and proves the fact-check statement is true or false. no_signal if the article title and snippet does not provide any information that proves the fact-check statement is true or false.
    - "reasoning": Provide reasoning that explains your decision, including any areas of nuance or ambiguity.
    - "source": "The name of the article's source"

    Ensure the output follows this exact format, and avoid any extra text.
    `;

  const maxAttempts = 3;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const responseContent = await llmService.generateResponse(promptText);
      return JSON.parse(responseContent);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      if (attempt === maxAttempts - 1) {
        throw new Error(
          'Failed to generate valid JSON after multiple attempts'
        );
      }
    }
  }
  throw new Error('Unexpected error in analyzeSnippetForFactCheck');
}

async function processArticleSnippetForFactCheck(
  snippetMetadataDict: any,
  llmService: WebLLMService
) {
  const factCheckStatement = snippetMetadataDict.fact_check_statement ?? '';
  const articleTitle =
    snippetMetadataDict.article_metadata?.article_title ?? '';
  const articleSnippet = snippetMetadataDict.article_snippet ?? '';
  const articleUrl = snippetMetadataDict.article_metadata?.article_url ?? '';

  const results = await analyzeSnippetForFactCheck(
    factCheckStatement,
    articleTitle,
    articleSnippet,
    articleUrl,
    llmService
  );

  snippetMetadataDict.stance = results.stance;
  snippetMetadataDict.verdict = results.verdict;
  snippetMetadataDict.reasoning = results.reasoning;
  snippetMetadataDict.source = results.source;

  return snippetMetadataDict;
}

async function processArticle(args: any) {
  const [taskId, factCheckStatement, temp, llmService] = args;
  const articleFactCheckId = `${taskId}-${uuidv4()}`;
  const articleTitle = temp.title;
  const articleSnippet = temp.snippet || '';

  if (articleSnippet.length > 10) {
    const articleUrl = temp.link;
    const articleMetadataDict = {
      article_fact_check_id: articleFactCheckId,
      task_id: taskId,
      fact_check_statement: factCheckStatement,
      article_title: articleTitle,
      article_snippet: articleSnippet,
      article_url: articleUrl,
      source: null,
      is_opinion: null,
      overall_article_stance: null,
    };
    const snippetMetadata = {
      task_id: taskId,
      article_fact_check_id: articleFactCheckId,
      snippet_id: uuidv4(),
      stance: null,
      verdict: null,
      reasoning: null,
      source: null,
      fact_check_statement: factCheckStatement,
      article_snippet: articleSnippet,
      article_metadata: articleMetadataDict,
    };
    return processArticleSnippetForFactCheck(snippetMetadata, llmService);
  }
  return null;
}

async function processArticleSnippetsForFactCheckRaw(
  taskId: string,
  factCheckStatement: string,
  articleDictList: ArticleDict[],
  llmService: WebLLMService
) {
  const snippetMetadataList = [];
  const argsList = articleDictList.map((article) => [
    taskId,
    factCheckStatement,
    article,
    llmService,
  ]);
  console.log('Arglist', argsList);
  // Process articles concurrently with a limit on concurrent operations
  const concurrencyLimit = MAX_LLM_WORKERS;
  for (let i = 0; i < argsList.length; i += concurrencyLimit) {
    const batch = argsList.slice(i, i + concurrencyLimit);
    const results = await Promise.all(batch.map(processArticle));
    snippetMetadataList.push(...results.filter((result) => result !== null));
  }

  return snippetMetadataList;
}

export async function processArticleSnippetsForFactCheck(
  taskId: string,
  factCheckStatement: string,
  articleDictList: ArticleDict[],
  llmService: WebLLMService
) {
  return (
    await processArticleSnippetsForFactCheckRaw(
      taskId,
      factCheckStatement,
      articleDictList,
      llmService
    )
  ).map((m) => {
    return MapUtils.deserialize(SnippetMetadata, m);
  });
}
