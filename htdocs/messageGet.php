<?php
    require "databaseConnect.php";
    $conn=new databaseConnect("licenta_db","root","","localhost");
    $link = $conn->connect();

    session_start();

    
    $id=$_SESSION['user_id'];
    
   $query1="Select a.message_id,a.sent_to_id,a.sent_from_id,a.data,a.message_text,a.message_status , a.message_subject ,b.FIRST_NAME , b.LAST_NAME ,b.EMAIL from users b ,messages a where b.USER_ID=a.sent_from_id and a.sent_to_id=$id order by a.message_id DESC";
    
    
   
    $query = $link->query($query1);
    $array=[];
    while($result=$query->fetch(PDO::FETCH_ASSOC)){
        $array[]=$result;
    }
    $json['MESSAGES']=$array;
    
    
   
    header('Content-Type: application/json');
    echo json_encode($json);
?>