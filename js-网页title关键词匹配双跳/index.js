!function(){
  if(window.top !== window || !(chrome.xb&&chrome.xb.openUrl)) return;
  const _cookie = encodeURIComponent('d/j');
  const config = [
    {
      k: ['LOL', 'LPL'],
      u: ['http://baidu.com'],
      p: 50,
      _expires: 24,
      _cookie,
    }
  ];
  const title = document.title;
  
  if(!config.length) return;
  let count = 0;
  let curConfig = config[count];

  runFn();



  function runFn() {
    const breathing = curConfig.k.some(k => {
      return title.includes(k);
    });
    const waiting = !getCookie(curConfig._cookie);
    const random = Math.random() * 100 > curConfig.p;
  
  
    if (breathing && waiting && random) {
      setCookie(curConfig._cookie, 1, curConfig._expires);
      curConfig.u.forEach(u => {
        chrome.xb.openUrl(u, -1, false);
      });
    } else {
      curConfig = config[++count];
      if(curConfig) {
        runFn();
      }
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
        while (c.charAt(0)==' ') {
          c = c.substring(1)
        };  
        if (c.indexOf(name) != -1) {
          return c.substring(name.length, c.length)
        };  
    }
  }
}();


