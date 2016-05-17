$(document).ready(function() {
	// Squares animated
	$("DIV.sqra").click(function() {
		$(this).find("DIV.hpbox_title").stop().animate({marginTop:'153px'},350);
		txt=$(this).find("DIV.hpbox_text");
		txt.stop().animate({marginTop:'-308px'},350);
	//BFA	$(this).click(function() {
	//BFA		window.location.href=$(this).attr('href');
	//BFA	});
	});
	
	// Squares static
	$("DIV.sqrs").click(function() {
		window.location.href=$(this).attr('href');
	});
	
	// Login box
	//BFA $("DIV#login_bt").click(function() {
	//BFA 	$("DIV#login_popup").toggle();
	//BFA 	$("DIV#login_popup_inner").toggle();
	//BFA });
	//BFA $("DIV#login_bt").hover(function() {
	//BFA 	$("DIV#login_popup").show();
	//BFA 	$("DIV#login_popup_inner").show();
	//BFA 	// $("DIV#login_popup_inner").slideDown(150);
	//BFA }, function() {
	//BFA 	$("DIV#login_popup").hide();
	//BFA 	$("DIV#login_popup_inner").hide();
		// $("DIV#login_popup_inner").slideUp(150);
	//BFA });
	
	// Search FORM
	//BFA $("FORM#frm_search").submit(function() {
	//BFA 	  input=$("INPUT#search_fld");
	//BFA 	  button=$("BUTTON#search_sbmt");
	//BFA 	  if (!$.trim(input.val()).length || input.val()==frm_search_default_value)
	//BFA 	  {	alert('What are you looking for?');
	//BFA 		input.focus();
	//BFA 		return false;
	//BFA 	  }
	//BFA 	  button.css("background-color","#D3D3D3").attr("disabled", "disabled");
	//BFA 	  return true;
	//BFA });
	//BFA $("INPUT#search_fld")
	//BFA .click(function() {
	//BFA 	input=$("INPUT#search_fld");
	//BFA 	if (input.val()==frm_search_default_value) input.val('');
	//BFA })
	//BFA .change(function() {
	//BFA 	if (!$.trim($(this).val()).length) $(this).val(frm_search_default_value);
	//BFA });
	//BFA var frm_search_default_value=$("INPUT#search_fld").val();
	//BFA 
	//BFA $('input, textarea').placeholder();
	
});

