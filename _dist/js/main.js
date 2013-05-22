$(document).ready(function() {
	
	var nav_items = document.getElementsByClassName("nav-item");

	$(nav_items).click(function(e) {
		
		var pathname = window.location.pathname;
		console.log(pathname);
  		target = $(this).attr("href");
  		target = target.replace('/','');  	
  		console.log($(target).offset().top);	 		
  		$('html, body').animate({
			scrollTop: $(target).offset().top - 60
		}, 500);
		// location = pathname; 	
			
		e.preventDefault();
	});
});