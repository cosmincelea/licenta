  <?php
           
           
          
           
       

  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
   
  
  

  $sent_from_id =  $request->sent_from_id;
  $sent_to_id = $request->sent_to_id;
  $message_text=$request->message_text;
  $message_subject=$request->message_subject;
   
   
  
  
 
  
 

  
  
   
  $link = mysqli_connect("localhost","root","","licenta_db");
  
  mysqli_query($link,"INSERT INTO `messages` (`message_id`, `sent_from_id`, `sent_to_id`, `message_status`, `message_text`, `message_subject`) VALUES (NULL, '$sent_from_id', '$sent_to_id', '1', '$message_text', '$message_subject')")
  or die(mysqli_error($link));
 
  
  
                        
            
           
             
      
     
            
        ?>