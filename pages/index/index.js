// pages/myPage/myPage.js
var app=getApp();
var host=app.globalData.host;
var token = app.globalData.token;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    home_swiper_array: [],
    current_index:0,
    home_tab_array:[],
    current_tab:0,
    host:host,

  },
  //点击轮播图
  onTapSwiper:function(e){
    var index=e.currentTarget.dataset.swiperindex;
  },
  bindTapToPlayPage:function(e){
    var eData = e.currentTarget.dataset;
    var imgIndex = eData.imgindex;
    var tabIndex=eData.tabindex;
    var isHot = eData.isHot?"hot":"new";
    var vedioId = this.data.home_tab_array[tabIndex][isHot][imgIndex-0].vedioId;

    wx.navigateTo({
      url: '../playPage/playPage?vedioId=' + vedioId,
    })
  },
  //点击更多
  bindTapToWorkDetail: function (e) {
    const type=e.target.dataset.type+1;
    const hot=e.target.dataset.hot;
    console.log(type+"  "+hot);
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
    console.log(app.globalData.token);
    //请求轮播图数据
     wx.request({
       url: host+"/swiper",
       method:"POST",
       data:{
         token: token
       },
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
       url: host+'/mainpage',
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
         console.log(res.data);
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

})