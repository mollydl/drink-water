$(function () {
  // 显示弹层
  $('body').on('click', '#moyuModelId', function () {
    $('#modalSetId-2').fadeIn()
    $('#maxBoxId').css({ width: 700 + 'px', height: 700 + 'px' })
    getDate();
  })
  // 关闭弹层
  $('body').on('click', '#closeModalId-2', function () {
    $('#maxBoxId').css({ width: 400 + 'px', height: 200 + 'px' })
    $('#modalSetId-2').fadeOut()
  })
  function fn(){

  }
  // 获取万年历
  function getDate() {
    const params = {
      key: 'a7b67c287991698aa071a6d7a189cd43',
      date: '2022-4-26'
    }
    // $.post('http://v.juhe.cn/calendar/day', params, function (res) {
    //   console.log(res);
    // })
    $.ajax({
      url: "http://v.juhe.cn/calendar/day",
      type: "POST",
      data:params,
      dataType: "jsonp", 
      jsonpCallback: 'fn',
     
    });
  }
  
})