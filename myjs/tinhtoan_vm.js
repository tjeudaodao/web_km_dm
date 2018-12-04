$(document).ready(function(){

	laysongayVM();
  	func_realtime();
  	real_trunghang();
  	real_filemoi();
  	objToancuc.soRandom = Math.floor((Math.random() * 100)+1);
    // su kien khi chon ngay tu select
    $("#chonngayVM").on('change', function(){
    	objToancuc.ngaychonVM = chuyenngaythanhso($(this).val());
        oluuMotaghichu = {};
        loadbangtheongaychon(objToancuc.ngaychonVM);
    });
    // su kien khi click chon dong trong bang
    $(document).on("click", "#bangVM tr", function(e) {
    	e.preventDefault();
    	var masp = $(this).attr("id");

        $("#chude").html($('#chude'+masp+'').html());
        $("#mota").html(oluuMotaghichu[masp].mota);
        $("#ghichu").html(oluuMotaghichu[masp].ghichu);
        $("#hienthimatongVM").html(masp);
        if($('#trangthai'+masp+' i').hasClass("fa-check-square")){
        	$("#hienthitrunghangVM").html('Đã Trưng Bán');
        	$("#mautrungbanVM").addClass("badge-success");
        }
        else {
        	$("#hienthitrunghangVM").html('Chưa Trưng Bán');
        	$("#mautrungbanVM").removeClass("badge-success");
        }
        if ($("#" + objToancuc.dongDaChon).length != 0){
        	$('#'+ objToancuc.dongDaChon+'').removeClass('maudongtr');
        }
        $(this).addClass('maudongtr');
        objToancuc.dongDaChon = masp;	
        hienanh(masp);
        
	});
	// su kien khi click vao nut trong bang
	$(document).on("click", "#bodytableVM .btn", function(e){
		e.stopPropagation();
		var maspbt = $(this).attr("name");
		var checkTrung = document.getElementById("checkHienthitrunghangVM");

		var trangthairef = db_2.ref().child('ngayduocban/' + objToancuc.ngaychonVM + '/' + maspbt + '/taikhoancnf/' + tencuahangVM);
		var realtime = db.ref().child('updatetrunghang/'+tencuahangVM);
		trangthairef.once('value', function(snapshottt){
			if (snapshottt.val().trangthaitrung == 'Đã Trưng Bán'){
				var update = {trangthaitrung : '-'};
				var updatereal = {
					id : { name : objToancuc.soRandom},
					masp : {
						tenma : maspbt,
						trangthai : ''
					},
					ngaychon : { tenngay : objToancuc.ngaychonVM}
				};
				trangthairef.update(update); // update thanh chua trung
				if ($('#trangthai'+maspbt+' i').hasClass('fa-check-square')){
					$('#trangthai'+maspbt+' i').removeClass('fa-check-square');
				}
				if ($("#mautrungbanVM").hasClass('badge-success')){
					$("#mautrungbanVM").removeClass("badge-success");
				}
				$("#hienthitrunghangVM").html('Chưa Trưng Bán');
				objToancuc.tangMachuatrung;
				laysomachuatrung();
				realtime.update(updatereal);
			}
			else {
				var update = {trangthaitrung : 'Đã Trưng Bán'};
				var updatereal = {
					id : { name : objToancuc.soRandom},
					masp : {
						tenma : maspbt,
						trangthai : 'Đã Trưng Bán'
					},
					ngaychon : { tenngay : objToancuc.ngaychonVM}
				};
				trangthairef.update(update); //update thanh da trung
				if ($('#trangthai'+maspbt+' i').hasClass('fa-check-square') == false){
					$('#trangthai'+maspbt+' i').addClass('fa-check-square');
				}
				if ($("#mautrungbanVM").hasClass('badge-success') == false){
					$("#mautrungbanVM").addClass("badge-success");
				}
				$("#hienthitrunghangVM").html('Đã Trưng Bán');
				if ( checkTrung.checked == true) {
					$('#'+maspbt+'').toggle();
				}
				objToancuc.giamMachuatrung;
				laysomachuatrung();
				realtime.update(updatereal);
			}
		});
		$("#hienthimatongVM").html(maspbt);

	})
	//su ken khi click vao nut loc ma tong
	$("#nhapmatong").keypress(function(e){
		if (e.keyCode == 13) {
			var kitu = $("#nhapmatong").val();
			if ( kitu != '' && kitu != null){
				oluuMotaghichu = {};
				loctheomatongVM(kitu);
			}
		}
	}) 
	$(".nuttimVM").click(function(){
		var kitu = $("#nhapmatong").val();
		console.log(kitu);
		if ( kitu != '' && kitu != null){
			oluuMotaghichu = {};
			loctheomatongVM(kitu);
		}
	});
	//checkbox hien thi so ma chua trung
	$("#checkHienthitrunghangVM").click(function(){
		checkmachuatrung();
	})
	// in bang danh muc theo ngay
	$("#btnIndanhmuc").click(function(){
		var ngaychon = chuyensothanhngay(ngaychonVM);
		var content = document.getElementById('bangVM');
		var wo = window.open("","","width= 1000,height= 720");
		wo.document.write('<html><head><style>@media print{.dontprint{display:none;}}</style><title>---hts---</title></head><body><center><h4>Danh mục ngày '+ngaychon+'</h4></center>') + '</body></html>';
		wo.document.write(content.outerHTML);
		wo.document.close();
		wo.focus();
		wo.print();
		wo.close();
	});
	// xuat excel
	$("#btnChonxuatexcel").click(function(){
		for (i = 0; i< kq.length ; i++){
			$("#xuatexcelFromVM, #xuatexcelToVM").append('<option>'+kq[i]+'</option>');
		} 
		loadexcel();
		$("#modalXuatexcelVM").modal('show');
	});
	$("#xuatexcelFromVM").on('change', function(){
		loadexcel()
	});
	$("#xuatexcelToVM").on('change', function(){
		loadexcel()
	});
	$(".btnxuatexcelVM").click(function(){
		taovainExcel($("#xuatexcelFromVM").val(), $("#xuatexcelToVM").val(), adata);
	});
	// xem thong bao
	$(".fixThongbao").click(function(){
		$("#modalThongbaoVM").modal('show');
	});
	// lam moi lai khu vuc thong bao
	$(".btnrefreshVM").click(function(){
		$("#gachthongbao").remove();
		$(".sothongbao").html('');
		$("#modalThongbaoVM").modal('hide');
	});
});
// khoi tao ket noi firebase, cac bien toan cuc
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
// firebase database thu 2
var config_2 = {
    apiKey: "AIzaSyAHo-uSUBHbaU4aRh-AVNN1mi2cAYe0F4U",
    authDomain: "danhmucvm-cnf-database.firebaseapp.com",
    databaseURL: "https://danhmucvm-cnf-database.firebaseio.com",
    projectId: "danhmucvm-cnf-database",
    storageBucket: "",
    messagingSenderId: "705045425427"
  };
