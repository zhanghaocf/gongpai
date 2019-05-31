//app.js
import wxapi from '/utils/wxapiToPromise.js';
import httputil from '/utils/http_util.js';
const busevent = require('/utils/event.js');
App({
  onLaunch: function () {
    //设置头部导航栏颜色
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#2853FF',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    this.updateTest();
    // 登录
    //this.doLogin();
    this.isIpx();
  },
  //判断是否是ipx
  isIpx(){
    let {model, platform} = wx.getSystemInfoSync();
    var reg = /iphone10|iPhone X/i;
    var isPhoneX = reg.test(model);
    this.globalData.isPhoneX = isPhoneX;
    this.globalData.isIOS = platform === "ios";
  },
  doLogin: function () {
    return wxapi.proxy.login().then(res => {
      console.log(res);
      return this.getAccessToken(res.code)
    }).then(res => {
      console.log(res);
      //TODO后面见真实数据返信息
      //this.globalData.token = res.data.access_token;
      //解决首页有需要用到token的提前在获取token之前就加载了
      if (this.beforeLoginCallback) {
        this.beforeLoginCallback();
      }
    }).catch(err => {
      console.log(err+'1');
      this.errorHandle(err, this);
    })
  },
  //获取token值
  getAccessToken: function (code) {
    let domainName=this.globalData.domainName;
    let appId = this.globalData.appId;
    let url = `${domainName}/wechat_applet/wechat_applet_getopenid/${appId}/${code}`;
    return httputil.Get(url,false,null,this,false);
  },
  //异步出错运行的函数统一放在这里
  errorHandle: function (reason, app,page) {
    reason = !!reason ? reason : "页面出错";
    console.log(reason)
    wx.showToast({
      title: reason,
      icon: 'none',
    })
    if (!page) {
      return;
    }
    page.setData({
      isLoading: false
    })
  },
  //发布新版本时检测用户页面是否需要重启
  updateTest: function () {
    const updateManager = wx.getUpdateManager();
    updateManager.onUpdateReady(function () {
      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()
    });
    updateManager.onUpdateFailed(function () {
      wx.showToast({
        title: '新版本下载失败,请重新获取该小程序',
        icon: 'none'
      })
    })
  },
  globalData: {
    uploadUrl:'https://ecard.prd.shangchao.la/app/images',
    busevent: busevent.event,
    userInfo: null,
    appId: "wx5cb9cbf00ad5ba0e",
    isPhoneX:false,
    isIOS:false,
    requestHead:{
      'ID': '',
      'user-key': ''
    }
  }
})