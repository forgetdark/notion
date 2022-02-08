javascript:(function(){
  var style = document.createElement('style');
  style.innerHTML = `.loader {
    position: relative;
    width: 2.5em;
    height: 2.5em;
    transform: rotate(165deg);
  }
  .loader:before,
  .loader:after {
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
  .loader:before {
    animation: before 2s infinite;
  }
  .loader:after {
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
  .loader {
    position: absolute;
    top: calc(50% - 2.5em / 2);
    left: calc(50% - 2.5em / 2);
  }`;
  document.body.appendChild(style);
  var loader = document.createElement('div'); 
  loader.classList.add('loader');
  document.body.appendChild(loader);
  var id = location.href.split('?id=')[1];
  var elementList = {
    'author': '.sc-fujyAs',
    'date': '.sc-5981ly-0',
    'cover': {
      'link': '.sc-1u8nu73-18',
      'img': '.sc-1u8nu73-19'
    },
    'title': '.sc-1u8nu73-3',
    'description': '.sc-eyxzap-1',
    'content': '.sc-dIvrsQ',
    'page': {
      'main': '.sc-xhhh7v-0',
      'button': '.sc-xhhh7v-1'
    }
  };
  var $download = function (text) {
    try {
      var filename = document.querySelector(elementList.title).innerText;
      var dlEl = document.createElement('a');
      dlEl.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      dlEl.setAttribute('download', filename);
      dlEl.style.display = 'none';
      document.body.appendChild(dlEl);
      dlEl.click();
      document.body.removeChild(dlEl);
      document.body.removeChild(loader);
      document.body.removeChild(style);
    } catch (error) {
      console.log('Oops!, unable to download');
    };
  };
  if (document.querySelectorAll(elementList.page.main).length > 0) {
    var textList = [];
    var pageList = document.querySelectorAll(elementList.page.button);
    var $nextPage = function (flag) {
      flag++;
      if (flag > 1 && flag < pageList.length - 1) {
        pageList[flag].click();
      }
    };
    pageList.forEach(function (pageEl, index) {
      setTimeout(function () {
        if (index == pageList.length - 1) {
          console.log(textList);
        } else if (index > 0) {
          var str = document.querySelector(elementList.content).innerText;
          textList.push(str);
        }
        $nextPage(index);
      }, 1000 * index);
    });
  } else {
    $download(document.querySelector(elementList.content).innerText);
  }
})();
