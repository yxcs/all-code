console.log('run background.js')

const VERSION = 2.16;

const baseUrl ='http://restapi.wanxiangfuwu.com/restapi';
// const baseUrl ='http://10.8.85.2';
const API_TAGLIST_SYS = '/tag/system/searchList';        // 获取系统标签
const API_TAGLIST_SELLER = '/tag/seller/searchList';     // 获取卖家标签
const API_MAGIC_POST = '/magic/sellerUgc';               // 明镜台卖家UGC回传
const API_MAGIC_SEARCH = '/magic/searchResultList';      // 查询明镜台值
const API_POLLING_INFO = '/h5/polling/infoList';         // 获取轮询显示信息
const API_IS_LOGIN = '/uc/checkUserInfo';                // 检测是否登陆
const API_LOGIN = '/uc/login';                           // 卖家登陆
const API_CHECK_VERSION = '/chrome/checkVersion'         // 检测插件版本
const API_LOGOUT = '/uc/logout'                          // 退出
const API_EXPORT_RESULT= '/magic/exportResultList'       // 导出标记详情       

var messageLoading = false;
var orderLoading = false;
var loginLoading = false;

var pageUrl = ''                                         // 当前页面的url

var popupPageParams = {                                  // 翻页参数, 数据下载参数
  auctionType: 0,
  close: 0,
  pageNum: 1,
  pageSize: 15,
  queryMore: false,
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
  prePageNo: 0
}
     
var totalPage = 2;                      // 订单总数量

var signLists = []                                // 被标记的列表

chrome.runtime.onMessage.addListener(function(message) {
  console.log(message);

  if (message.type === 'page') {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: 'page'}, function(response) {});
    });
  }

  if (message.type === 'pageUrl') {
    chrome.runtime.sendMessage({
      type: 'pageUrlPopup',
      data: message.data
    })
  }

  if (message.type === 'checkVersion') {
    checkVersion(message.from)
  }

  if (message.type === 'checkLogin') {
    isLogin(message.from)
  }

  if (message.type === 'fetchPolling') {
   fetchPolling(message.data, message.from)
  }

  if (message.type === 'login') {
    login(message.data, message.from)
  }

  if (message.type === 'buyersDetails') {
    getBuyersDetails(message.data, message.from)
  }

  if (message.type === 'tagLists') {
    getTagLists(message.from)
  }

  if (message.type === 'sign') {
    if (message.from === 'popup') {
      signAccount(message.data, message.from)
    } else {
      getBuyerDetail(message.data, message.from)
    }
  }

  if (message.type === 'signOrder') {
    getSignOrder(message.data, message.from)
  }

  if(message.type === 'getSellerName') {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: 'sellerName'}, function(response) {});
    });
  }

  if (message.type === 'sellerNameSeller') {
    chrome.runtime.sendMessage({
      type: 'sellerNamePopup',
      data: message.data
    })
  }

  if (message.type === 'getBuyersPopup') {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: 'getBuyers'}, function(response) {});
    });
  }

  if (message.type === 'getBuyersSeller') {
    getBuyersDetails(message.data, 'popup')
  }

  if (message.type === 'logout') {
    logout(message.from);
  }

  if (message.type === 'paginationPre') {
    if (parseInt(popupPageParams.pageNum) === 1) {
      chrome.runtime.sendMessage({
        type: 'paginationBack',
        data: {status: 1, data: []},
        error: false,
        pre: true,
        next: false,
        params: [],
        text: ''
      })
    } else {
      popupPageParams.pageNum = parseInt(popupPageParams.pageNum) - 1;
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: 'paginationPrePopup', data: popupPageParams}, function(response) {});
      });
    }
  }

  if (message.type === 'paginationNext') {
    if (parseInt(popupPageParams.pageNum) === parseInt(totalPage)) {
      chrome.runtime.sendMessage({
        type: 'paginationBack',
        data: {status: 1, data: []},
        error: false,
        pre: false,
        next: true,
        params: [],
        text: ''
      })
    } else {
      popupPageParams.pageNum = parseInt(popupPageParams.pageNum) + 1;
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: 'paginationPrePopup', data: popupPageParams}, function(response) {});
      });
    }
  }

  if (message.type === 'goToPage') {
    if (parseInt(message.data) > parseInt(totalPage)) {
      chrome.runtime.sendMessage({
        type: 'paginationBack',
        data: {status: 1, data: []},
        error: true,
        pre: false,
        next: true,
        params: [],
        text: '输入页数，超过现有页数!'
      })
    } else {
      popupPageParams.pageNum = parseInt(message.data);
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: 'paginationPrePopup', data: popupPageParams}, function(response) {});
      });
      chrome.runtime.sendMessage({
        type: 'currentPage2Popup',
        data: popupPageParams.pageNum
      })
    }
  }

  if (message.type === 'paginationPreSeller') {
    totalPage = parseInt(message.totalPage);
    if (message.error) {
      chrome.runtime.sendMessage({
        type: 'paginationBack',
        data: {status: 1, data: []},
        error: true,
        pre: false,
        next: false,
        params: [],
        text: ''
      })
    } else {
      getBuyersDetailsPage(message.data)
    }
  }

  if (message.type === 'downloadSeller') {
    downloadSeller(message.data, message.from)
  }

  if (message.type === 'currentPage') {
    if (message.status === 'init') {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: 'currentPage2Selller', data: ''}, function(response) {});
      });
    } else {
      chrome.runtime.sendMessage({
        type: 'currentPage2Popup',
        data: popupPageParams.pageNum
      })
    }
  }

  if (message.type === 'currentPageSelller') {
    popupPageParams.pageNum = message.data || 1;
    chrome.runtime.sendMessage({
      type: 'currentPage2Popup',
      data: message.data
    })
  }

  if (message.type === 'sendPageMesg') {
    totalPage = message.totalPage
  }

  if (message.type === 'signGoPage') {
    if (signLists.length <= 15) {
      if (message.pageFrom === 'go') return;
      chrome.runtime.sendMessage({
        type: 'signBackPage',
        data: [],
        pageTo: message.pageFrom,
        error: true,
        page: message.data,
        length: signLists.length
      })
    } else {
      var len = Math.ceil(signLists.length / 15);
      if (len >= message.data && message.data >= 1) {
        var backData = signLists.slice(15 * (message.data - 1), 15 * message.data)
        chrome.runtime.sendMessage({
          type: 'signBackPage',
          data: backData,
          pageTo: message.pageFrom,
          error: false,
          page: message.data,
          length: signLists.length
        })
      } else {
        chrome.runtime.sendMessage({
          type: 'signBackPage',
          data: [],
          pageTo: message.pageFrom,
          error: true,
          page: message.data,
          length: signLists.length
        })
      }

    }

  }

})


