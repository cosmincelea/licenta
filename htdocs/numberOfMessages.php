<?php
    require "databaseConnect.php";
    $conn=new databaseConnect("licenta_db","root","","localhost");
    $link = $conn->connect();

    session_start();

    
    $id=$_SESSION['user_id'];
    
   $query1="Select count(*) as numberOfMessages from messages where sent_to_id=$id and message_status!=2";
    
    
   
    $query = $link->query($query1);
   
    $result=$query->fetch(PDO::FETCH_ASSOC);
    
    
   
    header('Content-Type: application/json');
    echo json_encode($result);
?>