const state = {
    menu_index: 1,
    status: '',
    cont:0,
    token: localStorage.getItem('token') || '',
    user: {}
}
export default state
