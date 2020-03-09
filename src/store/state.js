const state = {
    menu_index: 1,
    status: '',
    cont:0,
    token: localStorage.getItem('token') || '',
    user:JSON.parse(localStorage.getItem('user')) || '',
}
export default state
