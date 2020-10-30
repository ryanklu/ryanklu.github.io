/* repo: scripts/master@3.36.0-269-g0e2ba2f-dirty - Package Version: 3.54.0 - 2020-10-30 08:30 am - User: Ryan Lu */
/**
 * Expandable JS for responsive layout
 *
 * Takes several data attributes and expands an element based on given attributes
 *
 * - data-toggle-size: <optional | default: 9999px) the screen size under which to active click handling (useful if the expandable actions are only needed on mobile)
 * - data-toggle-selector <required>: the jQuery selector that should be shown or hidden by the click handler. If used without data-toggle-relation, it will match the first element
 * - data-toggle-relation <optional>: the relationship the the toggled element has to the click target (useful if only a tag name is given as the selector)
 * - data-toggle-mask <optional | default: false>: class name of the mask to create immediately before the click target (useful for menus). The mask is created on expand and removed on collapse
 * - data-toggle metrics <optional | default: false>: comma-separated list of open and close metrics calls to be passed on click. First is the expand ad-hoc call, second is the collpase ad-hoc call
 * - data-toggle-mask-click <optional | default: true>: true or false value as to whether clicking on the mask acts as a click on the selector
 * - data-toggle-alias <optional | default: false>: jQuery selector of the element clicking on this element will mimic. If one is passed, no other logic will run, that other element will be clicked instead
 * - data-toggle-acc-target <optional | default: false>: jQuery selector of the set of elements to treat as accordion (clicking the element will close all others of that selector)
 * - data-toggle-acc-trigger <optional | default: false>: jQuery selector of the set of elements to treat as accordion triggers
 */
