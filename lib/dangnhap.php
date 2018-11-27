<?php
session_start();
?>
<?php 
	if (isset($_GET['tendangnhap'])){
		$_SESSION['tendangnhap'] = $_GET['tendangnhap'];
	}
?>