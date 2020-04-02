import Vue from 'vue'
import Router from 'vue-router'
import State from '../store/state'
Vue.use(Router);

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: () => import('@/views/dashboard'),
            redirect: '/home/index',
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
                    meta: {title: '个人信息', historyFlag: true}
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
                    meta: {title: '个人信息'}
                },
                //任务管理  taskmanagement
                {
                    path: '/sysconfig/taskmanagement',
                    name: 'taskmanagement',
                    component: () => import('@/views/Sysconfig/Taskmanagement'),
                    meta: {
                        title: '任务管理'
                    }
                },

                //菜单管理
                {
                    path: '/menuadmin', name: 'menuadmin',meta: {
                        title: '菜单管理'
                    }, component: () => import('@/views/Menuadmin/Menuadmin')
                },
                //代理商部分
                {
                    path: '/agent', name: 'agent',meta: {
                        title: '代理商管理'
                    }, component: () => import('@/views/Agent/Agentlist'),
                },
                {
                    path: '/agentmessges',
                    component: () => import('@/components/AgentHeader'),
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
                    path: '/management/fucmanagement',meta: {
                        title: '功能权限'
                    },

                    name: 'fucmanagement',
                    component: () => import('@/views/Management/Fucmanagement'),
                },
                //人员管理
                {
                    path: '/management/personnel',
                    meta: {
                        title: '人员管理'
                    },
                    name: 'personnelmanagement',
                    component: () => import('@/views/Management/Personnelmanagement'),
                },
                //组织机构管理
                {
                    path: '/management/organization',
                    meta: {
                        title: '组织机构管理'
                    },
                    name: 'organization',
                    component: () => import('@/views/Management/Organization'),
                },
                //数据管理
                {
                    path: '/management/datapermission',
                    meta: {
                        title: '数据管理'
                    },
                    name: 'datapermission',
                    component: () => import('@/views/Management/Datapermission'),
                },
                //结算   结算列表
                {
                    path: '/accounts/list',
                    meta: {
                        title: '结算列表'
                    },
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
                //补贴
                {
                    path: '/accounts/subsidy',
                    meta: {
                        title: '补贴'
                    },
                    name: 'subsidy',
                    component: () => import('@/views/Settleaccounts/Subsidy'),
                },
                //数据导入
                {
                    path: '/accounts/dataimporting',
                    meta: {
                        title: '数据导入'
                    },
                    name: 'dataimporting',
                    component: () => import('@/views/Settleaccounts/Dataimporting'),
                },
                //商户管理
                {
                    path: '/merchant/list',
                    meta: {
                        title: '商户管理'
                    },
                    name: 'MerchantList',
                    component: () => import('@/views/Merchant/MerchantList'),
                },
                {
                    path: '/newlandaudit',
                    component: () => import('../views/Merchant/NewLandAudit.vue')
                },
                {
                    path: '/newland/info',
                    component: () => import('../views/Merchant/Newland.vue')
                },
                {
                    path: '/merchant/info',
                    component: () => import('../views/Merchant/MerchantInfo.vue')
                },
                //设备列表
                {
                    path: '/equipment/list',
                    meta: {
                        title: '设备列表'
                    },
                    name: 'MerchantList',
                    component: () => import('@/views/Equipment/EquipmentList'),
                },
                //设备配置
                {
                    path: '/equipment/config',
                    meta: {
                        title: '设备配置'
                    },
                    name: 'EquipmentConfig',
                    component: () => import('@/views/Equipment/EquipmentConfig'),
                },
                //设备数据
                {
                    path: '/equipment/data',
                    meta: {
                        title: '设备数据'
                    },
                    name: 'EquipmentData',
                    component: () => import('@/views/Equipment/EquipmentData'),
                },
                //收银设备绑定
                {
                    path: '/equipment/cashierbind',
                    meta: {
                        title: '收银设备绑定'
                    },
                    name: 'EquipmentData',
                    component: () => import('@/views/Equipment/CashierBind'),
                },
                //库存管理
                {
                    path: '/entrepot',
                    component: () => import('@/components/EntrepotHeader'),
                    redirect: '/entrepot/unshipped',
                    children: [
                        //出库
                        {
                            path: '/entrepot/outrecord',
                            meta: {
                                title: '出库管理'
                            },
                            component: () => import('@/views/Equipment/EntrepotOut'),
                        },

                        //入库
                        {
                            path: '/entrepot/getrecord',
                            meta: {
                                title: '入库管理'
                            },
                            component: () => import('@/views/Equipment/EntrepotGet'),
                        },
                        //未发货
                        {
                            path: '/entrepot/unshipped',
                            component: () => import('@/views/Equipment/Unshipped'),
                        },
                        //设备库存
                        {
                            path: '/entrepot/repertory',
                            meta: {
                                title: '设备库存'
                            },
                            component: () => import('@/views/Equipment/Repertory'),
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
    if (to.name == 'Login' && window.sessionStorage.getItem('token')) {
        next({path: '/'})
    } else {
        
        var Arr= JSON.parse(sessionStorage.getItem('menuTagArr'))
        if(Arr==null){
            Arr=[]
            Arr.push({
                'title':to.meta.title,
                'path':to.path
            })
            sessionStorage.setItem('menuTagArr',JSON.stringify(Arr))
            State.menuTagArr=Arr
        }else{
            Arr.push({
                'title':to.meta.title,
                'path':to.path
            })
            const res = new Map();
           var NewArr= Arr.filter((Arr) => !res.has(Arr.title) && res.set(Arr.title, 1));
            sessionStorage.setItem('menuTagArr',JSON.stringify(NewArr))
            State.menuTagArr=NewArr
        }
        next()
    }
});

export default router;
