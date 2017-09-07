  <?php
           
           
          
           
  session_start();

  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
   
  require "databaseConnect.php";
 

  $LAST_NAME =$request->last_name;
  $FIRST_NAME = $request->first_name;
  $EMAIL=$request->email;
  $PHONENUMBER=$request->phonenumber;
  $START_DATE=$request->start_date;
  $BIRTH_DATE=$request->birth_date;
  $LOCATION_ID=$request->location_id;
  $PASS=$request->password;
  $ROLE_ID=$request->role_id;
  
  

  $options = array('cost' => 12);
  
  $PASSWORD = password_hash($PASS, PASSWORD_BCRYPT, $options);
 

  
  $conn=new databaseConnect("licenta_db","root","","localhost");
  $link = $conn->connect();
   
  $link2 = mysqli_connect("localhost","root","","licenta_db");
  
  mysqli_query($link2,"INSERT INTO `users` (`USER_ID`, `LAST_NAME`, `FIRST_NAME`, `EMAIL`, `PHONENUMBER`, `START_DATE`, `CLIENT_FACING`,  `BIRTH_DATE`, `LOCATION_ID`, `PASSWORD`, `USER_TYPE`, `ROLE_ID`) VALUES (NULL, '$LAST_NAME', '$FIRST_NAME', '$EMAIL', '$PHONENUMBER', '$START_DATE', '3',  '$BIRTH_DATE', '$LOCATION_ID', '$PASSWORD', '0', '$ROLE_ID');");

  $query1="SELECT MAX(project_id) id from projects ; ";
  
  
  
  $query = $link->query($query1);
  $id=$query->fetch(PDO::FETCH_ASSOC);

  
 echo "Success".$id["id"];
  
                        
            
           
             
      
     
            
        ?>