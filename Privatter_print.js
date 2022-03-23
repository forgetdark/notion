javascript:(function(){
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
      console.log('Text ' + msg + ' to clipboard...');
    };
    if (!navigator.clipboard) {
      copyEl(copyText);
    } else {
      let resolve = () => { 
        console.log('Text copied to clipboard...'); 
      };
      let reject = (err) => {
        copyEl(copyText);
      };
      navigator.clipboard.writeText(copyText).then(resolve, reject);
    }
  };
  var $getFileName = function () {
    var id = location.href.split('/p/')[1];
    var author = document.querySelector('[name="userprof"]').nextElementSibling.childNodes[3].childNodes[3].innerText;
    var title = document.querySelectorAll('.lead').length > 0 ? document.querySelector('.lead').innerText : '無題';
    return author + ' - ' + title + ' (p' + id + ')';
  };
  $copyTextOfElement($getFileName());
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
  var $printTxt = function (text) {
    try {
      $loader.hide();
      var newWin = window.open('', 'print window');
      newWin.document.open();
      newWin.document.write(`<html>
        <head>
        <style>
        @media print {
          body { font-family: "YuGothic", "Hiragino Kaku Gothic Pro", "Meiryo", "Source Han Sans", "Source Han Sans JP", "Noto Sans CJK JP", "Avenir Next", Avenir, "Source Sans", "Noto Sans", "Roboto", "Verdana", "Pingfang TC", "Pingfang HK", "Hiragino Sans CNS", "Lantinghei TC", "Source Han Sans TW", "Source Han Sans HK", "Noto Sans CJK TC", "Microsoft JhengHei", "Pingfang SC", "Hiragino Sans GB", "Lantinghei SC", "Source Han Sans CN", "Noto Sans CJK SC", "Microsoft Yahei", "DengXian", "Apple SD Gothic Neo", "Source Han Sans K", "Source Han Sans KR", "Noto Sans CJK KR", "Malgun Gothic", sans-serif; }
          .panel-heading, .panel-body div { display: none; }
		  .panel-body b { font-weight: inherit; }
          a { text-decoration: none; color: rgb(61, 118, 153); }
        }
        </style>
        </head>
        <body onload="window.print();">`+text+`</body>
      </html>`);
      newWin.document.close();
      setTimeout(function(){newWin.close();},1000);
    } catch (error) {
      console.log('Oops!, unable to print');
    };
  };
  setTimeout(function () {
    $loader.show();
    if (document.querySelectorAll('.pagination').length > 0) {
      var textList = [];
      var $saveText = function() {
        return new Promise(function(resolve, reject) {
          var startInterval = setInterval(function(){
            var content = '';
            if (textList.length == 0) {
              content+= '<div style="float: right;">' + document.querySelector('[name="userprof"]').nextElementSibling.innerHTML + '</div>';
              content+= `<div style="float: left;">
                <h1>`+document.querySelector('.lead').innerText+`</h1>`+
                document.querySelector('.lead').nextElementSibling.nextElementSibling.innerHTML+
                `<div>`+document.querySelector('.text-muted').innerText+`</div>
              </div>`;
              content+= '<hr style="clear: both;">';
            }
            var nowPage = document.querySelector('[role="presentation"].active').innerText;
            content+= '<div style="text-align: center;">'+nowPage+'</div>';
            content+= document.querySelectorAll('.honbun')[parseInt(nowPage) - 1].innerHTML;
            textList.push(content);
            var nextPageEl = document.querySelector('[role="presentation"].active').nextElementSibling;
            if(nextPageEl === null) {
              resolve(startInterval);
            } else {
              nextPageEl.childNodes[0].click();
            }
          }, 1000);
        });
      };
      $saveText().then(function (startInterval) {
        window.clearInterval(startInterval);
        var text = '';
        textList.forEach(function (str, index) {
          text += (text != ''?'<p style="page-break-after: always;"></p>':'') + str;
        });
        var url = location.href;
        text += '<hr><div style="text-align: center;"><a href="'+url+'" target="_blank" style="color: blue;">'+url+'</a></div>';
        $printTxt(text);
      });
    } else {
      var url = location.href;
      var content = '';
      content+= '<div style="float: right;">' + document.querySelector('[name="userprof"]').nextElementSibling.innerHTML + '</div>';
      content+= `<div style="float: left;">
      <h1>`+document.querySelector('.lead').innerText+`</h1>`+
      document.querySelector('.lead').nextElementSibling.nextElementSibling.innerHTML+
      `<div>`+document.querySelector('.text-muted').innerText+`</div>
      </div>`;
      content+= '<hr style="clear: both;"><div style="text-align: center;">1</div>';
      content+= document.querySelector('.honbun').innerHTML;
      content+= '<hr><div style="text-align: center;"><a href="'+url+'" target="_blank" style="color: blue;">'+url+'</a></div>';
      $printTxt(content);
    }
  }, 100);
})();
