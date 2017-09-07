  <?php
           
            require "databaseConnect.php";
       
 
            
            $conn=new databaseConnect("licenta_db","root","","localhost");     
            $link = $conn->connect();
            $postdata = file_get_contents("php://input");

            $request = json_decode($postdata);
            
         
            
            
            $message_id =  $request->message_id;
            
           
             
            $query = $link->query("DELETE FROM messages WHERE message_id ='$message_id' ");
            $result=$query->rowCount();
            $link=null;
      
         
              
         
            
            echo "Succes";
           
            
            
        ?>