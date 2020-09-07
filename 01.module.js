!function(win){
  let config = {
    img: [''],
    to: 'https://play.daidaidj.com/index/main?channelId=24X9B0D72425',
    count: 2,
    sid: ''
  };
  let key = win.location.host.split('.')[1] + 'did-*',
      local_key = localStorage.getItem(key) || 0;
  if(local_key < config.count){
    localStorage.setItem(key, ++local_key);
    let oA = document.createElement('a'),
      oImg = document.createElement('img'),
      oSpan = document.createElement('span'),
      i = Math.floor(config.img.length * Math.random());
    oA.href = config.to;
    oA.setAttribute('target','blank_');
    oImg.src = config.img[i];
    oSpan.innerText = '关闭';
    let style_oA = {
      position: 'fixed',
      right: '10px',
      bottom: '10px',
      'z-index': 9999
    },style_oSpan = {
      position: 'absolute',
      right: '10px',
      top: '10px'
    };
    setStyle(oA, style_oA);
    setStyle(oSpan, style_oSpan);
    oSpan.onclick = function(ev){
      var ev = ev || win.event;
      document.body.firstElementChild.removeChild(oA);
      upload_(5);
      ev.preventDefault();
      ev.stopPropagation();
    };
    oA.onclick = function(ev){
      var ev = ev || win.event;
      ev.stopPropagation();
      upload_(4);
    };
    oImg.onmousedown = function (ev) {
      var ev = ev || win.event;
      ev.preventDefault();
    }
    oA.appendChild(oImg);
    oA.appendChild(oSpan);
    document.body.firstElementChild.appendChild(oA);
    upload_(3);
  }
  function setStyle(dom, styles){
    for(var key in styles){
      dom.style[key] = styles[key];
    }
  }
  function upload_(t) {//3,4,5
    let url = '//cclientreport2.minibai.com/tmp5log.json',
      data = {
        h: win.location.href,
        sid: config.sid,
        t
      };
    if(chrome.xb && chrome.xb.getSysInfo){
      chrome.xb.getSysInfo(function(s){
        data.s = s;
        ajax({
          type: 'post',
          url,
          data
        });
      });
    } else {
      ajax({
        type: 'post',
        url,
        data
      });
    }
  }
  
  function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || 'json';
    options.async = options.async || true;
    options.timeout = options.timeout || 100;
    var params = getParams(options.data),
      xhr, timeoutFlag = null;
    window.clearTimeout(timeoutFlag);
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
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
    if (options.type == 'GET') {
      xhr.open("GET", options.url + '?' + params, options.async);
      xhr.send(null)
    } else if (options.type == 'POST') {
      xhr.open('POST', options.url, options.async);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(params);
    }
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