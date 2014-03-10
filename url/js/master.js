ryanklu = {};
ryanklu.url = {

	input : $('input'),
	submitBtn : $('button.submit'),
	resetBtn : $('button.clear'),
	pcBtn : $('#copy-pc-button'),
	macBtn : $('#copy-mac-button'),
	pcMacBtn : $('#copy-mac-button, #copy-pc-button'),
	pcInput : $('input.pcUrl'),
	macInput : $('input.macUrl'),

	init : function(){
		var $self =  this,
			$object = ryanklu.url;

		$self.copyUrl();
		$self.clearPage();

		$object.submitBtn.click(function(){
			$self.generateUrl();
		});
		$object.input.keypress(function (e) {
			if (e.which == 13) {
				$self.generateUrl();
				e.preventDefault();
			}
		});
		$object.resetBtn.click(function(){
			$self.resetButton();
		});
	},

	clearPage : function(){
		var $self =  this,
			$object = ryanklu.url;

		$object.input.not(':button, :submit, :reset, :hidden').val('');
		$object.pcBtn.attr('data-clipboard-text', '');
		$object.macBtn.attr('data-clipboard-text', '');
		$object.pcMacBtn.removeClass('copied').find('i').attr('class','icon-plus-sign');
	},

	generatePcUrl : function(){
		var $self =  this,
			$object = ryanklu.url;
			$pcUrl = $('input.macUrl').val(),
			$pcUrlGen = $pcUrl.replace("smb:","").replace(/\//g, "\\");

		$object.pcInput.val($pcUrlGen);
		$object.pcBtn.attr('data-clipboard-text', $pcUrlGen);
		$object.macBtn.attr('data-clipboard-text', $pcUrl);
		setTimeout(function () {
			$object.submitBtn.button('reset')
        }, 400);
	},

	generateMacUrl : function(){
		var $self =  this,
			$object = ryanklu.url;
			$macUrl = $('input.pcUrl').val(),
			$macUrlGen = $macUrl.replace('\\\\','smb:\\\\').replace(/\\/g, '/');

		$object.macInput.val($macUrlGen);
		$object.macBtn.attr('data-clipboard-text', $macUrlGen);
		$object.pcBtn.attr('data-clipboard-text', $macUrl);
		setTimeout(function () {
			$object.submitBtn.button('reset')
        }, 400);
	},

	generateUrl : function(){
		var $self =  this,
			$object = ryanklu.url;

		if ($object.macInput.val()){
			$object.submitBtn.button('loading');
			$self.generatePcUrl();
		} else if ($object.pcInput.val()){
			$object.submitBtn.button('loading');
			$self.generateMacUrl();
		}
	},

	resetButton : function(){
		var $self =  this;

		$self.clearPage();
	},

	copyUrl : function(){
		var $self =  this,
			$object = ryanklu.url,
			client = new ZeroClipboard($('#copy-mac-button, #copy-pc-button'));

		client.on( "load", function(client) {
			client.on( "complete", function(client, args) {
				if($object.pcInput.val()){
					$object.pcMacBtn.removeClass('copied').find('i').attr('class','icon-plus-sign');
					$(this).addClass('copied').find('i').attr('class','icon-ok-sign');
				}
			});
		});
	}

};
ryanklu.url.init();