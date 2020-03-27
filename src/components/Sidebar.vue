<template>
    <div class="sidebar-container">
        <el-menu
                :default-active="this.$route.path"
                unique-opened
                router
                mode="vertical"
                background-color="#fff"
                text-color="#666666"
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
        },
        computed:{

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
