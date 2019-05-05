/**
 * 用promise封装仅供本项目使用,放到其他项目需要修改
 * url地址
 * isLoading：bol值是否显示loading
 * page对象
 * app，应用对象
 * needsAuth：bol值是否需要授权
 */
import Promise from './es6_promise.js'
function Get(url, isLoading, page, app, needsAuth) {
  if (isLoading) {
    page.setData({
      isLoading: true
    })
  }
  if (needsAuth) {
    return getPromise(url,app);
  } else {
    return getPromisenoauth(url);
  }
}
/**
 * 封装post方法
 */
function Post(url, data, isLoading, page, app, needsAuth) {
  if (isLoading) {
    page.setData({
      isLoading: true
    })
  }
  if (needsAuth) {
    return postpromise(url, data,app);
  } else {
    return postpromisenoauth(url, data);
  }
}
function getPromise(url,app) {
  var requestHead = app.globalData.requestHead;
  return new Promise((res, rej) => {
    wx.request({
      url: url,
      method: 'GET',
      header: requestHead,
      success: function (result) {
        var data = result.data;
        res(data);
      },
      fail: function () {
        rej('发生错误');
      }
    })
  });
}

function getPromisenoauth(url) {
  return new Promise((res, rej) => {
    wx.request({
      url: url,
      method: 'GET',
      success: function (result) {
        var data = result.data;
        res(data);
      },
      fail: function () {
        rej('发生错误');
      }
    })
  });
}

function postpromise(url, data, app) {
  var requestHead = app.globalData.requestHead;
  return new Promise((res, rej) => {
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      header: requestHead,
      success: function (result) {
        var data = result.data;
        res(data)
      },
      fail: function () {
        rej('发生错误')
      }
    })
  })
}

function postpromisenoauth(url, data) {
  return new Promise((res, rej) => {
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      success: function (result) {
        var data = result.data;
        res(data);
      },
      fail: function () {
        rej('发生错误')
      }
    })
  })
}
//等到所有异步函数都执行完触发事件，arr数组都是promise对象
function promiseAll(arr, page) {
  page.setData({
    isLoading: true
  });
  return Promise.all(arr).then((val) => {
    page.setData({
      isLoading: false
    })
    return val;
  });
}
module.exports = {
  Get: Get,
  Post: Post,
  PromiseAll: promiseAll
}