// var app = getApp();
// var token = app.globalData.token
// var wechatid = app.globalData.wechatid

// var id = app.globalData.id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    length:0,
    others: [ ],

    oo: [{
      userId: 1,
      username: "小风筝f",
      userImage: null,
      rank: 9,
      value: 80
    },
      {
        userId: 1,
        username: "小风筝f",
        userImage: null,
        rank: 9,
        value: 80
      },
      {
        userId: 1,
        username: "小风筝f",
        userImage: null,
        rank: 9,
        value: 80
      },
      {
        userId: 1,
        username: "小风筝f",
        userImage: null,
        rank: 9,
        value: 80
      },
      {
        userId: 1,
        username: "小风筝f",
        userImage: null,
        rank: 9,
        value: 80
      }
    ],


    tree: '/mini_icon/greenTree.png',
    // greenTree: '/mini_icon/greenTree.png',


    user1: '/mini_icon/li_avatar.png',
    user2: '/mini_icon/li_avatar.png',
    isCharm: true,
    isStrength: false,
    isClickUser1: false,
    isClick: false,

    isClickUser2: false,
    isClick2: false,

    isClickUser3: false,
    isClick3: false,

    isClickUser4: false,
    isClick4: false,

    isClickUser5: false,
    isClick5: false,
    image_url: 'http://134.175.160.37/image/greenTree.png',
  },

  yellow: function (e) {
    // wx.switchTab({
    //   url: '../StrengthRank/StrengthRank',
    // })
    this.setData({
      isCharm: false,
      isStrength: true,
      image_url: 'http://134.175.160.37/image/yellowTree.png',
      tree: '/mini_icon/yellowTree.png',
    })

    var app = getApp();
    var token = app.globalData.token
    var wechatid = app.globalData.wechatid
    var id = app.globalData.id
    var that = this
    //请求首页图片
    wx.request({
      url: app.globalData.host + '/ranking',
      method: "POST",
      data: {
        userId: id,
        token: token,
        num: 15,
        type: 1,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data.data.others)

        // console.log(res.data.data.others.length)
        if (res.data.error_code == 0) {
          this.setData({
            others: res.data.data.others,
            length: res.data.data.others.length,
          });
        } else {
          console.log("ERROR:error_code-------" + res.error_code);
        }


        for (var i = 0; i < 5; i++) {
          this.data.oo[i].userId = this.data.others[i + this.data.index * 5].userId;
          this.data.oo[i].username = this.data.others[i + this.data.index * 5].username;
          this.data.oo[i].userImage = this.data.others[i + this.data.index * 5].userImage;
          this.data.oo[i].value = this.data.others[i + this.data.index * 5].value;
          this.data.oo[i].rank = this.data.others[i + this.data.index * 5].rank;
        }
        this.setData({
          oo: that.data.oo
        })
      }
    })
  },

  green: function (e) {
    this.setData({
      isCharm: true,
      isStrength: false,
      image_url: 'http://134.175.160.37/image/greenTree.png',
      tree: '/mini_icon/greenTree.png',

    })

    var app = getApp();
    var token = app.globalData.token
    var wechatid = app.globalData.wechatid
    var id = app.globalData.id
    var that = this
    //请求首页图片
    wx.request({
      url: app.globalData.host + '/ranking',
      method: "POST",
      data: {
        userId: id,
        token: token,
        num: 15,
        type: 0,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data.data.others)

        // console.log(res.data.data.others.length)
        if (res.data.error_code == 0) {
          this.setData({
            others: res.data.data.others,
            length: res.data.data.others.length,
          });
        } else {
          console.log("ERROR:error_code-------" + res.error_code);
        }


        for (var i = 0; i < 5; i++) {
          this.data.oo[i].userId = this.data.others[i + this.data.index * 5].userId;
          this.data.oo[i].username = this.data.others[i + this.data.index * 5].username;
          this.data.oo[i].userImage = this.data.others[i + this.data.index * 5].userImage;
          this.data.oo[i].value = this.data.others[i + this.data.index * 5].value;
          this.data.oo[i].rank = this.data.others[i + this.data.index * 5].rank;
        }
        this.setData({
          oo: that.data.oo
        })
      }
    })
  },

  one: function (e) {
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

  four: function (e) {
    console.log(e)

    if (this.isClick4) {
      this.isClick4 = false
      this.setData({
        isClickUser4: false
      })
      console.log("isClickUser4" + this.data.isClickUser4)
    } else {
      this.setData({
        isClickUser4: true
      })
      this.isClick4 = true
      console.log("isClickUser4 another" + this.data.isClickUser4)
    }
  },

  five: function (e) {
    console.log(e)

    if (this.isClick5) {
      this.isClick5 = false
      this.setData({
        isClickUser5: false
      })
    } else {
      this.setData({
        isClickUser5: true
      })
      this.isClick5 = true
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
    var that = this
    //请求首页图片
    wx.request({
      url: app.globalData.host + '/ranking',
      method: "POST",
      data: {
        userId: id,
        token: token,
        num: 15,
        type: 0,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data.data.others)

        // console.log(res.data.data.others.length)
        if (res.data.error_code == 0) {
          this.setData({
            others: res.data.data.others,
            length: res.data.data.others.length,
          });
        } else {
          console.log("ERROR:error_code-------" + res.error_code);
        }

        
        for (var i = 0; i < 5; i++) {
          this.data.oo[i].userId = this.data.others[i + this.data.index * 5].userId;
          this.data.oo[i].username = this.data.others[i + this.data.index * 5].username;
          this.data.oo[i].userImage = this.data.others[i + this.data.index * 5].userImage;
          this.data.oo[i].value = this.data.others[i + this.data.index * 5].value;
          this.data.oo[i].rank = this.data.others[i + this.data.index * 5].rank;
        }
        this.setData({
          oo: that.data.oo
        })
      }
    })
  },

 
  nextPage: function (options) {
    if (this.data.index * 5 <= this.data.length - 10) {
      this.data.index = this.data.index + 1
    }
    for (var i = 0; i < 5; i++) {
      this.data.oo[i].userId = this.data.others[i + this.data.index * 5].userId;
      this.data.oo[i].username = this.data.others[i + this.data.index * 5].username;
      this.data.oo[i].userImage = this.data.others[i + this.data.index * 5].userImage;
      this.data.oo[i].value = this.data.others[i + this.data.index * 5].value;
      this.data.oo[i].rank = this.data.others[i + this.data.index * 5].rank;
    }
    var that = this
    this.setData({
      oo: that.data.oo
    })
  },

  upPage: function (options) {
    if (this.data.index > 0) {
      this.data.index = this.data.index - 1
    }
    for (var i = 0; i < 5; i++) {
      this.data.oo[i].userId = this.data.others[i + this.data.index * 5].userId;
      this.data.oo[i].username = this.data.others[i + this.data.index * 5].username;
      this.data.oo[i].userImage = this.data.others[i + this.data.index * 5].userImage;
      this.data.oo[i].value = this.data.others[i + this.data.index * 5].value;
      this.data.oo[i].rank = this.data.others[i + this.data.index * 5].rank;
    }
    var that = this
    this.setData({
      oo: that.data.oo
    })
  }
})