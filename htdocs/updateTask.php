  <?php
           
           
          
           
  

  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
   
  require "databaseConnect.php";
 

  $task_id=$request->task_id;
  $task_status = $request->task_status;
  $task_comment=$request->task_comment;
 
  
 

  
  
   
  $link2 = mysqli_connect("localhost","root","","licenta_db");
  
  mysqli_query($link2,"Update `tasks` set `task_status`='$task_status', task_comment='$task_comment' where task_id=$task_id");


  
 echo "Success";
  
                        
            
           
             
      
     
            
        ?>