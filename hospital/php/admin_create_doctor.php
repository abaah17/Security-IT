<?php
    $email = $_POST['dr_email'];
    $gender = $_POST['dr_gender'];
    // $id = $_POST['dr_id'];
    $name = $_POST['dr_name'];
    $password = $_POST['dr_password'];


    $connect = new mysqli("localhost", "root", "", "hospital");

    if ($connect->connect_error){
        die("Failed to connect : ".$connect->connect_error);
    } else 
    {
        
        $sql = "INSERT INTO `doctor` (`dr_password`, `dr_email`, `dr_gender`, `dr_name` )
                VALUES ('$password', '$email', '$gender', '$name' )";

        if ($connect->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
              echo "Error: " . $sql . "<br>" . $connect->error;
        }

$connect->close();

    }
?>