//index.js
//获取应用实例

const app = getApp()

Page({
  data: {
// 购物车
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
  feiBox: "",
  imgurl:'',
  // 结束
    
    cookerlist:[],
    pptlist:[],
    // 搜索框
    scrollTop:'',
    currentData: 0, 
    selectPerson: true,
    foodlist0:[],
    typelist1:[],
    typelist2:[],
    typelist3:[]
  },
// 搜索框
  onPageScroll: function (t) {
    var a = this;
    // console.log(t.scrollTop)
    a.setData({
    scrollTop:t.scrollTop
    })
    },

    fngotoshopcar:function(){
      wx.switchTab({
        url: '/pages/shopcar/shopcar',
      })
    },

// 页签开始

//获取当前滑块的index
bindchange: function(e) {
  const that = this;
  console.log(e.detail.current)
  that.setData({
    currentData: e.detail.current
  })
  that.fngettypelist(e.detail.current);
},
//点击切换，滑块index赋值
checkCurrent: function(e) {
  const that = this;
  console.log(e);
  
  if (that.data.currentData === e.target.dataset.current) {
    return false;
  } 
  else {
    that.setData({
      currentData: e.target.dataset.current
    })
    that.fngettypelist(e.target.dataset.current);
   
  }
},
  // 获取当前页签内容的请求
fngettypelist: function(currentData){
  var that=this;
  console.log(currentData)
  wx.request({
    url: app.globalData.url+'/dcapi/gettypelist',
    method: 'POST',
    data: {
      tpyeid:currentData
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    dataType: 'json',
    success(cc) {
      console.log(cc.data);

      if(currentData==0)
      {
        that.setData({
          foodlist0:cc.data//把后端查询出来的菜品列表信息存放到typelist数组中
        });
      }
      if(currentData==1)
      {
        that.setData({
          typelist1:cc.data//把后端查询出来的菜品列表信息存放到typelist数组中
        });
      }
      if(currentData==2)
      {
        that.setData({
          typelist2:cc.data//把后端查询出来的菜品列表信息存放到typelist数组中
        });
      }
      if(currentData==3)
      {
        that.setData({
          typelist3:cc.data//把后端查询出来的菜品列表信息存放到typelist数组中
        });
      }
      
    }
  });
},
// 页签结束

  fnsearch:function(e){
    getApp().globalData.key=e.detail.value;
    wx.switchTab({
      url: '/pages/foodlist/foodlist',
    });
  },
  fngotofoodview:function(ex){
    //通过点击事件里面的事件对象e获取组件上面绑定的属性值，这些属性属于自定义属性，必须以data-开头。
    var id=ex.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/foodview/foodview?id='+id,
    })

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  fngotocookerlist: function() {
    wx.navigateTo({
      url: '/pages/cooker/cooker'
    })
  },
  fngotocakelist: function() {
    wx.navigateTo({
      url: '/pages/cakelist/cakelist'
    })
  },
  fngotojuicelist: function() {
    wx.navigateTo({
      url: '/pages/juicelist/juicelist'
    })
  },
  fngotocoffeelist: function() {
    wx.navigateTo({
      url: '/pages/coffeelist/coffeelist'
    })
  },
  

  onLoad: function () {//页面加载的时候执行
    console.log(app.globalData.username)
    console.log(app.globalData.sex)
    console.log(app.globalData.url+'/dcapi/getfoodlistbyrandom')
    this.setData({
      gurl:app.globalData.url

    })


    // 购物车
        this.busPos = {};
        this.busPos['x'] = app.globalData.ww * .85;
        this.busPos['y'] = app.globalData.hh * .85; 

  },
  fna:function(that,app){
//在此处编写请求首页菜品数据的逻辑代码
    wx.request({
      url: app.globalData.url+'/dcapi/getfoodlistbyrandom',
      method: 'POST',
      data: {
        typeid:0,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
        console.log(cc.data);
        that.setData({
          foodlist0:cc.data//把后端查询出来的菜品列表信息存放到foodlist数组中
        });
        wx.setStorageSync("currentuserimgurl", cc.data[0].imgurl);
        that.fnb(that,app);
      }
    });
  },
  fnb:function(that,app){
    wx.request({
      url: app.globalData.url+'/dcapi/getcookerlistbyrandom',
      method: 'POST',
      data: {
        
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(dd) {
        that.setData({
          cookerlist: dd.data//把后端查询出来的厨师列表信息存放到cookerlist数组中
        });
        that.fnc(that,app);
      }
    });
  },
  fnc:function(that,app){
     // 轮播请求
    wx.request({
      url: app.globalData.url+'/dcapi/getpptlistbyrandom',
      method: 'POST',
      data: {
        
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(dd) {
        that.setData({
          pptlist: dd.data//把后端查询出来的厨师列表信息存放到cookerlist数组中
        });
      }
    });
  },
  onShow:function(){
    var that=this;
    var app=getApp();
    that.fna(that,app);
  },

  fngotocookerview:function(ex){
    //通过点击事件里面的事件对象e获取组件上面绑定的属性值，这些属性属于自定义属性，必须以data-开头。
    var id=ex.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/cookerview/cookerview?id='+id,
    })

  },

//购物车点击商品触发的事件
touchOnGoods: function(e) {
  console.log(e)
  //把点击每一项的对应的商品图保存下来，就是飞向购物车的图片
  var currentuserimgurl=wx.getStorageSync('currentuserimgurl');
  this.setData({
      feiBox: this.data.imgUrls[e.currentTarget.dataset.idx],
      imgurl:currentuserimgurl,
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
  
    //通过点击事件里面的事件对象e获取组件上面绑定的属性值，这些属性属于自定义属性，必须以data-开头。
    



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

  getUserInfo: function(e) {
    
  }
})
