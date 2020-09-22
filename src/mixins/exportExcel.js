const exportExcel = function(methods, url, token, postData) {
  var xhh = new window.XMLHttpRequest()
  var data
  xhh.open(methods, url, true)
  xhh.setRequestHeader('Authorization', token)
  xhh.setRequestHeader('Content-Type', 'application/json')
  data = JSON.stringify(postData)
  xhh.responseType = 'blob'
  xhh.onreadystatechange = function () {
    if (xhh.readyState === 4 && xhh.status === 200) {
      var name = window.decodeURIComponent(xhh.getResponseHeader('ajax-filename'))
      var mimeType = xhh.getResponseHeader('ajax-mimeType')
      var blob = new Blob([xhh.response], { type: 'application/vnd.ms-excel;charset=UTF-8' })
      var csvUrl = URL.createObjectURL(blob)
      var link = document.createElement('a')
      link.setAttribute('download', '数据导入' + '.xlsx')
      link.href = csvUrl
      link.click()
    }
  }
  xhh.send(data)
}
export default exportExcel
