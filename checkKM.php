<?php
session_start();
if (!isset($_SESSION['checkKM'])) {
	 header('Location: index.php');
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Check Khuyến Mãi</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossorigin="anonymous">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
	  
	<link rel="stylesheet" type="text/css" href="mystyle/mystyle.css">
	<script type="text/javascript" src="myjs/quagga.min.js"></script>
	<script type="text/javascript" src="myjs/tinhtoan.js"></script> 
	<script type="text/javascript" src="myjs/myJs.js"></script>
	<link rel="icon" href="picture\sale.png" type="image/png" sizes="16x16">
</head>
<body onload="loadNgayCapNhat()">
	<div class="container">
		<div class="main">
			<div id="pagecheckKM">
				<div class="row my-1" style="font-size: 12px;">
					<a href="index.php" class="col-1"><i class="fas fa-angle-double-left"></i></a>
					<p class="col-6">Dữ liệu mới nhất ngày: </p>
					<strong class="col-4 text-danger"><p id="ngaycapnhat"></p></strong>
				</div> <!-- phan hien thi thong tin du lieu cap nhat moi nhat -->
				<div class="my-1 d-flex" id="nhapdulieuKM">
					
					<input type="search" name="barcode" placeholder="Nhập barcode" class="form-control flex-grow-1 berongnhapBarcode vieninput" id="barcode" onclick="this.value='';">
					<div class="px-1">
						<button type="button" class="btn btn-default" type="submit" name="timmasp" id="timkiem"><i class="fas fa-search mx-1"></i>Tìm</button>
					</div>
					<div>
						<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#locmatong"><i class="fas fa-filter mx-1"></i>Lọc</button>
					</div>
				</div>
					<!--div modal phan loc ma tong -->
						<div id="locmatong" class="modal fade">
							<div class="modal-dialog modal-dialog-centered">
								<div class="modal-content">
									<div class="modal-header">
										<h4 class="modal-title text-info">Lọc theo mã tổng</h4>
										<button type="button" class="close" data-dismiss="modal" aria-label="close">
										<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div class="modal-body">
										<div class="row my-2 mx-2 justify-content-between">
											<input type="search" name="nhapmatong" placeholder="Nhập giá trị gần đúng" class="form-control col-8 vieninput" id="textMatong" onclick="this.value=''">
											<button type="button" class="btn btn-primary col-3" id="timtheoMatong"><i class="fas fa-search mx-1"></i>Tìm</button>
										</div>
											
										<div class="table-responsive text-secondary ">
											<table id="table-hts" class="table">
												<thead>
													<tr>
														<th >Mã tổng</th>
														<th >Giá gốc</th>
														<th >Số giảm</th>
													</tr>
												</thead>
												<tbody id="bangKm">
												</tbody>
											</table>
										</div>
									</div>
									<div class="modal-footer">
										<label class="text-secondary mx-3" style="font-size: 13px;">*** Ấn <strong>' ENTER '</strong> để lọc.</label>
										<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
									</div>
								</div><!-- /.modal-content -->
							</div><!-- /.modal-dialog -->
						</div>
					<!--div modal phan loc ma tong -->
				<hr>
				<div class="row align-middle">
					<p class="col-5 ">Barcode:</p>
					<p class="col-7 font-weight-bold font-italic text-center" style="font-size: 20px;"><span class="badge badge-secondary"><strong id="mabarcode"></strong></span></p>
				</div>	
				<div class="row align-middle">
					<p class="col-5 ">Mã sản phẩm:</p>
					<p class="col-7 font-weight-bold font-italic text-center" style="font-size: 30px;"><span class="badge badge-success"><strong id="masanpham"></strong></span></p>
				</div>
				
			</div>
			<hr>
			<div class="fontchu">
				<div class="center noidung  bg-light my-1" style="font-size: 1.3em;">
					<p id="giachot">Giá chốt</p>
				</div>
				<div class="center noidung bg-light my-3" style="font-size: 1em;">
					<p  id="sophantram">Số % giảm</p>
				</div>
			</div>
			
			<div class="center">
				<button type="button" class="btn btn-success scan my-1" data-toggle="modal" data-target="#scanBarcode">
					 <span class="mx-4"><i class="fa fa-barcode"></i></span>Scan<i class="fas fa-video mx-4"></i></button>
			</div>
			<!-- div modal goi man hinh scan barcode-->
			<div class="modal fade" id="scanBarcode">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title">Dùng camera để scan barcode</h4>
							<button type="button" class="close" data-dismiss="modal" aria-label="close">
								<span aria-hidden="true">&times;</span>
							</button>
							
						</div>
						<div class="modal-body" style="position: static">
							<div id="interactive" class="viewport"></div>
							<div class="error"></div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
						</div>
					</div><!-- /.modal-content -->
				</div><!-- /.modal-dialog -->
			</div><!-- /.modal -->

			<!---audio  
			<audio src="amthanh/30.mp3" id="am30" preload="auto"></audio>
			<audio src="amthanh/40.mp3" id="am40" preload="auto"></audio>
			<audio src="amthanh/50.mp3" id="am50" preload="auto"></audio>
			<audio src="amthanh/donggia.mp3" id="amDonggia" preload="auto"></audio>
			-->
			<!-- phan modal show khi load hien thi cac nhac nho su dung -->
			<div class="modal fade" id="modalLoad">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title text-info">Chú ý !!!</h4>
							<button class="close" data-dismiss="modal" aria-label="close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body text-secondary">
							<ul>
								<li>Để ý phần thông tin <strong>Dữ liệu mới nhất ngày</strong> trên top</li>
								<li>Khi nhập dữ liệu có thể nhấn 
									<strong>'ENTER'</strong> từ bàn phím hoặc click vào nút 
									<strong>'Tìm'</strong>
								</li>
								<li>Khi dùng chức năng <strong>Scan</strong> barcode bằng camera nhớ <strong>'Cho phép
								cấp quyền sử dụng Camera'</strong> nếu được hỏi.</li>
								<br>
								<li>***Lưu ý: ứng dụng hoạt động tốt trên Android. Trên <strong>iOS</strong> chức năng <strong>Scan</strong> chỉ hoạt động trong trình duyệt <strong>Safari</strong> trên nền iOS 11 trở lên</li>
							</ul>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</body>
</html>