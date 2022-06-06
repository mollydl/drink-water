
const funObj = {
  'init':skinInit,
  'dark':skinDark,
  'video-fengchuimailang':skinVideoFcml,
  'video-huanghun':skinVideoHh,
  'video-yuai':skinVideoYa,
  'video-gwysgdsj':skinVideoGwysgdsj,
  'video-nnhdws':skinVideoNnhdws,
  'video-dafengchui':skinVideoDfc,
}

// 来自popup，background.js的消息
chrome.runtime.onMessage.addListener(function (data) {
  if(data.actionType==='changeBgm'){
    funObj[data.skinType](data.skinType)
  }else if(data.actionType==='changeBard'){
    console.log(data);
    localStorage.setItem('bardOpacity', data.val)
    $('#juejin').css('opacity',data.val)

  }else if(data.actionType==='tabChange'){
    tabChange(data)
  }
});

// 初始化掘金背景透明度
function initBardOpacity(){
  const opt = localStorage.getItem('bardOpacity') || 0.82
  $('#juejin').css('opacity',opt) 
}
initBardOpacity()
// 地址栏变化逻辑处理
function tabChange(res){
  const {curtab} = res.obj
  const hasJueJin = curtab.url.includes('https://juejin.cn/post')
  const skinType = localStorage.getItem('skinType') || 'init'
  // 访问的是掘金文章阅读页面
  if(hasJueJin){ 
    setTimeout(() => {
      !curtab.url.includes('#') && funObj[skinType](skinType)
    }, 500);
  }else{
    skinInit(skinType)
  }
}
// 一键还原
function skinInit(type='init'){
  const vid = $('#bg_video')
  $('body').removeClass('jj-dark-box')
  $('body').removeClass('jj-video-box')
  vid && vid.remove()
  $('.logo-img').attr('src','https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg')
  localStorage.setItem('skinType', type)
}
// 暗黑模式
function skinDark(type='init'){
  skinInit()
  $('body').addClass('jj-dark-box');
  $('.jj-dark-box .logo-img').attr('src','https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/brand-dark.3111cff6.svg')
  localStorage.setItem('skinType', type)
}
// 视频模式-风吹麦浪
function skinVideoFcml(type='init'){
  const vUrl = 'https://cdn.videvo.net/videvo_files/video/free/2021-08/large_watermarked/210722_05_Festival_4k_073_preview.mp4'
  videoMooe(vUrl, type)
}
// 视频模式-黄昏
function skinVideoHh(type='init'){
  const vUrl = 'https://cdn.videvo.net/videvo_files/video/free/2015-09/large_watermarked/sunrise_over_the_lake2_preview.mp4'
  videoMooe(vUrl, type)
}
// 视频模式-雨爱
function skinVideoYa(type='init'){
  const vUrl = 'https://cdn.videvo.net/videvo_files/video/free/2020-01/large_watermarked/200116_Lens%20effect_4k_073_preview.mp4'
  videoMooe(vUrl, type)
}
// 视频模式-给我一首歌的时间
function skinVideoGwysgdsj(type='init'){
  const vUrl = 'https://cdn.videvo.net/videvo_files/video/free/2015-08/large_watermarked/sunrise_01_preview.mp4'
  videoMooe(vUrl, type)
}
// 视频模式-那女孩对我说
function skinVideoNnhdws(type='init'){
  const vUrl = 'https://cdn.videvo.net/videvo_files/video/free/2014-12/large_watermarked/Raindrops_Videvo_preview.mp4'
  videoMooe(vUrl, type)
}
// 视频模式-大风吹
function skinVideoDfc(type='init'){
  const vUrl = 'https://cdn.videvo.net/videvo_files/video/free/2013-09/large_watermarked/DiscoLights2Videvo_preview.mp4'
  videoMooe(vUrl, type)
}

// 视频模式前置动作
function videoMooe(vUrl='', type='init'){
  const flag = $('.my-video').length <1
  const node = `<video id="bg_video" src='${vUrl}' muted='true' autoplay loop class='my-video'></video>`
  const hasDark = $('body').hasClass('jj-dark-box')
  hasDark && skinInit()
  if(flag){
    $('body').append(node)
    $('body').addClass('jj-video-box')
  }else{
    $('#bg_video').attr('src',vUrl)
  }
  localStorage.setItem('skinType', type)
}



  
