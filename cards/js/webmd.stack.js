var webmd;
webmd = webmd || {};

webmd.stack = {

	stack : '.stack',
	cardTitle : '.cardTitle',
	openBtn : '.openStack',
	closeBtn : '.closeStack',
	speed : {
		open : 350,
		close : 350
	},

	init : function(){
		var self = this;

		//cache DOM Elements
		self.cacheElems();

		//open stack
		self.dom.openStack.click(self.openStack);

		//close stack
		self.dom.closeStack.click(self.closeStack);
	},

	openStack : function(){
		var self = webmd.stack,
			openBtn =  $(this),
			stack = openBtn.parents(self.stack),
			firstTitleMarginTop = stack.find(self.cardTitle).height() + 11;
			titleMarginTop = stack.find(self.cardTitle).height() + 46;

		//animate margin
        if(stack.hasClass('first')){
            stack.addClass('open').stop().animate({
                margin: firstTitleMarginTop + ' 0 -15px'
            },self.speed.open);
        } else {
            stack.addClass('open').stop().animate({
                margin: titleMarginTop + ' 0 -15px'
            },self.speed.open);
        }

        //animate title above the cards
        stack.find(self.cardTitle).stop().animate({
            top: '-58px'
        }, self.speed.open, function(){
            stack.find(self.cardTitle).stop().animate({
                width: '100%'
            }, self.speed.open, function(){
                stack.find(self.closeBtn).addClass('show');
            });
        });

        //prevent default behavior
        event.preventDefault();
	},

	closeStack : function(){
		var self = webmd.stack,
			closeBtn =  $(this),
			stack = closeBtn.parents(self.stack),
			cardTitle = closeBtn.parents(self.cardTitle);

		//hide close button
		closeBtn.removeClass('show');

		//retract width of title
        cardTitle.css('width','');

        //animate title back into the stack
        cardTitle.stop().animate({
            top: '125px'
        }, self.speed.close - 50, function(){
            if(stack.hasClass('first')){
                stack.removeClass('open').stop().animate({
                    margin: '0 10px 0 0'
                },self.speed.close);
            } else {
                stack.removeClass('open').stop().animate({
                    margin: '40px 10px 0 0'
                },self.speed.close);
            }
        });

        //prevent default behavior
        event.preventDefault();
	},

	cacheElems : function(){
		var self = this;

		self.dom = {
			stack : $('.stack'),
			openStack : $('.openStack'),
			closeStack : $('.closeStack'),
			page : $('#middleContent_fmt')
		}
	}

}
$(function () {
	webmd.stack.init();
});