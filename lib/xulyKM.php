<?php
	require_once 'config.php';
	require_once 'database.php';
	require_once 'xulyDatabase.php';
	$km = new xulyDatabase();
	$thongso = (object)[
		'matong' => '-',
		'giagoc' => '-',
		'giagiam' => '-',
	];
	if ($_GET["barcode"] && $_GET["barcode"] != '') {
			$maSp = $km->layMotHang("bangbarcode", "barcode", $_GET["barcode"]);
			if (is_string($maSp)) {
				$thongso->matong = "0";
				echo json_encode($thongso);
			}
			else {
				$tenMa = $maSp->masp;
				$tenMa = substr($tenMa, 0, 9); // lay ma tong
				$locKm = $km->layMotHang("bangkhuyenmai", "matong", $tenMa);
				if (is_string($locKm)) {
					$thongso->matong = $tenMa;
					$thongso->giagoc = "-";
					echo json_encode($thongso);
				}
				else echo json_encode($locKm);
			}
	}
?>