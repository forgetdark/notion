
	$(function() {                       //run when the DOM is ready
    $(".filter-button").click(function() {  //use a class, since your ID gets mangled
      	$(".filter-button").removeClass('fltr-active');
				$(this).addClass('fltr-active');      //add the class to the clicked element
    });
  });


// 2) Reusable function to convert any string/text to css-friendly format
  var conv = function (str) {
    if (!str) {
        str = 'empty';
    }  return str.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '')
              .replace(/ /g, "-")
              .toLowerCase()
              .trim();
  };

// 3) Creating dynamic elements classes from its categories for filtering:
  var catArray = document.querySelectorAll('.w-dyn-item .filter-category');
  catArray.forEach( function(elem) {
    var text = elem.innerText || elem.innerContent;
    var className = conv(text);
    elem.parentElement.classList.add(className);
  });

// 4) Creating custom data-date attributes from blog dates:
  //var sortArray = document.querySelectorAll('.w-dyn-item .sort-category');
  //sortArray.forEach( function(sortElem) {
    //var sortText = sortElem.innerText || sortElem.innerContent;
    //sortElem.parentElement.parentElement.setAttribute('data-date', sortText);
 //});

// 5) Set the reference to the container. Use the class-name of your Collection List or ID of the Collection List
  var containerEl = document.querySelector('.item-collection-list');

// 6) Call the MixitUp plugin
  mixitup(containerEl);

