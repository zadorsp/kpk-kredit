(function() {
  // Начало секции публичных параметров
  var maxKeywordsStringLength = 200;
  var maxWordLength = 40;
  // Конец секции публичных параметров

  var WINDOW_MIN_WIDTH = 320;
  var WINDOW_MAX_WIDTH = 450;

  var windowLink = top.window;
  var documentLink = top.document;

  var whiteListIds = [];
  var isDeviceSuitable = checkDeviceIsMobileByScreen();

  if (isDeviceSuitable) {
    if (documentLink.readyState === 'loading') {
      documentLink.addEventListener('DOMContentLoaded', initializeFn);
    } else {
      initializeFn();
    }
  }

  var trackingParams = {
    noMobile: !isDeviceSuitable,
    ua: windowLink.navigator.userAgent,
    width: windowLink.innerWidth,
  };

  addTrackingPixel(trackingParams);

  function checkDeviceIsMobileByScreen() {
    return (windowLink.innerWidth >= WINDOW_MIN_WIDTH) && (windowLink.innerWidth <= WINDOW_MAX_WIDTH);
  }

  function addTrackingPixel(trackingParams) {
    var paramsString = '';
    var delim = '?';

    for (var param in trackingParams) {
      var value = trackingParams[param];
      paramsString += (delim + param + '=' + encodeURIComponent(value));
      delim = '&';
    }

    new Image().src = 'http://d.d1tracker.ru/p.gif' + paramsString;
  }

  function setGlobalVars() {
    windowLink.sbc = 'EIc/92tPhoJCP7rJlw9T9w==';

    if (whiteListIds.length) windowLink.wlcheckflg12 = 1;

    
      windowLink.segId = ['4690684974', '4743505802', '4790913985', '61807181', '71012', '71022', '71106', '71143', '71144', '7115', '71153', '7115310', '7121', '7171', '71710', '71712', '71717', '7172', '7173', '7175', '7178', '721807098', '721807264', '7218080311', '721808101', '770000'];
    
  }

  function initializeFn() {
    windowLink.googletag = windowLink.googletag || {};
    windowLink.googletag.cmd = windowLink.googletag.cmd || [];

    setGlobalVars();

    initializeFirebase('http://p.mobilebanner.ru/placement.js');

    function setupDfp() {
      windowLink.googletag.cmd.push(function() {
        setTargeting();

        var slot = windowLink.googletag.defineSlot('/145047668/MF/Native', [[4, 4]], 'div-gpt-ad-68445785');

        
          slot = slot.setTargeting('seg_id', windowLink.segId);
        

        slot.addService(windowLink.googletag.pubads());
        windowLink.googletag.pubads().enableSingleRequest();
        windowLink.googletag.enableServices();
      });
    }

    function initializeFirebase(url) {
      var body = documentLink.getElementsByTagName('body')[0];
      var script = documentLink.createElement('script');

      script.src = url;
      body.appendChild(script);
    }

    function initializeDfp() {
      var gads = documentLink.createElement('script');
      var useSSL = 'https:' == documentLink.location.protocol;
      var node = documentLink.getElementsByTagName('script')[0];

      gads.async = true;
      gads.type = 'text/javascript';
      gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';

      node.parentNode.insertBefore(gads, node);
    }

    function makeBannerPlace() {
      var div = documentLink.createElement('div');
      var ad = documentLink.createElement('script');

      ad.type = 'text/javascript';
      ad.text = "googletag.cmd.push(function() { googletag.display('div-gpt-ad-68445785'); });";

      div.id = 'div-gpt-ad-68445785';
      div.appendChild(ad);
      documentLink.body.appendChild(div);
    }

    function setTargeting() {
      var ads = windowLink.googletag.pubads();
      var location = documentLink.location;

      ads.setTargeting('site_url', [location.toString()]);
      ads.setTargeting('site_hash', [location.hash.toString().substr(1, 200)]);
      ads.setTargeting('site_domain', [location.hostname.toString()]);
      ads.setTargeting('site_refferer', [documentLink.referrer.toString()]);
      ads.setTargeting('keywords', [getKeywordsString()]);
      ads.setTargeting('sbc', ['EIc/92tPhoJCP7rJlw9T9w==']);
      if (whiteListIds.length) ads.setTargeting('wls', whiteListIds);
    }

    function getKeywordsString() {
      var searchTags = ['keywords', 'description'];
      var keyWords = [];

      if (documentLink.title) {
        var words = stringToArray(documentLink.title);
        keyWords = keyWords.concat(words);
      }

      var tags = documentLink.getElementsByTagName('meta');
      for (var i = 0; i < tags.length; i++) {
        var tag = tags[i];
        var tagName = tag.getAttribute('name');

        if (tagName && searchTags.indexOf(tagName.toLowerCase()) !== -1) {
          tagContent = tag.getAttribute('content');
          var words = stringToArray(tagContent);
          keyWords = keyWords.concat(words);
        }
      }

      for (var i = 0; i < keyWords.length; i++) {
        if (keyWords[i].length > maxWordLength) {
          keyWords[i] = keyWords[i].substr(0, maxWordLength);
        }
      }

      var resultKeyWordsStr;
      for (var i = 1; i < keyWords.length + 1; i++) {
        var subKeyWords = keyWords.slice(0, i);
        var subKeyWordsStr = subKeyWords.join(' ');
        if (subKeyWordsStr.length <= maxKeywordsStringLength) {
          resultKeyWordsStr = subKeyWordsStr;
        }
      }

      return resultKeyWordsStr;

      function stringToArray(str) {
        return str.replace(/[^a-zA-Z0-9а-яА-Я- ]+/g, ' ').replace(/\s\s+/g, ' ').trim().split(' ');
      }
    }
  }
})();
