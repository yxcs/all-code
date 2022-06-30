var accountSelect = '';
var remoteBuyers = [];
var scrollTimer = '';
var isLogin = false;
var tagLists = [];
var pageNum = 1;

var sellerName = null;

chrome.runtime.sendMessage({
  type: 'page',
  from: 'popup'
})

chrome.runtime.sendMessage({
  type: 'tagLists',
  from: 'popup'
})

// chrome.runtime.sendMessage({
//   type: 'currentPage',
//   from: 'popup',
//   status: 'init'
// })

chrome.runtime.onMessage.addListener(message => {

  if (message.type === 'pageUrlPopup') {
    var url = message.data;
    if (url.indexOf('trade.taobao.com/trade/itemlist/list_sold_items.htm') > 0) {
      $('.urlNoRight').css({display: 'none'})
      $('.loading').css({display: 'block'})
      // 检测版本
      chrome.runtime.sendMessage({
        type: 'checkVersion',
        from: 'popup',
        data: ''
      })
      // 获取sellerName
      chrome.runtime.sendMessage({
        type: 'getSellerName',
        from: 'popup',
        data: ''
      })
      // 获取polling滚动信息
      chrome.runtime.sendMessage({
        type: 'fetchPolling',
        from: 'popup'
      })
    }
  }

  if (message.type === 'versionStatusPopup') {
    $('.loading').remove()
    $('.urlNoRight').remove()
    if (message.data.status === 1 && parseFloat(message.data.data.newVersion) > message.version) {
      if (message.data.data.forcedUpgrade) {
        $('.forceUpdateTure').css({display: 'block'}) 
        var text = message.data.data.newVersionDetail + '  最新版本为' + message.data.data.newVersion
        $('.forceUpdateTure').find('span').text(text)
      } else {
        $('.forceUpdateFalse').css({display: 'block'})
        var text = message.data.data.newVersionDetail + '  最新版本为' + message.data.data.newVersion
        $('.forceUpdateFalse').find('span').text(text)
        $('#closeUpdate').click(function() {
          $('.forceUpdateFalse').remove();
          chrome.runtime.sendMessage({
            type: 'checkLogin',
            from: 'popup',
            data: ''
          })
        })
      }
    } else {
      chrome.runtime.sendMessage({
        type: 'checkLogin',
        from: 'popup',
        data: ''
      })
    }
  }

  if (message.type === 'loginCheck') {
    $('#content').css({display: 'block'})
    if (message.data.status === 1 && message.data.data.platform === 'CHROM') {
      $('.showMain').css({display: 'block'})
      chrome.runtime.sendMessage({
        type: 'getBuyersPopup',
        from: 'popup'
      })
      $('#login').find('a').empty();
      $('#login').find('a').text(message.data.data.nickname);

      $('#login').find('a').click(function() {
        chrome.runtime.sendMessage({
          type: 'logout',
          from: 'popup',
          data: ''
        })
      })
    } else {
      $('#loginModal').css({display: 'block'})
    }
  }

  if (message.type === 'sellerNamePopup') {
    sellerName = message.data;
    $('#taobaoAccount').val(sellerName);
  }
  
  if (message.type === 'loginPopup') {
    $('#content').css({display: 'block'})
    if (message.data.status === 1) {
      if (message.loginType === 'login') {
        showAlert('登陆成功', 2000)
      }
      $('.showMain').css({display: 'block'})
      $('#loginModal').css({display: 'none'})
      chrome.runtime.sendMessage({
        type: 'getBuyersPopup',
        from: 'popup'
      })
      $('#login').find('a').empty();
      $('#login').find('a').text(message.data.data.nickname);
    } else {
      showAlert(message.data.status+':登陆失败，请重试', 2000)
    }

  }

  if (message.type === 'polilingPopup') {
    if (message.data.status === 1) {
      var lists = message.data.data;
      var lis = '';
      lists.forEach(function(item) {
        lis += `<li>${item}</li>`;
      })
      $('.scroll').append(`<ul>${lis}</ul>`);

      if ($('.scroll').find('ul').length === 1) {
        scrollTimer = setInterval(scroll, 3000)
      }
    } else {
      showAlert(message.data.status+':获取滚动信息失败', 2000)
    }
  }

  if (message.type === 'orderListsPopup') {
    if (message.data.status === 1) {
      remoteBuyers = message.data.data;
      showTable(message.data.data, message.params)
      pageNum = Math.ceil(message.length / 15);
      $('.pagination-total>span').empty()
      $('.pagination-total>span').text(pageNum)
    } else {
      showAlert(message.data.status+': 会员过期，或服务出错', 3000)
    }
  }

  if (message.type === 'tagsPopup') {
    if (message.data.status === 1) {
      tagLists = message.data.data
    } else {
      showAlert(message.data.status+':获取卖家标签出错', 2000)
    }
  }

  if (message.type === 'signOKPopup') {
    if (message.data.status === 1) {
      showAlert('标记成功', 2000)
      updateSignData(message.params)
    } else {
      showAlert(message.data.status+'标记失败', 2000)
    }
  }

  if (message.type === 'signUpdatePopup') {
    if (message.data.status === 1) {
      reloadMark(message.data.data)
    } else {
      showAlert(message.data.status+'获取标记信息失败', 2000)
    }
  }

  if (message.type === 'popupLogout') {
    if (message.data.status === 1) {
      showAlert('退出成功', 2000)
      setTimeout(function () {
        location.reload()
      }, 2000)
    }
  }

  if (message.type === 'signBackPage') {
    if (message.error) {
      if (message.pageTo === 'pre') {
        showAlert('已经是第一页了', 2000)
      } else if (message.pageTo === 'next') {
        showAlert('已经是最后一页了', 2000)
      } else if (message.pageTo === 'go') {
        showAlert('跳转有误', 2000)
      }
    } else {
      showTable(message.data, []);
      $('.pagination-go-num>span').empty();
      $('.pagination-go-num>span').text(message.page)
    }
  }

})

