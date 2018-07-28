// pages/myPage/myPage.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    charm:0,
    power:0
  },
  onLoad: function () {
    var userInfo = wx.getStorageSync('userInfo')
    var charm = app.globalData.charm
    var power = app.globalData.power
    var that = this
    that.setData({
      userInfo: userInfo,
      charm: charm,
      power: power
    })
  },
  bindTapToMyWorks: function () {
    wx.navigateTo({
      url: '../workDetail/workDetail?type=0',
    })
  },
  bindTapMyCollect: function () {
    wx.navigateTo({
      url: '../workDetail/workDetail?type=2',
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
