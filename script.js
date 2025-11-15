var isDown = true;
var images = ['LAEM7099.jpg', 'LAEM7079.jpg', 'LAEM6989.jpg', 'LAEM6976.jpg', 'IMG_2404.jpg', 'IMG_2316.jpg', 'IMG_1928.jpg', 'IMG_2072.jpg'];
var imgIndex = 0;
var delayFlag = 0;
var curWidth = window.innerWidth;
var imageUrl = "https://cdn.jsdelivr.net/gh/yar98/bearhuyen/image/";

var prefixThirdPagePro = imageUrl + "third-page/";
var prefixThirdPageOpti = imageUrl + "third-page-opti/";
var prefixThirdPage = prefixThirdPageOpti;

var prefixSecondPagePro = imageUrl + "second-page/";
var prefixSecondPageOpti = imageUrl + "second-page-opti/";
var prefixSecondPage = prefixSecondPageOpti;

var prefixFirstPagePro = imageUrl + "first-page/";
var prefixFirstPageOpti = imageUrl + "first-page-opti/";
var prefixFirstPage = prefixSecondPageOpti;

if (curWidth > 700) {
  prefixThirdPage = prefixThirdPagePro;
  prefixSecondPage = prefixSecondPagePro;
  prefixFirstPage = prefixFirstPagePro;
}

preloadImages();

function preloadImages() {
  images.map((value) => preloadImage(prefix + value));
  preloadImage(prefixSecondPage + "second-page.jpg");
  if (curWidth > 700) {
    preloadImage(imageUrl + "even-page/LAEM7074.jpg");
    preloadImage(imageUrl + "even-page/LAEM7093.jpg");
    preloadImage(imageUrl + "even-page/LAEM7103.jpg");
  }

}

function preloadImage(url) {
  var img = new Image();
  img.src = url;
}

function createHearts() {
  const heart = document.createElement('div');
  heart.classList.add('heart');

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";

  heart.innerText = '❤️';

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

function infiniteFadeOut(fadeTarget) {
  if (delayFlag > 0 && delayFlag < 150) {
    delayFlag += 1;
    return;
  }
  delayFlag = 0;
  if (imgIndex > images.length) imgIndex = 0;
  if (!fadeTarget.style.opacity) {
    fadeTarget.style.opacity = 1;
    fadeTarget.style.backgroundImage = "url('" + prefix + images[imgIndex++] + "')";
  }
  if (fadeTarget.style.opacity < 0) {
    fadeTarget.style.backgroundImage = "url('" + prefix + images[imgIndex++] + "')";
    fadeTarget.style.opacity = 0;
    isDown = false;
  } else if (fadeTarget.style.opacity > 1) {
    fadeTarget.style.opacity = 1.01;
    isDown = true;
    delayFlag += 1;
  }
  if (isDown) {
    fadeTarget.style.opacity = parseFloat(fadeTarget.style.opacity) - 0.01;
  }
  else {
    fadeTarget.style.opacity = parseFloat(fadeTarget.style.opacity) + 0.01;
  }
}

function multipleFadeOut(fadeTarget, secondFadeTarget) {
  infiniteFadeOut(fadeTarget);
}

function updateStyle(pages) {
  for (var i = 0; i < pages.length; i++) {
    var page = pages[i];
    if (i % 2 === 0) {
      page.style.zIndex = (pages.length - i);
    }
  }

  for (var i = 0; i < pages.length; i++) {
    pages[i].pageNum = i + 1;
    pages[i].onclick = function () {
      if (this.pageNum % 2 === 0) {
        this.classList.remove('flipped');
        this.previousElementSibling.classList.remove('flipped');
      }
      else {
        this.classList.add('flipped');
        this.nextElementSibling.classList.add('flipped');
      }
    }
  }

  var lastPage = document.getElementById('last-page');
  lastPage.onclick = function () {
    for (var i = 0; i < pages.length; i++) {
      pages[i].classList.remove('flipped');
    }
  }
}


document.addEventListener('DOMContentLoaded', function () {
  var pages = document.getElementsByClassName('page');
  updateStyle(pages);

  setInterval(createHearts, 700);

  var fadeTarget = document.getElementById("third-page-cover");
  setInterval(function () { multipleFadeOut(fadeTarget) }, 20);
})

