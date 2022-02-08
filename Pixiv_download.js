javascript:(function(){
  var elementList = {
    'title': '.sc-1u8nu73-3',
    'content': '.sc-dIvrsQ'
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