var oFirebase_2 = firebase.initializeApp(config_2,"oFirebase_2");
const db_2 = oFirebase_2.database();
/* BLOCK cac bien toan cuc */
{
	let bienngaychon = "";
	let bienDongDaChon = '0';
	let biendemsoma = 0;
	let bienDemSoMaChuaTrung = 0;
	let bienThongbao = 0;
	let bienRandom = 0;

	var objToancuc = {
		get ngaychonVM() {
			return bienngaychon;
		},
		set ngaychonVM(val) {
			bienngaychon = val;
		},
		get dongDaChon() {
			return bienDongDaChon;
		},
		set dongDaChon(val) {
			bienDongDaChon = val;
		},
		get tongsoma() {
			return biendemsoma;
		},
		set tongsoma(val) {
			biendemsoma = val;
		},
		get tongmachuatrung() {
			return bienDemSoMaChuaTrung;
		},
		set tongmachuatrung(val) {
			bienDemSoMaChuaTrung = val;
		},
		get giamMachuatrung() {
			bienDemSoMaChuaTrung--;
		},
		get tangMachuatrung() {
			bienDemSoMaChuaTrung++;
		},
		get tangsoThongbao() {
			bienThongbao++;
		},
		get soThongbao(){
			return bienThongbao;
		},
		set soThongbao(val) {
			bienThongbao = val;
		},
		get soRandom() {
			return bienRandom;
		},
		set soRandom(val) {
			bienRandom = val;
		}
	};
}
var adata = [];
var kq = [];
var oluuMotaghichu = {};
/*
// cac function
*/
// ham chuyen chuoi dang yyyyMmdd sang dd-MM-yyyy
function chuyensothanhngay(sovao){
	var chuoiso = sovao.toString();
	var bieuthuc = /(\d{4})(\d{2})(\d{2})/g;
	return chuoiso.replace(bieuthuc,'$3-$2-$1');
}
function chuyenngaythanhso(ngayvao){
	var chuoiso = ngayvao.toString();
	var bieuthuc = /(\d{2})-(\d{2})-(\d{4})/g;
	return chuoiso.replace(bieuthuc,'$3$2$1');
}

