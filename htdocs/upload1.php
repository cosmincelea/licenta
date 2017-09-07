<?php
$target_dir = "images/profilePictures/";
$new_name=$_POST["pictureName"];
$temp = explode(".", $_FILES["fileToUpload"]["name"]);
$newfilename = $target_dir . $new_name. '.jpg' ;
$target_file = $newfilename;
$uploadOk = 1;

$imageFileType = pathinfo($_FILES["fileToUpload"]["name"],PATHINFO_EXTENSION);

function png2jpg($originalFile, $outputFile, $quality) {
    $image = imagecreatefrompng($originalFile);
    imagejpeg($image, $outputFile, $quality);
    imagedestroy($image);
}



// Check file size
if ($_FILES["fileToUpload"]["size"] > 3500000) {
    echo 'Error: Sorry, your file is too large.';
    $uploadOk = 0;
}
// Allow certain file formats

else if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
	echo 'Error: Sorry, your file is not a picture.';
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
//     echo 'Error: Sorry, your file was not uploaded.';
// if everything is ok, try to upload file
}  else {
	if($imageFileType == "png"){
     png2jpg($_FILES["fileToUpload"]["tmp_name"], $target_file, 120);}
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo 'Succes: The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.';
    } else {
        echo 'eroare ';
    }
}
?>