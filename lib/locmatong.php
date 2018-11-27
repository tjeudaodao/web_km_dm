<?php
	include 'config.php';
	include 'database.php';
	include 'xulyDatabase.php';
	$km = new xulyDatabase();

	if (isset($_GET["kitu"]) && $_GET["kitu"] != '') {
		$kq = $km->locTheoMaTong($_GET["kitu"]);
		//echo json_encode($kq);
		foreach ($kq as $key => $value) {
			//echo $value->matong . ", ". $value->giagoc ."\n";
			echo "<tr>";
			echo "<th>".$value->matong."</th>";
			echo "<th>".$value->giagoc."</th>";
			echo "<th>".$value->giagiam."</th>";
			echo "</tr>";
		}
	}
?>