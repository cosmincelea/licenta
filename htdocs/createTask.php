  <?php
           
           
          
           
  session_start();

  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
   
  require "databaseConnect.php";
 

  $user_id =$request->user_id;
  $task_name = $request->task_name;
  $task_comment=$request->task_comment;
  $estimatedTime=$request->estimatedTime;
  $due_date=$request->due_date;
  $priority=$request->priority;
  $task_status="Opened";
  

  
 

  
  
   
  $link2 = mysqli_connect("localhost","root","","licenta_db");
  
  mysqli_query($link2,"INSERT INTO `tasks` (`task_id`, `priority`, `user_id`, `due_date`, `estimated_time`, `task_comment`, `task_name`,`task_status`) VALUES (NULL, '$priority', '$user_id', '$due_date', '$estimatedTime', '$task_comment', '$task_name','$task_status')");

  $link = mysqli_connect("localhost","root","","licenta_db");
  
  mysqli_query($link,"INSERT INTO `messages` (`message_id`, `sent_from_id`, `sent_to_id`, `message_status`, `message_text`, `message_subject`) VALUES (NULL, '12', '$user_id', '3', 'You have a new task !', '$task_name')")
  or die(mysqli_error($link));

  
 echo "Success";
  
                        
            
           
             
      
     
            
        ?>