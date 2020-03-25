import dayjs from 'dayjs'
import NP from 'number-precision'
import { verifyTel, showModal } from '/util/mixins'
import { getData } from '/services/service'
import { PaySerllerMain, fetchOrderId } from '/services/preAuthorization'
import { truePrint, notBarCodePrint } from '/util/print'
const app = getApp();

Page({
  data: {
    posid: 'idle_pos', // 海报位置id，目前固定传入idle_pos
    audible: true, // 海报（视频类）是否有声音
    default_poster: '/assets/images/newHomeBanner.jpg',  // 本地兜底海报路径
    show_default_poster: true, // 是否展示本地兜底海报
    money: 0, // 键盘输入的金额
    orderId: null
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  // 海报组件展示成功回调
  onDisplaySuccess() {
    console.log('poster display success')
    this.setData({
      show_default_poster: false
    })
  },
  // 海报组件展示失败的回调
  onDisplayFail(e) {
    console.log('poster display fail, error = ' + e.detail.error)
  },
  // 海报组件广告可用性变化的回调
  onPosterChange(e) {
    console.log('poster availability changed, now has poster = ' + e.detail.hasPoster)
  },
  onReady() {
    //如果是plus设备接收后屏消息
    if (app.globalData.type === 'plus') {
      // this.sendAmountConfig()
      my.ix.offBuddyMessage()
      this.receiveMessage()
      // this.getMessage()
    } else if (app.globalData.type === 'f4') {
      // 页面加载完成 监听键盘事件
      this.keyboardEvent()
    }
    // 等app.js加载完成 发送金额配置给后屏
    setTimeout(()=> {
      this.sendAmountConfig()
    },3000)
  },
  onShow() {
    if (app.globalData.type === 'plus') {
      my.ix.offBuddyMessage()
      this.receiveMessage()
    }
    // 前屏回到首页 给后屏发消息
    let sendObj = { goHome: 'ok' }
    app.sendMessage(sendObj)
  },
  onHide() {
    // 取消消息监听
    if (app.globalData.type === 'plus') {
      my.ix.offBuddyMessage()
    }
  },
  onUnload() {
    // 页面销毁
    // 取消键盘监听
    my.ix.offKeyEventChange();
    // 取消消息监听
    if (app.globalData.type === 'plus') {
      my.ix.offBuddyMessage()
    }
  },
  // 把金额配置发给后屏
  sendAmountConfig() {
    // 把金额配置发消息给后屏 开关状态
    let sendObj = { amountConfig: { amount: app.globalData.amountConfig, boole: app.globalData.amountConfigBoole } }
    console.log('金额配置发消息给后屏--', sendObj)
    app.sendMessage(sendObj)
     // 把权限发给后屏
    let auth = { preOrderAuth: app.globalData.preOrderAuth}
    app.sendMessage(auth)
  },
  receiveMessage() {
    if (app.globalData.type === 'plus') {
      my.ix.onBuddyMessage({
        success: (res) => {
          console.log(res, 'receiveMes')
          this.getMessage(res)
        },
        fail: (error) => {
          console.log('接收后屏消息失败', error)
        }
      })
    }
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },

  // 语音播报(小程序容器>=18版本才能用)
  bothSpeak(val) {
    my.ix.speech({
      text: val,
      success: (r) => { },
      fail: (r) => { console.log('播报失败') }
    })
  },

  // 监听键盘事件
  keyboardEvent() {
    my.ix.onKeyEventChange((r) => {
      // 设置
      if (r.keyCode === 134) {
        my.ix.offKeyEventChange();
        my.reLaunch({ url: '/pages/newSeting/newSeting' })
      } else if (r.keyCode === 133) {
        // 取消
        console.log('取消')
        this.setData({
          money: 0
        })
      } else if (r.keyCode === 132) {
        // 刷脸
        console.log('刷脸')
      } else if (r.keyCode === 131) {
        // 收款
        if (!app.globalData.cookieID) {
          showModal('showToast', { type: 'fail', content: '请先按键盘【设置】键 ，完成【商家登录】后才能收银！' })
          return
        }
        // 独立收银模式
        let { amount } = r
        console.log(amount, 'amount')
        console.log(typeof (amount), 'typeOf-amount')
        if (Number(amount) > 0 && Number(amount) <= 20000) {
          amount = NP.round(Number(amount), 2) // 取两位小数
          // let reg = /^(\d+|\d+\.\d{1,2})$/
          // if (reg.test(Number(amount).toFixed(2)>0&&Number(amount).toFixed(2))) {
          if (amount > 0) {
            this.setData({
              money: amount
            })
            console.log(amount, '独立收银金额money')
            // 调起收银台
            this.goCashier()
          } else {
            console.log(amount, '22')
            showModal('showToast', { type: 'fail', content: '请输入正确的金额' })
          }
        } else if (Number(amount) > 20000) {
          my.ix.voicePlay({
            eventId: 'e3',   //播报语言的标识
            number: '20000',
            success: (r) => {
            },
            fail: (r) => { }
          })
        } else {
          showModal('showToast', { type: 'fail', content: '请输入正确的金额' })
        }
      }
    })
  },


  // 接收后屏消息
  getMessage(res) {
    console.log(res, 'res-mess')
    // 如果用户未登录，给后屏发消息 未登录
    if (!app.globalData.cookieID) {
      showModal('showToast', { type: 'fail', content: '请先按键盘【设置】键 ，完成【商家登录】！' })
      let sendObj = { isLogin: 'no' }
      app.sendMessage(sendObj)
      my.ix.offKeyEventChange();
      my.reLaunch({
        url: '/pages/login/login'
      })
      return false
    }
    if (res) {
      // 扫码查询
      if (res.isScan === 'yes') {
        my.ix.offKeyEventChange();
        my.reLaunch({
          url: '/pages/scanQuery/scanQuery'
        });
        // 后屏点击设置
      } else if (res.goSetting === 'ok') {
        my.ix.offKeyEventChange();
        my.reLaunch({ url: '/pages/newSeting/newSeting' })
        // 后屏独立收银 走独立收银流程
      } else if (res.collection && res.collection.type === 'ok') {
        // 后屏独立收银给前屏发消息：{collection: {type: 'ok' , amount: 0.01}}
        // 把收款金额存起来
        const { amount } = res.collection
        this.setData({
          money: Number(amount) || 0
        })
        // this.checkFace()
        // 调起收银台
        this.goCashier()
      } else if (res.preAuthorization === 'ok') {
        my.ix.offBuddyMessage()
        // 后屏点击预授权 到预授权等待页面
        my.reLaunch({
          url: '/pages/wait/wait'
        });
      } else if (res.preAuthorizationCancel && res.preAuthorizationCancel.type === 'ok') {
        const { status } = res.preAuthorizationCancel
        my.ix.offBuddyMessage()
        my.navigateTo({
          url: `/pages/authorizationPlusList/authorizationPlusList?status=${status}`
        });
        // 预授权撤销
      } else if (res.preAuthorizationFinish && res.preAuthorizationFinish.type === 'ok') {
        // 预授权完成
        const { status } = res.preAuthorizationFinish
        my.ix.offBuddyMessage()
        my.navigateTo({
          url: `/pages/authorizationPlusList/authorizationPlusList?status=${status}`
        });
      }
    }
  },

  // 进入收银台流程 
  async goCashier() {
    try {
      this.setData({
        orderId: null
      })
      await this.getOrderId()
      if (this.data.orderId) {
        this.rouseCheckstand(this.data.orderId, this.data.money)
      }
      // await this.rouseCheckstand(this.data.orderId,this.data.money)
    } catch (error) {
      console.log(error, '失败了')
    }
  },

  // 获取订单号
  async getOrderId() {
    try {
      let parms = {
        snCode: app.globalData.snCode
      }
      console.log(1111)
      const data = await fetchOrderId(parms)
      this.setData({
        orderId: data.orderId
      })
    } catch (err) {
      if (err.code === 400) {
        my.showToast({
          type: 'fail',
          content: '请先按键盘【设置】键 ，完成【商家登录】后才能收银！',
          duration: 3000,
        });
      }
      this.setData({
        orderId: null
      })
      console.log('获取订单号失败', err)
    }
  },

  // 唤起收银台
  rouseCheckstand(orderId, money) {
    console.log(orderId, 'orderId--22')
    my.ix.startApp({
      appName: 'cashier',
      bizNo: orderId,
      totalAmount: money,
      success: res => {
        // res.codeType 返回'C'扫码  'F'刷脸
        this.getResult(res, money)
      },
      fail: error => {
        showModal('showToast', { type: 'fail', content: error.errorMessage })
        // 给后屏发消息 收款失败
        let sendObj = { pay: 'fail', message: error.errorMessage }
        app.sendMessage(sendObj)
        console.log('用户取消收银', error)
      }
    })
  },

  // 扫码付款或刷脸付款后执行
  async getResult(obj, money) {
    try {
      // codeType为F代表刷脸,C代表扫码 barCode刷脸/扫码成功后返回付款码 buyerId买家支付宝user_id,仅在刷脸成功时返回,扫码付款不返回 deviceSn机具SN
      const { codeType, barCode, buyerId = '', deviceSn } = obj
      const { type, snCode } = app.globalData
      const parms_F = {
        amount: money,
        authCode: barCode,
        orderMoney: '',
        snCode: snCode,
        userId: buyerId,
        deviceNumber: deviceSn,
        logNo: this.data.orderId
      }
      const parms_C = {
        authCode: barCode,
        amount: money,
        orderMoney: '',
        discount: '',
        deviceNumber: deviceSn,
        snCode: snCode
      }
      let data = null
      if (codeType === 'C') {
        //扫码付
        data = await PaySerllerMain(parms_C)
      } else {
        //刷脸付
        data = await PaySerllerMain(parms_F)
      }
      showModal('showToast', { content: '付款成功' })
      this.bothSpeak('付款成功')
      // 给后屏发消息 付款成功
      let sendObj = { pay: 'success' }
      app.sendMessage(sendObj)
      // 打印
      console.log('打印data-order', data)
      this.print(data.order)
    } catch (err) {
      console.log(err)
      this.bothSpeak('收款失败')
      // 给后屏发消息 收款失败
      let sendObj = { pay: 'fail' }
      app.sendMessage(sendObj)
    }
  },

  // 打印
  print(val) {
    let obj = val
    if (obj.payType === 'Cash') {
      obj.payType = '现金收款'
    } else if (obj.payType === 'AliPay') {
      obj.payType = '支付宝支付'
    } else if (obj.payType === 'WeChatPay') {
      obj.payType = '微信支付'
    } else if (obj.payType === 'Unknown') {
      obj.payType = '不存在的类型'
    } else if (obj.payType === 'UQRCODEPAY') {
      obj.payType = '银联扫码'
    } else if (obj.payType === 'Unionpay') {
      obj.payType = '银联'
    }
    obj.payTime = dayjs(new Date()).format("YYYY/MM/DD HH:mm:ss")
    console.log(obj, 'obj+time打印')
    // 根据设置开关来判断需不需要打印
    // if (app.globalData.printBoole) {
    //   //检查打印机是否连接
    //     my.ix.queryPrinter({
    //     success: (res) => {
    //       console.log(res, 'res-打印')
    //       // if (res && res.usb.length > 0) {
    //       const { barcodeBoole, printNum } = app.globalData
    //       //判断是否需要打印二维条码
    //       console.log(barcodeBoole, 'barcodeBoole')
    //       if (barcodeBoole) {
    //         for (var i = 0; i < printNum; i++) {
    //           truePrint(obj)
    //         }
    //       } else {
    //         for (var i = 0; i < printNum; i++) {
    //           notBarCodePrint(obj)
    //         }
    //       }
    //     },
    //     fail: (r) => {
    //       console.log(r, '打印机')
    //       showModal('showToast', { content: '请检查打印机是否连接哦 ~', type: 'fail', duration: 2000 })
    //     }
    //   })
    // }
    if (app.globalData.printBoole) {
      //检查打印机是否连接
        if (app.globalData.printConnect) {
          // if (res && res.usb.length > 0) {
          const { barcodeBoole, printNum } = app.globalData
          //判断是否需要打印二维条码
          console.log(barcodeBoole, 'barcodeBoole')
          if (barcodeBoole) {
            for (var i = 0; i < printNum; i++) {
              truePrint(obj)
            }
          } else {
            for (var i = 0; i < printNum; i++) {
              notBarCodePrint(obj)
            }
          }
        } else {
          showModal('showToast', { content: '请检查打印机是否连接哦 ~', type: 'fail', duration: 2000 })
        }
    }
  },

  // 刷脸核身
  checkFace() {
    showModal('showLoading')
    my.ix.faceVerify({
      option: 'life',
      success: (res) => {
        showModal('hideLoading')
      },
      fail: (res) => {
        showModal('hideLoading')
        showModal('showToast', { content: '请重试！刷脸不成功或已取消 ～' })
      }
    })
  }
});
