import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: () => import('@/views/dashboard'),
            redirect: '/home/index',
            meta: {
                keepAlive: true

            },
            children: [
                {
                    path: '/home/index', name: 'homeindex', component: () => import('@/views/Home'),
                    meta: {title: '首页', historyFlag: true}
                },
                //用户信息
                {
                    path: '/user',
                    name: 'user',
                    component: () => import('@/views/User/Usermessges'),
                    meta: {keepAlive: true, historyFlag: true}
                },
                //日志
                {
                    path: '/log/operation',
                    name: 'organization1',
                    component: () => import('@/views/Log/Organization'),
                    meta: {title: '操作日志'}
                },
                {
                    path: '/log/loginlog',
                    name: 'loginlog',
                    component: () => import('@/views/Log/Loginlog'),
                    meta: {title: '登录日志'}
                },
                //订单管理
                {
                    path: '/order/order',
                    name: 'order',
                    component: () => import('@/views/Order/Order'),
                    meta: {
                        title: '订单管理'
                    }
                },
                //系统配置sysconfig
                {
                    path: '/sysconfig/parameter',
                    name: 'parameter',
                    component: () => import('@/views/Sysconfig/Parameter'),
                    meta: {
                        title: '基础参数'
                    }
                },
                {
                    path: '/sysconfig/porttemplate',
                    name: 'porttemplate',
                    component: () => import('@/views/Sysconfig/Porttemplate'),
                    meta: {keepAlive: true}
                },
                //任务管理  taskmanagement
                {
                    path: '/sysconfig/taskmanagement',
                    name: 'taskmanagement',
                    component: () => import('@/views/Sysconfig/Taskmanagement'),
                    meta: {
                        keepAlive: true
                    }
                },

                //菜单管理
                {
                    path: '/menuadmin', name: 'menuadmin', component: () => import('@/views/Menuadmin/Menuadmin')
                },
                //代理商部分
                {
                    path: '/agent', name: 'agent', component: () => import('@/views/Agent/Agentlist'),
                },
                {
                    path: '/agentmessges',
                    component: () => import('@/components/AgentHeader'),
                    // redirect: '/agentmessges/basic',
                    // children: [
                    //     {
                    //         path: '/agentmessges/basic',
                    //         name: 'agentmessgesbasic',
                    //         component: () => import('@/views/Agent/Agentmessgesbasic')
                    //     },
                    //     {
                    //         path: '/agentmessges/information',
                    //         name: 'information',
                    //         component: () => import('@/views/Agent/Information'),
                    //     },
                    //     {
                    //         path: '/agentmessges/generation',
                    //         name: 'generation',
                    //         component: () => import('@/views/Agent/Generation'),
                    //     }
                    // ]
                },
                //合作商
                {
                    path: '/cooperative', name: 'cooperative', component: () => import('@/views/Agent/Cooperative'),
                },
                {
                    path: '/addcooperative',
                    name: 'addcooperative',
                    component: () => import('@/views/Agent/Addcooperative'),
                },
                //权限管理  功能
                {
                    path: '/management/fucmanagement',
                    name: 'fucmanagement',
                    component: () => import('@/views/Management/Fucmanagement'),
                },
                //人员管理
                {
                    path: '/management/personnel',
                    name: 'personnelmanagement',
                    component: () => import('@/views/Management/Personnelmanagement'),
                },
                //组织机构管理
                {
                    path: '/management/organization',
                    name: 'organization',
                    component: () => import('@/views/Management/Organization'),
                },
                //数据管理
                {
                    path: '/management/datapermission',
                    name: 'datapermission',
                    component: () => import('@/views/Management/Datapermission'),
                },
                //结算   结算列表
                {
                    path: '/accounts/list',
                    name: 'accountslist',
                    component: () => import('@/views/Settleaccounts/Accountslist'),
                },
                {
                    path: '/accounts/settleamessage',
                    name: 'settleamessage',
                    component: () => import('@/views/Settleaccounts/Settleamessage'),
                },
                //佣金结算
                {
                    path: '/accounts/commission',
                    name: 'commission',
                    component: () => import('@/views/Settleaccounts/Commission'),
                },
                //设备补贴
                {
                    path: '/accounts/subsidy',
                    name: 'subsidy',
                    component: () => import('@/views/Settleaccounts/Subsidy'),
                },
                //数据导入
                {
                    path: '/accounts/dataimporting',
                    name: 'dataimporting',
                    component: () => import('@/views/Settleaccounts/Dataimporting'),
                },
                //商户管理
                {
                    path: '/merchant/list',
                    name: 'MerchantList',
                    component: () => import('@/views/Merchant/MerchantList'),
                },
                {
                    path: '/merchant/list1',
                    name: 'MerchantInfo',
                    component: () => import('@/views/Merchant/MerchantInfo'),
                },
                //设备列表
                {
                    path: '/equipment/list',
                    name: 'MerchantList',
                    component: () => import('@/views/Equipment/EquipmentList'),
                },
                //设备配置
                {
                    path: '/equipment/config',
                    name: 'EquipmentConfig',
                    component: () => import('@/views/Equipment/EquipmentConfig'),
                },
                //设备数据
                {
                    path: '/equipment/data',
                    name: 'EquipmentData',
                    component: () => import('@/views/Equipment/EquipmentData'),
                },
                //收银设备绑定
                {
                    path: '/equipment/cashierbind',
                    name: 'EquipmentData',
                    component: () => import('@/views/Equipment/CashierBind'),
                },
                //库存管理
                {
                    path:'/entrepot',
                    component:() => import('@/components/EntrepotHeader'),
                    redirect: '/entrepot/unshipped',
                    children:[
                        //出库
                        {
                            path:'/entrepot/outrecord',
                            component:() => import('@/views/Equipment/EntrepotOut'),
                        },
                        //入库
                        {
                            path:'/entrepot/getrecord',
                            component:() => import('@/views/Equipment/EntrepotGet'),
                        },
                        //未发货
                        {
                            path:'/entrepot/unshipped',
                            component:() => import('@/views/Equipment/Unshipped'),
                        },
                        //设备库存
                        {
                            path:'/entrepot/repertory',
                            component:() => import('@/views/Equipment/Repertory'),
                        }
                    ],
                }
            ]

        },
        {
            name: 'Login1', path: '/findpassword', component: () => import('@/views/User/forgetPassword')
        },
        {
            name: 'Login', path: '/Login', component: () => import('@/views/Login')
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.path == '/home/index' || to.path == '/user') {
        window.document.body.style.backgroundColor = '#ffffff'
    } else {
        window.document.body.style.backgroundColor = '#f8f8f8'
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLogin()) {
            router.push({
                name: 'Login',
                query: {
                    from: to.path
                }
            });
            return;
        }
    }
    next();
});

export default router;
