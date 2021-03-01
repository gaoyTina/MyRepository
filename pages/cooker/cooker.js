// pages/cooker/cooker.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop:'',
    cookerlist:[],
    ckey:'',
    
  },
  
  // 搜索框
  onPageScroll: function (t) {
    var a = this;
    // console.log(t.scrollTop)
    a.setData({
    scrollTop:t.scrollTop
    })
    },
  fnsearchinputchange:function(e){
    var that = this;
    var curvalue = e.detail.value;
    getApp().globalData.ckey=curvalue;
    console.log(curvalue);
    that.fngetdata();
  },
  fngotocookerview:function(ex){
    var id=ex.currentTarget.dataset.id;
    console.log(ex.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/cookerview/cookerview?id='+id,
    })
  },
  fngetdata:function()
  {
    var that=this;
    var ckey=getApp().globalData.ckey;
    if(ckey==undefined||ckey==null||ckey=="undefined")
    {
      ckey="";
    }
    wx.request({
      url: app.globalData.url+'/dcapi/getcookerlist',
      method: 'POST',
      data: {
        ckey:ckey
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
        console.log(cc.data);
        that.setData({
          cookerlist:cc.data//把后端查询出来的菜品列表信息存放到foodlist数组中
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gurl:app.globalData.url

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
    this.fngetdata();
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