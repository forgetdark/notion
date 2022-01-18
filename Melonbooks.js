javascript:(function(){
  var url = location.href;
  var cover = $('#main_new a').attr('href');
  var thumbs_list = [];
  var thumbs = document.querySelectorAll('.thumb_detail');
  thumbs.forEach(function (thumb, index) {
      thumbs_list.push($(thumb).find('a').attr('href'));
  });
  var description = $('#description').find('p').html();
  var stripe = document.querySelectorAll('.odd');
  var object = [];
  stripe.forEach(function(item, index) {
      var th = item.children[0].innerText;
      var td = item.children[1].innerText;
      object[th] = td;
  });
});
