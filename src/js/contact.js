$('.content#contact input[name="envoi"]').click(contactSubmitMessage);

function contactGetInput(){
	var data = {};
	data.nom = $('.content#contact input[name="nom"]').val();
	if(data.nom.length <= 0){
		$('.content#contact input[name="nom"]').addClass('wrong').click(function(){
			$('.content#contact input[name="nom"]').removeClass('wrong');
		});
		return -1;
	}
	data.email = $('.content#contact input[name="email"]').val();
	if(!isValidEmailAddress(data.email)){
		$('.content#contact input[name="email"]').addClass('wrong').click(function(){
			$('.content#contact input[name="email"]').removeClass('wrong');
		});
		return -1;
	}
	data.message = $('.content#contact textarea[name="message"]').val();
	if(data.message.length <= 0){
		$('.content#contact textarea[name="message"]').addClass('wrong').click(function(){
			$('.content#contact textarea[name="message"]').removeClass('wrong');
		});
		return -1;
	}

	return data;
}

function contactCleanInput(){
	$('.content#contact input[name="nom"]').val("");
	$('.content#contact input[name="email"]').val("");
	$('.content#contact textarea[name="message"]').val("");
}
function contactSubmitMessage(){
	var data = contactGetInput();
	if(data != -1){
		contactCleanInput();
		$.post("src/php/contact.php",{'from':data.nom, 'email': data.email, 'message':data.message},function(data){
			console.log(data);
		});
	}
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};