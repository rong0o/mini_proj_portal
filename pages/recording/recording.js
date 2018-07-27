/**
 * 录音模块
 * create by wooyhe
 */
const recorderManager = wx.getRecorderManager()
const innerAudioContexts = [] //存放音频上下文
const urls = [] //存放录音微信文件的路径
const recorderManagers = [] //存放录音机
const textUrl = 'http://e228e498.ngrok.io'
let innerVideoContext, isrecording
var resurl, i1 = 0

Page({
  //存放多个音频上下文，对应多个句子
  onLoad() {
    innerVideoContext = wx.createVideoContext('myVideo', this)
    innerVideoContext.seek(0)
    this.data.list.forEach(x => {
      recorderManagers.push(wx.getRecorderManager())
    })
  },
  data: {
    urls: '',
    list: [
      { sentence: 'hello', chinese: '你好', slider2change: 0, currentTime: 0, duration: 3 },
      { sentence: 'you', chinese: '你', slider2change: 0, currentTime: 8, duration: 3 },
      { sentence: 'a', chinese: '113', slider2change: 0, currentTime: 13, duration: 3 }
    ],
    recording: {
      state: false,
      currentTime: 0,
      duration: 0,
      index: 0
    },
    content: '完成配音',
    status: true,
    isdisabled: true,
    ismerging: false,
    ismuted: false,
    times: [],
    stack: null,
    isshare: false
  },
  startTo() {
    this.setData({
      status: false
    })
  },
  start: function () {
    const options = {
      duration: 10000,//指定录音的时长，单位 ms
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('开始录音')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
  stop: function (index) {
    //第index个句子录音结束
    recorderManager.stop();

    recorderManager.onStop((res) => {
      urls[index] = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      resurl = res.tempFilePath
      setTimeout(() => {
        wx.uploadFile({
          url: textUrl + '/upload', //线上可用非localhost的域名
          filePath: resurl, //路径
          name: 'file',
          method: 'POST',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: {
            'content-type': 'multipart/form-data',
            filePath: resurl,
            name: 'testname',
            userId: 123,
            token: 'sdfsfd123safd',
          },
          success: function (res) {
            console.log('ok', res)
          },
          fail: function (res) {
            console.log('falied', res)
          }
        });
      }, 0)

    })

    //控制合并全部按钮是否可以点击
    let count = 0
    urls.forEach(url => {
      url && count++
    })
    this.count = count
    if (this.count === this.data.list.length - 1) {
      this.setData({ isdisabled: false })
    }


  },
  play: function (i) {
    /*wx.request({
      url: textUrl + '/play',
      method: 'GET',
      data: {
        index: i
      },
      success(res) {
        resurl = decodeURIComponent(res.data)
        console.log(resurl)
        innerAudioContexts[i] = wx.createInnerAudioContext()
        innerAudioContexts[i].autoplay = true
        innerAudioContexts[i].src = resurl
        innerAudioContexts[i].onPlay(() => {
          console.log('开始播放', innerAudioContexts[i].src)
        })
        innerAudioContexts[i].onError((res) => {
          console.log(res)
        })
      }
    })*/
    //播放第i个句子的录音
    if (!urls[i]) {
      return
    }
    innerAudioContexts[i] = wx.createInnerAudioContext()
    innerAudioContexts[i].autoplay = true
    innerAudioContexts[i].src = urls[i]
    innerAudioContexts[i].onPlay(() => {
      console.log('开始播放', innerAudioContexts[i].src)
    })
    innerAudioContexts[i].onError((res) => {
      console.log(res)
    })
  },
  timeupdate(e) {
    //视频播放更新触发
    const curTime = e.detail.currentTime
    //如果是合并全部的时候
    if (this.data.ismerging) {
      const times = this.data.times
      if (times.length && !this.data.stack) {
        const time = times.shift()
        this.data.stack = time
        const ctx = wx.createInnerAudioContext()
        ctx.autoplay = true
        ctx.src = urls[i1++]
      }
      if (this.data.stack) {
        const duration = this.data.stack.duration
        const currentTime = this.data.stack.currentTime
        const endTime = duration + currentTime
        //如果在录音音频的播放范围，原视频静音
        if (curTime >= currentTime && curTime <= endTime) {
          this.setData({ ismuted: true })
        } else if (curTime > endTime) {
          this.setData({ ismuted: false, stack: null })
        }
      }
    }
    //播放原音状态，视频的自动跳转
    if (this.data.recording.state) {
      const percent = 100 * (curTime - this.data.recording.currentTime) / this.data.recording.duration
      this.data.list[this.data.recording.index].slider2change = percent
      this.setData({
        list: this.data.list
      })
      if (curTime >= this.data.recording.currentTime + this.data.recording.duration) {
        this.data.recording.state = false;
        innerVideoContext.seek(this.data.recording.currentTime)
        innerVideoContext.pause();
      }
    }
  },
  playOriginalAudio(e) {
    //播放哪一个句子的原音
    let list = this.data.list;
    const index = e.currentTarget.dataset.index;
    innerVideoContext.seek(list[index].currentTime);
    this.data.recording.state = true;
    this.data.recording.currentTime = list[index].currentTime;
    this.data.recording.duration = list[index].duration;
    this.data.recording.index = index;
    innerVideoContext.play();
  },
  playRecord(e) {
    //播放哪一个句子的录音
    const i = e.currentTarget.dataset.index
    this.play(i)
  },
  record(e) {
    //录音 
    if (isrecording) {
      return;
    }
    isrecording = true
    const index = e.currentTarget.dataset.index;
    const delay = this.data.list[index].duration * 1000;
    setTimeout(() => {
      this.start()
    })
    setTimeout(() => {
      isrecording = false
      this.stop(index)
    }, delay)
  },
  //合并全部
  //请求统计信息
  mergeAll() {
    this.setData({ isshare: true, content: '播放配音' })
  },
  preview() {
    //预览
    this.setData({
      ismerging: true
    })
    const lists = this.data.list
    this.data.times = [...lists]

    innerVideoContext.seek(0)
    innerVideoContext.autoplay = true
  },
  recordAgain() {
    //重新配音
    this.setData({
      status: false,
      isshare: false,
      times: [],
      stack: null
    })
    recorderManagers.length = 0
    urls.length = 0
    innerAudioContexts.length = 0
    innerVideoContext = wx.createVideoContext('myVideo', this)
    innerVideoContext.seek(0)
    this.data.list.forEach(x => {
      recorderManagers.push(wx.getRecorderManager())
    })
    i1 = 0
  },
  publish() {
    //发布，post所有的list
  },
  toSave() {
    //保存，post所有的list

  }

})
