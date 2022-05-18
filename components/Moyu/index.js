const headers = {
  'access-key': "43be388d9d0e3e3f46b029eb9bd99c27",
  'secret-key': "9f902e85dfd766753262b4dc7ddba89e",
}
const baseUrl = 'https://www.coderutil.com'
$(function () {
  // 显示弹层
  $('body').on('click', '#moyuModelId', function () {
    $('#modalSetId-2').fadeIn()
    $('#maxBoxId').css({ width: 700 + 'px', height: 700 + 'px' })
    getReSou();
    setText();
  })
  // 关闭弹层
  $('body').on('click', '#closeModalId-2', function () {
    $('#maxBoxId').css({ width: 400 + 'px', height: 200 + 'px' })
    $('#modalSetId-2').fadeOut()
  })
  // 获取新闻
  const resouObj = {
    weibo:[],
    zhihu:[],
    toutiao:[],
  }
  function getReSou(){
    const params = {
      headers,
      type: 'get',
      data:{size:10},
    }
    const list = [
      {url:baseUrl+'/api/resou/v1/weibo',type:'weibo'},
      {url:baseUrl+'/api/resou/v1/zhihu',type:'zhihu'},
      {url:baseUrl+'/api/resou/v1/toutiao',type:'toutiao'},
      {url:baseUrl+'/api/resou/v1/baidu',type:'baidu'}
    ]
    list.forEach(({url, type})=>{
      $.ajax({
        ...params,
        url,
        success: function ({data}) {
          resouObj[type] = data
          type==='weibo' && getReSouList('weibo')
        }
      })
    })
  }
  // 设置标题内容
  function setText(){
    const datef = parseTime(new Date(),'{y}年{m}月{d}日')
    const week = ['日', '一', '二', '三', '四', '五', '六']
    var weekNum = new Date().getDay()
    const str = `【摸鱼办】提醒您：摸鱼人！工作再累，一定不要忘记摸鱼哦！有事没事起身去茶水间，
    去厕所，去廊道走走别老在工位上坐着，钱是老板的,但命是自己的。`
    const str2 = `【快乐摸鱼办】${datef} 星期${week[weekNum]}`
    $('#contentId').text(str)
    $('#modalTitle').text(str2)
  }
  // 设置头条展示
  function getReSouList(key){
    let str = ``
    resouObj[key].forEach((e)=>{
      str+=`<div><a href="${e.url}" target="_blank">${e.keyword}</a></div>`
    })
    $('#resouListId').html(str)
  }
  // 切换热搜tab
  $('body').on('click', '#resouTabId .item',function(){
    const type = $(this).attr('data-type')
    $(this).siblings().removeClass('title-act')
    $(this).addClass('title-act')
    
    getReSouList(type)
    console.log(type);
  })
})