<?php
    require "databaseConnect.php";
    $conn=new databaseConnect("licenta_db","root","","localhost");
    $link = $conn->connect();
   
    session_start();
    
    
    
    $id=$_SESSION['user_id'];

    $query2=" SELECT project_id from project_team where user_id='$id';";
    
    
    
    $query3 = $link->query($query2);
    
     
    
    $array2=array();
    while($result=$query3->fetch(PDO::FETCH_ASSOC)){
    	$array2[]=$result['project_id'];
    	 
    
    
    }
    
   $projectIds=implode(",", $array2);
  
    $query1=" SELECT project_id, project_name ,start_date from projects where project_id IN($projectIds) ORDER BY project_id DESC;";
    
    
    
    $query = $link->query($query1);
 
   
  
    $array=[];
    while($result=$query->fetch(PDO::FETCH_ASSOC)){
        $array[]=$result;
     
        
        
    }
       
   
    $json=$array;
    
    header('Content-Type: application/json');
    echo json_encode($json);
?>
