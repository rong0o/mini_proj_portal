// pages/myPage/myPage.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {}
  },
  onLoad: function() {
    var that = this
    if (this.getUser == true) {
      canIUse = false
    } else {
      var nickname = wx.getStorageSync('nickname')
      var avatarurl = wx.getStorageSync('avatarurl')
      var userInfo = wx.getStorageSync('userInfo')
      if (nickname != '' && nickname != null) {
        console.log(nickname)
        console.log(avatarurl)
        that.setData({
          userInfo: userInfo,
          canIUse: false,
          getUser: true
        })
      } else {
        wx.getSetting({
          success: function(res) {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success: function(res) {
                  console.log(res.userInfo)
                  console.log(res.encryptedData)

                  that.setData({
                    userInfo: res.userInfo,
                    canIUse: false,
                    getUser: true
                  })
                }
              })
            }
          }
        })
      }
    }
  },

  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo)
    try {
      var nickname = e.detail.userInfo.nickName
      var avatarurl = e.detail.userInfo.avatarUrl
      var wechatid = wx.getStorageSync('wechatid')
      
      wx.setStorageSync('nickname', e.detail.userInfo.nickName)
      wx.setStorageSync('avatarurl', e.detail.userInfo.avatarUrl)
      wx.setStorageSync('userInfo', e.detail.userInfo)

      wx.request({
        url: 'localhost:/user/add', //仅为示例，并非真实的接口地址
        data: {
          nickname: nickname,
          avatarurl: avatarurl,
          wechatid: wechatid
        },
      })
    } catch (e) {

    }
    var that = this
    that.setData({
      userInfo: e.detail.userInfo,
      canIUse: false,
      getUser: true
    })
  },
  bindTapToMyWorks: function() {
    wx.navigateTo({
      url: '../workDetail/workDetail',
    })
  },
  bindTapMyCollect: function() {
    wx.navigateTo({
      url: '../workDetail/workDetail',
    })
  },
  bindTapToMyPower: function () {
    /*wx.navigateTo({
      //url: '../myPower/myPower',
      url: '../StrengthRank/StrengthRank',
    })*/
    wx.switchTab({
      url: '../StrengthRank/StrengthRank',
    })
  },
  bindTapToMyCharm: function () {
    wx.navigateTo({
      //url: '../myCharm/myCharm',
      url: '../charmRank/charmRank',
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})