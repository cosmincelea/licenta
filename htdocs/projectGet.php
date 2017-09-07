<?php
           
            require "databaseConnect.php";
       
 
            
            $conn=new databaseConnect("licenta_db","root","","localhost");     
            $link = $conn->connect();
            $postdata = file_get_contents("php://input");

            $request = json_decode($postdata);
            
         
  
            $project_id =  $request->project_id;

        
           $request_type = "admin";
           
             if($request_type=="admin"){
             
             $query1="Select a.project_id ,a.project_name ,a.project_description,a.finalised,a.user_id ,a.start_date ,a.estimatedTime ,b.FIRST_NAME ,b.LAST_NAME ,c.role_name from projects a ,users b,user_role c where a.project_id=$project_id AND b.USER_ID=a.user_id and c.role_id=b.role_id ";
    
    $query2="SELECT a.FIRST_NAME ,a.LAST_NAME ,b.role_name,b.user_project_id from project_team b ,users a where b.project_id=$project_id and a.USER_ID=b.user_id";
    
    $query = $link->query($query1);
    $json=$query->fetch(PDO::FETCH_ASSOC);
    $query = $link->query($query2);
    $array=[];
    while($result=$query->fetch(PDO::FETCH_ASSOC)){
        $array[]=$result;
    }
    $json['PROJECT_TEAM']=$array;
    header('Content-Type: application/json');
    echo json_encode($json);
             }
             
             else {
                 
    echo "Error .No access!";
                 
             }
            
            
        ?>