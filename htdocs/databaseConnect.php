<?php
    class databaseConnect
    {
        protected $db_Conn;
        private $db_Name;
        private $db_User;
        private $db_Pass;
        private $db_Host;
        
        function __construct($db_Name,$db_User,$db_Pass,$db_Host)
        {
            $this->db_Name=$db_Name;
            $this->db_User=$db_User;
            $this->db_Pass=$db_Pass;
            $this->db_Host=$db_Host;
        }
        
        
        function connect()
        {
            if($this->db_Conn !== NULL)
            {
                return $this->db_Conn;
            }
            else
            {
                try
                {
                    $this->db_Conn=new PDO("mysql:host=$this->db_Host;dbname=$this->db_Name",$this->db_User,$this->db_Pass);
                    return $this->db_Conn;
                }
                catch(PDOException $exception)
                {
                    return $exception->getMessage();
                }
            }
        }
    }
?>

