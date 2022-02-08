javascript:(function(){
  var elementList = {
    'cover': {
      'link': '.sc-1u8nu73-18',
      'img': '.sc-1u8nu73-19'
    },
    'title': '.sc-1u8nu73-3',
    'description': '.sc-eyxzap-1',
    'content': '.sc-dIvrsQ',
    'author': '.sc-fujyAs',
    'date': '.sc-5981ly-0'
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
  } catch (error) {
    console.log('Oops!, unable to download');
  }
})();
