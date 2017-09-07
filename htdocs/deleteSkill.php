  <?php
           
            require "databaseConnect.php";
       
 
            
            $conn=new databaseConnect("licenta_db","root","","localhost");     
            $link = $conn->connect();
            $postdata = file_get_contents("php://input");

            $request = json_decode($postdata);
            
         
            
            
            $user_id =  $request->user_id;
            $skill_id =  $request->skill_id;
             $skill_id = stripslashes($skill_id);
           
             
            $query = $link->query("DELETE FROM users_computers_skills WHERE user_id ='$user_id' AND skill_id = $skill_id");
            $result=$query->rowCount();
            $link=null;
            header('Content-Type: application/json');
         
              
            if($result!=0)
            {
                
                
                
                echo json_encode(1);
            }
            else
            {
                echo json_encode(0);
            }
            
            
            
        ?>