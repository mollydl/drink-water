let timer = null
let duration = 1800
let seepDuration = 0
let seepNum = 0
let nickTextObj = {}
let timeStopStart = false
initSetUp()

function starTimer(fun=function(){}){
  clearInterval(timer)
  timer = setInterval(function(){
    if(seepNum>=100){
      clearInterval(timer)
      noticeWater()
    }else{
      seepDuration +=1
      seepNum =  (seepDuration / duration) * 100
      iconTimer(seepDuration)
      fun({seepNum, seepDuration})
    }
  },1000)
  
  return {seepNum, seepDuration}
}
starTimer()

// 获取基本信息
function getBginfo(){
  return {
    duration,
    seepDuration,
    seepNum
  }
}

// 重置信息
function resetInfo(fun=function(){}){
  clearInterval(timer)
  seepDuration = 0
  seepNum = 0
  starTimer()
  fun({
    duration,
    seepDuration,
    seepNum
  })
}

// 发送通知
function noticeWater(){
  const {title, content, btnleft, btnright} = initSetUp()
  chrome.notifications.create({
      type: 'basic',
      iconUrl: '../img/icon.png',
      title,
      buttons: [{
          title: btnleft,
          iconUrl: '../img/daizhu.png'
      }, {
          title: btnright,
          iconUrl: '../img/kuqi.png'
      }],
      message: content
  })
}
chrome.notifications.onButtonClicked.addListener(function (id, btnIndex) {
  if(btnIndex===0){
    resetInfo()
  }
});

// 设置小鸭子下标
function iconTimer(num=0){
  const text = num < duration ? Math.floor(num / 60) + '' : '危'
  const color = num < duration ? '#1daeff' : '#ff4000'
  const cb = chrome.browserAction
  cb.setBadgeText({
      text: text
  })
  cb.setBadgeBackgroundColor({
    color: color
  })
}

// 个性化设置存入缓存
function setUpLocal(data){
  setLoacl({key:'setUp', val:data})
  initSetUp()
  location.reload()
}

// 初始化个性设置
function initSetUp(){
  const {
    duration:durationloc='1800', 
    title='快喝水~', 
    content='已经很久没喝水了，变烤鸭啦~', 
    btnleft='马上喝', 
    btnright='我偏不'
  } = getLoacl({key:'setUp'}) || {}
  duration = Number(durationloc)
  nickTextObj.title = title
  nickTextObj.content = content
  nickTextObj.btnleft = btnleft
  nickTextObj.btnright = btnright
  return nickTextObj
}

// 暂停时间(切换)
function changeTime(flag){
  timeStopStart = flag
  if(timeStopStart){
    clearInterval(timer)
  }else{
    starTimer()
  }
}

// 获取暂停时间状态
function getTimeStart(){
  return timeStopStart
}

// 解决chrome插件，ajax访问跨域问题 ----------- start
function removeMatchingHeaders(headers, regex) {
  for (var i = 0, header; (header = headers[i]); i++) {
    if (header.name.match(regex)) {
      headers.splice(i, 1);
      return;
    }
  }
}

function responseListener(details) {
  removeMatchingHeaders(details.responseHeaders, /access-control-allow-origin/i);
  details.responseHeaders.push({ name: 'Access-Control-Allow-Origin', value: '*' });
  return { responseHeaders: details.responseHeaders };
}

chrome.webRequest.onHeadersReceived.addListener(responseListener, {
  urls: ['*://*/*']
}, [
  'blocking',
  'responseHeaders',
  'extraHeaders'
]);
// 解决chrome插件，ajax访问跨域问题 ----------- end

// 监听浏览器地址栏变化
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,curtab){
  if(changeInfo.status === 'complete'){ // 表示页面访问结束
    // 向content_scripts发送消息
    chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
      chrome.tabs.sendMessage(tab[0].id, {
        actionType: "tabChange",
        obj:{tabId, changeInfo, curtab}
      });
    });
    const skinType = getLoacl({key:'skinType', isObj:false}) || 'init'
    const hasJueJin = curtab.url.includes('https://juejin.cn/post')
    if((skinType!=='init' || skinType !== 'dark') && hasJueJin){
      changeAudio({skin: skinType})
    }
  }
});

// popup切换歌曲回调
function changeAudio(data){
  const micObj = {
    'video-fengchuimailang':'https://www.qqmc.com/mp3/music239653.mp3',
    'video-huanghun':'https://www.qqmc.com/mp3/music6874743.mp3',
    'video-yuai':'https://www.qqmc.com/mp3/music38615712.mp3',
    'video-gwysgdsj':'https://www.qqmc.com/mp3/music440614.mp3',
    'video-nnhdws':'https://www.qqmc.com/mp3/music221804.mp3',
    'video-dafengchui':'https://www.qqmc.com/mp3/music169428024.mp3',
  }
  const aUrl = micObj[data.skin]
  setLoacl({key:'skinType', val:data.skin, isObj:false})
  const flag = $('#bg_music').length <1
  const audioNode = `<audio id="bg_music" class='my-audio' src='${aUrl}' controls loop autoplay></audio>`
  const hasAudioMute = getLoacl({key:'hasAudioMute'})
  if(flag){
    !hasAudioMute.chexVal && $('body').append(audioNode)
  }else{
    $('#bg_music').attr('src',aUrl)
  }
}
// 获取背景缓存
function getBgLoacl({key='', isObj=true}){
  return getLoacl({key, isObj})
}
// 获取背景音频播放状态: 暂停：true， 播放中：false
function getPaused(){
  const audio = document.querySelector('#bg_music')
  if(audio){
    return audio.paused
  }else{
    return true
  }
}
// 根据当前播放状态设置暂停、播放背景音乐
function togglePalyBgm(){
  const status = getPaused()
  const audio = document.querySelector('#bg_music')
  !status ? audio.pause() : audio.play()
}
// 存储静音模式，且控制播放
function setPlayModel(chexVal){
  const skinType = getLoacl({key:'skinType', isObj:false}) || 'init'
  setLoacl({key:'hasAudioMute', val:{chexVal}})
  changeAudio({skin: skinType})
}
// 设置暂停播放
function audioToPause(flag){
  const audio = document.querySelector('#bg_music')
  if(audio){
      flag ? audio.pause() : audio.play()
  }
}
// 获取静音模式缓存值
function getHasAudioMute(){
  const hasAudioMute = getLoacl({key:'hasAudioMute'})
  return hasAudioMute.chexVal
}
// 移除audio播放器
function removeAudio(){
  const aid = $('#bg_music')
  aid && aid.remove()
}
// 移除掘金标签，暂停歌曲
chrome.tabs.onRemoved.addListener(function(){
  chrome.tabs.getAllInWindow(null,function(tabs){
    const hasJueJin = tabs.some(function(item){
      return item.url.includes('juejin')
    })
    !hasJueJin && audioToPause(true)
  })
})

