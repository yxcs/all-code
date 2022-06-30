// 测试账户 于晓超410  chrome13

// base64图片
var logo = 'http://wanxiangfuwu.com/static/img/logo.3e05a4b.png'; //http://7xtwf5.com1.z0.glb.clouddn.com/icon.png
var successIcon = 'data:image/png;base64,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';
var errorIcon = 'data:image/png;base64,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';

var buyerDetails = [];     // 存储买家详细信息
var orderDetails = [];     // 存储买家简单信息
var userDetails = [];      // 获取订单详情
var tagLists = [];         // 标签列表
var scrollTimer = '';      // 定时滚动
var hasNewVersion = false; // 插件版本检测
var signListsGlobal = []   // 当前标记列表， 未登陆时保存
var sellerName = null;     // 买家名字
var pageActive = 1;        // 当前页面页码
var timmerScroll = null    // 滚动
var timmer = null;

var totalPage = 0;
var totalNumber = 0;

if (location.href.indexOf('https://trade.taobao.com/trade/itemlist/list_sold_items.htm') > -1) {

  // getOrdersInit()   // 初始化订单下载

  chrome.runtime.sendMessage({
    type: 'checkVersion',
    from: 'seller',
    data: ''
  })

  chrome.runtime.sendMessage({
    type: 'tagLists',
    from: 'seller',
    data: ''
  })

  showPageChangeClick()
  $(window).resize(function(e) {
    $('.Keqi_page_pre').remove()
    $('.Keqi_page_next').remove()
    showPageChangeClick()
  })

  // $('body').append('<p>af----------------------------dddddddddd</p>')

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "versionStatus") {
      if (request.data.status === 1) {
        if (parseFloat(request.data.data.newVersion) > request.version && request.data.data.forcedUpgrade) {
          showMsg('error', request.data.status + ': 插件需尽快更新', 3000)
        } else {
          chrome.runtime.sendMessage({
            type: 'checkLogin',
            from: 'seller',
            data: ''
          })
        }
      } else {
        chrome.runtime.sendMessage({
          type: 'checkLogin',
          from: 'seller',
          data: ''
        })
        showMsg('error', request.data.status + ': 插件版本检测失败', 3000)
      }
    }

    if (request.type === "loginSeller") {
      clearInterval(timmerScroll);
      $('.wrap').remove();
      $('.message_box').remove();
      $('.Keqi_show').remove();
      $('#box').remove();
      buyerDetails = [];
      orderDetails = [];
      userDetails = [];

      var loginData = {isLogin: false, data: null};
      var data = request.data.data;
      
      if (request.data.status === 1) {
        if (request.loginType === 'login' && data.platform === 'CHROM') {
          showMsg('success', '登陆成功', 2000)
        }
        if (data.platform === 'CHROM') {
          loginIsOK()
          loginData.isLogin = true;
          loginData.data = data;
        } else {
          loginNoOk()
        }
      } else {
        if (request.loginType === 'login') {
          showMsg('error', request.data.status + ': 登陆失败', 2000)
        }
        loginNoOk()
      }

      chrome.runtime.sendMessage({
        type: 'fetchPolling',
        from: 'seller',
        data: loginData
      })
    }

    if (request.type === "polling") {
      if (request.data.status === 1) {
        pollingMessage(request.data, request.loginData)
      } else {
        showMsg('error', request.data.status + ': 获取滚动信息失败', 2000)
      }
    }

    if (request.type === "orderLists") {
      if (request.data.status === 1) {
        showOrderLists(request.data.data)
      } else {
        showMsg('error', request.data.status + ': 会员过期，或服务出错', 5000)
      }
    }

    if (request.type === "tags") {
      if (request.data.status === 1) {
        tagLists = request.data.data;
      } else {
        showMsg('error', request.data.status + ': 标签获取失败', 3000)
      }
    }

    if (request.type === "signOK") {
      if (request.data.status === 1) {
        chrome.runtime.sendMessage({
          type: 'signOrder',
          from: 'seller',
          data: request.params
        })
        showMsg('success', '标记成功', 2000)
      } else {
        showMsg('error', request.data.status + ': 标记失败', 2000)
      }
    }

    if (request.type === "signUpdate") {
      if (request.data.status === 1) {
        signUpdateOk(request.data.data)
      } else {
        showMsg('error', request.data.status + ': 获取单个订单失败', 2000)
      }
    }

    if (request.type === 'page') {
      chrome.runtime.sendMessage({
        type: 'pageUrl',
        from: 'seller',
        data: location.href
      })
    }

    if (request.type === 'sellerName') {
      var sellerName = null;
      if ($('.user-nick').length) {
        sellerName = $('.user-nick').text();
      } else {
        sellerName = $('.j_UserNick.sn-user-nick').text()
      }

      chrome.runtime.sendMessage({
        type: 'sellerNameSeller',
        from: 'seller',
        data: sellerName
      })
    }

    if (request.type === 'getBuyers') {
      var orderDetails = [];
      var buyerDetails = [];
      $('.trade-order-main').each(function (index, element) {
        var obj = {
          orderNo: '',
          account: ''
        }
        obj.orderNo = $(element).find('[name="orderid"]').val();
        obj.account = $(element).find('.buyer-mod__name___S9vit').text();
        orderDetails.push(obj);
      })

      $('.item-mod__trade-order-mainClose___34USw').each(function (index, element) {
        var obj = {
          orderNo: '',
          account: ''
        }
        obj.orderNo = $(element).find('[name="orderid"]').val();
        obj.account = $(element).find('.buyer-mod__name___S9vit').text();
        orderDetails.push(obj);
      })

      buyerDetails = orderDetails.map(function(item) {
        return {orderNo: item.orderNo, account: item.account}
      })

      chrome.runtime.sendMessage({
        type: 'getBuyersSeller',
        from: 'popup',
        data: buyerDetails
      })
    }

    if (request.type === 'reload4Login') {
      if (request.data.status === 1) {
        setTimeout(function () {
          location.reload()
        }, 5 * 1000)
      }
    }

    if (request.type === 'sellerLogout') {
      if (request.data.status === 1) {
        if (request.from === 'seller') {
          showMsg('success', '退出成功', 2000)
        }
        setTimeout(function () {
          location.reload()
        }, 2000)
      }
    }

    if (request.type === 'updateDataOrder') {
      clearInterval(timmer);
      timmer = setInterval(function() {
        //var displayCss_0 = $('.loading-mod__loading___wSpWn.loading-mod__hidden___3vLUR').css('display');
        var displayCss = $('.loading-mod__loading___307Mm.loading-mod__hidden___3tK7H').css('display');
        if (displayCss === 'none') {
          chrome.runtime.sendMessage({
            type: 'checkVersion',
            from: 'seller',
            data: ''
          })
          clearInterval(timmer);
        }
      }, 1000)
    }

    if (request.type === 'paginationPrePopup') {
      getOrderByApi(request.data)
    }

    if (request.type === 'downloadFinish') {
      $('#keqiDownload').removeAttr("disabled");
    }

  })
  
  
}

