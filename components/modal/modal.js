// components/component-tag-name.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    net: "http://ecard.shangchao.la/admin",
    account: "card@venpoo.com",
    pass:"leqi123"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    fuzhi() {
      let data = this.data;
      wx.setClipboardData({data:`${data.net}\n${data.account}\n${data.pass}`});
    },
    preventfn(){
      return;
    },
    closeFn(){
      const myEventDetail = {} // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项
      this.triggerEvent('closemodal', myEventDetail, myEventOption);
    }
  }
})