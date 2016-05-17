$(document).ready(function() {
	
	$("FORM#frm_open_acct").submit(function (){	
		input=$("input[name='lastname']");
		if (!input.val())
		{	input.css('background-color','#F6AEC2');
			//alert('Enter your Last name ...');
			input.focus();
			return false;
		} else 
		    input.css('background-color',''); 
		
		input=$("input[name='firstname']");
		if (!input.val())
		{	input.css('background-color','#F6AEC2');
			//alert('Enter your First name ...');
			input.focus();
			return false;
		} else
		    input.css('background-color','');
		
		input=$("input[name='dateofbirth']");
		if (!input.val())
		{	input.css('background-color','#F6AEC2');
			//alert('Enter your Date of Birth ...');
			input.focus();
			return false;
		} else
		    input.css('background-color','');
		
		input=$("input[name='address']");
		if (!input.val())
		{	input.css('background-color','#F6AEC2');
			//alert('Enter your Address ...');
			input.focus();
			return false;
		} else
		    input.css('background-color','');
		
		input=$("input[name='town']");
		if (!input.val())
		{	input.css('background-color','#F6AEC2');
			//alert('Enter your Town ...');
			input.focus();
			return false;
		} else
		    input.css('background-color','');
		
		input=$("input[name='country']");
		if (!input.val())
		{	input.css('background-color','#F6AEC2');
			//alert('Enter your Country ...');
			input.focus();
			return false;
		} else
		    input.css('background-color','');
	
		if(!terms_accept.checked) {
		    alert("Please accept the terms and conditions");
		    return false;
		}			
		
		//alert('Submiting form ...');
		return true;
	});
	
	
	// Login box
	$("DIV#login_bt").click(function() {
		$("DIV#login_popup").toggle();
	});
	$("DIV#login_bt").hover(function() {
		$("DIV#login_popup").show();
	}, function() {
		$("DIV#login_popup").hide();
	});
	
	// Search FORM
	$("FORM#frm_search").submit(function() {
		  input=$("INPUT#search_fld");
		  button=$("BUTTON#search_sbmt");
		  if (!$.trim(input.val()).length || input.val()==frm_search_default_value)
		  {	alert('What are you looking for?');
			input.focus();
			return false;
		  }
		  button.attr("disabled", "disabled");
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

function dispose(){
    if(sigObj != null){
      sigObj.dispose();
      sigObj = null;
    }
};

function doSignature(tosign) {

  var config = {

      renderTo : "signbox",
      callback : function(response) {

          switch (response.result_code) {
          case MeHuNa.Signature.RESPONSE_CODE.SUCCESS:
            // we got the signature and certificate
            $('#signbox').hide();
			$('#finishtransfer').show();
            // result in response.certificate and response.cryptogram
            var cert = new SCrypto.X509Certificate(response.certificate);
            var name
            var endname = cert.subject.indexOf(",",0);
            if (endname > 0) {
              name = cert.subject.substring(
                            cert.subject.indexOf("=",0) + 1,
                            cert.subject.indexOf(",",0));
            } else {
              name = cert.subject.substring(
                            cert.subject.indexOf("=",0) + 1);
            }

			var checkingBal = $("#checkingBal").val();
			var savingsBal = $("#savingsBal").val();
			var amount = $("#amount").val();
			var newCheckingBal;
			var newSavingBal;
            var fromAccount = $("#fromAccount").val();
            var toAccount = $("#toAccount").val();

			if((fromAccount.search("Checkin") != -1) && (toAccount.search("Savings") != -1)) {
                newCheckingBal = parseFloat(checkingBal.replace(/,/g,'')) - parseFloat(amount.replace(/,/g,''));
				newSavingBal = parseFloat(savingsBal.replace(/,/g,'')) + parseFloat(amount.replace(/,/g,''));
            }

			if((fromAccount.indexOf("Savings") != -1) && (toAccount.indexOf("Checkin") != -1)) {
                newCheckingBal = parseFloat(checkingBal.replace(/,/g,'')) + parseFloat(amount.replace(/,/g,''));
				newSavingBal = parseFloat(savingsBal.replace(/,/g,'')) - parseFloat(amount.replace(/,/g,'')); 
            }

			$("#checkingBal").val(newCheckingBal);
			$("#savingsBal").val(newSavingBal);
		
			var savingsBal = $("#savingsBal").val();
            $("#cert-subject").html(name);
            $('#donebox').show();
            $('#declare').show();
            break;
          case MeHuNa.Signature.RESPONSE_CODE.WRONG_SMARTCARD:
			   alert('wrong smartcard');
            // nothing to do:
            // the cardui widget already displays a message
            // and waits for another card
            return;
          case MeHuNa.Signature.RESPONSE_CODE.ABORTED:
			  alert('aborted');
            error("aborted");
            break;
          case MeHuNa.Signature.RESPONSE_CODE.NO_CERTIFICATE:
			   alert('nocert');
            error("nocert");
            break;
          case MeHuNa.Signature.RESPONSE_CODE.FAILED:
			  alert('failed');
          default:
            error("error");
          }

        dispose();
      },

      responseType : "PKCS1",

      blobToSign   : tosign,   // ASCII, original message.
      blobHashMode : "none"

    };

    sigObj = new MeHuNa.Signature();
    sigObj.run(config);
};

function error(msg) {
  $('#signbox').hide();
  $('#errormsg').html($("#"+msg).html());
  $('#errorbox').show();
}

// copy data input to a preview text field
function preview(id) {
  var value;
  if (id.indexOf("select") === 0) {
    value = $('#'+id+' :selected').text()
  } else if (id.indexOf("radio") === 0) {
    value = $("input:radio[name="+id+"]:checked").attr('value')
  } else {
    value = $('#'+id).val();
  }
  $('#'+id+"_preview").html(jQuery.trim(value));
}

// check name is valid: len > 1
function isNameValid() {
  var name = $("#name").val();
  name = jQuery.trim(name);
  if (name.length > 0) {
    return true;
  } else {
    $("#name").focus();
    $("#name").css("background-color", "red");
    return false;
  }
}

// check birth date is valid
function isBirthDateValid() {
  var day = $("#birthdate_day").val();
  var month = $("#birthdate_month").val();
  var year = $("#birthdate_year").val();
  var d = new Date()
  var now = new Date().getTime()
  d.setFullYear(year,month-1,day);
  if (d.getTime() > now) {
	alert("Invalid date: cannot be in the future");
    $("#birthdate_day").focus();
    return false;
  } else {
    return true
  }
}

// check input data is valid
function isInputValid() {
	//return is
  //return isNameValid() && isBirthDateValid();
}

// checks input validity, and asks confirmation to user
function requestConfirmation() {
  if (isInputValid()) {
    $('.requestview').hide();
    var items = [ "name", "radio_gender",
                    "birthdate_day", "birthdate_month", "birthdate_year" ];
    for (var i = 0; i < items.length; i++) {
      preview(items[i]);
    }
    $('.confirmview').show();
    $('#confirmationbox').css("background-color", "lightGreen");
    $('#confirm').focus();
  }
  return false;
}

// real submit:
function doSign() {
  try {
	  $('#confirmationbox').hide();

	  // Blob preparation
	  // TODO:
	  // For now, we sign a textual form where fields
	  // are named after HTML fields
	  var items = [ "name", "radio_gender",
                    "birthdate_day", "birthdate_month", "birthdate_year" ];
	  var transaction = "";
	  for (var i = 0; i < items.length; i++) {
		  var itemval = $("#" + items[i] + "_preview").html();
		  transaction += items[i] + " = " + itemval + "\n";
	  }
	  $('#signbox').show();
	  doSignature(transaction);
  } catch (ex) {
	alert("Error - your cache is being refreshed, please retry");
    window.location.reload(true);
  }
  return false;
}

// go to edition mode: editable form
function setEditionMode() {
  $('.requestview').show();
  $('.confirmview').hide();
  $('#donebox').hide();
  $('#errorbox').hide();
  $('#signbox').hide();
  $('#declare').hide();
  $('#confirmationbox').show();
  $('#confirmationbox').css("background-color", "white");
  $("#name").focus();
  return false;
}