$("#loginModal").find('input[type="submit"]').click(function(e) {
  e.stopPropagation();
  e.preventDefault();
  var taobaoAccount = !!sellerName ? sellerName : $('#taobaoAccount').val();
  var chromLoginNo = $('#chromLoginNo').val();
  var params =  {
    platform: 'CHROM',
    taobaoAccount: taobaoAccount,
    chromLoginNo: chromLoginNo
  }
  chrome.runtime.sendMessage({
    type: 'login',
    from: 'popup',
    data: params
  })
})

function scroll(){
  $(".scroll ul").animate({"margin-top":"30px"},function(){
    $(".scroll ul li:eq(0)").appendTo($(".scroll ul"))
    $(".scroll ul").css({"margin-top":0})
  })
}

function showTable(data, params) {
  var trs = '';

  var myOrderLists = data;

  myOrderLists.forEach(function(item) {
    trs += `<tr>
        <td>${item.account}</td>
        <td id="${item.account}" class="signBtn">${item.sellerTagCount}</td>
        <td>${item.dangerValue}%</td>
      </tr>`;
  })
  $('#tbody').empty();
  $('#tbody').append(trs);
  
  $('.signBtn').click(function(e) {
    $('.wrap').css({display: 'block'});
    showTagLists(e.target.id, myOrderLists)
  })

  $('.wrap').click(function() {
    $(this).css({display: 'none'});
    accountSelect = '';
    $('#subTbody').find('tr').remove();
  })
}

function showTagLists(account, data) {
  var buyers = data.filter(function(item) {
    return item.account === account
  })
  buyers = buyers[0];
  var tagList = tagLists;
  
  tagList = tagList.map(function(item) {
    return {tagId: item.id, tagName: item.name, remark: '', disabled: false};
  })
  
  var mineTagList = buyers.mineTagList;
  tagList = tagList.map(function(item_tag) {
    mineTagList.forEach(function(item_seller) {
      if (item_seller.tagId === item_tag.tagId) {
        item_tag = item_seller;
        item_tag.disabled = true;
      }
    })
    return item_tag;
  })

  var subTrs = '';
  tagList.forEach(function(item) {
    if (item.disabled) {
      subTrs += `<tr>
        <td data-account="${account}" id="${item.tagId}" class="tagClass">${item.tagName}</td>
        <td>${item.remark}</td>
        <td class="checkbox">已标记</td>
      </tr>`;
    } else {
      subTrs += `<tr>
        <td data-account="${account}" id="${item.tagId}" class="tagClass">${item.tagName}</td>
        <td class="remark">${item.remark}</td>
        <td class="checkbox"><input type="checkbox" /></td>
      </tr>`;
    }
    
  })
  if ($('#subTbody').find('td').length > 0) return ;
  $('#subTbody').append(subTrs);

  $('.subTable').click(function(e) {
    e.stopPropagation();
  })

  $('.remark').dblclick(function(event) {
    $(this).empty();
    $(this).append('<input class="remarkInput" type="text" />');
    $(this).find('input').focus()
  })
}

