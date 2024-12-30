var map ;
var infowindow;
var popup;
var data;
let oldsel
var datas = [];
 $(function () {
  if($(".popup").length){
    popup = $(".popup");
    popup.find('#button_cancel').click(function(){
      popup.removeClass("open")
    });
  }
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
 // infowindow.open(map, center);
 
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
  var location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //  map.setCenter(location); // 얻은 좌표를 지도의 중심으로 설정합니다.
   map.setZoom(15); // 지도의 줌 레벨을 변경합니다.
}

function onErrorGeolocation() {
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

function facSearch(){
  let count=0;
  var keyword;


}


