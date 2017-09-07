<?php
    require "databaseConnect.php";
    $conn=new databaseConnect("licenta_db","root","","localhost");
    $link = $conn->connect();
   


    
   
    
    $query1="SELECT a.LAST_NAME ,a.FIRST_NAME ,a.USER_ID ,b.role_name from users a ,user_role b where b.role_id=a.ROLE_ID ";
    
    
    
    $query = $link->query($query1);
 
   
  
    $array=[];
    while($result=$query->fetch(PDO::FETCH_ASSOC)){
    	$array[]=$result;
    	
    }
    $json=$array;
    
    header('Content-Type: application/json');
    echo json_encode($json);
?>
