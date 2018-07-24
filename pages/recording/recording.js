/**
 * 录音模块
 * create by wooyhe
 */
const recorderManager = wx.getRecorderManager()
const innerAudioContexts = [] //存放音频上下文
const urls = [] //存放录音微信文件的路径
const recorderManagers = [] //存放录音机
const textUrl = 'http://e377706c.ngrok.io' //线上地址
let innerVideoContext, isrecording, resurl
Page({
  /**
   * 页面的初始数据
   */
  data: {
    urls: '',
    list: [
      { sentence: 'hello', chinese: '你好', slider2change:0, currentTime: 50, duration: 3},//假数据
      { sentence: 'you', chinese: '你', slider2change: 0, currentTime: 80, duration: 3 }
    ],
    recording:{
      state:false,
      currentTime:0,
      duration: 0,
      index:0
    },
    name: 10,
    status: true,
    isdisabled: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //视频相关初始化配置
    innerVideoContext = wx.createVideoContext('myVideo', this) 
    innerVideoContext.seek(0)
    this.data.list.forEach(x=>{
      recorderManagers.push(wx.getRecorderManager())
    })
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
