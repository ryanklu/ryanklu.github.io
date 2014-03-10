ryanklu = {};
ryanklu.url = {

	init : function(){
		//console.log('init');
		var _self =  this,
			submitBtn = $('button.submit'),
			input = $('input'),
			resetBtn = $('button.clear');

		_self.copyUrl();
		_self.clearPage();

		submitBtn.click(function(){
			_self.generateUrl();
		});
		input.keypress(function (e) {
			if (e.which == 13) {
				_self.generateUrl();
				e.preventDefault();
			}
		});
		resetBtn.click(function(){
			_self.resetButton();
		});
	},

	clearPage : function(){
		//console.log('clearPage');
		var _self =  this,
			input = $('input'),
			pcBtn = $('#copy-pc-button'),
			macBtn = $('#copy-mac-button'),
			pcMacBtn = $('#copy-mac-button, #copy-pc-button');

		input.not(':button, :submit, :reset, :hidden').val('');
		pcBtn.attr('data-clipboard-text', '');
		macBtn.attr('data-clipboard-text', '');
		pcMacBtn.removeClass('copied').find('i').attr('class','icon-plus-sign');
	},

	generatePcUrl : function(){
		//console.log('generating pc url');
		var _self =  this,
			pcUrl = $('input.macUrl').val(),
			pcUrlGen = pcUrl.replace("smb:","").replace(/\//g, "\\"),
			pcInput = $('input.pcUrl'),
			pcBtn = $('#copy-pc-button'),
			macBtn = $('#copy-mac-button'),
			submitBtn = $('button.submit');

		pcInput.val(pcUrlGen);
		pcBtn.attr('data-clipboard-text', pcUrlGen);
		macBtn.attr('data-clipboard-text', pcUrl);
		setTimeout(function () {
			submitBtn.button('reset')
        }, 400);
	},

	generateMacUrl : function(){
		//console.log('generating mac url');
		var _self =  this,
			macUrl = $('input.pcUrl').val(),
			macUrlGen = macUrl.replace('\\\\','smb:\\\\').replace(/\\/g, '/'),
			macInput = $('input.macUrl'),
			pcBtn = $('#copy-pc-button'),
			macBtn = $('#copy-mac-button'),
			submitBtn = $('button.submit');

		macInput.val(macUrlGen);
		macBtn.attr('data-clipboard-text', macUrlGen);
		pcBtn.attr('data-clipboard-text', macUrl);
		setTimeout(function () {
			submitBtn.button('reset')
        }, 400);
	},

	generateUrl : function(){
		//console.log('generating url')
		var _self =  this,
			macInput = $('input.macUrl'),
			pcInput = $('input.pcUrl'),
			submitBtn = $('button.submit');

		if (macInput.val()){
			submitBtn.button('loading');
			_self.generatePcUrl();
		} else if (pcInput.val()){
			submitBtn.button('loading');
			_self.generateMacUrl();
		}
	},

	resetButton : function(){
		//console.log('reset');
		var _self =  this;

		_self.clearPage();
	},

	copyUrl : function(){
		var _self =  this,
			client = new ZeroClipboard($('#copy-mac-button, #copy-pc-button'));

		client.on( "load", function(client) {
			//console.log('movie has loaded');
			client.on( "complete", function(client, args) {
				//console.log('copying is complete');
				if($('input.pcUrl').val()){
					$('#copy-mac-button, #copy-pc-button').removeClass('copied').find('i').attr('class','icon-plus-sign');
					$(this).addClass('copied').find('i').attr('class','icon-ok-sign');
				}
			});
		});
	}

};
ryanklu.url.init();