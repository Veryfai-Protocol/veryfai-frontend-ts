/* eslint-disable @typescript-eslint/no-explicit-any */
import { SnippetMetadata } from '../types/webllm';

export function processArticleSnippetAnalysisResultsRaw(
  taskId: string,
  snippetMetadataDicts: SnippetMetadata[]
) {
  const numProcessedSnippets = snippetMetadataDicts.length;

  if (numProcessedSnippets > 0) {
    const snippetVerdictScoreDict: any = {
      weak_yes: 0.75,
      yes: 1,
      weak_no: 0.25,
      no: 0,
    };
    const snippetStanceScoreDict: any = {
      supporting: 1.0,
      weakly_supporting: 0.5,
      opposing: 1,
      weakly_opposing: 0.5,
    };

    const factCheckResponseDict: any = {};
    const allSupportingStatements: any[] = [];
    const allOpposingStatements: any[] = [];
    let totalSupportingScore = 0;
    let totalOpposingScore = 0;

    for (const snippetMetadataDict of snippetMetadataDicts) {
      const metadatDict: any = snippetMetadataDict;
      if (metadatDict.stance !== 'no_signal') {
        const articleMetadataDict = metadatDict.article_metadata;
        const articleUrl = articleMetadataDict?.article_url ?? '';

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        factCheckResponseDict[metadatDict.source] = {
          article_url: articleUrl,
          stance: metadatDict.stance,
        };

        const stance = metadatDict?.stance;
        const verdict = metadatDict?.verdict;
        if (!stance || !verdict) return;
        const snippetScore =
          snippetStanceScoreDict[stance] * snippetVerdictScoreDict[verdict];

        const tempSnippetDict = {
          sentence: metadatDict.article_snippet,
          reason: metadatDict.reasoning,
          score: snippetScore,
          source: metadatDict.source,
          article_url: articleUrl,
        };

        if (stance.includes('supporting')) {
          allSupportingStatements.push(tempSnippetDict);
          totalSupportingScore += snippetScore;
        } else {
          allOpposingStatements.push(tempSnippetDict);
          totalOpposingScore += snippetScore;
        }
      }
    }

    const resultsPage = `https://www.veryfai.io/result-analysis/${taskId}`;

    const maxLen = Math.max(
      allSupportingStatements.length,
      allOpposingStatements.length,
      5
    );
    const avgSupportingScore = maxLen > 0 ? totalSupportingScore / maxLen : 0;
    const avgOpposingScore = maxLen > 0 ? totalOpposingScore / maxLen : 0;

    const veryfaiScore = Math.round(
      (avgSupportingScore - avgOpposingScore) * 100
    );

    return {
      fact_check_response_dict: factCheckResponseDict,
      all_supporting_statements: allSupportingStatements,
      all_opposing_statements: allOpposingStatements,
      veryfai_score: veryfaiScore,
      results_page: resultsPage,
      num_results: numProcessedSnippets,
      can_show_results: true,
    };
  } else {
    return {};
  }
}
