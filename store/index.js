const actions = {    
    onAuthStateChangedAction: function (state, { authUser, claims }) {        
        if (!authUser) {
            state.commit('SET_USER', null);
            
            this.$router.push(
                { name: '/admin/auth/signin' }
            );
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
    }
}

const state = () => ({
    user: null
})

const getters = {
    getUser(state) {
        return state.user
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}