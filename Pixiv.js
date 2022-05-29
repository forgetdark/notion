javascript:(function(){
  var $tooptip = (function() {
    var tooptipStyle = document.createElement('style');
    tooptipStyle.id = 'tooltip-style';
    tooptipStyle.innerHTML = `.tooltip-model {
      opacity: 0;
      transition: opacity .5s;
      visibility: hidden;
      position: relative;
    }
    .tooltip-model span {
      width: 100px;
      background-color: #555;
      color: #fff;
      text-align: center;
      padding: 5px 0;
      border-radius: 6px;
      z-index: 99999999;
      font-size: 13px;
    }
    .tooltip-model span:after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #555 transparent transparent transparent;
    }`;

    var tooltipModel = document.createElement('div');
    tooltipModel.classList.add('tooltip-model');

    return {
      show: function (text, targetName, position) {
        document.body.appendChild(tooptipStyle);
        if (typeof targetName === 'undefined') {
          tooltipModel.innerHTML = '<span style="position: fixed; left: 1%; top: 1%;">' + text + '</span>';
          document.body.appendChild(tooltipModel);
        } else {
          var target = targetName;
          if (typeof targetName === 'string' || targetName instanceof String) {
            target = document.getElementById(targetName.replace('#', ''));
          }

          position = typeof position !== 'undefined' ? position : [null, -30];
          if (position[0] === null) {
            position[0] = 'calc(' + (target.offsetWidth * 0.5) + 'px - 50px)';
          } else {
            position[0] += 'px';
          }
          tooltipModel.innerHTML = '<span style="position: absolute; left:' + position[0] + '; top:' + position[1] + 'px;">' + text + '</span>';

          if (target.firstChild !== null) {
            target.insertBefore(tooltipModel, target.firstChild);
          } else {
            target.appendChild(tooltipModel);
          }
        }
        setTimeout(function () {
          document.querySelector('.tooltip-model').style.visibility = 'visible';
          document.querySelector('.tooltip-model').style.opacity = 1;
        }, 1);
      },
      hide: function () {
        document.querySelector('.tooltip-model').style.opacity = 0;
        setTimeout(function () {
          document.querySelector('.tooltip-model').style.visibility = 'hidden';
          document.getElementById('tooltip-style').remove();
          document.querySelector('.tooltip-model').remove();
        }, 500);
      }
    };
  })();

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
  var $copyTextOfElement = function (copyText) {
    function copyEl(text) {
      var el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.focus();
      el.select();
      var copyStatus = document.execCommand('copy');
      var msg = copyStatus ? 'copied' : 'failed';
      var transMsg = copyStatus ? '複製成功' : '複製失敗';
      document.body.removeChild(el);
      console.log('Text ' + msg + ' to clipboard...');
      $tooptip.show(transMsg);
      setTimeout(function () {
        $tooptip.hide();
      }, 1000);
    };
    if (!navigator.clipboard) {
      copyEl(copyText);
    } else {
      let resolve = () => { 
        console.log('Text copied to clipboard...');
        $tooptip.show('複製成功');
        setTimeout(function () {
          $tooptip.hide();
        }, 1000);
      };
      let reject = (err) => {
        copyEl(copyText);
      };
      navigator.clipboard.writeText(copyText).then(resolve, reject);
    }
  };
  var $copyMultEl = function (e) {
      var contents = document.querySelectorAll(e);
      if (contents.length > 0) {
        [].forEach.call(contents, function(element) {
          element.addEventListener('click', function(event) {
            $copyTextOfElement(this.innerText);
          });
        });
      }
    };
    var $copySingleEl = function (e) {
      if (document.querySelectorAll(e).length > 0) {
        document.querySelector(e).addEventListener('click', function(event) {
          $copyTextOfElement(this.innerText);
        });
      }
    };

  if (location.href.indexOf('series') < 0) {
    var elementList = {
      /*'cover': {
        'link': '.sc-1u8nu73-18',
        'img': '.sc-1u8nu73-19'
      },*/
      'series': '.sc-1u8nu73-15',
      'title': '.sc-1u8nu73-3',
      'chapter': '.'+document.querySelector('#gtm-novel-work-scroll-finish-reading').previousElementSibling.previousElementSibling.classList[0],
      'description': '.sc-eyxzap-1',
      'content': '.'+document.querySelector('#gtm-novel-work-scroll-finish-reading').previousElementSibling.classList[0],
      'pages': '.sc-xhhh7v-1'
    };
    for (const [key, el] of Object.entries(elementList)) {
      if (key == 'cover') {
        document.querySelector(elementList.cover.link).setAttribute('href','javascript:void(0);');
        document.querySelector(elementList.cover.link).removeAttribute('target');
        document.querySelector(el.link).addEventListener('click', function(event) {
          $copyTextOfElement(document.querySelector(el.img).getAttribute('src'));
        });
      } else if (key == 'chapter' || key == 'content') {
        $copyMultEl(el);
      } else if (key == 'pages') {
        var pages = document.querySelectorAll(el);
        if (pages.length > 0) {
          [].forEach.call(pages, function(page) {
            page.addEventListener('click', function(event) {
              setTimeout(function () {
                $copyMultEl(elementList.chapter);
                $copyMultEl(elementList.content);
              }, 100);
            });
          });

          $tooptip.show('有分頁');
          setTimeout(function () {
            $tooptip.hide();
          }, 1000);
        } else {
          $tooptip.show('無分頁');
          setTimeout(function () {
            $tooptip.hide();
          }, 1000);
        }
      } else {
        $copySingleEl(el);
      }
    }
  } else {
    var elementList = {
      'series': '.sc-vk2fvc-3',
      'description': '.sc-eyxzap-1',
      'cover': '.sc-vmsckl-2',
      'title': '.sc-d98f2c-0'
    };
    for (const [key, el] of Object.entries(elementList)) {
      if (key == 'cover') {
        document.querySelector(el).addEventListener('click', function(event) {
          $copyTextOfElement(document.querySelector(el).getAttribute('src'));
        });
      } else if (key == 'title') {
        if (document.querySelectorAll(el).length > 0) {
          var titles = document.querySelectorAll(el);
          var str = [];
          if (titles.length > 0) {
            [].forEach.call(titles, function(title) {
              str.push(title.innerHTML);
            });
          }
          var $newline = function () {
            return $checkOS() == 'Windows' ? '\r\n\r\n\r\n\r\n' : '\n\n\n';
          };
          $copyTextOfElement(str.join($newline));
        }
      } else {
        $copySingleEl(el);
      }
    }
    $tooptip.show('準備就緒');
    setTimeout(function () {
      $tooptip.hide();
    }, 1000);
  }
})();
