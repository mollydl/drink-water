const wannianliKey = 'a7b67c287991698aa071a6d7a189cd43'
const toutiaoKey = '18b203cd91fb9c5ad9a94e2e0b042f62'
$(function () {
  // 显示弹层
  $('body').on('click', '#moyuModelId', function () {
    $('#modalSetId-2').fadeIn()
    $('#maxBoxId').css({ width: 700 + 'px', height: 700 + 'px' })
    const calendarDay = getLoacl({key:'calendarDay'})
    const toutiao = getLoacl({key:'toutiao'})
    !calendarDay && getDate();
    !toutiao && getTouTiao();
    setMyTitle(calendarDay)
    setTouTiaoList(toutiao)
  })
  // 关闭弹层
  $('body').on('click', '#closeModalId-2', function () {
    $('#maxBoxId').css({ width: 400 + 'px', height: 200 + 'px' })
    $('#modalSetId-2').fadeOut()
  })
  // 获取万年历
  function getDate() {
    const date = dayjs(new Date()).format('YYYY-M-D')
    const params = {
      key: wannianliKey,
      date,
    }
    $.post('http://v.juhe.cn/calendar/day', params, function ({result}) {
      setLoacl({key:'calendarDay', val:result.data})
      setMyTitle(result.data)
    })
  }
  // 获取新闻
  function getTouTiao(){
    const params = {
      key: toutiaoKey,
      page_size:10
    }
    $.post('http://v.juhe.cn/toutiao/index', params, function ({result}) {
      setLoacl({key:'toutiao', val:result.data})
      setTouTiaoList(result.data)
    })
  }
  // 设置标题内容
  function setMyTitle(data){
    const {weekday,lunar} = data
    const datef = parseTime(new Date(),'{y}年{m}月{d}日')
    const str = `【摸鱼办】：提醒您：摸鱼人！工作再累，一定不要忘记摸鱼哦！有事没事起身去茶水间，
    去厕所，去廊道走走别老在工位上坐着，钱是老板的,但命是自己的每天一分钟，知晓天下事！
    ${datef} ${weekday} 农历${lunar}`
    $('#myTitleId').text(str)
  }
  // 设置头条展示
  function setTouTiaoList(data){
    let str = ``
    data.forEach((e)=>{
      str+=`<div><a href="${e.url}" target="_blank">${e.title}</a></div>`
    })
    $('#toutiaoListId').html(str)
  }
})