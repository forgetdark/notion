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
      `<h1 class="panel-copy">`+document.querySelector('.lead').innerText+`</h1>`+
      `<div class="panel-copy" style="float: left;">`+document.querySelector('[name="userprof"]').nextElementSibling.innerHTML+`</div>`+
      `<div class="panel-copy" style="float: right;">`+document.querySelector('.lead').nextElementSibling.nextElementSibling.innerHTML+`</div>`+
      `<hr style="clear: both;"><div class="panel-copy">`+document.querySelector('.fa-clock').parentElement.parentElement.nextElementSibling.innerHTML+`</div></div>`;
      content+= '<hr>';
    }
    return content;
  };

  setTimeout(function () {
    $loader.show();
    if (document.querySelectorAll('.pagination').length > 0) {
      var $getText = function () {
        return new Promise(function(resolve, reject) {
          var textList = [];
          var contents = document.querySelectorAll('.honbun');
          [].forEach.call(contents, function(e, i) {
            textList.push({
              'page': i + 1,
              'content': e.innerHTML
            });
          });
          resolve(textList);
        });
      };
      $getText().then(function (textList) {
        var content = $getContent(true);
        [].forEach.call(textList, function(textArray, i) {
          content+='<span id="tab-'+textArray.page+'">'+textArray.page+'</span>';
        });
        content+='<div id="tab"><ul>';
        [].forEach.call(textList, function(textArray, i) {
          content+='<li><a href="#tab-'+textArray.page+'">'+textArray.page+'</a></li>';
        });
        content+='</ul>';
        [].forEach.call(textList, function(textArray, i) {
          content+='<div class="panel-copy tab-content-'+textArray.page+'"><p>'+textArray.content+'</p></div>';
        });
        content+='</div>';
        content+=`
        <style>
        #tab {
            background: #8888CC;
            border: solid 1px #CCAA88;
        }
        #tab > ul {
            margin: 0;
            padding: 10px 20px 0 20px;
        }

        #tab > ul > li {
            list-style-type: none;
        }

        #tab > ul > li > a { 
            text-decoration: none;
            font-size: 15px;
            color: #333;
            float: left;
            padding: 10px;
            margin-left: 5px;
        }

        #tab > div {
            clear: both;
            padding: 0 15px;
            height: 0;
            overflow: hidden;
            visibility: hidden;
        }

        span:target ~ #tab > ul li:first-child a {
            background: #CCAA88;
        }

        span:target ~ #tab > div:first-of-type {
            visibility: hidden;
            height: 0;
            padding: 0 15px;
        }

        span ~ #tab > ul li:first-child a,
        #tab-1:target ~ #tab > ul li a[href$="#tab-1"],
        #tab-2:target ~ #tab > ul li a[href$="#tab-2"],
        #tab-3:target ~ #tab > ul li a[href$="#tab-3"],
        #tab-4:target ~ #tab > ul li a[href$="#tab-4"] {
            background: #fff;
            border-radius: 5px 5px 0 0;
        }

        span ~ #tab > ul li:first-child a::before,
        #tab-1:target ~ #tab > ul li a[href$="#tab-1"]::before,
        #tab-2:target ~ #tab > ul li a[href$="#tab-2"]::before,
        #tab-3:target ~ #tab > ul li a[href$="#tab-3"]::before,
        #tab-4:target ~ #tab > ul li a[href$="#tab-4"]::before {
            background-color: white;
            height: 100%;
        }

        span ~ #tab > div:first-of-type,
        #tab-1:target ~ #tab > div.tab-content-1,
        #tab-2:target ~ #tab > div.tab-content-2,
        #tab-3:target ~ #tab > div.tab-content-3,
        #tab-4:target ~ #tab > div.tab-content-4 {
            visibility: visible;
            height: auto;
            background: #fff;
        }

        span {
            display: none;
        }
        </style>
        `;
        $privatterTxt(content);
      });
    } else {
      var content = $getContent(true);
      content+= '<div class="panel-copy">'+document.querySelector('.honbun').innerHTML+'</div>';
      $privatterTxt(content);
    }
  }, 100);
})();
