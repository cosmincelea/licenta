  <?php
           
            require "databaseConnect.php";
       
 
            
            $conn=new databaseConnect("licenta_db","root","","localhost");     
            $link = $conn->connect();
            $postdata = file_get_contents("php://input");

            $request = json_decode($postdata);
            
         
            
            
            $user_id =  $request->user_id;
            $skill_id =  $request->skill_id;
             $skill_id = stripslashes($skill_id);
              $combine_id=$user_id."-".$skill_id;
             
            $query = $link->query("INSERT INTO `users_computers_skills` (`user_id`, `skill_id`, `skill_level`, `skill_user_id`) VALUES ('$user_id', '$skill_id', '3', '$combine_id');");
            $result=$query->rowCount();
            $link=null;
            header('Content-Type: application/json');
         
              
            
                
                
                
                echo json_encode(1);
           
            
            
            
        ?>