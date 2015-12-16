$('.form input[name=generate]').click(function(){
	postForm();
})

$('.form input[name=regenerate]').click(function(){
	window.location.reload();
})

// Keyboard events
$(window).keydown(function (event) {
	$('.form input[name=url]').css('color','');
    if (event.which == 13) postForm();
});

function postForm(){
	var url = new String($('.form input[name=url]').val());
	if(url.validURL())
		encode(url);
	else
		$('.form input[name=url]').css('color','red');
}

function encode(url){
	var hash = url.hashCode();
	if(readData(hash) == null){
		$.get("src/php/file.php?",{'do':'get','file':'urlmap','data':hash},function(data){
			if(data.length == 0){
				$.get("src/php/file.php?",{'do':'save','file':'urlmap','data':hash+";"+url},function(data){
					storeData(hash,url);
					afficheCode(hash);
				},'json');
			} else {
				storeData(hash,data[hash]);
				afficheCode(hash);
			}
		},'json');
	} else {
		afficheCode(hash);
	}
	return ;
}

function afficheCode(key){
	$('.form input[name=url]').val('lunik.xyz/s/#'+key).attr("data-url",'lunik.xyz/s/#'+key).select();
	$('.form input[name=generate]').hide();
	$('.form input[name=regenerate]').show();
}

String.prototype.hashCode = function(){
	var hash = 0, i, chr;
	if(this.length == 0) return hash;
	for (var i = 0; i < this.length; i++) {
		hash = ((hash << 5) - hash) + this.charCodeAt(i);
		hash |= 0;
	};
	hash = Math.abs(hash);
	hash = hash.toString(36);
	return hash;
	//hash to ascii
}

String.prototype.validURL = function() {
  var pattern = new RegExp(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/); // fragment locator
  return pattern.test(this);
}