javascript:(function(){
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
document.querySelector('.lfwBiP').addEventListener('click', function(event){
  try {
    var copy_msg = document.querySelector('.lfwBiP').innerText;
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
document.querySelector('.llrjLt').addEventListener('click', function(event){
  try {
    var copy_msg = document.querySelector('.llrjLt').innerText;
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
document.querySelector('.leiCDy').addEventListener('click', function(event){
  try {
    var copy_msg = document.querySelector('.leiCDy').innerText;
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
})();
