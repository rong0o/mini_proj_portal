// pages/myPage/myPage.js
var app=getApp();
var host=app.globalData.host;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    home_swiper_array: [],
    current_index:0,
    home_tab_array:[],
    current_tab:0,

  },
  bindTapToPlayPage:function(){
    wx.navigateTo({
      url: '../playPage/playPage',
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
    //请求轮播图数据
     wx.request({
       url: host+"swiper",
       method:"POST",
       header: {
         'content-type': 'application/json' 
       },
       success: (res) =>{
         if(res.data.error_code==0){
           this.setData({
             home_swiper_array: res.data.data
           });
           console.log(res.data.data);
         }else
            console.log("ERROR:error_code"+res.data.error_code);
       },
       fail:()=>{
         console.log("swiper data error");
       }
     });
     //请求首页图片
     wx.request({
       url: host+'mainpage',
       method: "POST",
       data:{
         type:5,
         num:4,
         token:6
       },
       header: {
         'content-type': 'application/json' // 默认值
       },
       success:(res)=>{
         if (res.data.error_code == 0) {
           this.setData({
             home_tab_array: res.data.data
           });
           console.log(res.data.data);
         }else 
          console.log("ERROR:error_code" + res.data.error_code);
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

  }
})