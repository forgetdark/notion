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
          tooltipModel.innerHTML = '<span style="position: fixed; left: 1%; bottom: 1%;">' + text + '</span>';
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
  var elementList = {
    'cover': {
      'link': '.sc-1u8nu73-18',
      'img': '.sc-1u8nu73-19'
    },
    'series': '.sc-1u8nu73-15',
    'title': '.sc-1u8nu73-3',
    'chapter': '.sc-jrsJWt',
    'description': '.sc-eyxzap-1',
    'content': ['.sc-dIvrsQ', '.'+document.querySelector('#gtm-novel-work-scroll-finish-reading').previousElementSibling.classList[0]],
    'pages': '.sc-xhhh7v-1'
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
  for (const [key, el] of Object.entries(elementList)) {
    if (key == 'cover') {
      document.querySelector(elementList.cover.link).setAttribute('href','javascript:void(0);');
      document.querySelector(elementList.cover.link).removeAttribute('target');
      document.querySelector(el.link).addEventListener('click', function(event) {
        $copyTextOfElement(document.querySelector(el.img).getAttribute('src'));
      });
    } else if (key == 'content') {
      el.forEach (function (e) {
        var contents = document.querySelectorAll(e);
        if (contents.length > 0) {
          [].forEach.call(contents, function(element) {
            element.addEventListener('click', function(event) {
              $copyTextOfElement(this.innerText);
            });
          });
        }
      });
    } else if (key == 'pages') {
      var pages = document.querySelectorAll(el);
      if (pages.length > 0) {
        [].forEach.call(pages, function(page) {
          page.addEventListener('click', function(event) {
            setTimeout(function () {
              for (const [index, e] of Object.entries(elementList.content)) {
                var contents = document.querySelectorAll(e);
                if (contents.length > 0) {
                  [].forEach.call(contents, function(element) {
                    element.addEventListener('click', function(event) {
                      console.log('test');
                      $copyTextOfElement(this.innerText);
                    });
                  });
                }
              }
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
      if (document.querySelectorAll(el).length > 0) {
        document.querySelector(el).addEventListener('click', function(event) {
          $copyTextOfElement(this.innerText);
        });
      }
    }
  }
})();
