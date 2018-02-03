function Pagination(elm, data) {
  data = data || {};
  this.size = data.size || 10;
  this.step = data.step || 2;
  this.cb = data.cb || null;
  this.elm = elm;
  this.page = 1;
  this._init();
}

Pagination.prototype._init = function() {
  if (this.elm) {
    this.elm.innerHTML =
      '<a>&#9668;</a>' +  // previous
      '<span></span>' +   // container
      '<a>&#9658;</a>'    // next
    var a = this.elm.getElementsByTagName('a');
    a[0].addEventListener('click', this._prev.bind(this), false);
    a[1].addEventListener('click', this._next.bind(this), false);
    this._calc();
    this.cb(this.page);
  }

}

Pagination.prototype._calc = function() {
  if (this.size < this.step * 2 + 1) {
    this._render(1, this.size);
  } else if (this.page + this.step > this.size) {
    this._render(this.size - 2 * this.step, this.size)
  } else if (this.page - this.step < 1) {
    this._render(1, this.step * 2 + 1);
  } else {
    this._render(this.page - this.step, this.page + this.step);
  }
}

Pagination.prototype._render = function(start, end) {
  var span = this.elm.getElementsByTagName('span')[0];
  span.innerHTML = '';
  for (var i = start; i <=end; i++) {
    var a = document.createElement('a');
    a.innerHTML = i;
    if (i === this.page) {
      a.classList.add('active');
    }
    a.addEventListener('click',this._click.bind(this) ,false)
    span.appendChild(a);
  }
}

Pagination.prototype._next = function() {
  if (this.page < this.size) {
    this.page++;
    this._calc();
    this.cb(this.page);
  }
}

Pagination.prototype._prev = function() {
  if (this.page > 1) {
    this.page--;
    this._calc();
    this.cb(this.page);
  }
}

Pagination.prototype._click = function(evt) {
  var newPage = +evt.target.innerHTML;
  if (newPage !== this.page) {
    this.page = newPage;
    this._calc();
    this.cb(this.page);
  }

}