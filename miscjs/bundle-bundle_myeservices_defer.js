$(document).ready(function() {

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
					$("#sqr_transport").fadeIn();
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

