import { NUM_GOOGLE_SEARCH_RESULTS } from '../constants';
import { ArticleDict, Search } from '../types/webllm';
import axios from 'axios';

class GoogleSearchSerper implements Search {
  query: string;
  _url: string = 'https://google.serper.dev/search';
  private apiKey: string = process.env.NEXT_PUBLIC_API_KEY ?? ''; // get from env

  private headers: Record<string, string> = {
    'X-API-KEY': this.apiKey,
    'Content-Type': 'application/json',
  };
  constructor(query: string) {
    this.query = query;
  }

  async results(): Promise<Array<ArticleDict>> {
    // return await getArticleFromGoogle(this._url, this.query, this.headers);
    try {
      const response = await axios.post(
        this._url,
        { query: this.query },
        { headers: this.headers }
      );
      console.log('Serper search response:');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return response.data.organic.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (a: { title: any; link: any; position: any; snippet: any }) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          a.title, a.link, a.position, a.snippet;
        }
      );
    } catch (error) {
      console.error(
        'Error fetching Serper search results:',
        JSON.stringify(error)
      );
      return [];
    }
  }
}

export async function getGoogleSearchResultsRaw(
  factCheckStatement: string,
  numResults: number = NUM_GOOGLE_SEARCH_RESULTS
) {
  const search = new GoogleSearchSerper(factCheckStatement);
  return await search.results().then((results) => {
    return results.slice(0, numResults);
  });
}
