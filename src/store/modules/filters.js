export default {
  namespaced: true,
  state: {
    searchInput: "",
    selectRegion: "",
  },
  getters: {
    getSearchInput(state) {
      return state.searchInput;
    },
    getSelectRegion(state) {
      return state.selectRegion;
    },
  },
  mutations: {
    setSearchInput(state, filter) {
      state.searchInput = filter;
    },
    setSelectRegion(state, filter) {
      state.selectRegion = filter;
    },
  },
};
