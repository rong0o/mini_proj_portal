// pages/userPlayPage/userPlayPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: [],
    audioId: 0,
    power: 100,
    charisma: 100,
    isLike: false,
    isCollect: false,
    collect_text: "收藏",
    dianzan_color: "#bfbfbf",
    isCommentIput: false,
    vedioInfo: {
      vedioScr: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
      audioScr: "",
      like: "",
      score: "",
      username: "",
      userImage: 'http://ojg9qyra6.bkt.clouddn.com/1.png',
      recordDate: ""
    }
  },
  onTapInputComment: function () {
    var isCommentIput = this.data.isCommentIput;
    this.setData({
      isCommentIput: !isCommentIput
    });
  },
  onCommentSubmit: function (e) {
    //发送评论
    wx.request({
      url: host + "audioDetail",
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.data.error_code == 0) {
          this.setData({
            vedioInfo: res.data.data
          });
          console.log(res.data.data);
        } else
          console.log("ERROR:error_code" + res.data.error_code);
      },
      fail: () => {
        console.log("vedio data error");
      }
    });
  },
  onTapLike: function (e) {
    var isLike = this.data.isLike;
    this.setData({
      isLike: !isLike
    });

  },
  onTapCollect: function (e) {
    var isCollect = !this.data.isCollect;
    var collectText = isCollect ? "取消收藏" : "收藏";
    this.setData({
      isCollect: isCollect,
      collect_text: collectText
    });

  },
  onTapToRecording: () => {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      audioId: options.audioId
    })
    //请求视频信息
    wx.request({
      url: host + "audioDetail",
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.data.error_code == 0) {
          this.setData({
            vedioInfo: res.data.data
          });
          console.log(res.data.data);
        } else
          console.log("ERROR:error_code" + res.data.error_code);
      },
      fail: () => {
        console.log("vedio data error");
      }
    });
    //请求评论列表

  },
  reqCommit: function (page, audioId) {
    wx.request({
      url: host + "comment",
      method: "POST",
      data: {
        page: page,
        num: 8,
        audioId: audioId
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.data.error_code == 0) {
          this.setData({
            comment: res.data.data
          });
          console.log(res.data.data);
        } else
          console.log("ERROR:error_code" + res.data.error_code);
      },
      fail: () => {
        console.log("comment data error");
      }
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