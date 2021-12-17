import { HeadlineSourcesResponse, HeadlinesResponse } from '@/typings';

const BASE_URL = 'https://newsapi.org/v2';

// only support GET
function request<R>(path: string, params?: { [key: string]: string }): Promise<R> {
  let res: Promise<Response> | null = null;

  const combinedParams: { [key: string]: string } = {
    ...params,
    apiKey: '099148be22804e849a0c6fe022b7cf5e',
  };
  if (!params?.sources) combinedParams.country = 'us';

  const queries = new URLSearchParams(combinedParams);
  res = fetch(`${BASE_URL}${path}?${queries}`);
  return res
    .then((rawRes) => rawRes.json())
    .catch(() => {
      alert('Error, please reload');
    });
}

export default {
  getHeadlines(params: { source?: string; query?: string }): Promise<HeadlinesResponse> {
    const queries: { [key: string]: string } = { pageSize: '100' };
    if (params.source) queries.sources = params.source;
    if (params.query) queries.q = params.query;
    return request<HeadlinesResponse>('/top-headlines', queries);
  },
  getHeadlineSources(): Promise<HeadlineSourcesResponse> {
    return request<HeadlineSourcesResponse>('/top-headlines/sources');
  },
};
