const state = {
    status: '',
    token: sessionStorage.getItem('token') || '',
    user: JSON.parse(sessionStorage.getItem('user')) || '',
    organArr:JSON.parse(sessionStorage.getItem('organArr')) || '',
    systemArr: JSON.parse(sessionStorage.getItem('systemArr')) || '',
    menuTagArr: JSON.parse(sessionStorage.getItem('menuTagArr')) || [{title:'首页',path:'/'}],
}
export default state
