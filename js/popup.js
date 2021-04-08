
const BG = chrome.extension.getBackgroundPage();
const {seepNum, seepDuration} = BG.getBginfo()
const msgList = [
  {text:'吨~吨~吨~小鸭子喝水啦！'},
  {text:'每天八杯水，开心的源泉~'},
  {text:'辛苦撸代码的同时，也要多喝水哟~'},
  {text:'今天你多喝水了么？'},
  {text:'别光喝水，起来走动走动吧~'},
  {text:'工作一天了，点杯奶茶犒劳自己吧~'},
]
$(function(){
  $('#maxBoxId')[BG.getTimeStart()?'addClass':'removeClass']('backwack')
  // 初始化调用鸭子移动
  setNodeSeep()
  // 喝水啦
  let waterRepeat = true
  $('#resetInitId').on('click', function(){
    if(!waterRepeat) return // 防止重复点击
    waterRepeat = false
    BG.resetInfo(function(){
      const num = Math.floor(Math.random()*(msgList.length));
      $('#xiaoyaziId').removeClass('roasted-duck')
      $('#msgtextId').text(msgList[num].text)
      $('#msgtextId').fadeIn()
      setTimeout(() => {
        $('#msgtextId').fadeOut()
        waterRepeat = true
      }, 3000);
      setNodeSeep()
    })
  })
  // 设置鸭子节点样式
  function setNodeSeep(){
    const {seepNum=0} = BG.getBginfo()
    $('#xiaoyaziId').css('left', `calc(${seepNum}% - 20px)`)
    $('#seepItemId').css('width', `${seepNum}%`)
    if(seepNum >= 100){
      $('#xiaoyaziId').css('left', '86%')
      $('#xiaoyaziId').addClass('roasted-duck')
    }
  }
  // 显示弹层
  $('#setupId').on('click',function(){
    const {
      duration='1800',
      title='快喝水~', 
      content='已经很久没喝水了，变烤鸭啦~', 
      btnleft='马上喝', 
      btnright='我偏不'
    } = getLoacl({key:'setUp'}) || {}
    $('#formTime').val(duration)
    $('#formTitle').val(title)
    $('#formCon').val(content)
    $('#formLeftBtn').val(btnleft)
    $('#formRightBtn').val(btnright)
    $('#modalSetId').fadeIn()
  })
  // 关闭弹层
  $('#closeModalId').on('click',function(){
    $('#modalSetId').fadeOut()
  })
  // 个性化设置
  $('#setUpSub').on('click', function(){
    const duration = $('#formTime').val()
    const title = $('#formTitle').val()
    const content = $('#formCon').val()
    const btnleft = $('#formLeftBtn').val()
    const btnright = $('#formRightBtn').val()
    let nickTextObj = {
      duration :duration,
      title:title,
      content:content,
      btnleft:btnleft,
      btnright:btnright,
    }
    BG.setUpLocal(nickTextObj)
    $('#modalSetId').fadeOut()
    setTimeout(() => {
      $('#xiaoyaziId').css('left', `calc(0% - 20px)`)
      $('#seepItemId').css('width', `0%`)
    }, 500);
  })
  // 暂停时间
  $('#suspendTimeId').on('click', function(){
    $('#maxBoxId').toggleClass('backwack')
    const flag = $('#maxBoxId').hasClass('backwack')
    BG.changeTime(flag)
    flag ? totalText('黑魔法让时间暂停了') : totalText('时间恢复，快乐喝水吧~')
  })
  // 轻提示
  function totalText(text='温馨提示'){
    $('#msgtextId').text(text)
    $('#msgtextId').fadeIn()
    setTimeout(() => {
      $('#msgtextId').fadeOut()
    }, 3000);
  }
})