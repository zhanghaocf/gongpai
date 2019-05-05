var Mock = require('../mock/mock.js');
var httpUrl = require('../utils/http_util.js');
var domainName = "";

//获取模板接口
function getModules(){
  return new Promise((res,rej)=>{
    var result = Mock.getModules();
    res(result);
  })
}
//获取模板接口
module.exports = {
  getModules: getModules
}