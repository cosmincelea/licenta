

<?php
session_start();

	
	include_once("dbConnect.php");
	
	 $postdata = file_get_contents("php://input");

            $request = json_decode($postdata);
            
         
            
            
            $usname =  $request->user;
            $paswd =  $request->password;
	
	
	
	$sql = "SELECT USER_ID ,EMAIL, PASSWORD,USER_TYPE FROM users WHERE EMAIL = '$usname' " ;
	$query = mysqli_query($dbCon, $sql);
	$row = mysqli_fetch_row($query);
	$uid = $row[0];
	$email = $row[1];
	
	$dbPassword = $row[2];
	$user_type = $row[3];
	// Check if the username and the password they entered was correct
	if (password_verify($paswd,$dbPassword)) {
		
		
		 $_SESSION['user_id'] = $uid;
		 $_SESSION['user_type'] = $user_type;
           setcookie('user_id',$uid,time()+(36000));
           setcookie('user_type',$user_type,time()+(36000));
		echo "0"; 
	
	} else {
		echo "1"; 
	}
	

?>


