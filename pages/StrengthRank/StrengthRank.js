// pages/rankingList/rankingList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user1: '/mini_icon/li_avatar.png'
  },

  green:function(e){
    wx.navigateTo({
      url: '../charmRank/charmRank',
    })
    console.log(e)
  },

})