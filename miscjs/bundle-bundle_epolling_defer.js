eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(2($){$.R.B=2(z){7 t={f:\'Q\',3:\'B\',G:c,8:c,M:T,F:P,4:\'\',C:\'V\',h:5,n:5,i:E,k:E},0=$.O({},t,z);r j.U(2(){7 1=$(j);6(1.b(\'9\')){7 4=1.b(\'9\')}11{7 4=0.4}7 m=2(){$(\'W\').s("<y u=\'"+0.3+"\' D=\'"+0.C+"\'><p D=\'v\'>"+4+"</p></y>");6(4&&0.8){$(\'#\'+0.3+\' p.v\').s("<a u=\'"+0.f+"\' Z=\'#\' 10=\'w\'>w</a>")}},e=2(){$(\'#\'+0.3).L({o:(1.x().o-$(\'#\'+0.3).I()-0.n)+\'A\',q:(1.x().q+1.12()+0.h)+\'A\'}).K().14(0.M,2(){6($.J(0.i)){0.i(1)}})},l=2(){$(\'#\'+0.3).K().Y(0.F,2(){$(j).g();6($.J(0.k)){0.k(1)}})};6(4&&!0.8){1.15(2(){$(\'#\'+0.3).g();1.b({9:\'\'});m();e()},2(){l()})}6(4&&0.8){1.H(2(d){$(\'#\'+0.3).g();1.b({9:\'\'});m();e();$(\'#\'+0.f).H(2(){l();r c});r c})}6(!0.G&&!0.8){1.13(2(d){$(\'#\'+0.3).L({o:(d.N-$(\'#\'+0.3).I()-0.n),q:(d.S+0.h)})})}})}})(X);',62,68,'settings|obj|function|toolTipId|tipContent||if|var|clickIt|title||attr|false|el|positionaToolTip|closeTipBtn|remove|xOffset|onShow|this|onHide|removeaToolTip|buildaToolTip|yOffset|top||left|return|append|defaults|id|aToolTipContent|close|offset|div|options|px|aToolTip|toolTipClass|class|null|outSpeed|fixed|click|outerHeight|isFunction|stop|css|inSpeed|pageY|extend|100|aToolTipCloseBtn|fn|pageX|200|each|defaultTheme|body|jQuery|fadeOut|href|alt|else|outerWidth|mousemove|fadeIn|hover'.split('|'),0,{}))

$(document).ready(function() {
	// Popup box
	$("DIV#privacy_protection").click(function() {
		$("DIV#privacy_protection_popup").toggle();
		//$("DIV#privacy_protection_popup_inner").toggle();
	});
	$("DIV#privacy_protection").hover(function() {
		$("DIV#privacy_protection_popup").show();
		$("DIV#privacy_protection_popup_inner").show();
	}, function() {
		$("DIV#privacy_protection_popup").hide();
		$("DIV#privacy_protection_popup_inner").hide();
	});
	
	$('.tooltip').aToolTip({
		xOffset: -100,
		yOffset: 20,
		fixed:false
	});  
});