// 检测插件是否要求升级
function checkVersion(type) {
  $.ajax({
    type: 'POST',
    contentType: "application/json; charset=utf-8",
    url: baseUrl + API_CHECK_VERSION,
    data: JSON.stringify({ version: VERSION }),
    success: function(data, textStatus, jqXHR) {

      if (type === 'popup') {
        chrome.runtime.sendMessage({
          type: 'versionStatusPopup',
          data: data,
          version: VERSION
        })
      } else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {type: 'versionStatus', data: data, version: VERSION}, function(response) { });
        });
      }

    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log('--------------------')
    },
    dataType: 'json'
  })
}

// 检测是否登陆
function isLogin(type) {
  $.ajax({
    type: 'POST',
    url: baseUrl + API_IS_LOGIN,
    data: {},
    success: function(data, textStatus, jqXHR) {
      if (type === 'popup') {
        chrome.runtime.sendMessage({
          type: 'loginCheck',
          data: data,
          loginType: 'check'
        })
      } else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {type: 'loginSeller', data: data, loginType: 'check'}, function(response) {});
        });
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log('--------------------')
    },
    dataType: 'json'
  })
}

// 获取滚动信息
function fetchPolling(loginData, type) {
  if (messageLoading) return
    messageLoading = true;
  $.ajax({
    type: 'POST',
    url: baseUrl + API_POLLING_INFO,
    data: {},
    success: function(data, textStatus, jqXHR) {
      if (type === 'popup') {
        chrome.runtime.sendMessage({
          type: 'polilingPopup',
          data: data
        })
      } else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          setTimeout(function() {
            chrome.tabs.sendMessage(tabs[0].id, {type: 'polling', data: data, loginData: loginData}, function(response) { });
          }, 300)
        });
      }
      messageLoading = false;
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log('获取信息失败')
      messageLoading = false;
    },
    dataType: 'json'
  });
}

