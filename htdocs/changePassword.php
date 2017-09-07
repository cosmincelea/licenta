

<?php
session_start();

	
	include_once("dbConnect.php");
	
	 $postdata = file_get_contents("php://input");

            $request = json_decode($postdata);
            
         
            $id=$_SESSION['user_id'];
            
            $oldPassword =  $request->old_password;
            $newPassword =  $request->new_password;
	
	
	
	$sql = "SELECT  PASSWORD FROM users WHERE USER_ID = '$id' " ;
	$query = mysqli_query($dbCon, $sql);
	$row = mysqli_fetch_row($query);
	
	$dbPassword = $row[0];
	
	// Check if the username and the password they entered was correct
	if (password_verify($oldPassword,$dbPassword)) {
		$options = array('cost' => 12);
		
		$new_crypt_Password = password_hash($newPassword, PASSWORD_BCRYPT, $options);
		$link = mysqli_connect("localhost","root","","licenta_db");
		
		mysqli_query($link,"UPDATE `users` SET `PASSWORD` = '$new_crypt_Password' WHERE `users`.`USER_ID` = $id;")
		or die(mysqli_error($link));
		
		 
		echo "0"; 
	
	} else {
		echo "1"; 
	}
	

?>


