$('.menu-open').click(function(){
	$('.menu').addClass('open');
});

$('.menu-close').click(function(){
	$('.menu').removeClass('open');
});

$('.menu-link').click(function(){
	$('.menu').removeClass('open');
});

$(window).bind('hashchange',changeCurrentMenu).trigger('hashchange');

function changeCurrentMenu(data){
	var hash = window.location.hash.substring(1);
	$('.menu li').removeClass('active');
	$('.menu li#'+hash).addClass('active');

	$('.content').removeClass('active');
	$('.content#'+hash).addClass('active');
}