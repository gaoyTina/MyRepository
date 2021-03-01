// pages/test/test.js
Page({
  fnaa:function(){

  },
  fnbb:function(){

  },
  /**
   * 页面的初始数据
   */
  data: {
    length:100,
    aa:true,
    username:"汤燕",
    foodlist:[],
    msg:'',
    array:["成都","重庆"],
    array1: [
      { 
        id:1,
        message: 'foo1',
      }, 
      {
        id:2,
        message: 'foo2'
      },
      {
        id:3,
        message: 'foo3'
      }
    ]
  },
  bindPickerChange: function(e) {
    console.log(e.detail.value);
    this.setData({
      index: e.detail.value
    })
},

  fnchange:function(e){
    //通过给input元素添加bindinput事件（文本框里面的值发生改变的时候就会触发），
    //通过事件对象e就能获取到当前文本框里面的值。
    console.log(e.detail.value);
    //把文本框中的值设置到data对象上。可以供页面上其他地方使用。
    this.setData({
      msg:e.detail.value
    })
  },
  fnsavevalue:function(e){
      //如果要保存值到数据库，我们就可以从data中取数，通过ajax提交给python端，然后保存到数据库。
  },
  fnclick:function(){
    var that=this;//this在不同的函数中代表不同的含义，我们要想在其他函数中使用此处的this,我们可以定义一个变量that，把当前的this保存起来，然后在其他地方使用。
    console.log("123");
    // this.setData({
    //   username:"融智学院",
    //   length:100
    // });
    //延迟去改变data中的值，主要掌握that的使用
    setTimeout(function(){
      that.setData({
        username:"融智学院",
        length:100
      });
    },5000);
    //1、专门跳转到tabbar定义的页面
    // wx.switchTab({
    //   url: '/pages/index/index',
    // });
    //2、关闭原来的页面，打开新的页面
    // wx.redirectTo({
    //   url: '/pages/foodview/foodview',
    // })
    //3、打开新的页面，但是原来的页面并没有关闭
    // wx.navigateTo({
    //   url: '/pages/foodview/foodview',
    // });
    //4、返回上一个页面，通过指定delta的值，可以返回指定的步数。
    wx.navigateBack({
      delta: 1
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      username:"蒲建东"
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