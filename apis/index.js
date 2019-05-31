var httpUrl = require('../utils/http_util.js');
var domainName = "https://ecard.prd.shangchao.la";

//获取模板接口
function getModules(page,app){
  return httpUrl.Get(`${domainName}/app/moulds`,true,page,app,false)
}

function brands(data,page,app){
  return httpUrl.Post(`${domainName}/app/brands`,data,true,page,app,false);
}

//获取模板接口
module.exports = {
  getModules: getModules,
  brands: brands
}