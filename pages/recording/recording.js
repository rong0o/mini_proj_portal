/**
 * 录音模块
 * create by wooyhe
 */

const recorderManager = wx.getRecorderManager()
const innerAudioContexts = [] //存放音频上下文
const urls = [] //存放录音微信文件的路径
const recorderManagers = [] //存放录音机
const textUrl = 'http://134.175.160.37'
const app = getApp();
const host = app.globalData.host;
const token = app.globalData.token;
const sleep = t => new Promise((resolve,reject) => {
  setTimeout(()=>{
    resolve()
  }, t)
})

const getList = vedioId => {
  wx.request({
    url: 'http://134.175.160.37/vedioSubtitle',
    method: 'POST',
    header: {
      'content-type': 'application/json'
    },
    data: {
      vedioId: 27
    },
    success(res) {
      console.log(666)
      console.log(res)
    },
    fail(res) {
      console.log(res)
    }
  })
}

let innerVideoContext, isrecording, ctx
let resurl, i1 = 0
let _ = (t, arr) => arr.some(__ => (
  + __.currentTime - 0.4 <= t &&
  t <= + __.duration + (+__.currentTime)
)
)
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
      { sentence: 'hello', chinese: '都是我不好',  currentTime: 0, duration: 1 },
      { sentence: 'you', chinese: '金锁你干什么，这又不干你的事', currentTime: 1.72, duration: 3.782 },
      { sentence: 'a', chinese: '其实你们不知道', slider2change: 0, currentTime: 6.603, duration: 1.524},
      // { sentence: 'a', chinese: '我的心里好难过', slider2change: 0, currentTime: 9.112, duration: 1.414},
      // { sentence: 'a', chinese: '我有什么资格可以去追问他呢', slider2change: 0, currentTime: 12.585, duration: 2.145},
      // { sentence: 'a', chinese: '我只是不过是个丫头而已', slider2change: 0, currentTime: 15.38, duration: 2.32},
      // { sentence: 'a', chinese: '就算将来是他的人', slider2change: 0, currentTime: 19.978, duration: 1.693},
      // { sentence: 'a', chinese: '我也只是不过是个附件', slider2change: 0, currentTime: 23.308, duration: 1.524},
      // { sentence: 'a', chinese: '哪有资格吃醋啊', slider2change: 0, currentTime: 26.17, duration: 1.524}
    ],
    // [
    //   { chinese: "传说在魔兽山脉深处", currentTime: "0.780", duration: "2.932" }, 
    //   { chinese: "有一种可以短时间内提升战斗力的宝物", currentTime: "4.292", duration: "3.973" }, 
    //   { chinese: "多少修炼之人", currentTime: "9.271", duration: "1.620" },
    //   { chinese: "不惜以身范险深入山脉", currentTime: "11.340", duration: "3.370" }, 
    //   { chinese: "但都是有去无回白白搭上性命", currentTime: "15.420", duration: "4.919" },
    //   { chinese: "不过人们依然对它如此执着", currentTime: "21.818", duration: "3.524" },
    //   { chinese: "紫灵晶", currentTime: "26.596", duration: "2.128" }
    //   ],
    recording: {
      state: false,
      currentTime: 0,
      duration: 0,
      index: 0
    },
    content: '完成配音',
    ismerging: false,
    ismuted: false,
    times: [],
    stack: null,
    isshare: false
  },
  start: function () {
    const options = {
      duration: 10000,//指定录音的时长，单位 ms
      sampleRate: 22050,//采样率
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
    const list = this.data.list;
    recorderManager.onStop((res) => {
      urls[index] = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      resurl = res.tempFilePath
      setTimeout(() => {
        wx.uploadFile({
          url: textUrl + '/1231423423', //线上可用非localhost的域名
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
            userId: 94,
            token: 'ooBkB5S0uzPoJ4BlTytIbs1AVbxU',
            startTime: list[index].currentTime,
            elapsedTime: list[index].duration,
            index: index + '',
            vedioId: 27
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


  },
  play: function (i) {
    
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
    if (this.data.isshare) {
      const times = this.data.times
      console.log(this.data.stack)
      if (times.length && !this.data.stack) {
        const time = times.shift()
        const duration = +time.duration
        this.setData({ stack: time})
        const that = this
        console.log(urls[i1])
        ctx = wx.createInnerAudioContext()
        ctx.autoplay = true
        ctx.src = urls[i1++]
        sleep(duration*1000 - 300).then(() => {
          this.setData({ stack: null })
        })

      }
      //在特定时间段把原视频静音
      if(_(curTime, this.data.list)){
        this.setData({ ismuted: true })
      } else {
        this.setData({ ismuted: false})
      }

      if (!this.data.times.length && !this.data.stack){
        this.setData({ isshare: false, ismuted: false})
      }
    }
    //播放原音状态，视频的自动跳转
    if (this.data.recording.state) {
      const percent = 100 * (+ curTime - (+this.data.recording.currentTime)) / (+this.data.recording.duration)
      this.data.list[this.data.recording.index].slider2change = percent
      this.setData({
        list: this.data.list
      })
      if (curTime >= +this.data.recording.currentTime + (+this.data.recording.duration)) {
        this.data.recording.state = false;
        innerVideoContext.seek(+this.data.recording.currentTime)
        innerVideoContext.pause();
      }
    }
  },
  playOriginalAudio(e) {
    //播放哪一个句子的原音
    let list = this.data.list;
    const index = e.currentTarget.dataset.index;
    innerVideoContext.seek(+list[index].currentTime);
    this.data.recording.state = true;
    this.data.recording.currentTime = +list[index].currentTime;
    this.data.recording.duration = +list[index].duration;
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
    const delay = +this.data.list[index].duration * 1000;

    sleep(300).then(() => {
      this.start()
    })
    sleep(delay + 300).then(() => {
      isrecording = false
      this.stop(index)
    })
  },
  //合并全部
  //请求统计信息
  mergeAll() {
    let count = 0
    urls.forEach(url => {
      url && count++
    })
    // if (count < this.data.list.length - 1) {
    //   return
    // }
    this.setData({ isshare: true, content: '播放配音' })
  },
  preview() {
    //预览
    this.setData({
      ismerging: true,
      ismuted: true
    })
    const lists = this.data.list
    this.data.times = [...lists]

    innerVideoContext.autoplay = true
    innerVideoContext.play()
    innerVideoContext.seek(0)
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
    innerVideoContext.autoplay = false
    innerVideoContext.seek(0)
    innerVideoContext.stop()
    this.data.list.forEach(x => {
      recorderManagers.push(wx.getRecorderManager())
    })
    i1 = 0
  },
  publish() {
    //发布，post所有的list
    wx.switchTab({
      url: '../index/index'
    })
  },
  toSave() {
    //保存，post所有的list

  }

})
/*
wx.request({
  url: 'http://134.175.160.37/saveVoice',
  method:'POST',
  header:{
    'content-type' : 'application/json'
  },  
  data:{
    type: 1,
    num:1,
    token:'adfsdfsdf'
  },
  success(res){
    console.log(666)
    console.log(res)
  },
  fail(res){
    console.log(res)
  }
})*/




/*
list: [
  { sentence: 'hello', chinese: '都是我不好', currentTime: 0, duration: 1 },
  { sentence: 'you', chinese: '金锁你干什么，这又不干你的事', currentTime: 1.72, duration: 3.782 },
  { sentence: 'a', chinese: '其实你们不知道', currentTime: 6.603, duration: 1.524 },
  { sentence: 'a', chinese: '我的心里好难过', currentTime: 9.112, duration: 1.414 },
  { sentence: 'a', chinese: '我有什么资格可以去追问他呢',  currentTime: 12.585, duration: 2.145 },
  { sentence: 'a', chinese: '我只是不过是个丫头而已', currentTime: 15.68, duration: 2.32 },
  { sentence: 'a', chinese: '就算将来是他的人',  currentTime: 19.978, duration: 1.693 },
  { sentence: 'a', chinese: '我也只是不过是个附件',  currentTime: 23.308, duration: 1.524 },
  { sentence: 'a', chinese: '哪有资格吃醋啊', currentTime: 26.17, duration: 1.524 }
]*/

