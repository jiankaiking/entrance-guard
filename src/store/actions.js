
import mutations from "./mutations";
import httpRequest from "../api/api";
import {Message} from "element-ui";
import router from "../router";
import axios from 'axios'
const actions = {
    //登录
    Login({commit}, user) {
        return new Promise((resolve, reject) => {
            httpRequest('/login/userLogin','post', user)
                .then(resp => {
                    if(resp.success){
                        const token = resp.data.token;
                        const userInfo = resp.data.userInfo;
                        localStorage.setItem('token', token);
                        localStorage.setItem('user', JSON.stringify(userInfo));
                        commit('auth_success',{ token, userInfo});
                    }
                    resolve(resp);
                })
                .catch(err => {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },
    //登出
    LogOut({commit, state},backPath) {
        return new Promise((resolve, reject) => {
            httpRequest('/login/logout')
                .then(response => {
                    if(response.success){
                        Message.success(response.msg)
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        delete axios.defaults.headers.common['Authorization'];
                        if(backPath){
                            router.push({path:'/login',query:{redirect:backPath.fullPath}})
                        }else{
                            router.push({path:'/login'})
                        }
                        commit('logout');
                    }
                    resolve(response);
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

export default actions