// 登陆
function login(params, type) {
  if (loginLoading) return;
  loginLoading = true;
  $.ajax({
    type: 'POST',
    url: baseUrl + API_LOGIN,
    data: params,
    success: function(data, textStatus, jqXHR) {
      if (type === 'popup') {
        // 通知popup登陆成功
        chrome.runtime.sendMessage({
          type: 'loginPopup',
          data: data,
          loginType: 'login'
        })
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {type: 'reload4Login', data: data}, function(response) {});
        });
      } else {
        // 通知卖家页面登陆成功
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {type: 'loginSeller', data: data, loginType: 'login'}, function(response) {});
        });
      }
      loginLoading = false;
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log('登陆失败');
      loginLoading = false;
    },
    dataType: 'json'
  });
}

// 获取订单标记详情
function getBuyersDetails(paramsData, type) {
  if (orderLoading) return;
  orderLoading = true;
  var params = { searchInfo:[], searchRange: 'ALL' };
  
  paramsData.forEach(function(item) {
    params.searchInfo.push(item);
  })
  $.ajax({
    type: 'POST',
    contentType: "application/json; charset=utf-8",
    url: baseUrl + API_MAGIC_SEARCH ,
    data: JSON.stringify(params),
    success: function(data, textStatus, jqXHR) {
      if (data.data.length) {
        var lists = data.data;
        lists = lists.filter(function(item) {
          var flag = true;
          signLists.forEach(function(item1) {
            if (item.orderNo === item1.orderNo) flag = false
          })
          return flag;
        })
        signLists = signLists.concat(lists)
      }
      if (type === 'popup') {
        data.data = signLists.slice(0, 15);
        chrome.runtime.sendMessage({
          type: 'orderListsPopup',
          data: data,
          params: paramsData,
          length: signLists.length
        })
      } else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          setTimeout(function() {
            chrome.tabs.sendMessage(tabs[0].id, {type: 'orderLists', data: data}, function(response) { });
          }, 0)
        });
      }
      orderLoading = false;
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log('获取订单信息失败');
      orderLoading = false;
    },
    dataType: 'json'
  });
}

// 获取卖家标签
function getTagLists(type) {
  $.ajax({
    type: 'POST',
    url: baseUrl + API_TAGLIST_SELLER ,
    data: {},
    success: function(data, textStatus, jqXHR) {
      if (type === 'popup') {
        chrome.runtime.sendMessage({
          type: 'tagsPopup',
          data: data
        })
      } else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          setTimeout(function() {
            chrome.tabs.sendMessage(tabs[0].id, {type: 'tags', data: data}, function(response) {});
          }, 0)
        });
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log('获取卖家标签失败');
    },
    dataType: 'json'
  });
}

// 标记
function signAccount(params, type) {
  $.ajax({
    type: 'POST',
    contentType: "application/json; charset=utf-8",
    url: baseUrl + API_MAGIC_POST,
    data: JSON.stringify(params),
    success: function(data, textStatus, jqXHR) {
      if (type === 'popup') {
        chrome.runtime.sendMessage({
          type: 'signOKPopup',
          data: data,
          params: params
        })
      } else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {type: 'signOK', data: data, params: params}, function(response) { });
        });
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log('卖家页面--标记出错');
    },
    dataType: 'json'
  });
}

// 获取打个订单的详情，用于更新标记
function getSignOrder(paramsData, type) {
  var params = { searchInfo:[paramsData], searchRange: 'ALL' };

  $.ajax({
    type: 'POST',
    contentType: "application/json; charset=utf-8",
    url: baseUrl + API_MAGIC_SEARCH ,
    data: JSON.stringify(params),
    success: function(data, textStatus, jqXHR) {
      if (type === 'popup') {
        chrome.runtime.sendMessage({
          type: 'signUpdatePopup',
          data: data
        })
      } else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          setTimeout(function() {
            chrome.tabs.sendMessage(tabs[0].id, {type: 'signUpdate', data: data}, function(response) { });
          }, 0)
        });
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log('获取单个订单信息失败');
    },
    dataType: 'json'
  });
}

