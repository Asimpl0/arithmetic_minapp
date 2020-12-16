// pages/about/about.js
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

  },
  handledirect:function(){
    wx.showModal({
      cancelColor: 'cancelColor',
      title:"使用简介",
      content:"基础模式分阶段使用，强化模式锻炼错题，无尽模式挑战自我",
    })
  },
  
  handlegitee:function(){
    wx.showModal({
      cancelColor: 'cancelColor',
      title:"开源地址",
      content:"https://gitee.com/simon_an/arithmetic_minapp",
    })
  },
  
  handleabout:function(){
    wx.showModal({
      cancelColor: 'cancelColor',
      title:"关于",
      content:"本小程序为华中科技大学计算机学院软工小组作业",
    })
  }
})