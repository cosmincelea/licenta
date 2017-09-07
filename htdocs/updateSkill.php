  <?php
           
            require "databaseConnect.php";
       
 
            
            $conn=new databaseConnect("licenta_db","root","","localhost");     
            $link = $conn->connect();
            $postdata = file_get_contents("php://input");

            $request = json_decode($postdata);
            
         
            
            
            $user_id =  $request->user_id;
            $skill_id =  $request->skill_id;
            $skill_level=$request->skill_level;
             $skill_id = stripslashes($skill_id);
           
             
            $query = $link->query("UPDATE users_computers_skills SET skill_level='$skill_level'  WHERE user_id ='$user_id' AND skill_id = '$skill_id'");
            $result=$query->rowCount();
            $link=null;
            header('Content-Type: application/json');
//             INSERT INTO `users_computers_skills` (`user_id`, `skill_id`, `skill_level`) select 2, 20,4 where not EXISTS (SELECT * from users_computers_skills where user_id = 2 and skill_id=20)
              
            if($result!=0)
            {
                
                
                
                echo json_encode(1);
            }
            else
            {
                echo json_encode(0);
            }
            
            
            
        ?>