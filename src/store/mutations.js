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
    GET_ORGAN(state, data) {
        state.organArr = data;
    },
    GET_STYEMITEM(state, data) {
        state.systemArr = data;
    },
}
export default mutations
