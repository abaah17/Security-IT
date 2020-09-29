<?php
    $email = $_POST['patient_email'];
    // $id = $_POST['patient_id'];
    $password = $_POST['patient_password'];
    $name = $_POST['patient_name'];
    $gender = $_POST['patient_gender'];
    
    // echo $email;
    // echo $gender;


    $connect = new mysqli("localhost", "root", "", "hospital");

    if ($connect->connect_error){
        die("Failed to connect : ".$connect->connect_error);
    } else 
    {

        $sql = "INSERT INTO `patient` (`patient_password`, `patient_email`, `patient_gender`, `patient_name`)
                VALUES ('$password', '$email', '$gender', '$name')";

        if ($connect->query($sql) === TRUE) {
            echo "New record created successfully Name : $name Email : $email" ;
        } else {
              echo "Error: " . $sql . "<br>" . $connect->error;
        }

    

$connect->close();

    }
?>