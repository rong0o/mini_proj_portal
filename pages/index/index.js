// pages/myPage/myPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    home_swiper_array: [{ src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png'}],
    current_index:0,
    home_tab_array:[{
      power_content: [{ src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }],
      idol_content: [{ src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }],
    },{
        power_content: [{ src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }],
        idol_content: [{ src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }],
    },{
        power_content: [{ src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }],
        idol_content: [{ src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }],
    },{
        power_content: [{ src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }],
        idol_content: [{ src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }, { src: 'http://ojg9qyra6.bkt.clouddn.com/1.png' }]
      }],
      current_tab:0,

  },
  bindTapToPlayPage:function(){
    wx.navigateTo({
      url: '../playPage/playPage',
    })
  },
  bindTapToWorkDetail: function () {
    wx.navigateTo({
      url: '../workDetail/workDetail',
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