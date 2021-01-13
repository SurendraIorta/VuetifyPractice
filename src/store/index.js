import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import state from './state';
import getters from './getters';
import * as mutations from './mutations';

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('vue_state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  const saveState = state => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('vue_state', serializedState);
    } catch (err) {
      console.error(`Something went wrong: ${err}`);
    }
  }
  
  const store = new Vuex.Store({
    state: loadState() || state,
    mutations: mutations,
    //actions: actions,
    getters: getters
  })
  // .watch(state => {
  
  //   saveState(state);
  // });
  
  store.watch(
    (state) => {
        console.log('from store watcher', state);
        if( state && state.links && state.links.fullPath !== '/'){
            saveState(state);
        }
    }
  )
  
  export default store