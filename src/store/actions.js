
import mutations from "./mutations";
import httpRequest from "../api/api";
import {Message} from "element-ui";
import router from "../router";
import axios from 'axios'
const actions = {
    //登录
    Login({commit}, user) {
        return new Promise((resolve, reject) => {
            httpRequest('/managecenter/login/userLogin','post', user)
                .then(resp => {
                    if(resp.success){
                        const token = resp.data.token;
                        const userInfo = resp.data.userInfo;
                        sessionStorage.setItem('token', token);
                        sessionStorage.setItem('user', JSON.stringify(userInfo));
                        commit('auth_success',{ token, userInfo});
                    }
                    resolve(resp);
                })
                .catch(err => {
                    commit('auth_error')
                    sessionStorage.removeItem('token')
                    reject(err)
                })
        })
    },
    //获取机构
    GET_ORGAN({commit}){
        return new Promise((resolve, reject) => {
            httpRequest('/managecenter/index/getOrganListByUser')
                .then(response => {
                    if(response.success){
                        sessionStorage.setItem('organArr',JSON.stringify(response.data));
                        commit('GET_ORGAN',response.data);
                    }
                    resolve(response);
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    //获取系统
    GET_STYEMITEM({commit}){
        return new Promise((resolve, reject) => {
            httpRequest('/managecenter/index/getSystemList')
                .then(response => {
                    if(response.success){
                        let data = response.data;
                        sessionStorage.setItem('systemArr',JSON.stringify(data));
                        commit('GET_STYEMITEM',response.data);
                    }
                    resolve(response);
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    //登出
    LogOut({commit, state},backPath) {
        return new Promise((resolve, reject) => {
            httpRequest('/managecenter/login/logout')
                .then(response => {
                    if(response.success){
                        Message.success(response.msg)
                        sessionStorage.clear()
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