// 全局提示框，毫秒为单位
function showMsg(type, msg, delay) {
  $('#successModel').remove();
  $('#errorModel').remove();
  $('#alertModel').remove();
  var successModel = `<div id="successModel" class="model"><img src="${successIcon}" /><span>${msg}</span></div>`;
  var errorModel = `<div id="errorModel" class="model"><img src="${errorIcon}" /><span>${msg}</span></div>`;
  var alertModel = `<div id="alertModel" class="model"><span>${msg}</span></div>`;
  delay = delay > 1000 ? delay : 1000;

  if (type === 'success') {
    $('body').append(successModel);
  } else if (type === 'error') {
    $('body').append(errorModel);
  } else if (type === 'alert') {
    $('body').append(alertModel);
  }

  var timer = setTimeout(function () {
    $('#successModel').remove();
    $('#errorModel').remove();
    $('#alertModel').remove();
  }, delay);

  $('#successModel').click(function() {
    clearTimeout(timer);
    $(this).remove();
  })

  $('#errorModel').click(function() {
    clearTimeout(timer);
    $(this).remove();
  })

  // $('#alertModel').click(function() {
  //   clearTimeout(timer);
  //   $(this).remove();
  // })
}

// 未登录或登陆失败时页面处理
function loginNoOk() {
  if ($('.user-nick').length) {
    sellerName = $('.user-nick').text();
  } else {
    sellerName = $('.j_UserNick.sn-user-nick').text()
  }

  var orderDetails = [];
  $('.trade-order-main').each(function (index, element) {
    var obj = {
      orderNo: '',
      account: '',
      element: element
    }
    obj.orderNo = $(element).find('[name="orderid"]').val();
    obj.account = $(element).find('.buyer-mod__name___S9vit').text();
    orderDetails.push(obj);
  })

  $('.item-mod__trade-order-mainClose___34USw').each(function (index, element) {
    var obj = {
      orderNo: '',
      account: '',
      element: element
    }
    obj.orderNo = $(element).find('[name="orderid"]').val();
    obj.account = $(element).find('.buyer-mod__name___S9vit').text();
    orderDetails.push(obj);
  })

  orderDetails.forEach(function(item) {
    $(item.element).find('.item-mod__checkbox-label___cRGUj')
      .after(`
        <a alt="查看用户标记详情" 
          class="Keqi_show"
          href="javascript: void(0)">
          <img src="${logo}"/>
          <span>无标记信息<span>
        </a>`)
  })

  $('.Keqi_show').click(function () {
    showMsg('error', '请先登陆', 2000)
  })
}

