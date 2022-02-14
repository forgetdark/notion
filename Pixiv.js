javascript:(function(){
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
          tooltipModel.innerHTML = '<span style="position: fixed; left: 1%; bottom: 1%;">' + text + '</span>';
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
        $tooptip.show('複製成功');
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
