<?php 
$to = 'oliver.gustavsson@treelineweb.com';
$subject = 'Treeline client';

$name = $_POST['name'];
$email = $_POST['email'];
$phonenr = $_POST['phonenr'];
$company = $_POST['company'];
$message = $_POST['message'];

$message = <<<EMAIL
Name:  \n <b>$name</b> \n
E_mail:  \n $email \n
Phone number: \n $phonenr \n
Company: \n $company \n
Message: \n $message \n
EMAIL;

$header = "From: $email";

if($_POST){
	if($name == '' || $email == '' || $phonenr == '' || $company == '' || $message == ''){
		$feedback = 'Please fill out all the fields';
		header("Location: index.php?feedback=$feedback");
	}else{
		mail($to, $subject, $message, $header);
		$feedback = 'Thanks for making an order to Treeline, we will get back to you as soon as possible';
		header("Location: index.php?feedback=$feedback");
			
	}
}
?>