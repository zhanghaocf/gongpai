//index.js
//获取应用实例
const app = getApp();
const gd = app.globalData;
const api = require('../../apis/index.js');
const wxapi = require('../../utils/wxapiToPromise.js');
let infodata={};
Page({
  data: {
   isEdit:true,
   isIpx:false,
   isLoading:false,
   hideTip:false,
   activeIndex:0,
   focusActive:-1,
   nb:{
     "bg_color": "#2853FF",
     "color": "#ffffff",
     "flag": 2,
     "name": "工牌办理中心"
   },
   cardlist:[],
   activeCard:null,
   bili:1,
   filePath:{
     pic_url:'',
     image_key:''
   }
  },
  takephoto(){
    let isEdit = this.data.isEdit;
    if (!isEdit) {
      return;
    }
    this.setData({
      focusActive:-1
    })
    gd.busevent.on('setPhoto', this.setPhoto,this);
    let moduleId = this.data.activeCard.id;
    wx.navigateTo({
      url: '/pages/camera/camera?moduleId=' + moduleId,
    })
  },
  setPhoto(picObj){
    console.log(picObj);
    this.setData({
      filePath: picObj
    })
  },
  onLoad: function () {
    this.setData({
      isIpx: gd.isPhoneX
    })
    this.getSystem();
   api.getModules().then(res=>{
     console.log(res);
     let activeCard = res[0];
     this.setData({
       cardlist:res,
       activeCard
     })
   });
    this.threeclose();
  },
  //获取手机宽度比
  getSystem(){
    let sys = wx.getSystemInfoSync();
    console.log(sys);
    let bili = sys.windowWidth/750*558/826;//826为工牌实际宽度
    this.setData({
      bili
    })
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
   let data = this.data;
    let currentIndex = data.activeIndex;
    let cardlist = data.cardlist;
    if(index===currentIndex){
      return;
    }
    let activeCard = cardlist[index];
   this.setData({
     activeIndex:index,
     activeCard
   })
  },
  formSubmit(e){
    let filepath = this.data.filePath;
    if (!filepath.pic_url){
      return;
    }
    infodata={};
    let obj = e.detail.value;
    let message='';
    for(let key in obj){
      if (!obj[key]){
        message = `请把${key}信息输入完整`;
        break;
      }
    }
    if (!!message){
      wx.showToast({
        title: message,
        icon:'none'
      })
      return;
    }
    infodata=obj;
    this.setData({
      isEdit:false,
      focusActive:-1
    })
  },
  focusblurFn(e){
    let isEdit = this.data.isEdit;
    if(!isEdit){
      return;
    }
    let index=e.target.dataset.focusindex;
    let focusActive = this.data.focusActive;
    if (typeof index==="undefined" && focusActive<0){
      return;
    }
    let obj={};
    obj.focusActive = typeof index !== "undefined"?index:-1;
    this.setData(obj);
  },
  canedit(){
    this.setData({
      isEdit:true
    })
  },
  makePhoto(){
    let data = this.data;
    let filePath = data.filePath;
    let moduleId = data.activeCard.id;
    let postdata={
      "image_key": filePath.image_key,
      "mould_id": moduleId,
      "fields": infodata
    }
    console.log(postdata);
    api.brands(postdata).then(res=>{
      if(res.code==201){
        wxapi.proxy.showToast({
          title: '发送成功',
        }).then(res=>{
          this.setData({
            isEdit:true
          })
        })
      }
    })
  }
})
