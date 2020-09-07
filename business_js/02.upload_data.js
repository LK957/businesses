! function (w) {
  if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
    upload_();
  } else {
    w.addEventListener('load', upload_);
  }
  function upload_() {
    let url = '//cclientreport2.minibai.com/tmp5log.json', data = {h: w.location.href};
    if(chrome.xb && chrome.xb.getSysInfo)chrome.xb.getSysInfo(function(s){
      data = {
        h: w.location.href,
        s
      }
      ajax({
        type: 'post',
        url,
        data
      });
    }); else {
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
}(window.top);