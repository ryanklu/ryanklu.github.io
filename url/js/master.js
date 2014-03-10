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
		var _self =  this,
			_object = ryanklu.url;

		_self.copyUrl();
		_self.clearPage();

		_object.submitBtn.click(function(){
			_self.generateUrl();
		});
		_object.input.keypress(function (e) {
			if (e.which == 13) {
				_self.generateUrl();
				e.preventDefault();
			}
		});
		_object.resetBtn.click(function(){
			_self.resetButton();
		});
	},

	clearPage : function(){
		var _self =  this,
			_object = ryanklu.url;

		_object.input.not(':button, :submit, :reset, :hidden').val('');
		_object.pcBtn.attr('data-clipboard-text', '');
		_object.macBtn.attr('data-clipboard-text', '');
		_object.pcMacBtn.removeClass('copied').find('i').attr('class','icon-plus-sign');
	},

	generatePcUrl : function(){
		var _self =  this,
			_object = ryanklu.url;
			_pcUrl = $('input.macUrl').val(),
			_pcUrlGen = _pcUrl.replace("smb:","").replace(/\//g, "\\");

		_object.pcInput.val(_pcUrlGen);
		_object.pcBtn.attr('data-clipboard-text', _pcUrlGen);
		_object.macBtn.attr('data-clipboard-text', _pcUrl);
		setTimeout(function () {
			_object.submitBtn.button('reset')
        }, 400);
	},

	generateMacUrl : function(){
		var _self =  this,
			_object = ryanklu.url;
			_macUrl = $('input.pcUrl').val(),
			_macUrlGen = _macUrl.replace('\\\\','smb:\\\\').replace(/\\/g, '/');

		_object.macInput.val(_macUrlGen);
		_object.macBtn.attr('data-clipboard-text', _macUrlGen);
		_object.pcBtn.attr('data-clipboard-text', _macUrl);
		setTimeout(function () {
			_object.submitBtn.button('reset')
        }, 400);
	},

	generateUrl : function(){
		var _self =  this,
			_object = ryanklu.url;

		if (_object.macInput.val()){
			_object.submitBtn.button('loading');
			_self.generatePcUrl();
		} else if (_object.pcInput.val()){
			_object.submitBtn.button('loading');
			_self.generateMacUrl();
		}
	},

	resetButton : function(){
		var _self =  this;

		_self.clearPage();
	},

	copyUrl : function(){
		var _self =  this,
			_object = ryanklu.url,
			client = new ZeroClipboard($('#copy-mac-button, #copy-pc-button'));

		client.on( "load", function(client) {
			client.on( "complete", function(client, args) {
				if(_object.pcInput.val()){
					_object.pcMacBtn.removeClass('copied').find('i').attr('class','icon-plus-sign');
					$(this).addClass('copied').find('i').attr('class','icon-ok-sign');
				}
			});
		});
	}

};
ryanklu.url.init();