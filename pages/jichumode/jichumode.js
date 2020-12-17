// pages/jichumode/jichumode.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  grade1select: function(){
    app.globalData.nowgrade = 1;
    // console.log( app.globalData.nowgrade );
  },
  grade2select: function(){
    app.globalData.nowgrade = 2;
  },
  grade3select: function(){
    app.globalData.nowgrade = 3;
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
    wx.setStorageSync('grade', app.globalData.nowgrade);
  }


})