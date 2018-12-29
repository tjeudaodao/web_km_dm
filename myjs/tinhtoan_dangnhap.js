$(document).ready(function(){
	/*  phan dang nhap
	$("#tendangnhap").keypress(function(e){
		if (e.keyCode == 13){
			$("#matkhaudangnhap").val('').focus();
		}
	});
	$("#matkhaudangnhap").keypress(function(e){
		if (e.keyCode == 13){
			dangnhap();
		}
	});
	*/
	$("#modalDangNhapVm").on("shown.bs.model", loadTenCuaHang());
	$("#dangnhap").click(function(){
		dangnhap($("#choncuahangVM").val());
	});

});
var config_dn = {
	    apiKey: "AIzaSyCOGDXN1l6QPZR32GgWxY_a0tlH1LkEq-4",
	    authDomain: "danhmucvm-cnf.firebaseapp.com",
	    databaseURL: "https://danhmucvm-cnf.firebaseio.com",
	    projectId: "danhmucvm-cnf",
	    storageBucket: "danhmucvm-cnf.appspot.com",
	    messagingSenderId: "937382425861"
	  	};
firebase.initializeApp(config_dn);
const db_dn = firebase.database();
/* function dangnhap
function dangnhap(){
	var tencuahang = $("#tendangnhap").val().toLowerCase();
	var passIn = $("#matkhaudangnhap").val();
	var taikhoanref = db_dn.ref().child('dangnhap/taikhoan/' + tencuahang);
	if (tencuahang != null && tencuahang != '') {
		taikhoanref.once('value').then(function(snapshot){
			if (snapshot.val() == null){
				alert("Tài khoản hoặc mật khẩu không chính xác.");
				$("#matkhaudangnhap").val('');
				$("#tendangnhap").val('').focus();
			}
			else {
				if (passIn == snapshot.val().pass) {
					$.ajax({
		                url : "lib/dangnhap.php",
		                type : "GET",
		                dataType:"TEXT",
		                data : {
		                    tendangnhap : tencuahang
		                },
		                success : function (result){
		                	window.location.href= "danhmucVM.php";
		                } 
				     });
				}
				else {
					alert("Tài khoản hoặc mật khẩu không chính xác.");
					$("#matkhaudangnhap").val('');
					$("#tendangnhap").val('').focus();
				}
			}
		});
	}
}
*/
function loadTenCuaHang(){
	var tencuahang = db_dn.ref().child('dangnhap/taikhoan').orderByKey();
	tencuahang.once('value', function(snap){
		snap.forEach(function(hsnap){
			$("#choncuahangVM").append('<option>'+hsnap.key+'</option>');
		})
	});
}
function dangnhap(tencuahang){
	$.ajax({
        url : "lib/dangnhap.php",
        type : "GET",
        dataType:"TEXT",
        data : {
            tendangnhap : tencuahang
        },
        success : function (result){
        	window.location.href= "danhmucVM.php";
        } 
     });
}