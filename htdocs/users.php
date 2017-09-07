<?php
    require "databaseConnect.php";
    $conn=new databaseConnect("licenta_db","root","","localhost");
    $link = $conn->connect();
   


    
   
    
    $query1="Select a.USER_ID, a.FIRST_NAME,a.LAST_NAME,b.location_link,a.BIRTH_DATE,a.EMAIL,a.ROLE_ID,a.CLIENT_FACING,a.USER_TYPE,a.PHONENUMBER,a.START_DATE,b.location_name from users a ,locations b where a.LOCATION_ID=b.location_id ";
    
    
    
    $query = $link->query($query1);
 
   $counter=0;
  
    $array=[];
    
    while($result=$query->fetch(PDO::FETCH_ASSOC)){
        $array[]=$result;
        $counter=$counter+1;
      $id=$result['USER_ID'];
       $query2="Select c.skill_level,d.SKILL_NAME,d.COMPUTER_SKILLS_ID from computer_skills d,users_computers_skills c where  d.COMPUTER_SKILLS_ID=c.skill_id and c.user_id=$id";
           $query2 = $link->query($query2);
           $array2=[];
        while($result2=$query2->fetch(PDO::FETCH_ASSOC)){
        	
       $array2[] =$result2;
        
        
    }
       $array[$counter-1]["SKILLS"]= $array2;
       
       
    }
    $json=$array;

    header('Content-Type: application/json');
   echo json_encode($json);
?>
