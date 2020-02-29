<template>
    <div class="menu">
        <div class="banner-left">
            <img src="../assets/images/logowhite.png" alt="运营中台">
        </div>
        <menutree :menuList="menuList"></menutree>
    </div>
</template>

<script>
    import menutree from '@/components/Sidebar'

    export default {

        data() {
            return {
                uniquevalue: true,
                menuList: [
                    {
                        path: "/home/index",     //菜单项所对应的路由路径
                        title: "首页",
                        children: []
                    },
                    {
                        path: "/home/index",     //菜单项所对应的路由路径
                        title: "代理商管理",     //菜单项名称
                        children: [
                            {
                                path: "/cooperative",
                                title: "合作商",
                                children: []
                            },
                            {
                                path: "/agent",
                                title: "代理商",
                                children: []
                            }]
                    },
                    {
                        path: "/home/index2",     //菜单项所对应的路由路径
                        title: "系统管理",     //菜单项名称
                        children: [
                            {
                                path: "/management/fucmanagement",
                                title: "权限管理",
                                children: []
                            },
                            {
                                path: "/management/personnel",
                                title: "人员管理",
                                children: []
                            }, {
                                path: "/management/organization",
                                title: "组织机构管理",
                                children: []
                            }, {
                                path: '/management/datapermission',
                                title: '数据管理',
                                children: []
                            }]
                    },
                    {
                        path: "/home/index3",
                        title: "权限管理",
                        children: [
                            {
                                path: "/sysconfig/porttemplate",
                                title: '接口模板',
                                children: []
                            },
                            {
                                path: '/menuadmin',
                                title: '菜单管理',
                                children: []
                            }, {
                                path: '/sysconfig/taskmanagement',
                                title: '任务管理',
                                children: []
                            }, {
                                path: '/sysconfig/parameter',
                                title: '系统配置sysconfig',
                                children: []
                            }
                        ]
                    },
                    {
                        path: "/home/index1",
                        title: "结算管理",
                        children: [
                            {
                                path: '/accounts/list',
                                title: '结算列表',
                                children: []
                            }, {
                                path: '/accounts/commission',
                                title: '结算补贴',
                                children: []
                            }, {
                                path: '/accounts/dataimporting',
                                title: '数据导入',
                                children: []
                            }, {
                                path: '/accounts/subsidy',
                                title: '设备补贴',
                                children: []
                            }
                        ]
                    },

                    {
                        path: "/func2",
                        title: "日志管理",
                        children: [

                            {
                                path: "/log/loginlog",
                                title: "登录日志",
                                children: []
                            },
                            {
                                path: "/log/operation",
                                title: "操作日志",
                                children: []
                                //是否有子菜单，若没有，则为[]
                            }]
                    },
                ],

                path: '',
            };
        },

        methods: {}
        ,
        components: {
            menutree
        }
        ,
    }
    ;
</script>

<style>
    .banner-left {
        text-align: center;
        font-family: PingFangSC-Semibold;
        width: 225px;
        height: 70px;
        background: #38B8EE;


    }

    .banner-left img {
        margin: 15px auto;
        width: 116px;
        height: 40px;
    }

    .menu {
        font-size: 12px;
        overflow: hidden
    }

    .menuItewm {
        width: 200px;
        height: 50px;
        float: left
    }

    .sublabel li {
        background: red;
        padding: 20px
    }

    .bigmenu {

        color: #fff;
        padding: 20px
    }
</style>

