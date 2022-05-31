

chrome.runtime.onMessage.addListener(
  function (request) {
    const funObj = {
      'init':skinInit,
      'dark':skinDark,
      'video-fengchuimailang':skinVideoFcml,
      'video-huanghun':skinVideoHh,
      'video-yuai':skinVideoYa,
    }
    if (request.action == "setJueJinCss") {
      console.log(request);
      funObj[request.skin]()
    }
  }
);ß

// 一键还原
function skinInit(){
  $('body').removeClass('jj-dark-box');
  $('.logo-img').attr('src','https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg')
}
// 暗黑模式
function skinDark(){
  $('body').addClass('jj-dark-box');
  $('.jj-dark-box .logo-img').attr('src','https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/brand-dark.3111cff6.svg')
}
// 视频模式-风吹麦浪
function skinVideoFcml(){
  const vUrl = 'https://cdn.videvo.net/videvo_files/video/free/2021-08/large_watermarked/210722_05_Festival_4k_073_preview.mp4'
  const aUrl = 'https://www.qqmc.com/mp3/music239653.mp3'
  videoMooe(vUrl, aUrl)
}
// 视频模式-黄昏
function skinVideoHh(){
  // const vUrl = 'https://cdn.videvo.net/videvo_files/video/free/2018-01/large_watermarked/171124_E1_HD_012_preview.mp4'
  const vUrl = 'https://cdn.videvo.net/videvo_files/video/free/2015-09/large_watermarked/sunrise_over_the_lake2_preview.mp4'
  const aUrl = 'https://www.qqmc.com/mp3/music6874743.mp3'
  videoMooe(vUrl, aUrl)
}
// 视频模式-雨爱
function skinVideoYa(){
  const vUrl = 'https://cdn.videvo.net/videvo_files/video/free/2020-01/large_watermarked/200116_Lens%20effect_4k_073_preview.mp4'
  const aUrl = 'https://www.qqmc.com/mp3/music38615712.mp3'
  videoMooe(vUrl, aUrl)
}

// 视频模式前置动作
function videoMooe(vUrl='', aUrl=''){
  const flag = $('.my-video').length <1
  const node = `<video id="bg_video" src='${vUrl}' autoplay loop class='my-video'></video>`
  const audioNode = `<audio id="bg_music" class='my-audio' src='${aUrl}' controls loop autoplay></audio>`
  if(flag){
    $('body').append(node)
    $('body').append(audioNode)
    $('body').addClass('jj-video-box')
  }else{
    $('#bg_video').attr('src',vUrl)
    $('#bg_music').attr('src',aUrl)
  }
}

$(function(){
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    alert('updated from contentscript');
  })
})

  
