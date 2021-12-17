export type HeadlineSource = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
};

export type HeadlineSourcesResponse = {
  status: string;
  sources: Array<HeadlineSource>;
};

export type Headline = {
  source: {
    id: string | null;
    name: string;
  };
  author: null | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export type HeadlineResponseSuccess = {
  status: 'ok';
  totalResults: number;
  articles: Array<Headline>;
};

export type HeadlineResponseError = {
  code: string;
  message: string;
  status: 'error';
};

export type HeadlinesResponse = HeadlineResponseSuccess | HeadlineResponseError;

export type RootStates = {
  isFetchingHeadline: boolean;
  headlines: Array<Headline>;
  headlineSources: Array<HeadlineSource>;
  selectedSource: string;
  selectedHeadline: Headline | null;
};
