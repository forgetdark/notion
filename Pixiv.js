javascript:(function(){
  var $tooptip = (function() {
    var tooptipStyle = document.createElement('style');
    tooptipStyle.id = 'tooltip-style';
    tooptipStyle.innerHTML = `.tooltip-model {
      visibility: hidden;
      width: 100px;
      background-color: #555;
      color: #fff;
      text-align: center;
      padding: 5px 0;
      border-radius: 6px;
      position: fixed;
      z-index: 99999999;
      left: 1%;
      bottom: 3%;
      transition: opacity 0.3s;
      font-size: 13px;
    }
    .tooltip-model:after {
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
    tooltipModel.innerHTML = '複製成功';
    tooltipModel.classList.add('tooltip-model');
    return {
      show: function () {
        document.body.appendChild(tooptipStyle);
        document.body.appendChild(tooltipModel);
        document.querySelector('.tooltip-model').style.visibility = 'visible';
      },
      hide: function () {
        document.getElementById('tooltip-style').remove();
        document.querySelector('.tooltip-model').remove();
      }
    };
  })();
  var elementList = {
    'cover': {
      'link': '.sc-1u8nu73-18',
      'img': '.sc-1u8nu73-19'
    },
    'title': '.sc-1u8nu73-3',
    'description': '.sc-eyxzap-1',
    'content': '.sc-dIvrsQ'
  };
  var $copy = function (copyMsg) {
    try {
      navigator.clipboard.writeText(copyMsg)
      .then(() => {
        console.log("Text copied to clipboard...");
        $tooptip.show();
        setTimeout(function () {
          $tooptip.hide();
        }, 1000);
      })
      .catch(err => {
        console.log('Something went wrong', err);
      });
    } catch (error) {
      console.log('Oops!, unable to copy');
    }
  };
  $copy(location.href);
  for (const [key, el] of Object.entries(elementList)) {
    if (key == 'cover') {
      document.querySelector(elementList.cover.link).setAttribute('href','javascript:void(0);');
      document.querySelector(elementList.cover.link).removeAttribute('target');
      document.querySelector(el.link).addEventListener('click', function(event){
        $copy(document.querySelector(el.img).getAttribute('src'));
      });
    } else {
      if (document.querySelectorAll(el).length > 0) {
        document.querySelector(el).addEventListener('click', function(event){
          $copy(document.querySelector(el).innerText);
        });
      }
    }
  }
})();
