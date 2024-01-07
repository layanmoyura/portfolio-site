<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    // You can customize the filename and path as needed
    $file = "form_data.txt";

    // Prepare the data to be written to the text file
    $data = "Name: $name\nEmail: $email\nSubject: $subject\nMessage: $message\n\n";

    // Save the data to the text file
    file_put_contents($file, $data, FILE_APPEND | LOCK_EX);

    // Send a success response to the AJAX request
    echo "success";
} else {
    // Send an error response if the request method is not POST
    http_response_code(400);
    echo "Bad Request";
}
?>
