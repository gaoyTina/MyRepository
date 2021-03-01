// pages/cookerview/cookerview.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coname:'',
    sex:'',
    age:'',
    colevel:'',
    brief:'',
    imgurl:'',
    comment:'',
    commentlist:[],
    cookerid:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 获取评论
  fngetcomment:function(e){
    var that=this;
    console.log(e.detail.value);
    that.setData({
      comment:e.detail.value
    });
},
// 提交评论
fnconmment:function(){
  var that=this;
  var comment= this.data.comment;
  var currentcookerid=wx.getStorageSync('currentcookerid');
  var currentuserid=wx.getStorageSync('currentuserid');
  var currentusername=wx.getStorageSync('currentusername');
  var currentuserimgurl=wx.getStorageSync('currentuserimgurl');
  console.log(comment);

  wx.request({
    url: app.globalData.url+'/dcapi/comment',
    method: 'POST',
    data: {
      userid:currentuserid,
      username:currentusername,
      imgurl:currentuserimgurl,
      cookerid:currentcookerid,
      kcomment:comment
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    dataType: 'json',
    success(cc) {
       console.log(cc);
       that.fngetcommlist(that.data.cookerid);
       that.setData({
        comment:""
       });
        // setTimeout(function () {
        //     wx.redirectTo({
        //       url: '/pages/cookerview/cookerview?id='+that.data.cookerid,
        //     })
        // }, 1000); 
    }
  });
},

  onLoad: function (options) {
    var that=this;
    console.log(options.id);
    var id=options.id;

    this.setData({
      gurl:app.globalData.url,
      cookerid:id
    });

    wx.request({
     url: app.globalData.url+'/dcapi/getcookerbyid',
     method: 'POST',
     data: {
       id: id
     },
     header: {
       'content-type': 'application/x-www-form-urlencoded' // 默认值
     },
     dataType: 'json',
     success(cc) {
       console.log(cc.data);
       wx.setStorageSync("currentcookerid", cc.data[0].id);
       that.setData({
         cookerid:cc.data[0].id,
         coname:cc.data[0].coname,
         sex:cc.data[0].sex,
         age:cc.data[0].age,
         colevel:cc.data[0].colevel,
         brief:cc.data[0].brief,
         imgurl:app.globalData.url+"/static/uploadimg/"+cc.data[0].imgurl
       });
       that.fngetcommlist(id);
     }
   });

  },
  fngetcommlist:function(id){
    var that=this;
    // 评论列表
    wx.request({
      url: app.globalData.url+'/dcapi/getcommentlist',
      method: 'POST',
      data: {
        cookerid: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(dd) {
        that.setData({
          commentlist: dd.data//把后端查询出来的厨师列表信息存放到cookerlist数组中
        });
      }
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