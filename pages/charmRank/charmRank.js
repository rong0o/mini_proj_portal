// var app = getApp();
// var token = app.globalData.token
// var wechatid = app.globalData.wechatid

// var id = app.globalData.id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    others: [{
      userid: 1,
      username:"小风筝f",
      userImage:null,
      rank: 9,
      value: 80
    },
      {
        userid: 1,
        username: "小风筝f",
        userImage: null,
        rank: 9,
        value: 80
      },
      {
        userid: 1,
        username: "小风筝f",
        userImage: null,
        rank: 9,
        value: 80
      }
    ],
    user1: '/mini_icon/li_avatar.png',
    user2: '/mini_icon/li_avatar.png',
    stengthContent1: '小星星 实力评分98 超越他还差17个实力值少年 加油~',
    charmContent1: '叮当猫 魅力值2888 超越他还差500个赞哦少年 加油~',
    isCharm: true,
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
        type: 0,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res)
        console.log(res.data.data.others)
        if (res.data.error_code == 0) {
          this.setData({
            others: res.data.data.others
            // user1: '/mini_icon/test_avatar.png'

          });
        } else {
          console.log("ERROR:error_code-------" + res.error_code);
        }
      }
    })
  },

  green: function (e) {
    this.setData({
      isCharm: true,
      isStrength: false,
      image_url: 'http://134.175.160.37/image/greenTree.png',
    })

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
        console.log(res.data.data.others)
        if (res.data.error_code == 0) {
          this.setData({
            others: res.data.data.others
            // user1: '/mini_icon/test_avatar.png'

          });
        } else {
          console.log("ERROR:error_code-------" + res.error_code);
        }
      }
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
        console.log(res.data.data.others)
        if (res.data.error_code == 0) {
          this.setData({
            others: res.data.data.others
            // user1: '/mini_icon/test_avatar.png'

          });
        } else {
          console.log("ERROR:error_code-------" + res.error_code);
        }
      }
    })
  },


})