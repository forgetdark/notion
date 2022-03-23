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
          .lmxMCy { width: 136px; height: 191px; object-fit: cover; object-position: center center; }
          .iLHffi, .dpDffd, #gtm-var-novel-theme-color, #gtm-var-novel-writing-mode{ display: none; }
          .caAbSV { font-size: 1em; color: #CCC; text-decoration: none; }
          .iwisNA { text-align: center; }
          .bbNZID a { text-decoration: none; color: rgb(61, 118, 153); }
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
  $loader.show();
  if (document.querySelectorAll('.exhRUC').length > 0) {
    document.querySelector('.exhRUC').click();
  }
  var $copyTextOfElement = function (copyText) {
    function copyEl(text) {
      var el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.focus();
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      console.log('Text copied to clipboard...');
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
    var id = location.href.split('?id=')[1];
    var author = document.querySelector('.jIsznR').title;
    var title = document.querySelectorAll('.lfwBiP').length > 0 ? document.querySelector('.lfwBiP').innerText : '無題';
    return author + ' - ' + title + ' (' + id + ')';
  };
  $copyTextOfElement($getFileName());
  if (document.querySelectorAll('.kYtoqc').length > 0) {
    var textList = [];
    var $saveText = function() {
      return new Promise(function(resolve, reject) {
        var startInterval = setInterval(function(){
          var content = '';
          if (textList.length == 0) {
            content+= '<div style="float: right;">' + document.querySelector('.jIsznR').title + '</div>';
            content+= '<div style="float: left; margin-bottom: 5px;">' + document.querySelector('.gcrJTU').innerHTML + '</div>';
            content+= '<hr style="clear: both;">';
          }
          content+= document.querySelector('.ihJaMk').innerHTML;
          textList.push(content);
          var nextPageEl = document.querySelector('.kYtoqc').lastChild;
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
      var text = '';
      textList.forEach(function (str, index) {
        text += (text != ''?'<p style="page-break-after: always;"></p>':'') + str;
      });
      var url = location.href.split('#')[0];
      text += '<hr><div style="text-align: center;"><a href="'+url+'" target="_blank" style="color: blue;">'+url+'</a></div>';
      $printTxt(text);
    });
  } else {
    var url = location.href;
    var content = '<div style="float: right;">' + document.querySelector('.jIsznR').title + '</div>';
    content+= '<div style="float: left; margin-bottom: 5px;">' + document.querySelector('.gcrJTU').innerHTML + '</div>';
    content+= '<hr style="clear: both;">';
    content+= document.querySelector('.ihJaMk').innerHTML;
    content+= '<hr><div style="text-align: center;"><a href="'+url+'" target="_blank" style="color: blue;">'+url+'</a></div>';
    $printTxt(content);
  }
})();
