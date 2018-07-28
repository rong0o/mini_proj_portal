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
    isCharm: true,
    isStrength: false,
    isClickUser1:false,
    isClick: false,

    isClickUser2: false,
    isClick2: false,

    isClickUser3: false,
    isClick3: false,
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
          console.log(res.data.data.others.length)
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

  two: function (e) {
    console.log(e)

    if (this.isClick2) {
      this.isClick2 = false
      this.setData({
        isClickUser2: false
      })
      console.log("isClickUser2" + this.data.isClickUser2)
    } else {
      this.setData({
        isClickUser2: true
      })
      this.isClick2 = true
      console.log("isClickUser2 another" + this.data.isClickUser2)
    }
  },

  three: function (e) {
    console.log(e)

    if (this.isClick3) {
      this.isClick3 = false
      this.setData({
        isClickUser3: false
      })
      console.log("isClickUser3" + this.data.isClickUser3)
    } else {
      this.setData({
        isClickUser3: true
      })
      this.isClick3 = true
      console.log("isClickUser3 another" + this.data.isClickUser3)
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