// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    tel:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var currentusertruename=wx.getStorageSync('currentusertruename');
      var currentusertruetel=wx.getStorageSync('currentusertruetel');
      this.setData({
        username:currentusertruename,
        tel:currentusertruetel
      });
  },

  fnloginout: function() {
    wx.redirectTo({
      url: '/pages/login/login'
    })
  },

  fngotofeedback:function(){
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    })
  },

  fngotomyorder:function(){
    wx.navigateTo({
      url: '/pages/myorder/myorder'
    })
  },

  fngotoshopcar:function(){
    wx.switchTab({
      url: '/pages/shopcar/shopcar',
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