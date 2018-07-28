// pages/userPlayPage/userPlayPage.js
var app = getApp();
var host = app.globalData.host;
var token = app.globalData.token;
var userId = app.globalData.id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: [],
    audioId: 0,
    isLike: false,
    isCollect: false,
    collect_text: "收藏",
    dianzan_color: "#bfbfbf",
    isCommentIput: false,
    vedioScr: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
    audioScr: "",
    charisma: "",
    power: "",
    username: "",
    userImage: 'http://ojg9qyra6.bkt.clouddn.com/1.png',
    recordDate: ""
  },
  onTapInputComment: function () {
    var isCommentIput = this.data.isCommentIput;
    this.setData({
      isCommentIput: !isCommentIput
    });
  },
  onCommentSubmit: function (e) {
    this.setData({
      isCommentIput: !this.data.isCommentIput
    });
    console.log(e.detail)
    //发送评论
    var url = host + "/commitComment";
    var data = {
      audioId: audioId,
      userId: userId,
      comment: e.target.value.comment,
      num: 1,
      token: token,
    };
    var callback = () => {
      this.setData({
        comment: res.data.data
      });
      console.log(res.data.data);
    }
    this.ajax(url, data, callback);
  },
  //点赞
  onTapLike: function (e) {
    var isLike = this.data.isLike;
    this.setData({
      isLike: !isLike
    });
    var like_type = !isLike ? 1 : 2;
    var url = host + "/audioLike";
    var data = {
      audioId: audioId,
      userId: userId,
      type: like_type,
      token: token,
    };
    var callback = () => {
      this.setData({
        charisma: res.data.data.charm
      });
      console.log(res.data.data);
    }
    this.ajax(url, data, callback);

  },
  //收藏
  onTapCollect: function (e) {
    var isCollect = !this.data.isCollect;
    var collectText = isCollect ? "取消收藏" : "收藏";
    this.setData({
      isCollect: isCollect,
      collect_text: collectText
    });
    var collect_type = !isCollect ? 1 : 2;
    var url = host + "/collection_audio";
    var data = {
      audioId: audioId,
      userId: userId,
      type: like_type,
      token: token,
    };
    var callback = () => {
    }
    this.ajax(url, data, callback);
  },
  onTapToRecording: () => {

  },
  //刷新评论列表
  onScrollCommentList: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      audioId: options.audioId
    })
    //请求视频信息
    var url = host + "/audioDetail";
    var data = {};
    var callback = () => {
      this.setData({
        vedioScr: this.data.data.vedioScr,
        audioScr: this.data.data.audioScr,
        charisma: this.data.data.like,
        power: this.data.data.score,
        username: this.data.data.username,
        userImage: this.data.data.userImage,
        recordDate: this.data.data.recordDate
      });
      console.log(res.data.data);
    }
    this.ajax(url, data, callback)

    //请求评论列表
    this.reqCommit(1, 1);

    //查询点赞
    var url = host + "/audioLike";
    var data = {
      audioId: audioId,
      userId: userId,
      type: 0,
      token: token,
    };
    var callback = () => {
      this.setData({
        isLike: res.data.data.like
      });
      console.log(res.data.data);
    }
    this.ajax(url, data, callback);
    //查询收藏
    var url = host + "/collection_audio";
    var data = {
      audioId: audioId,
      userId: userId,
      type: like_type,
      token: token,
    };
    var callback = (res) => {
      var isCollect = res.data.data.collect;
      var collectText = isCollect ? "取消收藏" : "收藏";
      this.setData({
        isCollect: isCollect,
        collect_text: collectText
      });
    }
    this.ajax(url, data, callback);
  },


  //请求函数：
  ajax: function (url, data, callback) {
    wx.request({
      url: host + "/audioDetail",
      data: data,
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: function () {
        callback && callback();
      },
      fail: function () {
        console.log(url + "data error");
      }
    });
  },
  //评论请求函数
  reqCommit: function (page, audioId) {
    wx.request({
      url: host + "/comment",
      method: "GET",//"POST",
      data: {
        page: page,
        num: 8,
        audioId: audioId
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        this.setData({
          comment: res.data.data
        });
        console.log(res.data.data);
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