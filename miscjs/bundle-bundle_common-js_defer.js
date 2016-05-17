$(document).ready(function() {

    // Login box
    $("DIV#login_bt").click(function() {
        $(this).find("DIV#login_popup").toggle();
        //$(this).find("DIV#login_popup_inner").toggle();
    });
    $("DIV#login_bt").hover(function() {
        $(this).find("DIV#login_popup").show();
        $(this).find("DIV#login_popup_inner").slideDown(150);
    }, function() {
        $(this).find("DIV#login_popup").hide();
        $(this).find("DIV#login_popup_inner").slideUp(150);
    });
});


$(document).ready(function() {


    // Search FORM
    $("FORM#frm_search").submit(function() {
        input=$("INPUT#search_fld");
        button=$("BUTTON#search_sbmt");
        if (!$.trim(input.val()).length || input.val()==frm_search_default_value)
        {	alert('What are you looking for?');
            input.focus();
            return false;
        }
        button.css("background-color","#D3D3D3").attr("disabled", "disabled");
        return true;
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
});
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
});