// 登陆成功是页面处理
function loginIsOK() {
  if ($('.user-nick').length) {
    sellerName = $('.user-nick').text();
  } else {
    sellerName = $('.j_UserNick.sn-user-nick').text()
  }

  orderDetails = [];
  $('.trade-order-main').each(function (index, element) {
    var obj = {
      orderNo: '',
      account: '',
      element: element
    }
    obj.orderNo = $(element).find('[name="orderid"]').val();
    obj.account = $(element).find('.buyer-mod__name___S9vit').text();
    orderDetails.push(obj);
  })

  $('.item-mod__trade-order-mainClose___34USw').each(function (index, element) {
    var obj = {
      orderNo: '',
      account: '',
      element: element
    }
    obj.orderNo = $(element).find('[name="orderid"]').val();
    obj.account = $(element).find('.buyer-mod__name___S9vit').text();
    orderDetails.push(obj);
  })

  buyerDetails = orderDetails.map(function(item) {
    return {orderNo: item.orderNo, account: item.account}
  })

  chrome.runtime.sendMessage({
    type: 'buyersDetails',
    from: 'seller',
    data: buyerDetails
  })

}

// 获取滚动消息
function pollingMessage(data, loginData) {
  var lists = data.data;
  var lis = '';
  lists = lists.splice(0, 10);
  lists.forEach(function(item) {
    lis += `<li>${item}</li>`;
  })
  
  if (loginData.isLogin) {
    $('.tabs-mod__main___2JCC6').after(`
      <div class="message_box">
        <div>
          <ul>${lis}</ul>
        </div>
        <div>
          <p class="nickname">${loginData.data.nickname}，欢迎使用明镜台<p>
        </div>
      </div>
    `)

    $('.nickname').click(function () {
      chrome.runtime.sendMessage({
        type: 'logout',
        from: 'seller',
        data: ''
      })
    })

  } else {
    $('.tabs-mod__main___2JCC6').after(`
      <div class="message_box">
        <div>
          <ul>${lis}</ul>
        </div>
        <div>
          您还未登录明镜台，请<a id="mj_login" href="javascript:void(0)">登陆</a>
        </div>
      </div>
    `)

    $('#mj_login').click(function(event) {
      event.stopPropagation();
      showLogin()
    })

  }

  timmerScroll = setInterval(scroll, 3000)
}

// 滚动效果
function scroll(){
  $(".message_box ul").stop().animate({"margin-top":"24px"},function(){
    $(".message_box ul li:eq(0)").appendTo($(".message_box ul"))
    $(".message_box ul").css({"margin-top":0})
  })
}

