$(document).ready(function(){
	//load dau tien, load ngay moi nhat show bang du lieu
	//laysongayVM();
/*	$('#modalloadVM').on('hidden.bs.modal', function () {
    	func_realtime();
	})
 */ 
    //nhapfirebase();
    // su kien khi chon ngay tu select
    $("select").on('change', function(){
    	ngaychonVM = chuyenngaythanhso($(this).val());
        oluuMotaghichu = {};
        loadbangtheongaychon(ngaychonVM);
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
        if ($("#" + dongDaChon).length != 0){
        	$('#'+dongDaChon+'').removeClass('maudongtr');
        }
        $(this).addClass('maudongtr');
        dongDaChon = masp;	
        hienanh(masp);
        
	});
	// su kien khi click vao nut trong bang
	$(document).on("click", "#bodytableVM .btn", function(e){
		e.stopPropagation();
		var maspbt = $(this).attr("name");
		$("#hienthimatongVM").html(maspbt);
		var trangthairef = db.ref().child('ngayduocban/' + ngaychonVM + '/' + maspbt + '/taikhoancnf/' + tencuahangVM);
		var realtime = db.ref().child('updatetrunghang/'+tencuahangVM);
		trangthairef.once('value', function(snapshottt){
			if (snapshottt.val().trangthaitrung == 'Đã Trưng Bán'){
				var update = {trangthaitrung : ''};
				var updatereal = {
					id : { name : 50000},
					masp : {
						tenma : maspbt,
						trangthai : ''
					},
					ngaychon : { tenngay : ngaychonVM}
				};
				trangthairef.update(update); // update thanh chua trung
				if ($('#trangthai'+maspbt+' i').hasClass('fa-check-square')){
					$('#trangthai'+maspbt+' i').removeClass('fa-check-square');
				}
				if ($("#mautrungbanVM").hasClass('badge-success')){
					$("#mautrungbanVM").removeClass("badge-success");
				}
				$("#hienthitrunghangVM").html('Chưa Trưng Bán');
				realtime.update(updatereal);
			}
			else {
				var update = {trangthaitrung : 'Đã Trưng Bán'};
				var updatereal = {
					id : { name : 50000},
					masp : {
						tenma : maspbt,
						trangthai : 'Đã Trưng Bán'
					},
					ngaychon : { tenngay : ngaychonVM}
				};
				trangthairef.update(update); //update thanh da trung
				if ($('#trangthai'+maspbt+' i').hasClass('fa-check-square') == false){
					$('#trangthai'+maspbt+' i').addClass('fa-check-square');
				}
				if ($("#mautrungbanVM").hasClass('badge-success') == false){
					$("#mautrungbanVM").addClass("badge-success");
				}
				$("#hienthitrunghangVM").html('Đã Trưng Bán');
				realtime.update(updatereal);
			}
		});
		

	})
	//su ken khi click vao nut loc ma tong
	$("#nhapmatong").keypress(function(e){
		if (e.keyCode == 13) {
			var kitu = $("#nhapmatong").val();
			if ( kitu != '' && kitu != null){
				loctheomatongVM(kitu);
			}
		}
	}) 
	$(".nuttimVM").click(function(){
		var kitu = $("#nhapmatong").val();
		console.log(kitu);
		if ( kitu != '' && kitu != null){
			loctheomatongVM(kitu);
		}
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
var oluuMotaghichu = {};
var ngaychonVM = "";
var dongDaChon = '0';
// cac function

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
	var ngayref = db.ref().child('ngayduocban/' + ngaychon);
	ngayref.once('value', function(snapshot){
		$('#bodytableVM tr').remove();
			snapshot.forEach(function(masnapshot){
				var obluu = {};
				var thamso = '';
				var masp = masnapshot.key;
				thamso += '<tr id="'+masp+'">';
				thamso += '<td width="20%">'+masp+'</td>';
				thamso += '<td width="60%" id="chude'+masp+'">'+masnapshot.val().chude+'</td>';
				var trangthai = masnapshot.val().taikhoancnf[tencuahangVM].trangthaitrung;
				if(trangthai == 'Đã Trưng Bán'){
					thamso += '<td width="10%" id="trangthai'+masp+'"><i class="fas fa-check-square fa-2x"></i></td>';
				}
				else{
					thamso += '<td width="10%" id="trangthai'+masp+'"><i class="fas fa-2x"></i></td>';
				}
				thamso += '<td width="10%"><button type="button" class="btn btn-warning" name="'+masp+'"><i class="fas fa-pen"></i></button></td>';
				
				thamso += '</tr>';
				$('#bodytableVM').append(thamso);
				obluu.mota = masnapshot.val().mota;
				obluu.ghichu = masnapshot.val().ghichu;
				oluuMotaghichu[masp] = obluu;
			});
			
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
	var ngayref = db.ref().child('ngayduocban').orderByKey();
	ngayref.once('value', function(snap){
		var kq = [];
		snap.forEach(function(hsnap){
			kq.push(hsnap.key);
		});
		kq.sort(function(a, b){return b - a});
		for (i = 0; i< kq.length ; i++){
			$("#chonngayVM").append('<option>'+chuyensothanhngay(kq[i])+'</option>');
		}
		$("#taikhoandangnhap").html(tencuahangVM);
		loadbangtheongaychon(kq[0]);
	})
}
// ham load khi khoi dong
function loadkhoidong(){
	$("#modalloadVM").modal('show');
}
//realtime
function func_realtime(){
	var ngaymoinhatref = db.ref().child('thongso');
	ngaymoinhatref.on('value', function(snap){
		$("#showtencuahang").html('Chào '+ tencuahangVM + ':)');
		$("#lingaymoinhat").html('Ngày dữ liệu mới: <strong class="text-info">' +chuyensothanhngay(snap.val().ngaymoinhat.tenngay)  + '</strong>');
		$("#lifilemoinhat").html('File dữ liệu mới: <strong class="text-info">' +snap.val().filemoi.tenfile + '</strong>');
		$("#modalloadbangmoiVM").modal('show');
		setTimeout(function(){$("#modalloadbangmoiVM").modal('hide');},2000);
	});
}
//loc ma tong
function loctheomatongVM(kitu){
	var kituupper = kitu.toUpperCase();
	var ngayref = db.ref().child('ngayduocban');
	ngayref.once('value', function(snap){
		snap.forEach(function(csnap){
			csnap.forEach(function(ccsnap){
				if (ccsnap.key.includes(kituupper)){
					console.log(ccsnap.val());
				}
			});
		});
	})
}