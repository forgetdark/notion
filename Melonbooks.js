javascript:(function(){
  if ($('.btn-copy').length == 0) {
    $('body').append('<style>.btn-copy {cursor:pointer;color:#FFF;background:#338a41;border:0px;padding:3px 5px;margin:5px;}</style>');
    var info = '.info';
    var url = location.href;
    $(info).append('<button type="button" class="btn-copy" data-type="url" data-content="'+url+'">連結</button>');
    var cover_el = '';
    if ($('#main_new').length > 0) {
      cover_el = '#main_new';
    } else if ($('#special_main').length > 0) {
      cover_el = '#special_main';
    }
    var cover = $(cover_el).find('a').attr('href');
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
    $('.btn-copy').on('click', function (event) {
      var type = $(this).data('type');
      var copy_msg = '';
      switch(type) {
        default:
          copy_msg = $(this).data('content');
          break;
      };
      try {
        navigator.clipboard.writeText(copy_msg)
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
