javascript:(function(){
  if ($('.btn-copy').length == 0) {
    var style = document.createElement('style');
    style.innerHTML = `.btn-copy {
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
