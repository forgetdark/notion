javascript:(function(){
  var $loader = (function () {
    var loaderStyle = document.createElement('style');
    loaderStyle.id = 'loader-style';
    loaderStyle.innerHTML = `.loader-overlay {
      visibility: hidden;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999999;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
    }
    .loader-model {
      visibility: hidden;
      position: relative;
      width: 2.5em;
      height: 2.5em;
      transform: rotate(165deg);
      z-index: 99999999;
    }
    .loader-model:before,
    .loader-model:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      width: 0.5em;
      height: 0.5em;
      border-radius: 50px;
      transform: translate(-50%, -50%);
    }
    .loader-model:before {
      animation: before 2s infinite;
    }
    .loader-model:after {
      animation: after 2s infinite;
    }
    @keyframes before {
      0% {
        width: 0.5em;
        box-shadow:
          1em -0.5em rgb(255, 238, 170),
          -1em 0.5em rgb(204, 170, 136);
      }
      35% {
        width: 2.5em;
        box-shadow:
          0 -0.5em rgb(255, 238, 170),
          0 0.5em rgb(204, 170, 136);
      }
      70% {
        width: 0.5em;
        box-shadow:
          -1em -0.5em rgb(255, 238, 170),
          1em 0.5em rgb(204, 170, 136);
      }
      100% {
        box-shadow:
          1em -0.5em rgb(255, 238, 170),
          -1em 0.5em rgb(204, 170, 136);
      }
    }
    @keyframes after {
      0% {
        height: 0.5em;
        box-shadow:
          0.5em 1em rgb(136, 136, 204),
          -0.5em -1em rgb(255, 136, 187);
      }
      35% {
        height: 2.5em;
        box-shadow:
          0.5em 0 rgb(136, 136, 204),
          -0.5em 0 rgb(255, 136, 187);
      }
      70% {
        height: 0.5em;
        box-shadow:
          0.5em -1em rgb(136, 136, 204),
          -0.5em 1em rgb(255, 136, 187);
      }
      100% {
        box-shadow:
          0.5em 1em rgb(136, 136, 204),
          -0.5em -1em rgb(255, 136, 187);
      }
    }
    .loader-model {
      position: fixed;
      top: calc(50% - 2.5em / 2);
      left: calc(50% - 2.5em / 2);
    }`;
    var loaderOverlay = document.createElement('div');
    loaderOverlay.classList.add('loader-overlay');
    var loaderModel = document.createElement('div');
    loaderModel.classList.add('loader-model');
    return {
      show: function () {
        document.body.appendChild(loaderStyle);
        document.body.appendChild(loaderOverlay);
        document.body.appendChild(loaderModel);
        document.querySelector('.loader-overlay').style.visibility = 'visible';
        document.querySelector('.loader-model').style.visibility = 'visible';
      },
      hide: function () {
        document.getElementById('loader-style').remove();
        document.querySelector('.loader-overlay').remove();
        document.querySelector('.loader-model').remove();
      }
    };
  })();
  var id = location.href.split('?id=')[1];
  var elementList = {
    'author': '.sc-fujyAs',
    'date': '.sc-5981ly-0',
    'cover': {
      'link': '.sc-1u8nu73-18',
      'img': '.sc-1u8nu73-19'
    },
    'series': '.sc-1u8nu73-15',
    'title': '.sc-1u8nu73-3',
    'description': '.sc-eyxzap-1',
    'chapter': '.sc-jrsJWt',
    'content': '.sc-dIvrsQ',
    'page': '.sc-xhhh7v-0'
  };
  var $getFileName = function () {
    var author = document.querySelector(elementList.author).innerText;
    var series = document.querySelectorAll(elementList.series).length > 0 ? document.querySelector(elementList.series).innerText + ' ' : '';
    var title = document.querySelectorAll(elementList.title).length > 0 ? document.querySelector(elementList.title).innerText : '無題';
    return author + ' - ' + series + title + ' (' + id + ')';
  };
  var $checkOS = function () {
    var windows = (navigator.userAgent.indexOf('Windows',0) != -1)?1:0;
    var mac = (navigator.userAgent.indexOf('mac',0) != -1)?1:0;
    var linux = (navigator.userAgent.indexOf('Linux',0) != -1)?1:0;
    var unix = (navigator.userAgent.indexOf('X11',0) != -1)?1:0;
    if (windows) os_type = 'Windows';
    else if (mac) os_type = 'Mac';
    else if (linux) os_type = 'Lunix';
    else if (unix) os_type = 'Unix';
    else os_type = 'other';
    return os_type;
  };
  var $downloadTxt = function (text) {
    try {
      text = ($checkOS() == 'Windows') ? text.replace(/(?:\r\n|\r|\n)/g, '\r\n') : text;
      var download = document.createElement('a');
      download.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      download.setAttribute('download', $getFileName() + '.txt');
      download.style.display = 'none';
      document.body.appendChild(download);
      download.click();
      document.body.removeChild(download);
      $loader.hide();
    } catch (error) {
      console.log('Oops!, unable to download');
    };
  };
  $loader.show();
  if (document.querySelectorAll(elementList.page).length > 0) {
    var textList = [];
    var $saveText = function() {
      return new Promise(function(resolve, reject) {
        var startInterval = setInterval(function(){
          var chapter = '';
          if (document.querySelectorAll(elementList.chapter).length > 0) {
            chapter = '<h2>' + document.querySelector(elementList.chapter).innerText + '</h2>';
            chapter += ($checkOS() == 'Windows' ? '\r\n\r\n\r\n\r\n' : '\n\n\n');
          }
          var content = chapter;
          var contents = document.querySelectorAll(elementList.content);
          [].forEach.call(contents, function(e) {
            content += e.innerText + ($checkOS() == 'Windows' ? '\r\n\r\n\r\n\r\n' : '\n\n\n');
          });
          textList.push(content);
          var nextPageEl = document.querySelector(elementList.page).lastChild;
          if (nextPageEl.disabled) {
            resolve(startInterval);
          } else {
            nextPageEl.click();
          }
        }, 1000);
      });
    };
    $saveText().then(function (startInterval) {
      window.clearInterval(startInterval);
      var $newline = function () {
        return $checkOS() == 'Windows' ? '\r\n\r\n\r\n\r\n' : '\n\n\n';
      };
      var text = '';
      textList.forEach(function (str, index) {
        text += str + $newline() + '<div class="page" data-page="' + (index + 1) + '"></div>' + $newline();
      });
      $downloadTxt(text);
    });
  } else {
    var content = '';
    var contents = document.querySelectorAll(elementList.content);
    [].forEach.call(contents, function(e) {
      content += e.innerText + ($checkOS() == 'Windows' ? '\r\n\r\n\r\n\r\n' : '\n\n\n');
    });
    $downloadTxt(content);
  }
})();
