const state = {
    status: '',
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || '',
    systemArr: [
        {loginUserId: 1, systemId: 1, userId: 1, systemName: "管理中台系统"},
        {loginUserId: 1, systemId: 2, userId: 1, systemName: "管理中台系统"},
    ]
}
export default state
