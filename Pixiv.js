javascript:(function(){
  var el_list = {
    'cover': {
      'link': '.sc-1u8nu73-18',
      'img': '.sc-1u8nu73-19'
    },
    'title': '.sc-1u8nu73-3',
    'description': '.sc-eyxzap-1',
    'content': '.sc-dIvrsQ'
  };
  try {
    var copy_msg = location.href;
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
  document.querySelector(el_list.cover.link).setAttribute('href','javascript:void(0);');
  document.querySelector(el_list.cover.link).removeAttribute('target');
  for (const [key, el] of Object.entries(el_list)) {
    if (key == 'cover') {
      document.querySelector(el.link).addEventListener('click', function(event){
        try {
          var copy_msg = document.querySelector(el.img).getAttribute('src');
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
    } else {
      document.querySelector(el).addEventListener('click', function(event){
        try {
          var copy_msg = document.querySelector(el).innerText;
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
  }
})();
