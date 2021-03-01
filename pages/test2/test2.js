//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        imgUrls: [
            '/pages/img/index_jh.png.jpg',
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 1500,
        duration: 1000,

        hideCount: true, //角标初始是隐藏的
        count: 0, //角标数
        hide_good_box: true,
        feiBox: "",

        wishList:[       {         img: '../../images/index/wish.png',         dzzs: '22',         collected: 1,         id: 1       },      

{         img: '../../images/index/wish.png',         dzzs: '33',         collected: 0,         id: 2       },     

 {         img: '../../images/index/wish.png',         dzzs: '44',         collected: 1,         id: 3       },  

 {         img: '../../images/index/wish.png',         dzzs: '555',         collected: 1,         id: 4       },   

  {         img: '../../images/index/wish.png',         dzzs: '666',         collected: 0,         id: 5       },      

{         img: '../../images/index/wish.png',         dzzs: '777',         collected: 0,         id: 6       }     ],
    },

// 更改点赞状态  

onCollectionTap: function (event) {    

    // 获取当前点击下标     var index = event.currentTarget.dataset.index;   
      // data中获取列表   
      var message = this.data.wishList;   
    for (let i in message) {
    //遍历列表数据     
      if (i == index){
    //根据下标找到目标        
    var collectStatus = false         
    if
    (message[i].collected == 0) {
    //如果是没点赞+1          
    collectStatus = true          
    message[i].collected = parseInt(message[i].collected) + 1       
      } 
      else {          
    collectStatus = false          
    message[i].collected = parseInt(message[i].collected) - 1        
    }        
    wx.showToast({          
    title: collectStatus ? '收藏成功' : '取消收藏',         
        })       
    }     
}   
      this.setData({
          wishList: message
        })   
},



// 收藏
    // clickselect: function (e) {
    //     var index = 0;
    //     var shopList = this.data.shop
    //     for (let item of shopList) {
    //     //如果当前点击的对象id和循环对象里的id一致
    //     if (item.id == (e.currentTarget.dataset.index + 1)) {
    //     if (shopList[index].isShow == "" || shopList[index].isShow == undefined) {
    //     shopList[index].isShow = !shopList[index].isShow
    //     } else {
    //     shopList[index].isShow = ""
    //     }
    //     }
    //     index++;
    //     }
    //     this.setData({
    //     shop: shopList
    //     });
    //     },
        
    onLoad: function() {
        var that = this;
        //可视窗口x,y坐标
        this.busPos = {};
        this.busPos['x'] = app.globalData.ww * .85;
        this.busPos['y'] = app.globalData.hh * .85;
    },

    //点击商品触发的事件
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
    }
})