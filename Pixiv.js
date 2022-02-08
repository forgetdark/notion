javascript:(function(){
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
    bottom: 5%;
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
  }`;
  document.body.appendChild(style);
  var tooltiptext = document.createElement('div'); 
  tooltiptext.innerHTML = '複製完成';
  tooltiptext.classList.add('tooltiptext');
  document.body.appendChild(tooltiptext);
  var elementList = {
    'cover': {
      'link': '.sc-1u8nu73-18',
      'img': '.sc-1u8nu73-19'
    },
    'title': '.sc-1u8nu73-3',
    'description': '.sc-eyxzap-1',
    'content': '.sc-dIvrsQ'
  };
  var copy = function (copyMsg) {
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
  }
  for (const [key, el] of Object.entries(elementList)) {
    if (key == 'cover') {
      document.querySelector(elementList.cover.link).setAttribute('href','javascript:void(0);');
      document.querySelector(elementList.cover.link).removeAttribute('target');
      document.querySelector(el.link).addEventListener('click', function(event){
        copy(document.querySelector(el.img).getAttribute('src'));
      });
    } else {
      document.querySelector(el).addEventListener('click', function(event){
        copy(document.querySelector(el).innerText);
      });
    }
  }
})();
