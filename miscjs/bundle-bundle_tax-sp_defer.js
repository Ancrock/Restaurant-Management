$(document).ready(function() {

	$("FORM#frm_file_your_tax").submit(function (){	
		input=$("input[name='taxpayer_id']");
		if (!input.val() || !$.isNumeric(input.val()))
		{	input.css('background-color','#F6AEC2');
			alert('Input your taxpayer ID ...');
			input.css('background-color','');input.focus();
			return false;
		}
		input=$("input[name='lastname']");
		if (!input.val())
		{	input.css('background-color','#F6AEC2');
			alert('Input your lastname ...');
			input.css('background-color','');
			input.focus();
			return false;
		}
		input=$("input[name='firstname']");
		if (!input.val())
		{	input.css('background-color','#F6AEC2');
			alert('Input your firstname ...');
			input.css('background-color','');
			input.focus();
			return false;
		}
		input=$("input[name='amount']");
		if (!input.val() || !$.isNumeric(input.val()))
		{	input.css('background-color','#F6AEC2');
			alert('Input amount ...');
			input.css('background-color','');
			input.focus();
			return false;
		}

		return true;
	});
	
	$("INPUT#fillbt").click(function(){
		return true;
	});
});

