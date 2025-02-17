var basefee;
var basetime;
var utime;
var addfee;
var address;
var name;
var dummy = 5;
var rsvnum;

 
 $(function () {

	
 basefee=sessionStorage.getItem("basefee");
 basefee = Number(basefee);
  basetime=Number(sessionStorage.getItem("basetime"));
   utime=Number(sessionStorage.getItem("utime"));
    addfee=Number(sessionStorage.getItem("addfee"));
    address = sessionStorage.getItem("address");
    name = sessionStorage.getItem("name");
    
   dummy = 5;
      let ptime = document.getElementById('parking-time');
      let etime = document.getElementById('exit-time');
    let date = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8);
   	ptime.value = date;
   	etime.value = date
 	  ptime.setAttribute("min", date);
	 etime.setAttribute("min", date);
rsvnum = Math.floor(Math.random() * 89999000) + 10000000;
	$("#hrsvnum").val(rsvnum);
	$("#haddress").val(address); 
	$("#hfee").val(basefee + ((utime * 5 - basetime) * addfee));
	$("#hmileage").val(        (basefee + (utime * 5 - basetime) * addfee)*0.02);
	$("#hname").val(name);
console.log($("#hrsvnum").val());
	setFee();
 });
 
function setFee(){

$("#feeText").text("결제 금액: " + (basefee + ((utime * 5 - basetime) * addfee)) + "원");
 
 $("#mileageText").text("+"+((basefee + (utime * 5 - basetime) * addfee))*0.02 + "p");

 }
 

 
function setMinValue(){
     let ptime = document.getElementById('parking-time');
     let etime = document.getElementById('exit-time');

     if(etime.value<ptime.value){
     alert("주차 시간보다 이전으로 지정할 수 없습니다.")
         let date = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8);
        	ptime.value = date;
        	etime.value = date;
     }
}
