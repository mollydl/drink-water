

chrome.runtime.onMessage.addListener(
  function (request) {
    const funObj = {
      'init':skinInit,
      'dark':skinDark,
      'video-fengchuimailang':skinVideoFcml,
      'video-tonghuazhen':skinVideoFcmlThz,
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
  const flag = $('.my-video').length <1
  if(flag){
    const node = `<video src='https://img.tukuppt.com/video_show/2419216/00/01/75/5b4c1aeda31ca.mp4' 
    autoplay loop class='my-video'></video>`
    $('body').append(node);
  }
}
// 视频模式-童话镇
function skinVideoFcmlThz(){

}

$(function(){
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    alert('updated from contentscript');
  })
})

  