function loadbangtheongaychon(ngaychon){
	objToancuc.tongsoma = objToancuc.tongmachuatrung = 0;
	var ngayref = db_2.ref().child('ngayduocban/' + ngaychon);
	ngayref.once('value', function(snapshot){
		$('#bodytableVM tr').remove();
		snapshot.forEach(function(masnapshot){
			var obluu = {};
			var thamso = '';
			var masp = masnapshot.key;

			objToancuc.tongsoma++;

			thamso += '<tr id="'+masp+'">';
			thamso += '<td>'+masp+'</td>';
			thamso += '<td id="chude'+masp+'">'+masnapshot.val().chude+'</td>';
			var trangthai = masnapshot.val().taikhoancnf[tencuahangVM].trangthaitrung;
			if(trangthai == 'Đã Trưng Bán'){
				thamso += '<td width="10%" id="trangthai'+masp+'"><i class="fas fa-check-square fa-2x"></i></td>';
			}
			else{
				thamso += '<td width="10%" id="trangthai'+masp+'"><i class="fas fa-2x"></i></td>';
				objToancuc.tongmachuatrung++;
			}
			thamso += '<td width="10%" class="dontprint"><button type="button" class="btn btn-warning" name="'+masp+'"><i class="fas fa-pen"></i></button></td>';
			
			thamso += '</tr>';
			$('#bodytableVM').append(thamso);
			obluu.mota = masnapshot.val().mota;
			obluu.ghichu = masnapshot.val().ghichu;
			oluuMotaghichu[masp] = obluu;
		});
		laysoluongma();
	});
}
// lay anh tu firestore
function hienanh(masp) {
	$(".loadinganh").show();
	$(".khunganh img").css('opacity', '0.2');
	 var storageRef = firebase.storage().ref();
	 storageRef.child('anhsanpham_cnf/' + masp + '.png').getDownloadURL().then(function(url) {
	     var test = url;
	     $("#anhsanphamVM").attr('src', test);

	 }).catch(function(error) {
	 	$("#anhsanphamVM").attr('src', "picture/totoro1.png");
	 });
	 setTimeout(loadingAnh, '1500');
}
// loading anh
function loadingAnh(){

    	$(".loadinganh").hide();
		$(".khunganh img").css('opacity', '1');
}

