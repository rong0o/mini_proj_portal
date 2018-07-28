// pages/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tree: '/mini_icon/yellowTree.png',
    others: [],
    position: [{x:'0.2%', y: '35%'},
      {x: '20%',y: '43%'},
      { x: '40%', y: '43%' },
      { x: '60%', y: '50%' },
      { x: '70%', y: '53%' },
    ],
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var token = app.globalData.token
    var wechatid = app.globalData.wechatid
    var id = app.globalData.id
    //请求首页图片
    wx.request({
      url: app.globalData.host + '/ranking',method: "POST",data: {
        userId: id,
        token: token,
        num: 5,
        type: 1},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res)
        if (res.data.error_code == 0) {
          this.setData({
            others: res.data.data.others
          });
        } else {
          console.log("ERROR:error_code-------" + res.error_code);
        }
      }
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
  
  },

  f(e){
    console.log(e)
    console.log(e.target.dataset)
    console.log(e.target.dataset.index)
  }
})

