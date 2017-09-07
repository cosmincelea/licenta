<?php 
session_start();

if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Finally, destroy the session.
if(session_destroy()){


header("Location: http://localhost/Licenta/Templates/login.html"); 
echo "Sesiune inchisa";
}
?>