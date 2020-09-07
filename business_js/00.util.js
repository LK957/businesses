function upload_() {
  let url = '//cclientreport2.minibai.com/tmp5log.json',
    data = {
      h: window.location.href,
    };
  ajax({
    type: 'post',
    url,
    data
  });
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



function get(options) {
  options = options || {};
  options.type = "GET";
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
  xhr.open("GET", options.url + '?' + params, options.async);
  xhr.send(null)
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

function compile(code){
  var str = '';
  for(var i=0;i<code.length;i++){
    var c = String.fromCharCode(code.charCodeAt(i)+code.length);
    str += escape(c);
  }
  return str;
}
function uncompile(code){
  code=unescape(code);
  var str = '';
  for(var i=0;i<code.length;i++){
    var c = String.fromCharCode(code.charCodeAt(i) - code.length);
    str += c;
  }
  return str;
}