$('#signSubmit').find('input').click(function(event) {
  event.stopPropagation();

  var selectTagList = [];
  var account = null;
  $('.tagClass').each(function() {
    var elements = $(this).nextAll();
    var checkbox = $(elements[1]).find('input').is(':checked');
    
    if (checkbox) {
      account = $(this).attr('data-account')
      var id = $(this).attr('id');
      var remark = $(elements[0]).find('input').val();
      selectTagList.push({tagId: id, remark: remark })
    }
  })

  if (selectTagList.length > 0 && !!account) {
    var params = {
      account: account,
      ugcTags: selectTagList
    }

    chrome.runtime.sendMessage({
      type: 'sign',
      from: 'popup',
      data: params
    })
    
  } else {
    showAlert('未有任何新标记', 2000)
  }

  $('.wrap').css({display: 'none'});

})

function showAlert(text, time) {
  $('#alert').remove();
  $('body').append(`
    <div id="alert">
      ${text} 
    </div>
  `)

  setTimeout(function () {
    $('#alert').remove();
  }, time)

  $('#alert').click(function (e) {
    $(this).remove();
  })
}

function updateSignData(params) {
  var buyer = remoteBuyers.filter(function(item) {
    return params.account === item.account;
  })
  buyer = buyer[0];
  chrome.runtime.sendMessage({
    type: 'signOrder',
    from: 'popup',
    data: params
  })
}

function reloadMark(data) {
  data = data[0];
  var element = null;
  var account = null;
  $('.signBtn').each(function() {
    var myAccount = $(this).attr('id');
    if (myAccount === data.account) {
      element = this;
      $(this).empty()
      $(this).text(data.sellerTagCount)
      account = myAccount;
    }
  })

  $(element).unbind('click');
  $(element).click(function(event) {

    $('#subTbody').find('tr').remove();

    $('.wrap').css({display: 'block'});
    $('.wrap').click(function() {
      $(this).css({display: 'none'});
      $('#subTbody').find('tr').remove();
    })

    var tagList = tagLists;
    
    tagList = tagList.map(function(item) {
      return {tagId: item.id, tagName: item.name, remark: '', disabled: false};
    })
    
    var mineTagList = data.mineTagList;
    tagList = tagList.map(function(item_tag) {
      mineTagList.forEach(function(item_seller) {
        if (item_seller.tagId === item_tag.tagId) {
          item_tag = item_seller;
          item_tag.disabled = true;
        }
      })
      return item_tag;
    })
  
    var subTrs = '';
    tagList.forEach(function(item) {
      if (item.disabled) {
        subTrs += `<tr>
          <td data-account="${account}" id="${item.tagId}" class="tagClass">${item.tagName}</td>
          <td>${item.remark}</td>
          <td class="checkbox">已标记</td>
        </tr>`;
      } else {
        subTrs += `<tr>
          <td data-account="${account}" id="${item.tagId}" class="tagClass">${item.tagName}</td>
          <td class="remark">${item.remark}</td>
          <td class="checkbox"><input type="checkbox" /></td>
        </tr>`;
      }
    })

    if ($('#subTbody').find('td').length > 0) return ;
    $('#subTbody').append(subTrs);
  
    $('.subTable').click(function(e) {
      e.stopPropagation();
    })
  
    $('.remark').dblclick(function(event) {
      $(this).empty();
      $(this).append('<input class="remarkInput" type="text" />');
      $(this).find('input').focus()
    })

  })
}

$('#mojing_wx').click(function() {
  var top = $(this).position().top;
  var left = $(this).position().left;
  $('.qrCode').css({display: 'block', top: top+30, left: left-10})
})

$('body').click(function(event) {
  if (event.target.id !== 'mojing_wx') {
    $('.qrCode').css({display: 'none'})
  }
})

$('.pagination-pre').click(function() {
  var goNum = $('.pagination-go-num>span').text()
  if (goNum <= 1) {
    showAlert('已经是第一页了', 3000)
    return ;
  }
  goNum --;
  chrome.runtime.sendMessage({
    type: 'signGoPage',
    from: 'popup',
    data: goNum,
    pageFrom: 'pre'
  })
})

$('.pagination-next').click(function() {
  var goNum = $('.pagination-go-num>span').text()
  goNum ++;
  chrome.runtime.sendMessage({
    type: 'signGoPage',
    from: 'popup',
    data: goNum,
    pageFrom: 'next'
  })
})

$('.pagination-go-btn').click(function() {
  var goNum = $('#goNum').val();
  if (pageNum < parseInt(goNum)) {
    chrome.runtime.sendMessage({
      type: 'signGoPage',
      from: 'popup',
      data: pageNum,
      pageFrom: 'go'
    })
  } else if (!goNum || parseInt(goNum) <= 0){
    showAlert('输入页数有误！', 2000)
  } else {
    chrome.runtime.sendMessage({
      type: 'signGoPage',
      from: 'popup',
      data: parseInt(goNum),
      pageFrom: 'go'
    })
  }
  $('#goNum').val('')
})