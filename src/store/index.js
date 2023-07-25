import { createStore } from 'vuex';
import headlines from './modules/headlines';
import sources from './modules/sources';

export default createStore({
  modules: { headlines, sources },
});
