<?
	$to = "contact@lunik.xyz";
	$email = $_POST['email'];
	$objet = "Contact Lunik.xyz";

	$headers = "Content-type: text/html; charset=UTF-8"."\n";
	$headers .= 'Reply-To: '.$email."\n";
	$headers .= 'From: "'.$_POST['from'].'"<'.$email.'>'."\n";
	$headers .= 'Delivered-to: '.$to."\n";

	$message = $_POST['message'];
	if(mail($to, $objet, $message, $headers)){
		echo 1;
	} else {
		echo -1;
	}
?>