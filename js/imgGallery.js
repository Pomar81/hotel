function ImgGallery(param) {
  this._params = param || {};
  this._data = null;
  this._colNum = 4;
  this._params.parent = this._params.parent || document.getElementsByTagName("main")[0];
  this._params.filterArr = this._params.filterArr || null;

}

ImgGallery.prototype.init = function () {
  var that = this;
  var xhr = new XMLHttpRequest();
  var url = "data/gallery.json"
  xhr.overrideMimeType("application/json");
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4)
      if (xhr.status == "200") {

        try {
          that._data = JSON.parse(xhr.responseText);
        } catch (e) {
          console.error("gallery data are invalid")
          that._data = null;
        }
        if (that._data) {
          that._renderCommon();
          that._renderImgs();
          that._rearrangeImgs();
          window.addEventListener("resize", that._throttle(that._resize, 500), false);
        }
      }
      else {
        console.error("Can't get gallery data: " + xhr.status + " " + xhr.statusText);
      }
  };
  xhr.send(null);
}

ImgGallery.prototype._renderCommon = function () {

  if (this._params.filterArr) {
    // create filters container
    var fltDiv = document.createElement("div");
    fltDiv.classList.add("img-filters");

    // create filters buttons
    var btnFlt = document.createElement("button");
    btnFlt.type = "button";
    btnFlt.classList.add("img-filter");
    btnFlt.innerText = "All";
    btnFlt.addEventListener("click", this._filterWrapper(), false);
    fltDiv.appendChild(btnFlt);
    for (var i = 0; i < this._params.filterArr.length; i++) {
      btnFlt = document.createElement("button");
      btnFlt.type = "button";
      btnFlt.innerHTML = this._params.filterArr[i];
      btnFlt.addEventListener("click", this._filterWrapper(this._params.filterArr[i]), false);
      fltDiv.appendChild(btnFlt);
    }
    this._params.parent.appendChild(fltDiv);
  }
  //create gallery container
  var galDiv = document.createElement("div");
  galDiv.classList.add("img-gallery__items");
  this._params.parent.appendChild(galDiv);

  //create modal window
  var modal = document.createElement("div");
  modal.classList.add("img-modal");
  modal.style.display = "none";
  var modalInner = document.createElement("div");
  modalInner.classList.add("img-gallery__inner");
  var modalImg = document.createElement("img");
  modalImg.classList.add("image-fluid");
  var modalTitle = document.createElement("h2");
  var closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.innerHTML = "close";
  closeBtn.classList.add("img-modal__close");
  modalInner.appendChild(modalImg);
  modalInner.appendChild(modalTitle);
  modalInner.appendChild(closeBtn);
  modal.appendChild(modalInner);
  modal.addEventListener("click", this._closeModal, false);

  window.addEventListener("keydown", this._closeModal.bind(modal), false);
  document.body.insertBefore(modal, document.querySelector(".page-footer"));
}

ImgGallery.prototype._renderImgs = function (filter) {
  var container = document.querySelector(".img-gallery__items");
  container.innerHTML = "";
  // delete all images


  for (var i = 0; i < this._data.length; i++) {
    if (!filter || filter === this._data[i].group) {
      //create img container
      var imgDiv = document.createElement("div");
      imgDiv.classList.add("img-gallery__item");
      //create image
      var img = document.createElement("img");
      img.src = this._data[i].img;
      img.classList.add("image-fluid");
      img.addEventListener("click", this._selectImage, false);
      imgDiv.appendChild(img);
      //create img title
      var header = document.createElement("h2");
      header.innerHTML = this._data[i].title;
      imgDiv.appendChild(header);
      // arrange img to container
      container.appendChild(imgDiv);
    }
  }
}

ImgGallery.prototype._rearrangeImgs = function () {

  var container = document.querySelector(".img-gallery__items");
  var items = container.querySelectorAll(".img-gallery__item");
  if (!items.length)
    return;
  this._colNum = Math.trunc(container.clientWidth / items[0].offsetWidth);
  container.innerHTML = "";

  // create columns
  for (i = 0; i < this._colNum; i++) {
    var colDiv = document.createElement("div");
    colDiv.classList.add("img-gallery__col");
    container.appendChild(colDiv);
  }
  // arrange items to columns
  var columns = container.querySelectorAll(".img-gallery__col");
  for (var i = 0, j = 0; i < items.length; i++) {
    // arrange img to columns
    columns[j].appendChild(items[i]);
    if (++j === columns.length) {
      j = 0;
    }
  }
}

// ***** Event handlers ****

ImgGallery.prototype._resize = function () {
  var container = document.querySelector(".img-gallery__items");
  var item = container.querySelector(".img-gallery__item");
  if (item) {
    if (Math.trunc(container.clientWidth / item.offsetWidth) !== this._colNum) {
      this._rearrangeImgs();
    }
  }
}
ImgGallery.prototype._throttle = function (f, delay) {
  var execEn = true;
  var execAfter = false;
  var agrsMem = null;
  var that = this;
  var thatMem = null;

  function delayedExec() {
    if (!execEn) {
      execAfter = true;
      argsMem = arguments;
      thatMem = that;
      return;
    }
    if (execEn) {
      f.apply(that, arguments);
      execEn = false;
      setTimeout(function () {
        execEn = true;
        if (execAfter) {
          delayedExec.apply(thatMem, agrsMem);
          thatMem = argsMem = null;
          execAfter = false;
        }
      }, delay);
    }
  }

  return delayedExec;
}

//
ImgGallery.prototype._filterWrapper = function (filter) {
  var that = this;
  return function (event) {
    console.log("test");
    ImgGallery.prototype._renderImgs.call(that, filter);
    ImgGallery.prototype._rearrangeImgs.call(that);
  };

}

ImgGallery.prototype._closeModal = function (event) {
  if ((event.type === "keydown" && event.keyCode === 27) ||
    (event.type === "click" && ((event.target === this) || event.target === this.querySelector(".img-modal__close"))))
    this.style.display = "none";
}

ImgGallery.prototype._selectImage = function (event) {
  var modal = document.querySelector(".img-modal");
  if (modal) {
    var modalImg = modal.getElementsByTagName("img")[0];
    modalImg.src = this.src;
    modalImg.nextElementSibling.innerHTML = this.nextElementSibling.innerHTML;
    modal.style.display = "";
  }
}


// implementation
var imgGal = new ImgGallery(
  {
    parent: document.getElementsByClassName("img-gallery")[0],
    filterArr: ["rooms", "events"]
  });
imgGal.init();