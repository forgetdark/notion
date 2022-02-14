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
  if ($('.btn-copy').length == 0) {
    var style = document.createElement('style');
    style.innerHTML = `.btn-copy {
      cursor: pointer;
      color: #FFF;
      background: #18BD67;
      border: 0px;
      border-radius: 6px;
      padding: 3px 5px;
      margin: 5px;
      font-size: 13px;
    }`;
    document.body.appendChild(style);
    var info = '.info';
    var url = location.href;
    $(info).append('<button type="button" class="btn-copy" data-type="url" data-content="'+url+'">連結</button>');
    var coverEl = '';
    if ($('#main_new').length > 0) {
      coverEl = '#main_new';
    } else if ($('#special_main').length > 0) {
      coverEl = '#special_main';
    }
    var cover = $(coverEl).find('a').attr('href');
    $(info).append('<button type="button" class="btn-copy" data-type="cover" data-content="'+cover+'">封面</button>');
    var thumbs = document.querySelectorAll('.thumb_detail');
    thumbs.forEach(function (thumb, index) {
      var img = $(thumb).find('a').attr('href');
      $(info).append('<button type="button" class="btn-copy" data-type="thumbs" data-content="'+img+'">縮圖'+(index+1)+'</button>');
    });
    var descriptions = document.querySelectorAll('.richeditor');
    descriptions.forEach(function(item, index) {
      var description = $(item).find('p').text();
      $(info).append('<button type="button" class="btn-copy" data-type="description" data-content="'+description+'">描述'+(index+1)+'</button>');
    });
    var stripe = document.querySelectorAll('.odd');
    var object = [];
    stripe.forEach(function(item, index) {
      var th = item.children[0].innerText;
      var td = item.children[1].innerText;
      object[th] = td;
      $(info).append('<button type="button" class="btn-copy" data-type="stripe" data-content="'+td+'">'+th+'</button>');
    });
    $('.btn-copy').on('click', function (e) {
      var type = $(this).data('type');
      var copyMsg = '';
      switch(type) {
        default:
          copyMsg = $(this).data('content');
          break;
      };
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
    });
  }
})();
