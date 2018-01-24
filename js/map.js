function initMap() {
  var uluru = {lat: 49.245246 , lng: 28.498625};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: uluru,
    scrollwheel: false,
    zoomControl: true

  });
  var infowindow = new google.maps.InfoWindow({
    content: "<img src='img/logo_new.png' alt='hotel'>"
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    title: "P-hotel"

  });
  infowindow.open(map, marker);
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
