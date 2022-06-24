var arrayImagesForLoad = ["grassTile1.png", "waterAngel3.png", "waterAngel2.png", "waterAngel1.png",
					"waterAngel4.png", "waterChannel1.png", "waterChannel2.png", "sandTile.png",
					"KyPolein.png", "arrowsPaintNet.png", "chestGif64.png", "skeletonArcher.png",
					"tower06.png", "box64.png", "gameover.png", "skeletonArcher2.png"];

var resourceImages = {
	get: function(x) {
		return resourceImages[x].src;
	}
};
var tempForResourse = arrayImagesForLoad.length;
arrayImagesForLoad.forEach(function(url) {
	//console.log(url);
	var img = new Image();
	img.onload = function() {
		resourceImages[url.substring(0, url.length - 4)] = img;
		tempForResourse -= 1;
	}
	img.src = url;
});

var grassTile1 = new Image();
grassTile1.src = "grassTile1.png";
var waterChannel1 = new Image();
waterChannel1.src = "waterChannel1.png";
var waterChannel2 = new Image();
waterChannel2.src = "waterChannel2.png";
var waterAngel4 = new Image();
waterAngel4.src = "waterAngel4.png";
var waterAngel3 = new Image();
waterAngel3.src = "waterAngel3.png";
var waterAngel2 = new Image();
waterAngel2.src = "waterAngel2.png";
var waterAngel1 = new Image();
waterAngel1.src = "waterAngel1.png";
var sandTile = new Image();
sandTile.src = "sandTile.png";
var KyPolein = new Image();
KyPolein.src = "KyPolein.png";
var arrowsPaintNet = new Image();
arrowsPaintNet.src = "arrowsPaintNet.png";
var chestGif64 = new Image();
chestGif64.src = "chestGif64.png";
var skeletonArcher = new Image();
skeletonArcher.src = "skeletonArcher.png";
var skeletonArcher2 = new Image();
skeletonArcher2.src = "skeletonArcher2.png";
var tower06 = new Image();
tower06.src = "tower06.png";
var box64 = new Image();
box64.src = "box64.png";
var gameover = new Image();
gameover.src = "gameover.png";

/*
(function() {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    // Load an image url or an array of image urls
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        }
        else {
            _load(urlOrArr);
        }
    }

    function _load(url) {
        if(resourceCache[url]) {
            return resourceCache[url];
        }
        else {
            var img = new Image();
            img.onload = function() {
                resourceCache[url] = img;

                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }

    function get(url) {
        return resourceCache[url];
    }

    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    function onReady(func) {
        readyCallbacks.push(func);
    }

    window.resources = { 
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();
*/