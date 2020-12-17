//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    totalday:0,//总天数
    sign:false,//是否可以签到
    month:0,
    year:0,
    day:0,
    lastmonth:0,
    lastday:0
  },
  
  onLoad: function () {
    this.data.tatalday= wx.getStorageSync('totalday');
    this.data.sign=wx.getStorageSync('sign');
    this.data.lastmonth=wx.getStorageSync('month');
    this.data.lastday=wx.getStorageSync('day');
    this.data.hasUserInfo=wx.getStorageSync('hasinfo');
    this.data.userInfo=wx.getStorageSync('info');
    app.globalData.nowgrade=wx.getStorageSync('grade');

    this.setData({
      totalday:this.data.tatalday,
      sign:this.data.sign,
      lastmonth:this.data.lastmonth,
      lastday:this.data.lastday,
      hasUserInfo: this.data.hasUserInfo,
      userInfo:this.data.userInfo
    })
    this.datetime();
 
    if(parseInt(this.data.day)!=parseInt(this.data.lastday)||parseInt(this.data.month)!=parseInt(this.data.lastmonth)){
      this.setData({
          sign:false
      });
      console.log(this.data.sign);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }}},

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.setStorageSync('info', this.data.userInfo);
    wx.setStorageSync('hasinfo', this.data.hasUserInfo);
  },

  handlesign: function(e){
    this.setData({
      sign:true,
      totalday:Number(Number(this.data.totalday) + 1),
  })
  wx.showToast({
    title: '签到成功！',
    icon:"success"
  })
  wx.setStorageSync('totalday', this.data.totalday);
  wx.setStorageSync('sign', this.data.sign);
  },

  datetime:function(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var months = date.getMonth() + 1;
  
    //获取现今年份
    this.data.year = year;
  
    //获取现今月份
    this.data.month = months;
  
    //获取今日日期
    this.data.day = date.getDate();
    
    wx.setStorageSync('month', this.data.month);
    wx.setStorageSync('day', this.data.day);
  },
  play1select:function(){
   app.globalData.nowplay=1;
  },
  play2select:function(){
    app.globalData.nowplay=2;
   },
   play3select:function(){
    app.globalData.nowplay=3;
   }
})
