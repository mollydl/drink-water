
const BG = chrome.extension.getBackgroundPage()
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
  // 点击小鸭子，弹出对话
  $('body').on('click','#xiaoyaziId',fangdou(showTalk))
  function showTalk(){
    const sayList = [
      '戳我干嘛？快喝水',
      '戳戳戳，就知道戳我，快去写BUG',
      '一杯茶，一包烟，一个BUG改一天',
      '忙一天了，去摸鱼办看看热搜新鲜事儿',
      '世上无难事，只要肯放弃',
      '只要思想不滑坡，办法总比困难多',
      '起来扭扭腰，动动脖吧',
      '我是一只小黄鸭，天大地大我最大',
      '嘘！老板在你身后盯着你呢',
      '我不想变烤鸭！呜呜呜~',
    ]
    const num = Math.floor(Math.random() * sayList.length) || 0
    totalText(sayList[num])
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
  let timeOut = null
  function totalText(text = '温馨提示') {
    $('#msgtextId').text(text)
    $('#msgtextId').fadeIn()
    clearTimeout(timeOut)
    timeOut = setTimeout(() => {
      $('#msgtextId').fadeOut()
    }, 3000);
  }
  // 查询当前tab是否在掘金文章页
  function getCurrentTab(fun){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
      const item = tab[0]
      if(item.url.includes('https://juejin.cn/post')){
        fun(tab[0])
      }else{
        totalText('请在掘金文章详情页操作哟~')
      }
    })
  }
  // 换肤、触发juejin.js 换肤方法
  $('#changeSkinId').on('click', function () {
    getCurrentTab(function(){
      $("#skinModalId").slideToggle(100)
      const chex = BG.getHasAudioMute()
      const opt = localStorage.getItem('bardOpacity')
      $('#muteModelId').attr('checked', chex)
      $('#rangeId').val(opt)
    })
  })
  $('#skinModalId').on('click', '.btn-box', function(){
    const type = $(this).attr('data-type')
    BG.changeAudio({skin:type})
    const local = BG.getBgLoacl({key: 'skinType', isObj: false})
    chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
      chrome.tabs.sendMessage(tab[0].id, {
        actionType:'changeBgm',
        skinType:local
      });
    });
  })
  // 设置播放图标状态
  function setPausedIcon(){
    const status = BG.getPaused()
    if(!status){
      $('#bgmIconId').addClass('bgm-loading')
    }else{
      $('#bgmIconId').removeClass('bgm-loading')
    }
  }
  setPausedIcon()
  // 控制背景音乐播放，暂停
  $('body').on('click','#bgmIconId',function(){
    getCurrentTab(function(){
      BG.togglePalyBgm()
      setPausedIcon()
    })
  })
  // 控制文章背景透明度
  $('body').on('change','#rangeId',function(){
    const val = $(this).val()
    localStorage.setItem('bardOpacity', val)
    chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
      chrome.tabs.sendMessage(tab[0].id, {
        actionType:'changeBard',
        val
      });
    });
  })
  // 设置静音模式
  $('body').on('change', '#muteModelId', function(){
    const val = $(this).is(':checked')
    if(val){
      $('#bgmIconId').removeClass('bgm-loading')
      BG.removeAudio()
    }else{
      $('#bgmIconId').addClass('bgm-loading')
    }
    BG.setPlayModel(val)
  })
  // 切换popup背景图片
  const imgList = [
    '../img/popupBgimg/bgimg-0.jpg',
    '../img/popupBgimg/bgimg-1.jpg',
    '../img/popupBgimg/bgimg-2.jpg',
    '../img/popupBgimg/bgimg-3.jpg',
    '../img/popupBgimg/bgimg-4.jpg',
    '../img/popupBgimg/bgimg-5.jpg',
    '../img/popupBgimg/bgimg-6.jpg',
    '../img/popupBgimg/bgimg-7.jpg',
    '../img/popupBgimg/bgimg-8.jpg',
    '../img/popupBgimg/bgimg-9.jpg',
    '../img/popupBgimg/bgimg-10.jpg',
    '../img/popupBgimg/bgimg-11.jpg',
  ]
  $('body').on('click','#bgImgChangeId',fangdou(changeBgImg))
  function changeBgImg(){
    const le = imgList.length 
    const num = Math.floor(Math.random() * le) || 0
    $('#maxBoxId').css('background-image',`url(${imgList[num]})`)
    localStorage.setItem('popupBgimg',num)
  }
  // 初始化popup背景图
  function initBgimg(){
    const num = +localStorage.getItem('popupBgimg') || 0
    $('#maxBoxId').css('background-image',`url(${imgList[num]})`)
  }
  initBgimg()
})

