document.addEventListener('DOMContentLoaded', function(){
  var elm = document.querySelector('.pagination');

// model
  function saveData(){
    var arr = [];

    for (var i = 0; i < 100; i++) {
      arr[i] = 'room' + i;
    }
    localStorage.setItem('rooms', JSON.stringify(arr));
  }

  saveData();

//callback
  function getRooms(index) {
    var partArr = JSON.parse(localStorage.getItem('rooms')).slice((index-1)*10, (index-1)*10 + 10);
    console.log(partArr);
  }

  new Pagination(elm,
    {
      _cb: getRooms
    });
}, false);