// 显示登陆窗口
function showLogin() {
  var sellerName = null;
  if ($('.user-nick').length) {
    sellerName = $('.user-nick').text();
  } else {
    sellerName = $('.j_UserNick.sn-user-nick').text()
  }

  $('body').append(`
    <div class="wrap">
      <div id="loginModal">
        <p><label>淘宝账号&nbsp;&nbsp;&nbsp;&nbsp;</label><input disabled="disabled" type="text" value="${sellerName}" /></p>
        <p><label>插件编号&nbsp;&nbsp;&nbsp;&nbsp;</label><input placeholder="填写插件许可证" id="chromLoginNo" type="text" /></p>
        <p><button id="submitBtn">登陆</button></p>
      </div>
    </div>
  `)

  $('.wrap').click(function() {
    $(this).remove();
  })

  $('#submitBtn').click(function(event) {
    event.preventDefault();
    var chromLoginNo = $('#chromLoginNo').val();
    chrome.runtime.sendMessage({
      type: 'login',
      from: 'seller',
      data: {platform: 'CHROM', taobaoAccount: sellerName, chromLoginNo: chromLoginNo}
    })
  })

  $('#loginModal').click(function(event) {
    event.stopPropagation();
  })
}

// 登陆成功后显示订单标记详情
function showOrderLists(data) {
  var tagList = tagLists;

  tagList = tagList.map(function(item) {
    return {tagId: item.id, tagName: item.name, count: 0};
  })

  data = data.map(function(item) {
    var sellerTagStatisList = item.sellerTagStatisList;
    tagList = tagList.map(function(item_tag) {
      sellerTagStatisList.forEach(function(item_seller) {
        if (item_seller.tagId === item_tag.tagId) {
          item_tag = item_seller;
        }
      })
      return item_tag;
    })
    item.sellerTagStatisList = tagList;
    item.element = '';
    return item
  })

  data = data.map(function(item) {
    orderDetails.forEach(function(item_order) {
      if (item.orderNo === item_order.orderNo) {
        item.element = item_order.element;
      }
    })
    return item;
  })

  var subTagList = tagLists;
  subTagList = subTagList.map(function(item) {
    return {tagId: item.id, tagName: item.name, count: 0};
  })

  var myOrderLists = orderDetails.map(function(item) {
    var item_Sub = {
      account: item.account,
      dangerValue: 0,
      element: item.element,
      orderNo: item.orderNo,
      sellerTagCount: 0,
      sellerTagStatisList: subTagList
    }
    data.forEach(function(item_data) {
      if (item_data.orderNo === item_Sub.orderNo) {
        item_Sub = item_data;
      }
    })
    return item_Sub;
  })

  myOrderLists.forEach(function(item) {

    var danger = null;
    if (item.systemTagList && item.systemTagList.length > 0) {
      danger = `<i>${item.systemTagList[0].name}</i>: <i>100%</i>`;
    } else if (item.sellerTagCount) {
      danger = `被<i>${item.maxSellerTag.count}</i>个卖家标识为<i>${item.maxSellerTag.tagName}</i>`
    } else {
      danger = '未被标识'
    }
    $(item.element).find('.item-mod__checkbox-label___cRGUj')
      .after(`
        <a alt="查看用户标记详情" 
          class="Keqi_show"
          href="javascript: void(0)"
          data-id="${item.orderNo}">
          <img src="${logo}"/>
          ${danger}
        </a>`)
  })

  addModel(myOrderLists, '.Keqi_show')
}

