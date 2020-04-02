import state from "./state";

const mutations = {
    auth_success(state, data) {
        state.status = 'success';
        let a = JSON.parse(JSON.stringify(data.userInfo));

        state.user = a;
        state.token = data.token;

    },
    auth_error(state) {
        state.status = 'error';
    },
    logout(state) {
        state.status = '';
        state.token = '';
    },
    SET_TOKEN(state,data){
        state.user = data.user;
        state.token = data.token;
    },
    SET_LOCAL(state,data){
        state.localhref = data;
    },
    SET_IFRAME(state,data){
        state.iframUrl = data;
    },
    GET_ORGAN(state, data) {
        state.organArr = data;
    },
    GET_STYEMITEM(state, data) {
        state.systemArr = data;
    },
}
export default mutations
