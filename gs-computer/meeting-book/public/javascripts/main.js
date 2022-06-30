$(function () {
  if (location.pathname === '/add/meeting') {
    $('.nav-wid li').removeClass('active')
    $('.n_add').addClass('active')
  } else if (location.pathname === '/mp/update') {
    $('.nav-wid li').removeClass('active')
    $('.n_mp_update').addClass('active')
  }

  $('#saveMeetingMsg').click(function () {
    var roomid = $('#roomid').val()
    var startdate = $('#startdate').val()
    var starttime = $('#starttime').val()
    var duringtime = $('#duringtime').val()
    var meetingname = $('#meetingname').val()
    var loginName = $('#loginName').val()
    var loginPwd = $('#loginPwd').val()

    if (!roomid || !startdate || !starttime || !duringtime || !meetingname) {
      alert('请输入预定会议室信息')
      return false
    }
    var curTr = {
      mId: +new Date(),
      roomid: roomid,
      startdate: startdate,
      starttime: starttime,
      duringtime: duringtime,
      meetingname: meetingname,
      status: 'pending',
      preBookTime: new Date(),
      u: loginName,
      p: loginPwd
    }
    jQuery.post('/save/json', curTr, function (res) {
      if (res.code) {
        alert(res.msg);
        location.href = location.origin + '/'
      } else
        alert('保存出错');
    });
  })

  $('#saveRecommend').click(function () {
    var name = $('#name').val()
    var author = $('#author').val()
    var content = $('#content').val()
    var recommend = $('#recommend').is(':checked')

    if (!author || !content) {
      alert('请输入诗词信息')
      return false
    }

    jQuery.post('/mp/save', {
      name: name,
      author: author,
      content: content,
      recommend: recommend
    }, function (res) {
      if (res.code) {
        alert(res.msg);
        location.reload()
      } else
        alert('保存出错');
    });
  })
})