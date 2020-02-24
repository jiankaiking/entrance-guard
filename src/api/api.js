
/*
*
* @wjk
*
* */

import service from './index'


const httpRequest = function (url,method,data) {
    return service({
        url:url,
        method:method,
        data:data
    })
}


export default httpRequest
