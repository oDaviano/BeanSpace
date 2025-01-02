var map ;
var infowindow;
var popup;
var data;
let oldsel
var datas = [];
let searchKeyword;
var oldVal;
const clientID ="xMNXsGUYhQ4rJ5iYH0os";
const clientSecret="Nhz6Qp0Uwg";

 $(function () {
  if($(".popup").length){
    popup = $(".popup");
    popup.find('#button_cancel').click(function(){
      popup.removeClass("open")
    });
  }

  $('#search_name').on("propertychange change keyup paste input", function() {//주소 검색
     searchKeyword = $(this).val();
    if(searchKeyword== oldVal) {
        return;
    }
    oldVal = searchKeyword;
  });
  $('#button_search').click(function(){
    facsearch();
/*키워드 검색기능-현재 동작 불가, 차후 확인 후 교체 혹은 제거
const query = searchKeyword;
const apiURL = "https://naveropenapi.apigw.ntruss.com/map-place/v1/search";

$.ajax({
url:apiURL,
type:"GET",
headers: {
  "X-NCP-APIGW-API-KEY-ID": clientID,
  "X-NCP-APIGW-API-KEY": clientSecret
},
data:{
  query: query
},
success: function (response) {
  // 결과 처리
  const places = response.places;
  if (places.length > 0) {
      const firstPlace = places[0];
      const name = firstPlace.name;
      const x = firstPlace.x; // 경도
      const y = firstPlace.y; // 위도
      const roadAddress = firstPlace.road_address;

   console.log(name);
  } else {

  }
},
error: function (xhr, status, error) {
  console.error("API 호출 오류:", error);
}

})
*/

  });
 });

$(document).ready(function() {
    var mapOptions = {
      scaleControl: true,
      logoControl: false,
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

  btnHtml = '<img src="/assets/images/location.png" width=40px height=40px>',
  naver.maps.Event.once(map, 'init', function() {
    //customControl 객체 이용하기
    var customControl = new naver.maps.CustomControl(btnHtml, {
        position: naver.maps.Position.TOP_LEFT
    });

    customControl.setMap(map);

    naver.maps.Event.addDOMListener(customControl.getElement(), 'click', function() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
        } else {
          var center = map.getCenter();
        }     
    });
});

 if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
} else {
  var center = map.getCenter();
}

setOverlay(fetchedData=> {
var name = popup.find("#facname");
  var address= popup.find("#address");
  var fee= popup.find("#fee");
  var category= popup.find("#category");
  for(let i = 0;i<20;i++){

    datas.push(data.records[i]);
    var CustomOverlay = function(options) {

        this._element = $('<div id="customoverlay">'
          +data.records[i]["주차장명"]+'</div>');
      this.setPosition(options.position);
      this.setMap(options.map || null);
    };

    CustomOverlay.prototype = new naver.maps.OverlayView();
    CustomOverlay.prototype.constructor = CustomOverlay;
    
    CustomOverlay.prototype.onAdd = function() {
        var overlayLayer = this.getPanes().overlayLayer;
        this._element.appendTo(overlayLayer);
        this._element.on('click', function(e) {
          e.stopPropagation(); // 이벤트 전파 차단
      popup.addClass("open")
       name.text(datas[i]["주차장명"]);
       if(datas[i]["소재지도로명주소"]==""){
    address.text(data.records[i]["소재지지번주소"]);
       }
       else{
        address.text(datas[i]["소재지도로명주소"]);
       }
      if(datas[i]["요금정보"]=="무료"){
        fee.text("무료");
      }
      else{
        fee.text(datas[i]["주차기본요금"]+"원, "
      +datas[i]["주차기본시간"]+"분 이후 "+datas[i]["추가단위시간"]+"분마다 "+datas[i]["추가단위요금"]+"원");
      }

      category.text(datas[i]["주차장구분"]);     
        
      if(oldsel!=null){
        $(oldsel).removeClass('selected')
      }
      oldsel = this;
      $(oldsel).addClass('selected')
      });

 
    };
    
    CustomOverlay.prototype.draw = function() {
        // 지도 객체가 설정되지 않았으면 draw 기능을 하지 않습니다.
        if (!this.getMap()) {
            return;
        }
        // projection 객체를 통해 LatLng 좌표를 화면 좌표로 변경합니다.
        var projection = this.getProjection();
        var position = this.getPosition();
        var pixelPosition = projection.fromCoordToOffset(position);
    
        var elementWidth = this._element.outerWidth();
        var elementHeight = this._element.outerHeight();


        this._element.css('left', pixelPosition.x - elementWidth/2+'px');
        this._element.css('top', pixelPosition.y - elementHeight-40+'px');
        this._element.css('pointer-events', 'auto');
        this._element.css('z-index',100);
    };
    
    CustomOverlay.prototype.onRemove = function() {
        this._element.remove();
        // 이벤트 핸들러를 설정했다면 정리합니다.
        this._element.off();
    };
    
    CustomOverlay.prototype.setPosition = function(position) {
        this._position =position;
        this.draw();
    };
    
    CustomOverlay.prototype.getPosition = function() {
        return this._position;
    };

    let marker =new CustomOverlay({
        position: new naver.maps.LatLng(datas[i]["위도"],datas[i]["경도"]),
        map:map,
        zIndex:100
        
      });

  }
});
});


function onSuccessGeolocation(position) {
  var location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);//내위치로 이둥
    map.setCenter(location); // 얻은 좌표를 지도의 중심으로 설정합니다.
   map.setZoom(15); // 지도의 줌 레벨을 변경합니다.
}

function onErrorGeolocation(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
        console.error("사용자가 위치 정보 제공을 거부했습니다.");
        break;
    case error.POSITION_UNAVAILABLE:
        console.error("위치 정보를 사용할 수 없습니다.");
        break;
    case error.TIMEOUT:
        console.error("요청 시간이 초과되었습니다.");
        break;
    default:
        console.error("알 수 없는 오류가 발생했습니다.");
        break;
}
  
  var center = map.getCenter();
}

$(window).on("load", function() {
});

 function setOverlay(callback){

 fetch('/datas/data.json')
 .then((res) => res.json())
 .then((jsonData) => {

  data = jsonData;
callback(data);
 });  

}

function facsearch(){
  naver.maps.Service.geocode({
    query: searchKeyword
}, function(status, response) {
    if (status !== naver.maps.Service.Status.OK) {
        return alert('Something wrong!');
    }
    var result = response.v2, // 검색 결과의 컨테이너
        items = result.addresses; // 검색 결과의 배열
if(items.length==1){
        var location = new naver.maps.LatLng(items[0]["y"], items[0]["x"]);//해당 주소 좌표로 이동후 확대
           map.setCenter(location);
           map.setZoom(15);
}else{
  alert("정확한 주소로 검색");
}

});

}


