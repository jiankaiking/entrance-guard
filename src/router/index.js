import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

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
          meta: { title: '首页', historyFlag: true }
        },
        // 用户信息
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/User/Usermessges'),
          meta: { title: '个人信息', historyFlag: true }
        },
        // 日志
        {
          path: '/log/operation',
          name: 'organization1',
          component: () => import('@/views/Log/Organization'),
          meta: { title: '操作日志' }
        },
        {
          path: '/log/loginlog',
          name: 'loginlog',
          component: () => import('@/views/Log/Loginlog'),
          meta: { title: '登录日志' }
        },
        {
          path: '/log/equipment',
          name: 'equipmentLog',
          component: () => import('@/views/Log/equipmentLog'),
          meta: { title: '设备日志' }
        },
        // 系统配置sysconfig
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
          meta: { title: '个人信息' }
        },
        // 任务管理  taskmanagement
        {
          path: '/sysconfig/taskmanagement',
          name: 'taskmanagement',
          component: () => import('@/views/Sysconfig/Taskmanagement'),
          meta: {
            title: '任务管理'
          }
        },

        // 菜单管理
        {
          path: '/menuadmin', name: 'menuadmin', meta: {
            title: '菜单管理'
          }, component: () => import('@/views/Menuadmin/Menuadmin')
        },

        // 权限管理  功能
        {
          path: '/management/fucmanagement', meta: {
            title: '功能权限'
          },

          name: 'fucmanagement',
          component: () => import('@/views/Management/Fucmanagement')
        },
        // 人员管理
        {
          path: '/management/personnel',
          meta: {
            title: '人员管理'
          },
          name: 'personnelmanagement',
          component: () => import('@/views/Management/Personnelmanagement')
        },
        // 组织机构管理
        {
          path: '/management/organization',
          meta: {
            title: '组织机构管理'
          },
          name: 'organization',
          component: () => import('@/views/Management/Organization')
        },
        // 公告中心
        {
          path: '/announcement',
          meta: {
            title: '公告中心'
          },
          name: 'announcement',
          component: () => import('@/views/message/Announcement')
        },
        // 代理商活动
        {
          path: '/agentactive',
          meta: {
            title: '代理商活动'
          },
          name: 'agentactive',
          component: () => import('@/views/message/AgentActive')
        },
        // 商户活动
        {
          path: '/businessactive',
          meta: {
            title: '商户活动'
          },
          name: 'businessactive',
          component: () => import('@/views/message/BusinessActive')
        },
        // 活动新增
        {
          path: '/activeadd',
          meta: {
            title: '活动新增'
          },
          name: 'activeadd',
          component: () => import('@/views/message/moduleModel/ActiveAdd')
        },
        // 设备类型
        {
          path: '/equipment/type',
          name: 'equipmentType',
          component: () => import('@/views/Equipment/equipmentType'),
          meta: {
            title: '设备类型'
          }
        },
        // 界控报警
        {
          path: '/control/info',
          name: 'controlInfo',
          component: () => import('@/views/Equipment/controlInfo'),
          meta: {
            title: '界控报警'
          }
        },
        // 区域类型
        {
          path: '/area/type',
          name: 'areaType',
          component: () => import('@/views/Area/areaType'),
          meta: {
            title: '区域类型'
          }
        },
        // 视频监控 /equiment/list
        {
          path: '/monitor',
          name: 'monitor',
          component: () => import('@/views/Equipment/monitor'),
          meta: {
            title: '视频监控'
          }
        },
        // 视频监控
        {
          path: '/equiment/list',
          name: 'equipmentList',
          component: () => import('@/views/Equipment/equipmentList'),
          meta: {
            title: '设备列表'
          }
        },
        {
          path: '/plotlist',
          name: 'communityList',
          component: () => import('@/views/Community/communityList'),
          meta: {
            title: '小区列表'
          }
        },
        {
          path: '/residential/admin',
          name: 'residentialAdmin',
          component: () => import('@/views/Community/residentialAdmin'),
          meta: {
            title: '住宅楼管理'
          }
        },
        {
          path: '/proprietor/list',
          name: 'proprietorList',
          component: () => import('@/views/Community/proprietorList'),
          meta: {
            title: '业主管理'
          }
        },
        // 房间列表
        {
          path: '/room/list',
          name: 'roomList',
          component: () => import('@/views/Community/roomList'),
          meta: {
            title: '房间列表'
          }
        },
        {
          path: '/visit/list',
          name: 'visitList',
          component: () => import('@/views/Community/visitList'),
          meta: {
            title: '来访管理'
          }
        },
        {
          path: '/visit/invited',
          name: 'invited',
          component: () => import('@/views/Community/moduleModel/invited')
        },
        {
          path: '/area/admin',
          name: 'areaAdmin',
          component: () => import('@/views/Area/areaAdmin'),
          meta: {
            title: '区域管理'
          }
        }
      ]

    },
    {
      name: 'Login1', path: '/findpassword', component: () => import('@/views/User/forgetPassword')
    },
    {
      name: 'Login', path: '/login', component: () => import('@/views/Login')
    },
    {
      path: '*',
      name: 'error',
      component: () => import('@/views/error-page/404')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/home/index' || to.path === '/user') {
    window.document.body.style.backgroundColor = '#ffffff'
  } else {
    window.document.body.style.backgroundColor = '#f8f8f8'
  }
  if (sessionStorage.getItem('token')) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (to.path === '/login' || to.path === '/findpassword') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.fullPath }})
    }
  }
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
export default router
