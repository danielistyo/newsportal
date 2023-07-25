import api from '@/api';

const module = {
  namespaced: true,
  state: {
    data: [],
    selected: 'all',
  },
  mutations: {
    set(state, sources) {
      state.data = sources;
    },
    setSelected(state, value) {
      state.selected = value;
    },
  },
  actions: {
    async get({ commit }) {
      const res = await api.getHeadlineSources();
      if (res.status === 'ok') {
        commit('set', res.sources);
      }
    },
  },
};

export default module;
