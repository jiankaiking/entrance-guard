const state = {
    status: '',
    localhref:sessionStorage.getItem('SET_LOCAL') || '',
    token: sessionStorage.getItem('token') || '',
    user: JSON.parse(sessionStorage.getItem('user')) || '',
    iframUrl:sessionStorage.getItem('iframUrl'),
    organArr:JSON.parse(sessionStorage.getItem('organArr')) || '',
    systemArr: JSON.parse(sessionStorage.getItem('systemArr')) || '',
}
export default state
