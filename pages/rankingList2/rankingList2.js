
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user1: '/mini_icon/li_avatar.png'
  },

  yellow: function (e) {
    wx.navigateTo({
      url: '../rankingList/rankingList',
    })
    console.log(e)
  },




})