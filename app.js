//app.js
App({
  onLaunch: function () {
    wx.setEnableDebug({
      enableDebug: true
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          console.log(res.code)
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx9e946873f852c1cf&secret=a2eb8c22f96238ad991bf929d75806f5&js_code=' + res.code + '&grant_type=authorization_code',
            success: function (res) {
              wx.setStorageSync('wechatid', res.data.openid)
              wx.setStorageSync('token', res.data.openid)
              that.globalData.token = res.data.openid;
              that.globalData.wechatid = res.data.openid;
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    wechatid: null,
    userInfo: null,
    host: "http://134.175.160.37",
    token: 'ooBkB5S0uzPoJ4BlTytIbs1AVbxU',
    id: null,
    power: 0,
    charm: 0
  }
})
