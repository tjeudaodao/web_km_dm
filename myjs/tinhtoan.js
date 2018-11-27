$(document).ready(function(){
	$("#timkiem").click(function(e){
		e.preventDefault();
		hienThi($("#barcode").val());
	});
	$("#timtheoMatong").click(function(e){
		e.preventDefault();
		locMatong();
	});
	$("#barcode").keypress(function(e){
		if (e.keyCode == 13) {
			hienThi($("#barcode").val());
		}
	})
	$("#textMatong").keypress(function(e){
		if (e.keyCode == 13) {
			locMatong();
		}
	})
});
// ham ajax lay ket qua khuyen mai
function hienThi(barcodeNhap){
	$.ajax({
                url : "lib/xulyKM.php",
                type : "GET",
                dataType:"JSON",
                data : {
                    barcode : barcodeNhap
                },
                success : function (result){
                	result = tinhToanKM(result);
                    $("#masanpham").html(result.matong);
                    $("#giachot").html(result.giagoc);
                    $("#sophantram").html(result.giagiam);
                    $("#mabarcode").html(barcodeNhap);
                    xoatext();
                } 
     });
}
function xoatext(){
	$("#barcode").val("");
}
function loadNgayCapNhat(){
	$("#modalLoad").modal("show");
	//setTimeout(function(){$("#modalLoad").modal("hide");},2000);
	$.ajax({
		url : "lib/layNgay.php",
		type : "GET",
		dataType : "text",
		data : {},
		success : function(ngay){
			$("#ngaycapnhat").html(ngay);
		}
	});

}
function tinhToanKM(thongso){
	if (thongso.matong == "0") {
		thongso.matong = 'Barcode có vấn đề';
		return thongso;
	}
	if (thongso.giagoc == "-") {
		thongso.giagoc = "Nguyên giá";
		$("#giachot").css("color","#4D3E6A");
		return thongso;
	}
	var giagiam = parseFloat(thongso.giagiam);
	var giagoc = parseFloat(thongso.giagoc);
	if (giagiam > 0 && giagiam < 1) {
		thongso.giagoc = (giagoc - giagoc*giagiam) + " đ";
		thongso.giagoc = chuyenso(thongso.giagoc);
		thongso.giagiam = "Giảm " + (giagiam*100) + "%";
		if (/30%$/.test(thongso.giagiam)) {
			$("#sophantram").css("color","#75DC74");
			//$("#am30").get(0).play();
		}
		else if (/40%$/.test(thongso.giagiam)) {
			$("#sophantram").css("color","#FFAE51");
			//$("#am40").get(0).play();
		}
		else if (/50%$/.test(thongso.giagiam)) {
			$("#sophantram").css("color","#FF5162");
			//$("#am50").get(0).play();
		}
		else{
			$("#sophantram").css("color","#4D3E6A");
		}
		$("#giachot").css("color","#4D3E6A");
	}
	else if (giagiam > 1) {
		thongso.giagoc = giagiam + " đ";
		thongso.giagoc = chuyenso(thongso.giagoc);
		thongso.giagiam = "Giảm " + ((((giagoc - giagiam)/giagoc)*100).toPrecision(3))+ "%";
		$("#giachot").css("color","#9D00A8");
		$("#sophantram").css("color","#4D3E6A");
		//$("#amDonggia").get(0).play();
	}
	return thongso;
}

// ham loc ma tong
function locMatong(){
	$.ajax({
		url : "lib/locmatong.php",
		dataType : "text",
		type : "GET",
		data : {
			kitu : $("#textMatong").val()
		},
		success : function(data){
			$("#bangKm").html(data);
		}
	});
}
// ham chuyen doi so nguyen sang sp co dau ngan cach phan nghin
function chuyenso(sovao,daungan='.'){
	var chuoiso = sovao.toString();
	var bieuthuc = /\B(?=(\d{3})+(?!\d))/g;
	return chuoiso.replace(bieuthuc,daungan);
}