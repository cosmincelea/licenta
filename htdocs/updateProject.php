  <?php
           
           
          
           
  session_start();

  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
   
  require "databaseConnect.php";
 

  $user_id_team =$request->project_teamlead_id;
  $project_description = mysql_real_escape_string($request->project_description);
  $project_name=$request->project_name;
  $estimatedTime=$request->estimatedTime;
  $start_date=$request->start_date;
   $project_id=$request->project_id;
   $project_finalised=$request->finalised;
  

 
  
 

  
  
   
  $link2 = mysqli_connect("localhost","root","","licenta_db");
  
  mysqli_query($link2,"Update `projects` set `project_description`='$project_description', start_date='$start_date',  `project_name`='$project_name',`finalised`='$project_finalised', `estimatedTime`='$estimatedTime', `user_id`='$user_id_team' where project_id=$project_id");


  
 echo "Success";
  
                        
            
           
             
      
     
            
        ?>