  <?php
           
           
          
           
       

  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
   
  
  

  $messageId =  $request->messageId;
  $messageStatus = $request->messageStatus;
   
   
  
  
 
  
 

  
  
   
  $link = mysqli_connect("localhost","root","","licenta_db");
  
  mysqli_query($link,"UPDATE `messages` SET `message_status` = '$messageStatus' WHERE `messages`.`message_id` = $messageId")
  or die(mysqli_error($link));
 
  
  
                        
            
           
             
      
     
            
        ?>