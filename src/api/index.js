const BASE_URL = 'https://newsapi.org/v2';

// only support GET
function request(path, params) {
  let res = null;
  const combinedParams = {
    ...params,
    apiKey: '00d4203931ff40c59951e7b98ef297bd',
  };
  if (params && !params.sources && !params.q) combinedParams.country = 'us';

  const queries = new URLSearchParams(combinedParams);
  res = fetch(`${BASE_URL}${path}?${queries}`);
  return res
    .then((rawRes) => rawRes.json())
    .catch(() => {
      // eslint-disable-next-line no-alert
      alert('Error, please reload');
    });
}

export default {
  getHeadlines(params) {
    const queries = { pageSize: '100' };
    if (params.source) queries.sources = params.source;
    if (params.query) queries.q = params.query;

    return request('/top-headlines', queries);
  },
  getHeadlineSources() {
    return request('/top-headlines/sources');
  },
};
