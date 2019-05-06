var Mock = require('../utils/mock.js');
var modules = Mock.mock({
  'list':[
    {
      'id':1,
      'name':'@ctitle(3,10)',
      'background_url':'/images/demo/m1.png',
      'no_data_background_url':'/images/demo/nopic.png',
      'basic_pic':'/images/demo/default.png',
      'created_at':'@date(yyyy.MM.dd)',
      'X':'209',
      'Y':'117',
      'pixel_width':'406',
      'pixel_height':'493',
      'actual_height':'10',
      'actual_width':'7',
      'field':[
        {
          'name':'name',
          'default':'Your Name',
          'Y':'657',
          'X':'40',
          'pixel_width':'584',
          'pixel_height':'74',
          'color':'#ffffff',
          'font_size':'68'
        },
        {
          'default': '你的名字',
          'name':'cname',
          'Y': '773',
          'X': '40',
          'pixel_width': '584',
          'pixel_height': '64',
          'color': '#ffffff',
          'font_size': '64'
        },
        {
          'default': '部门/岗位',
          'name':'bumen',
          'Y': '861',
          'X': '40',
          'pixel_width': '584',
          'pixel_height': '40',
          'color': '#ffffff',
          'font_size': '40'
        }
      ]
    },
    {
      'id': 2,
      'name': '@ctitle(3,10)',
      'background_url': '/images/demo/m2.png',
      'no_data_background_url': '/images/demo/nopic1.png',
      'basic_pic': '/images/demo/default.png',
      'created_at': '@date(yyyy.MM.dd)',
      'X': '209',
      'Y': '284',
      'pixel_width': '406',
      'pixel_height': '493',
      'actual_height': '10',
      'actual_width': '7',
      'field': [
        {
          'name': 'name',
          'default': 'Your Name1',
          'Y': '825',
          'X': '64',
          'pixel_width': '660',
          'pixel_height': '94',
          'color': '#000000',
          'font_size': '72'
        },
        {
          'default': '你的名字1',
          'name': 'cname',
          'Y': '913',
          'X': '64',
          'pixel_width': '584',
          'pixel_height': '64',
          'color': '#000000',
          'font_size': '56'
        },
        {
          'default': '部门/岗位1',
          'name': 'bumen',
          'Y': '1000',
          'X': '64',
          'pixel_width': '584',
          'pixel_height': '40',
          'color': '#000000',
          'font_size': '40'
        }
      ]
    }
  ]
})
function getModules(){
  return modules.list;
}
module.exports = {
  getModules: getModules
}