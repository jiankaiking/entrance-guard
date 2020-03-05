import state from "./state";
const mutations ={
        auth_success(state, data) {
            state.status = 'success';

            let a = JSON.parse(JSON.stringify(data.userInfo));
          //  console.log(a)
            state.user = a;
            state.token = data.token;
           // state.user = data.user;

        },
        auth_error(state) {
            state.status = 'error';
        },
        logout(state) {
            state.status = '';
            state.token = '';
        },
}
export default mutations
