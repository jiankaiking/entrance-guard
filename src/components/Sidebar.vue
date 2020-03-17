<template>
    <div class="sidebar-container">
        <el-dropdown>
            <div  style="width: 225px; height: 50px; text-align: center; line-height: 50px">
                机电
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item  @click.native="jumpSystem(item.systemId)" v-for="(item,index) in systemArr">
                    <span style="padding: 25px; box-sizing: border-box;">{{item.systemName}}</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-menu
                :default-active="this.$route.path"
                unique-opened
                router
                mode="vertical"
                background-color="#fff"
                text-color="#666666"
                @select="muneselect"
                active-text-color="red">
            <SidebarItem v-for="menu in menuList" :key="menu.path" :item="menu"/>
        </el-menu>
    </div>
</template>
<script>
    import SidebarItem from './SidebarItem'
    import {mapState} from 'vuex'

    export default {
        name: 'Sidebar',
        components: {SidebarItem},
        props:{
            menuList: {
                type: Array,
                required: true
            }
        },
        methods:{
            muneselect(key,keypath,z){
           //     console.log(key,keypath,z)
            }
        },
        computed:{
            ...mapState(["systemArr"])
        }
    }
</script>
<style>
    .el-submenu__icon-arrow{
        right: 44px !important;
    }

    .el-menu-item,.el-submenu__title{
        padding-left: 44px !important;
    }
    .el-menu-item:hover{
        outline: 0 !important;
        color: #38B8EE !important;
        background:rgba(245,252,255,1) !important;
    }

    .el-menu-item.is-active {
        color: #38B8EE !important;
        background:none !important;
    }
    .el-submenu__title:focus, .el-submenu__title:hover{
        outline: 0 !important;
        color: #38B8EE !important;
        background:rgba(245,252,255,1) !important;
    }
    .sidebar-container .is-active>.el-submenu__title{
        color: #38B8EE !important;
        background:rgba(245,252,255,1) !important;
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
