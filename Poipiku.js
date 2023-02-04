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
  
  var $showImage = function (text) {
    try {
      $loader.hide();
      var newWin = window.open('', 'poipiku window');
      newWin.document.open();
      newWin.document.write(`<html>
        <head>
        <style></style>
        </head>
        <body style="text-align: center;">`+text+`</body>
      </html>`);
    } catch (error) {
      console.log('Oops!, unable to print');
    };
  };
  
  var url = location.href;
  if (url.indexOf('html') > 0) {
    document.querySelector('.IllustItemExpandBtn').click();
    setTimeout(function () {
      var image_button = document.querySelector('.IllustItemCommandInfo');
      image_button.removeAttribute('href');
      image_button.addEventListener('click', function (event) {
        setTimeout(function () {
          $loader.show();
          var images = [];
          var $getOriginUrl = function (img) {
            return img.replace('_640.jpg', '');
          };
          var photos = document.querySelectorAll('.IllustItemThumbImg');
          [].forEach.call(photos, function(photo) {
            images.push($getOriginUrl(photo.src));
          });
          var content = '<div>共有 ' + images.length + ' 張</div><hr>';
          [].forEach.call(images, function(image, index) {
              content += '<image src="' + image + '" title="image ' + (index + 1) + '" width="20%" />';
              content += '<div>' + (index + 1) + '</div><hr>';
          });
          $showImage(content);
        }, 100);
      });
    }, 1000);
  } else {
    var links = document.querySelectorAll('.IllustItemCommandInfo');
    [].forEach.call(links, function(link, index) {
      var str = link.href.replace('ReportFormPcV.jsp?ID=', '').replace('&TD=', '/') + '.html';
      link.setAttribute('href', str);
      link.setAttribute('target', '_blank');
    });
  }
})();