// 获取买家详细信息
function getBuyerDetail(paramsData, type) {
  $.ajax({
    type: 'GET',
    url: 'https://trade.taobao.com/trade/detail/trade_order_detail.htm?biz_order_id=' + paramsData.orderNo,
    data: {},
    success: function(data, textStatus, jqXHR) {
      var jsonStart = data.indexOf('{\\"mainOrder\\"');
      var jsonStartTM = data.indexOf('{"ad":{"banner":');
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
        
        var params = {
          street: unescape(street),
          consignee: unescape(consignee),
          phone: unescape(phone),
          province: unescape(province),
          city: unescape(city),
          district: unescape(district),
          account: unescape(item.account),
          orderNo: unescape(item.orderNo)
        }
        buyerDetails.push(params);
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
        
        var params = {
          street: street,
          consignee: consignee,
          phone: phone,
          province: province,
          city: city,
          district: district,
          account: paramsData.account,
          orderNo: paramsData.orderNo,
          ugcTags: paramsData.ugcTags
        }

        signAccount(params, type);
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log('获取详情网页失败')
    },
    dataType: 'html'
  });
}

function logout(type) {
  $.ajax({
    type: 'POST',
    url: baseUrl + API_LOGOUT,
    data: {},
    success: function(data, textStatus, jqXHR) {
      chrome.runtime.sendMessage({
        type: 'popupLogout',
        data: data
      })
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        setTimeout(function() {
          chrome.tabs.sendMessage(tabs[0].id, {type: 'sellerLogout', data: data, from: type}, function(response) { });
        }, 0)
      });
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log('退出失败');
    },
    dataType: 'json'
  });
}

// 获取订单标记详情，根据
function getBuyersDetailsPage(paramsData) {
  if (orderLoading) return;
  orderLoading = true;
  var params = { searchInfo:[], searchRange: 'ALL' };
  
  paramsData.forEach(function(item) {
    params.searchInfo.push(item);
  })
  $.ajax({
    type: 'POST',
    contentType: "application/json; charset=utf-8",
    url: baseUrl + API_MAGIC_SEARCH ,
    data: JSON.stringify(params),
    success: function(data, textStatus, jqXHR) {
      chrome.runtime.sendMessage({
        type: 'paginationBack',
        data: data,
        error: false,
        pre: false,
        next: false,
        params: paramsData,
        text: ''
      })
      orderLoading = false;
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log('获取订单信息失败');
      chrome.runtime.sendMessage({
        type: 'paginationBack',
        data: [],
        error: true,
        pre: false,
        next: false,
        params: paramsData,
        text: ''
      })
      orderLoading = false;
    },
    dataType: 'json'
  });
}

// 下载数据
function downloadSeller(paramsData, type) {
  var params = { searchInfo:[] };
  
  paramsData.forEach(function(item) {
    params.searchInfo.push(item);
  })

  params = parseParam(params)
  params = params+'&searchRange=SYSTEM'
  chrome.downloads.download({
    url: baseUrl + API_EXPORT_RESULT,
    headers: [
      {name: 'Content-Type', value: 'application/x-www-form-urlencoded'}
    ],
    filename: '明镜台风险分析.xls',
    method: 'POST',
    body: params
  }, function(id) {
    setTimeout(function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: 'downloadFinish', data: ''}, function(response) {});
      });
    }, 0)
  })
}

  // 用于记录每次请求的参数，便于popup翻页
chrome.webRequest.onBeforeRequest.addListener(function(details) {
  if (details.requestBody && details.requestBody.formData) {
    var params = details.requestBody.formData;
    for (var key in params){
      popupPageParams[key] = params[key][0]
    }
  }
},
{
  urls: [
    "https://trade.taobao.com/trade/itemlist/asyncSold.htm*", 
    "http://trade.taobao.com/trade/itemlist/asyncSold.htm*", 
  ]
},
["blocking", "requestBody"])

// 分页，搜索，tabs切换，checkbox状态切换
chrome.webRequest.onCompleted.addListener(function(details) {
    if (details.url.indexOf('https://trade.taobao.com/trade/itemlist/asyncSold.htm?event_submit_do_query=1') > -1
        && details.url.indexOf('keqi=popup') === -1) {
      chrome.tabs.sendMessage(details.tabId, {type: 'updateDataOrder', data: ''}, function(response) {});
    }
  },
  {
    urls: [
      "https://trade.taobao.com/trade/itemlist/asyncSold.htm*", 
      "http://trade.taobao.com/trade/itemlist/asyncSold.htm*", 
    ]
  },
  ["responseHeaders"])

function parseParam(param, key) {
    var paramStr = "";
    if (param instanceof String || param instanceof Number || param instanceof Boolean) {
        paramStr += "&" + key + "=" + encodeURIComponent(param);
    } else {
        $.each(param, function(i) {
            var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
            paramStr += '&' + parseParam(this, k);
        });
    }
    return paramStr.substr(1);
};