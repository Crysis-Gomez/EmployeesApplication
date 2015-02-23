	<?php
		if($_SERVER['REQUEST_METHOD'] == 'POST'){
			$username 	= "*";
		    $password 	= "*";
		    $hostname 	= "*";
		    $dbname 	= "*";

			$conn = new mysqli($hostname, $username, $password,$dbname);

			if ($conn->connect_error) {
			    die("Connection failed: " . $conn->connect_error);
			}
			
			$data 		= $_POST["data"];
			$d = json_decode($data);

			$query = "DELETE FROM Employees WHERE id IN(";
			for ($i=0; $i < count($d); $i++) { 
				$_d = $d[$i];
				$id =  $_d->{'id'};

				
				if($i == count($d)-1){
					$query .= "$id)";
				}else{
					$query .= "$id,";
				}
				
			}

			$conn->query($query);
			$conn->close();
		}
	?>