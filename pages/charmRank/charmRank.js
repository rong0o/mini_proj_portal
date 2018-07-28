// var app = getApp();
// var token = app.globalData.token
// var wechatid = app.globalData.wechatid

// var id = app.globalData.id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    user1: '/mini_icon/li_avatar.png',
    user2: '/mini_icon/li_avatar.png',
    stengthContent1: '小星星 实力评分98 超越他还差17个实力值少年 加油~',
    charmContent1: '叮当猫 魅力值2888 超越他还差500个赞哦少年 加油~',
    isCharm: false,
    isStrength: false,
    isClickUser1:false,
    isClick: false,
    image_url: 'http://134.175.160.37/image/yellowTree.png',
      },

  yellow: function (e) {
    // wx.switchTab({
    //   url: '../StrengthRank/StrengthRank',
    // })
    this.setData({
      isCharm: false,
      isStrength: true,
      image_url: 'http://134.175.160.37/image/yellowTree.png',
    })
    
  },

  green: function (e) {
    this.setData({
      isCharm: true,
      isStrength: false,
      image_url: 'http://134.175.160.37/image/greenTree.png',
    })
  },

  one:function(e){
    console.log(e)

    if (this.isClick) {
      this.isClick = false
      this.setData({
        isClickUser1: false
      })
      console.log("isClickUser1" + this.data.isClickUser1)      
    } else {
      this.setData({
        isClickUser1: true
      })
      this.isClick = true
      console.log("isClickUser1 another" + this.data.isClickUser1)
    }


  },

   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var token = app.globalData.token
    var wechatid = app.globalData.wechatid

    var id = app.globalData.id

    console.log(token)
    //请求首页图片
    wx.request({
      url: app.globalData.host + '/ranking',
      method: "POST",
      data: {
        userId: id,
        token: token,
        num: 10,
        type: 1,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res)
        if (res.data.error_code == 0) {
          console.log(res.data.me.username)
          this.setData({
            user1: res.data.me.userImage
            // user1: '/mini_icon/test_avatar.png'

          });





          this.setData({
            // home_tab_array: res.data.data
          });
        } else {
          console.log("ERROR:error_code-------" + res.error_code);
        }
      }
    })
  },


})