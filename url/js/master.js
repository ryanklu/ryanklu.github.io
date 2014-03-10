$(function() {
	// smb://atlfs01/groups/Design/Public/ClientReview/Harmony
	// \\atlfs01\groups\Design\Public\ClientReview\Harmony
	function generatePcUrl(){
		var pcUrl = $('input.macUrl').val();
		var pcUrlGen = pcUrl.replace("smb:","").replace(/\//g, "\\");
		$('input.pcUrl').val(pcUrlGen);
		$('#copy-pc-button').attr('data-clipboard-text', pcUrlGen);
		$('#copy-mac-button').attr('data-clipboard-text', pcUrl);
		setTimeout(function () {
          $('button.submit').button('reset')
        }, 300);
	}
	function generateMacUrl(){
		var macUrl = $('input.pcUrl').val();
		var macUrlGen = macUrl.replace('\\\\','smb:\\\\').replace(/\\/g, '/');
		$('input.macUrl').val(macUrlGen);
		$('#copy-mac-button').attr('data-clipboard-text', macUrlGen);
		$('#copy-pc-button').attr('data-clipboard-text', macUrl);
		setTimeout(function () {
          $('button.submit').button('reset')
        }, 300);
	}
	function clearPage(){
		$('input').not(':button, :submit, :reset, :hidden').val('');
		$('#copy-pc-button').attr('data-clipboard-text', '');
		$('#copy-mac-button').attr('data-clipboard-text', '');
		$('#copy-mac-button, #copy-pc-button').removeClass('copied').find('i').attr('class','icon-plus-sign');
	}
	clearPage();
	$('button.submit').click(function(){
		if ($('input.macUrl').val()){
			$('button.submit').button('loading');
			generatePcUrl();
		} else if ($('input.pcUrl').val()){
			$('button.submit').button('loading');
			generateMacUrl();
		}
	});
	$('input').keypress(function (e) {
		if (e.which == 13) {
			if ($('input.macUrl').val()){
				$('button.submit').button('loading');
				generatePcUrl();
			} else if ($('input.pcUrl').val()){
				$('button.submit').button('loading');
				generateMacUrl();
			}
			e.preventDefault();
		}
	});
	$('button.clear').click(function(){
		clearPage();
	});
	// $("input[type='text']").live("click", function () {
	//    $(this).select();
	// });
    $('#copy-button').live('click', function(e) {
        e.preventDefault();
    });

	var client = new ZeroClipboard( $('#copy-mac-button, #copy-pc-button') );

	client.on( "load", function(client) {
		// alert( "movie is loaded" );
		client.on( "complete", function(client, args) {
			// `this` is the element that was clicked
			if($('input.pcUrl').val()){
				$('#copy-mac-button, #copy-pc-button').removeClass('copied').find('i').attr('class','icon-plus-sign');
				$(this).addClass('copied').find('i').attr('class','icon-ok-sign');
			}
		});
	});

});