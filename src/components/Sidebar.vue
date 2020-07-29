<template>
    <div class="sidebar-container">
        <el-row style="cursor: pointer">
            <el-col :span="12">
                <el-dropdown style="width: 100%">
                    <div style=" height: 50px; text-align: center; line-height: 50px">
                        <span>{{}}</span>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="jumpSystem(item.systemId)" v-for="(item,index) in systemArr"
                                          :key="index">
                            <span style="padding: 25px; box-sizing: border-box;">{{item.systemName}}</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="12">
                <el-dropdown style="width: 100%">
                    <div style=" height: 50px; text-align: center; line-height: 50px">
                        {{user.organId}}
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="jumporgan(item.organId)" v-for="(item,index) in organArr"
                                          :key="index">
                            <span style="padding: 25px; box-sizing: border-box;">{{item.position}}</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
        <el-menu
                unique-opened
                mode="vertical"
                :default-active="$route.path"
                router
                background-color="#fff"
                text-color="#666666"
                active-text-color="red">
            <SidebarItem v-for="menu in menuList" :key="menu.menuId" :item="menu"/>
        </el-menu>
    </div>
</template>
<script>
    import SidebarItem from './SidebarItem'
    import store from '../store/index'
    import {mapState, mapMutations} from 'vuex'
    import httpRequest from "../api/api";

    export default {
        name: 'Sidebar',
        components: {SidebarItem},

        props: {
            menuList: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                list: {},
            }
        },
        methods: {
            findMenu(item, id) {
                if (item.menuId != id) {
                    if (item.children) {
                        for (var i = 0; i < item.children.length; i++) {
                            if (item.children[i].menuId == id) {
                                return item.children[i]
                            } else {
                                this.findMenu(item.children[i], id)
                            }
                        }
                    }
                } else {
                    return item;
                }
            },
            muneselect(key, keypath) {
                let menu = this.menuList.filter(item => item.menuId == keypath[0])[0]
                let cliMenu = this.findMenu(menu, key)
                this.$router.push(cliMenu.menuUrl)

            },

            //系统跳转
            jumpSystem(id) {
                httpRequest("/managecenter/index/updateLoginSystem", "POST", {systemId: id})
                    .then(res => {
                        if (res.success) {
                            let href = ''
                            if (id == 3) {
                                href = 'http://localhost:8081/#/login?token='
                            } else if (id == 1) {
                                href = 'http://localhost:8080/#/login?token='
                            } else {
                                href = 'http://localhost:8082/#/login?token='
                            }
                            window.location.replace(href + this.$store.state.token)
                            sessionStorage.clear()
                        }
                    })
            },
            //机构跳转
            jumporgan(id) {
                httpRequest("/managecenter/index/updateLoginOrgan", "POST", {organId: id})
                    .then(res => {
                        if(res.success){
                            // if (this.$route.path != '/home/index') {
                            //     this.$router.push("/home/index")
                            // }
                            this.$store.dispatch('getUserInfo')
                            this.$router.go(0)
                        }
                    })
            },
        },
        computed: {
            ...mapState(["systemArr"]),
            ...mapState(["user"]),
            ...mapState(["organArr"]),
            // loginSystem() {
            //     if(this.systemArr.length > 0){
            //         let userSystemName =  this.systemArr.filter(item=>{
            //             return item.systemId === this.user.loginSystemId
            //         })
            //         return userSystemName[0].systemName
            //     }
            //
            // },
            // position(){
            //     if(this.organArr.length > 0){
            //         let organArrName =  this.organArr.filter(item=>{
            //             return item.organId === this.user.organId
            //         })
            //         return organArrName[0].position
            //     }
            // },
        }
    }
</script>
<style>
    .el-submenu__icon-arrow {
        right: 44px !important;
    }

    .el-menu-item, .el-submenu__title {
        padding-left: 44px !important;
    }

    .el-menu-item:hover {
        outline: 0 !important;
        color: #38B8EE !important;
        background: rgba(245, 252, 255, 1) !important;
    }

    .el-menu-item.is-active {
        color: #38B8EE !important;
        background: none !important;
    }

    .el-submenu__title:focus, .el-submenu__title:hover {
        outline: 0 !important;
        color: #38B8EE !important;
        background: rgba(245, 252, 255, 1) !important;
    }

    .sidebar-container .is-active > .el-submenu__title {
        color: #38B8EE !important;
        background: rgba(245, 252, 255, 1) !important;
    }

    .sidebar-container {
        transition: width 0.28s;
        width: 225px !important;
        height: 100%;
        font-size: 0px;
        z-index: 1001;
    }

    .sidebar-container .horizontal-collapse-transition {
        transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
    }

    .sidebar-container .el-scrollbar {
        height: 100%;
    }

    .sidebar-container .scrollbar-wrapper {
        overflow-x: hidden !important;
    }

    .sidebar-container .scrollbar-wrapper .el-scrollbar__view {
        height: 100%;
    }

    .sidebar-container .el-scrollbar__bar.is-vertical {
        right: 0px;
    }

    .sidebar-container .is-horizontal {
        display: none;
    }

    .sidebar-container a {
        display: inline-block;
        width: 100%;
        overflow: hidden;
    }

    .sidebar-container .el-menu {
        border: none;
        height: 100%;
        width: 100% !important;
    }
</style>
