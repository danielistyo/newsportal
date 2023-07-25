import api from '@/api';

const module = {
  namespaced: true,
  state: {
    isFetching: false,
    data: [],
    history: [],
    selected: null,
  },
  mutations: {
    set(state, headlines) {
      state.data = headlines;
    },
    add(state, headlines) {
      state.data.push(...headlines);
    },
    setIsFetching(state, value) {
      state.isFetching = value;
    },
    setSelected(state, url) {
      const headline = state.data.find((hd) => hd.url === url);
      state.selected = headline || null;
    },
    updateTitle(state, { title, url }) {
      const headline = state.data.find((hd) => hd.url === url);
      if (headline) headline.title = title;
    },
    addHistoryNews(state, url) {
      if (!state.history.find((news) => news.url === url)) {
        state.history.push(state.data.find((news) => news.url === url));
      }
    },
  },
  actions: {
    async get({ commit }, params) {
      commit('setIsFetching', true);
      const res = await api.getHeadlines(params || {});
      if (res.status === 'ok') {
        commit('set', res.articles);
      }
      commit('setIsFetching', false);
      return res;
    },
  },
};

export default module;
