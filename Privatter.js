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

  var $privatterTxt = function (text) {
    try {
      $loader.hide();
      var newWin = window.open('', 'privatter window');
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
        <body>`+text+`</body>
      </html>`);
    } catch (error) {
      console.log('Oops!, unable to print');
    };
  };
  var $getContent = function (isCover) {
    var url = location.href;
    var content = '';
    if (isCover) {
      content+= `<div><h1 class="panel-copy">`+document.querySelector('.lead').innerText+`</h1>`+
      `<div class="panel-copy">`+url+`</div>`+
      `<div class="panel-copy">`+document.querySelector('[name="userprof"]').nextElementSibling.innerHTML+`</div>`+
      document.querySelector('.lead').nextElementSibling.nextElementSibling.innerHTML+
      `<hr><div class="panel-copy">`+document.querySelector('.fa-clock').parentElement.parentElement.nextElementSibling.innerHTML+`</div></div>`;
      content+= '<hr>';
    }
    return content;
  };

  setTimeout(function () {
    $loader.show();
    if (document.querySelectorAll('.pagination').length > 0) {
      var $saveText = function() {
        return new Promise(function(resolve, reject) {
          var textList = [];
          var contents = document.querySelectorAll('.honbun');
          [].forEach.call(contents, function(e, i) {
            var nowPage = i + 1;
            var content = $getContent(textList.length == 0);
            content+= '<div style="text-align: center; margin-bottom: 1em; background-color: #EEE;">'+nowPage+'</div>';
            content+= e.innerHTML;
            textList.push(content);
          });
          resolve(textList);
        });
      };
      $saveText().then(function (textList) {
        var text = '';
        textList.forEach(function (str, index) {
          text += (text != ''?'<p class="panel-copy" style="page-break-after: always;"></p>':'') + str;
        });
        $privatterTxt(text);
      });
    } else {
      var content = $getContent(true);
      content+= '<div style="text-align: center; margin-bottom: 1em;">1</div>';
      content+= '<div class="panel-copy">'+document.querySelector('.honbun').innerHTML+'</div>';
      $privatterTxt(content);
    }
  }, 100);
})();
