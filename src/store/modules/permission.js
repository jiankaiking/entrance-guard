import httpRequest from '../../api/api'
const state = {
  menuList: []
}
const mutations = {
  SET_MENU(state, data) {
    state.menuList = data
  }
}

const actions = {
  menuChange({ commit }, data) {
    return new Promise(() => {
      httpRequest('/managecenter/index/getMenuTreeByUser', 'GET')
        .then(res => {
          if (res.success) {
            res.data.filter((item, index) => {
              if (item.menuUrl == null) {
                item.menuUrl = index.toString()
              }
            })
            // console.log(res)
            commit('SET_MENU', res.data)
          }
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
