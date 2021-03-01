// pages/feeedback/feeedback.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
      userid: '',
      username: '',
      feedback:'',
  },

  fninputeditfeedback:function(e){
    var that=this;
    console.log(e.detail.value);
    that.setData({
      feedback:e.detail.value
    });
},

fnfeedback:function(){
  var that=this;
  var feedback= this.data.feedback;
  var userid=wx.getStorageSync('currentuserid');
  var username=wx.getStorageSync('currentusertruename');
  this.setData({
    userid:userid,
    username:username
  }); 
  wx.request({
    
    url: app.globalData.url+'/dcapi/feedback',
    method: 'POST',
    data: {
      userid: that.data.userid,
      username: that.data.username,
      feedback: that.data.feedback,
      

    },
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    dataType: 'json',
    success(cc) {
       console.log(cc);
        wx.showToast({
          title: '感谢您的意见！'
        });
        setTimeout(function () {
            wx.redirectTo({
              url: '/pages/feedback/feedback',
            })
        }, 1000); 
    }
  });
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

  }
})