// 添加页面弹出面板
function addModel(orderLists, element) {
  element = !!element ? element : '.Keqi_show';
  $(element).click(function(event) { 
      event.stopPropagation();
      $("#box").remove();
      var omId = $(this).attr('data-id');
      // 获取标签列表
      var thisAccount = orderLists.filter(function (item) {
        return item.orderNo === omId;
      })
      thisAccount = thisAccount[0];
      var signTag = thisAccount.sellerTagStatisList.length > 0 ? thisAccount.sellerTagStatisList : [];
      var top = $(this).position().top;
      var left = $(this).position().left;
      var table = '';
      signTag.forEach(function(item) {
        if (item.count > 0) {
          table += `
            <tr>
              <td>${item.tagName}</td>
              <td>${item.count}</td>
              <td class="td_last" data-id="${item.id}">已标记</td>
            </tr>
          `
        } else {
          table += `
            <tr>
              <td>${item.tagName}</td>
              <td>${item.count}</td>
              <td class="td_last" data-id="${item.tagId}"><input type="checkbox" /></td>
            </tr>
          `
          }
      })

      $('body').append(`
        <div id="box">
          <table border="1">
            <thead>
              <tr><td>恶意类型</td><td>标记记录</td><td>标记</td></tr>
            </thead>
            <tbody>${table}</tbody>
          </table>
          <p>危险指数: <span>${thisAccount.dangerValue}%</span></p>
          <p class="submit"><button>提交</button></p>
        </div>`);

        var height = parseInt($("#box").height()) + 40;
        $("#box").css({position: "absolute",'top':top - height,'left':left,'z-index': 999});
        $('#box').click(function(e) {
          e.stopPropagation();
        })

        $('.submit').find('button').click(function(event) {
          var tagIds = [];
          $('.td_last').each(function(i, ele) {
            var tagId = $(this).attr('data-id');
            var checked = $(this).find('input').is(':checked');
            if (checked) {
              tagIds.push({tagId: tagId, remark: ''});
            }
          })
          signAccount(tagIds, thisAccount.orderNo, thisAccount.account);
        })

    })

  $('body').click(function() {
    $("#box").remove();
  })
}

// 标记
function signAccount(tagIds, orderNo, account) {
  $("#box").remove();
  if (tagIds.length === 0) {
    showMsg('error', '您什么都没标记！', 2000);
    return ;
  }
  var params = {
    orderNo: orderNo,
    account: account,
    ugcTags: tagIds
  }
  chrome.runtime.sendMessage({
    type: 'sign',
    from: 'seller',
    data: params
  })
}

// 获取单个订单信息，并更新被标记的订单
function signUpdateOk(data) {
  data = data[0];
  var tagList = tagLists;
  
  tagList = tagList.map(function(item) {
    return {tagId: item.id, tagName: item.name, count: 0};
  })

  var sellerTagStatisList = data.sellerTagStatisList;
  tagList = tagList.map(function(item_tag) {
    sellerTagStatisList.forEach(function(item_seller) {
      if (item_seller.tagId === item_tag.tagId) {
        item_tag = item_seller;
      }
    })
    return item_tag;
  })
  data.sellerTagStatisList = tagList;
  data.element = '';

  orderDetails.forEach(function(item_order) {
    if (data.orderNo === item_order.orderNo) {
      data.element = item_order.element;
    }
  })

  var danger = null;
  if (data.systemTagList && data.systemTagList.length > 0) {
    danger = `<i>${data.systemTagList[0].name}</i>: <i>100%</i>`;
  } else if (data.sellerTagCount) {
    danger = `被<i>${data.maxSellerTag.count}</i>个卖家标识为<i>${data.maxSellerTag.tagName}</i>`
  } else {
    danger = '未被标识'
  }

  $(data.element).find('.Keqi_show').unbind('click');
  $(data.element).find('.Keqi_show').remove();
  $(data.element)
    .find('.item-mod__checkbox-label___cRGUj')
    .after(`
      <a alt="查看用户标记详情" 
        class="Keqi_show"
        href="javascript: void(0)"
        data-id="${data.orderNo}">
        <img src="${logo}"/>
        ${danger}
      </a>
    `)
  var element = $(data.element).find('.Keqi_show');
  addModel([data], element)
}

