document.addEventListener('DOMContentLoaded', function(){
  var pageNav = generateMenu(document.querySelector('.page-header__nav'));
  if(pageNav) {
    pageNav.init();
    pageNav.fixTop();
  }

  createGrabSlider(document.querySelector('.room-overview .gallery'));
  createGrabSlider(document.querySelector('.response .slider'));
  createAutoSlider(document.querySelector('.promo-slider .slider'));
});

