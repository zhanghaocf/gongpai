var Mock = require('../utils/mock.js');
var modules = Mock.mock({
  'list|5':[
    {
      'id|+1':1,
      'name':'@ctitle(3,10)',
      'background_url':'/images/demo/m1.png',
      'no_data_background_url':'/images/demo/m1.png',
      'basic_pic':'/images/demo/m1.png',
      'created_at':'@date(yyyy.MM.dd)',
      'X':'145',
      'Y':'176',
      'pixel_width':'145',
      'pixel_height':'176',
      'actual_height':'10',
      'actual_width':'7',
      'fields|3':[
        {
          'name':'@ctitle(2,5)',
          'Y':'@natural(5,20)',
          'X':'@natural(5,20)',
          'pixel_width':0,
          'pixel_height':0,
          'color':'#000',
          'font_size':'16'
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