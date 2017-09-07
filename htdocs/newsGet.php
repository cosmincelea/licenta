<?php
    require "databaseConnect.php";
    $conn=new databaseConnect("licenta_db","root","","localhost");
    $link = $conn->connect();

    session_start();

    
    $id=$_SESSION['user_id'];
    
   $query1="Select * from news   order by news_id DESC";
    
    
   
    $query = $link->query($query1);
    $array=[];
    while($result=$query->fetch(PDO::FETCH_ASSOC)){
        $array[]=$result;
    }
    
    
    
   
    header('Content-Type: application/json');
    echo json_encode($array);
?>