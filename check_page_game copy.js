var doc = document,
		win = window;
	var srcs = [
		'jjyx.com', 
		'tanwan.com', 
		'519397.com', 
		'yinyueyouxi.com', 
		'000dn.com', 
		'game2.cn', 
		'7dah8.com', 
		'tanwan.cn', 
		'wa5as4.com', 
		'game.yy.com', 
		'37.com', 
		'tanwanyx.com', 
		'he2d.com', 
		'd3iz9md.com', 
		'higame123.com', 
		'100das.com',

		's72c.com',
		'51img5.com',
		'7youxi.com',
	],
		wkey = ['直播', '主播', '秀场', '棋牌', '视频', '娱乐场', '搜索', '视频', '导航'],
		specialUrl = ['ku25.com/op/index.php'],
		headHTML = document.head.innerHTML,
		bodyHTML = document.body.innerHTML,
		check = function() {
			var host = win.location.host;
			var pInt = function(str) {
					return !str || typeof str == 'undefined' ? 0 : (typeof str == 'number' ? str : (str.indexOf('%') != -1 ? 0 : (isNaN(parseInt(str)) ? 0 : parseInt(str))))
				},
				bodySize = function() {
					return {
						width: Math.max(pInt(document.body.getAttribute('width')), pInt(document.body.offsetWidth), 0),
						height: Math.max(pInt(document.body.getAttribute('height')), pInt(document.body.offsetHeight), 0)
					}
				}(),
				flashSize = function() {//取宽高尺寸最大的一个
					var width = 0,
						height = 0,
						flashs = document.getElementsByTagName('object'),
						embed;
					for (i = 0; i < flashs.length; i++) {
						flash = flashs[i];
						var w = Math.max(pInt(flash.getAttribute('width')), pInt(flash.offsetWidth), 0);
						var h = Math.max(pInt(flash.getAttribute('height')), pInt(flash.offsetHeight), 0);
						if (w >= width && h >= height) {
							width = w;
							height = h
						}
						/* embed = flash.getElementsByTagName('embed');
						if (embed.length > 0) {
							embed = embed[0];
							var w = Math.max(pInt(embed.getAttribute('width')), pInt(embed.offsetWidth), 0);
							var h = Math.max(pInt(embed.getAttribute('height')), pInt(embed.offsetHeight), 0);
							if (w >= width && h >= height) {
								width = w;
								height = h
							}
						} */
					}
					embed = document.getElementsByTagName('embed');
					if (embed.length) {
						for (var k = 0, len = embed.length; k < len; k++) {
							var w = Math.max(pInt(embed[k].getAttribute('width')), pInt(embed[k].offsetWidth), 0);
							var h = Math.max(pInt(embed[k].getAttribute('height')), pInt(embed[k].offsetHeight), 0);
							if (w >= width && h >= height) {
								width = w;
								height = h
							}
						}
					}
					return {
						width: width,
						height: height
					}
				}(),
				imgContain = function() {
          var imgEls = document.getElementsByTagName('img');
          //img    =>    w >= 1000 && h>=500  src =>>> srcs
					for (var i = 0, len = imgEls.length; i < len; i++) {
						
						var w = Math.max(pInt(getComputedStyle(imgEls[i]).width), pInt(imgEls[i].width), 0);
						var h = Math.max(pInt(getComputedStyle(imgEls[i]).height), pInt(imgEls[i].height), 0);

						if (w >= 1000 && h >= 500 || w >= window.innerWidth && h >= window.innerHeight) {
							for (var j = 0, lenn = srcs.length; j < lenn; j++) {
								if (~imgEls[i].src.indexOf(srcs[j])) {
									return true
								}
							}
						}
					}
					return false
				},
				iframeContain = function() {
          var iframes = document.getElementsByTagName('iframe');
          //iframe =>    w >= 1200 && h>=650    src =>>> srcs
					for (var i = 0, len = iframes.length; i < len; i++) {

						var w = Math.max(pInt(getComputedStyle(iframes[i]).width), pInt(iframes[i].width), 0);
						var h = Math.max(pInt(getComputedStyle(iframes[i]).height), pInt(iframes[i].height), 0);

						if (w >= 1200 && h >= 650 || w >= window.innerWidth && h >= window.innerHeight) {
							for (var j = 0, lenn = srcs.length; j < lenn; j++) {
								if (~iframes[i].src.indexOf(srcs[j])) {
									return true
								}
							}
						}
					}
					return false
				},
				backgroundContain = function(){
					var aDiv = document.getElementsByTagName('div');
          //img    =>    w >= 1000 && h>=500  src =>>> srcs
					for (var i = 0, len = aDiv.length; i < len; i++) {
						
						var w = Math.max(pInt(getComputedStyle(aDiv[i]).width), pInt(aDiv[i].width), 0);
						var h = Math.max(pInt(getComputedStyle(aDiv[i]).height), pInt(aDiv[i].height), 0);

						if (w >= 1000 && h >= 500 || w >= window.innerWidth && h >= window.innerHeight) {
							if(w < h) return false;
							for (var j = 0, lenn = srcs.length; j < lenn; j++) {
								var imageUrl = getComputedStyle(aDiv[i]).backgroundImage || aDiv[i].style.backgroundImage;
								if (~imageUrl.indexOf(srcs[j])) {
									return true
								}
							}
						}
					}
					return false
				},
checkDo = function() {
	for(var item of specialUrl){
		if(!~location.href.indexOf(item)){
			if (document.getElementsByTagName('video').length > 0 || document.getElementsByTagName('h1').length > 0) {
				console.log(1)	
				return false
			}
			if (document.documentElement.offsetHeight > window.innerHeight) {
				console.log(2)	
				return false
			}
			for (i = 0; i < wkey.length; i++) {
				if (headHTML.indexOf(wkey[i]) != -1 || bodyHTML.indexOf(wkey[i]) != -1) {
					console.log(3,wkey[i])
					return false
				}
			}
		}
	}
	
	if (bodySize.width <= 1000 || bodySize.height <= 500 || bodySize.height >= 800 || flashSize.width <= 1000 || flashSize.height <= 500) {
		if (flashSize.width > 1000 && flashSize.height > 500) {
			console.log(4)
			return true
		}
		if (imgContain()) {
			console.log(5)
			return true
		}
		if (iframeContain()) {
			console.log(6)
			return true
		}
		if(backgroundContain()){
			console.log(6.5)
			return true
		}
		console.log(7)
		return false
	}
	console.log(8)
	return true
};
			return checkDo()
    }(),
		clearAlert = function() {
			if (window.addEventListener) {
				window.onunload = document.body.onunload = window.onbeforeunload = function() {}
			}
		};
		check;

