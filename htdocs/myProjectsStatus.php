<?php
    include_once("database_connect.php");
    session_start();
    
    $id = $_SESSION['user_id'];
    $sql = "SELECT project_id from project_team where user_id='$id';";
     
    $array2 = array();
    if($result = mysqli_query($link, $sql)){
        if(mysqli_num_rows($result) > 0){
            while($row = mysqli_fetch_assoc($result)){
                $array2[] = $row['project_id'];
            }
        }
    } else {
        echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
    }

    $projectIds = implode(",", $array2);
  
    $sql2 = "SELECT project_id, project_name, start_date, finalised from projects WHERE project_id IN($projectIds) ORDER BY project_id DESC;";
    
    $array = array();
    $array[0]=0; // $projects_finalised
    $array[1]=0; // $projects_in_development
    if($result = mysqli_query($link, $sql2)){
        if(mysqli_num_rows($result) > 0){
            while($row = mysqli_fetch_assoc($result)){
                if($row['finalised'] == 1) {
                    $array[1]++;
                } else {
                    $array[0]++;
                }
            }
        }
    } else {
        echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
    }

    header('Content-Type: application/json');
    echo json_encode($array);

    include_once("database_close.php");
?>
