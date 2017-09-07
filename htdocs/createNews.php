  <?php
           
           
          
           
  session_start();

  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
   
  require "databaseConnect.php";
 

  $news_subject =$request->news_subject;
  $news_message=mysql_real_escape_string($request->news_message);
  
  

  
 

  
  
   
  $link2 = mysqli_connect("localhost","root","","licenta_db");
  
  mysqli_query($link2,"INSERT INTO `news` (`news_id`, `news_subject`, `news_message`, `date_added`) VALUES (NULL, '$news_subject', '$news_message', CURRENT_TIMESTAMP);");

 
  
 echo "Success";
  
                        
            
           
             
      
     
            
        ?>