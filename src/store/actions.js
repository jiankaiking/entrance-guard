import mutations from "./mutations";
import httpRequest from "../api/api";
import axios from 'axios'
const actions = {
    Login({commit}, user) {
        console.log(commit)
        return new Promise((resolve, reject) => {
            // 向后端发送请求，验证用户名密码是否正确，请求成功接收后端返回的token值，利用commit修改store的state属性，并将token存放在localStorage中
            httpRequest('login','post', user)
                .then(resp => {
                    const token = resp.data.token
                    const user = resp.data.user
                    localStorage.setItem('token', token)
                    // 每次请求接口时，需要在headers添加对应的Token验证
                    axios.defaults.headers.common['Authorization'] = token
                    // 更新token
                    commit('auth_success', token, user)
                    resolve(resp)
                })
                .catch(err => {
                    console.log(user,1)
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
