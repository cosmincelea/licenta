<?php
    require "databaseConnect.php";
    $conn=new databaseConnect("licenta_db","root","","localhost");
    $link = $conn->connect();
   


    
   
    
    $query1="SELECT SKILL_NAME from computer_skills Order by SKILL_NAME  ";
    
    
    
    $query = $link->query($query1);
 
   
  
    $array=[];
    while($result=$query->fetch(PDO::FETCH_ASSOC)){
    	$array[]=$result;
    	
    }
    $json=$array;
    
    header('Content-Type: application/json');
    echo json_encode($json);
?>
