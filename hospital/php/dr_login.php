<?php
    $email = $_POST['dr_email'];
    $password = $_POST['dr_password'];

    $connect = new mysqli("localhost", "root", "", "hospital");

    if ($connect->connect_error){
        die("Failed to connect : ".$connect->connect_error);
    } else 
    {
        // SELECT `admin_id`, `admin_email`, `admin_password` FROM `admin` WHERE 1
        $stmt = $connect->prepare("select * from doctor where dr_email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt_result = $stmt->get_result();


        if($stmt_result->num_rows > 0){
            $data = $stmt_result-> fetch_assoc();
            echo $data['dr_password'];
            if($data['dr_password'] === $password){
                // echo "<h2> Login successful </h2>";
                header("location: ..\doctor_interface.html");
            }else{ }
        }else{
            echo "<h2> Invalid email or password </h2>";
        }
    }
?>