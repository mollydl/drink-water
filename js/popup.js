
const BG = chrome.extension.getBackgroundPage();
const { seepNum, seepDuration } = BG.getBginfo()
const msgList = [
  { text: '吨~吨~吨~小鸭子喝水啦！' },
  { text: '每天八杯水，开心的源泉~' },
  { text: '辛苦撸代码的同时，也要多喝水哟~' },
  { text: '今天你多喝水了么？' },
  { text: '别光喝水，起来走动走动吧~' },
  { text: '工作一天了，点杯奶茶犒劳自己吧~' },
]
$(function () {
  mounted();
  // 初始化函数
  function mounted(){
    // 加载设置小鸭子模块框
    $('#SetDuckCom').load('../components/SetDuck/index.html');
    // 加载表情包大全模块
    $('#FaceInfoCom').load('../components/FaceInfo/index.html');
    // 加载摸鱼办模块
    $('#moyuCom').load('../components/Moyu/index.html');
    $('#maxBoxId')[BG.getTimeStart() ? 'addClass' : 'removeClass']('backwack')
    // 初始化调用鸭子移动
    setNodeSeep()
  }
  // 喝水啦
  let waterRepeat = true
  $('#resetInitId').on('click', function () {
    if (!waterRepeat) return // 防止重复点击
    waterRepeat = false
    BG.resetInfo(function () {
      const num = Math.floor(Math.random() * (msgList.length));
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
  function setNodeSeep() {
    const { seepNum = 0 } = BG.getBginfo()
    $('#xiaoyaziId').css('left', `calc(${seepNum}% - 20px)`)
    $('#seepItemId').css('width', `${seepNum}%`)
    if (seepNum >= 100) {
      $('#xiaoyaziId').css('left', '86%')
      $('#xiaoyaziId').addClass('roasted-duck')
    }
  }
  // 显示弹层
  $('#setupId').on('click', function () {
    const {
      duration = '1800',
      title = '快喝水~',
      content = '已经很久没喝水了，变烤鸭啦~',
      btnleft = '马上喝',
      btnright = '我偏不'
    } = getLoacl({ key: 'setUp' }) || {}
    $('#formTime').val(duration)
    $('#formTitle').val(title)
    $('#formCon').val(content)
    $('#formLeftBtn').val(btnleft)
    $('#formRightBtn').val(btnright)
    $('#modalSetId').fadeIn()
  })
  
  
  // 暂停时间
  $('#suspendTimeId').on('click', function () {
    $('#maxBoxId').toggleClass('backwack')
    const flag = $('#maxBoxId').hasClass('backwack')
    BG.changeTime(flag)
    flag ? totalText('黑魔法让时间暂停了') : totalText('时间恢复，快乐喝水吧~')
  })
  // 轻提示
  function totalText(text = '温馨提示') {
    $('#msgtextId').text(text)
    $('#msgtextId').fadeIn()
    setTimeout(() => {
      $('#msgtextId').fadeOut()
    }, 3000);
  }
  // 换肤、触发juejin.js 换肤方法
  $('#changeSkinId').on('click', function () {
    $("#skinModalId").slideToggle(100)
  })
  $('#skinModalId').on('click', '.btn-box', function(){
    const type = $(this).attr('data-type')
    chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
      chrome.tabs.sendMessage(tab[0].id, {
        action: "setJueJinCss",
        skin:type
      });
    });
  })
})

