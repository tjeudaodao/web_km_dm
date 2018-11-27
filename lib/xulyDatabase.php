<?php
	class xulyDatabase{
		private $db;

		public function __construct(){
			$this->db = new Database;
		}
		public function layMotHang($tenbang,$tencot,$giatri){
			$this->db->query("SELECT * FROM $tenbang WHERE $tencot = :giatri");
			$this->db->bind('giatri',$giatri);
			$row = $this->db->single();
			return $row;
		}
		public function locTheoMaTong($kitu){
			$this->db->query("SELECT * FROM bangkhuyenmai WHERE matong LIKE :kitu ORDER BY matong");
			$this->db->bind('kitu',$kitu."%");
			$row = $this->db->resultSet();
			$this->db = null;
			return $row;
		}
		public function layma(){
			$this->db->query("SELECT pass FROM dangnhap WHERE taikhoan = 'kho'");

		}

		public function docloi(){
			return $this->db->layloi();
		}
	}

?>