/* if in a frame and the url contains '?asset=' */
if (webmd.expandable = {
    init: function() {
        $("body").on("click", "[data-toggle-selector],[data-toggle-alias]", function() {
            var size = $(this).data("toggle-size") || 9999, selector = $(this).data("toggle-selector"), relation = $(this).data("toggle-relation"), mask = $(this).data("toggle-mask") || !1, metrics = $(this).data("toggle-metrics") || !1, maskClick = $(this).data("toggle-mask-click") || !0, alias = $(this).data("toggle-alias") || !1, accTarget = $(this).data("toggle-acc-target") || !1, accTrigger = $(this).data("toggle-acc-trigger") || !1, _this = this;
            if (alias) return void $(alias).trigger("click");
            if ($(window).width() < size) {
                /* If a relation is provided, add expanded class to click target and selector that is related to the click target */
                switch (/* If a mask class is provided, insert the mask before the click target with that class */
                mask && ($(_this).before('<div class="' + mask + '"></div>'), $("body").attr("data-content-masked", "true"), 
                maskClick && $("." + mask).click(function() {
                    $(_this).trigger("click");
                })), // If the element is a part of an accordion, close all other panels
                accTarget && $(accTarget).removeClass("expanded"), relation) {
                  case "sibling":
                    $(_this).toggleClass("expanded").nextAll(selector).first().toggleClass("expanded");
                    break;

                  case "parent":
                    $(_this).toggleClass("expanded").parents(selector).first().toggleClass("expanded");
                    break;

                  case "child":
                    $(_this).toggleClass("expanded").children(selector).first().toggleClass("expanded");
                    break;

                  /* if no relation is given, just find the first element that matches the selector */
                    default:
                    $(_this).toggleClass("expanded"), $(selector).toggleClass("expanded");
                }
                // If the element is a part of an accordion, remove the expanded class from all other triggers, add to this one
                accTrigger && ($(accTrigger).removeClass("expanded"), $(_this).addClass("expanded")), 
                /* if the element is expanded, remove the mask, send ad-hoc call for close */
                $(_this).hasClass("expanded") ? metrics && wmdPageLink(metrics.split(",")[0]) : ($("." + mask).remove(), 
                $("body").removeAttr("data-content-masked"), metrics && wmdPageLink(metrics.split(",")[1]));
            }
        });
    }
}, $(function() {
    webmd.expandable.init();
}), /**
 * JS for popovers (archive tag, funded popover, etc)
 *
 * Binds to any element with data-popover-text attribute and displays the included text using the method specified in data-popover-method
 * - data-popover-method: <optional | default: overlay) The method to show the text provided, may be expanded later to support more than just overlay
 * - data-popover-text <required>: The HTML string containing the text you want to display
 *
 */
webmd.popover = {
    init: function() {
        var _this = this;
        $("body").on("click", "[data-popover-text]", function(e) {
            var text = ($(this).data("popover-method") || "overlay", $(this).data("popover-text") || "");
            "ajax" === text ? (e.preventDefault(), $.get($(this).attr("href"), function(data) {
                text = $(data).children().html(), _this.handlePopover(_this.method, text);
            })) : _this.handlePopover(_this.method, text);
        });
    },
    handlePopover: function(method, html) {
        // switch(method){
        //     case "overlay": //If overlay, just open an overlay with the provided text
        webmd.overlay.open({
            html: html,
            innerWidth: 500
        });
    }
}, $(function() {
    webmd.popover.init();
}), /*! webmd.adViewability.js */
webmd.object.set("webmd.adViewability"), webmd.adViewability = {
    isUnStickyDFPServed: !1,
    unstickTimer: null,
    mobileStickyTimeout: window.webmd.mobileStickyTimeout || 1e4,
    disableStickyBanner: window.webmd.disableStickyBanner || !1,
    init: function() {
        "use strict";
        webmd.debug("|||||||||| webmd.adViewability ----->", "init");
        var _this = this, $html = $("html"), $window = $(window), $leaderboard = $(".module.ad.ad-101, .module.ad.ad-108"), $leftAd = $("#leftAd_rdr"), propBrand = window.s_sponsor_brand || "", propProgram = window.s_sponsor_program || "", channel = (window.s_package_type || "", 
        window.s_channel_health || null), // The left-ad will be left untouched on these channels
        channelsToExclude = {
            "Skin Problems and Treatments": !0,
            Lupus: !0,
            "Sleep Disorders": !0
        };
        // run banner check
        _this.addClassNoBanner($html, $leaderboard), // exclude if part of ad test segment
        $html.hasClass("ad-test-segment") || $html.hasClass("cookie-consent") || (_this.disableStickyBanner || ("mobile" === webmd.responsiveAds._breakPoint || "phablet" === webmd.responsiveAds._breakPoint ? _this.makeMobileBannerSticky() : (_this.makeBannerSticky($html, $window, $leaderboard), 
        $(window).on("webmd.pagination.change", function(e, data) {
            data.newPage !== data.oldPage && ($leaderboard.removeClass("is-static"), _this.makeBannerSticky($html, $window, $leaderboard));
        }))), /**
		 * jira.webmd.net/browse/PPE-45271
		 * make the 160x600 Ad sticky if article is not funded and we are not on site-modernization template
		 */
        !($window.width() >= 1350) || channelsToExclude[channel] || propBrand && propProgram || !$leftAd.length || _this.makeLeftAdSticky($html, $window, $leftAd));
    },
    /**
	 * makes an element sticky - in this case, the left ad unit
	 * @param Object $leftAd Jquery Dom object
	 * @return void
	 */
    makeLeftAdSticky: function($html, $window, $leftAd) {
        var $masthead = $("#masthead");
        $leftAd && ($html.addClass("sticky-left-ad"), $leftAd.addClass("sticky-leftAd"), 
        $window.scroll(function() {
            var yOffset = $leftAd.offset().top;
            window.pageYOffset > yOffset - $masthead.height() && $leftAd.addClass("is-fixed").removeClass("sticky-leftAd");
        }));
    },
    /**
	 * A function to counter blank space caused by chrome/AdViewability CSS Hack
	 * If we decide to stick with this we can move it into the core directory
	 *
	 */
    addClassNoBanner: function($html, $leaderboard) {
        // if there is no banner ad, add a class to html element
        0 === $leaderboard.length && $html.addClass("no-banner");
    },
    /**
	 * A function to make the leaderboard (banner ad) sticky as user scrolls
	 * If we decide to stick with this we can move it into the core directory
	 */
    makeBannerSticky: function($html, $window, $leaderboard) {
        // Inner function to set the leaerboard ad sticky if scrolling downwards
        function setAdSticky(currentWindowPos, lastWindowPos) {
            // if scrolling down...
            currentWindowPos > lastWindowPos && (// if scrolled to top of banner but less than threshold, make banner sticky
            currentWindowPos > bannerHeight && threshold > currentWindowPos ? ($html.addClass("sticky-banner"), 
            $main.css("margin-top", $leaderboard.css("height")), $leaderboard.addClass("is-fixed")) : currentWindowPos > threshold && (// if threshold is reached, unstick
            $html.removeClass("sticky-banner"), $leaderboard.removeClass("is-fixed is-static").addClass("is-absolute")));
        }
        // Inner function to return banner to default position, i.e. unsticky the ad
        function setAdUnsticky(currentWindowPos, totalThreshold) {
            totalThreshold > currentWindowPos && ($html.removeClass("sticky-banner"), $main.removeAttr("style"), 
            $leaderboard.removeClass("is-fixed is-absolute").addClass("is-static"));
        }
        var $main = $("main"), bannerHeight = 90, bannerDefaultTop = "", bannerOffset = 0, lastWindowPos = 0, threshold = 1100, touchstartY = "", touchendY = "", _this = this;
        // if this is the the legacy layout
        $html.hasClass("legacy") && (bannerOffset = 25), // check for banner ad, let's go
        $leaderboard.length > 0 && (bannerDefaultTop = $leaderboard.offset().top, // if this is a touch device, track user scrolling by touchmove event...
        Modernizr.touch && (// When the user puts one finger down, record the finger's starting location.
        $window.on("touchstart", function(event) {
            touchstartY = event.originalEvent.touches[0].pageY;
        }), /* As the user pans on the page (which is analogous to scrolling, make sure the user
				 * has travelled at least N pixels before performing a sticky/non-sticky ad check.
				 * On touch devices, it's really easy to make minute finger motions that cause the
				 * sticky/unsticky code to execute early.  As an example, if the user moves up and down
				 * ever so slightly (i.e. twitch his/her finger), the user can cause the code
				 * to unstick the ad immediately after page load.
				 */
        $window.on("touchmove", function(event) {
            var currentWindowPos = $(this).scrollTop(), bannerCurrentTop = $leaderboard.offset().top, absDistY = "", totalThreshold = "";
            // As the user's finger travels, record the new position.  Then, calculate the absolute distance traveled
            touchendY = event.originalEvent.touches[0].pageY, absDistY = Math.abs(touchendY - touchstartY), 
            // The cumulative threshold before the ad should unsticky.  This includes the distance down the page + top position of the ad + some distance for the masthead
            totalThreshold = threshold + bannerCurrentTop - bannerHeight, // if the banner has already been stuck and unstuck, bounce
            $leaderboard.hasClass("is-static") || $leaderboard.hasClass("pushdown") || (// For touch devices, check if the finger motion was at least N pixels.  This reduces chances that
            // the user moving the page after page load ends up with an unsticky leaderboard ad immediately and thus
            // never getting a sticky ad.
            touchstartY > touchendY && absDistY > 5 ? // scroll down
            setAdSticky(currentWindowPos, lastWindowPos) : touchendY > touchstartY && absDistY > 5 && // scroll up
            setAdUnsticky(currentWindowPos, totalThreshold), // recalc window position
            lastWindowPos = currentWindowPos);
        })), // on window scroll
        $window.scroll(function() {
            var currentWindowPos = $(this).scrollTop();
            $leaderboard.offset().top;
            _this.isUnStickyDFPServed || $leaderboard.hasClass("is-static") || $leaderboard.hasClass("pushdown") || (// if scrolling down...
            currentWindowPos > lastWindowPos ? // if scrolled to top of banner but less than threshold, make banner sticky
            currentWindowPos > bannerHeight + bannerOffset && threshold > currentWindowPos ? ($html.addClass("sticky-banner"), 
            $main.css("margin-top", $leaderboard.css("height")), $leaderboard.addClass("is-fixed")) : currentWindowPos > threshold && (// if threshold is reached, unstick
            $html.removeClass("sticky-banner"), $leaderboard.removeClass("is-fixed is-static").addClass("is-absolute")) : ((bannerHeight > currentWindowPos || currentWindowPos > threshold) && ($html.removeClass("sticky-banner"), 
            $main.removeAttr("style"), $leaderboard.removeClass("is-fixed is-absolute")), // if over threshold, return banner to default position
            currentWindowPos > threshold && $leaderboard.addClass("is-static")), // recalc window position
            lastWindowPos = currentWindowPos);
        }));
    },
    /**
	 * Make mobile banner sticky, copied from mobile-infinite-scroll.js
	 * Will stick the banner ad on scroll down for a max of 10 seconds, then release
	 */
    makeMobileBannerSticky: function() {
        var _this = this, element = document.getElementsByClassName("global-nav-container")[0], cb = function() {
            _this.makeResponsiveMobileTopAdSticky($("#ads2-pos-2025-ad-banner"), {
                top: element.offsetHeight + element.offsetTop + 5 + "px",
                width: "100%",
                height: "88px"
            }, _this.mobileStickyTimeout);
        };
        try {
            setTimeout(function() {
                // if the user does not scroll the content within a set amount of time, do not make the banner ad sticky
                // name space the scroll event so it doesn't conflict with other libraries
                $(window).off("scroll.adScroll");
            }, _this.mobileStickyTimeout);
        } catch (e) {
            webmd.debug(e);
        }
        // the moment the user begins to scroll the content, make the banner ad sticky
        // name space the scroll event so it doesn't conflict with other libraries
        $(window).one("scroll.adScroll", cb);
    },
    /**
	*	This will make the give ad stick for a given amount of time.
	*
	*	ad	{obj}	The element that will be made sticky
	*	dummycss	{obj}	the css for the dummy div that will replace the ad (to occupy the space)
	*	timer	int	the amount of time the ad will remain sticky (in ms)
	*
	*/
    makeResponsiveMobileTopAdSticky: function(ad, dummycss, timer) {
        var $ad = $(ad), css = dummycss || {}, defaultPosition = $ad.css("position") || "static", // an empty div that will occupy the space where the ad used to be in order to keep the page
        // from changing and that area from collapsing
        $firstEmptyDiv = ($ad.css("background") || "transparent", $ad.css("width"), $('<div class="emptyDivs">')), // another empty div that will be behind the ad to prevent user from seeing content underneath when the fixed ad is scrolling
        $secondEmptyDiv = $('<div class="emptyDivs">');
        //if unsticky code is served from DFP then don't make the mobile top ad sticky
        this.isUnStickyDFPServed || ($firstEmptyDiv.css({
            padding: css.padding || $ad.css("padding"),
            margin: css.margin || $ad.css("margin"),
            height: css.height || $ad.height() + "px",
            width: css.width || $ad.width() + "px",
            background: "white"
        }), $secondEmptyDiv.css({
            padding: css.padding || $ad.css("padding"),
            margin: css.margin || $ad.css("margin"),
            height: css.height || $ad.height() + "px",
            width: css.width || $ad.width() + "px",
            background: "white"
        }), //if no timer is set, default it to 5s
        timer || (timer = 5e3), //insert the dummy div
        $firstEmptyDiv.insertBefore($ad), $secondEmptyDiv.insertBefore($ad), //make the ad sticky
        $ad.css({
            position: "fixed",
            "text-align": "center",
            top: parseInt(css.top || 0, 10) + "px",
            "z-index": 9999,
            width: css.width || $ad.width() + "px",
            background: "white"
        }), $firstEmptyDiv.css({
            position: "fixed",
            top: parseInt(css.top || 0, 10) - 15,
            "z-index": $ad.css("z-index") - 1
        }), $secondEmptyDiv.css({
            top: parseInt(css.top || 0, 10) - 15,
            "z-index": $ad.css("z-index") - 1
        }), //start the timeout to return the ad to its original location.
        this.unstickTimer = setTimeout(function() {
            $firstEmptyDiv.remove(), $secondEmptyDiv.remove(), // move the ad back into its original location
            $ad.css({
                transition: "top 2s"
            }), $ad.css({
                top: "0px"
            }), $ad.css({
                position: defaultPosition
            });
        }, timer));
    },
    //make banner ad unsticky
    makeTopAdUnSticky: function() {
        var $mobileAd = $("#ads2-pos-2025-ad-banner"), $desktopAd = $(".module.ad.ad-101"), $main = $("main");
        null !== this.unstickTimer && (clearTimeout(this.unstickTimer), this.unstickTimer = null), 
        "fixed" === $mobileAd.css("position") && ($(".emptyDivs").remove(), $mobileAd.css({
            transition: "top 2s",
            top: "0px",
            position: "relative"
        })), "fixed" === $desktopAd.css("position") && ($main.css("margin-top", "0px"), 
        $desktopAd.removeClass("is-fixed").addClass("is-static")), // unsticky leaderboard if made sticky with stickyplugin
        window.webmd.leaderboardStickyPlugin && (window.webmd.leaderboardStickyPlugin.end(), 
        delete window.webmd.leaderboardStickyPlugin), //this boolean is used to make top ad unsticky on scroll
        this.isUnStickyDFPServed = !0;
    }
}, $(function() {
    webmd.adViewability.init();
}), /*! webmd.p.decisionSelect */
function() {
    /**
	 * function called by the ad server that passes the sponsor info and serves the overlay
	 * @param  {[type]} sponsorId DCTM ID of the sponsor's c_b_p
	 */
    webmd.p.decisionSelect = function(sponsorInfo) {
        var blockCookie;
        webmd.p.decisionSelect.sponsorInfo = sponsorInfo, webmd.p.decisionSelect.sponsorId = sponsorInfo;
        var image_server_url = window.image_server_url || "http://img.webmd.com/dtmcms/live";
        "string" == typeof sponsorInfo ? (blockCookie = webmd.cookie.exists("ds_30"), !blockCookie && webmd.p.pim.isAllowed() && require([ image_server_url + "/webmd/PageBuilder_Assets/JS_static/sponsored_programs/decision_select/survey-runner.min.js" ])) : require([ image_server_url + "/webmd/PageBuilder_Assets/JS_static/sponsored_programs/decision_select/survey-runner2.min.js" ]);
    }, webmd.p.decisionSelect.moduleName = webmd.p.decisionSelect.moduleName || "dssl-int", 
    /*
	 * checks sessionStorage for a dg_view_later key
	 * if the key exists, then use data to construct the leave-behind-nagigation that appears in the footer.
	 */
    webmd.p.decisionSelect.showLeaveBehindNavigation = function() {
        // Omniture tracking for close and view button
        function doTracking(link) {
            cbp = webmd.p.decisionSelect.leaveBehindParams.cbp.toLowerCase(), version = parseInt((webmd.p.decisionSelect.leaveBehindParams || {}).version || 1, 10), 
            moduleName = webmd.p.decisionSelect.leaveBehindParams.moduleWithDescriptor || "", 
            version && 2 === version ? wmdPageLink(moduleName + "_3-" + link, {
                prop29: ""
            }) : wmdPageLink(webmd.p.decisionSelect.moduleName + "_3-" + link, {
                prop15: cbp + "_" + webmd.p.decisionSelect.moduleName + "_3-" + link,
                prop29: ""
            });
        }
        try {
            var view_later, styles, imageURL, cbp, moduleName, version;
            if (// get the sponsor data from session storage
            view_later = window.sessionStorage.getItem("dg_view_later"), view_later && !$(".leave-behind-container").length) {
                // create image url
                if (webmd.p.decisionSelect.leaveBehindParams = JSON.parse(view_later), webmd.p.decisionSelect.leaveBehindParams.image) imageURL = webmd.p.decisionSelect.leaveBehindParams.image + "_dt_lb.png"; else {
                    var imageServerUrl = window.image_server_url || "https://img.webmd.com/dtmcms/live";
                    // sevrving default image if the path is not serving by ad ops
                    imageURL = imageServerUrl + "/webmd/consumer_assets/site_images/ddg/Lady_w_weights_dt_lb.png";
                }
                styles = '.leave-behind-container{bottom:0px}.dslb, .dslb .txt{font-family:"Roboto Condensed",Verdana,sans-serif}.dslb{background-color:#e8e6e6;border-top: .25em solid #9ed0dd;box-sizing:border-box;font-size:0.9em;line-height:1.13;letter-spacing: .02em;padding: .67em;position:fixed;text-align:center;width:100%;z-index:999999999999}.dslb .your-webmd-doctor-di{width:95%}.dslb .txt{padding:4px .31em 0 0;font-size:0.99em;line-height:1.13;letter-spacing: .02em;color:#444}.dslb .your-webmd-doctor-di .txt span{display:inline-block;text-align:left}.dslb .view{background-color:#0e7ab9;box-shadow:rgba(0, 0, 0, .2) 0 .06em .06em 0;color:#fff;float:left;font-size: .68em;padding: .5em 1.5em;text-transform:uppercase;border-radius:3px}.dslb .close{color:#aaa;display:block;font-size:1em;font-weight:700;position:absolute;right: .31em;top: .31em;height:10px;width:10px}.dslb .close:focus{color:#000;text-decoration:none}.v2{width:100%;height:94px;position:fixed;background-color:#ddecf4;box-shadow:0 -2px 5px 0 rgba(0, 0, 0, 0.15)}.v2 .lbn-container{height:86px;width:560px;margin:0 auto;border-radius:3px;background-color:#fff;margin-top:8px;display:flex;overflow:hidden}.v2 .lbn-button{min-width:70px;max-width:70px;height:30px;border-radius:3px;background-color:#1f97dc;box-shadow:0 1px 1px 0 rgba(0, 0, 0, 0.2)}.v2 .lbn-underline{display:none}.v2 .close{position:absolute;right:20px;top:15px;width:18px;height:15px}.v2 .close > svg, .lbn-button .view, .dslb .close:focus, .dslb .close{cursor:pointer}.lbn-heading, .lbn-condition, .lbn-condition .lbn-break, .lbn-button .view, .lbn-button .view{font-family:"Source Sans Pro",sans-serif}.lbn-heading, .lbn-condition, .lbn-button .view{font-style:normal;font-stretch:normal;letter-spacing:normal;text-align:center}.lbn-heading{font-size:14px;font-weight:bold;line-height:1.43;color:#333132;padding:9px 0px 4px 0px}.lbn-condition{font-size:15px;font-weight:normal;line-height:1.13;color:#222}.lbn-clipboard>svg{width:12px;height:16px;position:relative;right:2px;top:2px}.lbn-text-box{flex-basis:353.5px}.lbn-image-box{flex-basis:207.3px}.lbn-body{display:flex;justify-content:center}.v2 .lbn-body{padding:9px 13px 0px 5px}.v2 .lbn-underline{display:none}.lbn-condition{flex-basis:76%}.lbn-button{flex-basis:24%}.lbn-button{min-width:70px;max-width:70px;border-radius:3px;background:none;box-shadow:none}.lbn-button .view{font-size:14px;font-weight:normal;line-height:1.14;color:#fff;align-items:center;justify-content:center;display:flex;height:100%}.lbn-underline{position:relative;left:91px;height:2px;width:168px;border:solid 2px #30c7f4}.lbn-wrap{width:200px;left:33px;position:relative}.dslb .lbn-image-box{display:none}.lbn-heading,.lbn-underline,.lbn-condition,.txt{display:none}.v2 .lbn-heading, .v2 .lbn-condition, .dslb .txt{display:block}@media screen and (max-width:39.938em){.leave-behind-container dslb{min-height:80.69px}.dslb{font-size: .8em}.dslb .lbn-body{padding:0px 10px 0px 0px}.dslb .txt{width:77%;padding:4px .31em 0 0px}.dslb .close{top:0.10em}.dslb .lbn-button{box-shadow:none}.dslb .view{margin-top: .625em}.dslb .lbn-button .view{width:57.91px;height:23.41px;font-size: .68em}.dslb .your-webmd-doctor-di .txt{width:77%;padding-left:1.5em}.v2{height:99px}.v2 .lbn-container{width:270px;height:99px;margin:0 auto;border-radius:0px;display:block}.v2 .close{right:15px;top:4px;width:13px;height:11.9px}.lbn-heading{border-bottom:solid 2px #30c7f4;padding:10px 0px 5px 0px}.lbn-clipboard>svg{width:14px;height:18px;top:3px}.lbn-underline,.lbn-image-box{display:none}.lbn-wrap{width:auto;position:static}.lbn-body{display:flex;padding:14px 13px 0px 5px}.lbn-condition{flex-basis:73%}.lbn-button{flex-basis:30%}.lbn-break{display:block}.lbn-button{min-width:64px;max-width:64px;height:30px;border-radius:3px;box-shadow:0 1px 1px 0 rgba(0, 0, 0, 0.2)}.lbn-button .view{font-size:14px;font-weight:normal;line-height:1;letter-spacing:0.3px;color:#fff;align-items:center;justify-content:center;display:flex;height:100%}}', 
                $("<style>" + styles + "</style>").appendTo(document.head), $("body").append('<div class="leave-behind-container"><div class="lbn-container"><div class="close"> <svg viewBox="0 0 18 18"> <path fill="#333132" stroke="#333132" fill-rule="evenodd" d="M9 8.353L17.353 0 18 .647 9.647 9 18 17.353l-.647.647L9 9.647.647 18 0 17.353 8.353 9 0 .647.647 0 9 8.353z" /> </svg></div><div class="lbn-text-box"><div class="lbn-heading"> <span class="lbn-clipboard"> <svg viewBox="0 0 15 20"> <path fill="#969292" fill-opacity=".4" fill-rule="nonzero" d="M2.609 6.875h10v.69h-10v-.69zm0 3.595h10v.69h-10v-.69zm0 3.595h10v.69h-10v-.69zm0-5.393h10v.69h-10v-.69zm0 3.595h10v.69h-10v-.69zm0 3.595h10v.69h-10v-.69zm8.428-14.219c.474 0 .857.409.857.913v1.582H3.323V2.556c0-.504.384-.913.857-.913h1.714v-.73c0-.504.384-.913.858-.913h1.714c.473 0 .857.409.857.913v.73h1.714zm1.62 1.482H15V20H0V3.125h2.344v.937H.937v15h13.126v-15h-1.407v-.937z" /> </svg> </span> Doctor Discussion Guide</div><div class="lbn-underline"></div><div class="lbn-body"><div class="lbn-condition"><p class="lbn-wrap"> <span class="lbn-break">Your guide for</span> <b>' + webmd.p.decisionSelect.leaveBehindParams.condition + '</b> is ready.</p></div><div class="txt"> <span>Your WebMD Doctor Discussion Guide for ' + webmd.p.decisionSelect.leaveBehindParams.condition + ' is Ready!</span></div><div class="lbn-button"><div class="view">View</div></div></div></div><div class="lbn-image-box"> <img src="' + imageURL + '" alt="image"></div></div></div>'), 
                // cache the leave-behind-nav so we don't have to parse the DOM tree each time.
                webmd.p.decisionSelect.leaveBehindNav = $(".leave-behind-container"), "undefined" != typeof webmd.p.decisionSelect.leaveBehindParams.version && 2 === parseInt(webmd.p.decisionSelect.leaveBehindParams.version, 10) ? webmd.p.decisionSelect.leaveBehindNav.addClass("v2") : webmd.p.decisionSelect.leaveBehindNav.addClass("dslb"), 
                webmd.p.decisionSelect.leaveBehindNav.find(".view").click(function() {
                    webmd.p.decisionSelect.showDiscussionGuide(), // register omniture click event
                    doTracking("view");
                }), webmd.p.decisionSelect.leaveBehindNav.find(".close").click(function() {
                    webmd.p.decisionSelect.closeLeaveBehindNavigation(), doTracking("close");
                });
            }
        } catch (e) {
            webmd.debug("error parsing session storage data");
        }
    }, // remove the leave-behind-navigation from the DOM when the leave-behind-navigation is closed
    webmd.p.decisionSelect.closeLeaveBehindNavigation = function() {
        webmd.p.decisionSelect.leaveBehindNav.remove(), // set a session storage key to let us know the user has interacted with the leave-behind-navigation
        sessionStorage.setItem("viewedDecisionSelect", !0), // remove this key so that we don't show the leave-behind-nav on future page loads.
        sessionStorage.removeItem("dg_view_later");
    }, webmd.p.decisionSelect.showDiscussionGuide = function() {
        webmd.p.decisionSelect.closeLeaveBehindNavigation();
        var url = window.location.href;
        url.indexOf("medicinenet.com") > -1 || url.indexOf("rxlist.com") > -1 || url.indexOf("emedicinehealth.com") > -1 || url.indexOf("onhealth.com") > -1 ? window.open(webmd.p.decisionSelect.leaveBehindParams.url) : window.location = webmd.p.decisionSelect.leaveBehindParams.url;
    }, // always run this on page load.
    $(function() {
        // don't execute this inside an iframe
        if (window.top === window.self) {
            var adsCookie = webmd.adsCookie.get("sess");
            //  We are passing dsf key value in ads call if sess cookie is present.
            if (adsCookie && adsCookie.ds && adsCookie.ds.sp && "string" == typeof adsCookie.ds.sp) {
                var matches = adsCookie.ds.sp.match(/^dssp_(.+)x$/);
                matches && webmd.ads2.setPageTarget("dsf", matches[1]);
            }
            webmd.p.decisionSelect.showLeaveBehindNavigation();
        }
    });
}(), window.location !== window.parent.location && window.location.search.indexOf("?asset=") > -1) {
    var life = webmd.url.getLifecycle().substr(1) || "live", template = "//img{lifecycle}{env}.{sld}/dtmcms/{life}/webmd/consumer_assets/site_images/amd_modules/embedded_assets/1/embed-iframe-helper.js", srcUrl = webmd.substitute(template, {
        lifecycle: webmd.url.getLifecycle(),
        life: life,
        env: webmd.url.getEnv(),
        sld: webmd.url.getSLD()
    }), helper;
    helper = document.createElement("script"), helper.type = "text/javascript", helper.src = srcUrl, 
    $("head").append(helper), // Prevent page view on first load
    window.s_not_pageview = "y";
}

/*!
 * LiveConnect tag for publishers
 */
// Create a local scope and run on document ready
$(function() {
    // if in iframe, exit;
    if (window.top !== window.self) return !1;
    // if we are on sensitive topic pages 
    if (window.s_sensitive && "true" === window.s_sensitive) return !1;
    // allow other code to disable the beacon
    if (webmd.beaconDisable) return webmd.debug("liveintent beacons not fired due to beaconDisable."), 
    !1;
    // exclude fit, member pages
    if (webmd.beaconDisable || window.location.hostname.indexOf("fit.") > -1 || window.location.host.indexOf("member") > -1) return !1;
    var s, cc = document.createElement("script");
    cc.id = "liveintent", cc.src = "//b-code.liadm.com/a-00xm.min.js", cc.async = !0, 
    s = document.getElementsByTagName("script")[0], s.parentNode.insertBefore(cc, s);
});