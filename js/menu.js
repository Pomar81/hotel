

function generateMenu(menuElement) {
  if(!menuElement || !(menuElement instanceof HTMLElement)) {
    console.error("This is not a menu element");
    return null;
  }
  var menu = menuElement;
  var fixedToTop = false;
  function init() {
    //***********************************************
    //this function provides using dropdown functionality
    //***********************************************

    // processing c-links
    var links = menu.querySelectorAll(".c-link");
    for (var i = 0; i < links.length; i++) {
      var curLink = links[i];
      curLink.addEventListener("click", function (evt) {

        if (this.classList.contains("c-menu__btn") &&
          this.nextElementSibling.classList.contains("c-menu-dropdown")) {
          evt.preventDefault();
          var curDropDown =  this.nextElementSibling;
          // it will close all not ancestors dropdowns if click on menu item
          if (!curDropDown.classList.contains("s-visible")) {
            curDropDown.classList.add("c-menu-dropdown-test");
            var dropdowns = menu.querySelectorAll(".c-menu-dropdown.s-visible");
            for (var i = 0; i < dropdowns.length; i++) {
              if (dropdowns[i].getElementsByClassName("c-menu-dropdown-test").length === 0)
                dropdowns[i].classList.remove("s-visible");
            }
            curDropDown.classList.remove("c-menu-dropdown-test");
          }
          curDropDown.classList.toggle("s-visible");
        } else {
          var dropdowns = menu.getElementsByClassName('c-menu-dropdown');
          for (var j = 0; j < dropdowns.length; j++) {
            dropdowns[j].classList.remove("s-visible");
          }
        }
      })
    }
  }
  function fixTop() {
    //****************************************************
    // this function provides fixing to top functionality
    //****************************************************
    var stickPoint = menu.offsetTop;
    window.addEventListener('scroll', function (evt) {
      var distance = menu.offsetTop - window.pageYOffset;
      var offset = window.pageYOffset;
      if ( (distance <= 0) && !fixedToTop) {
        menu.classList.add("s-fixed");
        fixedToTop = true;
      } else if (fixedToTop && (offset <= stickPoint)){
        menu.classList.remove("s-fixed");
        fixedToTop = false;
      }
    })

  }
  return {
    init  :init,
    fixTop  :fixTop
  };
}

