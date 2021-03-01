// pages/reg/reg.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:'',
    passconfirm:'',
    truename:'',
    tel:'',
    address:''
  },

  fnreg:function(){
    var that=this;
    var username= this.data.username;
    var password=this.data.password;
    var passconfirm=this.data.passconfirm;
    var truename=this.data.truename;
    var tel=this.data.tel;
    var address=this.data.address;
    console.log(username);
    console.log(password);

    wx.request({
      url: app.globalData.url+'/dcapi/reg',
      method: 'POST',
      data: {
        username: that.data.username,
        password: that.data.password,
        passconfirm:that.data.passconfirm,
        truename:that.data.truename,
        tel:that.data.tel,
        address:that.data.address,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
         console.log(cc);
          wx.showToast({
            title: '注册成功'
          });
          setTimeout(function () {
              wx.redirectTo({
                url: '/pages/login/login',
              })
          }, 1000); 
      }
    });
},
  
  fninputeditusername:function(e){
    var that=this;
    console.log(e.detail.value);
    that.setData({
      username:e.detail.value
    });
},
fninputeditpassword:function(e){
  var that=this;
  console.log(e.detail.value);
  that.setData({
    password:e.detail.value
  });
},
fninputeditpassconfirm:function(e){
  var that=this;
  console.log(e.detail.value);
  that.setData({
    passconfirm:e.detail.value
  });
},
fninputedittruename:function(e){
  var that=this;
  console.log(e.detail.value);
  that.setData({
    truename:e.detail.value
  });
},
fninputeditel:function(e){
  var that=this;
  console.log(e.detail.value);
  that.setData({
    tel:e.detail.value
  });
},
fninputeditaddress:function(e){
  var that=this;
  console.log(e.detail.value);
  that.setData({
    address:e.detail.value
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