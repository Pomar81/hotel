function createGrabSlider(slider) {

  function fixStartX(event) {
    event.preventDefault();
    var slideSize = inner.querySelector('.slider__item').offsetWidth;
    var windowSize = Math.round(inner.offsetWidth / slideSize);
    maxOffsetLeft = (windowSize - count) * slideSize;
    mouseStartX = event.clientX;
    inner.style.cursor = "grabbing";
    startOffset = -position * slideSize;
    state = 1;
  }

  function moveSlide(event) {
    var distance;
    var translateStr;
    if (state === 1) {
      distance = event.clientX - mouseStartX + startOffset;
      if (distance < 0)
        endOffset = Math.max(maxOffsetLeft, distance)
      else {
        endOffset = Math.min(0, distance);
      }
      inner.style.transform = "translateX(" + endOffset + "px)";
    }

  }

  function fixEndX(event) {
    if (state === 1) {
      var slideSize = inner.querySelector('.slider__item').offsetWidth;
      position = Math.round(-endOffset / slideSize);
      endOffset = -position * slideSize;
      inner.style.transform = "translateX(" + endOffset + "px)";
      console.log("position: " + position);
      inner.style.cursor = "";
      state = 0;
    }
  }

  function update(event) {
    var slideSize = inner.querySelector('.slider__item').offsetWidth;
    endOffset = -position * slideSize;
    inner.style.transform = "translateX(" + endOffset + "px)";
  }

  if (!slider ||
      !(slider instanceof HTMLElement) ||
      !slider.classList.contains("slider") ||
      !slider.querySelector(".slider__inner")) {
    console.error("This is not a slider");
    return;
  }

  var inner = slider.querySelector(".slider__inner");
  var count = inner.getElementsByClassName("slider__item").length;
  var position = 0;
  var maxOffsetLeft;
  var mouseStartX;
  var state = 0;
  var endOffset;
  var startOffset;


  inner.addEventListener("mousedown", fixStartX, false);
  window.addEventListener("mousemove", moveSlide, false);
  window.addEventListener("mouseup", fixEndX, false);
  window.addEventListener("resize", update, false);

}