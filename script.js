
var isOpen = false;

document.addEventListener('DOMContentLoaded', function () {
  var pages = document.getElementsByClassName('page');
  var book = document.getElementsByClassName('book')[0];
  for (var i = 0; i < pages.length; i++) {
    var page = pages[i];
    if (i % 2 === 0) {
      page.style.zIndex = (pages.length - i);
    }
  }
  book.onclick = function () {
    if (isOpen) {
      pages[0].classList.remove('flipped');
      pages[1].classList.remove('flipped');
    }
    else {
      pages[0].classList.add('flipped');
      pages[1].classList.add('flipped');
    }
    isOpen = !isOpen;
  }
})