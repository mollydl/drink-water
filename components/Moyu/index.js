const wannianliKey = 'a7b67c287991698aa071a6d7a189cd43'
const toutiaoKey = '18b203cd91fb9c5ad9a94e2e0b042f62'
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
    getTouTiao();
    setText();
  })
  // 关闭弹层
  $('body').on('click', '#closeModalId-2', function () {
    $('#maxBoxId').css({ width: 400 + 'px', height: 200 + 'px' })
    $('#modalSetId-2').fadeOut()
  })
  // 获取新闻
  function getTouTiao(){
    $.ajax({
      headers,
      type: 'get',
      url: baseUrl+'/api/resou/v1/weibo',
      data:{size:15},
      success: function ({data}) {
        console.log(data)
        setTouTiaoList(data)
      }
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
  function setTouTiaoList(data){
    let str = ``
    data.forEach((e)=>{
      str+=`<div><a href="${e.url}" target="_blank">${e.keyword}</a></div>`
    })
    $('#toutiaoListId').html(str)
  }
})