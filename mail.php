<?php
//get data from form  
$name = $_POST['name'];
$email= $_POST['emailaddress'];
$message= $_POST['message'];
$number = $_POST['mobile'];

$to = "shapuislam3@gmail.com";

$subject = "Mail From Shapu";
$txt ="Name = ". $name . "\r\n Email = " . $emailaddress . "\r\n Message =" . $message ."\r\n Mobile number =". $number;

$headers = "From: noreply@codeconia.com";
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}
//redirect
// header("Location:thankyou.html");
?> 