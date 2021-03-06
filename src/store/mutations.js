const mutations = {
  auth_success(state, data) {
    state.status = 'success'
    const a = JSON.parse(JSON.stringify(data.userInfo))
    state.user = a
    state.token = data.token
  },
  auth_error(state) {
    state.status = 'error'
  },
  logout(state) {
    state.status = ''
    state.token = ''
  },
  SET_USERINFO(state, data) {
    // console.log(data)
    state.user = data
    sessionStorage.setItem('user', JSON.stringify(data))
  },
  SET_TOKEN(state, data) {
    state.user = data.user
    state.token = data.token
  },
  SET_LOCAL(state, data) {
    state.localhref = data
  },
  SET_IFRAME(state, data) {
    state.iframUrl = data
  },
  GET_ORGAN(state, data) {
    state.organArr = data
  },
  GET_STYEMITEM(state, data) {
    state.systemArr = data
  },
  CLOSE_MENU(state, data) {
    if (data.type === 'left') {
      state.menuTagArr.splice(0, data.index)
    } else if (data.type === 'right') {
      state.menuTagArr.splice(data.index + 1)
    } else {
      state.menuTagArr.splice(data.index + 1)
      state.menuTagArr.splice(0, data.index)
    }
    sessionStorage.setItem('menuTagArr', JSON.stringify(state.menuTagArr))
  },

  ADD_TAG_VIEW(state, data) {
    if (data.title) {
      if (!state.menuTagArr.some(item => item.title === data.title)) {
        state.menuTagArr.push(data)
        sessionStorage.setItem('menuTagArr', JSON.stringify(state.menuTagArr))
      }
    }
  }

}
export default mutations
