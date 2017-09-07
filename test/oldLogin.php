


        <?php
           
            require "databaseConnect.php";
       
            session_start(); 
            
            $conn=new databaseConnect("licenta_db","root","","localhost");     
            $link = $conn->connect();
            $postdata = file_get_contents("php://input");

            $request = json_decode($postdata);
            
         
            
            
            $user =  mysql_real_escape_string($request->user);
            $password =  mysql_real_escape_string($request->password);
            $user = stripslashes($user);
            $password = stripslashes($password);
            $password= md5($password);
            $query = $link->query("SELECT USER_ID FROM users WHERE EMAIL = '$user' AND PASSWORD = '$password'");
            $result=$query->rowCount();
            $link=null;
            header('Content-Type: application/json');
         
              
            if($result==1)
            {
                
                $id=$query->fetch(PDO::FETCH_ASSOC)['USER_ID'];
                
             $_SESSION['user_id'] = $id;
                
               setcookie('user_id',$id,time()+(3600));
                
                echo json_encode(1);
            }
            else
            {
                echo json_encode(0);
            }
            
            
            
        ?>

