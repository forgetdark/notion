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

  if (document.querySelectorAll('.more.on').length > 0) {
    document.querySelector('.more.on').click();
  }

  var topics = document.querySelector('.type02_p002').childNodes;
  [].forEach.call(topics, function(topic) {
    if (typeof topic.childElementCount !== 'undefined') {
      topic.addEventListener('click', function(event) {
        $copyTextOfElement(this.innerText);
      });
    }
  });

  var lis = document.querySelector('.type02_p003').childNodes[1].childNodes;
  [].forEach.call(lis, function(li) {
    var liChild = li.childNodes;
    [].forEach.call(liChild, function (child) {
      var isAuthor = child.childElementCount == 0 && child.getAttribute('href').indexOf('author') > 0;
      var isPublisher = child.childElementCount == 1 && child.getAttribute('href').indexOf('puballb') > 0;
      if (isAuthor || isPublisher) {
        child.setAttribute('href','javascript:void(0);');
        child.removeAttribute('target');
        child.addEventListener('click', function(event) {
          $copyTextOfElement(this.innerText);
        });
      }
    });
  });

  var contents = document.querySelectorAll('.content');
  [].forEach.call(contents, function(content) {
      content.addEventListener('click', function(event) {
        $copyTextOfElement(this.innerText);
      });
  });

  $tooptip.show('準備就緒');
  setTimeout(function () {
    $tooptip.hide();
  }, 1000);
})();
