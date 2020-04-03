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
    SET_USERINFO(state,data){
        state.user = JSON.parse(data);
        sessionStorage.setItem('user',data)
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
    CLOSE_MENU(state,data){
        if(data.type =='left'){
            state.menuTagArr.splice(0,data.index)
        }else if(data.type == 'right'){
            state.menuTagArr.splice(data.index + 1)
        }else{
            state.menuTagArr.splice(data.index + 1)
            state.menuTagArr.splice(0,data.index)
        }
    },
}
export default mutations
