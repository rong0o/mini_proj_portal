// pages/userPlayPage/userPlayPage.js
var app = getApp();
var host = app.globalData.host;
var token = app.globalData.token;
var userId = app.globalData.id;
var audioId=1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    host:host,
    comment: [],
    isSelf:0,
    isLike: false,
    isCollect: false,
    collect_text: "收藏",
    dianzan_color: "#bfbfbf",
    isCommentIput: false,
    vedioScr: "",
    audioScr: "",
    charisma: "",
    power: "",
    username: "",
    userImage: '',
    recordDate: "",
    comment_page:1
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
    console.log("///");
    console.log(e.detail.value.comment);
    //发送评论
    var url = host + "/commitComment";

    var data = {
      audioId: audioId,
      userId: userId,
      comment: e.detail.value.comment,
      num: 8,
      token: token,
    };
    var callback = (res) => {
      this.setData({
        comment: res.data.data,
        comment_page:1
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
    var callback = (res) => {
      this.setData({
        charisma: res.data.data.charm
      });
      console.log("点赞");
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
    var collect_type = !isCollect ? 2 : 1;
    var url = host + "/collection_audio";
    var data = {
      audioId: audioId,
      userId: userId,
      type: collect_type,
      token: token,
    };
    var callback = (res) => {
    }
    this.ajax(url, data, callback);
  },
  //跳转到录音
  onTapToRecording: function() {
    wx.navigateTo({
      url: '../recording/recording',
    })
  },
  //刷新评论列表
  onScrollCommentList: function() {
    //请求评论列表
    console.log("///");
    console.log(this.data);
    this.reqCommit(this.data.comment_page, audioId);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    audioId=options.audioId;
    userId = app.globalData.id;
    var type=options.type
    //请求视频信息
    var url = host + "/audioDetail";
    var data = {
      audioId:audioId,
      userId: userId,
      token:token,
    };
    var callback = (res) => {
      var rData=res.data.data;
      this.setData({
        vedioSrc: host+rData.vedioSrc,
        audioSrc: rData.audioSrc,
        charisma: rData.like,
        power: rData.score,
        username: rData.username,
        userImage: rData.userImage,
        recordDate: rData.recordDate,
        isSelf:rData.myself
      });
      console.log(res.data.data);
    }
    this.ajax(url, data, callback)

    //请求评论列表
    this.reqCommit(this.data.comment_page, audioId);

    //查询点赞
    var url = host + "/audioLike";
    var data = {
      audioId: audioId,
      userId: userId,
      type: 0,
      token: token,
    };
    var callback = (res) => {
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
      type: 0,
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
      url: url,
      data: data,
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        callback && callback(res);
      },
      fail: function () {
        console.log(url + "data error");
      }
    });
  },
  //评论请求函数
  reqCommit: function (page, audioId) {
    var that=this;
    wx.request({
      url: host + "/comment",
      method: "POST",
      data: {
        page: page,
        num: 8,
        audioId: audioId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var arr = res.data.data;
        if(arr.length!=0){
          var tmpArr = that.data.comment;
          tmpArr=tmpArr.concat(arr);
          that.setData({
            comment: tmpArr,
            comment_page:that.data.comment_page+1
          });
        }

      },
      fail: () => {
        console.log("comment data error");
      }
    });
  },

  /**
   * 分享按钮回调函数
   */
  onShareAppMessagege: function (options) {
    var that = this;
    var shareObj = {
      imgUrl: '',
      title: '配音大PK',
      success: function (res) {

      },
      fail: function (e) {
        console.log(e.errMsg);
      },
    };
    return shareObj;
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
    console.log("//**onShow**//");
    console.log(this.data)
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
