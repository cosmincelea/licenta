  <?php
           
            require "databaseConnect.php";
       
 
            
            $conn=new databaseConnect("licenta_db","root","","localhost");     
            $link = $conn->connect();
            $postdata = file_get_contents("php://input");

            $request = json_decode($postdata);
            
         
            
            
            $user_id =  $request->user_project_id;
            
           echo $user_id;
             
            $query = $link->query("DELETE IGNORE FROM project_team WHERE user_project_id ='$user_id' ");
            $result=$query->rowCount();
          
           echo $result;
            
            
            
        ?>