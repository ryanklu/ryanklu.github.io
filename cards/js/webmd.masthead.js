webmd.m.search.typeahead = {
    init: function () {
        webmd.debug('typeahead gone');
    }
};
(function () {
    if (window.location.href.indexOf('m.webmd.com/pc') != -1) {
        $('html').addClass('removeStickyNav');
    }
})();
webmd.object.set('webmd.masthead');
$(function () {
    'use strict';
    webmd.masthead = {
        body: $('body'),
        stickyNavigation: $('.sticky_nav'),
        expandableSearch: $('.expandable_search'),
        header: $('header'),
        navStuck: null,
        stickyNavEnabled: true,
        stickyNavPosition: null,
        init: function () {
            if ($('html').hasClass('removeStickyNav')) {
                this.stickyNavEnabled = false;
                return;
            }
            this.bindEvents();
        },
        bindEvents: function () {
            var self = this,
                clickMethod = $('html').hasClass('ua_device_android') ? 'touchstart' : 'tapClick';
            $('.sticky_nav .nav li a').on(clickMethod, function (e) {
                e.preventDefault();
                self.toggleMenu($(this));
            });
            $('li.search', self.stickyNavigation).on(clickMethod, function (e) {
                e.preventDefault();
                e.stopPropagation();
                self.toggleSearch();
            });
            $('#main_menu_button').on(clickMethod, function () {
                self.restoreBody();
            });
            $(window).on('scroll', function () {
                self.stickyNav();
            });
        },
        stickyNav: function () {
            if (!this.stickyNavEnabled) {
                return;
            }
            var breakPoint = $('.main_menu_wrapper').outerHeight(),
                topPos = $(window).scrollTop(),
                stickyClass = 'sticky';
            if ($('#smartbanner').is('.shown')) {
                breakPoint += 79
            }
            if (topPos >= breakPoint) {
                if (this.header.is('.' + stickyClass)) {
                    return;
                }
                this.header.addClass(stickyClass);
                this.body.trigger('navStuck');
                this.navStuck = true;
            } else {
                if (!this.header.is('.' + stickyClass)) {
                    return;
                }
                this.header.removeClass(stickyClass);
                this.body.trigger('navUnStuck');
                this.navStuck = false;
            }
        },
        toggleMenu: function (menuItem) {
            var menuClass = menuItem.attr('class'),
                omnitureTag;
            switch (menuClass) {
            case 'living_healthy':
                omnitureTag = 'prstntnav_livh';
                break;
            case 'health_conditions':
                omnitureTag = 'prstntnav_hlthc';
                break;
            case 'health_tools':
                omnitureTag = 'prstntnav_ht';
                break;
            }
            this.resetMenus(menuItem, menuClass);
            if ($('.sub_nav.' + menuClass).is('.active')) {
                this.hideMenu(menuItem);
                this.stickyNavEnabled = true;
                omnitureTag = omnitureTag + '-close';
            } else {
                this.showMenu(menuItem);
                this.stickyNavEnabled = false;
                omnitureTag = omnitureTag + '-open';
            }
            wmdPageLink(omnitureTag);
        },
        showMenu: function (menuItem) {
            var menuClass = menuItem.attr('class'),
                menu = $('.sub_nav.' + menuClass),
                headerHeight = this.header.outerHeight(),
                subNavHeight = this.stickyNavigation.outerHeight(),
                openMenuHeight = menu.outerHeight(),
                windowHeight = window.innerHeight ? window.innerHeight : $(window).height(),
                headerTotalHeight = this.navStuck ? (subNavHeight) : (subNavHeight + headerHeight),
                bodyHeight = this.navStuck ? (openMenuHeight + subNavHeight) : (openMenuHeight + subNavHeight + headerHeight);
            if (!this.body.hasClass('sub_nav_open')) {
                this.stickyNavPosition = this.stickyNavigation.offset().top;
            }
            this.closeSearch();
            menu.addClass('active');
            menuItem.parent().addClass('active');
            if (windowHeight >= (openMenuHeight + headerTotalHeight)) {
                menu.css({
                    height: windowHeight - headerTotalHeight
                });
                bodyHeight = this.navStuck ? (menu.outerHeight() + subNavHeight) : (menu.outerHeight() + subNavHeight + headerHeight);
            };
            if (bodyHeight < 460) {
                bodyHeight = 460;
                $('.apps_list h3').css({
                    bottom: 50
                });
                $('.apps_list div').css({
                    bottom: -70
                });
            }
            this.body.css('height', bodyHeight).addClass('sub_nav_open').scrollTop(0);
            $('.ad_rdr, #mainContentContainer_area').hide();
        },
        hideMenu: function (menuItem) {
            var menuClass = menuItem.attr('class');
            menuItem.parent().removeClass('active');
            this.body.css('height', 'auto').removeClass('sub_nav_open');
            $('.sub_nav.' + menuClass).removeClass('active');
            $('.ad_rdr, #mainContentContainer_area').show();
            if (this.navStuck) {
                this.body.scrollTop(this.stickyNavPosition);
            }
        },
        resetMenus: function (menuItem, menuClass) {
            menuItem.parent().siblings().removeClass('active');
            $('.sub_nav.' + menuClass).siblings().removeClass('active');
        },
        restoreBody: function () {
            this.body.removeClass('sub_nav_open');
            $('.ad_rdr, #mainContentContainer_area').show();
            $('nav li.active').removeClass('active');
            $('.sub_nav.active').removeClass('active');
        },
        toggleSearch: function () {
            var omnitureTag;
            $('.sub_nav.active, .sticky_nav .active').removeClass('active');
            this.body.css('height', 'auto').removeClass('sub_nav_open');
            if (this.body.hasClass('search_open')) {
                this.closeSearch();
                omnitureTag = 'prstntnav_srci-close';
            } else {
                this.openSearch();
                omnitureTag = 'prstntnav_srci-open';
            }
            $('.ad_rdr, #mainContentContainer_area').show();
            wmdPageLink(omnitureTag);
        },
        openSearch: function () {
            this.stickyNavEnabled = false;
            this.navStuck ? this.stickyNavPosition = $('.sticky_nav').offset().top : this.stickyNavPosition = $(window).scrollTop();
            $('input[type=text]').not('#searchQuery_fmt').prop('disabled', true);
            this.body.addClass('search_open');
            this.stickyNavigation.hide();
            if (this.navStuck) {
                $('header').hide();
            }
            $('#mainContentContainer_area').after('<div class="searchOverlay_alpha"></div>');
            this.stickyNavigation.show();
            $('#searchQuery_fmt').unbind('focus').focus();
            $(window).scrollTop(0);
        },
        closeSearch: function () {
            this.stickyNavEnabled = true;
            $('#searchQuery_fmt').blur();
            $('input[type=text]').not('#searchQuery_fmt').removeAttr('disabled');
            this.resetPageAfterSearch();
        },
        resetPageAfterSearch: function () {
            this.body.removeClass('search_open');
            $('header').show();
            $(window).scrollTop(this.stickyNavPosition);
            $('.searchOverlay_alpha').remove();
        }
    };
});
webmd.object.set('webmd.mastheadBeta');
$(function () {
    'use strict';
    webmd.mastheadBeta = {
        scrollPos: null,
        init: function () {
            // Only for A/B testing
            $('#masthead_alpha').remove();
            this.$body = $('body');
            this.$centeringArea = $('#centering_area');
            this.bindEvents();
        },
        bindEvents: function () {
            var self = this;
            $('#main_menu_btn').on('click', function (e) {
                e.stopPropagation();
                e.stopImmediatePropagation();
                self.toggleMainMenu();
            });
            $('#top_search span').on('touchstart', function (e) {
                e.stopPropagation();
            });
            $('.sticky_nav .nav li').on('touchstart', function (e) {
                e.stopPropagation();
                self.toggleSubMenus(this);
            });
            $('#top_search span').on('click', function () {
                $('#top_search form').submit();
            });
        },
        setSubNavHeights: function () {
            $('.sub_nav').css('height', window.innerHeight - 149);
            $('.sticky_nav').css('height', window.innerHeight);
        },
        toggleMainMenu: function () {
            this.$body.hasClass('main_menu_open') ? this.closeMainMenu() : this.openMainMenu();
        },
        openMainMenu: function () {
            this.scrollPos = $(window).scrollTop();
            if (this.scrollPos <= 0) {
                window.scrollTo(0, 0);
            }
            this.setSubNavHeights();
            this.$body.addClass('main_menu_open');
            $('#topHeader').css('left', 282);
            this.$centeringArea.css('left', 282);
            this.$body.height(window.innerHeight - 59);
            wmdPageLink('mnu-open');
        },
        closeMainMenu: function () {
            this.$body.removeClass('main_menu_open');
            $('#topHeader').css('left', 0);
            this.$centeringArea.css('left', 0);
            this.$body.height('auto');
            $(window).scrollTop(this.scrollPos);
            wmdPageLink('mnu-close');
        },
        toggleSubMenus: function (navItem) {
            var $navItem = $(navItem);
            $navItem.is('.active') ? this.closeSubMenu($navItem) : this.openSubMenu($navItem);
        },
        openSubMenu: function ($navItem) {
            var menuClass = $navItem.attr('class'),
                selector = '.' + menuClass,
                omnitureTag;
            $navItem.add('.sub_nav' + selector).addClass('active');
            $navItem.siblings('li').removeClass('active');
            $('.sub_nav' + selector).siblings().removeClass('active');
            switch (menuClass) {
            case 'living_healthy':
                omnitureTag = 'prstntnav_livh-open';
                break;
            case 'health_conditions':
                omnitureTag = 'prstntnav_hlthc-open';
                break;
            case 'health_tools':
                omnitureTag = 'prstntnav_ht-open';
                break;
            }
            wmdPageLink(omnitureTag);
        },
        closeSubMenu: function ($navItem) {
            var selector = '.' + $navItem.attr('class');
            $navItem.add('.sub_nav' + selector).removeClass('active');
        }
    };
    webmd.mastheadBeta.search = {
        init: function () {
            this.$searchContainer = $('#top_search');
            this.$searchInput = $('input', this.$searchContainer);
            this.$logo = $('.main_menu_wrapper .webmd_logo');
            this.bindEvents();
        },
        bindEvents: function () {
            var self = this;
            this.$searchInput.on('focus', function () {
                self.openSearchContainer();
                self.moveMastheadElms();
            });
            $(document).on('click', '.searchOverlay, .main_menu_wrapper', function (e) {
                e.stopPropagation();
                console.log('close search');
                self.resetMastheadElms();
                self.closeSearchContainer();
            });
        },
        openSearchContainer: function () {
            $('#top_search').addClass('search_open');
            this.$searchContainer.css('width', 175);
            $('#mainContentContainer_area').after('<div class="searchOverlay"></div>');
            if (this.checkForSearchResults()) {
                $('#searchTypeahead_fmt').show();
            }
            $('input[type=text]').not('#searchQuery_fmt').hide();
            wmdPageLink('prstntnav_srci-open');
        },
        closeSearchContainer: function () {
            $('#top_search').removeClass('search_open');
            this.$searchContainer.css('width', 102);
            $('.searchOverlay').remove();
            $('input[type=text]').not('#searchQuery_fmt').show();
            $('#searchTypeahead_fmt').hide();
            wmdPageLink('prstntnav_srci-close');
        },
        moveMastheadElms: function () {
            $('#main_menu_btn').css('left', -50);
            this.$logo.css('left', 9);
        },
        resetMastheadElms: function () {
            $('#main_menu_btn').css('left', 'auto');
            this.$logo.css('left', 51);
        },
        checkForSearchResults: function () {
            var haveResults;
            $('#searchTypeahead_fmt li').length > 0 ? haveResults = true : haveResults = false;
            return haveResults;
        }
    }
});
$(function () {
    if (!webmd.useragent.ua.appview && webmd.masthead.stickyNavEnabled) {
        webmd.masthead.init();
        webmd.m.search.typeaheadCustom.init();
    }
});