function getOrderByApi(popupPageParams) {
  popupPageParams.queryMore = true;
  $.ajax({
    type: 'POST',
    url: 'https://trade.taobao.com/trade/itemlist/asyncSold.htm?event_submit_do_query=1&_input_charset=utf8&keqi=popup',
    data: popupPageParams,
    success: function(data, textStatus, jqXHR) {
      data = JSON.parse(data)
      var totalPage = data.page.totalPage;
      var mainOrders = data.mainOrders;
      var lists = [];
      mainOrders.forEach(function(item) {
        lists.push({ orderNo: item.id, account: item.buyer.nick})
      })
      
      chrome.runtime.sendMessage({
        type: 'paginationPreSeller',
        from: 'seller',
        data: lists,
        totalPage: totalPage,
        error: false,
        pre: false,
        next: false
      })

    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      chrome.runtime.sendMessage({
        type: 'paginationPreSeller',
        from: 'seller',
        error: true,
        pre: false,
        next: false
      })
    }
  })
}

function getOrderData(downloadNum, type) {
  var currentPage = $('.pagination-item-active').attr('title');
  currentPage = parseInt(currentPage) || 1;

  console.log(downloadNum)
  console.log(totalNumber)
  if (type === 'tiao') {
    if (totalNumber >= (downloadNum + (currentPage-1) * 15)) {
      getOrderDatas(downloadNum, currentPage, type, false)
    } else {
      getOrderDatas(totalNumber - (currentPage-1) * 15, currentPage, type, true)
    }
  } else {
    if (totalPage >= (downloadNum + currentPage - 1)) {
      getOrderDatas(downloadNum, currentPage, type, false)
    } else {
      getOrderDatas(totalPage - (currentPage-1), currentPage, type, true)
    }
  }
}

function getOrderDatas(downloadNum, currentPage, type, noEnough) {
  if (type === 'tiao' && noEnough) {
    showMsg('alert', '数量不够,当前共'+downloadNum+'条,下载中...', 5000)
  } else if (type === 'tiao' && !noEnough) {
    showMsg('alert', '数据下载中...,请等待', 5000)
  } else if (type === 'page' && noEnough) {
    showMsg('alert', '页数不够, 当前共'+downloadNum+'页,下载中...', 5000)
  } else if (type === 'page' && !noEnough) {
    showMsg('alert', '数据下载中...,请等待', 5000)
  }

  var lists = [];

  if (type === 'tiao') {
    var len = parseInt(downloadNum / 15);
    var ys = downloadNum % 15;
    for(var i = currentPage; i < currentPage + len; i++) {
      lists.push({page: i, size: 15})
    }
    if (ys > 0) {
      lists.push({page: len + currentPage, size: 15})
    }
  } else {
    for(var i = currentPage; i < currentPage + downloadNum; i++) {
      lists.push({page: i, size: 15})
    }
  }
  
  async.mapLimit(lists, 5, function(item, cb) {
    $.ajax({
      type: 'POST',
      url: 'https://trade.taobao.com/trade/itemlist/asyncSold.htm?event_submit_do_query=1&_input_charset=utf8&keqi=popup',
      data: {
        auctionType: 0,
        close: 0,
        pageNum: item.page,
        pageSize: item.size,
        queryMore: true,
        rxAuditFlag: 0,
        rxHasSendFlag: 0,
        rxOldFlag: 0,
        rxSendFlag: 0,
        rxSuccessflag: 0,
        tradeTag: 0,
        useCheckcode: false,
        useOrderInfo: false,
        errorCheckcode: false,
        action: "itemlist/SoldQueryAction",
        prePageNo: (item.page - 1)
      },
      success: function(data, textStatus, jqXHR) {
        data = JSON.parse(data)
        var totalPage = data.page.totalPage;
        var mainOrders = data.mainOrders;
        var myData = [];
        mainOrders.forEach(function(item) {
          myData.push({ orderNo: item.id, account: item.buyer.nick})
        })
        cb(null, myData);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        cb(errorThrown, []);
      }
    })
  }, function(err, result) {
    if (err) {
      $('#keqiDownload').removeAttr("disabled");
      showMsg('error', '数据获取失败，请稍后重试', 5000)
      return ;
    }
    var data = [];
    for(var i = 0; i < result.length; i++) {
      data = data.concat(result[i])
    }
    if (type === 'tiao') {
      data = data.splice(0, downloadNum)
    }
    getSellerDetails(data);
  })
}

