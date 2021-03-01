// pages/cakelist/cakelist.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

      imgUrls: [
          '/pages/img/mybj.png.jpg',
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 1500,
      duration: 1000,

      hideCount: true, //角标初始是隐藏的
      count: 0, //角标数
      hide_good_box: true,
      feiBox: ""
  },

  fnsearchinputchange:function(e){
    var that = this;
    var curvalue = e.detail.value;
    getApp().globalData.key=curvalue;
    console.log(curvalue);
    that.fngetdata();
  },
  fngetdata:function()
  {
    var that=this;
    var key=getApp().globalData.key;
    if(key==undefined||key==null||key=="undefined")
    {
      key="";
    }
    var app=getApp();
    wx.request({
      url: app.globalData.url+'/dcapi/getfoodlist',
      method: 'POST',
      data: {
        key:key
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
        console.log(cc.data);
        that.setData({
          cakelist:cc.data//把后端查询出来的菜品列表信息存放到foodlist数组中
        });
      }
    });
  },
// 详情页
  fngotofoodview:function(ex){
    var id=ex.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/foodview/foodview?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var that = this;
        //可视窗口x,y坐标
        this.busPos = {};
        this.busPos['x'] = app.globalData.ww * .85;
        this.busPos['y'] = app.globalData.hh * .85; 

        this.setData({
            gurl:app.globalData.url
          });
        //   加载蛋糕
          wx.request({
            url: app.globalData.url+'/dcapi/getjuicelistbytypeid',
            method: 'POST',
            data: {
              typeid:4,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            dataType: 'json',
            success(cc) {
              console.log(cc.data);
              that.setData({
                cakelist:cc.data//把后端查询出来的菜品列表信息存放到foodlist数组中
              });
            //   wx.setStorageSync("currentuserimgurl", cc.data[0].imgurl);
            }
          });

  },

  touchOnGoods: function(e) {
    //把点击每一项的对应的商品图保存下来，就是飞向购物车的图片
    this.setData({
        feiBox: this.data.imgUrls[e.currentTarget.dataset.idx]
    })
    // 如果good_box正在运动
    if (!this.data.hide_good_box) return;
    //当前点击位置的x，y坐标
    this.finger = {};
    var topPoint = {};
    this.finger['x'] = e.touches["0"].clientX;
    this.finger['y'] = e.touches["0"].clientY - 20;
    if (this.finger['y'] < this.busPos['y']) {
        topPoint['y'] = this.finger['y'] - 150;
    } else {
        topPoint['y'] = this.busPos['y'] - 150;
    }

    if (this.finger['x'] < this.busPos['x']) {
        topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2 + this.finger['x'];
    } else {
        topPoint['x'] = this.busPos['x'];
        this.finger['x'] = this.busPos['x']
    }


    this.linePos = app.bezier([this.finger, topPoint, this.busPos], 30);
    this.startAnimation();

},
//开始动画
startAnimation: function() {
    var index = 0,
        that = this,
        bezier_points = that.linePos['bezier_points'];
    this.setData({
        hide_good_box: false,
        bus_x: that.finger['x'],
        bus_y: that.finger['y']
    })
    this.timer = setInterval(function() {
        index++;
        that.setData({
            bus_x: bezier_points[index]['x'],
            bus_y: bezier_points[index]['y']
        })
        if (index >= 28) {
            clearInterval(that.timer);
            that.setData({
                hide_good_box: true,
                hideCount: false,
                count: that.data.count += 1
            })
        }
    }, 33);
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