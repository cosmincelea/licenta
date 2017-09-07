  <?php
           
           
          
           
  session_start();

  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
   
  require "databaseConnect.php";
 

  $user_id =$request->project_teamlead_id;
  $project_description = mysql_real_escape_string($request->project_description);
  $project_name=$request->project_name;
  $estimatedTime=$request->estimatedTime;
  $start_date=$request->start_date;
   
  
  

  
 

  
  $conn=new databaseConnect("licenta_db","root","","localhost");
  $link = $conn->connect();
   
  $link2 = mysqli_connect("localhost","root","","licenta_db");
  
  mysqli_query($link2,"INSERT INTO `projects` (`project_id`, `start_date`, `project_description`, `project_name`, `estimatedTime`, `user_id`, `finalised`) VALUES (NULL, '$start_date', '$project_description', '$project_name', '$estimatedTime', '$user_id', '1');");

  $query1="SELECT MAX(project_id) id from projects ; ";
  
  
  
  $query = $link->query($query1);
  $id=$query->fetch(PDO::FETCH_ASSOC);

  
 
  
 echo "Success".$id["id"];
  
                        
            
           
             
      
     
            
        ?>