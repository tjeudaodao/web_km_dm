<?php
session_start();
?>
<?php 
	if (!isset($_SESSION['tendangnhap'])) {
		header("location : index.php");
	}
	$session_value = $_SESSION['tendangnhap'];
?>
<!DOCTYPE html>
<html>
<head>
	<title>cnf_danhmuc</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script type="text/javascript">
    	var tencuahangVM ='<?php echo $session_value;?>';
    </script>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossorigin="anonymous">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
  	<!--
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.8.0/css/bootstrap-datepicker3.min.css" />
	<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.8.0/js/bootstrap-datepicker.min.js"></script>
	-->
	<link rel="stylesheet" type="text/css" href="mystyle/mystyle.css">

	<script src="https://www.gstatic.com/firebasejs/5.5.8/firebase.js"></script>
	<script type="text/javascript" src="myjs/tinhtoan_vm.js"></script>
	<link rel="icon" href="picture\chan-cho.png" type="image/png" sizes="16x16">
</head>
<body onload="loadkhoidong()">
	<div class="container">
		<div class="main">
			<div class="row my-1" style="font-size: 12px;">
					<a href="index.php" class="col-1"><i class="fas fa-angle-double-left"></i></a>
					<p class="col-3">Tài khoản: </p>
					<strong class="col text-danger"><p id="taikhoandangnhap"></p></strong>
			</div> <!-- phan hien thi thong tin du lieu cap nhat moi nhat -->
			<div class="row" >
				<div class="col-6">
					<div class="khunganh">
						<img class="rounded" src="picture/totoro1.png" height="165px" width="150px" id="anhsanphamVM">
						<div class="loadinganh">
							<i class="fas fa-spinner fa-spin"></i>
						</div>
						<div class="mahang_anh">
							<p class=" font-weight-bold text-center" style="font-size: 20px;"><span class="badge badge-secondary"><strong id="hienthimatongVM">Mã hàng</strong></span></p>
						</div>
						
					</div>
				</div>
				<div class="col-6 text-center khoichonngay" style="height: 155px;" >
				
					<div class="form-group">
						<div class='input-group'>
		                    <input type='text' class="form-control text-center" style="border-radius: 4px; font-size: 12px;" id="nhapmatong" placeholder="Lọc mã tổng">
		                    <div class="input-group-append">
		                    	<button class="btn btn-secondary nuttimVM" type="button"><i class="fas fa-search"></i></button>
		                    		
		                    </div>
            			</div>
					</div> 
					<div class="form-group">
					    <label class="text-secondary" style="font-size: 14px;">Chọn ngày xem</label>
					    <select class="form-control text-center text-info font-weight-bold" id="chonngayVM" style="border-radius: 4px;">
					    </select>
					 </div>
					
					<p class=" font-weight-bold  text-center" style="font-size: 18px;"><span class="badge badge-success" id="mautrungbanVM"><strong id="hienthitrunghangVM">Trạng thái trưng</strong></span></p>
					
				</div>
			</div>
			<hr>
			<div class="khoithongtin" style="font-size: 13px;">
				<div class="row">
					<p class="col-4 ">- Chủ đề:</p>
					<p class="col bg-light text-left mr-2" id="chude">--</p>
				</div>
				<div class="row">
					<p class="col-4 ">- Mô tả:</p>
					<p class="col bg-light text-left mr-2" id="mota" style="overflow-y: scroll;overflow-x: hidden;max-height: 35px;" >--</p>
				</div>
				<div class="row">
					<p class="col-4 ">- Ghi chú:</p>
					<p class="col bg-light text-left mr-2" id="ghichu" style="overflow-y: scroll;overflow-x: hidden;max-height: 40px;" >--</p>
				</div>
			</div>
			<div class="table-responsive text-secondary" style=" font-size: 12px;">
				<table id="bangVM" class="table table-fixed">
					<thead>
						<tr>
							<th width="20%">Mã</th>
							<th width="60%">Chủ đề</th>
							<th width="10%">Trưng</th>
							<th width="10%">Update</th>
						</tr>
					</thead>
					<tbody id="bodytableVM" class="align-middle">
						
					</tbody>
				</table>
			</div>

			<!-- modal huongdan su dung -->
			<div class="modal fade" id="modalloadVM">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title text-info">Hướng dẫn !!!</h4>
							<button class="close" data-dismiss="modal" aria-label="close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body text-secondary">
							<ul>
								<li>Mặc định khi load lần đầu sẽ load ngày <strong>Mới nhất</strong></li>
								<li>Nút chọn ngày chỉ xuất hiện những<strong> ngày có dữ liệu</strong> 
								</li>
								<li>Nhấn chọn vào từng hàng để thấy chi tiết mã hàng và ảnh</li>
								<br>
								<li>Biểu tương <i class="fas fa-check-square fa-2x"></i> thể hiện mã đấy <strong>đã được trưng</strong></li>
								<li>Nhấn vào nút <button type="button" class="btn btn-warning"><i class="fas fa-pen"></i></button> để <strong>Edit trặng thái trưng hàng của mã tương ứng</strong></li>
								<br>
								<p class="text-center text-info">---hts---</p>
							</ul>
						</div>
					</div>
				</div>
				
			</div>
			<!-- modal khi co du lieu moi-->
			<div class="modal fade" id="modalloadbangmoiVM">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header"><h4 id="showtencuahang" class="text-info "></h4></div>
						<div class="modal-body text-secondary">
							<br>
							<ul>
								<li id="lingaymoinhat"></li>
								<li id="lifilemoinhat"></li>
							</ul>
						</div>
					</div>
				</div>
				
			</div>
	</div>
	</div>
</body>
</html>