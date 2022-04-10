const state = () => ({
    user: null,
    loading: false
});

const actions = {    
    onAuthStateChangedAction: function (state, { authUser, claims }) {        
        if (!authUser) {
            state.commit('SET_USER', null);
        
        } else {
          const { uid, email } = authUser;
          state.commit('SET_USER', {
              uid,
              email
          })
        }
    }
}

const mutations = {
    SET_USER(state, user) {
        state.user = user
    },
    setLoadingStatus(state, status) {
        state.loading = status;
    }
}

const getters = {
    getUser(state) {        
        return state.user;
    },
    getLoadingStatus(state) {
        return state.loading;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}