function getSellerDetails(lists) {
  async.mapLimit(lists, 10, function(item, cb){
    $.ajax({
      type: 'GET',
      url: 'https://trade.taobao.com/trade/detail/trade_order_detail.htm?biz_order_id=' + item.orderNo,
      data: {},
      success: function(data, textStatus, jqXHR) {
        var jsonStart = data.indexOf('{\\"mainOrder\\"');
        var jsonStartTM = data.indexOf('{"ad":{"banner":');
        var params = {};
        if (jsonStart > 0) {
          var jsonEnd = data.indexOf('</script>', jsonStart) - 5;
          var json = data.substring(jsonStart, jsonEnd);
          json = json.replace(/\\"/g, '"');
          json = JSON.parse(json)
          var content = json.tabs[0].content;
          
          var street = content.address;
          var address  = street;
          address = address.split('，');
          var consignee = address[0];
          var phone = address[1];
          address = address[2].split(' ');
          var province = address[0];
          var city = address[1];
          var district = address[2].indexOf('区') > -1 ? address[2] : '';
          var district = '';
          if (address[2] && (typeof address[2].indexOf === 'function')) {
            district = address[2].indexOf('区') > -1 ? address[2] : '';
          }
          
          params = {
            street: unescape(street),
            consignee: unescape(consignee),
            phone: unescape(phone),
            province: unescape(province),
            city: unescape(city),
            district: unescape(district),
            account: unescape(item.account),
            orderNo: unescape(item.orderNo)
          }
        } else if (jsonStartTM > 0) {
          var jsonEnd = data.indexOf('</script>', jsonStartTM) - 2;
          var json = data.substring(jsonStartTM, jsonEnd);
          json = JSON.parse(json)
    
          var lists = json.basic.lists;
          var text = null;
          lists.forEach(function(it) {
            if (it.key === '收货地址') {
              text = it.content[0].text;
            }
          })
          var details = text.split(',');
          var consignee = details[0];
          var phone = details[1];
          
          details = details[2].split(' ');
          var province = details[0];
          var city = details[1];
          var district = '';
          if (details[2] && (typeof details[2].indexOf === 'function')) {
            district = details[2].indexOf('区') > -1 ? details[2] : '';
          }
          var street = '';
          details.forEach(function(it, index) {
            if (index > 2) {
              street += (it + ' ');
            }
          })
          
          params = {
            street: street,
            consignee: consignee,
            phone: phone,
            province: province,
            city: city,
            district: district,
            account: item.account,
            orderNo: item.orderNo
          }
        }
        cb(null, params)
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log('获取详情网页失败')
        cb(errorThrown, {})
      },
      dataType: 'html'
    });
  }, function(err, result) {
    if (err) {
      $('#keqiDownload').removeAttr("disabled");
      showMsg('error', '获取买家详情出错，请稍后重试', 5000)
      return ;
    }

    chrome.runtime.sendMessage({
      type: 'downloadSeller',
      from: 'seller',
      data: result
    })
  })
}

function getOrdersInit() {
  $.ajax({
    type: 'POST',
    url: 'https://trade.taobao.com/trade/itemlist/asyncSold.htm?event_submit_do_query=1&_input_charset=utf8&keqi=popup',
    data: {
      auctionType: 0,
      close: 0,
      pageNum: 1,
      pageSize: 15,
      queryMore: true,
      rxAuditFlag: 0,
      rxHasSendFlag: 0,
      rxOldFlag: 0,
      rxSendFlag: 0,
      rxSuccessflag: 0,
      tradeTag: 0,
      useCheckcode: false,
      useOrderInfo: false,
      errorCheckcode: false,
      action: "itemlist/SoldQueryAction",
      prePageNo: 2
    },
    success: function(data, textStatus, jqXHR) {
      // initDownloadElement()
      data = JSON.parse(data)
      totalPage = data.page.totalPage;
      totalNumber = data.page.totalNumber;

      chrome.runtime.sendMessage({
        type: 'sendPageMesg',
        from: 'seller',
        data: '',
        totalPage: totalPage,
        totalNumber: totalNumber
      })

    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      
    }
  })
}

function initDownloadElement() {
  $('.simple-pagination-mod__container___2bG5u').prepend(`
    <span class='mojingDownload'>
      下载数量：<input min='1' step='1' max='2000' id='downloadNum' type='number' />
      <select id="mojingSelect">
        <option value="tiao">条</option>
        <option value="page">页</option>
      </select>
      <button id='keqiDownload'>明镜台数据下载</button>
    </span>
  `)
  setTimeout(function() {
    $('#keqiDownload').click(function() {
      var downloadNum = $('#downloadNum').val();
      if (downloadNum === null || downloadNum === '' || parseInt(downloadNum, 10) <= 0) {
        showMsg('error', '下载数量应大于0', 3000)
      } else {
        downloadNum = parseInt(downloadNum);
        var type = $('#mojingSelect').val();
        $('#keqiDownload').attr('disabled',"true");
        getOrderData(downloadNum, type);
      }
    })
  }, 500)
}

var isSwap = false;
var pageX = 0;

document.addEventListener("mousedown", function(e){
  pageX = e.pageX;
  document.addEventListener("mousemove", onMouseMove);
});

document.addEventListener("mouseup", function(){
  isSwap = false
  pageX = 0;
  document.removeEventListener('mousemove', onMouseMove)
});

function onMouseMove(e){
  if (isSwap) return;
  var len = pageX - e.pageX;
  if (len > 100) {
    isSwap = true
    $('.button-mod__button___ci6-a.button-mod__default___iyi1-.button-mod__small___1ugIJ').each(function() {
      var text = $(this).text()
      if (text === '上一页') {
        $(this).trigger('click'); 
        if (!!$(this).attr('disabled')) showMsg('alert', '已经是第一页了')
      }
    })
  } else if (len < -100) {
    isSwap = true
    $('.button-mod__button___ci6-a.button-mod__default___iyi1-.button-mod__small___1ugIJ').each(function() {
      var text = $(this).text()
      if (text === '下一页') {
        $(this).trigger('click'); 
        if (!!$(this).attr('disabled')) showMsg('alert', '已经是最后一页了')
      }
    })
  } else {
    isSwap = false
  }
}

function showPageChangeClick() {
  $('body').append('<div class="Keqi_page_pre"><span></span></div>');
  $('body').append('<div class="Keqi_page_next"><span></span></div>');
  
  var keqiPageWidth = $('body').width();
  var keqiPageHeight = $('body').height();
  keqiPageWidth = +keqiPageWidth;
  keqiPageHeight = +keqiPageHeight;
  var pageMarginLeft = 110;
  var pageMarginRight = 0;
  if (keqiPageWidth > 1200) {
    pageMarginLeft = pageMarginLeft + ((keqiPageWidth - 1200) / 2);
    pageMarginRight = (keqiPageWidth - 1200) / 2;
    if (pageMarginRight > 40) {
      pageMarginRight -= 40;
    }
  } else {
    pageMarginRight = 0;
  }
  $('.Keqi_page_pre').css({left: pageMarginLeft})
  $('.Keqi_page_next').css({right: pageMarginRight})

  $('.Keqi_page_pre').click(function() {
    $('.button-mod__button___ci6-a.button-mod__default___iyi1-.button-mod__small___1ugIJ').each(function() {
      var text = $(this).text()
      if (text === '上一页') {
        $(this).trigger('click'); 
        if (!!$(this).attr('disabled')) showMsg('alert', '已经是第一页了')
      }
    })
  })

  $('.Keqi_page_next').click(function() {
    $('.button-mod__button___ci6-a.button-mod__default___iyi1-.button-mod__small___1ugIJ').each(function() {
      var text = $(this).text()
      if (text === '下一页') {
        $(this).trigger('click'); 
        if (!!$(this).attr('disabled')) showMsg('alert', '已经是最后一页了')
      }
    })
  })
}