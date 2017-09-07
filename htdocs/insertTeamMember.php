  <?php
           
           
          
           
  session_start();

  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
   
  
 

  $user_id =$request->user_id;
  $project_id = $request->project_id;
  $role_name=$request->role_name;
 $project_name=$request->project_name;
   
  $uniqueEntry=$user_id."t".$project_id;
  


 

 
  
   
  $link = mysqli_connect("localhost","root","","licenta_db");
  
  mysqli_query($link,"INSERT IGNORE INTO `project_team` (`project_id`, `user_id`, `role_name`, `user_project_id`) VALUES ('$project_id', '$user_id', '$role_name', '$uniqueEntry');")
  or die(mysqli_error($link));
 
  mysqli_query($link,"INSERT INTO `messages` (`message_id`, `sent_from_id`, `sent_to_id`, `message_status`, `message_text`, `message_subject`) VALUES (NULL, '12', '$user_id', '3', 'You have a been asigned to a new project !', '$project_name')")
  or die(mysqli_error($link));
 
  
  
  
  
 echo "Success";
                        
            
           
             
      
     
            
        ?>