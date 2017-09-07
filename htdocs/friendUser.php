<?php
           
            require "databaseConnect.php";
       
 
            
            $conn=new databaseConnect("licenta_db","root","","localhost");     
            $link = $conn->connect();
            $postdata = file_get_contents("php://input");

            $request = json_decode($postdata);
            
         
  
            $user_id =  $request->user_id;

        
           $request_type = "admin";
           
             if($request_type=="admin"){
             
             $query1="Select a.USER_ID,a.CLIENT_FACING, a.FIRST_NAME,a.LAST_NAME,b.location_link,a.BIRTH_DATE,a.EMAIL,a.ROLE_ID,a.CLIENT_FACING,a.USER_TYPE,a.PHONENUMBER,a.START_DATE,b.location_name,c.role_name from users a ,locations b,user_role c where a.LOCATION_ID=b.location_id and c.role_id=a.ROLE_ID and a.USER_ID=$user_id ";
    
    $query2="Select c.skill_level,d.SKILL_NAME,d.COMPUTER_SKILLS_ID from computer_skills d,users_computers_skills c where  d.COMPUTER_SKILLS_ID=c.skill_id and c.user_id=$user_id";
    
    $query = $link->query($query1);//LIMIT 1
    $json=$query->fetch(PDO::FETCH_ASSOC);
    $query = $link->query($query2);
    $array=[];
    while($result=$query->fetch(PDO::FETCH_ASSOC)){
        $array[]=$result;
    }
    $json['SKILLS']=$array;
    header('Content-Type: application/json');
    echo json_encode($json);
             }
             
             else {
                 $query1="Select a.USER_ID, a.FIRST_NAME,a.LAST_NAME,b.location_link,a.EMAIL,a.ROLE_ID,a.CLIENT_FACING,a.USER_TYPE,a.PHONENUMBER,b.location_name from users a ,locations b where a.LOCATION_ID=b.location_id and a.USER_ID=$user_id ";
    
    $query2="Select c.skill_level,d.SKILL_NAME,d.COMPUTER_SKILLS_ID from computer_skills d,users_computers_skills c where  d.COMPUTER_SKILLS_ID=c.skill_id and c.user_id=$user_id";
    
    $query = $link->query($query1);//LIMIT 1
    $json=$query->fetch(PDO::FETCH_ASSOC);
    $query = $link->query($query2);
    $array=[];
    while($result=$query->fetch(PDO::FETCH_ASSOC)){
        $array[]=$result;
    }
    $json['SKILLS']=$array;
    header('Content-Type: application/json');
    echo json_encode($json);
                 
             }
            
            
        ?>