

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

}
// 暗黑模式
function skinDark(){
  const elBoxs = ['body','div','li','ul','header','article','nav','blockquote','form','input','select','option','button']
  const elTexts = ['h1','h2','h3','h4','h5','h6','p']
  $('body').addClass('jj-dark-box');
  $('.jj-dark-box .logo-img').attr('src','https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/brand-dark.3111cff6.svg')
  // [...elBoxs,...elTexts].forEach(el=>{
  //   $(el).css({'background-color':'#222','color':'#aaa','border-color':'#999'});
  //   $(el).addClass('jj-dark-box');
  // })
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

  
