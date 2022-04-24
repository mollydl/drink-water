// 关闭弹层
$('body').on('click','#closeModalId, #closeModalBtnId', function () {
  $('#modalSetId').fadeOut()
})
// 个性化设置
$('body').on('click','#setUpSub', function () {
  const duration = $('#formTime').val()
  const title = $('#formTitle').val()
  const content = $('#formCon').val()
  const btnleft = $('#formLeftBtn').val()
  const btnright = $('#formRightBtn').val()
  let nickTextObj = {
    duration: duration,
    title: title,
    content: content,
    btnleft: btnleft,
    btnright: btnright,
  }
  BG.setUpLocal(nickTextObj)
  $('#modalSetId').fadeOut()
  setTimeout(() => {
    $('#xiaoyaziId').css('left', `calc(0% - 20px)`)
    $('#seepItemId').css('width', `0%`)
  }, 500);
})