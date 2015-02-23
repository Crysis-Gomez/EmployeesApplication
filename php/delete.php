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
			
			$id = $_POST["id"];
		
			$query = "DELETE FROM Employees WHERE id=$id";

			if ($conn->query($query) === TRUE) {
		    	echo "done";
			
			} else {
			     echo "Error: " . $query . "<br>" . $conn->error;
			}

			$conn->close();
		}
	?>