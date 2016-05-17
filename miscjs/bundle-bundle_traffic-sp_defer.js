$(document).ready(function() {
	// Accordion
	$("DIV#accordion DIV.title").click(function(){
		var nextdiv=$(this).next("DIV");
		if (nextdiv.is(":visible"))
		{	
			$(this).removeClass("arrow_up").addClass("arrow_down");
			nextdiv.slideUp();	
		} else
		{	$(this).removeClass("arrow_down").addClass("arrow_up");
			nextdiv.slideDown();
		}
		
	});
});

