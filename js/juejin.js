

chrome.runtime.onMessage.addListener(
  function (request) {
    if (request.action == "setJueJinCss") {
      const elBoxs = ['body','div','li','ul','header','article','nav','blockquote','form','input','select','option','button']
      const elTexts = ['h1','h2','h3','h4','h5','h6','p']
      
      if(request.skin==='dark'){
        $('body').addClass('jj-dark-box');
        [...elBoxs,...elTexts].forEach(el=>{
          $(el).css({'background-color':'#222','color':'#aaa','border-color':'#999'});
          // $(el).addClass('jj-dark-box');
        })
      }
      if(request.skin==='dark-video'){
        const flag = $('.my-video').length <1
        if(flag){
          const node = `<video src='https://img.tukuppt.com/video_show/2419216/00/01/75/5b4c1aeda31ca.mp4' 
          autoplay loop class='my-video'></video>`
          $('body').append(node);
        }
      }
    }
  }
);

