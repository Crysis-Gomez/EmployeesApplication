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

			$query = "INSERT INTO Employees (name, lastname, department, job, active) VALUES ";
			for ($i=0; $i < count($d); $i++) { 
				$_d = $d[$i];
				$name 		=  $_d->{'name'};
				$lastname 	=  $_d->{'lastname'};
				$department =  $_d->{'department'};
				$role 		=  $_d->{'job'};
				$active 	=  $_d->{'active'};
				
				if($i == count($d)-1){
					$query .= "('$name','$lastname', '$department', '$role', '$active')";
				}else{
					$query .= "('$name','$lastname', '$department', '$role', '$active'),";
				}
				
			}

			$conn->query($query);
			$conn->close();
		}
	?>