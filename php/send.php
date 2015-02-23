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
			
			$name 		= $_POST["name"];
			$lastname 	= $_POST["lastname"];
			$department = $_POST["department"];
			$role 		= $_POST["job"];
			$active 	= $_POST["active"];
		
			$query = "INSERT INTO Employees (name, lastname, department, job, active) VALUES ('$name','$lastname', '$department', '$role', '$active')";



			if ($conn->query($query) === TRUE) {
		    	echo $conn->insert_id;
			
			} else {
			     echo "Error: " . $query . "<br>" . $conn->error;
			}

			$conn->close();
		}
	?>