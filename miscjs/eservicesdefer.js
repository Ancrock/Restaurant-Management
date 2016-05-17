$(document).ready(function() {
	// Squares
	$("A.sqr").hover(function() {
		$(this).find("img").stop().animate({marginTop:'127px'});
		txt=$(this).find("DIV.sqr_txt");
		height=txt.outerHeight();
		txt.stop().animate({marginTop:(88-height)+'px'}).animate({marginTop:(95-height)+'px'}, 120).animate({marginTop:(93-height)+'px'}, 80);
	}, function() {
		$(this).find("img").stop().animate({marginTop:'0'});
		txt=$(this).find("DIV.sqr_txt");
		txt.stop().animate({marginTop:'127px'});
	});
	
	// Login box
	$("DIV#login_bt").click(function() {
		$("DIV#login_popup").toggle();
		//$("DIV#login_popup_inner").toggle();
	});
	$("DIV#login_bt").hover(function() {
		$("DIV#login_popup").show();
		$("DIV#login_popup_inner").show();
		// $("DIV#login_popup_inner").slideDown(150);
	}, function() {
		$("DIV#login_popup").hide();
		$("DIV#login_popup_inner").hide();
		// $("DIV#login_popup_inner").slideUp(150);
	});
	
	// Search FORM
	$("FORM#frm_search").submit(function() {
		return false;
        /*
		  input=$("INPUT#search_fld");
		  button=$("BUTTON#search_sbmt");
		  if (!$.trim(input.val()).length || input.val()==frm_search_default_value)
		  {	alert('What are you looking for?');
			input.focus();
			return false;
		  }
		  button.css("background-color","#D3D3D3").attr("disabled", "disabled");
		  return true;
        */
	});
	$("INPUT#search_fld")
	.click(function() {
		input=$("INPUT#search_fld");
		if (input.val()==frm_search_default_value) input.val('');
	})
	.change(function() {
		if (!$.trim($(this).val()).length) $(this).val(frm_search_default_value);
	});
	var frm_search_default_value=$("INPUT#search_fld").val();
	
	// TABS
	$("DIV#tabs A").click(function() {
		var activetab=$("DIV#tabs A.active");
		if (activetab.attr("id")!=$(this).attr("id"))
		{	$("DIV#tabs A.active").removeClass("active");
			$(this).addClass("active");
			
			switch ($(this).attr("id"))
			{	case "tab1":
					$("A.sqr").hide();
					$("DIV.sqr_main").hide();
					$("A.sqr").fadeIn();
					$("#title_tab1").show();
				break;
				case "tab2":
					$("A.sqr").hide();
					$("DIV.sqr_main").hide();
					$("#sqr_tax").fadeIn();
					$("#sqr_health").fadeIn();
					$("#sqr_civil_reg").fadeIn();
					$("#sqr_driving").fadeIn();
					$("#sqr_travel").fadeIn();
					$("#sqr_survey").fadeIn();
					$("#title_tab2").show();
				break;
				case "tab3":
					$("A.sqr").hide();
					$("DIV.sqr_main").hide();
					$("#sqr_bank").fadeIn();
					$("#sqr_insurance").fadeIn();
					$("#sqr_social_network").fadeIn();
					$("#title_tab3").show();
				break;
			}
		}
		return false;
	});
});
