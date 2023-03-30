export default {
    namespaced: true,
    state: () => ({
        active: false
    }),

    mutations: {
        changeDrawerState(state){
            state.active = !state.active
        }
    }
}
