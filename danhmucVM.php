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
  	
	<link rel="stylesheet" type="text/css" href="mystyle/mystyle.css">

	<script src="https://www.gstatic.com/firebasejs/5.5.8/firebase.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.14.1/xlsx.full.min.js"></script>
	<script src="https://fastcdn.org/FileSaver.js/1.1.20151003/FileSaver.min.js"></script>
	<script type="text/javascript" src="myjs/tinhtoan_vm.js"></script>
	<link rel="icon" href="picture\chan-cho.png" type="image/png" sizes="16x16">
</head>
<body onload="loadkhoidong()">
	<div class="container">
		<div class="headerVM my-1">
			<a href="index.php" class="mx-2"><i class="fas fa-angle-double-left"></i></a>
			<p class="">Tài khoản _ Tên cửa hàng: </p>
			<strong class="col text-danger"><p id="taikhoandangnhap"></p></strong>
			<p class="hienthiDKVM">File cập nhật mới nhất: </p>
			<p class="tenfilemoinhatVM hienthiDKVM text-success font-weight-bold font-italic mx-2"></p>
		</div> <!-- phan hien thi thong tin tai khoan -->
		<hr class="hrstyle">
		<div class="main">
			
			<div class="khoianhchonngayVM" >
				<div>
					<div class="khunganh bg-blue">
						<img class="rounded" src="picture/totoro1.png" id="anhsanphamVM">
						<div class="loadinganh">
							<i class="fas fa-spinner fa-spin"></i>
						</div>
						<div class="mahang_anh">
							<p class="font-weight-bold"><span class="badge badge-secondary"><strong id="hienthimatongVM">Mã hàng</strong></span></p>
						</div>
						
					</div>
				</div>
				<div style="height: 155px;" >
				
					<div class="form-group">
						<div class='input-group'>
		                    <input type='search' class="form-control text-center" id="nhapmatong" placeholder="Lọc mã tổng">
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
					
					<p class="font-weight-bold"><span class="badge badge-success" id="mautrungbanVM"><strong id="hienthitrunghangVM">Trạng thái trưng</strong></span></p>
					
				</div>
				<!-- footer -->
				<div class="xuatinVM">
					<div class="footerVM">
						<button class="btn btn-info" id="btnChonxuatexcel"><i class="far fa-file-excel mx-2"></i>Xuất Excel</button>
					</div>
					<div class="footerVM">
						<button class="btn btn-secondary" id="btnIndanhmuc"><i class="fas fa-print mx-2"></i>In danh mục</button>
					</div>
				</div>
			</div>
			<hr class="hrstyle1">
			<div class="khoithanVM">
				<div class="khoithongtin">
					<div class="row">
						<p class="labelthongtinVM ">- Chủ đề:</p>
						<p class="col text-left mr-2" id="chude">--</p>
					</div>
					<div class="row">
						<p class="labelthongtinVM ">- Mô tả:</p>
						<p class="col text-left mr-2" id="mota">--</p>
					</div>
					<div class="row">
						<p class="labelthongtinVM ">- Ghi chú:</p>
						<p class="col text-left mr-2" id="ghichu">--</p>
					</div>
					<hr class="hrstyle">
					<div class="thongsobangVM text-center">
						<div>
							<p>Tổng<span class="anhienSoluong">mã:</span></p> 
							<p class="soluongVM" id="somahangVM"></p>	
						</div>
						<div>
							<p><span class="anhienSoluong">Mã</span>Chưa trưng:</p> 
							<p class="soluongVM" id="somachuatrungVM"></p>
						</div>
						<div>
							<input type="checkbox" id="checkHienthitrunghangVM" name="set-name" class="switch-input">
							<label for="checkHienthitrunghangVM" class="switch-label">Hiển thị</label>
						</div>
					</div>
				</div>
				<div class="table-responsive text-secondary">
					<table id="bangVM" class="table table-fixed">
						<thead>
							<tr>
								<th class="hienTH1" >Mã</th>
								<th class="hienTH2" >Chủ đề</th>
								<th class="anhienCot">Mô tả</th>
								<th class="dontprint hienTH5">Trưng</th>
								<th class="cottrunghangVM dontprint hienTH6">Update</th>
							</tr>
						</thead>
						<tbody id="bodytableVM" class="align-middle">
							
						</tbody>
					</table>
				</div>
			</div>
			
			<!--fix bottom thongbao -->
			<div class="fixThongbao">
				<div>
					<span>
			     		 <i class="fas fa-bell fa-stack-2x"></i> 

			    	</span>
			    	<span class="sothongbao"></span>
				</div>
				
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
								<li>Nhấn vào nút <button type="button" class="btn btn-warning"><i class="fas fa-pen"></i></button> để <strong>Edit trạng thái trưng hàng của mã tương ứng</strong></li>
								<br>
								<p class="text-center text-info">---hts---</p>
							</ul>
						</div>
					</div>
				</div>
				
			</div>
			<!-- modal khi co du lieu moi-->
			<div class="modal fade" id="modalThongbaoVM">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="text-info ">Thông báo!</h4>
							<button class="close" data-dismiss="modal" aria-label="close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body text-secondary">
							<ul id="gachthongbao">
							</ul>
							<hr>
							<button type="button" class="btn btn-warning btnrefreshVM text-center">Làm mới thông báo (Refresh)</button>
						</div>
					</div>
				</div>
				
			</div>
			<!-- modal xuat excel-->
			<div class="modal fade" id="modalXuatexcelVM">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="text-info ">Xuất excel theo khoảng ngày chọn!</h4>
							<button class="close" data-dismiss="modal" aria-label="close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body text-secondary">
							<p>Chọn từ ngày: (Format: YYYYMMDD _ năm tháng ngày)</p>
							<select class="form-control text-center text-info font-weight-bold" id="xuatexcelFromVM" style="border-radius: 4px;">
					    	</select>
					    	<p>Đến ngày:</p>
					    	<select class="form-control text-center text-info font-weight-bold" id="xuatexcelToVM" style="border-radius: 4px;">
					    	</select>
							<hr>
							<button type="button" class="btn btn-warning btnxuatexcelVM text-center">Xuất Excel</button>
						</div>
					</div>
				</div>
				
			</div>
	</div>
	</div>
</body>
</html>