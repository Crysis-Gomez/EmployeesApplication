<?php

	$username = "*";
    $password = "*";
    $hostname = "*";
    $dbname = "*";
    $a = array();
	// Create connection
	$conn = new mysqli($hostname, $username, $password,$dbname);

	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	$query = "SELECT * FROM  Employees" ;

	$result = $conn->query($query);

	if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {

    	$var = array("member" => array(
			"name" => $row["name"],
			"lastname" => $row["lastname"],
			"department" => $row["department"],
			"role" => $row["job"],
			"active" => $row["active"],
			"id"=>$row["id"]
		));
    

    	 array_push ($a,$var['member']);
    
	    }
	} else {
	    echo "0 results";
	}


	echo json_encode($a);


	$conn->close();
	
?>