// lay so ngay co data
function laysongayVM(){
	var ngayref = db_2.ref().child('ngayduocban').orderByKey();
	ngayref.once('value', function(snap){
		snap.forEach(function(hsnap){
			kq.push(hsnap.key);
		});
		kq.sort(function(a, b){return b - a});
		for (i = 0; i< kq.length ; i++){
			$("#chonngayVM").append('<option>'+chuyensothanhngay(kq[i])+'</option>');
		}
		$("#taikhoandangnhap").html(tencuahangVM);

		objToancuc.ngaychonVM = kq[0];
		loadbangtheongaychon(kq[0]);
	});
}
// ham load khi khoi dong
function loadkhoidong(){
	//$("#modalloadVM").modal('show');
}
//realtime
function func_realtime(){
	
	var ngaymoinhatref = db.ref().child('thongso/ngaymoinhat');
	ngaymoinhatref.on('child_changed', function(snap){
		var ngayref = db_2.ref().child('ngayduocban').orderByKey();
		ngayref.once('value', function(csnap){
			kq = [];
			csnap.forEach(function(hsnap){
				kq.push(hsnap.key);
			});
			kq.sort(function(a, b){return b - a});
			if (snap.val() != kq[0]){
				$("#chonngayVM option").remove();
				for (i = 0; i< kq.length ; i++){
					$("#chonngayVM").append('<option>'+chuyensothanhngay(kq[i])+'</option>');
				} 
				addThongbao('Có danh mục mới');
				objToancuc.ngaychonVM = kq[0];
				loadbangtheongaychon(kq[0]);
				document.getElementById('checkHienthitrunghangVM').checked = false;
				notifi('Có danh mục mới !');
			}
			
		});
		
	});
}
// realtime file moi
function real_filemoi(){
	var filemoiref = db.ref().child('thongso/filemoi');
	filemoiref.on('value', function(data){
		addThongbao('File mới: '+data.val().tenfile);
		$('.tenfilemoinhatVM').html(data.val().tenfile);
		notifi('File cập nhật gần nhất:\n' + data.val().tenfile);
	});
}
function real_trunghang() {
	var trunghangref = db.ref().child('updatetrunghang/'+tencuahangVM);
	trunghangref.on('value', function(data){
		if (data.val().id.name != objToancuc.soRandom){
			addThongbao('Mã mới sửa: '+ data.val().masp.tenma +', thuộc ngày: '+ data.val().ngaychon.tenngay+'.');
			notifi('Vừa chỉnh sửa mã:\n'+ data.val().masp.tenma + '\nNgày: ' + data.val().ngaychon.tenngay );
		}
	});
}
// thongbao
//loc ma tong
function loctheomatongVM(kitu){
	objToancuc.tongsoma = objToancuc.tongmachuatrung = 0;
	var kituupper = kitu.toUpperCase();
	var ngayref = db_2.ref().child('ngayduocban');
	ngayref.once('value', function(snap){
		$('#bodytableVM tr').remove();
		snap.forEach(function(csnap){
			csnap.forEach(function(ccsnap){
				if (ccsnap.key.includes(kituupper)){
					objToancuc.tongsoma++;
					var obluu = {};
					var thamso = '';
					var masp = ccsnap.key;
					thamso += '<tr id="'+masp+'">';
					thamso += '<td>'+masp+'</td>';
					thamso += '<td id="chude'+masp+'">'+ccsnap.val().chude+'</td>';
					thamso += '<td>'+ccsnap.val().ngayduocban+'</td>';
					var trangthai = ccsnap.val().taikhoancnf[tencuahangVM].trangthaitrung;
					if(trangthai == 'Đã Trưng Bán'){
						thamso += '<td width="10%" id="trangthai'+masp+'"><i class="fas fa-check-square fa-2x"></i></td>';
					}
					else{
						thamso += '<td width="10%" id="trangthai'+masp+'"><i class="fas fa-2x"></i></td>';
						objToancuc.tongmachuatrung++;
					}
					thamso += '<td width="10%" ><button type="button" class="btn btn-warning" name="'+masp+'"><i class="fas fa-pen"></i></button></td>';
					
					thamso += '</tr>';
					$('#bodytableVM').append(thamso);
					obluu.mota = ccsnap.val().mota;
					obluu.ghichu = ccsnap.val().ghichu;
					oluuMotaghichu[masp] = obluu;
				}
			});
		});
		laysoluongma();
	});
}
// ham lay so luong ma 
function laysoluongma(){
	$("#somahangVM").html(objToancuc.tongsoma);
	$("#somachuatrungVM").html(objToancuc.tongmachuatrung);
}
//lay so ma chua trung
function laysomachuatrung(){
	$("#somachuatrungVM").html(objToancuc.tongmachuatrung);
}
// chi hien thi nhung ma chua trung hoac tat ca
function checkmachuatrung(){
	$("#bodytableVM tr").each(function(){
		if($(this).find("td i").hasClass("fa-check-square")){
		 	$(this).toggle();
		}
	})
}
//them thongbao moi 
function addThongbao(noidung){
	var ngaygio = new Date().toLocaleString();
	objToancuc.tangsoThongbao;
	$(".sothongbao").html(objToancuc.soThongbao);
	$("#gachthongbao").append('<li>'+ngaygio+': <strong class="text-secondary">' + noidung + '</strong></li>');
}
//notification web
function notifi(noidung){
	Notification.requestPermission().then(function(result) {
	  if (result === 'denied') {
	  	return ;
	  }
	  else {
	  	var options = {
	      body: noidung,
	      image: "picture/totoro1.png"
		};
		var n = new Notification('Thông báo cnf_hts !', options);
	  }
	}); 
}
//tao va in file excel
function taovainExcel(fromNgay, toNgay, data){
	var wb = XLSX.utils.book_new();
	wb.Props = {
            Title: "Thống kê danh mục trưng hàng",
            Subject: "Danh mục trưng hàng từ ngày "+fromNgay+" -- "+toNgay,
            Author: "---hts---",
            CreatedDate: new Date().toLocaleString()
    };
    wb.SheetNames.push("From "+fromNgay+"->"+toNgay);
    //var ws_data = [['hello' , 'world']];
    var ws_data = data;
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["From "+fromNgay+"->"+toNgay] = ws;
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
    function s2ab(s) { 
            var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
            var view = new Uint8Array(buf);  //create uint8array as viewer
            for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
            return buf;    
	}
	saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "Danh mục trưng hàng từ ngày "+fromNgay+" -- "+toNgay+'.xlsx');
}

// tao callback ham inexcel
function laydatakhiChonngay(ngaychon1, ngaychon2){
	var max = (ngaychon1 <= ngaychon2) ? ngaychon2 : ngaychon1;
	var min = (ngaychon1 >= ngaychon2) ? ngaychon2 : ngaychon1;
	//var adata = [];
	var mangtieude = ['Mã hàng','Mô tả', 'Chủ đề', 'Ghi chú', 'Ngày được bán'];
	adata.push(mangtieude);

	for (i = 0; i < kq.length ; i++){
		if (kq[i] >= min && kq[i] <= max){
			var ngayref = db_2.ref().child('ngayduocban/' + kq[i]);
			ngayref.once('value', function(snap){
				snap.forEach(function(data){
					var mangtam = [];
					mangtam.push(data.key, data.val().mota, data.val().chude, data.val().ghichu, data.val().ngayduocban);
					adata.push(mangtam);
				});
				
			});
		}
	}
}
// 
function loadexcel(){
	adata = [];
	var fromNgay = $("#xuatexcelFromVM").val();
	var toNgay = $("#xuatexcelToVM").val();
	laydatakhiChonngay(fromNgay, toNgay);
}
