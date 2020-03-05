
import mutations from "./mutations";
import httpRequest from "../api/api";
import axios from 'axios'
const actions = {
    Login({commit}, user) {
        return new Promise((resolve, reject) => {
            // 向后端发送请求，验证用户名密码是否正确，请求成功接收后端返回的token值，利用commit修改store的state属性，并将token存放在localStorage中
            httpRequest('/login/userLogin','post', user)
                .then(resp => {
                    const token = resp.data.token;
                    const userInfo = resp.data.userInfo;
                    localStorage.setItem('token', token);
                   commit('auth_success',{ token, userInfo});
                    resolve(resp);
                })
                .catch(err => {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },
    LogOut({commit, state}) {
        return new Promise((resolve, reject) => {
            axios.get('Logout')
                .then(response => {
                    removeIsLogin()
                    localStorage.removeItem('loginUsername');
                    // 移除之前在axios头部设置的token,现在将无法执行需要token的事务
                    delete axios.defaults.headers.common['Authorization'];
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

export default actions
