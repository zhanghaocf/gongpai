// pages/camera/camera.js
const app = getApp();
const gd = app.globalData;
const wxapi = require('../../utils/wxapiToPromise.js');
let moduleId=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    devicePosition: 'front',
    isAuth:true,
    nb: {
      "bg_color": "#ffffff",
      "color": "#000000",
      "flag": 1,
      "name": "工牌办理中心"
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    moduleId = options.moduleId;
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
    wxapi.proxy.getSetting().then(res=>{
      let bol = res.authSetting['scope.camera']!==false;
      console.log(bol);
      this.setData({
        isAuth:bol
      })
    }).catch(err=>{
      wx.showToast({
        title: '发生故障',
        icon:'none'
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  selPic(){
    let options={
      count:1,
      sourceType: ['album']
    }
    let ths = this;
    wxapi.proxy.chooseImage(options).then(res=>{
      const tempFilePaths = res.tempFilePaths[0];
      ths.uploadFile(tempFilePaths);
    }).catch(err=>{
      wx.showToast({
        title: '发生故障',
        icon:'none'
      })
    })
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    const ths =this;
    ctx.takePhoto({
      success: res => {
        const tempFilePaths = res.tempImagePath;
        ths.uploadFile(tempFilePaths);
      },
      fail:err=>{
        wx.showToast({
          title: '拍摄故障',
          icon:'none'
        })
      }
    })
  },
  uploadFile(filePath){
    let obj={
      pic_url: filePath,
      image_key:'fk'
    }
    gd.busevent.emit('setPhoto', obj);
    wx.navigateBack({})
    //TODO：等接口
    // wx.showLoading({
    //   title: '制作图片中',
    //   mask:true
    // })
    // let options={
    //   url: gd.uploadUrl,
    //   filePath: filePath,
    //   name:'pic_file',
    //   formData: {
    //     mould_id: moduleId
    //   }
    // }
    // wxapi.proxy.uploadFile(options).then(res=>{
    //   if(res.code==201){
    //     wxapi.proxy.showToast({
    //       title:'制作成功'
    //     }).then(result=>{
    //       gd.busevent.emit('setPhoto', res);
    //       wx.navigateBack({})
    //     })
    //   }else{
    //     wx.showToast({
    //       title:res.message,
    //       icon:'none'
    //     })
    //   }
    // })
  },
  handleCameraError(e) {
    console.log(e)
    if (e) {
      this.setData({
        isAuth: false
      })
    }

  },
  
  reverseCamera() {
    this.setData({
      devicePosition: this.data.devicePosition === 'back' ? 'front' : 'back'
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    moduleId=0;
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

  }
})