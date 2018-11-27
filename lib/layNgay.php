<?php
	require_once 'config.php';
	require_once 'database.php';
	require_once 'xulyDatabase.php';
	$km = new xulyDatabase();

	$ngay = $km->layMotHang("ngaycapnhat", "id", 1)->ngay;
	echo $ngay;
?>