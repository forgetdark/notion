javascript:(function(){
  if ($('.btn-copy').length == 0) {
    var style = document.createElement('style');
    style.innerHTML = `.tooltiptext {
      visibility: hidden;
      width: 100px;
      background-color: #555;
      color: #fff;
      text-align: center;
      padding: 5px 0;
      border-radius: 6px;
      position: fixed;
      z-index: 1;
      bottom: 3%;
      left: 5%;
      margin-left: -60px;
      opacity: 0;
      transition: opacity 0.3s;
      font-size: 13px;
    }
    .tooltiptext::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #555 transparent transparent transparent;
    }
    .tooltiptext_hover {
      visibility: visible;
      opacity: 1;
    }
    .btn-copy {
      cursor: pointer;
      color: #FFF;
      background: #ff9800;
      border: 0px;
      border-radius: 6px;
      padding: 3px 5px;
      margin: 5px;
      font-size: 13px;
    }`;
    document.body.appendChild(style);
    var tooltiptext = document.createElement('div'); 
    tooltiptext.innerHTML = '複製完成';
    tooltiptext.classList.add('tooltiptext');
    document.body.appendChild(tooltiptext);
    var info = '.product-detail-infosub-btn-area';
    var url = location.href;
    $(info).append('<button type="button" class="btn-copy" data-type="url" data-content="'+url+'">連結</button>');
    var cover = $('#preview img').attr('src');
    $(info).append('<button type="button" class="btn-copy" data-type="cover" data-content="'+cover+'">封面</button>');
    var thumbs = document.querySelectorAll('.product-detail-image-thumb-item');
    thumbs.forEach(function (thumb, index) {
      var img = $(thumb).data('src');
      $(info).append('<button type="button" class="btn-copy" data-type="thumbs" data-content="'+img+'">縮圖'+(index+1)+'</button>');
    });
    var description = $('.product-detail-comment-item').find('p').text();
    $(info).append('<button type="button" class="btn-copy" data-type="description" data-content="'+description+'">描述</button>');
    var title = $('.product-detail-desc-title').find('span').text();
    $(info).append('<button type="button" class="btn-copy" data-type="stripe" data-content="'+title+'">タイトル</button>');
    var stripe = document.querySelectorAll('.product-detail-spec-table tr');
    var object = [];
    stripe.forEach(function(item, index) {
      var th = item.children[0].innerText;
      var td = item.children[1].innerText;
      object[th] = td;
      $(info).append('<button type="button" class="btn-copy" data-type="stripe" data-content="'+td+'">'+th+'</button>');
    });
    $('.btn-copy').on('click', function (event) {
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
          document.querySelector('.tooltiptext').classList.add('tooltiptext_hover');
          setTimeout(function () {
            document.querySelector('.tooltiptext').classList.remove('tooltiptext_hover');
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
