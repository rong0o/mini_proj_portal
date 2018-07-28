// pages/playPage/playPage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'videoSrc': "../../../img/柯南被亲亲.mp4",
    'collectFlag': 0,
    'powerArray': null,
    'charmArray': null,
    'title': null,
    'desc': null, // 描述（已录音数）
    'powerImgSrc': '../../../mini_icon/power.png',
    'charmImgSrc': '../../../mini_icon/charm.png',
    'recordSrc': '../../../mini_icon/PKlogo-02.png', 
  },

  bindTapToRecording: function() {
    wx.navigateTo({
      url: '../recording/recording?' + this.data.userId 
      + '&audioId=' + this.data.videoId
      + '&token=' + this.data.token,
    })
  },

  /**
   * 导航到录音作品页，内部调用
   */
  __navigateToAudioPage: function(options) {    
    wx.navigateTo({
      url: '../userPlayPage/userPlayPage?audioId=' + options.audioId,
    });
  },

  /**
   * 点击实力排行榜用户
   */
  bindtapToPowerUser: function(e) {
    var idx = e.currentTarget.dataset.idx; // 点击用户索引
    var options = {
      audioId: this.data.powerArray[idx].audioId,
    };
    this.__navigateToAudioPage(options);
  },

  /**
   * 点击魅力排行榜用户
   */
  bindtapToCharmUser: function(e) {
    var idx = e.currentTarget.dataset.idx;
    var options = {
      audioId: this.data.charmArray[idx].audioId,
    };
    this.__navigateToAudioPage(options);
  },  

  /**
   * 当前页请求数据
   */
  requestvideo: function(options) {
    var that = this;
    wx.request({
      url: 'http://134.175.160.37/vedioDetail',
      method: 'POST',
      data: {
        videoId: options.videoId,
        token: options.token,
      },
      success: function (res) {      
        that.setData({
          'videoSrc': that.data.videoSrc,
          'collectFlag': res.collectFlag,
          'powerArray': res.power,
          'charmArray': res.charm,
          'title': res.title,
          'desc': res.desc,
        });
      },
      fail: function(e) {
        console.log('playPage request audio fail.');
        console.log(e.detail.errMsg);
      },
    });
  },

  /**
   * 收藏作品
   */
  bindCollectWork: function() {
    var that = this;
    var collectFlag = 0;    
    if (!that.data.collectFlag) {
      collectFlag = 1;
    } 
    wx.request({
      url: 'http://134.175.160.37/collection_video',
      header: {
        'Accept': '*/*',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: {
        'userId': app.globalData.userId,
        'audioId': 2,
        'token': app.globalData.token,
        'collectFlag': collectFlag,
      },
      success: function() {
        that.setData({collectFlag: collectFlag});
      },
      fail: function(e) {
        that.setData({collectFlag: 1 - collectFlag});
        console.log('收藏失败');
        console.log(e.detail.errMsg);
      },
      complete: function() {
        // that.setData({ collectFlag: collectFlag }); // 测试图标变换
      },
    });
    
  },

  /**
   * 分享按钮回调函数
   */
  onShareAppMessagege: function(options) {
    var that = this;
    var shareObj = {
      imgUrl: '',
      title: '配音大PK' + this.data.title,
      success: function(res) {

      },
      fail: function(e) {
        console.log(e.errMsg);
      },
    };
    // 采用button分享
    // if (options.from == 'button') {

    // }
    return shareObj;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    // this.options = JSON.parse(options.options);
    // this.setData({
    //   type: this.options.type,    
    //   videoId: this.options.videoId,
    // });

    // 测试数据
    var test_img = './img/img_test.jpg';
    var testData = [
      {username: 'name1', power: 'p1', charm: 'c1', userImg: test_img},
      { username: 'name2', power: 'p2', charm: 'c2', userImg: test_img },
      { username: 'name3', power: 'p3', charm: 'c3', userImg: test_img },
      { username: 'name4', power: 'p4', charm: 'c4', userImg: test_img },
      { username: 'name5', power: 'p5', charm: 'c5', userImg: test_img },
    ];
    this.setData({
      powerArray: testData,
      charmArray: testData,
      charmImg: test_img,
      powerImg: test_img,
    });
    console.log(this.data.powerArray);
    // 测试数据结束


    var reqOps = {
      videoId: this.data.videoId,
      token: app.globalData.token,
    };
    //this.requestvideo(reqOps);
  },

  /**
   * 视频错误处理
   */
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})