<?php
session_start();
?>
<?php 
	if (isset($_GET["pageKM"])) {
			$_SESSION['checkKM'] = 'chuyentrangKM';
			header('Location: checkKM.php');
	}		
?>
<!DOCTYPE html>
<html>
<head>
	<title>cnf_hts</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossorigin="anonymous">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="mystyle/mystyle.css">

	<script src="https://www.gstatic.com/firebasejs/5.5.8/firebase.js"></script>
	<script type="text/javascript" src="myjs/tinhtoan_dangnhap.js"></script>
	<link rel="icon" href="picture\chan-cho.png" type="image/png" sizes="16x16">
		
</head>
<body>
	<div class="container ">
		<div class="centerMain">
			<div>
				<form method="GET" action="index.php">
					<button type="submit" name="pageKM" class="btn btn-success nutTO">
						<h4><i class="fas fa-tags mx-3"></i>Check khuyến mãi</h4>
					</button>
				</form>
			
			</div>
			<div>
				<button type="button" class="btn btn-primary nutTO" data-toggle="modal" data-target="#modalDangNhapVm">
					<h4><i class="fas fa-list-ol mx-3"></i>Danh muc VM</h4>
				</button>
				<!-- modal dang nhap -->
				<div class="modal fade" id="modalDangNhapVm">
					<div class="modal-dialog modal-dialog-centered">
						<div class="modal-content">
							<div class="modal-header">
								<h4 class="text-info">Đăng nhập vào danh mục VM</h4>
								<button type="button" class="close" data-dismiss="modal" aria-lable="close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body ml-2">
								<div class="row my-2">
									<label class="control-label col-4">Tài khoản</label>
									<input class="form-control col mr-2" type="text" name="tendangnhap" id="tendangnhap">
								</div>
								<div class="row my-3">
									<label class="control-label col-4">Mật khẩu</label>
									<input class="form-control col mr-2" type="password" name="matkhaudangnhap" id="matkhaudangnhap">
								</div>
								<div class="text-center" >
									<button type="button" class="btn btn-primary my-4" id="dangnhap" name="dangnhap" style="width: 70%;">Đăng nhập</button>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<!--chu ki hts -->
			<div class="duoicung"><p class="text-secondary">---  hts ---</p></div>
		</div>
		
	</div>
</body>
</script>
</html>