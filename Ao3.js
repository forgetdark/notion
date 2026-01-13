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

  var $archiveofourownTxt = function (text) {
    try {
      $loader.hide();
      var newWin = window.open('', 'archiveofourown window');
      newWin.document.open();
      newWin.document.write(`<html>
        <head>
        <style>
        body { font-family: "YuGothic", "Hiragino Kaku Gothic Pro", "Meiryo", "Source Han Sans", "Source Han Sans JP", "Noto Sans CJK JP", "Avenir Next", Avenir, "Source Sans", "Noto Sans", "Roboto", "Verdana", "Pingfang TC", "Pingfang HK", "Hiragino Sans CNS", "Lantinghei TC", "Source Han Sans TW", "Source Han Sans HK", "Noto Sans CJK TC", "Microsoft JhengHei", "Pingfang SC", "Hiragino Sans GB", "Lantinghei SC", "Source Han Sans CN", "Noto Sans CJK SC", "Microsoft Yahei", "DengXian", "Apple SD Gothic Neo", "Source Han Sans K", "Source Han Sans KR", "Noto Sans CJK KR", "Malgun Gothic", sans-serif; }
        .panel-heading, .panel-body div, .panel-title img { display: none; }
        .panel-body b { font-weight: inherit; }
        a { text-decoration: none; color: rgb(61, 118, 153); }
        </style>
        </head>
        <body>`+text+
        `<script>
          var $copyTextOfElement = function (copyText) {
            function copyEl(text) {
              var el = document.createElement("textarea");
              el.value = text;
              document.body.appendChild(el);
              el.focus();
              el.select();
              var copyStatus = document.execCommand('copy');
              var msg = copyStatus ? 'copied' : 'failed';
              document.body.removeChild(el);
              alert('Text ' + msg + ' to clipboard...');
            };
            if (!navigator.clipboard) {
              copyEl(copyText);
            } else {
              let resolve = () => {
                alert('Text copied to clipboard...');
              };
              let reject = (err) => {
                copyEl(copyText);
              };
              navigator.clipboard.writeText(copyText).then(resolve, reject);
            }
          };
          var panels = document.querySelectorAll('.panel-copy');
          if (panels.length > 0) {
            [].forEach.call(panels, function(panel) {
              panel.addEventListener('click', function(event) {
                $copyTextOfElement(this.innerText);
              });
            });
          }
        </script></body>
      </html>`);
    } catch (error) {
      console.log('Oops!, unable to print');
    };
  };
  var $getContent = function (isCover) {
    var url = location.href;
    var content = '';
    if (isCover) {
      content+= `<div><div class="panel-copy">`+url+`</div>`+
      `<h1 class="panel-copy">`+document.querySelector('h2').innerText+`</h1>`+
      `<div class="panel-copy" style="float: left;">`+document.querySelector('[rel="author"]').innerHTML+`</div>`+
      `<div class="panel-copy" style="float: right;">`+`</div>`;
      if (document.querySelector('.summary').children.length > 0) {
        content+= `<hr style="clear: both;"><div class="panel-copy">`+document.querySelector('.summary').children[1].innerHTML+`</div></div>`;
      }
      content+= '<hr style="clear: both;">';
    }
    return content;
  };

  setTimeout(function () {
    $loader.show();
    var selectors = ['[role="article"]'];
  
    var selector = selectors.find(function(sel) {
      return document.querySelector(sel);
    });
  
    if (selector) {
      var content = $getContent(true);
      var el = document.querySelector(selector);
  
      var main =
        selector === '.userstuff'
          ? el.innerHTML
          : el.children[1].innerHTML;
  
      content +=
        '<div style="text-align: center; margin-bottom: 1em; padding: 10px; background: #CCAA88; font-size: 15px; color: #333;">1</div>';
      content += '<div class="panel-copy">' + main + '</div>';
  
      $archiveofourownTxt(content);
    }
  }, 100);
})();
