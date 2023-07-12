import { createStore } from 'vuex';
import headlineModule from './modules/headlines';

export default createStore({
  modules: { headlines: headlineModule },
});
