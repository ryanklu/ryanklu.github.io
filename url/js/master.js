$(function() {
	// smb://atlfs01/groups/Design/Public/ClientReview/Harmony
	// \\atlfs01\groups\Design\Public\ClientReview\Harmony
	function generatePcUrl(){
		var pcUrl = $('input.macUrl').val();
		var pcUrlGen = pcUrl.replace("smb:","").replace(/\//g, "\\");
		$('input.pcUrl').val(pcUrlGen);
		$('#copy-pc-button').attr('data-clipboard-text', pcUrlGen);
		$('#copy-mac-button').attr('data-clipboard-text', pcUrl);
	}
	function generateMacUrl(){
		var macUrl = $('input.pcUrl').val();
		var macUrlGen = macUrl.replace('\\\\','smb:\\\\').replace(/\\/g, '/');
		$('input.macUrl').val(macUrlGen);
		$('#copy-mac-button').attr('data-clipboard-text', macUrlGen);
		$('#copy-pc-button').attr('data-clipboard-text', macUrl);
	}
	$('button.submit').click(function(){
		if ($('input.macUrl').val()){
			generatePcUrl();
		} else if ($('input.pcUrl').val()){
			generateMacUrl();
		}
	});
	$('input').keypress(function (e) {
		if (e.which == 13) {
			if ($('input.macUrl').val()){
				generatePcUrl();
			} else if ($('input.pcUrl').val()){
				generateMacUrl();
			}
			event.preventDefault();
		}
	});
	$('button.clear').click(function(){
		$('input').not(':button, :submit, :reset, :hidden').val('');
		$('#copy-pc-button').attr('data-clipboard-text', '');
		$('#copy-mac-button').attr('data-clipboard-text', '');
	});
	// $("input[type='text']").live("click", function () {
	//    $(this).select();
	// });
    $('#copy-button').live('click', function(e) {
        e.preventDefault();
    });

	var client = new ZeroClipboard( $('#copy-mac-button') );
	var client = new ZeroClipboard( $('#copy-pc-button') );


});