$(document).ready(function(){

    $('.section_wrap').fullpage({
        //Navigation
        menu: '#menu',
        anchors: ['future-of-health','womb-transplant','3d-printing','lastest-on-obesity','wireless-medicine','advances-in-vision'],

        //Scrolling
        scrollingSpeed: 800,
        autoScrolling: true,
        scrollBar: false,
        easing: 'easeInOutQuad',
        scrollOverflow: true,
        touchSensitivity: 5,
        normalScrollElementTouchThreshold: 5,

        //Accessibility
        keyboardScrolling: false,
        animateAnchor: false,

        //Design
        controlArrows: false,
        resize : false,

        //Custom selectors
        sectionSelector: '.content',
        slideSelector: '.slide',

        //events
        onLeave: function(index, nextIndex, direction){
            var n = $(".fp-section").eq(nextIndex - 1);
            n.find(".fp-slides").length && $.fn.fullpage.scrollSlider(n, 0);
        },
        afterLoad: function(anchorLink, index){
            //alert('after load');
            //$('.content').removeClass('current-slide');
            console.log(index);
            $('#sec_'+index).addClass('current-slide');
        },
        afterRender: function(){
            $('.sec_1').addClass('current-slide');

            // $('.tooltip').tooltipster({
            //     position: 'bottom'
            // });
            //

            $('.read-more').on('click', function(){
                $.fn.fullpage.setAllowScrolling(false, 'down, up');
                $('.left-col, .right-col').addClass('move-left');
            });

            $('.read-less, .nav a').on('click', function(){
                $.fn.fullpage.setAllowScrolling(true, 'down, up');

            });

            $('.hide-left-trigger').on('click', function(){
                $('.left-col, .right-col').addClass('move-left');
            });
            $('.show-left-trigger, .nav a').on('click', function(){
                $('.left-col, .right-col').removeClass('move-left');
            });

            if(document.location.hash.indexOf('/') > -1){
                $.fn.fullpage.setAllowScrolling(false, 'down, up');
            }
            if(document.location.hash === "" || document.location.hash === "#future-of-health"){
                $('.nav li.nav_1').addClass('active');
            }
        },
        afterResize: function(){
            //alert('after resize');
        },
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
            //alert('after slide load');
            if(document.location.hash.indexOf('/') > -1){
                $('.left-col, .right-col').addClass('move-left');
            }
        },
        onSlideLeave: function(anchorLink, index, slideIndex, direction){
           //alert('on slide leave');
        }
    });

});