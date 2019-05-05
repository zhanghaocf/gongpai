//index.js
//获取应用实例
const app = getApp();
const gd = app.globalData;
const api = require('../../apis/index.js');
Page({
  data: {
   isIpx:false,
   isLoading:false,
   hideTip:false,
   activeIndex:0,
   nb:{
     "bg_color": "#2853FF",
     "color": "#ffffff",
     "flag": 2,
     "name": "工牌办理中心"
   },
   cardlist:[]
  },
 
  onLoad: function () {
    this.setData({
      isIpx: gd.isPhoneX
    })
   api.getModules().then(res=>{
     console.log(res);
     this.setData({
       cardlist:res
     })
   });
    this.threeclose();
  },
  //3秒自动关闭tip
  threeclose(){
    setTimeout(()=>{
      this.setData({
        hideTip:true
      })
    },3000)
  },
  closeTip(){
    this.setData({
      hideTip: true
    })
  },
  selIndex(e){
   let index = e.currentTarget.dataset.index;
   let currentIndex = this.data.activeIndex;
   if(index===currentIndex){
     return;
   }
   this.setData({
     activeIndex:index
   })
  }
})
