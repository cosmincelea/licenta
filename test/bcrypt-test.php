<?php
$options = array('cost' => 12);
echo "Bcrypt: ";
echo $hash = password_hash("test1234", PASSWORD_BCRYPT, $options);
echo "<br>";
echo "Verify now:<br>";
if (password_verify('test1234', $hash)) {
    echo 'Password is valid!';
} else {
    echo 'Invalid password.';
}
?>