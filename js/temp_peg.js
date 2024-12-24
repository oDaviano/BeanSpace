var map 
var infowindow
var ii=0
 $(function () {



 });

$(document).ready(function() {
    var mapOptions = {
      scaleControl: true,
      logoControl: true,
      mapDataControl: false,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT
    },
      mapTypeControl: false,
      locationButtonEnable: true

      };
    var mapDiv = document.getElementById('map');
  map = new naver.maps.Map(mapDiv,mapOptions); 
  let markers=new Array();
  let infowindows = new Array();
 infowindow = new naver.maps.InfoWindow();
 if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
} else {
  var center = map.getCenter();
  // infowindow.setContent('<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>');
  // infowindow.open(map, center);
}

    
});



function onSuccessGeolocation(position) {
  var location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);

  map.setCenter(location); // 얻은 좌표를 지도의 중심으로 설정합니다.
  map.setZoom(15); // 지도의 줌 레벨을 변경합니다.

  // infowindow.setContent('<div style="padding:20px;">' + 'geolocation.getCurrentPosition() 위치' + '</div>');
  // infowindow.open(map, location);
     setOverlay();
  console.log('Coordinates: ' + location.toString());
}

function onErrorGeolocation() {
  var center = map.getCenter();

  // infowindow.setContent('<div style="padding:20px;">' +
  //     '<h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5>'+ "latitude: "+ center.lat() +"<br />longitude: "+ center.lng() +'</div>');

  // infowindow.open(map, center);

}


$(window).on("load", function() {
  // if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
  // } else {
  //     var center = map.getCenter();
  //     // infowindow.setContent('<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>');
  //     // infowindow.open(map, center);
  // }
});


function setOverlay(){
 let markers = new Array();

 fetch('/datas/data.json')
 .then((res) => res.json())
 .then((data) => {
  for(var i = 0;i<100;i++){
    var marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(data.records[i]["위도"],data.records[i]["경도"]),
      map: map
  });
  markers[i]=marker;
  var listener = naver.maps.Event.addListener(markers[i], 'click', function(e) {  
    console.log("클릭");
});
  }
 });


//  const getClickHandler = (index: number) => {
//   return () => {
//     if (infoWindows[index].getMap()) {
//       infoWindows[index].close();
//     } else if (mapRef.current !== null) {
//       infoWindows[index].open(mapRef.current, markers[index]);
//     }
//   };
// };



  
}