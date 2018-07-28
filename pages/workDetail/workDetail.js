// pages/workDetail/workDetail.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 作品数据(待传入)
    worksArray: [],
    'type': null,
    nworksPerPage: 5,
  },

  /**
   * 作品点击函数
   */
  bindTapToAudioPage: function (event) {
    // 获得列表点击索引
    var index = event.currentTarget.dataset.idx;
    var audioId = this.data.worksArray[index].audioId;

    var options = {
      'type': this.data.type,
      'title': this.data.worksArray[index].title,
      'audioId': audioId,
      'index': index,
    }
    
    // 此处替换新页
    wx.navigateTo({
      url: '../audioPage/audioPage?options=' + JSON.stringify(options),
    });
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
    that.worksArray = [
      { "title": "作品1", "date": "时间1", "score": 1, "like": 1, 'imageSrc': 'url1...', 'username': "", 'audioId': '',},
      { "title": "作品2", "date": "时间2", "score": 2, "like": 2, 'imageSrc': 'url2...'},
      { "title": "作品3", "date": "时间3", "score": 3, "like": 3, 'imageSrc': 'url3...'},
      { "title": "作品4", "date": "时间4", "score": 4, "like": 4, 'imageSrc': 'url4...'},
      { "title": "作品5", "date": "时间5", "score": 5, "like": 5, 'imageSrc': 'url5...'},
      { "title": "作品6", "date": "时间6", "score": 6, "like": 6, 'imageSrc': 'url6...'},
      { "title": "作品7", "date": "时间7", "score": 7, "like": 7, 'imageSrc': 'url7...'}];
    
    // console.log(this.data.worksArray);
    var optionObj = JSON.parse(options.options);
    
    that.setData({
      'worksArray': that.worksArray,
      'type': optionObj.type,
    });

    // 首次进入页面加载前10个作品
    var initNum = 10;
    var initPage = 1;
    if (optionObj.type == 0) {
      wx.setNavigationBarTitle({
        title: '我的作品',
      });
      that.requestWorksList({
        type: 0,
        page: initPage,
        num: initNum,
      });
    } else if (optionObj.type == 1) {
      wx.setNavigationBarTitle({
        title: '我的作品'
      });
      that.requestWorksList({
        type: 1,
        page: initPage,
        num: initNum,
      });
    } else if (optionObj.type == 2) {
      wx.setNavigationBarTitle({
        title: '我的收藏'
      });
      that.requestWorksList({
        type: 2,
        page: initPage,
        num: initNum,
      });
    } else if (optionObj.type == 3) {

    } else {
      console.log('错误请求 type:' + options.type);
    }    
  },

  /**
   * 请求作品数据
   */
  requestWorksList: function(options) {
    var that = this;
    var postData = {
      'type': options.type,
      'page': options.page,
      'num': options.num,
      'userId': app.globalData.userId,
      'token': app.globalData.token,
    };
    //console.log("post data: ", postData);
    wx.request({
      url: 'http://134.175.160.37/myaudio',      
      method: 'POST',      
      data: postData,
      success: function (res) {
        if (res.statusCode == 0) { // 失败
          console.log("请求出错！");
        } else if (!res.data.data.length) {
          console.log('没有数据');
        } else {
          that.data.worksArray = that.data.worksArray.concat(res.data);
          that.setData({
            worksArray: that.data.worksArray,
          });
        }
        console.log(res);
      },
      fail: function(e) {
        console.log('请求作品列表出错: ' +  options.type);
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