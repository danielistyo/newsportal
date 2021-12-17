import { HeadlineSourcesResponse, HeadlinesResponse } from '@/typings';

const BASE_URL = 'https://newsapi.org/v2';

// only support GET
function request<R>(path: string, params?: { [key: string]: string }): Promise<R> {
  let res: Promise<Response> | null = null;

  const queries = new URLSearchParams({
    ...params,
    country: 'us',
    apiKey: '099148be22804e849a0c6fe022b7cf5e',
  });
  res = fetch(`${BASE_URL}${path}?${queries}`);
  return res
    .then((rawRes) => rawRes.json())
    .catch(() => {
      alert('Error, please reload');
    });
}

export default {
  getHeadlines(): Promise<HeadlinesResponse> {
    return request<HeadlinesResponse>('/top-headlines');
  },
  getHeadlineSources(): Promise<HeadlineSourcesResponse> {
    return request<HeadlineSourcesResponse>('/top-headlines/sources');
  },
};
