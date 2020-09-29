<?php
    $email = $_POST['patient_email'];
    $password = $_POST['patient_password'];

    $connect = new mysqli("localhost", "root", "", "hospital");

    if ($connect->connect_error){
        die("Failed to connect : ".$connect->connect_error);
    } else 
    {
        
        $stmt = $connect->prepare("select * from patient where patient_email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt_result = $stmt->get_result();

        if($stmt_result->num_rows > 0){
            $data = $stmt_result-> fetch_assoc();
            if($data['patient_password'] === $password){
                echo "<h2> Login successful </h2>";
                header("location: ..\patient_interface.html");
            }else
                { 
                    echo "<script>alert('Invalid Password');</script>";
                }
        }else{

            echo "<h2> Invalid email or password1 </h2>";
        }
    }
?>