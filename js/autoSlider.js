function createAutoSlider(slider) {
  function render() {
    var slides = slider.getElementsByClassName("slider__item");
    if (slideIndex !== -1) {
      slides[slideIndex].style.display = "none";
    }
    if (++slideIndex >= count) {
      slideIndex = 0;
    }
    slides[slideIndex].style.display = "block";
    setTimeout(render, 3000);
  }

  if (!slider ||
    !(slider instanceof HTMLElement) ||
    !slider.classList.contains("slider") ||
    !slider.querySelector(".slider__inner") ||
    !slider.getElementsByClassName("slider__item")) {
    console.error("This is not a slider");
    return;
  }
  var slideIndex = -1;
  var count = slider.getElementsByClassName("slider__item").length;
  render();
}