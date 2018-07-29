// pages/workDetail/workDetail.js
const app = getApp();
const appData = app.globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 作品数据(待传入)
    worksArray: [],
    'type': -1,
    nworksPerPage: 5,
    'playIconSrc': '../../mini_icon/play.png',
    'powerImgSrc': '../../mini_icon/power.png',
    'charmImgSrc': '../../mini_icon/charm.png',
    host: appData.host,
    hot: -1,
    noMoreWorkFlag: 0,
  },

  /**
   * 作品点击函数
   */
  bindTapToAudioPage: function (event) {
    // 获得列表点击索引
    var that = this;
    var index = event.currentTarget.dataset.idx;
    if (that.data.hot == null) { // "我的"页面进入
      var audioId = this.data.worksArray[index].audioId;
      var options = {
        'type': that.data.type - 0,
        'audioId': audioId,
      }
      // 此处替换新页
      wx.navigateTo({
        url: '../userPlayPage/userPlayPage?audioId=' + options.audioId
          + '&type=' + options.type,
      });
    } else { // 主页"更多"进入
      var videoId = this.data.worksArray[index].vedioId;
      var options = {        
        'videoId': videoId,
      };
      // 此处替换新页
      wx.navigateTo({
        url: '../playPage/playPage?videoId=' + options.videoId,
      });
    }
    
  },

  /**
   * 滑到底部加载更多数据
   */
  bindScrollToBottom: function() {
    var curr = this.countWorkPagesNum();
    var options = {
      type: this.data.type,
      num: this.data.nworksPerPage,
      page: curr[1] + 1, // 请求下一页
    };
    this.requestWorksList(options);
  },
  
  /**
   * 计算页数
   */
  countWorkPagesNum: function() {
    var currentNum = this.data.worksArray.length;
    var currentPageNum = Math.ceil(currentNum / this.data.nworksPerPage);
    return [currentNum, currentPageNum];
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var test_worksArray = [];    
    that.setData({
      'worksArray': that.data.worksArray.concat(test_worksArray),
      'type': options.type,
      'hot': options.hot,
    });

    var initNum = that.data.nworksPerPage;
    var initPage = 1;
    console.log(that.data.type);
    if (options.hot == null || options.hot == -1) { // "我的" 页面点入
      switch (that.data.type - 0) {
        case 0: 
          wx.setNavigationBarTitle({ title: '我的作品', });
          that.requestWorksList({
            type: 0,
            page: 1,
          });
          break;        
        case 1: 
          wx.setNavigationBarTitle({ title: '我的作品' });
          that.requestWorksList({
            type: 1,
            page: 1,
          });
          break;
        case 2: 
          wx.setNavigationBarTitle({ title: '我的收藏' });
          that.requestWorksList({
            type: 2,
            page: 1,
          });
          break;
        default: 
          console.log('错误请求 type:' + that.data.type);
          break;
      }      
    } else { // 从主页更多点入
      console.log(this.data.hot);
      if ((this.data.hot - 0) == 0) { // 最新
        switch (that.data.type - 0) {
          case 1: {
            wx.setNavigationBarTitle({ title: '最新 二次元', });
            that.requestMoreVideoList({
              type: 1,
              page: 1,
              hot: 0,
            });
            break;
          }
          case 2: {
            wx.setNavigationBarTitle({ title: '最新 经典' });
            that.requestMoreVideoList({
              type: 2,
              page: 1,
              hot: 0,
            });
            break;
          }
          case 3: {
            wx.setNavigationBarTitle({ title: '最新 经典' });
            that.requestMoreVideoList({
              type: 3,
              page: 1,
              hot: 0,
            });
            break;
          }
          default: {
            console.log('错误请求 type:' + that.data.type + 'hot: ' + that.data.hot);
            break;
          }
        }      
      } else { // 最热
        switch (that.data.type - 0) {
          case 1: {
            wx.setNavigationBarTitle({ title: '最热 二次元', });
            that.requestMoreVideoList({
              type: 1,
              page: 1,
              hot: 1,
            });
            break;
          }
          case 2: {
            wx.setNavigationBarTitle({ title: '最热 经典' });
            that.requestMoreVideoList({
              type: 2,
              page: 1,
              hot: 1,
            });
            break;
          }
          case 3: {
            wx.setNavigationBarTitle({ title: '最热 经典' });
            that.requestMoreVideoList({
              type: 3,
              page: 1,
              hot: 1,
            });
            break;
          }
          default: {
            console.log('错误请求 type:' + that.data.type + 'hot: ' + that.data.hot);
            break;
          }
        }      
      }
    }
    // 首次进入页面加载前10个作品
    
    
  },

  /**
   * 请求作品数据
   */
  requestWorksList: function(options) {
    var that = this;
    var postData = {
      'type': options.type - 0,
      'page': options.page,
      'num': this.data.nworksPerPage,
      //'userId': 94, // !!!!!!!!!!!!!!!!!!! 测试用id      
      'userId': appData.id,
    };
    console.log('userId', appData.id)
    console.log("post data: ", postData);
    wx.request({
      url: appData.host + '/myaudio',      
      method: 'POST',      
      data: postData,
      success: function (res) {
        //console.log(res);
        if (res.statusCode == 0) { // 失败
          console.log("请求出错！requestWorksList", res);
        } else if (!res.data.data.length) {
          console.log('没有更多数据');
        } else {
          console.log(res.data.data);          
          that.data.worksArray = that.data.worksArray.concat(res.data.data);
          that.setData({
            worksArray: that.data.worksArray,
          });
        }        
      },
      fail: function(e) {
        console.log('请求作品列表出错: ' +  options.type);
        console.log(e.errMsg);
      },
    });
  },

  /**
   * 请求更多视频列表
   */
  requestMoreVideoList: function (options) {
    var that = this;
    var postData = {
      'type': options.type - 0,
      'page': options.page - 0,
      'hot': options.hot - 0,
      'num': this.data.nworksPerPage - 0,
      'token': appData.token,
    };
    console.log("post data: ", postData);
    wx.request({
      url: appData.host + '/more',
      method: 'POST',
      data: postData,
      success: function (res) {
        console.log(res);
        if (res.statusCode == 0) { // 失败
          console.log("请求出错！");
        } else if (!res.data.data.length) {
          // console.log('没有更多数据');
        } else {
          //console.log(res.data.data);
          that.data.worksArray = that.data.worksArray.concat(res.data.data);
          that.setData({
            worksArray: that.data.worksArray,
          });
        }
      },
      fail: function (e) {
        console.log('请求作品列表出错: ' + options.type);
        console.log(e.errMsg);
      },
    });
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
