$(document).ready(function(){
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

	$("#dangnhap").click(function(){
		dangnhap();
	});

});
var config = {
	    apiKey: "AIzaSyCOGDXN1l6QPZR32GgWxY_a0tlH1LkEq-4",
	    authDomain: "danhmucvm-cnf.firebaseapp.com",
	    databaseURL: "https://danhmucvm-cnf.firebaseio.com",
	    projectId: "danhmucvm-cnf",
	    storageBucket: "danhmucvm-cnf.appspot.com",
	    messagingSenderId: "937382425861"
	  	};
	  	firebase.initializeApp(config);
	  	const db = firebase.database();
function dangnhap(){
	var tencuahang = $("#tendangnhap").val().toLowerCase();
	var passIn = $("#matkhaudangnhap").val();
	var taikhoanref = db.ref().child('dangnhap/taikhoan/' + tencuahang);
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