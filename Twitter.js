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
  
  var $prompt = function (title, content = '') {
    var prompt = window.prompt(title, content);
    if (prompt == null || "") {
      $tooptip.show('已取消輸入');
      setTimeout(function () {
        $tooptip.hide();
      }, 1000);
    } else {
      return prompt;
    }
  };

  var url = location.href;
  if (url.indexOf('status') > 0) {
    document.querySelector('[data-testid="User-Name"]').addEventListener('click', function (event) {
      var author = this.innerText.replace('\n', '');
      $copyTextOfElement(author);
    });

    if (document.querySelectorAll('[data-testid="tweetText"]').length > 0) {
      document.querySelector('[data-testid="tweetText"]').addEventListener('click', function (event) {
        var description = '';
        [].forEach.call(this.children, function(child) {
            if (child.localName == 'img') {
                description+=child.alt;
                return true;
            }
            description+=child.innerText;
        });
        $copyTextOfElement(description);
      });
    }

    var $copyImageName = function () {
      var image = document.querySelector('[data-testid="tweetPhoto"]').children[1].src;
      var format = image.split('?format=')[1].split('&name=')[0];
      var name = image.split('?format=')[0].split('/media/')[1];
      $copyTextOfElement(name + '.' + format + ':orig');
    };
    $copyImageName();

    var $showImage = function (text, style) {
      try {
        $loader.hide();
        var newWin = window.open('', 'twitter window');
        newWin.document.open();
        newWin.document.write(`<html>
          <head>
          <style></style>
          </head>
          <body style="text-align: center; `+style+`">`+text+`</body>
        </html>`);
      } catch (error) {
        console.log('Oops!, unable to print');
      };
    };

    if (document.querySelectorAll('#image-button').length == 0) {
      var imageButton = document.createElement('div');
      imageButton.id = 'image-button';
      imageButton.innerHTML = `<button class="image-button" style="
        background-color: rgb(29, 155, 240);
        color: #FFF;
        border: none;
        margin: 10px;
        padding: 5px 10px;
        width: calc(100% - 20px);
        border-radius: 10px;
        cursor: pointer;
        ">另開圖片</button>`;
      document.querySelectorAll('[data-testid="User-Name"]')[0].parentElement.parentElement.parentElement.parentElement.appendChild(imageButton);
    }
    
    var $getOriginUrl = function (img) {
      var format = img.split('?format=')[1].split('&name=')[0];
      var path = img.split('?format=')[0];
      return path + '.' + format + ':orig';
    };

    var style = '';
    if (document.querySelector('body').style.length > 0 && document.querySelector('body').style[0] == 'background-color') {
      style = 'background-color:' + document.querySelector('body').style.backgroundColor + '; color: #FFF;';
    }
    if (document.querySelectorAll('.image-button').length > 0) {
      document.querySelector('.image-button').addEventListener('click', function (event) {
        setTimeout(function () {
          $loader.show();
          var images = [];
          var photos = document.querySelectorAll('[data-testid="tweetPhoto"]');
          [].forEach.call(photos, function(photo) {
            if (photo.children.length > 1 && photo.children[1].localName == 'img') {
              var img = photo.children[1].src;
              images.push($getOriginUrl(img));
            }
          });
          var content = '<div>共有 ' + images.length + ' 張</div><hr>';
          [].forEach.call(images, function(image, index) {
              content += '<image src="' + image + '" title="image ' + (index + 1) + '" width="20%" />';
              content += '<div>' + (index + 1) + '</div><hr>';
          });
          $showImage(content, style);
        }, 100);
      });
    }
  } else {
    var account = $prompt('請輸入 twitter 帳號', 'nacht0210');
    var start_date = $prompt('請輸入起始日期', '2023-01-01');
    var end_date = $prompt('請輸入結束日期', '2023-03-01');
    if (account != null && start_date != null && end_date != null) {
      window.location.href = 'https://twitter.com/search?f=live&q=(from%3A' + account + ')%20until%3A' + end_date + '%20since%3A' + start_date + '&src=typed_query';
    }
  }
})();
