// pages/myPage/myPage.js
var app=getApp();
var host=app.globalData.host;
Page({
  /**
   * 页面的初始数据
   */
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    try {
      var nickname = e.detail.userInfo.nickName
      var avatarurl = e.detail.userInfo.avatarUrl
      var wechatid = wx.getStorageSync('wechatid')
      console.log(wechatid)
      wx.setStorageSync('nickname', e.detail.userInfo.nickName)
      wx.setStorageSync('avatarurl', e.detail.userInfo.avatarUrl)
      wx.setStorageSync('userInfo', e.detail.userInfo)
      wx.request({
        url: 'http://134.175.160.37:80/user/add', //仅为示例，并非真实的接口地址
        data: {
          username: nickname,
          avatarUrl: avatarurl,
          wechatid: wechatid,
          token: wechatid
        },
        success: function (res) {
          app.globalData.id = res.data.id
        }
      })
      this.bindTapToPlayPage()
      /*wx.navigateTo({
        url: '../workDetail/workDetail',
      })*/
    } catch (e) {

    }
    var that = this
    that.setData({
      userInfo: e.detail.userInfo,
      canIUse: false,
      getUser: true
    })
  },
  bindTapToPlayPage:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  //点击更多
  bindTapToWorkDetail: function (e) {
    const type=e.target.dataset.type+1;
    const hot=e.target.dataset.hot;
    wx.navigateTo({
      url: '../workDetail/workDetail?type=' + type+'&hot='+hot,
    })
  },
  bindTapToSwitchNav:function(e){
    let index = e.target.dataset.index;
    this.setData({
      current_index:index,
      current_tab:index,
    })
  },
  tabChange:function(e){
    this.setData({
      current_index:e.detail.current
    });
    console.log(1);

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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