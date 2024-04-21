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

  var $copyTextOfElement = function (copyText, isTooltip = true, callback = null) {
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
      if (isTooltip) {
        $tooptip.show(transMsg);
        setTimeout(function () {
          $tooptip.hide();
        }, 1000);
      }
      if ( typeof callback === 'function' ){
        callback();
      }
    };
    if (!navigator.clipboard) {
      copyEl(copyText);
    } else {
      let resolve = () => {
        console.log('Text copied to clipboard...');
        if (isTooltip) {
          $tooptip.show('複製成功');
          setTimeout(function () {
            $tooptip.hide();
          }, 1000);
        }
        if ( typeof callback === 'function' ){
          callback();
        }
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

  if (location.href.indexOf('users') > 0) {
    var author = document.querySelector('h1').innerText;
    var id = location.href.split('/');
    $copyTextOfElement(author + ' (' + id[4] + ')');
  } else if (location.href.indexOf('series') > 0) {
    var elementList = {
      'cover': '.sc-vmsckl-2',
      'series': '.sc-vk2fvc-2',
      'description': '.sc-eyxzap-1'
    };
    for (const [key, el] of Object.entries(elementList)) {
      if (key == 'cover') {
        document.querySelector(el).style = 'cursor: pointer;';
        document.querySelector(el).addEventListener('click', function(event) {
          var el = document.createElement("a");
          el.href = this.src;
          el.target = '_blank';
          document.body.appendChild(el);
          el.click();
          document.body.removeChild(el);
        });
      } else {
        $copySingleEl(el);
      }
    }
    $tooptip.show('準備就緒');
    setTimeout(function () {
      $tooptip.hide();
    }, 1000);
  } else {
    var elementList = {
      'author': '',
      'series': '.sc-1u8nu73-15',
      'title': '.sc-1u8nu73-3',
      'description': '.sc-eyxzap-1',
      'content': 'main',
      'pages': '.sc-xhhh7v-1',
      'cover': '.sc-1u8nu73-17',
      'date': '.sc-5981ly-0'
    };
    for (const [key, el] of Object.entries(elementList)) {
      if (key == 'author') {
        if (document.querySelectorAll('[data-gtm-value]').length > 0) {
          setTimeout(function () {
            var author_name = document.querySelectorAll('[data-gtm-value]')[1].innerText;
            var author_id = document.querySelectorAll('[data-gtm-value]')[1].getAttribute("data-gtm-value");
            $copyTextOfElement(author_name + ' (' + author_id + ')', false, function () {
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            });
          }, 100);
        }
      } else if (key == 'content') {
        var contentName = '';
        var mains = document.querySelectorAll(elementList.content);
        [].forEach.call(mains, function(main, index) {
          if (index > 0) {
            contentName = '.' + main.children[0].classList[0];
            return true;
          }
        });
        if (contentName != '') {
          document.querySelector(contentName).addEventListener('click', function(event) {
            setTimeout(function () {
              var contentModel = document.createElement('div');
              contentModel.classList.add('content-model');
              contentModel.innerHTML = '';
              [].forEach.call(document.querySelector(contentName).children, function(child) {
                if (child.localName == 'p') {
                  contentModel.innerHTML += child.innerHTML + '<p></p>';
                } else if (child.localName == 'h2') {
                  contentModel.innerHTML += child.innerHTML + '<p></p><br/>';
                }
              });
              document.body.appendChild(contentModel);
              $copyTextOfElement(contentModel.innerText);
              document.querySelector('.content-model').remove();
            }, 100);
          });
        }
      } else if (key == 'pages') {
        var pages = document.querySelectorAll(el);
        if (pages.length > 0) {
          $tooptip.show('有分頁');
          setTimeout(function () {
            $tooptip.hide();
          }, 500);
        } else {
          $tooptip.show('無分頁');
          setTimeout(function () {
            $tooptip.hide();
          }, 500);
        }
      } else if (key == 'cover') {
        document.querySelector(el).addEventListener('click', function(event) {
          if (document.querySelectorAll('[data-gtm-value]').length > 0) {
            var author_name = document.querySelectorAll('[data-gtm-value]')[1].innerText;
            var author_id = document.querySelectorAll('[data-gtm-value]')[1].getAttribute("data-gtm-value");
            $copyTextOfElement(author_name + ' (' + author_id + ')');
          }
        });
      } else {
        $copySingleEl(el);
      }
    }
  }
})();
