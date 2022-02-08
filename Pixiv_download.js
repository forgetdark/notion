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
  }
  `;
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
    'content': '.sc-dIvrsQ'
  };
  try {
    var text = document.querySelector(elementList.content).innerText;
    var filename = document.querySelector(elementList.title).innerText;

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
    document.body.removeChild(loader);
  } catch (error) {
    console.log('Oops!, unable to download');
  }
})();
