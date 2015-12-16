//$(window).load(updateLocalStorage);
$(window).bind('hashchange',decode).trigger('hashchange');

function redirect(url){
	url = url.split("\"").join("");
	window.location.href = url;
}

function decode(key){
	var hashval = window.location.hash.substr(1);
	var url = readData(hashval);
	if(url != null && url.length){
		redirect(url);
	} else {
		$.get("src/php/file.php?",{'do':'get','file':'urlmap','data':hashval},function(data){
			$.each(data,function(index,value){
				if(index.length && value.length){
					storeData(index,value);
					redirect(value);
				}
			});
		},'json');
	}
}

function updateLocalStorage(){
	$.get("src/php/file.php?",{'do':'read','file':'urlmap'},function(data){
		$.each(data,function(index,value){
			if(index.length && value.length)
				storeData(index,value);
		});
	},'json');
}