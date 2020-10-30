/* repo: scripts/master@3.36.0-269-g0e2ba2f-dirty - Package Version: 3.54.0 - 2020-10-30 08:30 am - User: Ryan Lu */
/*
 * Header bidding initialization for Medianet
 */
//==================================================
// Metrics Events
// These three functions are called within the beacon and documented in our wiki: http://webservices.webmd.net/WSWiki/Omniture.ashx
// They trigger events which can be bound to, in order to overwrite omniture properties and such.
//==================================================
function s_before_pv() {
    $(document).trigger("before_pv");
}

function s_after_pv() {
    $(document).trigger("after_pv");
}

function s_beaconload() {
    $(document).trigger("beacon_load");
}

/**
 * function for healthmanager portland popup
 * feb-4-2015: adding this function as a dependency of sl function below.
 */
function openAssessPopup(theUrl) {
    wmdTrack("oap");
    var win = window.open(theUrl, "WebMDHealthManagerTool", "resizable,scrollbars,width=705,height=600,left=25,top=25,screenX=25,screenY=25");
    return win && win.focus(), !1;
}

/**
 * legacy function for omniture tracking
 * pulled from webmd.legacy.js
 * added to Harmony scripts build as a precaution
 * goal is to eliminate this file after updating outliers that are using it
 */
function sl(url, link_type, bi_tag) {
    webmd.debug("LEGACY METRICS CALL sl IS INVOKED: ", url, link_type, bi_tag);
    var status, toolbar, width, height, resizable, scrollbars, menubar, newWindow, href = "string" == typeof url ? url : new String(url.href), left = 0, top = 0;
    if (/* create a variable to track link text */
    window.s_linktext = "", "string" != typeof url && (window.s_linktext = $(url).text().replace(/[^\w\s]/g, "").replace(/\s+/g, " ") || $(url).find("img").attr("alt")), 
    //adjust module name for ICMs and sponsor boxes
    bi_tag = webmd.metrics.icm.adjustModuleName(url, bi_tag), // used for Omniture Tracking
    /* internal links get ctrs, external links get wmdPageLink */
    href.indexOf("webmd.com") > -1 && !/^https?:\/\/(img\.)|(css\.)|(js\.)/gi.test(href) || -1 === href.indexOf("/click?") && !href.match(/^(http|ftp|mailto)/) ? window.ctrs(bi_tag) : ("string" != typeof url && setGlobalWmdPageLinkVar(bi_tag, url), 
    wmdPageLink(bi_tag)), -1 !== href.indexOf("/healthmanager.")) return window.openAssessPopup(url);
    if ("sp" === link_type) width = 380, height = 210, toolbar = 0, resizable = 1, status = 0, 
    scrollbars = 1, left = 25, top = 25; else if ("sdp" === link_type) width = 600, 
    height = 700, scrollbars = 1, toolbar = 0, resizable = 1, status = 0, left = 25, 
    top = 25; else if ("scp" === link_type) width = 530, height = 490, scrollbars = 1, 
    toolbar = 0, resizable = 1, status = 0, left = 25, top = 25; else if ("ai" === link_type) width = 715, 
    height = 600, scrollbars = 1, toolbar = 0, resizable = 1, status = 0, left = 25, 
    top = 25; else if ("nw" === link_type) width = 1e3, height = 600, scrollbars = 1, 
    toolbar = 1, menubar = 1, resizable = 1, status = 1, left = 25, top = 25; else {
        if ("hw" !== link_type) return !0;
        width = 675, height = 626, scrollbars = 1, toolbar = 1, resizable = 1, status = 1, 
        left = 25, top = 25;
    }
    // call interstitial function
    return newWindow = window.open(url, "", "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top + ",scrollbars=" + scrollbars + ",toolbar=" + toolbar + ",resizable=" + resizable + ",status=" + status + ",menubar=" + menubar), 
    webmd.offsite.showInterstitial(href), !1;
}

window.googletag = window.googletag || {}, googletag.cmd = googletag.cmd || [], 
window.webmd = window.webmd || {}, function() {
    // load a script tag
    function loadScript(tagSrc) {
        var scriptTag = document.createElement("script"), placeTag = document.getElementsByTagName("script")[0];
        if ("http" !== tagSrc.substr(0, 4)) {
            var isSSL = !0;
            tagSrc = (isSSL ? "https:" : "http:") + tagSrc;
        }
        scriptTag.type = "text/javascript", scriptTag.src = tagSrc, scriptTag.async = !0, 
        placeTag.parentNode.insertBefore(scriptTag, placeTag);
    }
    // load GPT library
    function loadGPT() {
        window.advBidxc.isAdServerLoaded || (loadScript("//securepubads.g.doubleclick.net/tag/js/gpt.js"), 
        window.webmd.googleloaded = !0, window.advBidxc.isAdServerLoaded = !0);
    }
    // we don't want to run headbidding on video content
    function isVideoContent() {
        for (var _vhbf = !1, metas = document.getElementsByTagName("meta"), meta_types = [ /^video/i ], i = 0; i < metas.length; i++) if ("og:type" === metas[i].getAttribute("property")) for (var content = metas[i].getAttribute("content"), j = 0; j < meta_types.length; j++) if (meta_types[j].test(content)) return !0;
        return _vhbf;
    }
    // checks if headerbidding is diabled via mn=0 query parameter
    function disableHeaderbidding() {
        return /[?&]mn=0/.test(location.search);
    }
    // if in iframe exit immediately;
    if (window.top === window.self && !/member.|fit.|labs./.test(location.host) && !(window.s_sponsor_brand && window.s_sponsor_brand.length > 0 || window.s_sensitive && "true" === window.s_sensitive || (// load media.net header-bidding
    window.advBidxc = window.advBidxc || {}, window.advBidxc.startTime = new Date().getTime(), 
    window.advBidxc.timeout = 300, window.advBidxc.version = 3.2, window.advBidxc.customerId = "8CU66J63J", 
    //Media.net Customer ID
    window.advBidxc.renderAd = function() {}, isVideoContent() || disableHeaderbidding()))) {
        var mnSrc = "//contextual.media.net/bidexchange.js?cid=" + window.advBidxc.customerId + "&version=" + window.advBidxc.version + "&https=1";
        loadGPT(), loadScript(mnSrc);
    }
}(), /*!
 * jQuery JavaScript Library v1.8.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Thu Sep 20 2012 21:13:05 GMT-0400 (Eastern Daylight Time)
 */
function(window, undefined) {
    // Convert String-formatted options into Object-formatted ones and store in cache
    function createOptions(options) {
        var object = optionsCache[options] = {};
        return jQuery.each(options.split(core_rspace), function(_, flag) {
            object[flag] = !0;
        }), object;
    }
    function dataAttr(elem, key, data) {
        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if (data === undefined && 1 === elem.nodeType) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            if (data = elem.getAttribute(name), "string" == typeof data) {
                try {
                    data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null : // Only convert to a number if it doesn't change the string
                    +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) {}
                // Make sure we set the data so it isn't changed later
                jQuery.data(elem, key, data);
            } else data = undefined;
        }
        return data;
    }
    // checks a cache object for emptiness
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) // if the public data object is empty, the private is still empty
        if (("data" !== name || !jQuery.isEmptyObject(obj[name])) && "toJSON" !== name) return !1;
        return !0;
    }
    function returnFalse() {
        return !1;
    }
    function returnTrue() {
        return !0;
    }
    // A painfully simple check to see if an element is disconnected
    // from a document (should be improved, where feasible).
    function isDisconnected(node) {
        return !node || !node.parentNode || 11 === node.parentNode.nodeType;
    }
    function sibling(cur, dir) {
        do cur = cur[dir]; while (cur && 1 !== cur.nodeType);
        return cur;
    }
    // Implement the identical functionality for filter and not
    function winnow(elements, qualifier, keep) {
        if (// Can't pass null or undefined to indexOf in Firefox 4
        // Set to 0 to skip string check
        qualifier = qualifier || 0, jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
            var retVal = !!qualifier.call(elem, i, elem);
            return retVal === keep;
        });
        if (qualifier.nodeType) return jQuery.grep(elements, function(elem, i) {
            return elem === qualifier === keep;
        });
        if ("string" == typeof qualifier) {
            var filtered = jQuery.grep(elements, function(elem) {
                return 1 === elem.nodeType;
            });
            if (isSimple.test(qualifier)) return jQuery.filter(qualifier, filtered, !keep);
            qualifier = jQuery.filter(qualifier, filtered);
        }
        return jQuery.grep(elements, function(elem, i) {
            return jQuery.inArray(elem, qualifier) >= 0 === keep;
        });
    }
    function createSafeFragment(document) {
        var list = nodeNames.split("|"), safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) for (;list.length; ) safeFrag.createElement(list.pop());
        return safeFrag;
    }
    function findOrAppend(elem, tag) {
        return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag));
    }
    function cloneCopyEvent(src, dest) {
        if (1 === dest.nodeType && jQuery.hasData(src)) {
            var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
            if (events) {
                delete curData.handle, curData.events = {};
                for (type in events) for (i = 0, l = events[type].length; l > i; i++) jQuery.event.add(dest, type, events[type][i]);
            }
            // make the cloned public data object a copy from the original
            curData.data && (curData.data = jQuery.extend({}, curData.data));
        }
    }
    function cloneFixAttributes(src, dest) {
        var nodeName;
        // We do not need to do anything for non-Elements
        1 === dest.nodeType && (// clearAttributes removes the attributes, which we don't want,
        // but also removes the attachEvent events, which we *do* want
        dest.clearAttributes && dest.clearAttributes(), // mergeAttributes, in contrast, only merges back on the
        // original attributes, not the events
        dest.mergeAttributes && dest.mergeAttributes(src), nodeName = dest.nodeName.toLowerCase(), 
        "object" === nodeName ? (// IE6-10 improperly clones children of object elements using classid.
        // IE10 throws NoModificationAllowedError if parent is null, #12132.
        dest.parentNode && (dest.outerHTML = src.outerHTML), // This path appears unavoidable for IE9. When cloning an object
        // element in IE9, the outerHTML strategy above is not sufficient.
        // If the src has innerHTML and the destination does not,
        // copy the src.innerHTML into the dest.innerHTML. #10324
        jQuery.support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML) && (dest.innerHTML = src.innerHTML)) : "input" === nodeName && rcheckableType.test(src.type) ? (// IE6-8 fails to persist the checked state of a cloned checkbox
        // or radio button. Worse, IE6-7 fail to give the cloned element
        // a checked appearance if the defaultChecked value isn't also set
        dest.defaultChecked = dest.checked = src.checked, // IE6-7 get confused and end up setting the value of a cloned
        // checkbox/radio button to an empty string instead of "on"
        dest.value !== src.value && (dest.value = src.value)) : "option" === nodeName ? dest.selected = src.defaultSelected : "input" === nodeName || "textarea" === nodeName ? dest.defaultValue = src.defaultValue : "script" === nodeName && dest.text !== src.text && (dest.text = src.text), 
        // Event data gets referenced instead of copied if the expando
        // gets copied too
        dest.removeAttribute(jQuery.expando));
    }
    function getAll(elem) {
        return "undefined" != typeof elem.getElementsByTagName ? elem.getElementsByTagName("*") : "undefined" != typeof elem.querySelectorAll ? elem.querySelectorAll("*") : [];
    }
    // Used in clean, fixes the defaultChecked property
    function fixDefaultChecked(elem) {
        rcheckableType.test(elem.type) && (elem.defaultChecked = elem.checked);
    }
    // return a css property mapped to a potentially vendor prefixed property
    function vendorPropName(style, name) {
        // shortcut for names that are not vendor prefixed
        if (name in style) return name;
        for (// check for vendor prefixed names
        var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--; ) if (name = cssPrefixes[i] + capName, 
        name in style) return name;
        return origName;
    }
    function isHidden(elem, el) {
        return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem);
    }
    function showHide(elements, show) {
        for (var elem, display, values = [], index = 0, length = elements.length; length > index; index++) elem = elements[index], 
        elem.style && (values[index] = jQuery._data(elem, "olddisplay"), show ? (// Reset the inline display of this element to learn if it is
        // being hidden by cascaded rules or not
        values[index] || "none" !== elem.style.display || (elem.style.display = ""), // Set elements which have been overridden with display: none
        // in a stylesheet to whatever the default browser style is
        // for such an element
        "" === elem.style.display && isHidden(elem) && (values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName)))) : (display = curCSS(elem, "display"), 
        values[index] || "none" === display || jQuery._data(elem, "olddisplay", display)));
        // Set the display of most of the elements in a second loop
        // to avoid the constant reflow
        for (index = 0; length > index; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
        return elements;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox) {
        for (var i = extra === (isBorderBox ? "border" : "content") ? // If we already have the right measurement, avoid augmentation
        4 : // Otherwise initialize for horizontal or vertical properties
        "width" === name ? 1 : 0, val = 0; 4 > i; i += 2) // both box models exclude margin, so add it if we want it
        "margin" === extra && (// we use jQuery.css instead of curCSS here
        // because of the reliableMarginRight CSS hook!
        val += jQuery.css(elem, extra + cssExpand[i], !0)), // From this point on we use curCSS for maximum performance (relevant in animations)
        isBorderBox ? (// border-box includes padding, so remove it if we want content
        "content" === extra && (val -= parseFloat(curCSS(elem, "padding" + cssExpand[i])) || 0), 
        // at this point, extra isn't border nor margin, so remove border
        "margin" !== extra && (val -= parseFloat(curCSS(elem, "border" + cssExpand[i] + "Width")) || 0)) : (// at this point, extra isn't content, so add padding
        val += parseFloat(curCSS(elem, "padding" + cssExpand[i])) || 0, // at this point, extra isn't content nor padding, so add border
        "padding" !== extra && (val += parseFloat(curCSS(elem, "border" + cssExpand[i] + "Width")) || 0));
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        // Start with offset property, which is equivalent to the border-box value
        var val = "width" === name ? elem.offsetWidth : elem.offsetHeight, valueIsBorderBox = !0, isBorderBox = jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing");
        // some non-html elements return undefined for offsetWidth, so check for null/undefined
        // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
        // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
        if (0 >= val || null == val) {
            // Computed unit is not pixels. Stop here and return.
            if (// Fall back to computed then uncomputed css if necessary
            val = curCSS(elem, name), (0 > val || null == val) && (val = elem.style[name]), 
            rnumnonpx.test(val)) return val;
            // we need the check for style in case a browser which returns unreliable values
            // for getComputedStyle silently falls back to the reliable elem.style
            valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]), 
            // Normalize "", auto, and prepare for extra
            val = parseFloat(val) || 0;
        }
        // use the active box-sizing model to add/subtract irrelevant styles
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox) + "px";
    }
    // Try to determine the default display value of an element
    function css_defaultDisplay(nodeName) {
        if (elemdisplay[nodeName]) return elemdisplay[nodeName];
        var elem = jQuery("<" + nodeName + ">").appendTo(document.body), display = elem.css("display");
        // If the simple way fails,
        // get element's real default display by attaching it to a temp iframe
        // Use the already-created iframe if possible
        // Create a cacheable copy of the iframe document on first call.
        // IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
        // document to it; WebKit & Firefox won't allow reusing the iframe document.
        // Store the correct default display
        return elem.remove(), ("none" === display || "" === display) && (iframe = document.body.appendChild(iframe || jQuery.extend(document.createElement("iframe"), {
            frameBorder: 0,
            width: 0,
            height: 0
        })), iframeDoc && iframe.createElement || (iframeDoc = (iframe.contentWindow || iframe.contentDocument).document, 
        iframeDoc.write("<!doctype html><html><body>"), iframeDoc.close()), elem = iframeDoc.body.appendChild(iframeDoc.createElement(nodeName)), 
        display = curCSS(elem, "display"), document.body.removeChild(iframe)), elemdisplay[nodeName] = display, 
        display;
    }
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) // Serialize array item.
        jQuery.each(obj, function(i, v) {
            traditional || rbracket.test(prefix) ? // Treat each array item as a scalar.
            add(prefix, v) : // If array item is non-scalar (array or object), encode its
            // numeric index to resolve deserialization ambiguity issues.
            // Note that rack (as of 1.0.0) can't currently deserialize
            // nested arrays properly, and attempting to do so may cause
            // a server error. Possible fixes are to modify rack's
            // deserialization algorithm or to provide an option or flag
            // to force array serialization to be shallow.
            buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add);
        }); else if (traditional || "object" !== jQuery.type(obj)) // Serialize scalar item.
        add(prefix, obj); else // Serialize object item.
        for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
    }
    // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports(structure) {
        // dataTypeExpression is optional and defaults to "*"
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
            var dataType, list, placeBefore, dataTypes = dataTypeExpression.toLowerCase().split(core_rspace), i = 0, length = dataTypes.length;
            if (jQuery.isFunction(func)) // For each dataType in the dataTypeExpression
            for (;length > i; i++) dataType = dataTypes[i], // We control if we're asked to add before
            // any existing element
            placeBefore = /^\+/.test(dataType), placeBefore && (dataType = dataType.substr(1) || "*"), 
            list = structure[dataType] = structure[dataType] || [], // then we add to the structure accordingly
            list[placeBefore ? "unshift" : "push"](func);
        };
    }
    // Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, dataType, inspected) {
        dataType = dataType || options.dataTypes[0], inspected = inspected || {}, inspected[dataType] = !0;
        for (var selection, list = structure[dataType], i = 0, length = list ? list.length : 0, executeOnly = structure === prefilters; length > i && (executeOnly || !selection); i++) selection = list[i](options, originalOptions, jqXHR), 
        // If we got redirected to another dataType
        // we try there if executing only and not done already
        "string" == typeof selection && (!executeOnly || inspected[selection] ? selection = undefined : (options.dataTypes.unshift(selection), 
        selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, selection, inspected)));
        // unnecessary when only executing (prefilters)
        // but it'll be ignored by the caller in that case
        // If we're only executing or nothing was selected
        // we try the catchall dataType if not done already
        return !executeOnly && selection || inspected["*"] || (selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, "*", inspected)), 
        selection;
    }
    // A special extend for ajax options
    // that takes "flat" options (not to be deep extended)
    // Fixes #9887
    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) src[key] !== undefined && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        deep && jQuery.extend(!0, target, deep);
    }
    /* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
    function ajaxHandleResponses(s, jqXHR, responses) {
        var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes, responseFields = s.responseFields;
        // Fill responseXXX fields
        for (type in responseFields) type in responses && (jqXHR[responseFields[type]] = responses[type]);
        // Remove auto dataType and get content-type in the process
        for (;"*" === dataTypes[0]; ) dataTypes.shift(), ct === undefined && (ct = s.mimeType || jqXHR.getResponseHeader("content-type"));
        // Check if we're dealing with a known content-type
        if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break;
        }
        // Check to see if we have a response for the expected dataType
        if (dataTypes[0] in responses) finalDataType = dataTypes[0]; else {
            // Try convertible dataTypes
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                firstDataType || (firstDataType = type);
            }
            // Or just use first one
            finalDataType = finalDataType || firstDataType;
        }
        // If we found a dataType
        // We add the dataType to the list if needed
        // and return the corresponding response
        // If we found a dataType
        // We add the dataType to the list if needed
        // and return the corresponding response
        return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), 
        responses[finalDataType]) : void 0;
    }
    // Chain conversions given the request and the original response
    function ajaxConvert(s, response) {
        var conv, conv2, current, tmp, // Work with a copy of dataTypes in case we need to modify it for conversion
        dataTypes = s.dataTypes.slice(), prev = dataTypes[0], converters = {}, i = 0;
        // Create converters map with lowercased keys
        if (// Apply the dataFilter if provided
        s.dataFilter && (response = s.dataFilter(response, s.dataType)), dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
        // Convert to each sequential dataType, tolerating list modification
        for (;current = dataTypes[++i]; ) // There's only work to do if current dataType is non-auto
        if ("*" !== current) {
            // Convert response if prev dataType is non-auto and differs from current
            if ("*" !== prev && prev !== current) {
                // If none found, seek a pair
                if (// Seek a direct converter
                conv = converters[prev + " " + current] || converters["* " + current], !conv) for (conv2 in converters) if (// If conv2 outputs current
                tmp = conv2.split(" "), tmp[1] === current && (// If prev can be converted to accepted input
                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                    // Condense equivalence converters
                    conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], 
                    dataTypes.splice(i--, 0, current));
                    break;
                }
                // Apply converter (if not an equivalence)
                if (conv !== !0) // Unless errors are allowed to bubble, catch and return them
                if (conv && s["throws"]) response = conv(response); else try {
                    response = conv(response);
                } catch (e) {
                    return {
                        state: "parsererror",
                        error: conv ? e : "No conversion from " + prev + " to " + current
                    };
                }
            }
            // Update prev for next iteration
            prev = current;
        }
        return {
            state: "success",
            data: response
        };
    }
    // Functions to create xhrs
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    }
    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
    }
    // Animations created synchronously will run synchronously
    function createFxNow() {
        return setTimeout(function() {
            fxNow = undefined;
        }, 0), fxNow = jQuery.now();
    }
    function createTweens(animation, props) {
        jQuery.each(props, function(prop, value) {
            for (var collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++) if (collection[index].call(animation, prop, value)) // we're done with this property
            return;
        });
    }
    function Animation(elem, properties, options) {
        var result, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            // don't match elem in the :animated selector
            delete tick.elem;
        }), tick = function() {
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), percent = 1 - (remaining / animation.duration || 0), index = 0, length = animation.tweens.length; length > index; index++) animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [ animation, percent, remaining ]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [ animation ]), 
            !1);
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(!0, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end, easing) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                return animation.tweens.push(tween), tween;
            },
            stop: function(gotoEnd) {
                for (var index = 0, // if we are going to the end, we want to run all the tweens
                // otherwise we skip this part
                length = gotoEnd ? animation.tweens.length : 0; length > index; index++) animation.tweens[index].run(1);
                // resolve when we played the last frame
                // otherwise, reject
                return gotoEnd ? deferred.resolveWith(elem, [ animation, gotoEnd ]) : deferred.rejectWith(elem, [ animation, gotoEnd ]), 
                this;
            }
        }), props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); length > index; index++) if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
        // attach callbacks from options
        return createTweens(animation, props), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), 
        jQuery.fx.timer(jQuery.extend(tick, {
            anim: animation,
            queue: animation.opts.queue,
            elem: elem
        })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        // camelCase, specialEasing and expand cssHook pass
        for (index in props) if (name = jQuery.camelCase(index), easing = specialEasing[name], 
        value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), 
        index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], 
        hooks && "expand" in hooks) {
            value = hooks.expand(value), delete props[name];
            // not quite $.extend, this wont overwrite keys already present.
            // also - reusing 'index' from above because we have the correct "name"
            for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing);
        } else specialEasing[name] = easing;
    }
    function defaultPrefilter(elem, props, opts) {
        var index, prop, value, length, dataShow, tween, hooks, oldfire, anim = this, style = elem.style, orig = {}, handled = [], hidden = elem.nodeType && isHidden(elem);
        // handle queue: false promises
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, 
        oldfire = hooks.empty.fire, hooks.empty.fire = function() {
            hooks.unqueued || oldfire();
        }), hooks.unqueued++, anim.always(function() {
            // doing this makes sure that the complete handler will be called
            // before this completes
            anim.always(function() {
                hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire();
            });
        })), // height/width overflow pass
        1 === elem.nodeType && ("height" in props || "width" in props) && (// Make sure that nothing sneaks out
        // Record all 3 overflow attributes because IE does not
        // change the overflow attribute when overflowX and
        // overflowY are set to the same value
        opts.overflow = [ style.overflow, style.overflowX, style.overflowY ], // Set display property to inline-block for height/width
        // animations on inline elements that are having width/height animated
        "inline" === jQuery.css(elem, "display") && "none" === jQuery.css(elem, "float") && (// inline-level elements accept inline-block;
        // block-level elements need to be inline with layout
        jQuery.support.inlineBlockNeedsLayout && "inline" !== css_defaultDisplay(elem.nodeName) ? style.zoom = 1 : style.display = "inline-block")), 
        opts.overflow && (style.overflow = "hidden", jQuery.support.shrinkWrapBlocks || anim.done(function() {
            style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2];
        }));
        // show/hide pass
        for (index in props) if (value = props[index], rfxtypes.exec(value)) {
            if (delete props[index], value === (hidden ? "hide" : "show")) continue;
            handled.push(index);
        }
        if (length = handled.length) for (dataShow = jQuery._data(elem, "fxshow") || jQuery._data(elem, "fxshow", {}), 
        hidden ? jQuery(elem).show() : anim.done(function() {
            jQuery(elem).hide();
        }), anim.done(function() {
            var prop;
            jQuery.removeData(elem, "fxshow", !0);
            for (prop in orig) jQuery.style(elem, prop, orig[prop]);
        }), index = 0; length > index; index++) prop = handled[index], tween = anim.createTween(prop, hidden ? dataShow[prop] : 0), 
        orig[prop] = dataShow[prop] || jQuery.style(elem, prop), prop in dataShow || (dataShow[prop] = tween.start, 
        hidden && (tween.end = tween.start, tween.start = "width" === prop || "height" === prop ? 1 : 0));
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    // Generate parameters to create a standard animation
    function genFx(type, includeWidth) {
        var which, attrs = {
            height: type
        }, i = 0;
        for (// if we include width, step value is 1 to do all cssExpand values,
        // if we don't include width, step value is 2 to skip over Left and Right
        includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth) which = cssExpand[i], 
        attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type), attrs;
    }
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType ? elem.defaultView || elem.parentWindow : !1;
    }
    var // A central reference to the root jQuery(document)
    rootjQuery, // The deferred used on DOM ready
    readyList, // Use the correct document accordingly with window argument (sandbox)
    document = window.document, location = window.location, navigator = window.navigator, // Map over jQuery in case of overwrite
    _jQuery = window.jQuery, // Map over the $ in case of overwrite
    _$ = window.$, // Save a reference to some core methods
    core_push = Array.prototype.push, core_slice = Array.prototype.slice, core_indexOf = Array.prototype.indexOf, core_toString = Object.prototype.toString, core_hasOwn = Object.prototype.hasOwnProperty, core_trim = String.prototype.trim, // Define a local copy of jQuery
    jQuery = function(selector, context) {
        // The jQuery object is actually just the init constructor 'enhanced'
        return new jQuery.fn.init(selector, context, rootjQuery);
    }, // Used for matching numbers
    core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, // Used for detecting and trimming whitespace
    core_rnotwhite = /\S/, core_rspace = /\s+/, // Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, // A simple way to check for HTML strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, // Match a standalone tag
    rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, // JSON RegExp
    rvalidchars = /^[\],:{}\s]*$/, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g, rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, // Matches dashed string for camelizing
    rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, // Used by jQuery.camelCase as callback to replace()
    fcamelCase = function(all, letter) {
        return (letter + "").toUpperCase();
    }, // The ready event handler and self cleanup method
    DOMContentLoaded = function() {
        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", DOMContentLoaded, !1), 
        jQuery.ready()) : "complete" === document.readyState && (// we're here because readyState === "complete" in oldIE
        // which is good enough for us to call the dom ready!
        document.detachEvent("onreadystatechange", DOMContentLoaded), jQuery.ready());
    }, // [[Class]] -> type pairs
    class2type = {};
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        init: function(selector, context, rootjQuery) {
            var match, elem, doc;
            // Handle $(""), $(null), $(undefined), $(false)
            if (!selector) return this;
            // Handle $(DOMElement)
            if (selector.nodeType) return this.context = this[0] = selector, this.length = 1, 
            this;
            // Handle HTML strings
            if ("string" == typeof selector) {
                // Match html or make sure no context is specified for #id
                if (// Assume that strings that start and end with <> are HTML and skip the regex check
                match = "<" === selector.charAt(0) && ">" === selector.charAt(selector.length - 1) && selector.length >= 3 ? [ null, selector, null ] : rquickExpr.exec(selector), 
                !match || !match[1] && context) return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
                // HANDLE: $(html) -> $(array)
                if (match[1]) // scripts is true for back-compat
                return context = context instanceof jQuery ? context[0] : context, doc = context && context.nodeType ? context.ownerDocument || context : document, 
                selector = jQuery.parseHTML(match[1], doc, !0), rsingleTag.test(match[1]) && jQuery.isPlainObject(context) && this.attr.call(selector, context, !0), 
                jQuery.merge(this, selector);
                // Check parentNode to catch when Blackberry 4.6 returns
                // nodes that are no longer in the document #6963
                if (elem = document.getElementById(match[2]), elem && elem.parentNode) {
                    // Handle the case where IE and Opera return items
                    // by name instead of ID
                    if (elem.id !== match[2]) return rootjQuery.find(selector);
                    // Otherwise, we inject the element directly into the jQuery object
                    this.length = 1, this[0] = elem;
                }
                return this.context = document, this.selector = selector, this;
            }
            return jQuery.isFunction(selector) ? rootjQuery.ready(selector) : (selector.selector !== undefined && (this.selector = selector.selector, 
            this.context = selector.context), jQuery.makeArray(selector, this));
        },
        // Start with an empty selector
        selector: "",
        // The current version of jQuery being used
        jquery: "1.8.2",
        // The default length of a jQuery object is 0
        length: 0,
        // The number of elements contained in the matched element set
        size: function() {
            return this.length;
        },
        toArray: function() {
            return core_slice.call(this);
        },
        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function(num) {
            // Return a 'clean' array
            // Return just the object
            return null == num ? this.toArray() : 0 > num ? this[this.length + num] : this[num];
        },
        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function(elems, name, selector) {
            // Build a new jQuery matched element set
            var ret = jQuery.merge(this.constructor(), elems);
            // Return the newly-formed element set
            // Add the old object onto the stack (as a reference)
            return ret.prevObject = this, ret.context = this.context, "find" === name ? ret.selector = this.selector + (this.selector ? " " : "") + selector : name && (ret.selector = this.selector + "." + name + "(" + selector + ")"), 
            ret;
        },
        // Execute a callback for every element in the matched set.
        // (You can seed the arguments with an array of args, but this is
        // only used internally.)
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        ready: function(fn) {
            // Add the callback
            return jQuery.ready.promise().done(fn), this;
        },
        eq: function(i) {
            return i = +i, -1 === i ? this.slice(i) : this.slice(i, i + 1);
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        slice: function() {
            return this.pushStack(core_slice.apply(this, arguments), "slice", core_slice.call(arguments).join(","));
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: core_push,
        sort: [].sort,
        splice: [].splice
    }, // Give the init function the jQuery prototype for later instantiation
    jQuery.fn.init.prototype = jQuery.fn, jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for (// Handle a deep copy situation
        "boolean" == typeof target && (deep = target, target = arguments[1] || {}, // skip the boolean and the target
        i = 2), // Handle case when target is a string or something (possible in deep copy)
        "object" == typeof target || jQuery.isFunction(target) || (target = {}), // extend jQuery itself if only one argument is passed
        length === i && (target = this, --i); length > i; i++) // Only deal with non-null/undefined values
        if (null != (options = arguments[i])) // Extend the base object
        for (name in options) src = target[name], copy = options[name], // Prevent never-ending loop
        target !== copy && (// Recurse if we're merging plain objects or arrays
        deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
        clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, 
        // Never move original objects, clone them
        target[name] = jQuery.extend(deep, clone, copy)) : copy !== undefined && (target[name] = copy));
        // Return the modified object
        return target;
    }, jQuery.extend({
        noConflict: function(deep) {
            return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), 
            jQuery;
        },
        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: !1,
        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait: 1,
        // Hold (or release) the ready event
        holdReady: function(hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0);
        },
        // Handle when the DOM is ready
        ready: function(wait) {
            // Abort if there are pending holds or we're already ready
            if (wait === !0 ? !--jQuery.readyWait : !jQuery.isReady) {
                // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                if (!document.body) return setTimeout(jQuery.ready, 1);
                // Remember that the DOM is ready
                jQuery.isReady = !0, // If a normal DOM Ready event fired, decrement, and wait if need be
                wait !== !0 && --jQuery.readyWait > 0 || (// If there are functions bound, to execute
                readyList.resolveWith(document, [ jQuery ]), // Trigger any bound ready events
                jQuery.fn.trigger && jQuery(document).trigger("ready").off("ready"));
            }
        },
        // See test/unit/core.js for details concerning isFunction.
        // Since version 1.3, DOM methods and functions like alert
        // aren't supported. They return false on IE (#2968).
        isFunction: function(obj) {
            return "function" === jQuery.type(obj);
        },
        isArray: Array.isArray || function(obj) {
            return "array" === jQuery.type(obj);
        },
        isWindow: function(obj) {
            return null != obj && obj == obj.window;
        },
        isNumeric: function(obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },
        type: function(obj) {
            return null == obj ? String(obj) : class2type[core_toString.call(obj)] || "object";
        },
        isPlainObject: function(obj) {
            // Must be an Object.
            // Because of IE, we also have to check the presence of the constructor property.
            // Make sure that DOM nodes and window objects don't pass through, as well
            if (!obj || "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj)) return !1;
            try {
                // Not own constructor property must be Object
                if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (e) {
                // IE8,9 Will throw exceptions on certain host objects #9897
                return !1;
            }
            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.
            var key;
            for (key in obj) ;
            return key === undefined || core_hasOwn.call(obj, key);
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) return !1;
            return !0;
        },
        error: function(msg) {
            throw new Error(msg);
        },
        // data: string of html
        // context (optional): If specified, the fragment will be created in this context, defaults to document
        // scripts (optional): If true, will include scripts passed in the html string
        parseHTML: function(data, context, scripts) {
            var parsed;
            // Single tag
            return data && "string" == typeof data ? ("boolean" == typeof context && (scripts = context, 
            context = 0), context = context || document, (parsed = rsingleTag.exec(data)) ? [ context.createElement(parsed[1]) ] : (parsed = jQuery.buildFragment([ data ], context, scripts ? null : []), 
            jQuery.merge([], (parsed.cacheable ? jQuery.clone(parsed.fragment) : parsed.fragment).childNodes))) : null;
        },
        parseJSON: function(data) {
            // Make sure leading/trailing whitespace is removed (IE can't handle it)
            // Attempt to parse using the native JSON parser first
            // Make sure the incoming data is actual JSON
            // Logic borrowed from http://json.org/json2.js
            return data && "string" == typeof data ? (data = jQuery.trim(data), window.JSON && window.JSON.parse ? window.JSON.parse(data) : rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, "")) ? new Function("return " + data)() : void jQuery.error("Invalid JSON: " + data)) : null;
        },
        // Cross-browser xml parsing
        parseXML: function(data) {
            var xml, tmp;
            if (!data || "string" != typeof data) return null;
            try {
                window.DOMParser ? (// Standard
                tmp = new DOMParser(), xml = tmp.parseFromString(data, "text/xml")) : (// IE
                xml = new ActiveXObject("Microsoft.XMLDOM"), xml.async = "false", xml.loadXML(data));
            } catch (e) {
                xml = undefined;
            }
            return xml && xml.documentElement && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), 
            xml;
        },
        noop: function() {},
        // Evaluates a script in a global context
        // Workarounds based on findings by Jim Driscoll
        // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
        globalEval: function(data) {
            data && core_rnotwhite.test(data) && // We use execScript on Internet Explorer
            // We use an anonymous function so that context is window
            // rather than jQuery in Firefox
            (window.execScript || function(data) {
                window.eval.call(window, data);
            })(data);
        },
        // Convert dashed to camelCase; used by the css and data modules
        // Microsoft forgot to hump their vendor prefix (#9572)
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        // args is for internal usage only
        each: function(obj, callback, args) {
            var name, i = 0, length = obj.length, isObj = length === undefined || jQuery.isFunction(obj);
            if (args) if (isObj) {
                for (name in obj) if (callback.apply(obj[name], args) === !1) break;
            } else for (;length > i && callback.apply(obj[i++], args) !== !1; ) ; else if (isObj) {
                for (name in obj) if (callback.call(obj[name], name, obj[name]) === !1) break;
            } else for (;length > i && callback.call(obj[i], i, obj[i++]) !== !1; ) ;
            return obj;
        },
        // Use native String.trim function wherever possible
        trim: core_trim && !core_trim.call("\ufeff ") ? function(text) {
            return null == text ? "" : core_trim.call(text);
        } : // Otherwise use our own trimming functionality
        function(text) {
            return null == text ? "" : (text + "").replace(rtrim, "");
        },
        // results is for internal usage only
        makeArray: function(arr, results) {
            var type, ret = results || [];
            // The window, strings (and functions) also have 'length'
            // Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
            return null != arr && (type = jQuery.type(arr), null == arr.length || "string" === type || "function" === type || "regexp" === type || jQuery.isWindow(arr) ? core_push.call(ret, arr) : jQuery.merge(ret, arr)), 
            ret;
        },
        inArray: function(elem, arr, i) {
            var len;
            if (arr) {
                if (core_indexOf) return core_indexOf.call(arr, elem, i);
                for (len = arr.length, i = i ? 0 > i ? Math.max(0, len + i) : i : 0; len > i; i++) // Skip accessing in sparse arrays
                if (i in arr && arr[i] === elem) return i;
            }
            return -1;
        },
        merge: function(first, second) {
            var l = second.length, i = first.length, j = 0;
            if ("number" == typeof l) for (;l > j; j++) first[i++] = second[j]; else for (;second[j] !== undefined; ) first[i++] = second[j++];
            return first.length = i, first;
        },
        grep: function(elems, callback, inv) {
            var retVal, ret = [], i = 0, length = elems.length;
            // Go through the array, only saving the items
            // that pass the validator function
            for (inv = !!inv; length > i; i++) retVal = !!callback(elems[i], i), inv !== retVal && ret.push(elems[i]);
            return ret;
        },
        // arg is for internal usage only
        map: function(elems, callback, arg) {
            var value, key, ret = [], i = 0, length = elems.length, // jquery objects are treated as arrays
            isArray = elems instanceof jQuery || length !== undefined && "number" == typeof length && (length > 0 && elems[0] && elems[length - 1] || 0 === length || jQuery.isArray(elems));
            // Go through the array, translating each of the items to their
            if (isArray) for (;length > i; i++) value = callback(elems[i], i, arg), null != value && (ret[ret.length] = value); else for (key in elems) value = callback(elems[key], key, arg), 
            null != value && (ret[ret.length] = value);
            // Flatten any nested arrays
            return ret.concat.apply([], ret);
        },
        // A global GUID counter for objects
        guid: 1,
        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy: function(fn, context) {
            var tmp, args, proxy;
            // Quick check to determine if target is callable, in the spec
            // this throws a TypeError, but we will just return undefined.
            // Quick check to determine if target is callable, in the spec
            // this throws a TypeError, but we will just return undefined.
            // Simulated bind
            // Set the guid of unique handler to the same of original handler, so it can be removed
            return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), 
            jQuery.isFunction(fn) ? (args = core_slice.call(arguments, 2), proxy = function() {
                return fn.apply(context, args.concat(core_slice.call(arguments)));
            }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : undefined;
        },
        // Multifunctional method to get and set values of a collection
        // The value/s can optionally be executed if it's a function
        access: function(elems, fn, key, value, chainable, emptyGet, pass) {
            var exec, bulk = null == key, i = 0, length = elems.length;
            // Sets many values
            if (key && "object" == typeof key) {
                for (i in key) jQuery.access(elems, fn, i, key[i], 1, emptyGet, value);
                chainable = 1;
            } else if (value !== undefined) {
                if (// Optionally, function values get executed if exec is true
                exec = pass === undefined && jQuery.isFunction(value), bulk && (// Bulk operations only iterate when executing function values
                exec ? (exec = fn, fn = function(elem, key, value) {
                    return exec.call(jQuery(elem), value);
                }) : (fn.call(elems, value), fn = null)), fn) for (;length > i; i++) fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass);
                chainable = 1;
            }
            // Gets
            return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
        },
        now: function() {
            return new Date().getTime();
        }
    }), jQuery.ready.promise = function(obj) {
        if (!readyList) // Catch cases where $(document).ready() is called after the browser event has already occurred.
        // we once tried to use readyState "interactive" here, but it caused issues like the one
        // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
        if (readyList = jQuery.Deferred(), "complete" === document.readyState) // Handle it asynchronously to allow scripts the opportunity to delay ready
        setTimeout(jQuery.ready, 1); else if (document.addEventListener) // Use the handy event callback
        document.addEventListener("DOMContentLoaded", DOMContentLoaded, !1), // A fallback to window.onload, that will always work
        window.addEventListener("load", jQuery.ready, !1); else {
            // Ensure firing before onload, maybe late but safe also for iframes
            document.attachEvent("onreadystatechange", DOMContentLoaded), // A fallback to window.onload, that will always work
            window.attachEvent("onload", jQuery.ready);
            // If IE and not a frame
            // continually check to see if the document is ready
            var top = !1;
            try {
                top = null == window.frameElement && document.documentElement;
            } catch (e) {}
            top && top.doScroll && !function doScrollCheck() {
                if (!jQuery.isReady) {
                    try {
                        // Use the trick by Diego Perini
                        // http://javascript.nwbox.com/IEContentLoaded/
                        top.doScroll("left");
                    } catch (e) {
                        return setTimeout(doScrollCheck, 50);
                    }
                    // and execute any waiting functions
                    jQuery.ready();
                }
            }();
        }
        return readyList.promise(obj);
    }, // Populate the class2type map
    jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    }), // All jQuery objects should point back to these
    rootjQuery = jQuery(document);
    // String to Object options format cache
    var optionsCache = {};
    /*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
    jQuery.Callbacks = function(options) {
        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var // Last fire value (for non-forgettable lists)
        memory, // Flag to know if list was already fired
        fired, // Flag to know if list is currently firing
        firing, // First callback to fire (used internally by add and fireWith)
        firingStart, // End of the loop when firing
        firingLength, // Index of currently firing callback (modified by remove if needed)
        firingIndex, // Actual callback list
        list = [], // Stack of fire calls for repeatable lists
        stack = !options.once && [], // Fire callbacks
        fire = function(data) {
            for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, 
            firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++) if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                memory = !1;
                // To prevent further calls using add
                break;
            }
            firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable());
        }, // Actual Callbacks object
        self = {
            // Add a callback or a collection of callbacks to the list
            add: function() {
                if (list) {
                    // First, we save the current length
                    var start = list.length;
                    !function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            "function" !== type || options.unique && self.has(arg) ? arg && arg.length && "string" !== type && // Inspect recursively
                            add(arg) : list.push(arg);
                        });
                    }(arguments), // Do we need to add the callbacks to the
                    // current firing batch?
                    firing ? firingLength = list.length : memory && (firingStart = start, fire(memory));
                }
                return this;
            },
            // Remove a callback from the list
            remove: function() {
                return list && jQuery.each(arguments, function(_, arg) {
                    for (var index; (index = jQuery.inArray(arg, list, index)) > -1; ) list.splice(index, 1), 
                    // Handle firing indexes
                    firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--);
                }), this;
            },
            // Control if a given callback is in the list
            has: function(fn) {
                return jQuery.inArray(fn, list) > -1;
            },
            // Remove all callbacks from the list
            empty: function() {
                return list = [], this;
            },
            // Have the list do nothing anymore
            disable: function() {
                return list = stack = memory = undefined, this;
            },
            // Is it disabled?
            disabled: function() {
                return !list;
            },
            // Lock the list in its current state
            lock: function() {
                return stack = undefined, memory || self.disable(), this;
            },
            // Is it locked?
            locked: function() {
                return !stack;
            },
            // Call all callbacks with the given context and arguments
            fireWith: function(context, args) {
                return args = args || [], args = [ context, args.slice ? args.slice() : args ], 
                !list || fired && !stack || (firing ? stack.push(args) : fire(args)), this;
            },
            // Call all the callbacks with the given arguments
            fire: function() {
                return self.fireWith(this, arguments), this;
            },
            // To know if the callbacks have already been called at least once
            fired: function() {
                return !!fired;
            }
        };
        return self;
    }, jQuery.extend({
        Deferred: function(func) {
            var tuples = [ // action, add listener, listener list, final state
            [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    return deferred.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var action = tuple[0], fn = fns[i];
                            // deferred[ done | fail | progress ] for forwarding actions to newDefer
                            deferred[tuple[1]](jQuery.isFunction(fn) ? function() {
                                var returned = fn.apply(this, arguments);
                                returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[action + "With"](this === deferred ? newDefer : this, [ returned ]);
                            } : newDefer[action]);
                        }), fns = null;
                    }).promise();
                },
                // Get a promise for this deferred
                // If obj is provided, the promise aspect is added to the object
                promise: function(obj) {
                    return null != obj ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            // All done!
            // Keep pipe for back-compat
            // Add list-specific methods
            // Make the deferred a promise
            // Call given func if any
            return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                // promise[ done | fail | progress ] = list.add
                promise[tuple[1]] = list.add, // Handle state
                stateString && list.add(function() {
                    // state = [ resolved | rejected ]
                    state = stateString;
                }, tuples[1 ^ i][2].disable, tuples[2][2].lock), // deferred[ resolve | reject | notify ] = list.fire
                deferred[tuple[0]] = list.fire, deferred[tuple[0] + "With"] = list.fireWith;
            }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
        },
        // Deferred helper
        when: function(subordinate) {
            var progressValues, progressContexts, resolveContexts, i = 0, resolveValues = core_slice.call(arguments), length = resolveValues.length, // the count of uncompleted subordinates
            remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
            deferred = 1 === remaining ? subordinate : jQuery.Deferred(), // Update function for both resolve and progress values
            updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this, values[i] = arguments.length > 1 ? core_slice.call(arguments) : value, 
                    values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values);
                };
            };
            // add listeners to Deferred subordinates; treat others as resolved
            if (length > 1) for (progressValues = new Array(length), progressContexts = new Array(length), 
            resolveContexts = new Array(length); length > i; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
            // if we're not waiting on anything, resolve the master
            return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise();
        }
    }), jQuery.support = function() {
        var support, all, a, select, opt, input, fragment, eventName, i, isSupported, clickFn, div = document.createElement("div");
        // Can't get basic test support
        if (// Preliminary tests
        div.setAttribute("className", "t"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        all = div.getElementsByTagName("*"), a = div.getElementsByTagName("a")[0], a.style.cssText = "top:1px;float:left;opacity:.5", 
        !all || !all.length) return {};
        // First batch of supports tests
        select = document.createElement("select"), opt = select.appendChild(document.createElement("option")), 
        input = div.getElementsByTagName("input")[0], support = {
            // IE strips leading whitespace when .innerHTML is used
            leadingWhitespace: 3 === div.firstChild.nodeType,
            // Make sure that tbody elements aren't automatically inserted
            // IE will insert them into empty tables
            tbody: !div.getElementsByTagName("tbody").length,
            // Make sure that link elements get serialized correctly by innerHTML
            // This requires a wrapper element in IE
            htmlSerialize: !!div.getElementsByTagName("link").length,
            // Get the style information from getAttribute
            // (IE uses .cssText instead)
            style: /top/.test(a.getAttribute("style")),
            // Make sure that URLs aren't manipulated
            // (IE normalizes it by default)
            hrefNormalized: "/a" === a.getAttribute("href"),
            // Make sure that element opacity exists
            // (IE uses filter instead)
            // Use a regex to work around a WebKit issue. See #5145
            opacity: /^0.5/.test(a.style.opacity),
            // Verify style float existence
            // (IE uses styleFloat instead of cssFloat)
            cssFloat: !!a.style.cssFloat,
            // Make sure that if no value is specified for a checkbox
            // that it defaults to "on".
            // (WebKit defaults to "" instead)
            checkOn: "on" === input.value,
            // Make sure that a selected-by-default option has a working selected property.
            // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
            optSelected: opt.selected,
            // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
            getSetAttribute: "t" !== div.className,
            // Tests for enctype support on a form(#6743)
            enctype: !!document.createElement("form").enctype,
            // Makes sure cloning an html5 element does not cause problems
            // Where outerHTML is undefined, this still works
            html5Clone: "<:nav></:nav>" !== document.createElement("nav").cloneNode(!0).outerHTML,
            // jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
            boxModel: "CSS1Compat" === document.compatMode,
            // Will be defined later
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        }, // Make sure checked status is properly cloned
        input.checked = !0, support.noCloneChecked = input.cloneNode(!0).checked, // Make sure that the options inside disabled selects aren't marked as disabled
        // (WebKit marks them as disabled)
        select.disabled = !0, support.optDisabled = !opt.disabled;
        // Test to see if it's possible to delete an expando from an element
        // Fails in Internet Explorer
        try {
            delete div.test;
        } catch (e) {
            support.deleteExpando = !1;
        }
        // Technique from Juriy Zaytsev
        // http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
        // We only care about the case where non-standard event systems
        // are used, namely in IE. Short-circuiting here helps us to
        // avoid an eval call (in setAttribute) which can cause CSP
        // to go haywire. See: https://developer.mozilla.org/en/Security/CSP
        if (!div.addEventListener && div.attachEvent && div.fireEvent && (div.attachEvent("onclick", clickFn = function() {
            // Cloning a node shouldn't copy over any
            // bound event handlers (IE does this)
            support.noCloneEvent = !1;
        }), div.cloneNode(!0).fireEvent("onclick"), div.detachEvent("onclick", clickFn)), 
        // Check if a radio maintains its value
        // after being appended to the DOM
        input = document.createElement("input"), input.value = "t", input.setAttribute("type", "radio"), 
        support.radioValue = "t" === input.value, input.setAttribute("checked", "checked"), 
        // #11217 - WebKit loses check when the name is after the checked attribute
        input.setAttribute("name", "t"), div.appendChild(input), fragment = document.createDocumentFragment(), 
        fragment.appendChild(div.lastChild), // WebKit doesn't clone checked state correctly in fragments
        support.checkClone = fragment.cloneNode(!0).cloneNode(!0).lastChild.checked, // Check if a disconnected checkbox will retain its checked
        // value of true after appended to the DOM (IE6/7)
        support.appendChecked = input.checked, fragment.removeChild(input), fragment.appendChild(div), 
        div.attachEvent) for (i in {
            submit: !0,
            change: !0,
            focusin: !0
        }) eventName = "on" + i, isSupported = eventName in div, isSupported || (div.setAttribute(eventName, "return;"), 
        isSupported = "function" == typeof div[eventName]), support[i + "Bubbles"] = isSupported;
        // Run tests that need a body at doc ready
        // Null elements to avoid leaks in IE
        return jQuery(function() {
            var container, div, tds, marginDiv, divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;", body = document.getElementsByTagName("body")[0];
            body && (container = document.createElement("div"), container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", 
            body.insertBefore(container, body.firstChild), // Construct the test element
            div = document.createElement("div"), container.appendChild(div), // Check if table cells still have offsetWidth/Height when they are set
            // to display:none and there are still other visible table cells in a
            // table row; if so, offsetWidth/Height are not reliable for use when
            // determining if an element has been hidden directly using
            // display:none (it is still safe to use offsets if a parent element is
            // hidden; don safety goggles and see bug #4512 for more information).
            // (only IE 8 fails this test)
            div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", tds = div.getElementsByTagName("td"), 
            tds[0].style.cssText = "padding:0;margin:0;border:0;display:none", isSupported = 0 === tds[0].offsetHeight, 
            tds[0].style.display = "", tds[1].style.display = "none", // Check if empty table cells still have offsetWidth/Height
            // (IE <= 8 fail this test)
            support.reliableHiddenOffsets = isSupported && 0 === tds[0].offsetHeight, // Check box-sizing and margin behavior
            div.innerHTML = "", div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", 
            support.boxSizing = 4 === div.offsetWidth, support.doesNotIncludeMarginInBodyOffset = 1 !== body.offsetTop, 
            // NOTE: To any future maintainer, we've window.getComputedStyle
            // because jsdom on node.js will break without it.
            window.getComputedStyle && (support.pixelPosition = "1%" !== (window.getComputedStyle(div, null) || {}).top, 
            support.boxSizingReliable = "4px" === (window.getComputedStyle(div, null) || {
                width: "4px"
            }).width, // Check if div with explicit width and no margin-right incorrectly
            // gets computed margin-right based on width of container. For more
            // info see bug #3333
            // Fails in WebKit before Feb 2011 nightlies
            // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
            marginDiv = document.createElement("div"), marginDiv.style.cssText = div.style.cssText = divReset, 
            marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", 
            div.appendChild(marginDiv), support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight)), 
            "undefined" != typeof div.style.zoom && (// Check if natively block-level elements act like inline-block
            // elements when setting their display to 'inline' and giving
            // them layout
            // (IE < 8 does this)
            div.innerHTML = "", div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1", 
            support.inlineBlockNeedsLayout = 3 === div.offsetWidth, // Check if elements with layout shrink-wrap their children
            // (IE 6 does this)
            div.style.display = "block", div.style.overflow = "visible", div.innerHTML = "<div></div>", 
            div.firstChild.style.width = "5px", support.shrinkWrapBlocks = 3 !== div.offsetWidth, 
            container.style.zoom = 1), // Null elements to avoid leaks in IE
            body.removeChild(container), container = div = tds = marginDiv = null);
        }), fragment.removeChild(div), all = a = select = opt = input = fragment = div = null, 
        support;
    }();
    var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, rmultiDash = /([A-Z])/g;
    jQuery.extend({
        cache: {},
        deletedIds: [],
        // Remove at next major release (1.9/2.0)
        uuid: 0,
        // Unique for each copy of jQuery on the page
        // Non-digits removed to match rinlinejQuery
        expando: "jQuery" + (jQuery.fn.jquery + Math.random()).replace(/\D/g, ""),
        // The following elements throw uncatchable exceptions if you
        // attempt to add expando properties to them.
        noData: {
            embed: !0,
            // Ban all objects except for Flash (which handle expandos)
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(elem) {
            return elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando], 
            !!elem && !isEmptyDataObject(elem);
        },
        data: function(elem, name, data, pvt) {
            if (jQuery.acceptData(elem)) {
                var thisCache, ret, internalKey = jQuery.expando, getByName = "string" == typeof name, // We have to handle DOM nodes and JS objects differently because IE6-7
                // can't GC object references properly across the DOM-JS boundary
                isNode = elem.nodeType, // Only DOM nodes need the global jQuery cache; JS object data is
                // attached directly to the object so GC can occur automatically
                cache = isNode ? jQuery.cache : elem, // Only defining an ID for JS objects if its cache already exists allows
                // the code to shortcut on the same path as a DOM node with no cache
                id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
                // Avoid doing any more work than we need to when trying to get data on an
                // object that has no data at all
                if (id && cache[id] && (pvt || cache[id].data) || !getByName || data !== undefined) // Only DOM nodes need a new unique ID for each element since their data
                // ends up in the global cache
                // Avoids exposing jQuery metadata on plain JS objects when the object
                // is serialized using JSON.stringify
                // An object can be passed to jQuery.data instead of a key/value pair; this gets
                // shallow copied over onto the existing cache
                // jQuery data() is stored in a separate object inside the object's internal data
                // cache in order to avoid key collisions between internal data and user-defined
                // data.
                // Check for both converted-to-camel and non-converted data property names
                // If a data property was specified
                // First Try to find as-is property data
                // Test for null|undefined property data
                // Try to find the camelCased property
                return id || (isNode ? elem[internalKey] = id = jQuery.deletedIds.pop() || jQuery.guid++ : id = internalKey), 
                cache[id] || (cache[id] = {}, isNode || (cache[id].toJSON = jQuery.noop)), ("object" == typeof name || "function" == typeof name) && (pvt ? cache[id] = jQuery.extend(cache[id], name) : cache[id].data = jQuery.extend(cache[id].data, name)), 
                thisCache = cache[id], pvt || (thisCache.data || (thisCache.data = {}), thisCache = thisCache.data), 
                data !== undefined && (thisCache[jQuery.camelCase(name)] = data), getByName ? (ret = thisCache[name], 
                null == ret && (ret = thisCache[jQuery.camelCase(name)])) : ret = thisCache, ret;
            }
        },
        removeData: function(elem, name, pvt) {
            if (jQuery.acceptData(elem)) {
                var thisCache, i, l, isNode = elem.nodeType, // See jQuery.data for more information
                cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
                // If there is already no cache entry for this object, there is no
                // purpose in continuing
                if (cache[id]) {
                    if (name && (thisCache = pvt ? cache[id] : cache[id].data)) {
                        // Support array or space separated string names for data keys
                        jQuery.isArray(name) || (// try the string as a key before any manipulation
                        name in thisCache ? name = [ name ] : (// split the camel cased version by spaces unless a key with the spaces exists
                        name = jQuery.camelCase(name), name = name in thisCache ? [ name ] : name.split(" ")));
                        for (i = 0, l = name.length; l > i; i++) delete thisCache[name[i]];
                        // If there is no data left in the cache, we want to continue
                        // and let the cache object itself get destroyed
                        if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) return;
                    }
                    // See jQuery.data for more information
                    (pvt || (delete cache[id].data, isEmptyDataObject(cache[id]))) && (// Destroy the cache
                    isNode ? jQuery.cleanData([ elem ], !0) : jQuery.support.deleteExpando || cache != cache.window ? delete cache[id] : cache[id] = null);
                }
            }
        },
        // For internal use only.
        _data: function(elem, name, data) {
            return jQuery.data(elem, name, data, !0);
        },
        // A method for determining if a DOM node can handle the data expando
        acceptData: function(elem) {
            var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
            // nodes accept data unless otherwise specified; rejection can be conditional
            return !noData || noData !== !0 && elem.getAttribute("classid") === noData;
        }
    }), jQuery.fn.extend({
        data: function(key, value) {
            var parts, part, attr, name, l, elem = this[0], i = 0, data = null;
            // Gets all values
            if (key === undefined) {
                if (this.length && (data = jQuery.data(elem), 1 === elem.nodeType && !jQuery._data(elem, "parsedAttrs"))) {
                    for (attr = elem.attributes, l = attr.length; l > i; i++) name = attr[i].name, name.indexOf("data-") || (name = jQuery.camelCase(name.substring(5)), 
                    dataAttr(elem, name, data[name]));
                    jQuery._data(elem, "parsedAttrs", !0);
                }
                return data;
            }
            // Sets multiple values
            // Sets multiple values
            return "object" == typeof key ? this.each(function() {
                jQuery.data(this, key);
            }) : (parts = key.split(".", 2), parts[1] = parts[1] ? "." + parts[1] : "", part = parts[1] + "!", 
            jQuery.access(this, function(value) {
                // Try to fetch any internally stored data first
                return value === undefined ? (data = this.triggerHandler("getData" + part, [ parts[0] ]), 
                data === undefined && elem && (data = jQuery.data(elem, key), data = dataAttr(elem, key, data)), 
                data === undefined && parts[1] ? this.data(parts[0]) : data) : (parts[1] = value, 
                void this.each(function() {
                    var self = jQuery(this);
                    self.triggerHandler("setData" + part, parts), jQuery.data(this, key, value), self.triggerHandler("changeData" + part, parts);
                }));
            }, null, value, arguments.length > 1, null, !1));
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key);
            });
        }
    }), jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            // Speed up dequeue by getting out quickly if this is just a lookup
            return elem ? (type = (type || "fx") + "queue", queue = jQuery._data(elem, type), 
            data && (!queue || jQuery.isArray(data) ? queue = jQuery._data(elem, type, jQuery.makeArray(data)) : queue.push(data)), 
            queue || []) : void 0;
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type);
            };
            // If the fx queue is dequeued, always remove the progress sentinel
            "inprogress" === fn && (fn = queue.shift(), startLength--), fn && (// Add a progress sentinel to prevent the fx queue from being
            // automatically dequeued
            "fx" === type && queue.unshift("inprogress"), // clear up the last queue stop function
            delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire();
        },
        // not intended for public consumption - generates a queueHooks object, or returns the current one
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery.removeData(elem, type + "queue", !0), jQuery.removeData(elem, key, !0);
                })
            });
        }
    }), jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                // ensure a hooks for this queue
                jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type);
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        // Based off of the plugin by Clint Helfers, with permission.
        // http://blindsignals.com/index.php/2009/07/jquery-delay/
        delay: function(time, type) {
            return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", 
            this.queue(type, function(next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function() {
                    clearTimeout(timeout);
                };
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                --count || defer.resolveWith(elements, [ elements ]);
            };
            for ("string" != typeof type && (obj = type, type = undefined), type = type || "fx"; i--; ) tmp = jQuery._data(elements[i], type + "queueHooks"), 
            tmp && tmp.empty && (count++, tmp.empty.add(resolve));
            return resolve(), defer.promise(obj);
        }
    });
    var nodeHook, boolHook, fixSpecified, rclass = /[\t\r\n]/g, rreturn = /\r/g, rtype = /^(?:button|input)$/i, rfocusable = /^(?:button|input|object|select|textarea)$/i, rclickable = /^a(?:rea|)$/i, rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, getSetAttribute = jQuery.support.getSetAttribute;
    jQuery.fn.extend({
        attr: function(name, value) {
            return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        },
        prop: function(name, value) {
            return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            return name = jQuery.propFix[name] || name, this.each(function() {
                // try/catch handles cases where IE balks (such as removing a property on window)
                try {
                    this[name] = undefined, delete this[name];
                } catch (e) {}
            });
        },
        addClass: function(value) {
            var classNames, i, l, elem, setClass, c, cl;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, this.className));
            });
            if (value && "string" == typeof value) for (classNames = value.split(core_rspace), 
            i = 0, l = this.length; l > i; i++) if (elem = this[i], 1 === elem.nodeType) if (elem.className || 1 !== classNames.length) {
                for (setClass = " " + elem.className + " ", c = 0, cl = classNames.length; cl > c; c++) setClass.indexOf(" " + classNames[c] + " ") < 0 && (setClass += classNames[c] + " ");
                elem.className = jQuery.trim(setClass);
            } else elem.className = value;
            return this;
        },
        removeClass: function(value) {
            var removes, className, elem, c, cl, i, l;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, this.className));
            });
            if (value && "string" == typeof value || value === undefined) for (removes = (value || "").split(core_rspace), 
            i = 0, l = this.length; l > i; i++) if (elem = this[i], 1 === elem.nodeType && elem.className) {
                // loop over each item in the removal list
                for (className = (" " + elem.className + " ").replace(rclass, " "), c = 0, cl = removes.length; cl > c; c++) // Remove until there is nothing to remove,
                for (;className.indexOf(" " + removes[c] + " ") >= 0; ) className = className.replace(" " + removes[c] + " ", " ");
                elem.className = value ? jQuery.trim(className) : "";
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value, isBool = "boolean" == typeof stateVal;
            return jQuery.isFunction(value) ? this.each(function(i) {
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
            }) : this.each(function() {
                if ("string" === type) for (// toggle individual class names
                var className, i = 0, self = jQuery(this), state = stateVal, classNames = value.split(core_rspace); className = classNames[i++]; ) // check each className given, space separated list
                state = isBool ? state : !self.hasClass(className), self[state ? "addClass" : "removeClass"](className); else ("undefined" === type || "boolean" === type) && (this.className && // store className if set
                jQuery._data(this, "__className__", this.className), // toggle whole className
                this.className = this.className || value === !1 ? "" : jQuery._data(this, "__className__") || "");
            });
        },
        hasClass: function(selector) {
            for (var className = " " + selector + " ", i = 0, l = this.length; l > i; i++) if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return !0;
            return !1;
        },
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            {
                if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                    var val, self = jQuery(this);
                    1 === this.nodeType && (val = isFunction ? value.call(this, i, self.val()) : value, 
                    // Treat null/undefined as ""; convert numbers to string
                    null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                        return null == value ? "" : value + "";
                    })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], 
                    // If set returns undefined, fall back to normal setting
                    hooks && "set" in hooks && hooks.set(this, val, "value") !== undefined || (this.value = val));
                });
                if (elem) // handle most common string cases
                // handle cases where value is null/undef or number
                return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], 
                hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined ? ret : (ret = elem.value, 
                "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret);
            }
        }
    }), jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    // attributes.value is undefined in Blackberry 4.7 but
                    // uses .value. See #6932
                    var val = elem.attributes.value;
                    return !val || val.specified ? elem.value : elem.text;
                }
            },
            select: {
                get: function(elem) {
                    var value, i, max, option, index = elem.selectedIndex, values = [], options = elem.options, one = "select-one" === elem.type;
                    // Nothing was selected
                    if (0 > index) return null;
                    for (// Loop through all the selected options
                    i = one ? index : 0, max = one ? index + 1 : options.length; max > i; i++) // Don't return options that are disabled or in a disabled optgroup
                    if (option = options[i], option.selected && (jQuery.support.optDisabled ? !option.disabled : null === option.getAttribute("disabled")) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                        // We don't need an array for one selects
                        if (// Get the specific value for the option
                        value = jQuery(option).val(), one) return value;
                        // Multi-Selects return an array
                        values.push(value);
                    }
                    // Fixes Bug #2551 -- select.val() broken in IE after form.reset()
                    // Fixes Bug #2551 -- select.val() broken in IE after form.reset()
                    return one && !values.length && options.length ? jQuery(options[index]).val() : values;
                },
                set: function(elem, value) {
                    var values = jQuery.makeArray(value);
                    return jQuery(elem).find("option").each(function() {
                        this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
                    }), values.length || (elem.selectedIndex = -1), values;
                }
            }
        },
        // Unused in 1.8, left in so attrFn-stabbers won't die; remove in 1.9
        attrFn: {},
        attr: function(elem, name, value, pass) {
            var ret, hooks, notxml, nType = elem.nodeType;
            // don't get/set attributes on text, comment and attribute nodes
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) // Fallback to prop when attributes are not supported
            // All attributes are lowercase
            // Grab necessary hook if one is defined
            return pass && jQuery.isFunction(jQuery.fn[name]) ? jQuery(elem)[name](value) : "undefined" == typeof elem.getAttribute ? jQuery.prop(elem, name, value) : (notxml = 1 !== nType || !jQuery.isXMLDoc(elem), 
            notxml && (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook)), 
            value !== undefined ? null === value ? void jQuery.removeAttr(elem, name) : hooks && "set" in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem.setAttribute(name, value + ""), 
            value) : hooks && "get" in hooks && notxml && null !== (ret = hooks.get(elem, name)) ? ret : (ret = elem.getAttribute(name), 
            null === ret ? undefined : ret));
        },
        removeAttr: function(elem, value) {
            var propName, attrNames, name, isBool, i = 0;
            if (value && 1 === elem.nodeType) for (attrNames = value.split(core_rspace); i < attrNames.length; i++) name = attrNames[i], 
            name && (propName = jQuery.propFix[name] || name, isBool = rboolean.test(name), 
            // See #9699 for explanation of this approach (setting first, then removal)
            // Do not do this for boolean attributes (see #10870)
            isBool || jQuery.attr(elem, name, ""), elem.removeAttribute(getSetAttribute ? name : propName), 
            // Set corresponding property to false for boolean attributes
            isBool && propName in elem && (elem[propName] = !1));
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    // We can't allow the type property to be changed (since it causes problems in IE)
                    if (rtype.test(elem.nodeName) && elem.parentNode) jQuery.error("type property can't be changed"); else if (!jQuery.support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        // Setting the type on a radio button after the value resets the value in IE6-9
                        // Reset value to it's default in case type is set after value
                        // This is for element creation
                        var val = elem.value;
                        return elem.setAttribute("type", value), val && (elem.value = val), value;
                    }
                }
            },
            // Use the value property for back compat
            // Use the nodeHook for button elements in IE6/7 (#1954)
            value: {
                get: function(elem, name) {
                    return nodeHook && jQuery.nodeName(elem, "button") ? nodeHook.get(elem, name) : name in elem ? elem.value : null;
                },
                set: function(elem, value, name) {
                    // Does not return so that setAttribute is also used
                    return nodeHook && jQuery.nodeName(elem, "button") ? nodeHook.set(elem, value, name) : void (elem.value = value);
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            // don't get/set properties on text, comment and attribute nodes
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) // Fix name and attach hooks
            return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), notxml && (name = jQuery.propFix[name] || name, 
            hooks = jQuery.propHooks[name]), value !== undefined ? hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
                    // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                    var attributeNode = elem.getAttributeNode("tabindex");
                    return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined;
                }
            }
        }
    }), // Hook for boolean attributes
    boolHook = {
        get: function(elem, name) {
            // Align boolean attributes with corresponding properties
            // Fall back to attribute presence where some booleans are not supported
            var attrNode, property = jQuery.prop(elem, name);
            return property === !0 || "boolean" != typeof property && (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== !1 ? name.toLowerCase() : undefined;
        },
        set: function(elem, value, name) {
            var propName;
            // Remove boolean attributes when set to false
            // value is true since we know at this point it's type boolean and not false
            // Set boolean attributes to the same name and set the DOM property
            // Only set the IDL specifically if it already exists on the element
            return value === !1 ? jQuery.removeAttr(elem, name) : (propName = jQuery.propFix[name] || name, 
            propName in elem && (elem[propName] = !0), elem.setAttribute(name, name.toLowerCase())), 
            name;
        }
    }, // IE6/7 do not support getting/setting some attributes with get/setAttribute
    getSetAttribute || (fixSpecified = {
        name: !0,
        id: !0,
        coords: !0
    }, // Use this for any attribute in IE6/7
    // This fixes almost every IE6/7 issue
    nodeHook = jQuery.valHooks.button = {
        get: function(elem, name) {
            var ret;
            return ret = elem.getAttributeNode(name), ret && (fixSpecified[name] ? "" !== ret.value : ret.specified) ? ret.value : undefined;
        },
        set: function(elem, value, name) {
            // Set the existing or create a new attribute node
            var ret = elem.getAttributeNode(name);
            return ret || (ret = document.createAttribute(name), elem.setAttributeNode(ret)), 
            ret.value = value + "";
        }
    }, // Set width and height to auto instead of 0 on empty string( Bug #8150 )
    // This is for removals
    jQuery.each([ "width", "height" ], function(i, name) {
        jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
            set: function(elem, value) {
                return "" === value ? (elem.setAttribute(name, "auto"), value) : void 0;
            }
        });
    }), // Set contenteditable to false on removals(#10429)
    // Setting to empty string throws an error as an invalid value
    jQuery.attrHooks.contenteditable = {
        get: nodeHook.get,
        set: function(elem, value, name) {
            "" === value && (value = "false"), nodeHook.set(elem, value, name);
        }
    }), // Some attributes require a special call on IE
    jQuery.support.hrefNormalized || jQuery.each([ "href", "src", "width", "height" ], function(i, name) {
        jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
            get: function(elem) {
                var ret = elem.getAttribute(name, 2);
                return null === ret ? undefined : ret;
            }
        });
    }), jQuery.support.style || (jQuery.attrHooks.style = {
        get: function(elem) {
            // Return undefined in the case of empty string
            // Normalize to lowercase since IE uppercases css property names
            return elem.style.cssText.toLowerCase() || undefined;
        },
        set: function(elem, value) {
            return elem.style.cssText = value + "";
        }
    }), // Safari mis-reports the default selected property of an option
    // Accessing the parent's selectedIndex property fixes it
    jQuery.support.optSelected || (jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
        get: function(elem) {
            var parent = elem.parentNode;
            // Make sure that it also works with optgroups, see #5701
            return parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex), 
            null;
        }
    })), // IE6/7 call enctype encoding
    jQuery.support.enctype || (jQuery.propFix.enctype = "encoding"), // Radios and checkboxes getter/setter
    jQuery.support.checkOn || jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            get: function(elem) {
                // Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
                return null === elem.getAttribute("value") ? "on" : elem.value;
            }
        };
    }), jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
            set: function(elem, value) {
                return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : void 0;
            }
        });
    });
    var rformElems = /^(?:textarea|input|select)$/i, rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/, rhoverHack = /(?:^|\s)hover(\.\S+|)\b/, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, hoverHack = function(events) {
        return jQuery.event.special.hover ? events : events.replace(rhoverHack, "mouseenter$1 mouseleave$1");
    };
    /*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
    jQuery.event = {
        add: function(elem, types, handler, data, selector) {
            var elemData, eventHandle, events, t, tns, type, namespaces, handleObj, handleObjIn, handlers, special;
            // Don't attach events to noData or text/comment nodes (allow plain objects tho)
            if (3 !== elem.nodeType && 8 !== elem.nodeType && types && handler && (elemData = jQuery._data(elem))) {
                for (// Caller can pass in an object of custom data in lieu of the handler
                handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), 
                // Make sure that the handler has a unique ID, used to find/remove it later
                handler.guid || (handler.guid = jQuery.guid++), // Init the element's event structure and main handler, if this is the first
                events = elemData.events, events || (elemData.events = events = {}), eventHandle = elemData.handle, 
                eventHandle || (elemData.handle = eventHandle = function(e) {
                    // Discard the second event of a jQuery.event.trigger() and
                    // when an event is called after a page has unloaded
                    return "undefined" == typeof jQuery || e && jQuery.event.triggered === e.type ? undefined : jQuery.event.dispatch.apply(eventHandle.elem, arguments);
                }, // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
                eventHandle.elem = elem), // Handle multiple events separated by a space
                // jQuery(...).bind("mouseover mouseout", fn);
                types = jQuery.trim(hoverHack(types)).split(" "), t = 0; t < types.length; t++) tns = rtypenamespace.exec(types[t]) || [], 
                type = tns[1], namespaces = (tns[2] || "").split(".").sort(), // If event changes its type, use the special event handlers for the changed type
                special = jQuery.event.special[type] || {}, // If selector defined, determine special event api type, otherwise given type
                type = (selector ? special.delegateType : special.bindType) || type, // Update special based on newly reset type
                special = jQuery.event.special[type] || {}, // handleObj is passed to all event handlers
                handleObj = jQuery.extend({
                    type: type,
                    origType: tns[1],
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn), // Init the event handler queue if we're the first
                handlers = events[type], handlers || (handlers = events[type] = [], handlers.delegateCount = 0, 
                // Only use addEventListener/attachEvent if the special events handler returns false
                special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || (// Bind the global event handler to the element
                elem.addEventListener ? elem.addEventListener(type, eventHandle, !1) : elem.attachEvent && elem.attachEvent("on" + type, eventHandle))), 
                special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), 
                // Add to the element's handler list, delegates in front
                selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), 
                // Keep track of which events have ever been used, for event optimization
                jQuery.event.global[type] = !0;
                // Nullify elem to prevent memory leaks in IE
                elem = null;
            }
        },
        global: {},
        // Detach an event or set of events from an element
        remove: function(elem, types, handler, selector, mappedTypes) {
            var t, tns, type, origType, namespaces, origCount, j, events, special, eventType, handleObj, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (elemData && (events = elemData.events)) {
                for (// Once for each type.namespace in types; type may be omitted
                types = jQuery.trim(hoverHack(types || "")).split(" "), t = 0; t < types.length; t++) // Unbind all events (on this namespace, if provided) for the element
                if (tns = rtypenamespace.exec(types[t]) || [], type = origType = tns[1], namespaces = tns[2], 
                type) {
                    // Remove matching events
                    for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, 
                    eventType = events[type] || [], origCount = eventType.length, namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
                    j = 0; j < eventType.length; j++) handleObj = eventType[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || namespaces && !namespaces.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (eventType.splice(j--, 1), 
                    handleObj.selector && eventType.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                    // Remove generic event handler if we removed something and no more handlers exist
                    // (avoids potential for endless recursion during removal of special event handlers)
                    0 === eventType.length && origCount !== eventType.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), 
                    delete events[type]);
                } else for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                // Remove the expando if it's no longer used
                jQuery.isEmptyObject(events) && (delete elemData.handle, // removeData also checks for emptiness and clears the expando if empty
                // so use it instead of delete
                jQuery.removeData(elem, "events", !0));
            }
        },
        // Events that are safe to short-circuit if no handlers are attached.
        // Native DOM events should not be added, they may have inline handlers.
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(event, data, elem, onlyHandlers) {
            // Don't do events on text and comment nodes
            if (!elem || 3 !== elem.nodeType && 8 !== elem.nodeType) {
                // Event object or event type
                var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType, type = event.type || event, namespaces = [];
                // focus/blur morphs to focusin/out; ensure we're not firing them right now
                if (!rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf("!") >= 0 && (// Exclusive events trigger only for the exact event (no namespaces)
                type = type.slice(0, -1), exclusive = !0), type.indexOf(".") >= 0 && (// Namespaced trigger; create a regexp to match event type in handle()
                namespaces = type.split("."), type = namespaces.shift(), namespaces.sort()), elem && !jQuery.event.customEvent[type] || jQuery.event.global[type])) // Handle a global trigger
                if (// Caller can pass in an Event, Object, or just an event type string
                event = "object" == typeof event ? // jQuery.Event object
                event[jQuery.expando] ? event : // Object literal
                new jQuery.Event(type, event) : // Just the event type (string)
                new jQuery.Event(type), event.type = type, event.isTrigger = !0, event.exclusive = exclusive, 
                event.namespace = namespaces.join("."), event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
                ontype = type.indexOf(":") < 0 ? "on" + type : "", elem) {
                    if (// Clean up the event in case it is being reused
                    event.result = undefined, event.target || (event.target = elem), // Clone any incoming data and prepend the event, creating the handler arg list
                    data = null != data ? jQuery.makeArray(data) : [], data.unshift(event), // Allow special events to draw outside the lines
                    special = jQuery.event.special[type] || {}, !special.trigger || special.trigger.apply(elem, data) !== !1) {
                        if (// Determine event propagation path in advance, per W3C events spec (#9951)
                        // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
                        eventPath = [ [ elem, special.bindType || type ] ], !onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                            for (bubbleType = special.delegateType || type, cur = rfocusMorph.test(bubbleType + type) ? elem : elem.parentNode, 
                            old = elem; cur; cur = cur.parentNode) eventPath.push([ cur, bubbleType ]), old = cur;
                            // Only add window if we got to document (e.g., not plain obj or detached DOM)
                            old === (elem.ownerDocument || document) && eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
                        }
                        // Fire handlers on the event path
                        for (i = 0; i < eventPath.length && !event.isPropagationStopped(); i++) cur = eventPath[i][0], 
                        event.type = eventPath[i][1], handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle"), 
                        handle && handle.apply(cur, data), // Note that this is a bare JS function and not a jQuery handler
                        handle = ontype && cur[ontype], handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === !1 && event.preventDefault();
                        // If nobody prevented the default action, do it now
                        // Call a native DOM method on the target with the same name name as the event.
                        // Can't use an .isFunction() check here because IE6/7 fails that test.
                        // Don't do default actions on window, that's where global variables be (#6170)
                        // IE<9 dies on focus/blur to hidden element (#1486)
                        // Don't re-trigger an onFOO event when we call its FOO() method
                        // Prevent re-triggering of the same event, since we already bubbled it above
                        return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(elem.ownerDocument, data) !== !1 || "click" === type && jQuery.nodeName(elem, "a") || !jQuery.acceptData(elem) || ontype && elem[type] && ("focus" !== type && "blur" !== type || 0 !== event.target.offsetWidth) && !jQuery.isWindow(elem) && (old = elem[ontype], 
                        old && (elem[ontype] = null), jQuery.event.triggered = type, elem[type](), jQuery.event.triggered = undefined, 
                        old && (elem[ontype] = old)), event.result;
                    }
                } else {
                    // TODO: Stop taunting the data cache; remove global events and always attach to document
                    cache = jQuery.cache;
                    for (i in cache) cache[i].events && cache[i].events[type] && jQuery.event.trigger(event, data, cache[i].handle.elem, !0);
                }
            }
        },
        dispatch: function(event) {
            // Make a writable jQuery.Event from the native event object
            event = jQuery.event.fix(event || window.event);
            var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, handlers = (jQuery._data(this, "events") || {})[event.type] || [], delegateCount = handlers.delegateCount, args = core_slice.call(arguments), run_all = !event.exclusive && !event.namespace, special = jQuery.event.special[event.type] || {}, handlerQueue = [];
            // Call the preDispatch hook for the mapped type, and let it bail if desired
            if (// Use the fix-ed jQuery.Event rather than the (read-only) native event
            args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                // Determine handlers that should run if there are delegated events
                // Avoid non-left-click bubbling in Firefox (#3861)
                if (delegateCount && (!event.button || "click" !== event.type)) for (cur = event.target; cur != this; cur = cur.parentNode || this) // Don't process clicks (ONLY) on disabled elements (#6911, #8165, #11382, #11764)
                if (cur.disabled !== !0 || "click" !== event.type) {
                    for (selMatch = {}, matches = [], i = 0; delegateCount > i; i++) handleObj = handlers[i], 
                    sel = handleObj.selector, selMatch[sel] === undefined && (selMatch[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [ cur ]).length), 
                    selMatch[sel] && matches.push(handleObj);
                    matches.length && handlerQueue.push({
                        elem: cur,
                        matches: matches
                    });
                }
                // Run delegates first; they may want to stop propagation beneath us
                for (// Add the remaining (directly-bound) handlers
                handlers.length > delegateCount && handlerQueue.push({
                    elem: this,
                    matches: handlers.slice(delegateCount)
                }), i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++) for (matched = handlerQueue[i], 
                event.currentTarget = matched.elem, j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++) handleObj = matched.matches[j], 
                // Triggered event must either 1) be non-exclusive and have no namespace, or
                // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
                (run_all || !event.namespace && !handleObj.namespace || event.namespace_re && event.namespace_re.test(handleObj.namespace)) && (event.data = handleObj.data, 
                event.handleObj = handleObj, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), 
                ret !== undefined && (event.result = ret, ret === !1 && (event.preventDefault(), 
                event.stopPropagation())));
                // Call the postDispatch hook for the mapped type
                return special.postDispatch && special.postDispatch.call(this, event), event.result;
            }
        },
        // Includes some event props shared by KeyEvent and MouseEvent
        // *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                // Add which for key events
                return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), 
                event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var eventDoc, doc, body, button = original.button, fromElement = original.fromElement;
                // Calculate pageX/Y if missing and clientX/Y available
                // Add relatedTarget, if necessary
                // Add which for click: 1 === left; 2 === middle; 3 === right
                // Note: button is not normalized, so don't use it
                return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, 
                doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), 
                event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), 
                !event.relatedTarget && fromElement && (event.relatedTarget = fromElement === event.target ? original.toElement : fromElement), 
                event.which || button === undefined || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), 
                event;
            }
        },
        fix: function(event) {
            if (event[jQuery.expando]) return event;
            // Create a writable copy of the event object and normalize some properties
            var i, prop, originalEvent = event, fixHook = jQuery.event.fixHooks[event.type] || {}, copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            for (event = jQuery.Event(originalEvent), i = copy.length; i; ) prop = copy[--i], 
            event[prop] = originalEvent[prop];
            // Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
            // Target should not be a text node (#504, Safari)
            // For mouse/key events, metaKey==false if it's undefined (#3368, #11328; IE6/7/8)
            return event.target || (event.target = originalEvent.srcElement || document), 3 === event.target.nodeType && (event.target = event.target.parentNode), 
            event.metaKey = !!event.metaKey, fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        special: {
            load: {
                // Prevent triggered image.load events from bubbling to window.load
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(data, namespaces, eventHandle) {
                    // We only want to do this special case on windows
                    jQuery.isWindow(this) && (this.onbeforeunload = eventHandle);
                },
                teardown: function(namespaces, eventHandle) {
                    this.onbeforeunload === eventHandle && (this.onbeforeunload = null);
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            // Piggyback on a donor event to simulate a different one.
            // Fake originalEvent to avoid donor's stopPropagation, but if the
            // simulated event prevents default then we do the same on the donor.
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: !0,
                originalEvent: {}
            });
            bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), 
            e.isDefaultPrevented() && event.preventDefault();
        }
    }, // Some plugins are using, but it's undocumented/deprecated and will be removed.
    // The 1.7 special event interface should provide all the hooks needed now.
    jQuery.event.handle = jQuery.event.dispatch, jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle, !1);
    } : function(elem, type, handle) {
        var name = "on" + type;
        elem.detachEvent && (// #8545, #7054, preventing memory leaks for custom events in IE6-8 –
        // detachEvent needed property on element, by name of that event, to properly expose it to GC
        "undefined" == typeof elem[name] && (elem[name] = null), elem.detachEvent(name, handle));
    }, jQuery.Event = function(src, props) {
        // Allow instantiation without the 'new' keyword
        // Allow instantiation without the 'new' keyword
        // Event object
        // Events bubbling up the document may have been marked as prevented
        // by a handler lower down the tree; reflect the correct value.
        // Put explicitly provided properties onto the event object
        // Create a timestamp if incoming event doesn't have one
        // Mark it as fixed
        return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, 
        this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || src.returnValue === !1 || src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse) : this.type = src, 
        props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), 
        void (this[jQuery.expando] = !0)) : new jQuery.Event(src, props);
    }, // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
    // http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = returnTrue;
            var e = this.originalEvent;
            e && (// if preventDefault exists run it on the original event
            e.preventDefault ? e.preventDefault() : e.returnValue = !1);
        },
        stopPropagation: function() {
            this.isPropagationStopped = returnTrue;
            var e = this.originalEvent;
            e && (// if stopPropagation exists run it on the original event
            e.stopPropagation && e.stopPropagation(), // otherwise set the cancelBubble property of the original event to true (IE)
            e.cancelBubble = !0);
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue, this.stopPropagation();
        },
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse
    }, // Create mouseenter/leave events using mouseover/out and event-time checks
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                handleObj.selector;
                // For mousenter/leave call the handler if related is outside the target.
                // NB: No relatedTarget if the mouse left/entered the browser window
                return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, 
                ret = handleObj.handler.apply(this, arguments), event.type = fix), ret;
            }
        };
    }), // IE submit delegation
    jQuery.support.submitBubbles || (jQuery.event.special.submit = {
        setup: function() {
            // Only need this for delegated form submit events
            // Only need this for delegated form submit events
            // Lazy-add a submit handler when a descendant form may potentially be submitted
            return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                // Node name check avoids a VML-related crash in IE (#9807)
                var elem = e.target, form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                form && !jQuery._data(form, "_submit_attached") && (jQuery.event.add(form, "submit._submit", function(event) {
                    event._submit_bubble = !0;
                }), jQuery._data(form, "_submit_attached", !0));
            });
        },
        postDispatch: function(event) {
            // If form was submitted by the user, bubble the event up the tree
            event._submit_bubble && (delete event._submit_bubble, this.parentNode && !event.isTrigger && jQuery.event.simulate("submit", this.parentNode, event, !0));
        },
        teardown: function() {
            // Only need this for delegated form submit events
            // Only need this for delegated form submit events
            // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
            return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.remove(this, "._submit");
        }
    }), // IE change delegation and checkbox/radio fix
    jQuery.support.changeBubbles || (jQuery.event.special.change = {
        setup: function() {
            // IE doesn't fire change on a check/radio until blur; trigger it on click
            // after a propertychange. Eat the blur-change in special.change.handle.
            // This still fires onchange a second time for check/radio after blur.
            // Delegated event; lazy-add a change handler on descendant inputs
            return rformElems.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (jQuery.event.add(this, "propertychange._change", function(event) {
                "checked" === event.originalEvent.propertyName && (this._just_changed = !0);
            }), jQuery.event.add(this, "click._change", function(event) {
                this._just_changed && !event.isTrigger && (this._just_changed = !1), // Allow triggered, simulated change events (#11500)
                jQuery.event.simulate("change", this, event, !0);
            })), !1) : void jQuery.event.add(this, "beforeactivate._change", function(e) {
                var elem = e.target;
                rformElems.test(elem.nodeName) && !jQuery._data(elem, "_change_attached") && (jQuery.event.add(elem, "change._change", function(event) {
                    !this.parentNode || event.isSimulated || event.isTrigger || jQuery.event.simulate("change", this.parentNode, event, !0);
                }), jQuery._data(elem, "_change_attached", !0));
            });
        },
        handle: function(event) {
            var elem = event.target;
            // Swallow native change events from checkbox/radio, we already triggered them above
            // Swallow native change events from checkbox/radio, we already triggered them above
            return this !== elem || event.isSimulated || event.isTrigger || "radio" !== elem.type && "checkbox" !== elem.type ? event.handleObj.handler.apply(this, arguments) : void 0;
        },
        teardown: function() {
            return jQuery.event.remove(this, "._change"), !rformElems.test(this.nodeName);
        }
    }), // Create "bubbling" focus and blur events
    jQuery.support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        // Attach a single capturing handler while someone wants focusin/focusout
        var attaches = 0, handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0);
        };
        jQuery.event.special[fix] = {
            setup: function() {
                0 === attaches++ && document.addEventListener(orig, handler, !0);
            },
            teardown: function() {
                0 === --attaches && document.removeEventListener(orig, handler, !0);
            }
        };
    }), jQuery.fn.extend({
        on: function(types, selector, data, fn, /*INTERNAL*/ one) {
            var origFn, type;
            // Types can be a map of types/handlers
            if ("object" == typeof types) {
                // ( types-Object, selector, data )
                "string" != typeof selector && (// && selector != null
                // ( types-Object, data )
                data = data || selector, selector = undefined);
                for (type in types) this.on(type, selector, data, types[type], one);
                return this;
            }
            if (null == data && null == fn ? (// ( types, fn )
            fn = selector, data = selector = undefined) : null == fn && ("string" == typeof selector ? (// ( types, selector, fn )
            fn = data, data = undefined) : (// ( types, data, fn )
            fn = data, data = selector, selector = undefined)), fn === !1) fn = returnFalse; else if (!fn) return this;
            // Use same guid so caller can remove using origFn
            return 1 === one && (origFn = fn, fn = function(event) {
                // Can use an empty set, since event contains the info
                return jQuery().off(event), origFn.apply(this, arguments);
            }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) // ( event )  dispatched jQuery.Event
            return handleObj = types.handleObj, jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), 
            this;
            if ("object" == typeof types) {
                // ( types-object [, selector] )
                for (type in types) this.off(type, selector, types[type]);
                return this;
            }
            // ( types [, fn] )
            return (selector === !1 || "function" == typeof selector) && (fn = selector, selector = undefined), 
            fn === !1 && (fn = returnFalse), this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        live: function(types, data, fn) {
            return jQuery(this.context).on(types, this.selector, data, fn), this;
        },
        die: function(types, fn) {
            return jQuery(this.context).off(types, this.selector || "**", fn), this;
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            // ( namespace ) or ( selector, types [, fn] )
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            return this[0] ? jQuery.event.trigger(type, data, this[0], !0) : void 0;
        },
        toggle: function(fn) {
            // Save reference to arguments for access in closure
            var args = arguments, guid = fn.guid || jQuery.guid++, i = 0, toggler = function(event) {
                // Figure out which function to execute
                var lastToggle = (jQuery._data(this, "lastToggle" + fn.guid) || 0) % i;
                // and execute the function
                // Make sure that clicks stop
                return jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1), event.preventDefault(), 
                args[lastToggle].apply(this, arguments) || !1;
            };
            for (// link all the functions, so any of them can unbind this click handler
            toggler.guid = guid; i < args.length; ) args[i++].guid = guid;
            return this.click(toggler);
        },
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
    }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
        // Handle event binding
        jQuery.fn[name] = function(data, fn) {
            return null == fn && (fn = data, data = null), arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        }, rkeyEvent.test(name) && (jQuery.event.fixHooks[name] = jQuery.event.keyHooks), 
        rmouseEvent.test(name) && (jQuery.event.fixHooks[name] = jQuery.event.mouseHooks);
    }), /*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
    function(window, undefined) {
        function Sizzle(selector, context, results, seed) {
            results = results || [], context = context || document;
            var match, elem, xml, m, nodeType = context.nodeType;
            if (!selector || "string" != typeof selector) return results;
            if (1 !== nodeType && 9 !== nodeType) return [];
            if (xml = isXML(context), !xml && !seed && (match = rquickExpr.exec(selector))) // Speed-up: Sizzle("#ID")
            if (m = match[1]) {
                if (9 === nodeType) {
                    // Check parentNode to catch when Blackberry 4.6 returns
                    // nodes that are no longer in the document #6963
                    if (elem = context.getElementById(m), !elem || !elem.parentNode) return results;
                    // Handle the case where IE, Opera, and Webkit return items
                    // by name instead of ID
                    if (elem.id === m) return results.push(elem), results;
                } else // Context is not a document
                if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), 
                results;
            } else {
                if (match[2]) return push.apply(results, slice.call(context.getElementsByTagName(selector), 0)), 
                results;
                if ((m = match[3]) && assertUsableClassName && context.getElementsByClassName) return push.apply(results, slice.call(context.getElementsByClassName(m), 0)), 
                results;
            }
            // All others
            return select(selector.replace(rtrim, "$1"), context, results, seed, xml);
        }
        // Returns a function to use in pseudos for input types
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return "input" === name && elem.type === type;
            };
        }
        // Returns a function to use in pseudos for buttons
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type;
            };
        }
        // Returns a function to use in pseudos for positionals
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                return argument = +argument, markFunction(function(seed, matches) {
                    // Match elements found at the specified indexes
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--; ) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]));
                });
            });
        }
        function siblingCheck(a, b, ret) {
            if (a === b) return ret;
            for (var cur = a.nextSibling; cur; ) {
                if (cur === b) return -1;
                cur = cur.nextSibling;
            }
            return 1;
        }
        function tokenize(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[expando][selector];
            if (cached) return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar; ) {
                // Comma and first run
                (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length)), 
                groups.push(tokens = [])), matched = !1, // Combinators
                (match = rcombinators.exec(soFar)) && (tokens.push(matched = new Token(match.shift())), 
                soFar = soFar.slice(matched.length), // Cast descendant combinators to space
                matched.type = match[0].replace(rtrim, " "));
                // Filters
                for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && // The last two arguments here are (context, xml) for backCompat
                !(match = preFilters[type](match, document, !0)) || (tokens.push(matched = new Token(match.shift())), 
                soFar = soFar.slice(matched.length), matched.type = type, matched.matches = match);
                if (!matched) break;
            }
            // Return the length of the invalid excess
            // if we're just parsing
            // Otherwise, throw an error or return tokens
            // Cache the tokens
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && "parentNode" === combinator.dir, doneName = done++;
            // Check against closest ancestor/preceding element
            // Check against all ancestor/preceding elements
            return combinator.first ? function(elem, context, xml) {
                for (;elem = elem[dir]; ) if (checkNonElements || 1 === elem.nodeType) return matcher(elem, context, xml);
            } : function(elem, context, xml) {
                // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
                if (xml) {
                    for (;elem = elem[dir]; ) if ((checkNonElements || 1 === elem.nodeType) && matcher(elem, context, xml)) return elem;
                } else for (var cache, dirkey = dirruns + " " + doneName + " ", cachedkey = dirkey + cachedruns; elem = elem[dir]; ) if (checkNonElements || 1 === elem.nodeType) {
                    if ((cache = elem[expando]) === cachedkey) return elem.sizset;
                    if ("string" == typeof cache && 0 === cache.indexOf(dirkey)) {
                        if (elem.sizset) return elem;
                    } else {
                        if (elem[expando] = cachedkey, matcher(elem, context, xml)) return elem.sizset = !0, 
                        elem;
                        elem.sizset = !1;
                    }
                }
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                for (var i = matchers.length; i--; ) if (!matchers[i](elem, context, xml)) return !1;
                return !0;
            } : matchers[0];
        }
        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++) (elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), 
            mapped && map.push(i));
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), 
            postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), 
            markFunction(function(seed, results, context, xml) {
                // Positional selectors apply to seed elements, so it is invalid to follow them with relative ones
                if (!seed || !postFinder) {
                    var i, elem, postFilterIn, preMap = [], postMap = [], preexisting = results.length, // Get initial elements from seed or context
                    elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, [], seed), // Prefilter to get matcher input, preserving a map for seed-results synchronization
                    matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                    postFinder || (seed ? preFilter : preexisting || postFilter) ? // ...intermediate processing is necessary
                    [] : // ...otherwise use results directly
                    results : matcherIn;
                    // Apply postFilter
                    if (// Find primary matches
                    matcher && matcher(matcherIn, matcherOut, context, xml), postFilter) for (postFilterIn = condense(matcherOut, postMap), 
                    postFilter(postFilterIn, [], context, xml), // Un-match failing elements by moving them back to matcherIn
                    i = postFilterIn.length; i--; ) (elem = postFilterIn[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                    // Keep seed and results synchronized
                    if (seed) for (// Ignore postFinder because it can't coexist with seed
                    i = preFilter && matcherOut.length; i--; ) (elem = matcherOut[i]) && (seed[preMap[i]] = !(results[preMap[i]] = elem)); else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), 
                    postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut);
                }
            });
        }
        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, // The foundational matcher ensures that elements are reachable from top-level context(s)
            matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                return indexOf.call(checkContext, elem) > -1;
            }, implicitRelative, !0), matchers = [ function(elem, context, xml) {
                return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            } ]; len > i; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [ addCombinator(elementMatcher(matchers), matcher) ]; else {
                // Return special upon seeing a positional matcher
                if (// The concatenated values are (context, xml) for backCompat
                matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                    for (// Find the next relative operator (if any) for proper handling
                    j = ++i; len > j && !Expr.relative[tokens[j].type]; j++) ;
                    return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && tokens.slice(0, i - 1).join("").replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && tokens.join(""));
                }
                matchers.push(matcher);
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, expandContext) {
                var elem, j, matcher, setMatched = [], matchedCount = 0, i = "0", unmatched = seed && [], outermost = null != expandContext, contextBackup = outermostContext, // We must always have either seed elements or context
                elems = seed || byElement && Expr.find.TAG("*", expandContext && context.parentNode || context), // Nested matchers should use non-integer dirruns
                dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.E;
                // Add elements passing elementMatchers directly to results
                for (outermost && (outermostContext = context !== document && context, cachedruns = superMatcher.el); null != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        for (j = 0; matcher = elementMatchers[j]; j++) if (matcher(elem, context, xml)) {
                            results.push(elem);
                            break;
                        }
                        outermost && (dirruns = dirrunsUnique, cachedruns = ++superMatcher.el);
                    }
                    // Track unmatched elements for set filters
                    bySet && (// They will have gone through all possible matchers
                    (elem = !matcher && elem) && matchedCount--, // Lengthen the array for every element, matched or not
                    seed && unmatched.push(elem));
                }
                if (// Apply set filters to unmatched elements
                matchedCount += i, bySet && i !== matchedCount) {
                    for (j = 0; matcher = setMatchers[j]; j++) matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        // Reintegrate element matches to eliminate the need for sorting
                        if (matchedCount > 0) for (;i--; ) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        // Discard index placeholder values to get only actual matches
                        setMatched = condense(setMatched);
                    }
                    // Add matches to results
                    push.apply(results, setMatched), // Seedless set matches succeeding multiple successful matchers stipulate sorting
                    outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results);
                }
                // Override manipulation of globals by nested matchers
                return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), 
                unmatched;
            };
            return superMatcher.el = 0, bySet ? markFunction(superMatcher) : superMatcher;
        }
        function multipleContexts(selector, contexts, results, seed) {
            for (var i = 0, len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results, seed);
            return results;
        }
        function select(selector, context, results, seed, xml) {
            var i, tokens, token, type, find, match = tokenize(selector);
            match.length;
            if (!seed && 1 === match.length) {
                if (// Take a shortcut and set the context if the root selector is an ID
                tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && 9 === context.nodeType && !xml && Expr.relative[tokens[1].type]) {
                    if (context = Expr.find.ID(token.matches[0].replace(rbackslash, ""), context, xml)[0], 
                    !context) return results;
                    selector = selector.slice(tokens.shift().length);
                }
                // Fetch a seed set for right-to-left matching
                for (i = matchExpr.POS.test(selector) ? -1 : tokens.length - 1; i >= 0 && (token = tokens[i], 
                !Expr.relative[type = token.type]); i--) if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(rbackslash, ""), rsibling.test(tokens[0].type) && context.parentNode || context, xml))) {
                    if (// If seed is empty or no tokens remain, we can return early
                    tokens.splice(i, 1), selector = seed.length && tokens.join(""), !selector) return push.apply(results, slice.call(seed, 0)), 
                    results;
                    break;
                }
            }
            // Compile and execute a filtering function
            // Provide `match` to avoid retokenization if we modified the selector above
            return compile(selector, match)(seed, context, xml, results, rsibling.test(selector)), 
            results;
        }
        // Back-compat
        function setFilters() {}
        var cachedruns, assertGetIdNotName, Expr, getText, isXML, contains, compile, sortOrder, hasDuplicate, outermostContext, baseHasDuplicate = !0, strundefined = "undefined", expando = ("sizcache" + Math.random()).replace(".", ""), Token = String, document = window.document, docElem = document.documentElement, dirruns = 0, done = 0, pop = [].pop, push = [].push, slice = [].slice, // Use a stripped-down indexOf if a native one is unavailable
        indexOf = [].indexOf || function(elem) {
            for (var i = 0, len = this.length; len > i; i++) if (this[i] === elem) return i;
            return -1;
        }, // Augment a function for special use by Sizzle
        markFunction = function(fn, value) {
            return fn[expando] = null == value || value, fn;
        }, createCache = function() {
            var cache = {}, keys = [];
            return markFunction(function(key, value) {
                // Only keep the most recent entries
                return keys.push(key) > Expr.cacheLength && delete cache[keys.shift()], cache[key] = value;
            }, cache);
        }, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), // Regex
        // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
        whitespace = "[\\x20\\t\\r\\n\\f]", // http://www.w3.org/TR/css3-syntax/#characters
        characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", // Loosely modeled on CSS identifier characters
        // An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)
        // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
        identifier = characterEncoding.replace("w", "w#"), // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
        operators = "([*^$|!~]?=)", attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]", // Prefer arguments not in parens/brackets,
        //   then attribute selectors and non-pseudos (denoted by :),
        //   then anything else
        // These preferences are here to reduce the number of selectors
        //   needing tokenize in the PSEUDO preFilter
        pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)", // For matchExpr.POS and matchExpr.needsContext
        pos = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
        rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"), rpseudo = new RegExp(pseudos), // Easily-parseable/retrievable ID or TAG or CLASS selectors
        rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, rsibling = /[\x20\t\r\n\f]*[+~]/, rheader = /h\d/i, rinputs = /input|select|textarea|button/i, rbackslash = /\\(?!\\)/g, matchExpr = {
            ID: new RegExp("^#(" + characterEncoding + ")"),
            CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
            NAME: new RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
            TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            POS: new RegExp(pos, "i"),
            CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            // For use in libraries implementing .is()
            needsContext: new RegExp("^" + whitespace + "*[>+~]|" + pos, "i")
        }, // Support
        // Used for testing something on an element
        assert = function(fn) {
            var div = document.createElement("div");
            try {
                return fn(div);
            } catch (e) {
                return !1;
            } finally {
                // release memory in IE
                div = null;
            }
        }, // Check if getElementsByTagName("*") returns only elements
        assertTagNameNoComments = assert(function(div) {
            return div.appendChild(document.createComment("")), !div.getElementsByTagName("*").length;
        }), // Check if getAttribute returns normalized href attributes
        assertHrefNotNormalized = assert(function(div) {
            return div.innerHTML = "<a href='#'></a>", div.firstChild && typeof div.firstChild.getAttribute !== strundefined && "#" === div.firstChild.getAttribute("href");
        }), // Check if attributes should be retrieved by attribute nodes
        assertAttributes = assert(function(div) {
            div.innerHTML = "<select></select>";
            var type = typeof div.lastChild.getAttribute("multiple");
            // IE8 returns a string for some attributes even when not present
            return "boolean" !== type && "string" !== type;
        }), // Check if getElementsByClassName can be trusted
        assertUsableClassName = assert(function(div) {
            // Opera can't find a second classname (in 9.6)
            // Safari 3.2 caches class attributes and doesn't catch changes
            return div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", 
            div.getElementsByClassName && div.getElementsByClassName("e").length ? (div.lastChild.className = "e", 
            2 === div.getElementsByClassName("e").length) : !1;
        }), // Check if getElementById returns elements by name
        // Check if getElementsByName privileges form controls or returns elements by ID
        assertUsableName = assert(function(div) {
            // Inject content
            div.id = expando + 0, div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>", 
            docElem.insertBefore(div, docElem.firstChild);
            // Test
            var pass = document.getElementsByName && // buggy browsers will return fewer than the correct 2
            document.getElementsByName(expando).length === 2 + // buggy browsers will return more than the correct 0
            document.getElementsByName(expando + 0).length;
            // Cleanup
            return assertGetIdNotName = !document.getElementById(expando), docElem.removeChild(div), 
            pass;
        });
        // If slice is not available, provide a backup
        try {
            slice.call(docElem.childNodes, 0)[0].nodeType;
        } catch (e) {
            slice = function(i) {
                for (var elem, results = []; elem = this[i]; i++) results.push(elem);
                return results;
            };
        }
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        }, Sizzle.matchesSelector = function(elem, expr) {
            return Sizzle(expr, null, null, [ elem ]).length > 0;
        }, /**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
        getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (see #11153)
                    if ("string" == typeof elem.textContent) return elem.textContent;
                    // Traverse its children
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem);
                } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue;
            } else // If no nodeType, this is expected to be an array
            for (;node = elem[i]; i++) // Do not traverse comment nodes
            ret += getText(node);
            return ret;
        }, isXML = Sizzle.isXML = function(elem) {
            // documentElement is verified for cases where it doesn't yet exist
            // (such as loading iframes in IE - #4833)
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? "HTML" !== documentElement.nodeName : !1;
        }, // Element contains another
        contains = Sizzle.contains = docElem.contains ? function(a, b) {
            var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
            return a === bup || !!(bup && 1 === bup.nodeType && adown.contains && adown.contains(bup));
        } : docElem.compareDocumentPosition ? function(a, b) {
            return b && !!(16 & a.compareDocumentPosition(b));
        } : function(a, b) {
            for (;b = b.parentNode; ) if (b === a) return !0;
            return !1;
        }, Sizzle.attr = function(elem, name) {
            var val, xml = isXML(elem);
            return xml || (name = name.toLowerCase()), (val = Expr.attrHandle[name]) ? val(elem) : xml || assertAttributes ? elem.getAttribute(name) : (val = elem.getAttributeNode(name), 
            val ? "boolean" == typeof elem[name] ? elem[name] ? name : null : val.specified ? val.value : null : null);
        }, Expr = Sizzle.selectors = {
            // Can be adjusted by the user
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            // IE6/7 return a modified href
            attrHandle: assertHrefNotNormalized ? {} : {
                href: function(elem) {
                    return elem.getAttribute("href", 2);
                },
                type: function(elem) {
                    return elem.getAttribute("type");
                }
            },
            find: {
                ID: assertGetIdNotName ? function(id, context, xml) {
                    if (typeof context.getElementById !== strundefined && !xml) {
                        var m = context.getElementById(id);
                        // Check parentNode to catch when Blackberry 4.6 returns
                        // nodes that are no longer in the document #6963
                        return m && m.parentNode ? [ m ] : [];
                    }
                } : function(id, context, xml) {
                    if (typeof context.getElementById !== strundefined && !xml) {
                        var m = context.getElementById(id);
                        return m ? m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ? [ m ] : undefined : [];
                    }
                },
                TAG: assertTagNameNoComments ? function(tag, context) {
                    return typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag) : void 0;
                } : function(tag, context) {
                    var results = context.getElementsByTagName(tag);
                    // Filter out possible comments
                    if ("*" === tag) {
                        for (var elem, tmp = [], i = 0; elem = results[i]; i++) 1 === elem.nodeType && tmp.push(elem);
                        return tmp;
                    }
                    return results;
                },
                NAME: assertUsableName && function(tag, context) {
                    return typeof context.getElementsByName !== strundefined ? context.getElementsByName(name) : void 0;
                },
                CLASS: assertUsableClassName && function(className, context, xml) {
                    return typeof context.getElementsByClassName === strundefined || xml ? void 0 : context.getElementsByClassName(className);
                }
            },
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    // Move the given value to match[3] whether quoted or unquoted
                    return match[1] = match[1].replace(rbackslash, ""), match[3] = (match[4] || match[5] || "").replace(rbackslash, ""), 
                    "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4);
                },
                CHILD: function(match) {
                    /* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				3 xn-component of xn+y argument ([+-]?\d*n|)
				4 sign of xn-component
				5 x of xn-component
				6 sign of y-component
				7 y of y-component
			*/
                    // nth-child requires argument
                    // numeric x and y parameters for Expr.filter.CHILD
                    // remember that false/true cast respectively to 0/1
                    return match[1] = match[1].toLowerCase(), "nth" === match[1] ? (match[2] || Sizzle.error(match[0]), 
                    match[3] = +(match[3] ? match[4] + (match[5] || 1) : 2 * ("even" === match[2] || "odd" === match[2])), 
                    match[4] = +(match[6] + match[7] || "odd" === match[2])) : match[2] && Sizzle.error(match[0]), 
                    match;
                },
                PSEUDO: function(match) {
                    var unquoted, excess;
                    // Only check arguments that contain a pseudo
                    // Get excess from tokenize (recursively)
                    // advance to the next closing parenthesis
                    // excess is a negative index
                    return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[3] : (unquoted = match[4]) && (rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (unquoted = unquoted.slice(0, excess), 
                    match[0] = match[0].slice(0, excess)), match[2] = unquoted), match.slice(0, 3));
                }
            },
            filter: {
                ID: assertGetIdNotName ? function(id) {
                    return id = id.replace(rbackslash, ""), function(elem) {
                        return elem.getAttribute("id") === id;
                    };
                } : function(id) {
                    return id = id.replace(rbackslash, ""), function(elem) {
                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                        return node && node.value === id;
                    };
                },
                TAG: function(nodeName) {
                    return "*" === nodeName ? function() {
                        return !0;
                    } : (nodeName = nodeName.replace(rbackslash, "").toLowerCase(), function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    });
                },
                CLASS: function(className) {
                    var pattern = classCache[expando][className];
                    return pattern || (pattern = classCache(className, new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)"))), 
                    function(elem) {
                        return pattern.test(elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "");
                    };
                },
                ATTR: function(name, operator, check) {
                    return function(elem, context) {
                        var result = Sizzle.attr(elem, name);
                        return null == result ? "!=" === operator : operator ? (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.substr(result.length - check.length) === check : "~=" === operator ? (" " + result + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.substr(0, check.length + 1) === check + "-" : !1) : !0;
                    };
                },
                CHILD: function(type, argument, first, last) {
                    return "nth" === type ? function(elem) {
                        var node, diff, parent = elem.parentNode;
                        if (1 === first && 0 === last) return !0;
                        if (parent) for (diff = 0, node = parent.firstChild; node && (1 !== node.nodeType || (diff++, 
                        elem !== node)); node = node.nextSibling) ;
                        // Incorporate the offset (or cast to NaN), then check against cycle size
                        return diff -= last, diff === first || diff % first === 0 && diff / first >= 0;
                    } : function(elem) {
                        var node = elem;
                        switch (type) {
                          case "only":
                          case "first":
                            for (;node = node.previousSibling; ) if (1 === node.nodeType) return !1;
                            if ("first" === type) return !0;
                            node = elem;

                          /* falls through */
                            case "last":
                            for (;node = node.nextSibling; ) if (1 === node.nodeType) return !1;
                            return !0;
                        }
                    };
                },
                PSEUDO: function(pseudo, argument) {
                    // pseudo-class names are case-insensitive
                    // http://www.w3.org/TR/selectors/#pseudo-classes
                    // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                    // Remember that setFilters inherits from pseudos
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    // The user may use createPseudo to indicate that
                    // arguments are needed to create the filter function
                    // just as Sizzle does
                    // The user may use createPseudo to indicate that
                    // arguments are needed to create the filter function
                    // just as Sizzle does
                    // But maintain support for old signatures
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [ pseudo, pseudo, "", argument ], 
                    Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--; ) idx = indexOf.call(seed, matched[i]), 
                        seed[idx] = !(matches[idx] = matched[i]);
                    }) : function(elem) {
                        return fn(elem, 0, args);
                    }) : fn;
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    // Trim the selector passed to compile
                    // to avoid treating leading and trailing
                    // spaces as combinators
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        // Match elements unmatched by `matcher`
                        for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--; ) (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem));
                    }) : function(elem, context, xml) {
                        return input[0] = elem, matcher(input, null, xml, results), !results.pop();
                    };
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function(text) {
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                enabled: function(elem) {
                    return elem.disabled === !1;
                },
                disabled: function(elem) {
                    return elem.disabled === !0;
                },
                checked: function(elem) {
                    // In CSS3, :checked should return both checked and selected elements
                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected;
                },
                selected: function(elem) {
                    // Accessing this property makes selected-by-default
                    // options in Safari work properly
                    return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0;
                },
                parent: function(elem) {
                    return !Expr.pseudos.empty(elem);
                },
                empty: function(elem) {
                    // http://www.w3.org/TR/selectors/#empty-pseudo
                    // :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
                    //   not comment, processing instructions, or others
                    // Thanks to Diego Perini for the nodeName shortcut
                    //   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
                    var nodeType;
                    for (elem = elem.firstChild; elem; ) {
                        if (elem.nodeName > "@" || 3 === (nodeType = elem.nodeType) || 4 === nodeType) return !1;
                        elem = elem.nextSibling;
                    }
                    return !0;
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },
                text: function(elem) {
                    var type, attr;
                    // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
                    // use getAttribute instead to test this case
                    return "input" === elem.nodeName.toLowerCase() && "text" === (type = elem.type) && (null == (attr = elem.getAttribute("type")) || attr.toLowerCase() === type);
                },
                // Input types
                radio: createInputPseudo("radio"),
                checkbox: createInputPseudo("checkbox"),
                file: createInputPseudo("file"),
                password: createInputPseudo("password"),
                image: createInputPseudo("image"),
                submit: createButtonPseudo("submit"),
                reset: createButtonPseudo("reset"),
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name;
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                focus: function(elem) {
                    var doc = elem.ownerDocument;
                    return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !(!elem.type && !elem.href);
                },
                active: function(elem) {
                    return elem === elem.ownerDocument.activeElement;
                },
                // Positional types
                first: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ 0 ];
                }),
                last: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ length - 1 ];
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ 0 > argument ? argument + length : argument ];
                }),
                even: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 1; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; --i >= 0; ) matchIndexes.push(i);
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; ++i < length; ) matchIndexes.push(i);
                    return matchIndexes;
                })
            }
        }, sortOrder = docElem.compareDocumentPosition ? function(a, b) {
            return a === b ? (hasDuplicate = !0, 0) : (a.compareDocumentPosition && b.compareDocumentPosition ? 4 & a.compareDocumentPosition(b) : a.compareDocumentPosition) ? -1 : 1;
        } : function(a, b) {
            // The nodes are identical, we can exit early
            if (a === b) return hasDuplicate = !0, 0;
            if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
            var al, bl, ap = [], bp = [], aup = a.parentNode, bup = b.parentNode, cur = aup;
            // If the nodes are siblings (or identical) we can do a quick check
            if (aup === bup) return siblingCheck(a, b);
            if (!aup) return -1;
            if (!bup) return 1;
            // Otherwise they're somewhere else in the tree so we need
            // to build up a full list of the parentNodes for comparison
            for (;cur; ) ap.unshift(cur), cur = cur.parentNode;
            for (cur = bup; cur; ) bp.unshift(cur), cur = cur.parentNode;
            al = ap.length, bl = bp.length;
            // Start walking down the tree looking for a discrepancy
            for (var i = 0; al > i && bl > i; i++) if (ap[i] !== bp[i]) return siblingCheck(ap[i], bp[i]);
            // We ended someplace up the tree so do a sibling check
            return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1);
        }, // Always assume the presence of duplicates if sort doesn't
        // pass them to our comparison function (as in Google Chrome).
        [ 0, 0 ].sort(sortOrder), baseHasDuplicate = !hasDuplicate, // Document sorting and removing duplicates
        Sizzle.uniqueSort = function(results) {
            var elem, i = 1;
            if (hasDuplicate = baseHasDuplicate, results.sort(sortOrder), hasDuplicate) for (;elem = results[i]; i++) elem === results[i - 1] && results.splice(i--, 1);
            return results;
        }, Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        }, compile = Sizzle.compile = function(selector, group) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[expando][selector];
            if (!cached) {
                for (// Generate a function of recursive functions that can be used to check each element
                group || (group = tokenize(selector)), i = group.length; i--; ) cached = matcherFromTokens(group[i]), 
                cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                // Cache the compiled function
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
            }
            return cached;
        }, document.querySelectorAll && !function() {
            var disconnectedMatch, oldSelect = select, rescape = /'|\\/g, rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, // qSa(:focus) reports false when true (Chrome 21),
            // A support test would require too much code (would include document ready)
            rbuggyQSA = [ ":focus" ], // matchesSelector(:focus) reports false when true (Chrome 21),
            // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
            // A support test would require too much code (would include document ready)
            // just skip matchesSelector for :active
            rbuggyMatches = [ ":active", ":focus" ], matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector;
            // Build QSA regex
            // Regex strategy adopted from Diego Perini
            assert(function(div) {
                // Select is set to empty string on purpose
                // This is to test IE's treatment of not explictly
                // setting a boolean content attribute,
                // since its presence should be enough
                // http://bugs.jquery.com/ticket/12359
                div.innerHTML = "<select><option selected=''></option></select>", // IE8 - Some boolean attributes are not treated correctly
                div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), 
                // Webkit/Opera - :checked should return selected option elements
                // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                // IE8 throws error here (do not put tests after this one)
                div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked");
            }), assert(function(div) {
                // Opera 10-12/IE9 - ^= $= *= and empty values
                // Should not select anything
                div.innerHTML = "<p test=''></p>", div.querySelectorAll("[test^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')"), 
                // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                // IE8 throws error here (do not put tests after this one)
                div.innerHTML = "<input type='hidden'/>", div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled");
            }), // rbuggyQSA always contains :focus, so no need for a length check
            rbuggyQSA = /* rbuggyQSA.length && */ new RegExp(rbuggyQSA.join("|")), select = function(selector, context, results, seed, xml) {
                // Only use querySelectorAll when not filtering,
                // when this is not xml,
                // and when no QSA bugs apply
                if (!(seed || xml || rbuggyQSA && rbuggyQSA.test(selector))) {
                    var groups, i, old = !0, nid = expando, newContext = context, newSelector = 9 === context.nodeType && selector;
                    // qSA works strangely on Element-rooted queries
                    // We can work around this by specifying an extra ID on the root
                    // and working up from there (Thanks to Andrew Dupont for the technique)
                    // IE 8 doesn't work on object elements
                    if (1 === context.nodeType && "object" !== context.nodeName.toLowerCase()) {
                        for (groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), 
                        nid = "[id='" + nid + "'] ", i = groups.length; i--; ) groups[i] = nid + groups[i].join("");
                        newContext = rsibling.test(selector) && context.parentNode || context, newSelector = groups.join(",");
                    }
                    if (newSelector) try {
                        return push.apply(results, slice.call(newContext.querySelectorAll(newSelector), 0)), 
                        results;
                    } catch (qsaError) {} finally {
                        old || context.removeAttribute("id");
                    }
                }
                return oldSelect(selector, context, results, seed, xml);
            }, matches && (assert(function(div) {
                // Check to see if it's possible to do matchesSelector
                // on a disconnected node (IE 9)
                disconnectedMatch = matches.call(div, "div");
                // This should fail with an exception
                // Gecko does not error, returns false instead
                try {
                    matches.call(div, "[test!='']:sizzle"), rbuggyMatches.push("!=", pseudos);
                } catch (e) {}
            }), // rbuggyMatches always contains :active and :focus, so no need for a length check
            rbuggyMatches = /* rbuggyMatches.length && */ new RegExp(rbuggyMatches.join("|")), 
            Sizzle.matchesSelector = function(elem, expr) {
                // rbuggyMatches always contains :active, so no need for an existence check
                if (// Make sure that attribute selectors are quoted
                expr = expr.replace(rattributeQuotes, "='$1']"), !(isXML(elem) || rbuggyMatches.test(expr) || rbuggyQSA && rbuggyQSA.test(expr))) try {
                    var ret = matches.call(elem, expr);
                    // IE 9's matchesSelector returns false on disconnected nodes
                    if (ret || disconnectedMatch || // As well, disconnected nodes are said to be in a document
                    // fragment in IE 9
                    elem.document && 11 !== elem.document.nodeType) return ret;
                } catch (e) {}
                return Sizzle(expr, null, null, [ elem ]).length > 0;
            });
        }(), // Deprecated
        Expr.pseudos.nth = Expr.pseudos.eq, Expr.filters = setFilters.prototype = Expr.pseudos, 
        Expr.setFilters = new setFilters(), // Override sizzle attribute retrieval
        Sizzle.attr = jQuery.attr, jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, 
        jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, 
        jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains;
    }(window);
    var runtil = /Until$/, rparentsprev = /^(?:parents|prev(?:Until|All))/, isSimple = /^.[^:#\[\.,]*$/, rneedsContext = jQuery.expr.match.needsContext, // methods guaranteed to produce a unique set when starting from a unique set
    guaranteedUnique = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.fn.extend({
        find: function(selector) {
            var i, l, length, n, r, ret, self = this;
            if ("string" != typeof selector) return jQuery(selector).filter(function() {
                for (i = 0, l = self.length; l > i; i++) if (jQuery.contains(self[i], this)) return !0;
            });
            for (ret = this.pushStack("", "find", selector), i = 0, l = this.length; l > i; i++) if (length = ret.length, 
            jQuery.find(selector, this[i], ret), i > 0) // Make sure that the results are unique
            for (n = length; n < ret.length; n++) for (r = 0; length > r; r++) if (ret[r] === ret[n]) {
                ret.splice(n--, 1);
                break;
            }
            return ret;
        },
        has: function(target) {
            var i, targets = jQuery(target, this), len = targets.length;
            return this.filter(function() {
                for (i = 0; len > i; i++) if (jQuery.contains(this, targets[i])) return !0;
            });
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector, !1), "not", selector);
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector, !0), "filter", selector);
        },
        is: function(selector) {
            // If this is a positional/relative selector, check membership in the returned set
            // so $("p:first").is("p:last") won't return true for a doc with two "p".
            return !!selector && ("string" == typeof selector ? rneedsContext.test(selector) ? jQuery(selector, this.context).index(this[0]) >= 0 : jQuery.filter(selector, this).length > 0 : this.filter(selector).length > 0);
        },
        closest: function(selectors, context) {
            for (var cur, i = 0, l = this.length, ret = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++) for (cur = this[i]; cur && cur.ownerDocument && cur !== context && 11 !== cur.nodeType; ) {
                if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
                    ret.push(cur);
                    break;
                }
                cur = cur.parentNode;
            }
            return ret = ret.length > 1 ? jQuery.unique(ret) : ret, this.pushStack(ret, "closest", selectors);
        },
        // Determine the position of an element within
        // the matched set of elements
        index: function(elem) {
            // No argument, return index in parent
            // No argument, return index in parent
            // index in selector
            // If it receives a jQuery object, the first element is used
            return elem ? "string" == typeof elem ? jQuery.inArray(this[0], jQuery(elem)) : jQuery.inArray(elem.jquery ? elem[0] : elem, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1;
        },
        add: function(selector, context) {
            var set = "string" == typeof selector ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [ selector ] : selector), all = jQuery.merge(this.get(), set);
            return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all : jQuery.unique(all));
        },
        addBack: function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
        }
    }), jQuery.fn.andSelf = jQuery.fn.addBack, jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            return runtil.test(name) || (selector = until), selector && "string" == typeof selector && (ret = jQuery.filter(selector, ret)), 
            ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret, this.length > 1 && rparentsprev.test(name) && (ret = ret.reverse()), 
            this.pushStack(ret, name, core_slice.call(arguments).join(","));
        };
    }), jQuery.extend({
        filter: function(expr, elems, not) {
            return not && (expr = ":not(" + expr + ")"), 1 === elems.length ? jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] : jQuery.find.matches(expr, elems);
        },
        dir: function(elem, dir, until) {
            for (var matched = [], cur = elem[dir]; cur && 9 !== cur.nodeType && (until === undefined || 1 !== cur.nodeType || !jQuery(cur).is(until)); ) 1 === cur.nodeType && matched.push(cur), 
            cur = cur[dir];
            return matched;
        },
        sibling: function(n, elem) {
            for (var r = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && r.push(n);
            return r;
        }
    });
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g, rleadingWhitespace = /^\s+/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, rnocache = /<(?:script|object|embed|option|style)/i, rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"), rcheckableType = /^(?:checkbox|radio)$/, // checked="checked" or checked
    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /\/(java|ecma)script/i, rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g, wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        area: [ 1, "<map>", "</map>" ],
        _default: [ 0, "", "" ]
    }, safeFragment = createSafeFragment(document), fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, 
    wrapMap.th = wrapMap.td, // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
    // unless wrapped in a div with non-breaking characters in front of it.
    jQuery.support.htmlSerialize || (wrapMap._default = [ 1, "X<div>", "</div>" ]), 
    jQuery.fn.extend({
        text: function(value) {
            return jQuery.access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
            }, null, value, arguments.length);
        },
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) return this.each(function(i) {
                jQuery(this).wrapAll(html.call(this, i));
            });
            if (this[0]) {
                // The elements to wrap the target around
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
                    for (var elem = this; elem.firstChild && 1 === elem.firstChild.nodeType; ) elem = elem.firstChild;
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(html) {
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapInner(html.call(this, i));
            }) : this.each(function() {
                var self = jQuery(this), contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html);
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes);
            }).end();
        },
        append: function() {
            return this.domManip(arguments, !0, function(elem) {
                (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(elem);
            });
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(elem) {
                (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(elem, this.firstChild);
            });
        },
        before: function() {
            if (!isDisconnected(this[0])) return this.domManip(arguments, !1, function(elem) {
                this.parentNode.insertBefore(elem, this);
            });
            if (arguments.length) {
                var set = jQuery.clean(arguments);
                return this.pushStack(jQuery.merge(set, this), "before", this.selector);
            }
        },
        after: function() {
            if (!isDisconnected(this[0])) return this.domManip(arguments, !1, function(elem) {
                this.parentNode.insertBefore(elem, this.nextSibling);
            });
            if (arguments.length) {
                var set = jQuery.clean(arguments);
                return this.pushStack(jQuery.merge(this, set), "after", this.selector);
            }
        },
        // keepData is for internal use only--do not document
        remove: function(selector, keepData) {
            for (var elem, i = 0; null != (elem = this[i]); i++) (!selector || jQuery.filter(selector, [ elem ]).length) && (keepData || 1 !== elem.nodeType || (jQuery.cleanData(elem.getElementsByTagName("*")), 
            jQuery.cleanData([ elem ])), elem.parentNode && elem.parentNode.removeChild(elem));
            return this;
        },
        empty: function() {
            for (var elem, i = 0; null != (elem = this[i]); i++) // Remove any remaining nodes
            for (// Remove element nodes and prevent memory leaks
            1 === elem.nodeType && jQuery.cleanData(elem.getElementsByTagName("*")); elem.firstChild; ) elem.removeChild(elem.firstChild);
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, 
            this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return jQuery.access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (value === undefined) return 1 === elem.nodeType ? elem.innerHTML.replace(rinlinejQuery, "") : undefined;
                // See if we can take a shortcut and just use innerHTML
                if ("string" == typeof value && !rnoInnerhtml.test(value) && (jQuery.support.htmlSerialize || !rnoshimcache.test(value)) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (;l > i; i++) // Remove element nodes and prevent memory leaks
                        elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(elem.getElementsByTagName("*")), 
                        elem.innerHTML = value);
                        elem = 0;
                    } catch (e) {}
                }
                elem && this.empty().append(value);
            }, null, value, arguments.length);
        },
        replaceWith: function(value) {
            // Make sure that the elements are removed from the DOM before they are inserted
            // this can help fix replacing a parent with child elements
            return isDisconnected(this[0]) ? this.length ? this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value) : this : jQuery.isFunction(value) ? this.each(function(i) {
                var self = jQuery(this), old = self.html();
                self.replaceWith(value.call(this, i, old));
            }) : ("string" != typeof value && (value = jQuery(value).detach()), this.each(function() {
                var next = this.nextSibling, parent = this.parentNode;
                jQuery(this).remove(), next ? jQuery(next).before(value) : jQuery(parent).append(value);
            }));
        },
        detach: function(selector) {
            return this.remove(selector, !0);
        },
        domManip: function(args, table, callback) {
            // Flatten any nested arrays
            args = [].concat.apply([], args);
            var results, first, fragment, iNoClone, i = 0, value = args[0], scripts = [], l = this.length;
            // We can't cloneNode fragments that contain checked, in WebKit
            if (!jQuery.support.checkClone && l > 1 && "string" == typeof value && rchecked.test(value)) return this.each(function() {
                jQuery(this).domManip(args, table, callback);
            });
            if (jQuery.isFunction(value)) return this.each(function(i) {
                var self = jQuery(this);
                args[0] = value.call(this, i, table ? self.html() : undefined), self.domManip(args, table, callback);
            });
            if (this[0]) {
                if (results = jQuery.buildFragment(args, this, scripts), fragment = results.fragment, 
                first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), 
                first) // Use the original fragment for the last item instead of the first because it can end up
                // being emptied incorrectly in certain situations (#8070).
                // Fragments from the fragment cache must always be cloned and never used in place.
                for (table = table && jQuery.nodeName(first, "tr"), iNoClone = results.cacheable || l - 1; l > i; i++) callback.call(table && jQuery.nodeName(this[i], "table") ? findOrAppend(this[i], "tbody") : this[i], i === iNoClone ? fragment : jQuery.clone(fragment, !0, !0));
                // Fix #11809: Avoid leaking memory
                fragment = first = null, scripts.length && jQuery.each(scripts, function(i, elem) {
                    elem.src ? jQuery.ajax ? jQuery.ajax({
                        url: elem.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : jQuery.error("no ajax") : jQuery.globalEval((elem.text || elem.textContent || elem.innerHTML || "").replace(rcleanScript, "")), 
                    elem.parentNode && elem.parentNode.removeChild(elem);
                });
            }
            return this;
        }
    }), jQuery.buildFragment = function(args, context, scripts) {
        var fragment, cacheable, cachehit, first = args[0];
        // Set context from what may come in as undefined or a jQuery collection or a node
        // Updated to fix #12266 where accessing context[0] could throw an exception in IE9/10 &
        // also doubles as fix for #8950 where plain objects caused createDocumentFragment exception
        // Only cache "small" (1/2 KB) HTML strings that are associated with the main document
        // Cloning options loses the selected state, so don't cache them
        // IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
        // Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
        // Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
        // Mark cacheable and look for a hit
        // Update the cache, but only store false
        // unless this is a second parsing of the same content
        return context = context || document, context = !context.nodeType && context[0] || context, 
        context = context.ownerDocument || context, !(1 === args.length && "string" == typeof first && first.length < 512 && context === document && "<" === first.charAt(0)) || rnocache.test(first) || !jQuery.support.checkClone && rchecked.test(first) || !jQuery.support.html5Clone && rnoshimcache.test(first) || (cacheable = !0, 
        fragment = jQuery.fragments[first], cachehit = fragment !== undefined), fragment || (fragment = context.createDocumentFragment(), 
        jQuery.clean(args, context, fragment, scripts), cacheable && (jQuery.fragments[first] = cachehit && fragment)), 
        {
            fragment: fragment,
            cacheable: cacheable
        };
    }, jQuery.fragments = {}, jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var elems, i = 0, ret = [], insert = jQuery(selector), l = insert.length, parent = 1 === this.length && this[0].parentNode;
            if ((null == parent || parent && 11 === parent.nodeType && 1 === parent.childNodes.length) && 1 === l) return insert[original](this[0]), 
            this;
            for (;l > i; i++) elems = (i > 0 ? this.clone(!0) : this).get(), jQuery(insert[i])[original](elems), 
            ret = ret.concat(elems);
            return this.pushStack(ret, name, insert.selector);
        };
    }), jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var srcElements, destElements, i, clone;
            if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">") ? clone = elem.cloneNode(!0) : (fragmentDiv.innerHTML = elem.outerHTML, 
            fragmentDiv.removeChild(clone = fragmentDiv.firstChild)), !(jQuery.support.noCloneEvent && jQuery.support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) // Weird iteration because IE will replace the length property
            // with an element if you are cloning the body and one of the
            // elements on the page has a name or id of "length"
            for (// IE copies events bound via attachEvent when using cloneNode.
            // Calling detachEvent on the clone will also remove the events
            // from the original. In order to get around this, we use some
            // proprietary methods to clear the events. Thanks to MooTools
            // guys for this hotness.
            cloneFixAttributes(elem, clone), // Using Sizzle here is crazy slow, so we use getElementsByTagName instead
            srcElements = getAll(elem), destElements = getAll(clone), i = 0; srcElements[i]; ++i) // Ensure that the destination node is not null; Fixes #9587
            destElements[i] && cloneFixAttributes(srcElements[i], destElements[i]);
            // Copy the events from the original to the clone
            if (dataAndEvents && (cloneCopyEvent(elem, clone), deepDataAndEvents)) for (srcElements = getAll(elem), 
            destElements = getAll(clone), i = 0; srcElements[i]; ++i) cloneCopyEvent(srcElements[i], destElements[i]);
            // Return the cloned set
            return srcElements = destElements = null, clone;
        },
        clean: function(elems, context, fragment, scripts) {
            var i, j, elem, tag, wrap, depth, div, hasBody, tbody, handleScript, jsTags, safe = context === document && safeFragment, ret = [];
            // Use the already-created safe fragment if context permits
            for (// Ensure that context is a document
            context && "undefined" != typeof context.createDocumentFragment || (context = document), 
            i = 0; null != (elem = elems[i]); i++) if ("number" == typeof elem && (elem += ""), 
            elem) {
                // Convert html string into DOM nodes
                if ("string" == typeof elem) if (rhtml.test(elem)) {
                    // Move to the right depth
                    for (// Ensure a safe container in which to render the html
                    safe = safe || createSafeFragment(context), div = context.createElement("div"), 
                    safe.appendChild(div), // Fix "XHTML"-style tags in all browsers
                    elem = elem.replace(rxhtmlTag, "<$1></$2>"), // Go to html and back, then peel off extra wrappers
                    tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, 
                    depth = wrap[0], div.innerHTML = wrap[1] + elem + wrap[2]; depth--; ) div = div.lastChild;
                    // Remove IE's autoinserted <tbody> from table fragments
                    if (!jQuery.support.tbody) for (// String was a <table>, *may* have spurious <tbody>
                    hasBody = rtbody.test(elem), tbody = "table" !== tag || hasBody ? // String was a bare <thead> or <tfoot>
                    "<table>" !== wrap[1] || hasBody ? [] : div.childNodes : div.firstChild && div.firstChild.childNodes, 
                    j = tbody.length - 1; j >= 0; --j) jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length && tbody[j].parentNode.removeChild(tbody[j]);
                    // IE completely kills leading whitespace when innerHTML is used
                    !jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem) && div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild), 
                    elem = div.childNodes, // Take out of fragment container (we need a fresh div each time)
                    div.parentNode.removeChild(div);
                } else elem = context.createTextNode(elem);
                elem.nodeType ? ret.push(elem) : jQuery.merge(ret, elem);
            }
            // Reset defaultChecked for any radios and checkboxes
            // about to be appended to the DOM in IE 6/7 (#8060)
            if (// Fix #11356: Clear elements from safeFragment
            div && (elem = div = safe = null), !jQuery.support.appendChecked) for (i = 0; null != (elem = ret[i]); i++) jQuery.nodeName(elem, "input") ? fixDefaultChecked(elem) : "undefined" != typeof elem.getElementsByTagName && jQuery.grep(elem.getElementsByTagName("input"), fixDefaultChecked);
            // Append elements to a provided document fragment
            if (fragment) for (// Special handling of each script element
            handleScript = function(elem) {
                // Check if we consider it executable
                // Check if we consider it executable
                return !elem.type || rscriptType.test(elem.type) ? scripts ? scripts.push(elem.parentNode ? elem.parentNode.removeChild(elem) : elem) : fragment.appendChild(elem) : void 0;
            }, i = 0; null != (elem = ret[i]); i++) // Check if we're done after handling an executable script
            jQuery.nodeName(elem, "script") && handleScript(elem) || (// Append to fragment and handle embedded scripts
            fragment.appendChild(elem), "undefined" != typeof elem.getElementsByTagName && (// handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration
            jsTags = jQuery.grep(jQuery.merge([], elem.getElementsByTagName("script")), handleScript), 
            // Splice the scripts into ret after their former ancestor and advance our index beyond them
            ret.splice.apply(ret, [ i + 1, 0 ].concat(jsTags)), i += jsTags.length));
            return ret;
        },
        cleanData: function(elems, /* internal */ acceptData) {
            for (var data, id, elem, type, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = jQuery.support.deleteExpando, special = jQuery.event.special; null != (elem = elems[i]); i++) if ((acceptData || jQuery.acceptData(elem)) && (id = elem[internalKey], 
            data = id && cache[id])) {
                if (data.events) for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                // Remove cache only if it was not already removed by jQuery.event.remove
                cache[id] && (delete cache[id], // IE does not allow us to delete expando properties from nodes,
                // nor does it have a removeAttribute function on Document nodes;
                // we must handle all of these cases
                deleteExpando ? delete elem[internalKey] : elem.removeAttribute ? elem.removeAttribute(internalKey) : elem[internalKey] = null, 
                jQuery.deletedIds.push(id));
            }
        }
    }), // Limit scope pollution from any deprecated API
    function() {
        var matched, browser;
        // Use of jQuery.browser is frowned upon.
        // More details: http://api.jquery.com/jQuery.browser
        // jQuery.uaMatch maintained for back-compat
        jQuery.uaMatch = function(ua) {
            ua = ua.toLowerCase();
            var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
            return {
                browser: match[1] || "",
                version: match[2] || "0"
            };
        }, matched = jQuery.uaMatch(navigator.userAgent), browser = {}, matched.browser && (browser[matched.browser] = !0, 
        browser.version = matched.version), // Chrome is Webkit, but Webkit is also Safari.
        browser.chrome ? browser.webkit = !0 : browser.webkit && (browser.safari = !0), 
        jQuery.browser = browser, jQuery.sub = function() {
            function jQuerySub(selector, context) {
                return new jQuerySub.fn.init(selector, context);
            }
            jQuery.extend(!0, jQuerySub, this), jQuerySub.superclass = this, jQuerySub.fn = jQuerySub.prototype = this(), 
            jQuerySub.fn.constructor = jQuerySub, jQuerySub.sub = this.sub, jQuerySub.fn.init = function(selector, context) {
                return context && context instanceof jQuery && !(context instanceof jQuerySub) && (context = jQuerySub(context)), 
                jQuery.fn.init.call(this, selector, context, rootjQuerySub);
            }, jQuerySub.fn.init.prototype = jQuerySub.fn;
            var rootjQuerySub = jQuerySub(document);
            return jQuerySub;
        };
    }();
    var curCSS, iframe, iframeDoc, ralpha = /alpha\([^)]*\)/i, ropacity = /opacity=([^)]*)/, rposition = /^(top|right|bottom|left)$/, // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
    // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
    rdisplayswap = /^(none|table(?!-c[ea]).+)/, rmargin = /^margin/, rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"), rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"), rrelNum = new RegExp("^([-+])=(" + core_pnum + ")", "i"), elemdisplay = {}, cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: 0,
        fontWeight: 400
    }, cssExpand = [ "Top", "Right", "Bottom", "Left" ], cssPrefixes = [ "Webkit", "O", "Moz", "ms" ], eventsToggle = jQuery.fn.toggle;
    jQuery.fn.extend({
        css: function(name, value) {
            return jQuery.access(this, function(elem, name, value) {
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, !0);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state, fn2) {
            var bool = "boolean" == typeof state;
            return jQuery.isFunction(state) && jQuery.isFunction(fn2) ? eventsToggle.apply(this, arguments) : this.each(function() {
                (bool ? state : isHidden(this)) ? jQuery(this).show() : jQuery(this).hide();
            });
        }
    }), jQuery.extend({
        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        // We should always get a number back from opacity
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret;
                    }
                }
            }
        },
        // Exclude the following css properties to add px
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {
            // normalize float css property
            "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        // Get and set the style property on a DOM Node
        style: function(elem, name, value, extra) {
            // Don't set styles on text and comment nodes
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                // Make sure that we're working with the right name
                var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                // Check if we're setting a value
                if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), 
                // gets hook for the prefixed version
                // followed by the unprefixed version
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], value === undefined) // If a hook was provided get the non-computed value from there
                // If a hook was provided get the non-computed value from there
                return hooks && "get" in hooks && (ret = hooks.get(elem, !1, extra)) !== undefined ? ret : style[name];
                // Make sure that NaN and null values aren't set. See: #7116
                if (type = typeof value, // convert relative number strings (+= or -=) to relative numbers. #7345
                "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), 
                // Fixes bug #9237
                type = "number"), !(null == value || "number" === type && isNaN(value) || (// If a number was passed in, add 'px' to the (except for certain CSS properties)
                "number" !== type || jQuery.cssNumber[origName] || (value += "px"), hooks && "set" in hooks && (value = hooks.set(elem, value, extra)) === undefined))) // Wrapped to prevent IE from throwing errors when 'invalid' values are provided
                // Fixes bug #5509
                try {
                    style[name] = value;
                } catch (e) {}
            }
        },
        css: function(elem, name, numeric, extra) {
            var val, num, hooks, origName = jQuery.camelCase(name);
            // Return, converting to number if forced or a qualifier was provided and val looks numeric
            // Make sure that we're working with the right name
            // gets hook for the prefixed version
            // followed by the unprefixed version
            // If a hook was provided get the computed value from there
            // Otherwise, if a way to get the computed value exists, use that
            //convert "normal" to computed value
            // Return, converting to number if forced or a qualifier was provided and val looks numeric
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), 
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), 
            val === undefined && (val = curCSS(elem, name)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), 
            numeric || extra !== undefined ? (num = parseFloat(val), numeric || jQuery.isNumeric(num) ? num || 0 : val) : val;
        },
        // A method for quickly swapping in/out CSS properties to get correct calculations
        swap: function(elem, options, callback) {
            var ret, name, old = {};
            // Remember the old values, and insert the new ones
            for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
            ret = callback.call(elem);
            // Revert the old values
            for (name in options) elem.style[name] = old[name];
            return ret;
        }
    }), // NOTE: To any future maintainer, we've window.getComputedStyle
    // because jsdom on node.js will break without it.
    window.getComputedStyle ? curCSS = function(elem, name) {
        var ret, width, minWidth, maxWidth, computed = window.getComputedStyle(elem, null), style = elem.style;
        // A tribute to the "awesome hack by Dean Edwards"
        // Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
        // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
        // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
        return computed && (ret = computed[name], "" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), 
        rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, 
        maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, 
        ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), 
        ret;
    } : document.documentElement.currentStyle && (curCSS = function(elem, name) {
        var left, rsLeft, ret = elem.currentStyle && elem.currentStyle[name], style = elem.style;
        // Avoid setting ret to empty string here
        // so we don't default to auto
        // From the awesome hack by Dean Edwards
        // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
        // If we're not dealing with a regular pixel number
        // but a number that has a weird ending, we need to convert it to pixels
        // but not position css attributes, as those are proportional to the parent element instead
        // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
        // Remember the original values
        // Put in the new values to get a computed value out
        // Revert the changed values
        return null == ret && style && style[name] && (ret = style[name]), rnumnonpx.test(ret) && !rposition.test(name) && (left = style.left, 
        rsLeft = elem.runtimeStyle && elem.runtimeStyle.left, rsLeft && (elem.runtimeStyle.left = elem.currentStyle.left), 
        style.left = "fontSize" === name ? "1em" : ret, ret = style.pixelLeft + "px", style.left = left, 
        rsLeft && (elem.runtimeStyle.left = rsLeft)), "" === ret ? "auto" : ret;
    }), jQuery.each([ "height", "width" ], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                // certain elements can have dimension info if we invisibly show them
                // however, it must have a current display style that would benefit from this
                return computed ? 0 === elem.offsetWidth && rdisplayswap.test(curCSS(elem, "display")) ? jQuery.swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra);
                }) : getWidthOrHeight(elem, name, extra) : void 0;
            },
            set: function(elem, value, extra) {
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing")) : 0);
            }
        };
    }), jQuery.support.opacity || (jQuery.cssHooks.opacity = {
        get: function(elem, computed) {
            // IE uses filters for opacity
            return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : computed ? "1" : "";
        },
        set: function(elem, value) {
            var style = elem.style, currentStyle = elem.currentStyle, opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + 100 * value + ")" : "", filter = currentStyle && currentStyle.filter || style.filter || "";
            // IE has trouble with opacity if it does not have layout
            // Force it by setting the zoom level
            style.zoom = 1, // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
            value >= 1 && "" === jQuery.trim(filter.replace(ralpha, "")) && style.removeAttribute && (// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
            // if "filter:" is present at all, clearType is disabled, we want to avoid this
            // style.removeAttribute is IE Only, but so apparently is this code path...
            style.removeAttribute("filter"), currentStyle && !currentStyle.filter) || (// otherwise, set new filter values
            style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity);
        }
    }), // These hooks cannot be added until DOM ready because the support test
    // for it is not run until after DOM ready
    jQuery(function() {
        jQuery.support.reliableMarginRight || (jQuery.cssHooks.marginRight = {
            get: function(elem, computed) {
                // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                // Work around by temporarily setting element display to inline-block
                return jQuery.swap(elem, {
                    display: "inline-block"
                }, function() {
                    return computed ? curCSS(elem, "marginRight") : void 0;
                });
            }
        }), // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
        // getComputedStyle returns percent when specified for top/left/bottom/right
        // rather than make the css module depend on the offset module, we just check for it here
        !jQuery.support.pixelPosition && jQuery.fn.position && jQuery.each([ "top", "left" ], function(i, prop) {
            jQuery.cssHooks[prop] = {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, prop);
                        // if curCSS returns percentage, fallback to offset
                        return rnumnonpx.test(ret) ? jQuery(elem).position()[prop] + "px" : ret;
                    }
                }
            };
        });
    }), jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.hidden = function(elem) {
        return 0 === elem.offsetWidth && 0 === elem.offsetHeight || !jQuery.support.reliableHiddenOffsets && "none" === (elem.style && elem.style.display || curCSS(elem, "display"));
    }, jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
    }), // These hooks are used by animate to expand properties
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                var i, // assumes a single number if not a string
                parts = "string" == typeof value ? value.split(" ") : [ value ], expanded = {};
                for (i = 0; 4 > i; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded;
            }
        }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber);
    });
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, rselectTextarea = /^(?:select|textarea)/i;
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? jQuery.makeArray(this.elements) : this;
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val, i) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    }), //Serialize an array of form elements or a set of
    //key/values into a query string
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            // If value is a function, invoke it and return its value
            value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        // If an array was passed in, assume that it is an array of form elements.
        if (// Set traditional to true for jQuery <= 1.3.2 behavior.
        traditional === undefined && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), 
        jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) // Serialize the form elements
        jQuery.each(a, function() {
            add(this.name, this.value);
        }); else // If traditional, encode the "old" way (the way 1.3.2 or older
        // did it), otherwise encode params recursively.
        for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
        // Return the resulting serialization
        return s.join("&").replace(r20, "+");
    };
    var // Document location
    ajaxLocParts, ajaxLocation, rhash = /#.*$/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, // IE leaves an \r character at EOL
    // #7653, #8125, #8152: local protocol detection
    rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rquery = /\?/, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, rts = /([?&])_=[^&]*/, rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, // Keep a copy of the old load method
    _load = jQuery.fn.load, /* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
    prefilters = {}, /* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
    transports = {}, // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
    allTypes = [ "*/" ] + [ "*" ];
    // #8138, IE may throw an exception when accessing
    // a field from window.location if document.domain has been set
    try {
        ajaxLocation = location.href;
    } catch (e) {
        // Use the href attribute of an A element
        // since IE will modify it given document.location
        ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href;
    }
    // Segment location into parts
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.fn.load = function(url, params, callback) {
        if ("string" != typeof url && _load) return _load.apply(this, arguments);
        // Don't do a request if no elements are being requested
        if (!this.length) return this;
        var selector, type, response, self = this, off = url.indexOf(" ");
        // If it's a function
        // We assume that it's the callback
        // Request the remote document
        return off >= 0 && (selector = url.slice(off, url.length), url = url.slice(0, off)), 
        jQuery.isFunction(params) ? (callback = params, params = undefined) : params && "object" == typeof params && (type = "POST"), 
        jQuery.ajax({
            url: url,
            // if "type" variable is undefined, then "GET" method will be used
            type: type,
            dataType: "html",
            data: params,
            complete: function(jqXHR, status) {
                callback && self.each(callback, response || [ jqXHR.responseText, status, jqXHR ]);
            }
        }).done(function(responseText) {
            // Save response for use in complete callback
            response = arguments, // See if a selector was specified
            self.html(selector ? // Create a dummy div to hold the results
            jQuery("<div>").append(responseText.replace(rscript, "")).find(selector) : // If not, just inject the full result
            responseText);
        }), this;
    }, // Attach a bunch of functions for handling common AJAX events
    jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(i, o) {
        jQuery.fn[o] = function(f) {
            return this.on(o, f);
        };
    }), jQuery.each([ "get", "post" ], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            // shift arguments if data argument was omitted
            return jQuery.isFunction(data) && (type = type || callback, callback = data, data = undefined), 
            jQuery.ajax({
                type: method,
                url: url,
                data: data,
                success: callback,
                dataType: type
            });
        };
    }), jQuery.extend({
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function(target, settings) {
            // Building a settings object
            // Extending ajaxSettings
            return settings ? ajaxExtend(target, jQuery.ajaxSettings) : (settings = target, 
            target = jQuery.ajaxSettings), ajaxExtend(target, settings), target;
        },
        ajaxSettings: {
            url: ajaxLocation,
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            /*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": allTypes
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            // List of data converters
            // 1) key format is "source_type destination_type" (a single space in-between)
            // 2) the catchall symbol "*" can be used for source_type
            converters: {
                // Convert anything to text
                "* text": window.String,
                // Text to html (true = no transformation)
                "text html": !0,
                // Evaluate text as a json expression
                "text json": jQuery.parseJSON,
                // Parse text as xml
                "text xml": jQuery.parseXML
            },
            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        // Main method
        ajax: function(url, options) {
            // Callback for when everything is done
            // It is defined here because jslint complains if it is declared
            // at the end of the function (which would be more logical and readable)
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                // Called once
                2 !== state && (// State is "done" now
                state = 2, // Clear timeout if it exists
                timeoutTimer && clearTimeout(timeoutTimer), // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport = undefined, // Cache response headers
                responseHeadersString = headers || "", // Set readyState
                jqXHR.readyState = status > 0 ? 4 : 0, // Get response data
                responses && (response = ajaxHandleResponses(s, jqXHR, responses)), // If successful, handle type chaining
                status >= 200 && 300 > status || 304 === status ? (// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), modified && (jQuery.lastModified[ifModifiedKey] = modified), 
                modified = jqXHR.getResponseHeader("Etag"), modified && (jQuery.etag[ifModifiedKey] = modified)), 
                // If not modified
                304 === status ? (statusText = "notmodified", isSuccess = !0) : (isSuccess = ajaxConvert(s, response), 
                statusText = isSuccess.state, success = isSuccess.data, error = isSuccess.error, 
                isSuccess = !error)) : (// We extract error from statusText
                // then normalize statusText and status for non-aborts
                error = statusText, (!statusText || status) && (statusText = "error", 0 > status && (status = 0))), 
                // Set data for the fake xhr object
                jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", 
                // Success/Error
                isSuccess ? deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]) : deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]), 
                // Status-dependent callbacks
                jqXHR.statusCode(statusCode), statusCode = undefined, fireGlobals && globalEventContext.trigger("ajax" + (isSuccess ? "Success" : "Error"), [ jqXHR, s, isSuccess ? success : error ]), 
                // Complete
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]), 
                // Handle the global AJAX counter
                --jQuery.active || jQuery.event.trigger("ajaxStop")));
            }
            // If url is an object, simulate pre-1.5 signature
            "object" == typeof url && (options = url, url = undefined), // Force options to be an object
            options = options || {};
            var // ifModified key
            ifModifiedKey, // Response headers
            responseHeadersString, responseHeaders, // transport
            transport, // timeout handle
            timeoutTimer, // Cross-domain detection vars
            parts, // To know if global events are to be dispatched
            fireGlobals, // Loop variable
            i, // Create the final options object
            s = jQuery.ajaxSetup({}, options), // Callbacks context
            callbackContext = s.context || s, // Context for global events
            // It's the callbackContext if one was provided in the options
            // and if it's a DOM node or a jQuery collection
            globalEventContext = callbackContext !== s && (callbackContext.nodeType || callbackContext instanceof jQuery) ? jQuery(callbackContext) : jQuery.event, // Deferreds
            deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), // Status-dependent callbacks
            statusCode = s.statusCode || {}, // Headers (they are sent all at once)
            requestHeaders = {}, requestHeadersNames = {}, // The jqXHR state
            state = 0, // Default abort message
            strAbort = "canceled", // Fake xhr
            jqXHR = {
                readyState: 0,
                // Caches the header
                setRequestHeader: function(name, value) {
                    if (!state) {
                        var lname = name.toLowerCase();
                        name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, requestHeaders[name] = value;
                    }
                    return this;
                },
                // Raw string
                getAllResponseHeaders: function() {
                    return 2 === state ? responseHeadersString : null;
                },
                // Builds headers hashtable if needed
                getResponseHeader: function(key) {
                    var match;
                    if (2 === state) {
                        if (!responseHeaders) for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); ) responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return match === undefined ? null : match;
                },
                // Overrides response content-type header
                overrideMimeType: function(type) {
                    return state || (s.mimeType = type), this;
                },
                // Cancel the request
                abort: function(statusText) {
                    return statusText = statusText || strAbort, transport && transport.abort(statusText), 
                    done(0, statusText), this;
                }
            };
            // If request was aborted inside a prefilter, stop there
            if (// Attach deferreds
            deferred.promise(jqXHR), jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail, jqXHR.complete = completeDeferred.add, 
            // Status-dependent callbacks
            jqXHR.statusCode = function(map) {
                if (map) {
                    var tmp;
                    if (2 > state) for (tmp in map) statusCode[tmp] = [ statusCode[tmp], map[tmp] ]; else tmp = map[jqXHR.status], 
                    jqXHR.always(tmp);
                }
                return this;
            }, // Remove hash character (#7531: and string promotion)
            // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
            // We also use the url parameter if available
            s.url = ((url || s.url) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), 
            // Extract dataTypes list
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().split(core_rspace), // A cross-domain request is in order when we have a protocol:host:port mismatch
            null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()) || !1, s.crossDomain = parts && parts.join(":") + (parts[3] ? "" : "http:" === parts[1] ? 80 : 443) !== ajaxLocParts.join(":") + (ajaxLocParts[3] ? "" : "http:" === ajaxLocParts[1] ? 80 : 443)), 
            // Convert data if not already a string
            s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), 
            // Apply prefilters
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
            // More options handling for requests with no content
            if (// We can fire global events as of now if asked to
            fireGlobals = s.global, // Uppercase the type
            s.type = s.type.toUpperCase(), // Determine if request has content
            s.hasContent = !rnoContent.test(s.type), // Watch for a new set of requests
            fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), !s.hasContent && (// If data is available, append data to url
            s.data && (s.url += (rquery.test(s.url) ? "&" : "?") + s.data, // #9682: remove data so that it's not used in an eventual retry
            delete s.data), // Get ifModifiedKey before adding the anti-cache parameter
            ifModifiedKey = s.url, s.cache === !1)) {
                var ts = jQuery.now(), // try replacing _= if it is there
                ret = s.url.replace(rts, "$1_=" + ts);
                // if nothing was replaced, add timestamp to the end
                s.url = ret + (ret === s.url ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
            }
            // Set the correct header, if data is being sent
            (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), 
            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            s.ifModified && (ifModifiedKey = ifModifiedKey || s.url, jQuery.lastModified[ifModifiedKey] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[ifModifiedKey]), 
            jQuery.etag[ifModifiedKey] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[ifModifiedKey])), 
            // Set the Accepts header for the server, depending on the dataType
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            // Check for headers option
            for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
            // Allow custom headers/mimetypes and early abort
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) // Abort if not done already and return
            return jqXHR.abort();
            // aborting is no longer a cancellation
            strAbort = "abort";
            // Install callbacks on deferreds
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) jqXHR[i](s[i]);
            // If no transport, we auto-abort
            if (// Get transport
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                jqXHR.readyState = 1, // Send global event
                fireGlobals && globalEventContext.trigger("ajaxSend", [ jqXHR, s ]), // Timeout
                s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout");
                }, s.timeout));
                try {
                    state = 1, transport.send(requestHeaders, done);
                } catch (e) {
                    // Propagate exception as error if not done
                    if (!(2 > state)) throw e;
                    done(-1, e);
                }
            } else done(-1, "No Transport");
            return jqXHR;
        },
        // Counter for holding the number of active queries
        active: 0,
        // Last-Modified header cache for next request
        lastModified: {},
        etag: {}
    });
    var oldCallbacks = [], rquestion = /\?/, rjsonp = /(=)\?(?=&|$)|\?\?/, nonce = jQuery.now();
    // Default jsonp settings
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[callback] = !0, callback;
        }
    }), // Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, data = s.data, url = s.url, hasCallback = s.jsonp !== !1, replaceInUrl = hasCallback && rjsonp.test(url), replaceInData = hasCallback && !replaceInUrl && "string" == typeof data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(data);
        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        // Get callback name, remembering preexisting value associated with it
        // Insert callback into url or form data
        // Use data converter to retrieve json after script execution
        // force json dataType
        // Install callback
        // Clean-up function (fires after converters)
        return "jsonp" === s.dataTypes[0] || replaceInUrl || replaceInData ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, 
        overwritten = window[callbackName], replaceInUrl ? s.url = url.replace(rjsonp, "$1" + callbackName) : replaceInData ? s.data = data.replace(rjsonp, "$1" + callbackName) : hasCallback && (s.url += (rquestion.test(url) ? "&" : "?") + s.jsonp + "=" + callbackName), 
        s.converters["script json"] = function() {
            return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
        }, s.dataTypes[0] = "json", window[callbackName] = function() {
            responseContainer = arguments;
        }, jqXHR.always(function() {
            // Restore preexisting value
            window[callbackName] = overwritten, // Save back as free
            s[callbackName] && (// make sure that re-using the options doesn't screw things around
            s.jsonpCallback = originalSettings.jsonpCallback, // save the callback name for future use
            oldCallbacks.push(callbackName)), // Call if it was a function and we have a response
            responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), 
            responseContainer = overwritten = undefined;
        }), "script") : void 0;
    }), // Install script dataType
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(text) {
                return jQuery.globalEval(text), text;
            }
        }
    }), // Handle cache's special case and global
    jQuery.ajaxPrefilter("script", function(s) {
        s.cache === undefined && (s.cache = !1), s.crossDomain && (s.type = "GET", s.global = !1);
    }), // Bind script tag hack transport
    jQuery.ajaxTransport("script", function(s) {
        // This transport only deals with cross domain requests
        if (s.crossDomain) {
            var script, head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
            return {
                send: function(_, callback) {
                    script = document.createElement("script"), script.async = "async", s.scriptCharset && (script.charset = s.scriptCharset), 
                    script.src = s.url, // Attach handlers for all browsers
                    script.onload = script.onreadystatechange = function(_, isAbort) {
                        (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) && (// Handle memory leak in IE
                        script.onload = script.onreadystatechange = null, // Remove the script
                        head && script.parentNode && head.removeChild(script), // Dereference the script
                        script = undefined, // Callback if not abort
                        isAbort || callback(200, "success"));
                    }, // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
                    // This arises when a base node is used (#2709 and #4378).
                    head.insertBefore(script, head.firstChild);
                },
                abort: function() {
                    script && script.onload(0, 1);
                }
            };
        }
    });
    var xhrCallbacks, // #5280: Internet Explorer will keep connections alive if we don't abort on unload
    xhrOnUnloadAbort = window.ActiveXObject ? function() {
        // Abort all pending requests
        for (var key in xhrCallbacks) xhrCallbacks[key](0, 1);
    } : !1, xhrId = 0;
    // Create the request object
    // (This is still attached to ajaxSettings for backward compatibility)
    jQuery.ajaxSettings.xhr = window.ActiveXObject ? /* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
    function() {
        return !this.isLocal && createStandardXHR() || createActiveXHR();
    } : // For all other browsers, use the standard XMLHttpRequest object
    createStandardXHR, // Determine support properties
    function(xhr) {
        jQuery.extend(jQuery.support, {
            ajax: !!xhr,
            cors: !!xhr && "withCredentials" in xhr
        });
    }(jQuery.ajaxSettings.xhr()), // Create transport if the browser can provide an xhr
    jQuery.support.ajax && jQuery.ajaxTransport(function(s) {
        // Cross domain only allowed if supported through XMLHttpRequest
        if (!s.crossDomain || jQuery.support.cors) {
            var callback;
            return {
                send: function(headers, complete) {
                    // Get a new xhr
                    var handle, i, xhr = s.xhr();
                    // Apply custom fields if provided
                    if (// Open the socket
                    // Passing null username, generates a login popup on Opera (#2865)
                    s.username ? xhr.open(s.type, s.url, s.async, s.username, s.password) : xhr.open(s.type, s.url, s.async), 
                    s.xhrFields) for (i in s.xhrFields) xhr[i] = s.xhrFields[i];
                    // Override mime type if needed
                    s.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(s.mimeType), // X-Requested-With header
                    // For cross-domain requests, seeing as conditions for a preflight are
                    // akin to a jigsaw puzzle, we simply never set it to be sure.
                    // (it can always be set on a per-request basis or even using ajaxSetup)
                    // For same-domain requests, won't change header if already provided.
                    s.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                    // Need an extra try/catch for cross domain requests in Firefox 3
                    try {
                        for (i in headers) xhr.setRequestHeader(i, headers[i]);
                    } catch (_) {}
                    // Do send the request
                    // This may raise an exception which is actually
                    // handled in jQuery.ajax (so no try/catch here)
                    xhr.send(s.hasContent && s.data || null), // Listener
                    callback = function(_, isAbort) {
                        var status, statusText, responseHeaders, responses, xml;
                        // Firefox throws exceptions when accessing properties
                        // of an xhr when a network error occurred
                        // http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
                        try {
                            // Was never called and is aborted or complete
                            if (callback && (isAbort || 4 === xhr.readyState)) // If it's an abort
                            if (// Only called once
                            callback = undefined, // Do not keep as active anymore
                            handle && (xhr.onreadystatechange = jQuery.noop, xhrOnUnloadAbort && delete xhrCallbacks[handle]), 
                            isAbort) // Abort it manually if needed
                            4 !== xhr.readyState && xhr.abort(); else {
                                status = xhr.status, responseHeaders = xhr.getAllResponseHeaders(), responses = {}, 
                                xml = xhr.responseXML, // Construct response list
                                xml && xml.documentElement && (responses.xml = xml);
                                // When requesting binary data, IE6-9 will throw an exception
                                // on any attempt to access responseText (#11426)
                                try {
                                    responses.text = xhr.responseText;
                                } catch (_) {}
                                // Firefox throws an exception when accessing
                                // statusText for faulty cross-domain requests
                                try {
                                    statusText = xhr.statusText;
                                } catch (e) {
                                    // We normalize with Webkit giving an empty statusText
                                    statusText = "";
                                }
                                // Filter status for non standard behaviors
                                // If the request is local and we have data: assume a success
                                // (success with no data won't get notified, that's the best we
                                // can do given current implementations)
                                status || !s.isLocal || s.crossDomain ? 1223 === status && (status = 204) : status = responses.text ? 200 : 404;
                            }
                        } catch (firefoxAccessException) {
                            isAbort || complete(-1, firefoxAccessException);
                        }
                        // Call complete if needed
                        responses && complete(status, statusText, responses, responseHeaders);
                    }, s.async ? 4 === xhr.readyState ? // (IE6 & IE7) if it's in cache and has been
                    // retrieved directly we need to fire the callback
                    setTimeout(callback, 0) : (handle = ++xhrId, xhrOnUnloadAbort && (// Create the active xhrs callbacks list if needed
                    // and attach the unload handler
                    xhrCallbacks || (xhrCallbacks = {}, jQuery(window).unload(xhrOnUnloadAbort)), // Add to list of active xhrs callbacks
                    xhrCallbacks[handle] = callback), xhr.onreadystatechange = callback) : // if we're in sync mode we fire the callback
                    callback();
                },
                abort: function() {
                    callback && callback(0, 1);
                }
            };
        }
    });
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [ defaultPrefilter ], tweeners = {
        "*": [ function(prop, value) {
            var end, unit, tween = this.createTween(prop, value), parts = rfxnum.exec(value), target = tween.cur(), start = +target || 0, scale = 1, maxIterations = 20;
            if (parts) {
                // We need to compute starting value
                if (end = +parts[2], unit = parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), "px" !== unit && start) {
                    // Iteratively approximate from a nonzero starting point
                    // Prefer the current property, because this process will be trivial if it uses the same units
                    // Fallback to end or a simple constant
                    start = jQuery.css(tween.elem, prop, !0) || end || 1;
                    do // If previous iteration zeroed out, double until we get *something*
                    // Use a string for doubling factor so we don't accidentally see scale as unchanged below
                    scale = scale || ".5", // Adjust and apply
                    start /= scale, jQuery.style(tween.elem, prop, start + unit); while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations);
                }
                tween.unit = unit, tween.start = start, // If a +=/-= token was provided, we're doing a relative animation
                tween.end = parts[1] ? start + (parts[1] + 1) * end : end;
            }
            return tween;
        } ]
    };
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            jQuery.isFunction(props) ? (callback = props, props = [ "*" ]) : props = props.split(" ");
            for (var prop, index = 0, length = props.length; length > index; index++) prop = props[index], 
            tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback);
        },
        prefilter: function(callback, prepend) {
            prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback);
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, 
            this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent, 
            this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                // passing any value as a 4th parameter to .css will automatically
                // attempt a parseFloat and fallback to a string if the parse fails
                // so, simple values such as "10px" are parsed to Float.
                // complex values such as "rotate(1rad)" are returned as is.
                return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, !1, ""), 
                result && "auto" !== result ? result : 0) : tween.elem[tween.prop];
            },
            set: function(tween) {
                // use step hook for back compat - use cssHook if its there - use .style if its
                // available and use plain properties where available
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now;
            }
        }
    }, // Remove in 2.0 - this supports IE8's panic based approach
    // to setting things on disconnected nodes
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now);
        }
    }, jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            // special check for .toggle( handler, handler, ... )
            return null == speed || "boolean" == typeof speed || !i && jQuery.isFunction(speed) && jQuery.isFunction(easing) ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback);
        };
    }), jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            // show any hidden elements after setting opacity to 0
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                // Operate on a copy of prop so per-property easing won't be lost
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                // Empty animations resolve immediately
                empty && anim.stop(!0);
            };
            return empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop, stop(gotoEnd);
            };
            return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = undefined), 
            clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                var dequeue = !0, index = null != type && type + "queueHooks", timers = jQuery.timers, data = jQuery._data(this);
                if (index) data[index] && data[index].stop && stopQueue(data[index]); else for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--; ) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), 
                dequeue = !1, timers.splice(index, 1));
                // start the next in the queue if the last step wasn't forced
                // timers currently will call their complete callbacks, which will dequeue
                // but only if they were gotoEnd
                (dequeue || !gotoEnd) && jQuery.dequeue(this, type);
            });
        }
    }), // Generate shortcuts for custom animations
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    }), jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        // normalize opt.queue - true/undefined/null -> "fx"
        // Queueing
        return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, 
        (null == opt.queue || opt.queue === !0) && (opt.queue = "fx"), opt.old = opt.complete, 
        opt.complete = function() {
            jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue);
        }, opt;
    }, jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
        }
    }, jQuery.timers = [], jQuery.fx = Tween.prototype.init, jQuery.fx.tick = function() {
        for (var timer, timers = jQuery.timers, i = 0; i < timers.length; i++) timer = timers[i], 
        // Checks the timer has not already been removed
        timer() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop();
    }, jQuery.fx.timer = function(timer) {
        timer() && jQuery.timers.push(timer) && !timerId && (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval));
    }, jQuery.fx.interval = 13, jQuery.fx.stop = function() {
        clearInterval(timerId), timerId = null;
    }, jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        // Default speed
        _default: 400
    }, // Back Compat <1.8 extension point
    jQuery.fx.step = {}, jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    });
    var rroot = /^(?:body|html)$/i;
    jQuery.fn.offset = function(options) {
        if (arguments.length) return options === undefined ? this : this.each(function(i) {
            jQuery.offset.setOffset(this, options, i);
        });
        var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft, box = {
            top: 0,
            left: 0
        }, elem = this[0], doc = elem && elem.ownerDocument;
        if (doc) // Make sure it's not a disconnected DOM node
        // If we don't have gBCR, just use 0,0 rather than error
        // BlackBerry 5, iOS 3 (original iPhone)
        return (body = doc.body) === elem ? jQuery.offset.bodyOffset(elem) : (docElem = doc.documentElement, 
        jQuery.contains(docElem, elem) ? ("undefined" != typeof elem.getBoundingClientRect && (box = elem.getBoundingClientRect()), 
        win = getWindow(doc), clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0, 
        scrollTop = win.pageYOffset || docElem.scrollTop, scrollLeft = win.pageXOffset || docElem.scrollLeft, 
        {
            top: box.top + scrollTop - clientTop,
            left: box.left + scrollLeft - clientLeft
        }) : box);
    }, jQuery.offset = {
        bodyOffset: function(body) {
            var top = body.offsetTop, left = body.offsetLeft;
            return jQuery.support.doesNotIncludeMarginInBodyOffset && (top += parseFloat(jQuery.css(body, "marginTop")) || 0, 
            left += parseFloat(jQuery.css(body, "marginLeft")) || 0), {
                top: top,
                left: left
            };
        },
        setOffset: function(elem, options, i) {
            var position = jQuery.css(elem, "position");
            // set position first, in-case top/left are set even on static elem
            "static" === position && (elem.style.position = "relative");
            var curTop, curLeft, curElem = jQuery(elem), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && jQuery.inArray("auto", [ curCSSTop, curCSSLeft ]) > -1, props = {}, curPosition = {};
            // need to be able to calculate position if either top or left is auto and position is either absolute or fixed
            calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, 
            curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), 
            jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), 
            null != options.left && (props.left = options.left - curOffset.left + curLeft), 
            "using" in options ? options.using.call(elem, props) : curElem.css(props);
        }
    }, jQuery.fn.extend({
        position: function() {
            if (this[0]) {
                var elem = this[0], // Get *real* offsetParent
                offsetParent = this.offsetParent(), // Get correct offsets
                offset = this.offset(), parentOffset = rroot.test(offsetParent[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : offsetParent.offset();
                // Subtract the two offsets
                // Subtract element margins
                // note: when an element has margin: auto the offsetLeft and marginLeft
                // are the same in Safari causing offset.left to incorrectly be 0
                // Add offsetParent borders
                return offset.top -= parseFloat(jQuery.css(elem, "marginTop")) || 0, offset.left -= parseFloat(jQuery.css(elem, "marginLeft")) || 0, 
                parentOffset.top += parseFloat(jQuery.css(offsetParent[0], "borderTopWidth")) || 0, 
                parentOffset.left += parseFloat(jQuery.css(offsetParent[0], "borderLeftWidth")) || 0, 
                {
                    top: offset.top - parentOffset.top,
                    left: offset.left - parentOffset.left
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent || document.body; offsetParent && !rroot.test(offsetParent.nodeName) && "static" === jQuery.css(offsetParent, "position"); ) offsetParent = offsetParent.offsetParent;
                return offsetParent || document.body;
            });
        }
    }), // Create scrollLeft and scrollTop methods
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return jQuery.access(this, function(elem, method, val) {
                var win = getWindow(elem);
                return val === undefined ? win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method] : void (win ? win.scrollTo(top ? jQuery(win).scrollLeft() : val, top ? val : jQuery(win).scrollTop()) : elem[method] = val);
            }, method, val, arguments.length, null);
        };
    }), // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            // margin is only for outerHeight, outerWidth
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin), extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                return jQuery.access(this, function(elem, type, value) {
                    var doc;
                    // Get document width or height
                    // Get width or height on the element, requesting but not forcing parseFloat
                    // Set width or height on the element
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, 
                    Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : value === undefined ? jQuery.css(elem, type, value, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : undefined, chainable, null);
            };
        });
    }), // Expose jQuery to the global object
    window.jQuery = window.$ = jQuery, // Expose jQuery as an AMD module, but only for AMD loaders that
    // understand the issues with loading multiple versions of jQuery
    // in a page that all might call define(). The loader will indicate
    // they have special allowances for multiple jQuery versions by
    // specifying define.amd.jQuery = true. Register as a named module,
    // since jQuery can be concatenated with other files that may use define,
    // but not use a proper concatenation script that understands anonymous
    // AMD modules. A named AMD is safest and most robust way to register.
    // Lowercase jquery is used because AMD module names are derived from
    // file names, and jQuery is normally delivered in a lowercase file name.
    // Do this after creating the global so that if an AMD module wants to call
    // noConflict to hide this version of jQuery, it will work.
    "function" == typeof define && define.amd && define.amd.jQuery && define("jquery/1/jquery", [], function() {
        return jQuery;
    });
}(window), window.Modernizr = function(e, t, n) {
    function r(e) {
        b.cssText = e;
    }
    function o(e, t) {
        return r(S.join(e + ";") + (t || ""));
    }
    function a(e, t) {
        return typeof e === t;
    }
    function i(e, t) {
        return !!~("" + e).indexOf(t);
    }
    function c(e, t) {
        for (var r in e) {
            var o = e[r];
            if (!i(o, "-") && b[o] !== n) return "pfx" == t ? o : !0;
        }
        return !1;
    }
    function u(e, t, r) {
        for (var o in e) {
            var i = t[e[o]];
            if (i !== n) return r === !1 ? e[o] : a(i, "function") ? i.bind(r || t) : i;
        }
        return !1;
    }
    function s(e, t, n) {
        var r = e.charAt(0).toUpperCase() + e.slice(1), o = (e + " " + k.join(r + " ") + r).split(" ");
        return a(t, "string") || a(t, "undefined") ? c(o, t) : (o = (e + " " + T.join(r + " ") + r).split(" "), 
        u(o, t, n));
    }
    function l() {
        p.input = function(n) {
            for (var r = 0, o = n.length; o > r; r++) j[n[r]] = !!(n[r] in E);
            return j.list && (j.list = !(!t.createElement("datalist") || !e.HTMLDataListElement)), 
            j;
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), 
        p.inputtypes = function(e) {
            for (var r, o, a, i = 0, c = e.length; c > i; i++) E.setAttribute("type", o = e[i]), 
            r = "text" !== E.type, r && (E.value = x, E.style.cssText = "position:absolute;visibility:hidden;", 
            /^range$/.test(o) && E.style.WebkitAppearance !== n ? (g.appendChild(E), a = t.defaultView, 
            r = a.getComputedStyle && "textfield" !== a.getComputedStyle(E, null).WebkitAppearance && 0 !== E.offsetHeight, 
            g.removeChild(E)) : /^(search|tel)$/.test(o) || (r = /^(url|email)$/.test(o) ? E.checkValidity && E.checkValidity() === !1 : E.value != x)), 
            P[e[i]] = !!r;
            return P;
        }("search tel url email datetime date month week time datetime-local number range color".split(" "));
    }
    var f, d, m = "2.6.2", p = {}, h = !0, g = t.documentElement, v = "modernizr", y = t.createElement(v), b = y.style, E = t.createElement("input"), x = ":)", w = {}.toString, S = " -webkit- -moz- -o- -ms- ".split(" "), C = "Webkit Moz O ms", k = C.split(" "), T = C.toLowerCase().split(" "), N = {
        svg: "http://www.w3.org/2000/svg"
    }, M = {}, P = {}, j = {}, $ = [], D = $.slice, F = function(e, n, r, o) {
        var a, i, c, u, s = t.createElement("div"), l = t.body, f = l || t.createElement("body");
        if (parseInt(r, 10)) for (;r--; ) c = t.createElement("div"), c.id = o ? o[r] : v + (r + 1), 
        s.appendChild(c);
        return a = [ "&#173;", '<style id="s', v, '">', e, "</style>" ].join(""), s.id = v, 
        (l ? s : f).innerHTML += a, f.appendChild(s), l || (f.style.background = "", f.style.overflow = "hidden", 
        u = g.style.overflow, g.style.overflow = "hidden", g.appendChild(f)), i = n(s, e), 
        l ? s.parentNode.removeChild(s) : (f.parentNode.removeChild(f), g.style.overflow = u), 
        !!i;
    }, z = function(t) {
        var n = e.matchMedia || e.msMatchMedia;
        if (n) return n(t).matches;
        var r;
        return F("@media " + t + " { #" + v + " { position: absolute; } }", function(t) {
            r = "absolute" == (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).position;
        }), r;
    }, A = function() {
        function e(e, o) {
            o = o || t.createElement(r[e] || "div"), e = "on" + e;
            var i = e in o;
            return i || (o.setAttribute || (o = t.createElement("div")), o.setAttribute && o.removeAttribute && (o.setAttribute(e, ""), 
            i = a(o[e], "function"), a(o[e], "undefined") || (o[e] = n), o.removeAttribute(e))), 
            o = null, i;
        }
        var r = {
            select: "input",
            change: "input",
            submit: "form",
            reset: "form",
            error: "img",
            load: "img",
            abort: "img"
        };
        return e;
    }(), L = {}.hasOwnProperty;
    d = a(L, "undefined") || a(L.call, "undefined") ? function(e, t) {
        return t in e && a(e.constructor.prototype[t], "undefined");
    } : function(e, t) {
        return L.call(e, t);
    }, Function.prototype.bind || (Function.prototype.bind = function(e) {
        var t = this;
        if ("function" != typeof t) throw new TypeError();
        var n = D.call(arguments, 1), r = function() {
            if (this instanceof r) {
                var o = function() {};
                o.prototype = t.prototype;
                var a = new o(), i = t.apply(a, n.concat(D.call(arguments)));
                return Object(i) === i ? i : a;
            }
            return t.apply(e, n.concat(D.call(arguments)));
        };
        return r;
    }), M.flexbox = function() {
        return s("flexWrap");
    }, M.flexboxlegacy = function() {
        return s("boxDirection");
    }, M.canvas = function() {
        var e = t.createElement("canvas");
        return !(!e.getContext || !e.getContext("2d"));
    }, M.canvastext = function() {
        return !(!p.canvas || !a(t.createElement("canvas").getContext("2d").fillText, "function"));
    }, M.webgl = function() {
        return !!e.WebGLRenderingContext;
    }, M.touch = function() {
        var n;
        return "ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch ? n = !0 : F([ "@media (", S.join("touch-enabled),("), v, ")", "{#modernizr{top:9px;position:absolute}}" ].join(""), function(e) {
            n = 9 === e.offsetTop;
        }), n;
    }, M.geolocation = function() {
        return "geolocation" in navigator;
    }, M.postmessage = function() {
        return !!e.postMessage;
    }, M.websqldatabase = function() {
        return !!e.openDatabase;
    }, M.indexedDB = function() {
        return !!s("indexedDB", e);
    }, M.hashchange = function() {
        return A("hashchange", e) && (t.documentMode === n || t.documentMode > 7);
    }, M.history = function() {
        return !(!e.history || !history.pushState);
    }, M.draganddrop = function() {
        var e = t.createElement("div");
        return "draggable" in e || "ondragstart" in e && "ondrop" in e;
    }, M.websockets = function() {
        return "WebSocket" in e || "MozWebSocket" in e;
    }, M.rgba = function() {
        return r("background-color:rgba(150,255,150,.5)"), i(b.backgroundColor, "rgba");
    }, M.hsla = function() {
        return r("background-color:hsla(120,40%,100%,.5)"), i(b.backgroundColor, "rgba") || i(b.backgroundColor, "hsla");
    }, M.multiplebgs = function() {
        return r("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(b.background);
    }, M.backgroundsize = function() {
        return s("backgroundSize");
    }, M.borderimage = function() {
        return s("borderImage");
    }, M.borderradius = function() {
        return s("borderRadius");
    }, M.boxshadow = function() {
        return s("boxShadow");
    }, M.textshadow = function() {
        return "" === t.createElement("div").style.textShadow;
    }, M.opacity = function() {
        return o("opacity:.55"), /^0.55$/.test(b.opacity);
    }, M.cssanimations = function() {
        return s("animationName");
    }, M.csscolumns = function() {
        return s("columnCount");
    }, M.cssgradients = function() {
        var e = "background-image:", t = "gradient(linear,left top,right bottom,from(#9f9),to(white));", n = "linear-gradient(left top,#9f9, white);";
        return r((e + "-webkit- ".split(" ").join(t + e) + S.join(n + e)).slice(0, -e.length)), 
        i(b.backgroundImage, "gradient");
    }, M.cssreflections = function() {
        return s("boxReflect");
    }, M.csstransforms = function() {
        return !!s("transform");
    }, M.csstransforms3d = function() {
        var e = !!s("perspective");
        return e && "webkitPerspective" in g.style && F("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(t) {
            e = 9 === t.offsetLeft && 3 === t.offsetHeight;
        }), e;
    }, M.csstransitions = function() {
        return s("transition");
    }, M.fontface = function() {
        var e;
        return F('@font-face {font-family:"font";src:url("https://")}', function(n, r) {
            var o = t.getElementById("smodernizr"), a = o.sheet || o.styleSheet, i = a ? a.cssRules && a.cssRules[0] ? a.cssRules[0].cssText : a.cssText || "" : "";
            e = /src/i.test(i) && 0 === i.indexOf(r.split(" ")[0]);
        }), e;
    }, M.generatedcontent = function() {
        var e;
        return F([ "#", v, "{font:0/0 a}#", v, ':after{content:"', x, '";visibility:hidden;font:3px/1 a}' ].join(""), function(t) {
            e = t.offsetHeight >= 3;
        }), e;
    }, M.video = function() {
        var e = t.createElement("video"), n = !1;
        try {
            (n = !!e.canPlayType) && (n = new Boolean(n), n.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), 
            n.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), n.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""));
        } catch (r) {}
        return n;
    }, M.audio = function() {
        var e = t.createElement("audio"), n = !1;
        try {
            (n = !!e.canPlayType) && (n = new Boolean(n), n.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), 
            n.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, ""), n.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), 
            n.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""));
        } catch (r) {}
        return n;
    }, M.localstorage = function() {
        try {
            return localStorage.setItem(v, v), localStorage.removeItem(v), !0;
        } catch (e) {
            return !1;
        }
    }, M.sessionstorage = function() {
        try {
            return sessionStorage.setItem(v, v), sessionStorage.removeItem(v), !0;
        } catch (e) {
            return !1;
        }
    }, M.webworkers = function() {
        return !!e.Worker;
    }, M.applicationcache = function() {
        return !!e.applicationCache;
    }, M.svg = function() {
        return !!t.createElementNS && !!t.createElementNS(N.svg, "svg").createSVGRect;
    }, M.inlinesvg = function() {
        var e = t.createElement("div");
        return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) == N.svg;
    }, M.smil = function() {
        return !!t.createElementNS && /SVGAnimate/.test(w.call(t.createElementNS(N.svg, "animate")));
    }, M.svgclippaths = function() {
        return !!t.createElementNS && /SVGClipPath/.test(w.call(t.createElementNS(N.svg, "clipPath")));
    };
    for (var H in M) d(M, H) && (f = H.toLowerCase(), p[f] = M[H](), $.push((p[f] ? "" : "no-") + f));
    return p.input || l(), p.addTest = function(e, t) {
        if ("object" == typeof e) for (var r in e) d(e, r) && p.addTest(r, e[r]); else {
            if (e = e.toLowerCase(), p[e] !== n) return p;
            t = "function" == typeof t ? t() : t, "undefined" != typeof h && h && (g.className += " " + (t ? "" : "no-") + e), 
            p[e] = t;
        }
        return p;
    }, r(""), y = E = null, function(e, t) {
        function n(e, t) {
            var n = e.createElement("p"), r = e.getElementsByTagName("head")[0] || e.documentElement;
            return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild);
        }
        function r() {
            var e = v.elements;
            return "string" == typeof e ? e.split(" ") : e;
        }
        function o(e) {
            var t = g[e[p]];
            return t || (t = {}, h++, e[p] = h, g[h] = t), t;
        }
        function a(e, n, r) {
            if (n || (n = t), l) return n.createElement(e);
            r || (r = o(n));
            var a;
            return a = r.cache[e] ? r.cache[e].cloneNode() : m.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() : r.createElem(e), 
            a.canHaveChildren && !d.test(e) ? r.frag.appendChild(a) : a;
        }
        function i(e, n) {
            if (e || (e = t), l) return e.createDocumentFragment();
            n = n || o(e);
            for (var a = n.frag.cloneNode(), i = 0, c = r(), u = c.length; u > i; i++) a.createElement(c[i]);
            return a;
        }
        function c(e, t) {
            t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, 
            t.frag = t.createFrag()), e.createElement = function(n) {
                return v.shivMethods ? a(n, e, t) : t.createElem(n);
            }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/\w+/g, function(e) {
                return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")';
            }) + ");return n}")(v, t.frag);
        }
        function u(e) {
            e || (e = t);
            var r = o(e);
            return !v.shivCSS || s || r.hasCSS || (r.hasCSS = !!n(e, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), 
            l || c(e, r), e;
        }
        var s, l, f = e.html5 || {}, d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, m = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, p = "_html5shiv", h = 0, g = {};
        !function() {
            try {
                var e = t.createElement("a");
                e.innerHTML = "<xyz></xyz>", s = "hidden" in e, l = 1 == e.childNodes.length || function() {
                    t.createElement("a");
                    var e = t.createDocumentFragment();
                    return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement;
                }();
            } catch (n) {
                s = !0, l = !0;
            }
        }();
        var v = {
            elements: f.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
            shivCSS: f.shivCSS !== !1,
            supportsUnknownElements: l,
            shivMethods: f.shivMethods !== !1,
            type: "default",
            shivDocument: u,
            createElement: a,
            createDocumentFragment: i
        };
        e.html5 = v, u(t);
    }(this, t), p._version = m, p._prefixes = S, p._domPrefixes = T, p._cssomPrefixes = k, 
    p.mq = z, p.hasEvent = A, p.testProp = function(e) {
        return c([ e ]);
    }, p.testAllProps = s, p.testStyles = F, p.prefixed = function(e, t, n) {
        return t ? s(e, t, n) : s(e, "pfx");
    }, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (h ? " js " + $.join(" ") : ""), 
    p;
}(this, this.document), function($) {
    $.xLazyLoader = function(method, options) {
        "object" == typeof method && (options = method, method = "load"), xLazyLoader[method](options);
    };
    var xLazyLoader = new function() {
        var head = document.getElementsByTagName("head")[0];
        this.load = function(options) {
            function each(type, urls) {
                $.isArray(urls) && urls.length > 0 ? $.each(urls, function(i, url) {
                    load(type, url);
                }) : "string" == typeof urls && load(type, urls);
            }
            function load(type, url) {
                self[type](url, function() {
                    $.isArray(d[type]) ? loaded[type].push(url) : loaded[type] = url, d.js.length == loaded.js.length && d.css.length == loaded.css.length && d.image.length == loaded.image.length && d.load.apply(loaded, []);
                }, d.name ? "lazy-loaded-" + d.name : "lazy-loaded-" + new Date().getTime());
            }
            //Defaults
            var d = {
                js: [],
                css: [],
                image: [],
                name: null,
                load: function() {}
            };
            $.extend(d, options);
            var self = this, loaded = {
                js: [],
                css: [],
                image: []
            };
            each("js", d.js), each("css", d.css), each("image", d.image);
        }, this.js = function(src, callback, name) {
            if ($('script[src*="' + src + '"]').length > 0) return void callback();
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript"), script.setAttribute("src", src), 
            script.setAttribute("id", name), $.browser.msie ? script.onreadystatechange = function() {
                /loaded|complete/.test(script.readyState) && callback();
            } : //FF, Safari, Opera
            script.onload = callback, head.appendChild(script);
        }, this.css = function(href, callback, name) {
            if ($('link[href*="' + href + '"]').length > 0) return void callback();
            var link = $('<link rel="stylesheet" type="text/css" media="all" href="' + href + '" id="' + name + '"></link>')[0];
            $.browser.msie ? link.onreadystatechange = function() {
                ("loaded" == link.readyState || "complete" == link.readyState) && (link.onreadystatechange = null, 
                callback());
            } : $.browser.opera ? link.onload = callback : //FF, Safari, Chrome
            function() {
                try {
                    link.sheet.cssRule;
                } catch (e) {
                    return void setTimeout(arguments.callee, 20);
                }
                callback();
            }(), head.appendChild(link);
        }, this.image = function(src, callback) {
            var img = new Image();
            img.onload = callback, img.src = src;
        }, this.disable = function(name) {
            $("#lazy-loaded-" + name, head).attr("disabled", "disabled");
        }, this.enable = function(name) {
            $("#lazy-loaded-" + name, head).removeAttr("disabled");
        }, this.destroy = function(name) {
            $("#lazy-loaded-" + name, head).remove();
        };
    }();
}(jQuery);



/*! webmd.core */
// REQUIRES: jquery.js, jquery.xLazyLoader.js
// Check that image_server_url is defined, if not, set it to live
// define blank strings that are not defined earlier or will not be defined later
// used to prevent the sl() function from crashing
var webmd, image_server_url = window.image_server_url || location.protocol + "//img.webmd.com/dtmcms/live", s_business_reference = window.s_business_reference || "", s_furl = window.s_furl || "", s_package_type = window.s_package_type || "", s_package_name = window.s_package_name || "", s_sponsor_program = window.s_sponsor_program || "";

// Create the global webmd object if it doesn't already exist.
// There is a chance that some other code has already created the webmd object,
// so we need to avoid overwriting the object.
webmd || (/**
	 * @namespace Main namespace for all WebMD code.
	 */
webmd = {}), webmd.p || (/**
	 * @namespace Namespace for pages or projects.
	 * Each project can create an object here, such as webmd.p.answers
	 */
webmd.p = {}), webmd.m || (/**
	 * @namespace Namespace for modules that can be used across multiple projects.
	 * Each module can create an object here, such as webmd.m.newsletterForm
	 */
webmd.m = {}), $.extend(webmd, /** @lends webmd */ {
    /**
	 * Load js, css, and img on-demand and call your callback when done
	 *
	 * <p>This is a wrapper for xLazyLoader plugin.
	 * <a href="https://github.com/kof/xLazyLoader/blob/master/src/jquery.xLazyLoader.js">
	 * https://github.com/kof/xLazyLoader/blob/master/src/jquery.xLazyLoader.js</a></p>
	 *
	 * @example
	 * load({js:'file.js'});
	 *
	 * @example
	 * load({js:['file1.js','file2.js'],css:'file.css'});
	 *
	 * @example
	 * load({js:'file.js'},{callback:myCallbackFunction});
	 *
	 * @example
	 * load({js:'file.js'},{callback:function(){ alert('loaded!'); });
	 */
    load: function(method, options) {
        return $.xLazyLoader(method, options);
    },
    /**
	 * Substitute object values into a string.
	 *
	 * @param {String} template Template string with object keys surrounded by {}
	 * @param {Object} o Key:value pairs to substitute in the string.
	 * @param {Boolean} [removeUnmatchedKeys=false] Set this true if you want to remove {key} from the template if it is not found in the object.
	 * 
	 * @example
	 * s = substitute("Hello {first} {last}!", {first:'Joe', last:'Smith'});
	 */
    substitute: function(s, o, removeUnmatchedKeys) {
        return s.replace(/\{([^{}]*)\}/g, function(a, b) {
            var val, r = webmd.object.get(b, o);
            // If the object has a member that matches the template marker,
            // and the member is a string or a number, then insert it in the template.
            return val = "string" == typeof r || "number" == typeof r ? r : removeUnmatchedKeys ? "" : a;
        });
    },
    /**
	 * Encode a string so it is safe to display as text.
	 *
	 * If you are immediately adding the text to the page, use jQuery's text() method instead of this.
	 *
	 * @returns {String} Encoded text
	 *
	 * @param {String} text Text to encode
	 *
	 * @example
	 * s = webmd.htmlEncode('&lt;p&gt;Hello!');
	 * // s === '&amp;lt;p&amp;gt;Hello!'
	 */
    htmlEncode: function(s) {
        return s.replace(/\&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\"/g, "&quot;");
    },
    /**
	 * Encode a string so it is safe to use within a regular expression.
	 *
	 * <p>In some cases you need to put unknown text within a regular expression (RE).
	 * This might cause the RE to break if the text contains any
	 * of the special RE characters such as .*()/
	 * </p>
	 *
	 * This function encodes those special characters so you can use them safely within the RE.
	 *
	 * @returns {String} Encoded text
	 *
	 * @param {String} text Text to encode
	 *
	 * @example
	 * re = new RegExp('^Name: ' + webmd.reEncode(value));
	 */
    reEncode: function(s) {
        return s.replace(/([.*+?|(){}\[\]\\])/g, "\\$1");
    },
    /**
	 * Open a new browser window with various options, and give focus to the window.
	 *
	 * @returns {Window|null} The Window object that was opened, or null if the window was not opened successfully.
	 *
	 * @param {String} url URL to open
	 * @param {Object} [options] Options for opening the window
	 * @param {Boolean} [options.focus=true] After creating the window, give window focus to ensure it pops to top.
	 * @param {String} [options.name=""] Give the window a name
	 * @param {Boolean} [options.standard=false] If you set this to true, then we will start with a "standard" list of window options.
	 * <p>The standard options are as follows:</p>
	 * <ul>
	 * <li>location:1</li>
	 * <li>menubar:1</li>
	 * <li>resizable:1</li>
	 * <li>scrollbars:1</li>
	 * <li>status:1</li>
	 * <li>toolbar:1</li>
	 * </ul>
	 * @param {Boolean} [options.xxx] You can specify other window options as part of the options, such as width, height, etc.
	 * <p>For a list of window features refer to:
	 * <a href="https://developer.mozilla.org/En/DOM:window.open">https://developer.mozilla.org/En/DOM:window.open</a></p>
	 * <p>If you define window features, then the features that are not listed might be disabled or removed
	 * (depending on the way various browsers implement these window options).</p>
	 */
    openWindow: function(url, options) {
        var defaults, f, featuresArray, skip, w;
        options || (options = {}), // Set the default options.
        defaults = {
            name: "",
            focus: !0
        }, // If 'standard' options were requested, add the standard window attributes.
        options.standard && (defaults = $.extend(defaults, {
            location: 1,
            // cannot turn this off in modern browsers
            menubar: 1,
            resizable: 1,
            // cannot turn this off in modern browsers
            scrollbars: 1,
            // should not turn this off for accessbility reasons
            status: 1,
            // cannot turn this off in some browsers
            toolbar: 1
        })), // Let the user override the defaults
        options = $.extend(defaults, options), // Options that are not window features and will be stripped out
        skip = {
            name: 1,
            focus: 1,
            standard: 1
        }, // Create the windows feature string.
        featuresArray = [];
        for (f in options) // Prevent looping through object prototype chain
        if (options.hasOwnProperty(f)) {
            // Skip the options that are not window features
            if (skip[f]) continue;
            featuresArray.push(f + "=" + options[f]);
        }
        // Open the window
        return w = window.open(url, options.name, featuresArray.join(",")), options.focus && w && w.focus(), 
        w;
    },
    /**
	 * Create a new object using prototypal inheritance from another object
	 *
	 * <p>This is our standard development pattern for object oriented javascript.
	 * Refer to the following wiki page for example usage:
	 * <a href="http://webservices.webmd.net/wswiki/Javascript-object-oriented-development-pattern.ashx">
	 * http://webservices.webmd.net/wswiki/Javascript-object-oriented-development-pattern.ashx</a></p>
	 *
	 * @namespace Create a new object using prototypal inheritance from another object, plus additional
	 * functions for getting and setting parameters of deep objects.
	 * @function
	 *
	 * @returns {Object} The new object
	 *
	 * @param {Object} obj The object you want to copy and inherit from
	 * @param {Object} [props] List of properties to extend the object.
	 * This can be used to change the values of existing object properties (such as default options),
	 * to override methods of the object, or to extend the object with new properties or methods.
	 *
	 * @example
	 * var o = webmd.object(srcObject);
	 *
	 * @example
	 * // Override one of the parameters
	 * var o = webmd.object(srcObject, {delay:500});
	 *
	 * @example
	 * // Extend the object with a new method
	 * var o = webmd.object(srcObject, {alert:function(){ alert('Hello!'); }});
	 *
	 */
    object: function() {
        // boodman/crockford delegation w/ cornford optimization
        function TMP() {}
        return function(obj, props) {
            TMP.prototype = obj;
            var tmp = new TMP();
            return props && $.extend(tmp, props), tmp;
        };
    }(),
    /**
	 * Create a new jquery plugin that acts as an interface to your webmd.object
	 *
	 * @returns {Object} The new object
	 *
	 * @param {String} name The name of your jQuery plugin. Should start with "webmd" for namespacing. For example, "webmdCounter".
	 * @param {Object} obj The object that will control the plugin.
	 * <p>The object must follow these standards:</p>
	 * <ul>
	 * <li>It must follow the development pattern used for webmd.object() inheritance (singleton object that is inherited by use of webmd.object)</li>
	 * <li>It must have an init() method that accepts two arguments:
	 * <ul>
	 * <li>options {Object} Key/value options for the plugin</li>
	 * <li>el (DOM element) the element to which the object will be attached</li>
	 * </ul>
	 * <p>The init() method will be called the first time you call the plugin on an element.</p>
	 * </ul>
	 *
	 * @example
	 * var myObj = {
	 *    a:5,
	 *    init: function(options, el){
	 *       this.el = $(el);
	 *       return this;
	 *    },
	 *    doSomething: function(n){
	 *      alert('Got number ' + n);
	 *      this.el.addClass('active');
	 *    }
	 * };
	 *
	 * // Create a jquery plugin
	 * webmd.plugin('webmdMyPlugin', myObj);
	 *
	 * // Init the plugin.
	 * // If plugin is already initialized, does nothing.
	 * $('#myid').webmdMyPlugin();
	 *
	 * // Call a method of the plugin object
	 * $('#myid).webmdMyPlugin('doSomething', 5);
	 *
	 * // Get a parameter of the plugin object
	 * $('#myid).webmdMyPlugin('option', a); // returns 10
	 *
	 * // Set an object parameter for the plugin object
	 * $('#myid).webmdMyPlugin('option', a, 10); // sets a to 10
	 */
    plugin: function(name, object) {
        // Create a new jQuery plugin using name
        // The plugin will take an options argument,
        // plus additional arguments can be passed in.
        $.fn[name] = function(options) {
            // Get the additional arguments that might have been passed to the plugin
            var returnValue, // Convert function arguments to a real array
            args = Array.prototype.slice.call(arguments, 1), // Determine if an object or a string was passed in
            initOptions = "string" == typeof options ? {} : options, // For option method we need a variable to store the return value
            doReturn = !1;
            // Return the jQuery object to continue chaining,
            // unless we have to return a value
            // Loop through all the elements that were selected.
            return this.each(function() {
                // Check to see if we have already initialized the plugin on this element.
                // It will be stored in the data attached to the object.
                var instance = $.data(this, name);
                // Check if a method name was supplied, and if so call it
                if (instance || (// Create the object
                instance = webmd.object(object), // Save the object on the element so it can be used later
                $.data(this, name, instance), // Initialize the object, pass in an options object and the element
                instance.init(initOptions, this)), $.isFunction(instance[options])) {
                    // If the method returned a value that is not the object instance,
                    // stop chaining an return the value
                    if (// Call the method
                    returnValue = instance[options].apply(instance, args), void 0 !== returnValue && returnValue !== instance) return doReturn = !0, 
                    !1;
                } else if ("option" === options) {
                    if (!(args.length > 1)) // Get a parameter of the object and return it.
                    // Does not support chaining after a call to get an option.
                    return doReturn = !0, returnValue = instance[args[0]], !1;
                    // Set a parameter of the object
                    instance[args[0]] = args[1];
                }
            }), doReturn ? returnValue : this;
        };
    },
    /**
	 *	Will return a certain number based on the current width of the page. Used for responsive design.
	 * 	@return 	int 	the id of the certain range of widths 
	 */
    getResponsiveWidthType: function() {
        var width = window.innerWidth ? parseInt(window.innerWidth) : parseInt(document.getElementsByTagName("body")[0].parentNode.offsetWidth);
        return 640 > width ? 5 : width > 639 && 768 > width ? 4 : width > 767 && 1024 > width ? 3 : width > 1023 && 1240 > width ? 2 : width > 1239 ? 1 : void 0;
    }
}), // extend webmd
// Add more functions onto webmd.object()
$.extend(webmd.object, /** @lends webmd.object */ {
    /*! BEGIN LICENSE getObject
 * jQuery getObject
 * http://benalman.com/projects/jquery-getobject-plugin/
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 * Inspired by Dojo, which is Copyright (c) 2005-2009, The Dojo Foundation.
 */
    /**
	 * Get a property of an object via dot-delimited name string, and optionally
	 * create the property and any ancestor properties that do not already exist.
	 *
	 * @param {String} name Dot-delimited string representing a property name, for
	 * example: 'document', 'location.href', 'window.open' or 'foo.bar.baz'.
	 * @param {Boolean} [create=false] Create final and intermediate properties if they don't
	 * exist.
	 * @param {Object} [context=window] Optional context in which to evaluate name.
	 * @returns {Object} An object reference or value on success, otherwise undefined.
	 *
	 * @example
	 * var o = webmd.object.get('webmd.m.myObject.data.part');
	 * if (o) { do_something(); }
	 *
	 * @example
	 * var o = webmd.object.get('webmd.m.myObject.data.part', true);
	 * // o is guaranteed to exist because we specified the "create" option
	 *
	 * @example
	 * // Search within the context of a known object
	 * var o = webmd.object.get('myObject.data.part', webmd.m);
	 *
	 */
    get: function(parts, create, obj) {
        var origParts = parts;
        "string" == typeof parts && (parts = parts.split(".")), "boolean" != typeof create && (obj = create, 
        create = void 0), obj = obj || window;
        var p;
        //first, check if the value exists as a string i.e. obj['a.b']
        if (void 0 !== obj[origParts]) obj = obj[origParts]; else //otherwise, iterate through the split parts
        for (;obj && parts.length; ) p = parts.shift(), void 0 === obj[p] && create && (obj[p] = {}), 
        obj = obj[p];
        return obj;
    },
    /**
	 * Set a property of an object via dot-delimited name string, creating any
	 * ancestor properties that do not already exist.
	 *
	 * @param {String} name Dot-delimited string representing a property name, for
	 * example: 'document', 'location.href', 'window.open' or 'foo.bar.baz'.
	 * @param {expression} value Any valid JavaScript expression.
	 * @param {Object} [context=window] Optional context in which to evaluate name.
	 *
	 * @returns {expression} The value if set successfully, otherwise undefined.
	 */
    set: function(name, value, context) {
        var parts = name.split("."), prop = parts.pop(), obj = this.get(parts, !0, context);
        // Only return the value if it is set successfully.
        return obj && "object" == typeof obj && prop ? obj[prop] = value : void 0;
    },
    /**
	 * Using dot-delimited name string, return whether a property of an object
	 * exists.
	 *
	 * @param {String} name Dot-delimited string representing a property name, for
	 * example: 'document', 'location.href', 'window.open' or 'foo.bar.baz'.
	 * @param {Object} [context=window] Optional context in which to evaluate name.
	 *
	 * @returns {Boolean} Whether or not the property exists.
	 */
    exists: function(name, context) {
        return void 0 !== this.get(name, context);
    }
}), // extend webmd.object
// Prevent document.write from running after document load
// (and breaking the page)
$(function() {
    window.document.write = function(s) {
        throw "INVALID document.write: " + s;
    };
});

/*!* vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.0.6 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, jQuery, setTimeout, opera */
var requirejs, require, define;

!function(global) {
    function isFunction(it) {
        return "[object Function]" === ostring.call(it);
    }
    function isArray(it) {
        return "[object Array]" === ostring.call(it);
    }
    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length && (!ary[i] || !func(ary[i], i, ary)); i += 1) ;
        }
    }
    /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1 && (!ary[i] || !func(ary[i], i, ary)); i -= 1) ;
        }
    }
    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }
    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) if (obj.hasOwnProperty(prop) && func(obj[prop], prop)) break;
    }
    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     * This is not robust in IE for transferring methods that match
     * Object.prototype names, but the uses of mixin here seem unlikely to
     * trigger a problem related to that.
     */
    function mixin(target, source, force, deepStringMixin) {
        return source && eachProp(source, function(value, prop) {
            (force || !hasProp(target, prop)) && (deepStringMixin && "string" != typeof value ? (target[prop] || (target[prop] = {}), 
            mixin(target[prop], value, force, deepStringMixin)) : target[prop] = value);
        }), target;
    }
    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(obj, fn) {
        return function() {
            return fn.apply(obj, arguments);
        };
    }
    function scripts() {
        return document.getElementsByTagName("script");
    }
    //Allow getting a global that expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(value) {
        if (!value) return value;
        var g = global;
        return each(value.split("."), function(part) {
            g = g[part];
        }), g;
    }
    function makeContextModuleFunc(func, relMap, enableBuildCallback) {
        return function() {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            var lastArg, args = aps.call(arguments, 0);
            return enableBuildCallback && isFunction(lastArg = args[args.length - 1]) && (lastArg.__requireJsBuild = !0), 
            args.push(relMap), func.apply(null, args);
        };
    }
    function addRequireMethods(req, context, relMap) {
        each([ [ "toUrl" ], [ "undef" ], [ "defined", "requireDefined" ], [ "specified", "requireSpecified" ] ], function(item) {
            var prop = item[1] || item[0];
            req[item[0]] = context ? makeContextModuleFunc(context[prop], relMap) : //If no context, then use default context. Reference from
            //contexts instead of early binding to default context, so
            //that during builds, the latest instance of the default
            //context with its config gets used.
            function() {
                var ctx = contexts[defContextName];
                return ctx[prop].apply(ctx, arguments);
            };
        });
    }
    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + "\nhttp://requirejs.org/docs/errors.html#" + id);
        return e.requireType = id, e.requireModules = requireModules, err && (e.originalError = err), 
        e;
    }
    function newContext(contextName) {
        /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
        function trimDots(ary) {
            var i, part;
            for (i = 0; ary[i]; i += 1) if (part = ary[i], "." === part) ary.splice(i, 1), i -= 1; else if (".." === part) {
                if (1 === i && (".." === ary[2] || ".." === ary[0])) //End of the line. Keep at least one non-dot
                //path segment at the front so it can be mapped
                //correctly to disk. Otherwise, there is likely
                //no path mapping for a path starting with '..'.
                //This can still fail, but catches the most reasonable
                //uses of ..
                break;
                i > 0 && (ary.splice(i - 1, 2), i -= 2);
            }
        }
        /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
        function normalize(name, baseName, applyMap) {
            var pkgName, pkgConfig, mapValue, nameParts, i, j, nameSegment, foundMap, foundI, foundStarMap, starI, baseParts = baseName && baseName.split("/"), normalizedBaseParts = baseParts, map = config.map, starMap = map && map["*"];
            //Apply map config if available.
            if (//Adjust any relative paths.
            name && "." === name.charAt(0) && (//If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            baseName ? (//If the baseName is a package name, then just treat it as one
            //name to concat the name with.
            normalizedBaseParts = config.pkgs[baseName] ? baseParts = [ baseName ] : baseParts.slice(0, baseParts.length - 1), 
            name = normalizedBaseParts.concat(name.split("/")), trimDots(name), //Some use of packages may use a . path to reference the
            //'main' module name, so normalize for that.
            pkgConfig = config.pkgs[pkgName = name[0]], name = name.join("/"), pkgConfig && name === pkgName + "/" + pkgConfig.main && (name = pkgName)) : 0 === name.indexOf("./") && (// No baseName, so this is ID is resolved relative
            // to baseUrl, pull off the leading dot.
            name = name.substring(2))), applyMap && (baseParts || starMap) && map) {
                for (nameParts = name.split("/"), i = nameParts.length; i > 0; i -= 1) {
                    if (nameSegment = nameParts.slice(0, i).join("/"), baseParts) //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) //baseName segment has config, find if it has one for
                    //this name.
                    if (mapValue = map[baseParts.slice(0, j).join("/")], mapValue && (mapValue = mapValue[nameSegment])) {
                        //Match, update name to the new value.
                        foundMap = mapValue, foundI = i;
                        break;
                    }
                    if (foundMap) break;
                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    !foundStarMap && starMap && starMap[nameSegment] && (foundStarMap = starMap[nameSegment], 
                    starI = i);
                }
                !foundMap && foundStarMap && (foundMap = foundStarMap, foundI = starI), foundMap && (nameParts.splice(0, foundI, foundMap), 
                name = nameParts.join("/"));
            }
            return name;
        }
        function removeScript(name) {
            isBrowser && each(scripts(), function(scriptNode) {
                return scriptNode.getAttribute("data-requiremodule") === name && scriptNode.getAttribute("data-requirecontext") === context.contextName ? (scriptNode.parentNode.removeChild(scriptNode), 
                !0) : void 0;
            });
        }
        function hasPathFallback(id) {
            var pathConfig = config.paths[id];
            //Pop off the first array value, since it failed, and
            //retry
            return pathConfig && isArray(pathConfig) && pathConfig.length > 1 ? (removeScript(id), 
            pathConfig.shift(), context.undef(id), context.require([ id ]), !0) : void 0;
        }
        /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, index = name ? name.indexOf("!") : -1, prefix = null, parentName = parentModuleMap ? parentModuleMap.name : null, originalName = name, isDefine = !0, normalizedName = "";
            //If no name, then it means it is a require call, generate an
            //internal name.
            //Account for relative paths if there is a base name.
            //Plugin is loaded, use its normalize method.
            //A regular module.
            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            return name || (isDefine = !1, name = "_@r" + (requireCounter += 1)), -1 !== index && (prefix = name.substring(0, index), 
            name = name.substring(index + 1, name.length)), prefix && (prefix = normalize(prefix, parentName, applyMap), 
            pluginModule = defined[prefix]), name && (prefix ? normalizedName = pluginModule && pluginModule.normalize ? pluginModule.normalize(name, function(name) {
                return normalize(name, parentName, applyMap);
            }) : normalize(name, parentName, applyMap) : (normalizedName = normalize(name, parentName, applyMap), 
            url = context.nameToUrl(normalizedName))), suffix = !prefix || pluginModule || isNormalized ? "" : "_unnormalized" + (unnormalizedCounter += 1), 
            {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ? prefix + "!" + normalizedName : normalizedName) + suffix
            };
        }
        function getModule(depMap) {
            var id = depMap.id, mod = registry[id];
            return mod || (mod = registry[id] = new context.Module(depMap)), mod;
        }
        function on(depMap, name, fn) {
            var id = depMap.id, mod = registry[id];
            !hasProp(defined, id) || mod && !mod.defineEmitComplete ? getModule(depMap).on(name, fn) : "defined" === name && fn(defined[id]);
        }
        function onError(err, errback) {
            var ids = err.requireModules, notified = !1;
            errback ? errback(err) : (each(ids, function(id) {
                var mod = registry[id];
                mod && (//Set error on module, so it skips timeout checks.
                mod.error = err, mod.events.error && (notified = !0, mod.emit("error", err)));
            }), notified || req.onError(err));
        }
        /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
        function takeGlobalQueue() {
            //Push all the globalDefQueue items into the context's defQueue
            globalDefQueue.length && (//Array splice in the values since the context code has a
            //local var ref to defQueue, so cannot just reassign the one
            //on context.
            apsp.apply(defQueue, [ defQueue.length - 1, 0 ].concat(globalDefQueue)), globalDefQueue = []);
        }
        /**
         * Helper function that creates a require function object to give to
         * modules that ask for it as a dependency. It needs to be specific
         * per module because of the implication of path mappings that may
         * need to be relative to the module name.
         */
        function makeRequire(mod, enableBuildCallback, altRequire) {
            var relMap = mod && mod.map, modRequire = makeContextModuleFunc(altRequire || context.require, relMap, enableBuildCallback);
            return addRequireMethods(modRequire, context, relMap), modRequire.isBrowser = isBrowser, 
            modRequire;
        }
        function removeWaiting(id) {
            //Clean up machinery used for waiting modules.
            delete registry[id], each(waitAry, function(mod, i) {
                return mod.map.id === id ? (waitAry.splice(i, 1), mod.defined || (context.waitCount -= 1), 
                !0) : void 0;
            });
        }
        function findCycle(mod, traced, processed) {
            var foundModule, id = mod.map.id, depArray = mod.depMaps;
            //Do not bother with unitialized modules or not yet enabled
            //modules.
            if (mod.inited) //Found the cycle.
            //Found the cycle.
            //Trace through the dependencies.
            return traced[id] ? mod : (traced[id] = !0, each(depArray, function(depMap) {
                var depId = depMap.id, depMod = registry[depId];
                if (depMod && !processed[depId] && depMod.inited && depMod.enabled) return foundModule = findCycle(depMod, traced, processed);
            }), processed[id] = !0, foundModule);
        }
        function forceExec(mod, traced, uninited) {
            var id = mod.map.id, depArray = mod.depMaps;
            if (mod.inited && mod.map.isDefine) return traced[id] ? defined[id] : (traced[id] = mod, 
            each(depArray, function(depMap) {
                var value, depId = depMap.id, depMod = registry[depId];
                if (!handlers[depId] && depMod) {
                    if (!depMod.inited || !depMod.enabled) //Dependency is not inited,
                    //so this module cannot be
                    //given a forced value yet.
                    return void (uninited[id] = !0);
                    //Get the value for the current dependency
                    value = forceExec(depMod, traced, uninited), //Even with forcing it may not be done,
                    //in particular if the module is waiting
                    //on a plugin resource.
                    uninited[depId] || mod.defineDepById(depId, value);
                }
            }), mod.check(!0), defined[id]);
        }
        function modCheck(mod) {
            mod.check();
        }
        function checkLoaded() {
            var map, modId, err, usingPathFallback, waitInterval = 1e3 * config.waitSeconds, //It is possible to disable the wait interval by using waitSeconds of 0.
            expired = waitInterval && context.startTime + waitInterval < new Date().getTime(), noLoads = [], stillLoading = !1, needCycleCheck = !0;
            //Do not bother if this call was a result of a cycle break.
            if (!inCheckLoaded) {
                if (inCheckLoaded = !0, //Figure out the state of all the modules.
                eachProp(registry, function(mod) {
                    //Skip things that are not enabled or in error state.
                    if (map = mod.map, modId = map.id, mod.enabled && !mod.error) //If the module should be executed, and it has not
                    //been inited and time is up, remember it.
                    if (!mod.inited && expired) hasPathFallback(modId) ? (usingPathFallback = !0, stillLoading = !0) : (noLoads.push(modId), 
                    removeScript(modId)); else if (!mod.inited && mod.fetched && map.isDefine && (stillLoading = !0, 
                    !map.prefix)) //No reason to keep looking for unfinished
                    //loading. If the only stillLoading is a
                    //plugin resource though, keep going,
                    //because it may be that a plugin resource
                    //is waiting on a non-plugin cycle.
                    return needCycleCheck = !1;
                }), expired && noLoads.length) //If wait time expired, throw error of unloaded modules.
                return err = makeError("timeout", "Load timeout for modules: " + noLoads, null, noLoads), 
                err.contextName = context.contextName, onError(err);
                //Not expired, check for a cycle.
                needCycleCheck && (each(waitAry, function(mod) {
                    if (!mod.defined) {
                        var cycleMod = findCycle(mod, {}, {}), traced = {};
                        cycleMod && (forceExec(cycleMod, traced, {}), //traced modules may have been
                        //removed from the registry, but
                        //their listeners still need to
                        //be called.
                        eachProp(traced, modCheck));
                    }
                }), //Now that dependencies have
                //been satisfied, trigger the
                //completion check that then
                //notifies listeners.
                eachProp(registry, modCheck)), //If still waiting on loads, and the waiting load is something
                //other than a plugin resource, or there are still outstanding
                //scripts, then just try back later.
                expired && !usingPathFallback || !stillLoading || !isBrowser && !isWebWorker || checkLoadedTimeoutId || (checkLoadedTimeoutId = setTimeout(function() {
                    checkLoadedTimeoutId = 0, checkLoaded();
                }, 50)), inCheckLoaded = !1;
            }
        }
        function callGetModule(args) {
            getModule(makeModuleMap(args[0], null, !0)).init(args[1], args[2]);
        }
        function removeListener(node, func, name, ieName) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            node.detachEvent && !isOpera ? //Probably IE. If not it will throw an error, which will be
            //useful to know.
            ieName && node.detachEvent(ieName, func) : node.removeEventListener(name, func, !1);
        }
        /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
        function getScriptData(evt) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var node = evt.currentTarget || evt.srcElement;
            //Remove the listeners once here.
            return removeListener(node, context.onScriptLoad, "load", "onreadystatechange"), 
            removeListener(node, context.onScriptError, "error"), {
                node: node,
                id: node && node.getAttribute("data-requiremodule")
            };
        }
        var inCheckLoaded, Module, context, handlers, checkLoadedTimeoutId, config = {
            waitSeconds: 7,
            baseUrl: "./",
            paths: {},
            pkgs: {},
            shim: {}
        }, registry = {}, undefEvents = {}, defQueue = [], defined = {}, urlFetched = {}, requireCounter = 1, unnormalizedCounter = 1, //Used to track the order in which modules
        //should be executed, by the order they
        //load. Important for consistent cycle resolution
        //behavior.
        waitAry = [];
        return handlers = {
            require: function(mod) {
                return makeRequire(mod);
            },
            exports: function(mod) {
                return mod.usingExports = !0, mod.map.isDefine ? mod.exports = defined[mod.map.id] = {} : void 0;
            },
            module: function(mod) {
                return mod.module = {
                    id: mod.map.id,
                    uri: mod.map.url,
                    config: function() {
                        return config.config && config.config[mod.map.id] || {};
                    },
                    exports: defined[mod.map.id]
                };
            }
        }, Module = function(map) {
            this.events = undefEvents[map.id] || {}, this.map = map, this.shim = config.shim[map.id], 
            this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, 
            this.depCount = 0;
        }, Module.prototype = {
            init: function(depMaps, factory, errback, options) {
                options = options || {}, //Do not do more inits if already done. Can happen if there
                //are multiple define calls for the same module. That is not
                //a normal, common case, but it is also not unexpected.
                this.inited || (this.factory = factory, errback ? //Register for errors on this module.
                this.on("error", errback) : this.events.error && (//If no errback already, but there are error listeners
                //on this module, set up an errback to pass to the deps.
                errback = bind(this, function(err) {
                    this.emit("error", err);
                })), //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = depMaps && depMaps.slice(0), this.depMaps.rjsSkipMap = depMaps.rjsSkipMap, 
                this.errback = errback, //Indicate this module has be initialized
                this.inited = !0, this.ignore = options.ignore, //Could have option to init this module in enabled mode,
                //or could have been previously marked as enabled. However,
                //the dependencies are not known until init is called. So
                //if enabled previously, now trigger dependencies as enabled.
                options.enabled || this.enabled ? //Enable this module and dependencies.
                //Will call this.check()
                this.enable() : this.check());
            },
            defineDepById: function(id, depExports) {
                var i;
                //Find the index for this dependency.
                return each(this.depMaps, function(map, index) {
                    return map.id === id ? (i = index, !0) : void 0;
                }), this.defineDep(i, depExports);
            },
            defineDep: function(i, depExports) {
                //Because of cycles, defined callback for a given
                //export can be called more than once.
                this.depMatched[i] || (this.depMatched[i] = !0, this.depCount -= 1, this.depExports[i] = depExports);
            },
            fetch: function() {
                if (!this.fetched) {
                    this.fetched = !0, context.startTime = new Date().getTime();
                    var map = this.map;
                    //If the manager is for a plugin managed resource,
                    //ask the plugin to load it now.
                    //If the manager is for a plugin managed resource,
                    //ask the plugin to load it now.
                    return this.shim ? void makeRequire(this, !0)(this.shim.deps || [], bind(this, function() {
                        return map.prefix ? this.callPlugin() : this.load();
                    })) : map.prefix ? this.callPlugin() : this.load();
                }
            },
            load: function() {
                var url = this.map.url;
                //Regular dependency.
                urlFetched[url] || (urlFetched[url] = !0, context.load(this.map.id, url));
            },
            /**
             * Checks is the module is ready to define itself, and if so,
             * define it. If the silent argument is true, then it will just
             * define, but not notify listeners, and not ask for a context-wide
             * check of all loaded modules. That is useful for cycle breaking.
             */
            check: function(silent) {
                if (this.enabled && !this.enabling) {
                    var err, cjsModule, id = this.map.id, depExports = this.depExports, exports = this.exports, factory = this.factory;
                    if (this.inited) {
                        if (this.error) this.emit("error", this.error); else if (!this.defining) {
                            if (//The factory could trigger another require call
                            //that would result in checking this module to
                            //define itself again. If already in the process
                            //of doing that, skip this work.
                            this.defining = !0, this.depCount < 1 && !this.defined) {
                                if (isFunction(factory)) {
                                    //If there is an error listener, favor passing
                                    //to that instead of throwing an error.
                                    if (this.events.error) try {
                                        exports = context.execCb(id, factory, depExports, exports);
                                    } catch (e) {
                                        err = e;
                                    } else exports = context.execCb(id, factory, depExports, exports);
                                    if (this.map.isDefine && (//If setting exports via 'module' is in play,
                                    //favor that over return value and exports. After that,
                                    //favor a non-undefined return value over exports use.
                                    cjsModule = this.module, cjsModule && void 0 !== cjsModule.exports && //Make sure it is not already the exports value
                                    cjsModule.exports !== this.exports ? exports = cjsModule.exports : void 0 === exports && this.usingExports && (//exports already set the defined value.
                                    exports = this.exports)), err) return err.requireMap = this.map, err.requireModules = [ this.map.id ], 
                                    err.requireType = "define", onError(this.error = err);
                                } else //Just a literal value
                                exports = factory;
                                this.exports = exports, this.map.isDefine && !this.ignore && (defined[id] = exports, 
                                req.onResourceLoad && req.onResourceLoad(context, this.map, this.depMaps)), //Clean up
                                delete registry[id], this.defined = !0, context.waitCount -= 1, 0 === context.waitCount && (//Clear the wait array used for cycles.
                                waitAry = []);
                            }
                            //Finished the define stage. Allow calling check again
                            //to allow define notifications below in the case of a
                            //cycle.
                            this.defining = !1, silent || this.defined && !this.defineEmitted && (this.defineEmitted = !0, 
                            this.emit("defined", this.exports), this.defineEmitComplete = !0);
                        }
                    } else this.fetch();
                }
            },
            callPlugin: function() {
                var map = this.map, id = map.id, pluginMap = makeModuleMap(map.prefix, null, !1, !0);
                on(pluginMap, "defined", bind(this, function(plugin) {
                    var load, normalizedMap, normalizedMod, name = this.map.name, parentName = this.map.parentMap ? this.map.parentMap.name : null;
                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    //Normalize the ID if the plugin allows it.
                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    return this.map.unnormalized ? (plugin.normalize && (name = plugin.normalize(name, function(name) {
                        return normalize(name, parentName, !0);
                    }) || ""), normalizedMap = makeModuleMap(map.prefix + "!" + name, this.map.parentMap, !1, !0), 
                    on(normalizedMap, "defined", bind(this, function(value) {
                        this.init([], function() {
                            return value;
                        }, null, {
                            enabled: !0,
                            ignore: !0
                        });
                    })), normalizedMod = registry[normalizedMap.id], void (normalizedMod && (this.events.error && normalizedMod.on("error", bind(this, function(err) {
                        this.emit("error", err);
                    })), normalizedMod.enable()))) : (load = bind(this, function(value) {
                        this.init([], function() {
                            return value;
                        }, null, {
                            enabled: !0
                        });
                    }), load.error = bind(this, function(err) {
                        this.inited = !0, this.error = err, err.requireModules = [ id ], //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp(registry, function(mod) {
                            0 === mod.map.id.indexOf(id + "_unnormalized") && removeWaiting(mod.map.id);
                        }), onError(err);
                    }), load.fromText = function(moduleName, text) {
                        /*jslint evil: true */
                        var hasInteractive = useInteractive;
                        //Turn off interactive script matching for IE for any define
                        //calls in the text, then turn it back on at the end.
                        hasInteractive && (useInteractive = !1), //Prime the system by creating a module instance for
                        //it.
                        getModule(makeModuleMap(moduleName)), req.exec(text), hasInteractive && (useInteractive = !0), 
                        //Support anonymous modules.
                        context.completeLoad(moduleName);
                    }, void plugin.load(map.name, makeRequire(map.parentMap, !0, function(deps, cb, er) {
                        return deps.rjsSkipMap = !0, context.require(deps, cb, er);
                    }), load, config));
                })), context.enable(pluginMap, this), this.pluginMaps[pluginMap.id] = pluginMap;
            },
            enable: function() {
                this.enabled = !0, this.waitPushed || (waitAry.push(this), context.waitCount += 1, 
                this.waitPushed = !0), //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = !0, //Enable each dependency
                each(this.depMaps, bind(this, function(depMap, i) {
                    var id, mod, handler;
                    if ("string" == typeof depMap) {
                        if (//Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        depMap = makeModuleMap(depMap, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.depMaps.rjsSkipMap), 
                        this.depMaps[i] = depMap, handler = handlers[depMap.id]) return void (this.depExports[i] = handler(this));
                        this.depCount += 1, on(depMap, "defined", bind(this, function(depExports) {
                            this.defineDep(i, depExports), this.check();
                        })), this.errback && on(depMap, "error", this.errback);
                    }
                    id = depMap.id, mod = registry[id], //Skip special modules like 'require', 'exports', 'module'
                    //Also, don't call enable if it is already enabled,
                    //important in circular dependency cases.
                    handlers[id] || !mod || mod.enabled || context.enable(depMap, this);
                })), //Enable each plugin that is used in
                //a dependency
                eachProp(this.pluginMaps, bind(this, function(pluginMap) {
                    var mod = registry[pluginMap.id];
                    mod && !mod.enabled && context.enable(pluginMap, this);
                })), this.enabling = !1, this.check();
            },
            on: function(name, cb) {
                var cbs = this.events[name];
                cbs || (cbs = this.events[name] = []), cbs.push(cb);
            },
            emit: function(name, evt) {
                each(this.events[name], function(cb) {
                    cb(evt);
                }), "error" === name && //Now that the error handler was triggered, remove
                //the listeners, since this broken Module instance
                //can stay around for a while in the registry/waitAry.
                delete this.events[name];
            }
        }, context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            waitCount: 0,
            defQueue: defQueue,
            Module: Module,
            makeModuleMap: makeModuleMap,
            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function(cfg) {
                //Make sure the baseUrl ends in a slash.
                cfg.baseUrl && "/" !== cfg.baseUrl.charAt(cfg.baseUrl.length - 1) && (cfg.baseUrl += "/");
                //Save off the paths and packages since they require special processing,
                //they are additive.
                var pkgs = config.pkgs, shim = config.shim, paths = config.paths, map = config.map;
                //Mix in the config values, favoring the new values over
                //existing ones in context.config.
                mixin(config, cfg, !0), //Merge paths.
                config.paths = mixin(paths, cfg.paths, !0), //Merge map
                cfg.map && (config.map = mixin(map || {}, cfg.map, !0, !0)), //Merge shim
                cfg.shim && (eachProp(cfg.shim, function(value, id) {
                    //Normalize the structure
                    isArray(value) && (value = {
                        deps: value
                    }), value.exports && !value.exports.__buildReady && (value.exports = context.makeShimExports(value.exports)), 
                    shim[id] = value;
                }), config.shim = shim), //Adjust packages if necessary.
                cfg.packages && (each(cfg.packages, function(pkgObj) {
                    var location;
                    pkgObj = "string" == typeof pkgObj ? {
                        name: pkgObj
                    } : pkgObj, location = pkgObj.location, //Create a brand new object on pkgs, since currentPackages can
                    //be passed in again, and config.pkgs is the internal transformed
                    //state for all package configs.
                    pkgs[pkgObj.name] = {
                        name: pkgObj.name,
                        location: location || pkgObj.name,
                        //Remove leading dot in main, so main paths are normalized,
                        //and remove any trailing .js, since different package
                        //envs have different conventions: some use a module name,
                        //some use a file name.
                        main: (pkgObj.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                    };
                }), //Done with modifications, assing packages back to context config
                config.pkgs = pkgs), //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp(registry, function(mod, id) {
                    //If module already has init called, since it is too
                    //late to modify them, and ignore unnormalized ones
                    //since they are transient.
                    mod.inited || mod.map.unnormalized || (mod.map = makeModuleMap(id));
                }), //If a deps array or a config callback is specified, then call
                //require with those args. This is useful when require is defined as a
                //config object before require.js is loaded.
                (cfg.deps || cfg.callback) && context.require(cfg.deps || [], cfg.callback);
            },
            makeShimExports: function(exports) {
                var func;
                //Save the exports for use in nodefine checking.
                return "string" == typeof exports ? (func = function() {
                    return getGlobal(exports);
                }, func.exports = exports, func) : function() {
                    return exports.apply(global, arguments);
                };
            },
            requireDefined: function(id, relMap) {
                return hasProp(defined, makeModuleMap(id, relMap, !1, !0).id);
            },
            requireSpecified: function(id, relMap) {
                return id = makeModuleMap(id, relMap, !1, !0).id, hasProp(defined, id) || hasProp(registry, id);
            },
            require: function(deps, callback, errback, relMap) {
                var moduleName, id, map, requireMod, args;
                if ("string" == typeof deps) //Synchronous access to one module. If require.get is
                //available (as in the Node adapter), prefer that.
                //In this case deps is the moduleName and callback is
                //the relMap
                //Just return the module wanted. In this scenario, the
                //second arg (if passed) is just the relMap.
                //Normalize module name, if it contains . or ..
                return isFunction(callback) ? onError(makeError("requireargs", "Invalid require call"), errback) : req.get ? req.get(context, deps, callback) : (moduleName = deps, 
                relMap = callback, map = makeModuleMap(moduleName, relMap, !1, !0), id = map.id, 
                hasProp(defined, id) ? defined[id] : onError(makeError("notloaded", 'Module name "' + id + '" has not been loaded yet for context: ' + contextName)));
                //Make sure any remaining defQueue items get properly processed.
                for (//Callback require. Normalize args. if callback or errback is
                //not a function, it means it is a relMap. Test errback first.
                errback && !isFunction(errback) && (relMap = errback, errback = void 0), callback && !isFunction(callback) && (relMap = callback, 
                callback = void 0), //Any defined modules in the global queue, intake them now.
                takeGlobalQueue(); defQueue.length; ) {
                    if (args = defQueue.shift(), null === args[0]) return onError(makeError("mismatch", "Mismatched anonymous define() module: " + args[args.length - 1]));
                    //args are id, deps, factory. Should be normalized by the
                    //define() function.
                    callGetModule(args);
                }
                //Mark all the dependencies as needing to be loaded.
                return requireMod = getModule(makeModuleMap(null, relMap)), requireMod.init(deps, callback, errback, {
                    enabled: !0
                }), checkLoaded(), context.require;
            },
            undef: function(id) {
                //Bind any waiting define() calls to this context,
                //fix for #408
                takeGlobalQueue();
                var map = makeModuleMap(id, null, !0), mod = registry[id];
                delete defined[id], delete urlFetched[map.url], delete undefEvents[id], mod && (//Hold on to listeners in case the
                //module will be attempted to be reloaded
                //using a different config.
                mod.events.defined && (undefEvents[id] = mod.events), removeWaiting(id));
            },
            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. parent module is passed in for context,
             * used by the optimizer.
             */
            enable: function(depMap, parent) {
                var mod = registry[depMap.id];
                mod && getModule(depMap).enable();
            },
            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function(moduleName) {
                var found, args, mod, shim = config.shim[moduleName] || {}, shExports = shim.exports && shim.exports.exports;
                for (takeGlobalQueue(); defQueue.length; ) {
                    if (args = defQueue.shift(), null === args[0]) {
                        //If already found an anonymous module and bound it
                        //to this name, then this is some other anon module
                        //waiting for its completeLoad to fire.
                        if (args[0] = moduleName, found) break;
                        found = !0;
                    } else args[0] === moduleName && (//Found matching define call for this script!
                    found = !0);
                    callGetModule(args);
                }
                if (//Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                mod = registry[moduleName], !found && !defined[moduleName] && mod && !mod.inited) {
                    if (!(!config.enforceDefine || shExports && getGlobal(shExports))) return hasPathFallback(moduleName) ? void 0 : onError(makeError("nodefine", "No define call for " + moduleName, null, [ moduleName ]));
                    //A script that does not call define(), so just simulate
                    //the call for it.
                    callGetModule([ moduleName, shim.deps || [], shim.exports ]);
                }
                checkLoaded();
            },
            /**
             * Converts a module name + .extension into an URL path.
             * *Requires* the use of a module name. It does not support using
             * plain URLs like nameToUrl.
             */
            toUrl: function(moduleNamePlusExt, relModuleMap) {
                var index = moduleNamePlusExt.lastIndexOf("."), ext = null;
                return -1 !== index && (ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length), 
                moduleNamePlusExt = moduleNamePlusExt.substring(0, index)), context.nameToUrl(normalize(moduleNamePlusExt, relModuleMap && relModuleMap.id, !0), ext);
            },
            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function(moduleName, ext) {
                var paths, pkgs, pkg, pkgPath, syms, i, parentModule, url, parentPath;
                //If a colon is in the URL, it indicates a protocol is used and it is just
                //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                //or ends with .js, then assume the user meant to use an url and not a module id.
                //The slash is important for protocol-less URLs as well as full paths.
                if (req.jsExtRegExp.test(moduleName)) //Just a plain path, not module name lookup, so just return it.
                //Add extension if it is included. This is a bit wonky, only non-.js things pass
                //an extension, this method probably needs to be reworked.
                url = moduleName + (ext || ""); else {
                    //For each module name segment, see if there is a path
                    //registered for it. Start with most specific name
                    //and work up from it.
                    for (//A module that needs to be converted to a path.
                    paths = config.paths, pkgs = config.pkgs, syms = moduleName.split("/"), i = syms.length; i > 0; i -= 1) {
                        if (parentModule = syms.slice(0, i).join("/"), pkg = pkgs[parentModule], parentPath = paths[parentModule]) {
                            //If an array, it means there are a few choices,
                            //Choose the one that is desired
                            isArray(parentPath) && (parentPath = parentPath[0]), syms.splice(0, i, parentPath);
                            break;
                        }
                        if (pkg) {
                            //If module name is just the package name, then looking
                            //for the main module.
                            pkgPath = moduleName === pkg.name ? pkg.location + "/" + pkg.main : pkg.location, 
                            syms.splice(0, i, pkgPath);
                            break;
                        }
                    }
                    //Join the path parts together, then figure out if baseUrl is needed.
                    url = syms.join("/"), url += ext || (/\?/.test(url) ? "" : ".js"), url = ("/" === url.charAt(0) || url.match(/^[\w\+\.\-]+:/) ? "" : config.baseUrl) + url;
                }
                return config.urlArgs ? url + ((-1 === url.indexOf("?") ? "?" : "&") + config.urlArgs) : url;
            },
            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function(id, url) {
                req.load(context, id, url);
            },
            /**
             * Executes a module callack function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function(name, callback, args, exports) {
                return callback.apply(exports, args);
            },
            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function(evt) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                if ("load" === evt.type || readyRegExp.test((evt.currentTarget || evt.srcElement).readyState)) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript = null;
                    //Pull out the name of the module and the context.
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },
            /**
             * Callback for script errors.
             */
            onScriptError: function(evt) {
                var data = getScriptData(evt);
                return hasPathFallback(data.id) ? void 0 : onError(makeError("scripterror", "Script error", evt, [ data.id ]));
            }
        };
    }
    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function(script) {
            return "interactive" === script.readyState ? interactiveScript = script : void 0;
        }), interactiveScript);
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.0.6", commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/, currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty, ap = Array.prototype, aps = ap.slice, apsp = ap.splice, isBrowser = !("undefined" == typeof window || !navigator || !document), isWebWorker = !isBrowser && "undefined" != typeof importScripts, //PS3 indicates loaded and complete, but need to wait for complete
    //specifically. Sequence is 'loading', 'loaded', execution,
    // then 'complete'. The UA check is unfortunate, but not sure how
    //to feature test w/o causing perf issues.
    readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/, defContextName = "_", //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
    isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(), contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = !1;
    if ("undefined" == typeof define) {
        if ("undefined" != typeof requirejs) {
            if (isFunction(requirejs)) //Do not overwrite and existing requirejs instance.
            return;
            cfg = requirejs, requirejs = void 0;
        }
        //Allow for a require config object
        "undefined" == typeof require || isFunction(require) || (//assume it is a config object.
        cfg = require, require = void 0), /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
        req = requirejs = function(deps, callback, errback, optional) {
            //Find the right context, use default
            var context, config, contextName = defContextName;
            // Determine if have config object in the call.
            // deps is a config object
            // Adjust args if there are dependencies
            return isArray(deps) || "string" == typeof deps || (config = deps, isArray(callback) ? (deps = callback, 
            callback = errback, errback = optional) : deps = []), config && config.context && (contextName = config.context), 
            context = contexts[contextName], context || (context = contexts[contextName] = req.s.newContext(contextName)), 
            config && context.configure(config), context.require(deps, callback, errback);
        }, /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
        req.config = function(config) {
            return req(config);
        }, /**
     * Export require as a global, but only if it does not already exist.
     */
        require || (require = req), req.version = version, //Used to filter out dependencies that are already paths.
        req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
            contexts: contexts,
            newContext: newContext
        }, //Create default context.
        req({}), //Exports some context-sensitive methods on global require, using
        //default context if no context specified.
        addRequireMethods(req), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], 
        //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), 
        /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
        req.onError = function(err) {
            throw err;
        }, /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
        req.load = function(context, moduleName, url) {
            var node, config = context && context.config || {};
            //In the browser so use a script tag
            //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.
            //Probably IE. IE (at least 6-8) do not fire
            //script onload right after executing the script, so
            //we cannot tie the anonymous define call to a name.
            //However, IE reports the script as being in 'interactive'
            //readyState at the time of the define call.
            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            //In a web worker, use importScripts. This is not a very
            //efficient use of importScripts, importScripts will block until
            //its script is downloaded and evaluated. However, if web workers
            //are in play, the expectation that a build has been done so that
            //only one script needs to be loaded anyway. This may need to be
            //reevaluated if other use cases become common.
            //Account for anonymous modules
            return isBrowser ? (node = config.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script"), 
            node.type = config.scriptType || "text/javascript", node.charset = "utf-8", node.async = !0, 
            node.setAttribute("data-requirecontext", context.contextName), node.setAttribute("data-requiremodule", moduleName), 
            !node.attachEvent || node.attachEvent.toString && node.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (node.addEventListener("load", context.onScriptLoad, !1), 
            node.addEventListener("error", context.onScriptError, !1)) : (useInteractive = !0, 
            node.attachEvent("onreadystatechange", context.onScriptLoad)), node.src = url, currentlyAddingScript = node, 
            baseElement ? head.insertBefore(node, baseElement) : head.appendChild(node), currentlyAddingScript = null, 
            node) : void (isWebWorker && (importScripts(url), context.completeLoad(moduleName)));
        }, //Look for a data-main script attribute, which could also adjust the baseUrl.
        isBrowser && //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse(scripts(), function(script) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            //Set final baseUrl if there is not already an explicit one.
            //Pull off the directory of data-main for use as the
            //baseUrl.
            //Strip off any trailing .js since dataMain is now
            //like a module name.
            //Put the data-main script in the files to load.
            return head || (head = script.parentNode), dataMain = script.getAttribute("data-main"), 
            dataMain ? (cfg.baseUrl || (src = dataMain.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", 
            cfg.baseUrl = subPath, dataMain = mainScript), dataMain = dataMain.replace(jsSuffixRegExp, ""), 
            cfg.deps = cfg.deps ? cfg.deps.concat(dataMain) : [ dataMain ], !0) : void 0;
        }), /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
        define = function(name, deps, callback) {
            var node, context;
            //Allow for anonymous functions
            "string" != typeof name && (//Adjust args appropriately
            callback = deps, deps = name, name = null), //This module may not have dependencies
            isArray(deps) || (callback = deps, deps = []), //If no name, and callback is a function, then figure out if it a
            //CommonJS thing with dependencies.
            !deps.length && isFunction(callback) && callback.length && (callback.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(match, dep) {
                deps.push(dep);
            }), //May be a CommonJS thing even without require calls, but still
            //could use exports, and module. Avoid doing exports and module
            //work though if it just needs require.
            //REQUIRES the function to expect the CommonJS variables in the
            //order listed below.
            deps = (1 === callback.length ? [ "require" ] : [ "require", "exports", "module" ]).concat(deps)), 
            //If in IE 6-8 and hit an anonymous define() call, do the interactive
            //work.
            useInteractive && (node = currentlyAddingScript || getInteractiveScript(), node && (name || (name = node.getAttribute("data-requiremodule")), 
            context = contexts[node.getAttribute("data-requirecontext")])), //Always save off evaluating the def call until the script onload handler.
            //This allows multiple modules to be in a file without prematurely
            //tracing dependencies, and allows for anonymous module support,
            //where the module name is not known until the script onload event
            //occurs. If no context, use the global queue, and get it processed
            //in the onscript load callback.
            (context ? context.defQueue : globalDefQueue).push([ name, deps, callback ]);
        }, define.amd = {
            jQuery: !0
        }, /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
        req.exec = function(text) {
            /*jslint evil: true */
            return eval(text);
        }, //Set up with config info.
        req(cfg);
    }
}(this), /*! require.config */
/*
* Our base require config. Sets baseUrl to the JS_static directory so all JS requires can be relative paths
* Any CSS or otherwise plugged in requires are better off to use image_server_url and make an absolute path
*
* Also exposing jQuery as an AMD module. jQuery 1.8 doesn't need it, as it already does this, but jQuery 1.4
* which we are still using on core doesn't. So doing it in here. Once we move to 1.8 throughout the whole site
* we can remove this AMD module call from here
*/
"function" == typeof define && define.amd && define.amd.jQuery && define("jquery/1/jquery", [], function() {
    return jQuery;
});

/*
* Adding cachebuster here until it becomes too much of a pain in the butt to be in scripts.js 
* If that happens, we'll move it to it's own external JS and put it at the top of the page
*/
var webmdCachebuster = "1";

/**
 *  Require config to set base path for lazy loaded JS files
 *
 *  Also upping the wait seconds before timeout to 30. Mobile devices on 3G can take this long in edge cases
 *   
 *  We are also adding a global cachebusting attribute into our config. 
 *  webmd_js_cachebuster will be set by an extra http request to a webmd_js_cachebuster.js file which will be 
 *  versioned through DCTM and live inside of PageBuilder_Assets/JS/ directory
 *  When we make a change to JS that needs to be non cached or is an emergency bugfix. We can version up the dynamically loaded JS assets on our site
 *  by upping this version. This will fetch all new version of dynamically pulled JS. This file will live outside of scripts.js so it does not 
 *  have to go through a build system or have a high amount of risk to be versioned up. 
 */
require.config({
    urlArgs: "",
    waitSeconds: 30,
    baseUrl: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/amd_modules/"
}), /* ! Require-CSS RequireJS css! loader plugin
 * Guy Bedford 2013
 * MIT
 */
/*
 * Allows for lazy loading of CSS using require.js
 * @example
 * require(['slideshow','css!' + image_server_url + '/webmd/consumer_assets/whatever_you_want/slideshow.css'],
 *    function() {
 *		//your slideshow.js and slideshow CSS are loaded and you are ready to go
 * });
 *
 * We have modified this plugin from the original 
 * 1) Turned it into a module, which allows for loading of this without having the JS dynamically loaded
 * 2) removed normalize.css and using the one built into require
 */
define("css", [], function() {
    function indexOf(a, e) {
        for (var i = 0, l = a.length; l > i; i++) if (a[i] === e) return i;
        return -1;
    }
    if ("undefined" == typeof window) return {
        load: function(n, r, load) {
            load();
        }
    };
    // set to true to enable test prompts for device testing
    var testing = !1, head = document.getElementsByTagName("head")[0], engine = window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)/), hackLinks = !1;
    engine && (engine[1] || engine[7] ? (hackLinks = parseInt(engine[1]) < 6 || parseInt(engine[7]) <= 9, 
    engine = "trident") : engine[2] ? (// unfortunately style querying still doesnt work with onload callback in webkit
    hackLinks = !0, engine = "webkit") : engine[3] || (engine[4] ? (hackLinks = parseInt(engine[4]) < 18, 
    engine = "gecko") : testing && alert("Engine detection failed")));
    //main api object
    var cssAPI = {}, absUrlRegEx = /^\/|([^\:\/]*:)/;
    cssAPI.pluginBuilder = "./css-builder";
    // used by layer builds to register their css buffers
    // the current layer buffer items (from addBuffer)
    var curBuffer = [], onBufferLoad = {}, bufferResources = [];
    cssAPI.addBuffer = function(resourceId) {
        // just in case layer scripts are included twice, also check
        // against the previous buffers
        -1 == indexOf(curBuffer, resourceId) && -1 == indexOf(bufferResources, resourceId) && (curBuffer.push(resourceId), 
        bufferResources.push(resourceId));
    }, cssAPI.setBuffer = function(css, isLess) {
        var pathname = window.location.pathname.split("/");
        pathname.pop(), pathname = pathname.join("/") + "/";
        var baseParts = require.toUrl("base_url").split("/");
        baseParts.pop();
        var baseUrl = baseParts.join("/") + "/";
        baseUrl = normalize.convertURIBase(baseUrl, pathname, "/"), baseUrl.match(absUrlRegEx) || (baseUrl = "/" + baseUrl), 
        "/" != baseUrl.substr(baseUrl.length - 1, 1) && (baseUrl += "/"), cssAPI.inject(normalize(css, baseUrl, pathname));
        // set up attach callback if registered
        // clear the current buffer for the next layer
        // (just the less or css part as we have two buffers in one effectively)
        for (var i = 0; i < curBuffer.length; i++) // find the resources in the less or css buffer dependening which one this is
        (isLess && ".less" == curBuffer[i].substr(curBuffer[i].length - 5, 5) || !isLess && ".css" == curBuffer[i].substr(curBuffer[i].length - 4, 4)) && (!function(resourceId) {
            // mark that the onBufferLoad is about to be called (set to true if not already a callback function)
            onBufferLoad[resourceId] = onBufferLoad[resourceId] || !0, // set a short timeout (as injection isn't instant in Chrome), then call the load
            setTimeout(function() {
                "function" == typeof onBufferLoad[resourceId] && onBufferLoad[resourceId](), // remove from onBufferLoad to indicate loaded
                delete onBufferLoad[resourceId];
            }, 7);
        }(curBuffer[i]), // remove the current resource from the buffer
        curBuffer.splice(i--, 1));
    }, cssAPI.attachBuffer = function(resourceId, load) {
        // attach can happen during buffer collecting, or between injection and callback
        // we assume it is not possible to attach multiple callbacks
        // requirejs plugin load function ensures this by queueing duplicate calls
        // check if the resourceId is in the current buffer
        for (var i = 0; i < curBuffer.length; i++) if (curBuffer[i] == resourceId) return onBufferLoad[resourceId] = load, 
        !0;
        // check if the resourceId is waiting for injection callback
        // (onBufferLoad === true is a shortcut indicator for this)
        // check if the resourceId is waiting for injection callback
        // (onBufferLoad === true is a shortcut indicator for this)
        // if it's in the full buffer list and not either of the above, its loaded already
        return onBufferLoad[resourceId] === !0 ? (onBufferLoad[resourceId] = load, !0) : -1 != indexOf(bufferResources, resourceId) ? (load(), 
        !0) : void 0;
    };
    var webkitLoadCheck = function(link, callback) {
        setTimeout(function() {
            for (var i = 0; i < document.styleSheets.length; i++) {
                var sheet = document.styleSheets[i];
                if (sheet.href == link.href) return callback();
            }
            webkitLoadCheck(link, callback);
        }, 10);
    }, mozillaLoadCheck = function(style, callback) {
        setTimeout(function() {
            try {
                return style.sheet.cssRules, callback();
            } catch (e) {}
            mozillaLoadCheck(style, callback);
        }, 10);
    };
    // ie link detection, as adapted from https://github.com/cujojs/curl/blob/master/src/curl/plugin/css.js
    if ("trident" == engine && hackLinks) var ieStyles = [], ieQueue = [], ieStyleCnt = 0, ieLoad = function(url, callback) {
        var style;
        ieQueue.push({
            url: url,
            cb: callback
        }), style = ieStyles.shift(), !style && ieStyleCnt++ < 12 && (style = document.createElement("style"), 
        head.appendChild(style)), ieLoadNextImport(style);
    }, ieLoadNextImport = function(style) {
        var curImport = ieQueue.shift();
        if (!curImport) return style.onload = noop, void ieStyles.push(style);
        style.onload = function() {
            curImport.cb(curImport.ss), ieLoadNextImport(style);
        };
        var curSheet = style.styleSheet;
        curImport.ss = curSheet.imports[curSheet.addImport(curImport.url)];
    };
    // uses the <link> load method
    var createLink = function(url) {
        var link = document.createElement("link");
        return link.type = "text/css", link.rel = "stylesheet", link.href = url, link;
    }, noop = function() {};
    cssAPI.linkLoad = function(url, callback) {
        var timeout = setTimeout(function() {
            testing && alert("timeout"), callback();
        }, 1e3 * waitSeconds - 100), _callback = function() {
            clearTimeout(timeout), link && (link.onload = noop), // for style querying, a short delay still seems necessary
            setTimeout(callback, 7);
        };
        if (hackLinks) if ("webkit" == engine) {
            var link = createLink(url);
            webkitLoadCheck(link, _callback), head.appendChild(link);
        } else if ("gecko" == engine) {
            var style = document.createElement("style");
            style.textContent = '@import "' + url + '"', mozillaLoadCheck(style, _callback), 
            head.appendChild(style);
        } else "trident" == engine && ieLoad(url, _callback); else {
            var link = createLink(url);
            link.onload = _callback, head.appendChild(link);
        }
    };
    /* injection api */
    var curStyle, progIds = [ "Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0" ], fileCache = {}, get = function(url, callback, errback) {
        if (fileCache[url]) return void callback(fileCache[url]);
        var xhr, i, progId;
        if ("undefined" != typeof XMLHttpRequest) xhr = new XMLHttpRequest(); else if ("undefined" != typeof ActiveXObject) for (i = 0; 3 > i; i += 1) {
            progId = progIds[i];
            try {
                xhr = new ActiveXObject(progId);
            } catch (e) {}
            if (xhr) {
                progIds = [ progId ];
                // so faster next time
                break;
            }
        }
        xhr.open("GET", url, requirejs.inlineRequire ? !1 : !0), xhr.onreadystatechange = function(evt) {
            var status, err;
            //Do not explicitly handle errors, those should be
            //visible via console output in the browser.
            4 === xhr.readyState && (status = xhr.status, status > 399 && 600 > status ? (//An http 4xx or 5xx error. Signal an error.
            err = new Error(url + " HTTP status: " + status), err.xhr = xhr, errback(err)) : (fileCache[url] = xhr.responseText, 
            callback(xhr.responseText)));
        }, xhr.send(null);
    }, styleCnt = 0;
    cssAPI.inject = function(css) {
        31 > styleCnt && (curStyle = document.createElement("style"), curStyle.type = "text/css", 
        head.appendChild(curStyle), styleCnt++), curStyle.styleSheet ? curStyle.styleSheet.cssText += css : curStyle.appendChild(document.createTextNode(css));
    };
    // NB add @media query support for media imports
    var importRegEx = /@import\s*(url)?\s*(('([^']*)'|"([^"]*)")|\(('([^']*)'|"([^"]*)"|([^\)]*))\))\s*;?/g, pathname = window.location.pathname.split("/");
    pathname.pop(), pathname = pathname.join("/") + "/";
    var loadCSS = function(fileUrl, callback, errback) {
        //make file url absolute
        fileUrl.match(absUrlRegEx) || (fileUrl = "/" + normalize.convertURIBase(fileUrl, pathname, "/")), 
        get(fileUrl, function(css) {
            // normalize the css (except import statements)
            css = normalize(css, fileUrl, pathname);
            for (// detect all import statements in the css and normalize
            var match, importUrls = [], importIndex = [], importLength = []; match = importRegEx.exec(css); ) {
                var importUrl = match[4] || match[5] || match[7] || match[8] || match[9];
                importUrls.push(importUrl), importIndex.push(importRegEx.lastIndex - match[0].length), 
                importLength.push(match[0].length);
            }
            for (var completeCnt = 0, i = 0; i < importUrls.length; i++) (function(i) {
                loadCSS(importUrls[i], function(importCSS) {
                    css = css.substr(0, importIndex[i]) + importCSS + css.substr(importIndex[i] + importLength[i]);
                    for (var lenDiff = importCSS.length - importLength[i], j = i + 1; j < importUrls.length; j++) importIndex[j] += lenDiff;
                    completeCnt++, completeCnt == importUrls.length && callback(css);
                }, errback);
            })(i);
            0 == importUrls.length && callback(css);
        }, errback);
    };
    cssAPI.normalize = function(name, normalize) {
        return ".css" == name.substr(name.length - 4, 4) && (name = name.substr(0, name.length - 4)), 
        normalize(name);
    };
    var waitSeconds, alerted = !1;
    return cssAPI.load = function(cssId, req, load, config, parse) {
        waitSeconds = waitSeconds || config.waitSeconds || 7;
        var resourceId = cssId + (parse ? ".less" : ".css");
        // attach the load function to a buffer if there is one in registration
        // if not, we do a full injection load
        cssAPI.attachBuffer(resourceId, load) || (fileUrl = req.toUrl(resourceId), !alerted && testing && (alert(hackLinks ? "hacking links" : "not hacking"), 
        alerted = !0), parse ? loadCSS(fileUrl, function(css) {
            // run parsing after normalization - since less is a CSS subset this works fine
            parse && (css = parse(css, function(css) {
                cssAPI.inject(css), setTimeout(load, 7);
            }));
        }) : cssAPI.linkLoad(fileUrl, load));
    }, testing && (cssAPI.inspect = function() {
        return stylesheet.styleSheet ? stylesheet.styleSheet.cssText : stylesheet.innerHTML ? stylesheet.innerHTML : void 0;
    }), cssAPI;
});

/*! webmd.json */
// Requires: webmd.core.js
// Create two public methods:
//
// Function: webmd.json.parse()
// Purpose:  Converts a JSON formatted string to a javascript object, without using eval
// Inputs:   text {string} a JSON formatted string
//           reviver {function/optional} function to manipulate the data
//               reviver(key, value) return the value to use
//
// Function: webmd.json.stringify()
// Inputs:   value {any javascript value} an object, array, or other value to turn into JSON string
//           replacer {function/optional} function to manipulate the data
//               reviver(key, value) return to the value to use
//           space {number/optional} Number of spaces to indent to make more readable
//
// Also adds "toJSON" methods to some standard JavaScript prototypes (Date, String, Number, Boolean)
//
/*
    http://www.JSON.org/json2.js
    2011-01-18

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/
/*jslint evil: true, strict: false, regexp: false */
/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/
// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.
var JSON;

/**
 * NAMESPACE SETUP
 */
if (JSON || (JSON = {}), function() {
    "use strict";
    function f(n) {
        // Format integers to have at least two digits.
        return 10 > n ? "0" + n : n;
    }
    function quote(string) {
        // If the string contains no control characters, no quote characters, and no
        // backslash characters, then we can safely slap some quotes around it.
        // Otherwise we must also replace the offending characters with safe escape
        // sequences.
        return escapable.lastIndex = 0, escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return "string" == typeof c ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }
    function str(key, holder) {
        // Produce a string from holder[key].
        var i, // The loop counter.
        k, // The member key.
        v, // The member value.
        length, partial, mind = gap, value = holder[key];
        // What happens next depends on the value's type.
        switch (// If the value has a toJSON method, call it to obtain a replacement value.
        value && "object" == typeof value && "function" == typeof value.toJSON && (value = value.toJSON(key)), 
        // If we were called with a replacer function, then call the replacer to
        // obtain a replacement value.
        "function" == typeof rep && (value = rep.call(holder, key, value)), typeof value) {
          case "string":
            return quote(value);

          case "number":
            // JSON numbers must be finite. Encode non-finite numbers as null.
            return isFinite(value) ? String(value) : "null";

          case "boolean":
          case "null":
            // If the value is a boolean or null, convert it to a string. Note:
            // typeof null does not produce 'null'. The case is included here in
            // the remote chance that this gets fixed someday.
            return String(value);

          // If the type is 'object', we might be dealing with an object or an array or
            // null.
            case "object":
            // Due to a specification blunder in ECMAScript, typeof null is 'object',
            // so watch out for that case.
            if (!value) return "null";
            // Is the value an array?
            if (// Make an array to hold the partial results of stringifying this object value.
            gap += indent, partial = [], "[object Array]" === Object.prototype.toString.apply(value)) {
                for (// The value is an array. Stringify every element. Use null as a placeholder
                // for non-JSON values.
                length = value.length, i = 0; length > i; i += 1) partial[i] = str(i, value) || "null";
                // Join all of the elements together, separated with commas, and wrap them in
                // brackets.
                return v = 0 === partial.length ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]", 
                gap = mind, v;
            }
            // If the replacer is an array, use it to select the members to be stringified.
            if (rep && "object" == typeof rep) for (length = rep.length, i = 0; length > i; i += 1) k = rep[i], 
            "string" == typeof k && (v = str(k, value), v && partial.push(quote(k) + (gap ? ": " : ":") + v)); else // Otherwise, iterate through all of the keys in the object.
            for (k in value) Object.hasOwnProperty.call(value, k) && (v = str(k, value), v && partial.push(quote(k) + (gap ? ": " : ":") + v));
            // Join all of the member texts together, separated with commas,
            // and wrap them in braces.
            return v = 0 === partial.length ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}", 
            gap = mind, v;
        }
    }
    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function(key) {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
        return this.valueOf();
    });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        // table of character substitutions
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    // If the JSON object does not yet have a stringify method, give it one.
    "function" != typeof JSON.stringify && (JSON.stringify = function(value, replacer, space) {
        // The stringify method takes a value and an optional replacer, and an optional
        // space parameter, and returns a JSON text. The replacer can be a function
        // that can replace values, or an array of strings that will select the keys.
        // A default replacer method can be provided. Use of the space parameter can
        // produce text that is more easily readable.
        var i;
        // If the space parameter is a number, make an indent string containing that
        // many spaces.
        if (gap = "", indent = "", "number" == typeof space) for (i = 0; space > i; i += 1) indent += " "; else "string" == typeof space && (indent = space);
        if (// If there is a replacer, it must be a function or an array.
        // Otherwise, throw an error.
        rep = replacer, replacer && "function" != typeof replacer && ("object" != typeof replacer || "number" != typeof replacer.length)) throw new Error("JSON.stringify");
        // Make a fake root object containing our value under the key of ''.
        // Return the result of stringifying the value.
        return str("", {
            "": value
        });
    }), // If the JSON object does not yet have a parse method, give it one.
    "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
        function walk(holder, key) {
            // The walk method is used to recursively walk the resulting structure so
            // that modifications can be made.
            var k, v, value = holder[key];
            if (value && "object" == typeof value) for (k in value) Object.hasOwnProperty.call(value, k) && (v = walk(value, k), 
            void 0 !== v ? value[k] = v : delete value[k]);
            return reviver.call(holder, key, value);
        }
        // The parse method takes a text and an optional reviver function, and returns
        // a JavaScript value if the text is a valid JSON text.
        var j;
        // In the second stage, we run the text against regular expressions that look
        // for non-JSON patterns. We are especially concerned with '()' and 'new'
        // because they can cause invocation, and '=' because it can cause mutation.
        // But just to be safe, we want to reject all unexpected forms.
        // We split the second stage into 4 regexp operations in order to work around
        // crippling inefficiencies in IE's and Safari's regexp engines. First we
        // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
        // replace all simple value tokens with ']' characters. Third, we delete all
        // open brackets that follow a colon or comma or that begin the text. Finally,
        // we look to see that the remaining characters are only whitespace or ']' or
        // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.
        if (// Parsing happens in four stages. In the first stage, we replace certain
        // Unicode characters with escape sequences. JavaScript handles many characters
        // incorrectly, either silently deleting them, or treating them as line endings.
        text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) // In the optional fourth stage, we recursively walk the new structure, passing
        // each name/value pair to a reviver function for possible transformation.
        // In the third stage we use the eval function to compile the text into a
        // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
        // in JavaScript: it can begin a block or an object literal. We wrap the text
        // in parens to eliminate the ambiguity.
        return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
            "": j
        }, "") : j;
        // If the text is not JSON parseable, then a SyntaxError is thrown.
        throw new SyntaxError("JSON.parse");
    });
}(), // Create webmd wrapper functions
webmd.json = {
    parse: JSON.parse,
    stringify: JSON.stringify
}, /*! webmd.url */
/**
 * @namespace Functions for URL manipulation.
 *
 * <p>These functions must support partial URLs that contain only a query string, such as "?a=1&b=2".</p>
 */
webmd.url = {
    /**
	 * Get a single parameter value from a URL
	 *
	 * @returns {String|undefined} Value of the URL parameter, or undefined if the parameter is not found.
	 * If the URL contains multiple paramaters using the same name, this function returns the first one.
	 * If you need to retrieve all the parameters using the same name, see {@link webmd.url.getParams}.
	 *
	 * <p>Since the return value might be undefined, you should always verify the value before
	 * attempting to use it. A possible method is to use the logical or operator to set a default
	 * value. Refer to the examples for more information.</p>
	 *
	 * @param {String} param Name of the parameter to get from the URL.
	 * @param {String} [url=location.href] URL to search for the parameter.
	 *
	 * @example
	 * // If current page is 'http://example.com/?a=5&b=1&a=3'
	 * a = webmd.url.getParam('a') || '';
	 * // a is '5'
	 *
	 * @example
	 * var a = webmd.url.getParam('a', 'http://example.com/?a=5&b=1&a=3') || '';
	 * // a is '5'
	 *
	 * @example
	 * // If current page is 'http://example.com/'
	 * a = webmd.url.getParam('a');
	 * // a is undefined
	 *
	 * @example
	 * // INCORRECT example
	 * // If current page is 'http://example.com/'
	 * name = webmd.url.getParam('name');
	 * alert('Hello, ' + name);
	 * // This will alert 'Hello, undefined', which is probably not what you wanted
	 *
	 * @example
	 * // If current page is 'http://example.com/'
	 * name = webmd.url.getParam('name') || 'user';
	 * alert('Hello, ' + name);
	 * // This will alert 'Hello, user' since name is not a parameter in the URL
	 *
	 * @example
	 * // If current page is 'http://example.com/?name=Fred'
	 * name = webmd.url.getParam('name') || 'user';
	 * alert('Hello, ' + name);
	 * // This will alert 'Hello, Fred' since name is a parameter in the URL
	 *
	 * @see webmd.url.getParams
	 */
    getParam: function(param, url) {
        var p;
        // Return undefined if param is not in the URL
        // Get object of all url parameters
        // Return undefined if param is not in the URL
        return p = this.getParams(url), p[param] ? p[param][0] : void 0;
    },
    /**
	 * Get an object containing all the URL parameters.
	 *
	 * @returns {Object} An object of key:value pairs where the key is the name of the parameter,
	 * and the value is an array of values for that parameter.
	 *
	 * <p>Note: before accessing a parameter, you should always check that the parameter is defined
	 * in the returned object. If the parameter is undefined and you attempt to use an array index
	 * it will cause an exception.</p>
	 *
	 * @param {String} [url=location.href] URL to search for the parameter. Default
	 * is the current page URL.
	 *
	 * @example
	 * // If current page is 'http://example.com?fruit=apple&fruit=pear&q=5'
	 * params = webmd.url.getParams();
	 * if (params.fruit) {
	 *   fruits = 'Fruits: ' + params.fruit.join(', ');
	 * } else {
	 *   fruits = 'No fruits.';
	 * }
	 * // Result: "Fruits: apple, pear'
	 *
	 * @example
	 * // Get the value of the first instance of the "fruit" parmeter
	 * params = webmd.url.getParams();
	 * fruit = params.fruit ? params.fruit[0] : '';
	 *
	 * @example
	 * // INCORRECT - this will cause an exception if the "fruit" parameter is undefined
	 * fruit = webmd.url.getParams().fruit[0];
	 *
	 * @see webmd.url.getParam
	 */
    getParams: function(url) {
        return void 0 === url && (url = location.href), this._getParts(url).params;
    },
    /**
	 * @deprecated Use {@link webmd.url.setParam} instead.
	 */
    addParam: function(param, value, url) {
        return this.setParam(param, value, url);
    },
    /**
	 * Replace a paramter within a URL, or add a new parameter to the URL.
	 * This function assumes you want only a single use of the parameter in the URL,
	 * so it first removes all occurrences of that parameter, then adds back a single instance.
	 * If you need multiple occurances of the same paramter use {@link webmd.url.appendParam}.
	 *
	 * <p>Note: the new parameter is not necessariliy added to the end of the URL.
	 * The order of the URL parameters might not be maintained.</p>
	 *
	 * @returns {String} The new URL with the parameter added.
	 *
	 * @param {String} param Name of the parameter to add or replace in the URL.
	 * @param {String} value Value for the parameter.
	 * @param {String} [url=location.href] URL to add the parameter.
	 *
	 * @example
	 * url = webmd.url.setParam('a', 1);
	 *
	 * @example
	 * url = setParam('a', 1, url);
	 *
	 * @see webmd.url.appendParam
	 */
    setParam: function(param, value, url) {
        // Then append the param to the URL
        // First delete the param if it is already in the URL
        return url = this.deleteParam(param, url), this.appendParam(param, value, url);
    },
    /**
	 * Append a parameter value to a URL. This function assumes the URL can contain
	 * multiple instances of the same parameter name, so if the URL already contains
	 * that parameter, an additional parameter using the same name will be added.
	 *
	 * <p>Note: the new parameter is not necessariliy added to the end of the URL.
	 * The order of the URL parameters might not be maintained.</p>
	 *
	 * @returns {String} The new URL with the parameter added.
	 *
	 * @param {String} param Name of the parameter to add to the URL.
	 * @param {String} value Value for the parameter.
	 * @param {String} [url=location.href] URL to add the parameter.
	 *
	 * @example
	 * url = webmd.url.appendParam('a', 1);
	 *
	 * @example
	 * url = webmd.url.appendParam('a', 1, url);
	 *
	 * @see webmd.url.setParam
	 */
    appendParam: function(param, value, url) {
        var parts;
        // Construct the new URL
        // If a url was not specified, use the current page url
        // Split the url into components
        // Just in case value was not specified, prevent the word "undefined' from appearing in the url
        // If the param does not already exist, create it with an array to hold values
        // Add the new parameter to the end of the array of parameters
        return void 0 === url && (url = location.href), parts = this._getParts(url), void 0 === value && (value = ""), 
        parts.params[param] || (parts.params[param] = []), parts.params[param].push(value), 
        this._buildUrl(parts);
    },
    /**
	 * Remove a parameter from a URL
	 *
	 * <p>Note: if the URL contains multiple parameters of the same name, this
	 * function will remove all matching parameters.</p>
	 *
	 * @returns {String} New URL after parameter has been removed.
	 *
	 * @param {String} param Name of the parameter to remove from the URL.
	 * @param {String} [url=location.href] URL to search for the parameter.
	 *
	 * @example
	 * url = webmd.url.deleteParam('a');
	 *
	 * @example
	 * url = webmd.url.deleteParam('a', url);
	 *
	 * @see webmd.url.clear
	 */
    deleteParam: function(param, url) {
        var parts;
        // Re-construct the URL
        // Split the url into its components
        // Delete the parameter from the params object
        return void 0 === url && (url = location.href), parts = this._getParts(url), delete parts.params[param], 
        this._buildUrl(parts);
    },
    /**
	 * Get the hash (document fragment) from a URL
	 *
	 * @returns {String} Hash part of the URL (without the '#' character), or empty string.
	 *
	 * @param {String} [url=document.location.href] URL to search for the hash.
	 *
	 * @example
	 * hash = webmd.url.getHash();
	 *
	 * @example
	 * hash = webmd.url.getHash(url);
	 *
	 * @see webmd.url.setHash
	 */
    getHash: function(url) {
        // I can has the hash, but do not encode it
        return void 0 === url && (url = location.href), this._getParts(url).hash;
    },
    /**
	 * Set or change the hash (document fragment) on a URL.
	 *
	 * The hash value will be URL encoded before being added to the URL.
	 *
	 * @returns {String} The new URL
	 *
	 * @param {String} hash New value for the hash.
	 * @param {String} [url=location.href] URL to add the hash.
	 *
	 * @example
	 * url = webmd.url.setHash('myvalue')
	 *
	 * @example
	 * url = webmd.url.setHash('myvalue', url)
	 *
	 * @see webmd.url.getHash
	 * @see webmd.url.clear
	 */
    setHash: function(hash, url) {
        // Remove any existing hash
        // In case a developer specified a hash starting with a # character, remove it
        // return the url with hash added but do not encode it
        return void 0 === url && (url = location.href), url = url.replace(/#.*/, ""), hash = hash.replace(/^#/, ""), 
        hash && (url = url + "#" + hash), url;
    },
    /**
	 * Clear the query string and hash from the URL
	 *
	 * @returns {String} The new URL
	 *
	 * @param {String} [url=location.href] URL to search for the hash.
	 *
	 * @example
	 * url = webmd.url.clear()
	 *
	 * @example
	 * url = webmd.url.clear(url)
	 */
    clear: function(url) {
        return void 0 === url && (url = location.href), this._getParts(url).url;
    },
    /**
	 * Get the hostname part of a URL.
	 *
	 * @returns {String} The hostname of the URL.
	 *
	 * @param {String} [url=location.href] URL to search for the hostname.
	 */
    getHostname: function(url) {
        var a;
        // If url was not supplied, use the current location
        // If url was not supplied, use the current location
        // If a url was supplied, get the hostname part
        // Easiest way is to create an A element and use browser native hostname parameter
        return void 0 === url ? location.hostname : (a = document.createElement("a"), a.href = url, 
        a.hostname);
    },
    /**
	 * Determine the lifecycle (live, preview, staging) of a URL
	 *
	 * @returns {String} The lifecycle with a leading period, or a blank string for live.
	 * For example:
	 * <ul>
	 * <li>"" = live</li>
	 * <li>".preview"</li>
	 * <li>".staging"</li>
	 * </ul>
	 *
	 * @param {String} [url=location.href] The URL to use in determining the environment.
	 * If not provided, will use document.location.href.
	 *
	 * @example
	 * lc = webmd.url.getLifecycle('http://www.preview.webmd.com');
	 * // Returns '.preview'
	 *
	 * @example
	 * lc = webmd.url.getLifecycle('http://www.webmd.com');
	 * // Returns ''
	 */
    getLifecycle: function(url) {
        var hostname;
        // Return the lifecycle, or empty string for live
        // Return the lifecycle, or empty string for live
        return hostname = this.getHostname(url), -1 !== hostname.indexOf(".preview.") ? ".preview" : -1 !== hostname.indexOf(".staging.") ? ".staging" : "";
    },
    /**
	 * Determine the environment (production, qa00, perf, etc.)
	 *
	 * <p>The environment will be determined using one of the following paterns:</p>
	 * <ul>
	 * <li> {subdomain}.{lifecycle}.{env}.{domain}</li>
	 * <li> {subdomain}.{lifecycle}.{env}.m.{domain}</li>
	 * </ul>
	 *
	 * <p>Where {lifecycle} is optional and can contain "preview" or "staging",
	 * and {env} is optional.</p>
	 *
	 * @returns {String} The part of the URL that represents the environment,
	 * with a leading period. For example:
	 * <ul>
	 * <li>"" = production (or unknown)</li>
	 * <li>".perf" = perf</li>
	 * <li>".qa00" = qa00</li>
	 * </ul>
	 *
	 * @param {String} [url=location.href] The URL to use in determining the environment.
	 * If not provided, will use document.location.href.
	 *
	 * @example
	 * env = webmd.url.getEnv('http://www.perf.webmd.com');
	 * // Returns '.perf'
	 *
	 * @example
	 * env = webmd.url.getEnv('http://www.webmd.com');
	 * // Returns ''
	 */
    getEnv: function(url) {
        var hostname, parts, env;
        // Split the hostname into parts
        // Remove the last two parts
        // com
        // webmd
        // Get the next part.
        // This could be the environment (qa01), or "m" if we are looking at a mobile URL,
        // or the subdomain (www)
        // If we got "m", then skip it and use the next part,
        // to account for mobile URLs like www.{env}.m.webmd.com
        // If we got "preview" or "staging", then assume we're in production.
        // If there are no additional parts to the hostname, then we must assume we are in production
        // because we reached the subdomain (www|men|diabetes|etc).
        // In a non-production environment there will always be another like "www.qa01"
        // Add a dot in front of the environment so it can easily be added to another url
        // 'http://www' + webmd.url.getEnv() + '.webmd.com
        return hostname = this.getHostname(url), parts = hostname.split("."), parts.pop(), 
        parts.pop(), env = parts.pop(), "m" === env && (env = parts.pop()), ("preview" === env || "staging" === env) && (env = ""), 
        env = env && parts.length ? "." + env : "";
    },
    /**
	 * Modify a production URL and change it to a different environment (production, qa00, perf, etc.)
	 *
	 * <p>Note: this should only be used on production URLs - if the URL provided already contains an env or lifecyle,
	 * then the final URL will not be correct.</p>
	 *
	 * @returns {String} The modified URL set to the correct environment.
	 *
	 * @param {String} url The URL to modify. This should be a production URL without an environment.
	 * @param {String} [baseUrl=location.href] The URL to use in determining the environment.
	 * If not provided, will use location.href.
	 *
	 * @example
	 * url = webmd.url.addLifecycleAndEnv('http://www.webmd.com/');
	 * // If running on a page in http://www.qa01.webmd.com/:
	 * // Results in 'http://www.qa01.webmd.com/'
	 *
	 * @example
	 * url = webmd.url.addLifecycleAndEnv('http://www.m.webmd.com/some/page/');
	 * // If running on a page in http://www.qa01.webmd.com/:
	 * // Results in 'http://www.qa01.m.webmd.com/some/page/'
	 *
	 * @example
	 * url = webmd.url.addLifecycleAndEnv('http://www.webmd.com/', 'http://www.qa01.webmd.com');
	 * // results in: http://www.qa01.webmd.com
	 *
	 * @example
	 * url = webmd.url.addLifecycleAndEnv('http://www.webmd.com/', 'http://www.preview.qa01.webmd.com');
	 * // results in: http://www.preview.qa01.webmd.com
	 *
	 * @example
	 * url = webmd.url.addLifecycleAndEnv('http://www.webmd.com/', 'http://www.preview.qa01.m.webmd.com');
	 * // results in: http://www.preview.qa01.webmd.com
	 *
	 * @example
	 * url = webmd.url.addLifecycleAndEnv('http://www.m.webmd.com/', 'http://www.qa01.webmd.com/');
	 * // results in: http://www.qa01.m.webmd.com/
	 */
    addLifecycleAndEnv: function(url, baseUrl) {
        // Insert the lifecycle and environment before m.webmd.com or before webmd.com
        // Note we are using a "lazy" regexp (+?) as opposed to greedy,
        // to ensure we don't grab the ".m" part of the url until later
        return url.replace(/(\/\/[^\/]+?)(\.m)?(\.\w+\.\w+)/, "$1" + this.getLifecycle(baseUrl) + this.getEnv(baseUrl) + "$2$3");
    },
    /**
	 * Return the "second level domain" of a URL. For example, "webmd.com".
	 *
	 * <p>This can be useful when you need to create a cookie and want it to apply across the domain
	 * and all subdomains.</p>
	 *
	 * @example
	 * webmd.cookie.set('mycookie', 1, {domain: webmd.url.getSLD()});
	 */
    getSLD: function(url) {
        // Get the hostname from the URL, turn it into an array,
        // then get the last two parts of the array and turn it back
        // into a string.
        return this.getHostname(url).split(".").splice(-2, 2).join(".");
    },
    //--------------------------------------------------
    // Private functions
    // These are not intended to be used outside of this object.
    //
    /**
	 * @private
	 * @description
	 * Regular expression used to split a URL into parts.
	 * To improve performance, this is created once instead of creating it each
	 * time a URL is processed.
	 */
    _getPartsRegExp: new RegExp("([^#?]*)\\??([^#]*)?#?(.*)?"),
    /**
	 * @private
	 * @description
	 * Splits a URL into its component parts.
	 *
	 * @returns
	 * {Object} An object with the following string parameters:
	 * o.url = anything before the question mark
	 * o.query = anything between the question mark and hash (#)
	 * o.hash = anything after the hash
	 * o.params = array of objects with 'name' and 'value' parameters.
	 *
	 * @param {String} [url=document.location.href] URL to search for the hash.
	 */
    _getParts: function(url) {
        var matches, result;
        // Create the default result object
        // Get the matches for the RegExp
        // Make sure we got some matches from the RegExp
        // Check if we actually got a match for the parts
        // Turn the query string into an object
        return result = {
            url: "",
            query: "",
            hash: "",
            params: {}
        }, matches = this._getPartsRegExp.exec(url), null !== matches && (result.url = void 0 === matches[1] ? "" : matches[1], 
        result.query = void 0 === matches[2] ? "" : matches[2], result.hash = void 0 === matches[3] ? "" : decodeURIComponent(matches[3]), 
        result.params = this._splitParams(result.query)), result;
    },
    /**
	 * @private
	 * @description
	 * Splits a query string (a=1&b=2) into an object that contains name:value for each parameter.
	 * The value of each parameter is always an array of values (that is, if there is only one value
	 * it will still be stored as an array containing a single item).
	 *
	 * Decodes the names & values for special (\nnnn) values.
	 *
	 * @returns {Object} An object with name:value pairs for each parameter.
	 *
	 * @param {String} params The search query part of the URL (without the ?) such as (a=1&b=2)
	 */
    _splitParams: function(paramsString) {
        var i, paramsArray, nameValueArray, valueArray, name, value, result;
        if (result = {}, paramsString) for (// Convert all '+' characters to spaces,
        // then split into individual key=value pairs
        paramsArray = paramsString.replace(/\+/g, " ").split("&"), i = 0; i < paramsArray.length; i++) nameValueArray = paramsArray[i].split("="), 
        name = nameValueArray[0], value = nameValueArray[1] || "", name && (// Decode the name and values
        name = decodeURIComponent(name), value = decodeURIComponent(value), // Create an array for the value(s)
        // or if we already encountered this parameter name, use the array that was previously created
        valueArray = result[name] || [], // Add the value to the array
        valueArray.push(value), // Now save the values array in the result object for this parameter name
        result[name] = valueArray);
        return result;
    },
    /**
	 * @private
	 * @description
	 * Reconstructs a URL based on the parts object that was created by {@link webmd.url._getParts}
	 *
	 * @returns {String} The new URL
	 *
	 * @param {Object} parts An object of URL parts as returned by {@link webmd.url._getParts}
	 */
    _buildUrl: function(parts) {
        var i, paramName, params, result, separator, values;
        // Shortcut variable
        params = parts.params, // Start with the url part
        result = parts.url, // Add "?" in front of the first parameter,
        // then "&" in front of subsequent parameters
        separator = "?";
        // Loop through the params object
        for (paramName in params) // Make sure we loop through only the parameters of this object
        // (not any that might have inherited through the prototype)
        if (params.hasOwnProperty(paramName)) // Loop through the values for this parameter and add each to the result
        for (values = params[paramName], i = 0; i < values.length; i++) // On the first parameter, separator will be "?"
        result += separator + encodeURIComponent(paramName) + "=" + encodeURIComponent(values[i]), 
        // On subsequent loops use ampersand as a separator
        separator = "&";
        // Add the hash back to the URL if it was present
        // removing endcoding from the hash, as it doesn't need to be encoded
        return parts.hash && (result += "#" + parts.hash), result;
    }
}, /*! webmd.cookie */
// Create a local scope so we can create some private functions
function() {
    /**
	 * Get the prefix for a scrambled cookie.
	 *
	 * <p>Each scrambled cookie starts with a prefix such as "[rot13]" that indicates the scramble algorithm.</p>
	 *
	 * @returns {String} The scramble prefix or an empty string.
	 *
	 * @example
	 * value = '[rot13]super';
	 * prefix = scramblePrefixGet(value);
	 * // returns 'rot13'
	 *
	 * @private
	 */
    function scramblePrefixGet(s) {
        // Find the characters within [] at the begining of the string
        var match = s.match(/^\[(.+?)\]/);
        // Match will contain null if no match was found,
        // or an array of matches
        // Match will contain null if no match was found,
        // or an array of matches
        return match ? match[1] || "" : "";
    }
    /**
	 * Add a prefix to a cookie value.
	 *
	 * @param {String} prefix The prefix to add
	 * @param {String} value The cookie value
	 *
	 * @returns {String} The cookie value with the prefix added to the beginning.
	 *
	 * @example
	 * value = 'super';
	 * value = scramblePrefixAdd('rot13', value);
	 * // returns '[rot13]super'
	 *
	 * @private
	 */
    function scramblePrefixAdd(prefix, value) {
        return "[" + prefix + "]" + value;
    }
    /**
	 * Remove the prefix from a cookie value.
	 *
	 * @param {String} value The cookie value
	 *
	 * @returns {String} The cookie value with the prefix removed.
	 *
	 * @example
	 * value = '[rot13]super';
	 * value = scramblePrefixRemove(value);
	 * // returns 'super'
	 *
	 * @private
	 */
    function scramblePrefixRemove(s) {
        return s.replace(/^\[(.+?)\]/, "");
    }
    /**
	 * Scramble or unscramble the text in a string using Rot13 encoding.
	 *
	 * @private
	 * @param {String} str
	 * @returns {String}
	 */
    function rot13(str) {
        return (str || "").replace(/[a-z]/gi, function(a) {
            var n = a.charCodeAt(0);
            return String.fromCharCode(n > 109 || 97 > n && n > 77 ? n - 13 : n + 13);
        });
    }
    /**
	 * Scramble or unscramble the numbers in a string using Rot5 encoding.
	 *
	 * @private
	 * @param {String} str
	 * @returns {String}
	 */
    function rot5(str) {
        return str.replace(/[0-9]/g, rot5replace);
    }
    /**
	 * Function to use with String.replace() to scramble a single number that is matched.
	 *
	 * String.replace() function accepts the following arguments, but we just need the first:
	 * str, p1, p2, offset, s
	 *
	 * Refer to the following:
	 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter
	 *
	 * @private
	 * @param {String} str The text that was matched in the regular expression.
	 */
    function rot5replace(a) {
        return rot5matrix.hasOwnProperty(a) ? rot5matrix[a] : a;
    }
    /**
	 * Function to encode the cookie value.
	 * Cookies cannot contain comma, semi-colon, equals, or whitespace. Also should not contain special characters.
	 * So we use encodeURIComponent() to encode it; however, that tends to encode too much, so we will go back
	 * and decode certain characters that are frequently used in json cookies.
	 */
    function encodeValue(value) {
        // { %7B
        // } %7D
        // : %3A
        // [ %5B
        // ] %5D
        // Replacement function for any match of the regular expression
        return encodeURIComponent(value).replace(/%7B|%7D|%3A|%5B|%5D/g, function(s) {
            return decodeURIComponent(s);
        });
    }
    /**
	 * Function to encode the cookie value.
	 */
    function decodeValue(value) {
        return decodeURIComponent(value);
    }
    /**
	 * Remove whitespace before and after.
	 *
	 * Added here so this cookie code does not have any dependence on jQuery.
	 *
	 * @private
	 * @param {String} str
	 * @requires rtrim
	 */
    function trim(str) {
        return (str || "").replace(rtrim, "");
    }
    /**
	 * Substitution matrix for numbers in rot5. Add five to numbers 0-4; subtract 5 from numbers 5-9.
	 * We could calculate this, but it is easier and better performance to hard-code it here.
	 *
	 * @private
	 */
    var rot5matrix = {
        0: 5,
        1: 6,
        2: 7,
        3: 8,
        4: 9,
        5: 0,
        6: 1,
        7: 2,
        8: 3,
        9: 4
    }, rtrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
    /**
	 * @namespace Functions that manipulate cookies
	 *
	 * @description Get, set, or delete a cookie.
	 *
	 * <p><b>IMPORTANT:</b> this function should not be called directly,
	 * use the shortcut methods attached to this function object instead.
	 * This function is subject to change without notice.</p>
	 *
	 * @returns {String||null} The cookie value. If the scramble option was specified, returns the scrambled value
	 * if you are setting the cookie, and the unscrambled value if you are getting the cookie.
	 * If retrieving a cookie that does not exist, returns null.
	 *
	 * @param {String} name Name of the cookie to get or set.
	 *
	 * @param {String} [value] Value of the cookie. Only used when setting the cookie.
	 *
	 * @param {Object} [options] Options for the cookie.
	 *
	 * @param {Number|Date} [options.expires=session] Expiration data for the cookie.
	 * If you specify a number, it represents a number of days.
	 * If you specify a negative number (e.g. a date in the past), the cookie will be deleted.
	 * If you specify null or omit this option, the cookie will be a session cookie.
	 *
	 * @param {String} [options.path=/] Path attribute of the cookie.
	 * By default this is '/' so the cookie will apply to all paths, since that is the most common use.
	 * <p>To limit the scope of your cookie, you can set the path of the cookie:</p>
	 * <ul>
	 * <li>Set options.path to an empty string to limit the cookie to the directory of the current page
	 * (and all subdirectories).</li>
	 * <li>You can also set options.path to a path other than the current page; however,
	 * there is a bug in IE where the path must be a directory name ending with slash.</li>
	 * </ul>
	 *
	 * @param {String} [options.domain=current page domain] Domain attribute of the cookie.
	 * Set this to the second level domain (last two parts of the domain, like webmd.com)
	 * if you want the cookie to apply to all subdomains. You can use the {@link webmd.url.getSLD}
	 * function to get the last two parts of the domain.
	 *
	 * @param {Boolean} [options.secure=false] Require secure transmission of the cookie.
	 *
	 * @param {Boolean|String} [options.scramble] Scramble or unscramble the value of the cookie.
	 *
	 * <p>When retrieving a cookie value, it does not matter which value you use for the scramble option
	 * as long as it is "true" or truthy: the cookie value contains a prefix that indicates which algorithm
	 * was used to encode the cookie. For backwards compatibility, if no prefix is found in the cookie,
	 * "rot13" is assumed.</p>
	 *
	 * <p>When setting a cookie, this option should contain "true" to scramble the cookie using the default scramble
	 * algorithm {@link webmd.cookie.scramblerDefault} (rot13n), or a string to indicate a different scramble algorithm
	 * to use.</p>
	 *
	 * <p>The following algorithms are available by default, but others can be added:</p>
	 *
	 * <ul>
	 * <li>rot13 - scrambles letters a-z</li>
	 * <li>rot13n - scrambles letters a-z and numbers 0-9 (the default if you specify "true")</li>
	 * </ul>
	 *
	 * <p>If you set this to a value that is not a valid scramble algorithm then it defaults to rot13n.</p>
	 *
	 * <p>Refer to {@link webmd.cookie.scramblers} for more information on adding custom algorithms.<p>
	 *
	 * @requires JSON
	 * @requires trim()
	 */
    webmd.cookie = function(name, value, options) {
        // The following comment block should appear in the final minified code
        /*! BEGIN LICENSE Cookie plugin
 * This code was based on:
 * Cookie plugin
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
        var cookie, cookieValue, cookies, date, decode, domain, encode, i, path, prefix, secure, self, expires = "";
        if (// Because we have an unusual object structure, we can't use "this".
        // Set the self variable so we can access variables that we'll attach to this function.
        self = webmd.cookie, options = options || {}, "undefined" != typeof value) // A name and a value was given, so we will set the cookie
        // If value is null, that means we will delete the cookie
        // Check if the cookie value needs to be scrambled
        // Set the default algorithm if scramble is set to "true" or to a value that is not a known algorithm
        // We'll assume that the encode function is set up correctly,
        // otherwise let an error happen when it is called
        // Encode the value
        // Add a prefix to the value
        // Check if the expiration is a number or a date object
        // Expires is a number - convert number of days to a date object
        // Expires is a date object - use it as the expiration
        // Set the expires value to use when creating the cookie
        // Set the cookie path.
        //
        // Note there is a bug in IE, where document.cookie will not return a cookie
        // if it was set with a path attribute containing a filename.
        // Internet Explorer Cookie Internals (FAQ)
        // http://blogs.msdn.com/b/ieinternals/archive/2009/08/20/wininet-ie-cookie-internals-faq.aspx
        //
        // The default path with be "/" if you don't specify options.path
        //
        // If you set options.path to an empty string, then we will clear the path for the cookie,
        // and the path will default to the directory of the current page.
        //
        // To set a path manually you can set options.path, but you must be sure it does not
        // contain a filename like /path/default.htm
        //
        // Note: due to the bug in IE, there does not appear to be a way to specify a cookie
        // that is set only for a single page, you can only set a cookie for all urls within
        // a directory (and sub-directories below).
        // Default to '/' if path is not specified so the cookie will apply to every page in the domain.
        return null === value && (value = "", options.expires = -1), options.scramble && (self.scramblers[options.scramble] || (options.scramble = self.scramblerDefault), 
        encode = self.scramblers[options.scramble].encode, value = encode(value), value = scramblePrefixAdd(options.scramble, value)), 
        options.expires && ("number" == typeof options.expires || options.expires.toUTCString) && ("number" == typeof options.expires ? (date = new Date(), 
        date.setTime(date.getTime() + 24 * options.expires * 60 * 60 * 1e3)) : date = options.expires, 
        expires = "; expires=" + date.toUTCString()), domain = options.domain ? "; domain=" + options.domain : "", 
        secure = options.secure ? "; secure" : "", path = void 0 === options.path ? "; path=/" : "" === options.path ? "" : "; path=" + options.path, 
        document.cookie = [ name, "=", encodeValue(value), expires, path, domain, secure ].join(""), 
        value;
        // Make sure there are cookies defined
        if (// Only a cookie name was specified, so we will get the cookie value
        cookieValue = null, document.cookie && "" !== document.cookie) // Loop through all cookies
        for (// Separate individual cookies
        cookies = document.cookie.split(";"), i = 0; i < cookies.length; i++) // Does this cookie string begin with the name we want?
        if (// Trim whitespace and special characters at start and end
        cookie = trim(cookies[i]), cookie.substring(0, name.length + 1) == name + "=") {
            // Check if this is a scrambled cookie
            if (// Get the cookie value and remove browser encoding
            cookieValue = decodeValue(cookie.substring(name.length + 1)), options.scramble) {
                // Throw an error if we don't know how to decode
                if (// Try to get the scramble prefix from the cookie value
                prefix = scramblePrefixGet(cookieValue), // For backwards compatibility, use rot13 if there is no prefix
                prefix || (prefix = "rot13"), !self.scramblers[prefix]) throw "Cannot unscramble cookie with prefix " + prefix;
                // Remove the scramble prefix
                cookieValue = scramblePrefixRemove(cookieValue), // We'll assume that the decode function is set up correctly,
                // otherwise let an error happen when it is called
                decode = self.scramblers[prefix].decode, cookieValue = decode(cookieValue);
            }
            // Stop looping since we found the cookie
            break;
        }
        return cookieValue;
    }, /*! END LICENSE Cookie plugin */
    webmd.cookie = $.extend(webmd.cookie, /** @lends webmd.cookie */ {
        /**
		 * Get the value of a cookie.
		 *
		 * <p>To get the value of a scrambled cookie, you must specify the {scramble:true} option.</p>
		 *
		 * @returns {String} The value of a cookie, or an empty string if the cookie does not exist.
		 *
		 * @param {String} name Name of the cookie.
		 * @param {Object} [options] Refer to {@link webmd.cookie()} for available options.
		 *
		 * @example
		 * v = webmd.cookie.get('mycookie');
		 *
		 * @example
		 * // Get the value of a scrambled cookie
		 * v = webmd.cookie.get('mycookie', {scramble:true});
		 *
		 * @see webmd.cookie.exists()
		 */
        get: function(name, options) {
            var v = this(name, void 0, options);
            return null === v ? "" : v;
        },
        /**
		 * Set the value of a cookie.
		 *
		 * @returns {String} The cookie value. If the scramble option was specified, returns the scrambled value.
		 *
		 * @param {String} name Name of the cookie.
		 * @param {String} value Value for the cookie.
		 * @param {Object} [options] Refer to {@link webmd.cookie()} for available options.
		 *
		 * @example
		 * v = webmd.cookie.set('mycookie', 10);
		 *
		 * @example
		 * // Set the value of a scrambled cookie
		 * v = webmd.cookie.set('mycookie', 10, {scramble:true});
		 *
		 */
        set: function(name, value, options) {
            return this(name, value, options);
        },
        /**
		 * Get the value of a cookie and parse it as json.
		 *
		 * <p>To get the value of a scrambled cookie, you must specify the {scramble:true} option.</p>
		 *
		 * @returns {Object} The value of the cookie parsed as json string and returned as a Javascript data structure.
		 * If the cookie is not set, or the json string cannot be parsed, returns an empty object.
		 *
		 * @param {String} name Name of the cookie.
		 * @param {Object} [options] Refer to {@link webmd.cookie()} for available options.
		 *
		 * @example
		 * v = webmd.cookie.getJson('mycookie');
		 * if (v.firstname) { ... }
		 *
		 * @example
		 * // Get the value of a scrambled cookie
		 * v = webmd.cookie.getJson('mycookie', {scramble:true});
		 */
        getJson: function(name, options) {
            var value = this(name, void 0, options);
            // If cookie doesn't exist, return empty object
            if (null === value) return {};
            // If the cookie doesn't contain json data,
            // parsing it will cause an error.
            try {
                return value = JSON.parse(value);
            } catch (e) {
                // In case of parsing error, return empty object
                return {};
            }
        },
        /**
		 * Set the value of a cookie to a json string.
		 *
		 * @returns {String} The cookie value. If the scramble option was specified, returns the scrambled value.
		 *
		 * @param {String} name Name of the cookie.
		 * @param {Object} oValue A javascript data structure to encode into a json string.
		 * @param {Object} [options] Refer to {@link webmd.cookie()} for available options.
		 *
		 * @example
		 * webmd.cookie.set('mycookie', {first:'Joe',last:'Smith'});
		 */
        setJson: function(name, oValue, options) {
            return this(name, JSON.stringify(oValue), options);
        },
        /**
		 * Determine if a cookie exists.
		 *
		 * @returns {Boolean} True if the cookie exists.
		 *
		 * @param {String} name Name of the cookie.
		 *
		 * @example
		 * if (webmd.cookie.exists('mycookie')) { ... }
		 */
        exists: function(name) {
            return null !== this(name);
        },
        /**
		 * Delete (expire) a cookie.
		 *
		 * You must use the same path/domain options that were used in creating the cookie.
		 *
		 * We could not call this method "delete" because that is a reserved word.
		 *
		 * @returns {String} Empty string.
		 *
		 * @param {String} name Name of the cookie.
		 * @param {Object} [options] Refer to {@link webmd.cookie()} for available options.
		 *
		 * @example
		 * webmd.cookie.deleteCookie('mycookie');
		 *
		 * @example
		 * webmd.cookie.deleteCookie('mycookie', {path:'/'});
		 */
        deleteCookie: function(name, options) {
            return this(name, "", $.extend({}, options, {
                expires: -1
            }));
        },
        /**
		 * Plug-in architecture for different ways to scramble the cookie.
		 * This is an object with key:value pairs:
		 *
		 * <ul>
		 * <li>
		 *   key = the prefix of the scramble algorithm (such as "rot13", or "rot13n").
		 *   This should be a small string (5 chars or less) and only contain alphanumeric characters.
		 * </li>
		 * <li>
		 *   value = an object with two parameters:
		 *   <ul>
		 *     <li>encode = a function that encodes the cookie value string</li>
		 *     <li>decode = a function that decodes the cookie value string</li>
		 *   </ul>
		 * </li>
		 * </ul>
		 *
		 * <p>Note when the encoded text is stored in the cookie, the key is added to the front
		 * of the cookie data, like "[rot13]slkdfjousadfsdf".</p>
		 *
		 * @example
		 *
		 * // Add a new scramble option
		 * webmd.cookie.scramblers.myScramble = {
		 *
		 *   encode: function(s) {
		 *     // Do something to encode the string
		 *     return s;
		 *   },
		 *
		 *   decode: function(s) {
		 *     // Do something to decode the string
		 *     return s;
		 *   }
		 * };
		 *
		 */
        scramblers: {
            // rot13 scramble
            // Scrambles letters a-zA-Z but not numbers.
            rot13: {
                encode: function(text) {
                    return rot13(text);
                },
                decode: function(text) {
                    return rot13(text);
                }
            },
            // rot13n scramble
            // Scrambles letters a-zA-Z and numbers 0-9
            rot13n: {
                encode: function(text) {
                    return rot5(rot13(text));
                },
                decode: function(text) {
                    return rot5(rot13(text));
                }
            }
        },
        /**
		 * Default scramble algorithm, used if a scramble algorithm is not specified,
		 * or if an invalid algorithm is specified. By default this is 'rot13n'.
		 */
        scramblerDefault: "rot13n"
    });
}(), !window.webmd) var webmd = {};

window.webmd.m || (webmd.m = {}), /**
 * @namespace
 */
webmd.m.cookieConsent || (webmd.m.cookieConsent = {}), function() {
    webmd.m.cookieConsent = {
        API_VISITOR_EU: "/api/visitorcountry/visitorcountry.svc/isvisitoreu",
        COOKIE_NAME: "ck_consent",
        GLOBAL_CLASS: "cookie-consent",
        COOKIE_OPTIONS: {
            domain: webmd.url.getSLD(),
            expires: 30
        },
        COOKIE_POLICIES: {
            "webmd.com": "/about-webmd-policies/cookie-policy",
            "medicinenet.com": "/script/main/art.asp?articlekey=190917",
            "emedicinehealth.com": "/script/main/art.asp?articlekey=190918",
            "rxlist.com": "/script/main/art.asp?articlekey=190919",
            "onhealth.com": "/content/3/cookie_policy"
        },
        defaults: {
            template: '<div class="cookie-consent-ctr"><span class="legal">This website uses cookies to deliver its services as described in our <a href="{cookiePolicyLink}">Cookie Policy</a>. By using this website, you agree to the use of cookies.</span><a class="close" aria-label="Dismiss" title="close"></a></div>',
            selectors: {
                target: {
                    core: "body",
                    mobile: "#main_header"
                },
                container: ".cookie-consent-ctr"
            }
        },
        init: function() {
            var self = this, isVisitorEu = !1, hasCookie = self.hasCookie(self.COOKIE_NAME), isSponsorBox = window.location.href.match(/sponsor-box/), // exclude sponsor-box modules which has scripts included
            template = "", paramIsVisitorEu = webmd.url.getParam("isvisitoreu");
            // override with parameter if provided for testing
            paramIsVisitorEu && paramIsVisitorEu.length && (// convert value to boolean
            paramIsVisitorEu = "true" === paramIsVisitorEu ? !0 : !1, isVisitorEu = paramIsVisitorEu), 
            hasCookie || $.get(self.API_VISITOR_EU).done(function(data) {
                data ? (isVisitorEu = data, isVisitorEu && !isSponsorBox && (// create the template
                template = self.createTemplate(self.defaults.template), template && (// display the banner
                self.displayCookieBanner(self.defaults.selectors.target, template), // register events
                self.bindEvents()))) : self.setCookie(self.COOKIE_NAME, !0, self.COOKIE_OPTIONS);
            }).fail(function() {
                webmd.debug("ERROR: API failure in webmd.m.cookieConsent :: isVisitorEu");
            });
        },
        isVisitorEu: function() {
            var isVisitorEu = !1, paramIsVisitorEu = webmd.url.getParam("isvisitoreu");
            // override with parameter if provided for testing
            // override with parameter if provided for testing
            // convert value to boolean
            return paramIsVisitorEu && paramIsVisitorEu.length ? (paramIsVisitorEu = "true" === paramIsVisitorEu ? !0 : !1, 
            isVisitorEu = paramIsVisitorEu) : void $.get(this.API_VISITOR_EU).done(function(data) {
                return data ? isVisitorEu = data : void 0;
            }).fail(function() {
                webmd.debug("ERROR: API failure in webmd.m.cookieConsent :: isVisitorEu");
            });
        },
        createTemplate: function(template) {
            var policyLink = "";
            return policyLink = this.getCookiePolicyLink(), template = webmd.substitute(template, {
                cookiePolicyLink: policyLink
            });
        },
        displayCookieBanner: function(target, template) {
            var htmlEl = $("html"), dest = htmlEl.hasClass("ua_type_mobile") ? target.mobile : target.core;
            dest && template && ($(dest).prepend(template), htmlEl.addClass(this.GLOBAL_CLASS));
        },
        getCookiePolicyLink: function() {
            var sld = "", link = "";
            try {
                sld = webmd.url.getSLD(), sld && (link = this.COOKIE_POLICIES[sld]);
            } catch (err) {
                webmd.debug("ERROR: cannot find key in webmd.m.cookieConsent :: getCookiePolicyLink", err);
            }
            return link;
        },
        hasCookie: function(cookieName) {
            return webmd.cookie.exists(cookieName) || !1;
        },
        bindEvents: function() {
            var self = this, containerEl = this.defaults.selectors.container;
            $(containerEl).on("click", ".close", function() {
                self.handleClick(self.COOKIE_NAME, !0, self.COOKIE_OPTIONS, containerEl);
            }), $("body").on("click", "a, button, input, select", function() {
                self.handleClick(self.COOKIE_NAME, !0, self.COOKIE_OPTIONS, containerEl);
            });
        },
        handleClick: function(cookieName, cookieValue, cookieOptions, containerEl) {
            try {
                this.setCookie(this.COOKIE_NAME, !0, this.COOKIE_OPTIONS), $("html").removeClass(this.GLOBAL_CLASS), 
                $(containerEl).remove();
            } catch (err) {
                webmd.debug("ERROR: Cannot handle handleClick in webmd.m.cookieConsent.", err);
            }
        },
        setCookie: function(cookieName, cookieValue, cookieOptions) {
            webmd.cookie.setJson(cookieName, cookieValue, cookieOptions);
        }
    };
}(), $(function() {
    webmd.m.cookieConsent.init();
}), /*! webmd.ads */
/**
 * @namespace
 */
webmd.ads = {
    /**
	 * Contains ad server URL parameters
	 * @type {Object}
	 */
    params: {},
    /**
	 * POS mapping that maps pos numbers to ad size.
	 * This mapping is used by the ad seed call code to create the correct size iframe based on ad pos values
	 *
	 * This is the end all be all holy gospel of ad pos values to size.
	 * If it's not on this list, it will not happen, as we do not use PB anymore to set ad size. We only use PB to set POS values
	 */
    posSizeMapping: {
        101: {
            height: 90,
            width: 728
        },
        102: {
            height: 15,
            width: 1
        },
        105: {
            height: 90,
            width: 970
        },
        111: {
            height: 240,
            width: 120
        },
        112: {
            height: 600,
            width: 120
        },
        113: {
            height: 600,
            width: 160
        },
        121: {
            height: 250,
            width: 300
        },
        131: {
            height: 600,
            width: 300
        },
        132: {
            height: 600,
            width: 300
        },
        133: {
            height: 600,
            width: 300
        },
        137: {
            height: 250,
            width: 300
        },
        138: {
            height: 1050,
            width: 300
        },
        404: {
            height: 250,
            width: 300
        },
        700: {
            height: 198,
            width: 300
        },
        701: {
            height: 199,
            width: 145
        },
        901: {
            height: 1,
            width: 1
        },
        5e3: {
            height: 1,
            width: 494
        },
        5001: {
            height: 1,
            width: 494
        },
        5002: {
            height: 1,
            width: 308
        },
        5003: {
            height: 1,
            width: 308
        },
        0: {
            height: 0,
            width: 0
        }
    },
    /**
	 *
	 */
    init: function() {
        function splitParams(adframe, paramsObj) {
            var fullParams, paramsArray, i, nvSplit, name, value, adsurl = $(adframe).attr("src"), m = re.exec(adsurl);
            if (null !== m && (fullParams = void 0 === m[2] ? "" : m[2]), fullParams) for (fullParams = fullParams.replace(/amp;/g, ""), 
            // Clean up messy &amp; parameters in the fullParams string
            paramsArray = fullParams.split("&"), i = 0; i < paramsArray.length; i++) nvSplit = paramsArray[i].split("="), 
            name = decodeURIComponent(nvSplit[0]), value = decodeURIComponent(nvSplit[1]), value = value.replace(/\//g, "%2f"), 
            // If the current param is not the pos value, or pos doesnt exist in the webmd.ads.params object
            "pos" == name && paramsObj[name] ? // Add current pos value to comma-delimited list of pos values
            paramsObj[name] = paramsObj[name] + "," + value : // set current param name-value pair
            paramsObj[name] = value;
            return !0;
        }
        // The only reason init exists is to fill in the webmd.ads.params object with the ad paramaters from the XSL and Runtime
        // It does it by crawling through the src of the iframes that the XSL writes and drops those values into the object
        // Since we now (as of 5/2013) have a new ad framework that is based on JS, we can have the XSL drop those params straight
        // into the webmd.ads.params object. We are modifying the code to check for the existence of webmd.ads.params. If that
        // object has been populated, basically ignore init and carry on. If you happen to be on a page that doesn't have the
        // new ad framework we still want this to happen
        if ($.isEmptyObject(this.params)) {
            var re = new RegExp("(.*/)(.*)"), paramsObj = {};
            // Find real ad modules
            $("*[id*='Ad_Iframe']").each(function() {
                splitParams(this, paramsObj);
            }), // Find interactive ad modules
            $.each(webmd.ads.refresh.defaults.src, function() {
                splitParams(this, paramsObj);
            }), this.params = paramsObj;
        }
    },
    /**
	 * Throttled function to refresh all the ad modules on the calling page.
	 *
	 * Throttling the amount of calls (webmd.ads.refresh.throttling.maxCalls) that can be made in a given amount of time (webmd.ads.refresh.throttling.perSeconds) works by adding the current time to an array after removing the older calls.  If the length of the array is in the allowable range, make the call to refresh the ads, webmd.ads._refresh().
	 *
	 * This function will looks for the default parameters of the webmd.ads.refresh.defaults object or override the defaults with the passed object.
	 * @example
	 * // refreshes ads using default refresh values
	 * webmd.ads.refresh();
	 *
	 * // refreshes only the custom ad module with id="myAdModule"
	 * webmd.ads.refresh({selector: "#myAdModule"});
	 *
	 * //  adds the params &segm=0&foo=2 to the end of the src URL
	 * webmd.ads.refresh({params: { segm: 0, foo: 2 }});
	 *
	 * var adObj = {params: { segm: 0, foo: 2 }, selector: "#myAdModule"};
	 * webmd.ads.refresh(adObj);
	 *
	 * // change the global default params
	 * webmd.ads.refresh.defaults.params = {segm:0, foo: 2};
	 *
	 * // change the global default selector(s) and then call refresh using the updated default values
	 * webmd.ads.refresh.defaults.selector = "#myAdModule";
	 *
	 * // bind to "refreshAds" event then take action
	 * $(document).on('refreshAds', function( e, data) { //do something });
	 *
	 * @param		{object}		[options]			Refresh options
	 * @param		{string}		[options.selector]	Comma-delimited list of jQuery selectors corresponding to ad modules to be updated
	 * @param		{object}		[options.src]		Created iframe elements output by XSL for interactive ad modules; these tags are referenced by ID (e.g. webmd.ads.src.bannerAd_fmt). Attribute values for those tags can be accessed and manipulated via the JQuery $().attr() method
	 * @param		{object}		[options.params]	Name/value pairs to be added to the ad src URL as query string parameters
	 * @param		{Function}		[options.filter]	Receives the src string, manipulates it in some fashion, and then returns	that result as a string to webmd.ads.refresh
	 */
    refresh: function(options) {
        webmd.debug("============= Refresh:", options);
        var self = this, currentTime = new Date().getTime(), oldestIndex = 0, queue = self.refresh.throttling.queue, maxTime = 1e3 * self.refresh.throttling.perSeconds;
        // run through array to find older calls
        $.each(queue, function(i, timeQueued) {
            return currentTime - timeQueued > maxTime ? !1 : void oldestIndex++;
        }), // remove older call times
        queue.splice(oldestIndex), // add new call time
        queue.unshift(currentTime), queue.length <= self.refresh.throttling.maxCalls ? // make actual refresh call if allowed
        webmd.ads2.isInitialized() ? self._refreshDFP(options) : self._refresh(options) : (// throw warning and remove oldest call to keep array small
        webmd.debug("WARNING!  Too many ad refresh calls being made"), queue.pop());
    },
    _refreshDFP: function(options) {
        // Set default options, and let passed-in options override them
        // options might be coming in as a boolean here from webmd.metrics.dpv
        // but extend handles that gracefully and just doens't do anything
        var o = $.extend(!0, {}, webmd.ads.refresh.defaults, options);
        o.keys = o.params, // Trigger an event so other code can tie into this
        // Note: in previous DE refresh code, this event was not triggered on the first load
        // of an interactive ad module, however I'm not sure if that's possible with DFP
        // moved to webmd.ads2.refresh() on 2016-11-03
        // $(document).trigger('before_adrefresh');
        // Call Refresh and pass options
        webmd.ads2.refresh(o);
    },
    /**
	 * Refresh all ad modules on the calling page
	 *
	 * @see		webmd.ads.refresh
	 * @private
	 */
    _refresh: function(options) {
        /**
		 * [replaceAdParam description]
		 *
		 * @inner
		 * @param  {[type]} srcStr [description]
		 * @param  {[type]} pName  [description]
		 * @param  {[type]} pValue [description]
		 * @return {[type]}        [description]
		 */
        function replaceAdParam(srcStr, pName, pValue) {
            var paramRegEx = new RegExp("\\b" + pName + "=[^&#\"']*");
            return srcStr = srcStr.replace(paramRegEx, pName + "=" + pValue);
        }
        // Set default options, and let passed-in options override them
        // options might be coming in as a boolean here from webmd.metrics.dpv
        // but extend handles that gracefully and just doens't do anything
        var o = $.extend(!0, {}, webmd.ads.refresh.defaults, options), transTileId = Math.round(99999999 * Math.random()), pvid = window.s_pageview_id || "99999";
        // making sure that pvid is part of the params that get refreshed. This will also add it into the ads
        // if for some reason they didn't get the pvid the first time around
        o.params.pvid = pvid, // property set if "before_adrefresh" was triggered yet
        // var before_adrefreshTriggered = false;
        // Grab the top divs for all possible ad elements on the page
        $(o.selector).each(function() {
            var ad, src, adFrame = $(this).children("*[id*='Ad_Iframe']");
            // If no ad element is found in the current selector, it may be an interactive ad module
            if ($(this).find("*").not("*[id*='Ad_Iframe'],.ad_placeholder").remove(), adFrame.empty(), 
            // Look for the existence of an ad element
            ad = $(this).find("[id]"), !ad[0]) {
                // Look in the object to find any properties of the o.src object that match the current id
                var adTag = o.src[$(this).attr("id")];
                // If they're found, then it's an interactive ad module that needs an initial ad load
                // Grab the src attribute of adTag iframe for manipulation
                // If they're found, then it's an interactive ad module that needs an initial ad load
                // Clean up messy &amp; parameters in the http query string
                // replace and/or add params & filter for initial ad load
                // URL-encode & characters to work around IE html entity replacement issues
                // Update the adTag iframe's src value
                // Laboriously convert the entire tag to a string, because IE sucks at createElement for iframes
                // Append the tag to the placeholder div
                // no ad found, and no Interactive ad module vars so remove ad frame
                return src = $(adTag).attr("src"), src ? (src = src.replace(/amp;/g, ""), src = replaceAdParam(src, "transactionID", transTileId), 
                src = replaceAdParam(src, "tile", transTileId), $.each(o.params, function(i, val) {
                    // Replace the param value if it exists
                    src = replaceAdParam(src, i, val), // Add the param if it's not already there
                    src.indexOf(i + "=") < 0 && (src = src + "&" + i + "=" + val);
                }), $.isFunction(o.filter) && (src = o.filter(src)), src = src.replace(/&/g, "%26"), 
                $(adTag).attr("src", src), adTag = '<iframe id="' + $(adTag).attr("id") + '" width="' + $(adTag).attr("width") + '" height="' + $(adTag).attr("height") + '" src="' + $(adTag).attr("src") + '" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style=""></iframe>', 
                void $(this).children("div.ad_placeholder").replaceWith(adTag)) : void $(this).parent().remove();
            }
            // ad element was found, but it has no src. Danger, Will Robinson! Dump out of ad refresh
            if (// trigger 'before_adrefresh' event if it hasn't been done yet
            // moved to webmd.ads2.refresh() on 2016-11-03
            // if (!before_adrefreshTriggered) {
            // 	$(document).trigger('before_adrefresh');
            // 	before_adrefreshTriggered = true;
            // }
            src = ad.attr("src")) // Update the iframe
            if (// Replace URL-encoded ampersands "%26" if they exist with actual ampersands to match system-generated ad URLs
            src = src.replace(/%26/g, "&"), src = replaceAdParam(src, "transactionID", transTileId), 
            src = replaceAdParam(src, "tile", transTileId), // replace and/or add params & filter
            $.each(o.params, function(i, val) {
                src = replaceAdParam(src, i, val), // Add the param if it's not already there
                src.indexOf(i + "=") < 0 && (src = src + "&" + i + "=" + val);
            }), $.isFunction(o.filter) && (src = o.filter(src)), // clear the style tag on the iframe in case 3rd part people have added inline styles to it
            $(ad).attr("style", ""), // URL-encode & characters to work around IE html entity replacement issues
            src = src.replace(/&/g, "%26"), ad[0].contentWindow) // To avoid adding to the page history and messing up the back button,
            // use location.replace instead of changing the src of the iframe
            // Catch exceptions thrown by users with Ad Blocker extensions
            try {
                ad[0].contentWindow.location.replace(src);
            } catch (e) {
                webmd.debug(e);
            } else ad.attr({
                src: src
            });
        });
    },
    /**
	 * Public function used be the ad modules to handle the ad seed call and write out ads
	 * We first setup the proper ad based on the attributes provided in the passed in param.
	 * Then we go off and setup a deferred promise to listen to the ad seed call
	 * Once that promise comes back, we check to see if there are any overrides to the default param
	 * If there are, we use those, otherwise, we use the defaults and write out the ad
	 *
	 * @param   {object}  Contains the attributes of the ad to setup. Requires the following
	 *                    - adLocation - "banner", "left", "right"
	 *                    - adURL - The URL as the XSL processes it including all parameters
	 *                    - trans - The trans id as provided by runtime
	 *                    - tile - The tile id as provided by runtime
	 *                    - pos - The pos value provided by the PB module
	 *
	 * @public
	 */
    handleAdSeedCall: function(ad) {
        var self = this;
        // check to make sure we have everything we need to handle the ad seed call
        // if we don't something was messed up with the XSL, so we get out before we write some weird looking iframe
        // check to make sure we have everything we need to handle the ad seed call
        // if we don't something was messed up with the XSL, so we get out before we write some weird looking iframe
        // finish out entire ad property object
        // fill out iframe id and ad container
        // grab width and height based on mapping and pos value that came from pb
        // create the webmd.ads object for the correct iframe
        // populate the attributes with the defaults as passed in by the PB module
        // if there is a seed call, wait till it's done and repopulate the attributes. If there isn't one, write ad with defaults
        // pass in the ad object into private function so it creates a new instance of the object as we need that
        return "object" == typeof ad && ad.adLocation && ad.adURL && ad.trans && ad.tile && ad.pos ? (ad.iframeId = ad.adLocation + "Ad_Iframe", 
        ad.iframeContainer = ad.adLocation + "Ad_fmt", ad.iframeContainerWrapper = ad.adLocation + "Ad_rdr", 
        ad.width = webmd.object.get("width", self.posSizeMapping[ad.pos]) || 0, ad.height = webmd.object.get("height", self.posSizeMapping[ad.pos]) || 0, 
        webmd.ads.refresh.defaults.src[ad.iframeContainer] = document.createElement("iframe"), 
        $(webmd.ads.refresh.defaults.src[ad.iframeContainer]).attr({
            src: ad.adURL,
            width: ad.width,
            height: ad.height,
            id: ad.iframeId,
            title: "Advertisement Frame",
            marginwidth: 0,
            marginheight: 0,
            style: "margin:0;",
            frameborder: 0,
            scrolling: "no"
        }), void (webmd.ads.adSeedCallPromise ? webmd.ads.adSeedCallPromise.done(function() {
            // override the default parameters from the ad seed call.
            // If we didn't get a new pos from the seed call, just use the default one we had
            ad.pos = webmd.object.get("webmd.ads.pageConfig.adPosValues." + ad.adLocation + ".pos") || ad.pos, 
            ad.height = webmd.object.get("height", self.posSizeMapping[ad.pos]) || ad.height, 
            ad.width = webmd.object.get("width", self.posSizeMapping[ad.pos]) || ad.width, $(webmd.ads.refresh.defaults.src[ad.iframeContainer]).attr({
                width: ad.width,
                height: ad.height
            }), // pass in the ad object into private function so it creates a new instance of the object as we need that
            self._writeSeedCallAd(ad);
        }) : self._writeSeedCallAd(ad))) : void webmd.debug("Ad Seed Call: The proper ad parameters were not provided. Will not create ad iframe");
    },
    /**
	 * Private function used by the handleAdSeedCall function to actually write the ad out on the page
	 *
	 * @param   {object}  Contains the attributes of the ad to write. Requires the following
	 *                    - iframeContainer - the name of the iframe container of the ad we want
	 *                    - trans - The trans id as provided by runtime
	 *                    - tile - The tile id as provided by runtime
	 *                    - pos - The pos value provided by the PB module
	 *					- width - The width of the current ad that we are writing
	 *
	 * @private
	 */
    _writeSeedCallAd: function(ad) {
        // refresh/create the ad with all parameters specified
        // we have to put this double id selector in here because whoever coded iframed sponsor boxes named them with the same
        // damn id as the right ad. Arrrgghhhhh
        webmd.ads.refresh({
            selector: "#" + ad.iframeContainerWrapper + " #" + ad.iframeContainer,
            params: {
                pos: ad.pos,
                transactionID: ad.trans,
                tile: ad.tile
            }
        }), // also setting the width of the container to the width of the ad dynamically
        // this allows us to keep the advertisement label aligned correctly if the ads are sized differently from their defaults
        $("#" + ad.iframeContainer).css({
            width: ad.width
        }), webmd.debug(webmd.ads.refresh.defaults.src[ad.iframeContainer]);
    }
}, $(function() {
    webmd.ads.init();
}), /**
 * Defaults for webmd.ads.refresh
 *
 * @namespace
 * @type		{Object}
 */
webmd.ads.refresh.defaults = {
    /**
	 * Comma-delimited list of jQuery selectors corresponding to ad modules to be updated
	 * @type		{String}
	 * @default	#bannerAd_fmt, #leftAd_fmt, #rightAd_fmt, #slideshow_ad_300x250, #cw_btm_ad_300x250
	 */
    selector: "#bannerAd_fmt, #leftAd_fmt, #rightAd_fmt, #slideshow_ad_300x250, #cw_btm_ad_300x250, #top_ad, #bottom_ad",
    /**
	 * Created iframe elements output by XSL for interactive ad modules; these tags are referenced by ID (e.g. webmd.ads.src.bannerAd_fmt). Attribute values for those tags can be accessed and manipulated via the JQuery $().attr() method
	 * @type		{Object}
	 */
    src: {},
    /**
	 * Name/value pairs to be added to the ad src URL as query string parameters
	 * @type		{Object}
	 */
    params: {}
}, /**
 * Throttling variables for webmd.ads.refresh
 *
 * @namespace
 * @type		{Object}
 */
webmd.ads.refresh.throttling = {
    /**
	 * maximum amount of calls that can be made per a given time
	 * @type		{Number}
	 * @default	10
	 */
    maxCalls: 10,
    /**
	 * amount of seconds that a set amount of calls can be made before halting
	 * @type		{Number}
	 * @default	5
	 */
    perSeconds: 5,
    /**
	 * ad refresh queue
	 * @type		{Array}
	 */
    queue: []
};

// webmd.ads2.js
// DEPENDENCIES: jQuery
// This library is used on WebMD, Boots, O&O, and Medscape
var googletag, webmd;

// Create webmd object if it doesn't already exist
webmd = window.webmd || {}, // NOTE: developers should not directly call google code, they should only use functions in webmd.ads namespace.  If
// additional functionality is needed, it should be added to webmd.ads namespace so we can have a single interface into
// the google code.
// Set up array of functions to run after the Google code loads.
// google.cmd is the array of functions to run.
// You must use google.cmd.push() to add functions (don't do this directly, use webmd.ads.googleDefer instead).
// After the Google code loads, it replaces the push() function so instead of adding to the array,
// it runs the function immediately.
googletag = googletag || {}, googletag.cmd = googletag.cmd || [], /**
 * Ads framework
 */
webmd.ads2 = {
    /**
	 * Storage for ads that have been defined.
	 * @private
	 */
    ads: {},
    /**
	 * Ad target values for all ads on the page.
	 * This is an array of strings that will be concatenated to form the ad target.
	 * For example, if you want the ad slot /1234/travel/asia/food, then the array
	 * would be ['travel','asia','food'].
	 *
	 * <p>This parameter can be overridden, or more values can be added, but you
	 * must do so before calling defineAd()</p>
	 *
	 * @example
	 * // Override the ad target
	 * webmd.ads2.adTarget = ['consumer', 'rxlist'];
	 *
	 * @example
	 * // Override the second part of the target
	 * webmd.ads2.adTarget[1] = 'rxlist';
	 *
	 * @example
	 * // Set sensitive topic exclusion for consumer webmd
	 * webmd.ads2.adTarget[2] = 'st-conwbmd';
	 */
    adTarget: [ "consumer", "webmd" ],
    /**
	 * Google network code that is sent with each ad.
	 * This, along with the adTarget parameter, is used when defining the ad slots.
	 */
    networkCode: "",
    /**
	 * Storage for the page targets that have been set for all ads.
	 * We don't technically need to save these, but this can be used
	 * for reference after ads have been set up.
	 * In particular it is used to determine when certain ads should be
	 * blocked due to "safe select" requirements.
	 *
	 * @example
	 * if (webmd.ads2.pageTargets.pt == '1623') { ... }
	 */
    pageTargets: {},
    /**
	 * Storage for the page exclusions that have been set for all ads.
	 * We don't technically need to save these, but this can be used
	 * for reference after ads have been set up.
	 * In particular it is used to determine when certain ads should be
	 * blocked due to "safe select" requirements.
	 *
	 * @example
	 * if (webmd.ads2.pageExclusions.age11)) { ... }
	 */
    pageExclusions: {},
    /**
	 * Size overrides for individual ad positions.
	 * This is an object with key/value pairs where the key is a pos value,
	 * and the value is a size array like those passed into webmd.ads2.defineAd()
	 *
	 * <p>
	 * This can be used to set default sizes for all the ad positions
	 * so you do not have to pass the size when you define the ad.
	 * </p>
	 *
	 * <p>
	 * It can also be used to define size overrides, in case you define an
	 * ad with a set of sizes, but on certain pages you want to override those sizes.
	 * In this case you must set the size override before defining the ad.
	 * </p>
	 *
	 * <p>
	 * Note: if a size is set here, any size passed to defineAd() is ignored.
	 * </p>
	 *
	 * @example
	 * // Set sizes for various ad positions
	 * webmd.ads2.sizes = {
	 *   101: [ [300, 250], [300,600] ],
	 *   121: [ 300, 250 ]
	 * };
	 * // ...
	 * webmd.ads2.defineAd({pos:101, id:'ads2-pos-101'});
	 *
	 * @example
	 * // Override the size for a single ad on this page
	 * webmd.ads2.sizes['101'] = [300,250];
	 */
    sizes: {},
    /*==================================================
	 * START OF FUNCTIONS
	 *==================================================*/
    /**
	 * Function to call once to initialize the ads framework.
	 * Can be done at the top or bottom of the page.
	 * Calling this multiple times will have no ill effects.
	 */
    init: function() {
        var lif, clif, clif_obj, saf, csaf, csaf_obj;
        // Do a check to make sure nobody tries to run init twice,
        // because that might really screw things up.
        if (!this.init.flag) {
            if (this.init.flag = !0, // set the Google network code
            this.networkCode = this.setNetworkCode(), // Load the javascript library from google
            "undefined" == typeof webmd.googleloaded && this.googleLoad(), !webmd.isIE9AndBelow) {
                try {
                    lif = window.sessionStorage.getItem("lif"), clif_obj = webmd.adsCookie.get("sess").lif, 
                    //Object {111798914: "lif111798914x"}
                    lif ? // if lif is set, update its value if necessary
                    clif_obj && (clif = Object.keys(clif_obj)[Object.keys(clif_obj).length - 1], lif !== clif && (// value of lif should be the last key in the object
                    window.sessionStorage.setItem("lif", clif), webmd.ads2.setPageTarget("lif", clif))) : clif_obj && (// set lif to the last key in the collection
                    clif = Object.keys(clif_obj)[Object.keys(clif_obj).length - 1], window.sessionStorage.setItem("lif", clif), 
                    webmd.ads2.setPageTarget("lif", clif));
                } catch (e) {}
                //PPE-172510 - Set Ad Follow Logic - Passing Cookie Into Ad Call
                try {
                    // call ads following on every page load/ reload before defining the ad
                    this.setAdsFollowing(), saf = window.sessionStorage.getItem("saf"), csaf_obj = webmd.adsCookie.get("sess").saf, 
                    //Object {4845995429: "saf4845995429x"}
                    saf ? // if saf is set, update its value if necessary
                    csaf_obj && (csaf = Object.keys(csaf_obj)[Object.keys(csaf_obj).length - 1], saf !== csaf && (// value of saf should be the last key in the object
                    window.sessionStorage.setItem("saf", csaf), webmd.ads2.setPageTarget("saf", csaf))) : csaf_obj && (// set saf value to the last key in the collection
                    csaf = Object.keys(csaf_obj)[Object.keys(csaf_obj).length - 1], window.sessionStorage.setItem("saf", csaf), 
                    webmd.ads2.setPageTarget("saf", csaf));
                } catch (e) {}
                // https://jira.webmd.net/browse/PPE-120734: pass ECD code into ad call if present, otherwise pass ecd=0
                webmd.url.getParam("ecd") ? this.setPageTarget("ecd", webmd.url.getParam("ecd")) : this.setPageTarget("ecd", 0), 
                //Pass site name to DFP - https://jira.webmd.net/browse/PPE-143981
                "undefined" != typeof window.s_site && this.setPageTarget("sname", window.s_site), 
                // https://jira.webmd.net/browse/PPE-157179: Pass pim value to ad server
                this.setPageTarget("pimc", webmd.p.pim.getCount());
            }
            // Allow this function to be chained
            return this;
        }
    },
    /**
	 * Function to tell if init() has already been called.
	 * You can use this to determine if DFP ads are defined on the page.
	 * NOTE: this must be called after webmd.ads2.init() has been called,
	 * otherwise it will report that DFP ads are not on the page.
	 * @returns Boolean
	 */
    isInitialized: function() {
        return Boolean(this.init.flag);
    },
    /**
	 * Add a function to the google asynchronous command queue.
	 *
	 * @param Function f Function to run after google code has loaded.
	 * @param Number i Index for the new function to be pushed into.
	 */
    googleDefer: function(f) {
        // Allow this function to be chained
        // Push the function onto the command array so google can run it later.
        //
        // NOTE: After the google code loads, it actually overrides the push() function
        // so instead of adding to the array, it runs the function immediately.
        // Because of this you should only modify the array using the push() function,
        // you should not attempt to add functions to the queue any other way.
        return googletag.cmd.push(f), this;
    },
    /**
	 * Call this once to load the google code.
	 * For best results call this near the top of the page.
	 * This function is called automatically by init()
	 */
    googleLoad: function() {
        var gads, node, useSSL;
        // Allow this function to be chained
        // Asynchronously load the google code
        return gads = document.createElement("script"), gads.async = !0, gads.type = "text/javascript", 
        useSSL = "https:" === document.location.protocol, gads.src = (useSSL ? "https:" : "http:") + "//securepubads.g.doubleclick.net/tag/js/gpt.js", 
        node = document.getElementsByTagName("script")[0], node.parentNode.insertBefore(gads, node), 
        webmd.googleloaded = !0, this;
    },
    /**
	 * Set a page-level key/value target that will be used for all ads.
	 * This function can set a single key/value, or multiple key/value pairs.
	 * The value can be a single value, or an array of values.
	 *
	 * @param String|Object key The name of the key to add, or an object containing multiple key/value pairs.
	 *
	 * @param String|Array [value] If the "key" parameter is a string, then this is the value for the single key to set.
	 * If the "key" parameter is an object, this parameter is not used.
	 * The value can be a string, or an array of values.
	 * The value cannot be a number, however it can be an array of numbers (possible bug in google code?)
	 *
	 * @example
	 * // Set a single key/value
	 * webmd.ads2.setPageTarget('xpg', '1234');
	 *
	 * @example
	 * // Set a single key with multiple values
	 * webmd.ads2.setPageTarget('xpg', ['1234', '5678']);
	 *
	 * @example
	 * // Set multiple key/value pairs all at once
	 * webmd.ads2.setPageTarget({xpg:'1234', gender:'male', m:[1,2,5]});
	 */
    setPageTarget: function(key, value) {
        var self;
        // Allow this function to be chained
        // We can't call the google code until it is loaded,
        // so we'll add a command to the queue to run later
        return self = this, self.googleDefer(function() {
            // Check if "key" is an object
            $.isPlainObject(key) ? // Loop through multiple key/value pairs
            $.each(key, function(key, value) {
                value = String(self.fixTarget(key, value)), // Add the key and value
                // Note: for some reason the DFP code does not allow
                // numeric values, so cast the value to a String
                googletag.pubads().setTargeting(key, value), // Save the key and value for later reference
                self.pageTargets[key] = value;
            }) : (// Add a single key and value
            value = String(self.fixTarget(key, value)), googletag.pubads().setTargeting(key, value), 
            self.pageTargets[key] = value);
        }), this;
    },
    fixTarget: function(key, value) {
        // Fix some of the targets because runtime sends some extraneous text that we don't want
        return "env" === key && (value = value.replace(/&amp;env=/, "")), "leaf" === key && (value = value.replace(/&amp;leaf=/, "")), 
        "uri" === key && (value = decodeURIComponent(value)), value;
    },
    /**
	 * Set multiple page-level key/value targets that will be used for all ads,
	 * based on a URL-encoded string that contains multiple key=value pairs.
	 *
	 * <p>This function is provided to more easily support legacy systems
	 * that are already outputing a URL-encoded string. It should not be used
	 * for new code.</p>
	 *
	 * @param {String} url A URL-encoded value (sort of). This must contain
	 * key=value pairs, separated by '&amp;'. Note it will not work if the
	 * key=value pairs are separated by '&'.
	 *
	 * @example
	 * webmd.ads2.setPageTargetUrl('key1=val1&amp;key2=val2');
	 */
    setPageTargetUrl: function(url) {
        var i, key, keyValueArray, keyValuePairs, value;
        // Loop through the key=value pairs
        for (// Make sure url is actually passed in as a string
        url = url || "", // Split the string on '&amp;'
        keyValuePairs = url.split("&amp;"), i = 0; i < keyValuePairs.length; i++) // Split into [key,value]
        keyValueArray = keyValuePairs[i].split("="), key = decodeURIComponent(keyValueArray[0] || ""), 
        value = decodeURIComponent(keyValueArray[1] || ""), // If we got a key, set the page target
        key && this.setPageTarget(key, value);
        // Allow this function to be chained
        return this;
    },
    /**
	 * Sets a "category exclusion" for all ads on the page.
	 *
	 * <p>Note we currently do not support setting a category exclusion just for a single ad.</p>
	 *
	 * @param String|Array label The name of the category exclusion label, or an array of names.
	 *
	 * @example
	 * webmd.ads2.setPageExclusion('gen2');
	 *
	 * @example
	 * webmd.ads2.setPageExclusion('gen2', 'age11');
	 */
    setPageExclusion: function(label) {
        var self;
        // Allow this function to be chained
        // Turn label into an array if it is not already an array
        // Wait for google code to be loaded
        return self = this, label = $.isArray(label) ? label : [ label ], self.googleDefer(function() {
            // Loop through the array of labels and set a category exclusion for each one
            $.each(label, function(i, label) {
                googletag.pubads().setCategoryExclusion(label), // Save the exclusion label for later reference
                self.pageExclusions[label] = !0;
            });
        }), self;
    },
    /**
	 * Sets multiple "category exclusions" based on a concatenated string.
	 * This is provided for legacy systems that used to pass a value like
	 * "_label1_label2_" to the ad server. This function will break apart
	 * the string into multiple exclusion labels.
	 *
	 * @param String labels A string containing one or more labels separated
	 * by an underscore character.
	 *
	 * @example
	 * webmd.ads2.setPageExclusionUnderscore('_gen2_m32_h16_o92_age11_age121_age122_');
	 */
    setPageExclusionUnderscore: function(labels) {
        var self;
        // Allow this function to be chained
        // Make sure we actually got a string
        return self = this, labels = labels || "", $.each(labels.split("_"), function(i, label) {
            label && self.setPageExclusion(label);
        }), this;
    },
    /**
	 * Define an ad slot on the page. Generally you will have already created a div on the page as the ad placeholder,
	 * then call this function and pass in the id of that div.	However, you can call this function if necessary before
	 * the div has been created.
	 *
	 * @param Object settings A set of key/value pairs that configures the ad.
	 *
	 * @param Boolean [settings.collapseAfter] Set this to true if you want the ad to collapse when
	 * the ad server returns a blank. If this is not specified then the ad will use
	 * the page default behavior (which is to not collapse the ad).
	 *
	 * @param Boolean [settings.collapseBefore] Set this to true if you want the ad to be
	 * collapsed immediately. The ad will expand if the ad server returns an ad.
	 * If this is not specified then the ad will use the page default behavior
	 * (which is to not collapse the ad).
	 *
	 * @param String settings.id The id attribute for the ad placeholder div.
	 * Each ad must have a unique id. For example, 'ads2-pos-5000'.
	 *
	 * @param Boolean [settings.immediate=false] Immediately display the ad you defined.
	 * This only has an effect if you are defining a new ad after the initial ad call has already been made.
	 * It refreshes only the ad that is being defined. If you need to refresh other ads on the
	 * page you should not use this.
	 *
	 * @param Object [settings.keys] Optional set of key/value pairs to set targeting only for
	 * this individual ad. Note we typically do not set targeting for individual ads,
	 * so use setPageTarget() if you want to set a global target used by all ads.
	 *
	 * @param String settings.pos The POS value for the ad. Each ad on the page must have a POS
	 * value that is unique on the page. For example, '5000'.
	 *
	 * @param Object [settings.refresh=true] Set this to false if this ad should
	 * not be refreshed when calling the webmd.ads2.refresh() function.
	 *
	 * @param Array [settings.sizes=webmd.ads2.sizes] An array of sizes for the ad.
	 * This can be width height values, or multiple width/height pairs.
	 * For example, [350,250] or [[300,250],[300,600]].
	 * If a value is set within webmd.ads2.sizes for the POS value of this ad, then this parameter
	 * is ignored, and the value within webmd.ads2.sizes is used instead.
	 * A size must be defined using one of these methods or an error will occur.
	 *
	 * @example
	 * // Ad that supports a single size
	 * webmd.ads2.defineAd({id:'ads2-pos-5000', pos:5000, sizes:[300,250]});
	 *
	 * @example
	 * // Ad that supports two different sizes
	 * webmd.ads2.defineAd({id:'ads2-pos-5000', pos:5000, sizes:[[300,250], [300,600]]});
	 *
	 * @example
	 * // Create an ad that should not be refreshed
	 * webmd.ads2.defineAd({id:'ads2-pos-5000', pos:5000, sizes:[300,250], refresh:false});
	 *
	 * @example
	 * // Set default ad size so the size does not have to be supplied in the defineAd function
	 * webmd.ads2.sizes['5000'] = [300,600];
	 * // ...
	 * webmd.ads2.defineAd({id:'ads2-pos-5000', pos:5000});
	 *
	 * @example
	 * // Override an ad size
	 * webmd.ads2.sizes['5000'] = [300,600];
	 * // ...
	 * webmd.ads2.defineAd({id:'ads2-pos-5000', pos:5000, sizes:[300,250]});
	 * // Result: ad will use sizes [300,600] instead of [300,250]
	 *
	 * @example
	 * // Define a new ad after the other ads have already loaded,
	 * // and immediately load that ad plus refresh the other ads
	 * webmd.ads2.defineAd({id:'my-new-ad', pos:121, sizes:[300,250]}).refresh()
	 *
	 * @example
	 * // Define a new ad after the other ads have already loaded,
	 * // and immediately load only that ad
	 * webmd.ads2.defineAd({id:'my-new-ad', pos:121, sizes:[300,250]}).refresh({id:'my-new-ad'})
	 */
    defineAd: function(settings) {
        var ignore, fn, self;
        if (self = this, // Make sure settings is an object
        settings = settings || {}, // Check if this ad should be ignored based on a global override.
        // Uses a global variable "ads2_ignore", which must be an object
        // where the key is the pos value of the ad that should be ignored,
        // and the value is a boolean (true=ignore the ad).
        // This is used by certain products such as Answers that
        // need to deploy a single template with multiple ads,
        // then show or hide various ads based on back-end logic.
        //
        // Examples:
        //
        // // Ignore ad position 101
        // var ads2_ignore = { 101: true };
        //
        // // Ignore all the ads
        // var ads2_ignore = { all:true };
        ignore = window.ads2_ignore || {}, !ignore.all && !ignore[settings.pos]) {
            // Check for required settings
            if (// Check if sizes were provided.
            // If webmd.ads2.sizes contains sizes for this POS value, use that to override the size.
            // Otherwise use the sizes that are passed into this function settings.sizes
            settings.sizes = self.sizes[settings.pos] || settings.sizes, !(settings.id && settings.sizes && settings.pos)) throw "Missing id, pos, or sizes for defineAd";
            // Allow this function to be chained
            // Save these settings because we will use them later to actually display the ads
            // Add to the google command queue
            return self.ads[settings.id] = settings, self.googleDefer(function() {
                webmd.debug("define ad");
                var adUnit, adSlot;
                adUnit = "/" + self.networkCode + "/" + self.adTarget.join("/"), // Create the ad slot and set the "pos" key
                adSlot = googletag.defineSlot(adUnit, settings.sizes, settings.id).addService(googletag.pubads()).setTargeting("pos", settings.pos), 
                // Save the ad slot for future use when we refresh ads
                settings.slot = adSlot, // Set extra individual targeting keys if any were provided
                settings.keys && $.each(settings.keys, function(key, value) {
                    adSlot.setTargeting(key, value);
                }), // Override the page-default collapse behavior
                // (only if one of these is set to true)
                (settings.collapseAfter || settings.collapseBefore) && adSlot.setCollapseEmptyDiv(settings.collapseAfter, settings.collapseBefore), 
                // Special case: if we define an ad after webmd.ads2.display() has been called,
                // then we need to tell DFP to display the ad immediately.
                // Note this does not make a call to fetch the ad from DFP unless you set
                // the "immediate" flag, it only initializes the ad space.
                // Otherwise you must call refresh() to fetch the ad
                self.display.flag && (fn = function() {
                    googletag.display(settings.id);
                }, // if there are third party ad services, we will call those services and send googletag.display as a callback
                "undefined" != typeof webmd.tpsvc ? self.callThirdPartyAdServices(fn) : fn(), // Determine if we should immediately fetch this new ad.
                // If we do not immediately fetch the ad, you must later
                // call refresh() to refresh this ad (or refresh all ads).
                settings.immediate && self.refresh({
                    id: settings.id
                }));
            }), this;
        }
    },
    /**
	 * Disables the initial fetch of ads from Google when the page is first loaded.
	 * Calls to refresh() can be used later to display the ads.
	 * This must be called before display() is called so it can block the initial load.
	 */
    disableInitialLoad: function() {
        // Allow this function to be chained
        return this.googleDefer(function() {
            googletag.pubads().disableInitialLoad();
        }), this;
    },
    /**
	* used to store the state of display function
	*/
    displayCalled: !1,
    displayCalledCount: 0,
    /**
	 * Make the ad call to get all ads, then display the ads.
	 * This must be called after all ads have been defined on the page
	 * with a call to defineAd() for each one.
	 *
	 * <p>If you call disableInitialLoad() before calling this function, then the ads will be initialized but will not
	 * be loaded and displayed. Then you can call refresh() to later display the ads. This is useful in cases where you
	 * need to wait for some other event (for example, to set targeting values) before you load the ads.</p>
	 */
    display: function() {
        var self, runDisplay;
        // Allow this function to be chained
        return self = this, self.googleDefer(function() {
            //display has been called
            self.displayCalled = !0, //increment the count
            self.displayCalledCount++, //trigger DFP_DISPLAY_CALLED only first time the display is called
            1 === self.displayCalledCount && $(document).trigger("DFP_DISPLAY_CALLED"), webmd.debug("display"), 
            //masking the "url" parameter to only be the hostname-no subdomians
            googletag.pubads().set("page_url", window.location.protocol + "//www." + webmd.url.getSLD()), 
            // Directs the publisher ads service to make a single request
            // when fetching content for multiple ad slots.
            // This should be called prior to enabling the service.
            googletag.pubads().enableSingleRequest(), // Enables all Google Publisher Tag services that have been defined for ad slots on the page.
            // This is only needed once per page but including it multiple times will not cause any harm.
            googletag.enableServices(), runDisplay = function() {
                // Call display on the ads.
                // Since we are doing enableSingleRequest, the call to display() the first add will make
                // the call to DFP to fetch all the ads. But we must still call display() for each ad on the page.
                $.each(self.ads, function(id, adSettings) {
                    googletag.display(id), // Set a flag so we know that "display" has already been called.
                    // This is used when we add another ad on the page: if display has already been called
                    // we must call display() on the ad right when we define the ad.
                    self.display.flag = !0;
                });
            }, // if there are 3rd party ad services to be executed, call them.
            "undefined" != typeof webmd.tpsvc ? self.callThirdPartyAdServices(runDisplay) : runDisplay();
        }), this;
    },
    /*
	 * Proxy method to all 3rd party ad services. 
	 * All 3rd party Ad service handlers are stored in the thirdPartyAdServices global variable.
	 * This method executes each of those handlers and delays the ad request for a specified length of time
	 * so that 3rd party ad services get a chance to complete processing. 
	 * if all services finish processing before the timeout elapses, the ad request is sent.
	 * otherwise, the ad request will be sent once the timeout expires.
	 *
	 * This all happens asynchronously to allow us to work with multiple 3rd party services
	 * while keeping the timeout delay near constant.
	 *
	 * @param Object adRequest - Ad request handler.
	 * @return {void}
	 */
    callThirdPartyAdServices: function(adRequest) {
        var d, wait, i, len = webmd.tpsvc.cmds.length;
        // if there are no 3rd party ad services to be executed, make the ad request and exit
        if (1 > len) return void adRequest();
        // call all 3rd ad party services that have been defined and queued in the services array
        for (i = 0; len > i; i++) try {
            window.webmd.tpsvc.cmds[i].call();
        } catch (e) {
            webmd.debug(e);
        }
        // This master deferred will be resolved if all 3rd party Ad services complete in time.
        // or it will be rejected when a set timeout has elapsed.
        d = $.Deferred(), /*
		 * @param Number ms - This is the length of time we will wait for ALL 3rd party ad services to finishing processing before we make the ad request
		 */
        wait = function(ms) {
            var timeout = $.Deferred();
            return setTimeout(function() {
                timeout.resolve();
            }, ms), timeout.promise();
        }, // handler to be called when the master deferred object is either resolved or rejected.
        d.always(function(o) {
            adRequest(), webmd.debug("3rd party ad services response: ", o);
        }), // resolve the master deferred object when all 3rd party promises have resolved.
        $.when.apply($, webmd.tpsvc.promises).done(function() {
            d.resolve("all 3rd party services completed");
        }), // reject the master deferred object if the timeout completes before all the 3rd party services finish resolving
        wait(800).then(function() {
            d.reject("timeout");
        });
    },
    /**
	 * Refresh some or all ads on the page. The ads must have been created with a call to webmd.ads2.defineAd()
	 *
	 * @param Object [settings] A set of key/value pairs that configure which ads to refresh.
	 *
	 * @param Object [settings.keys] Optional set of key/value pairs to set page targeting.
	 * Refer to setPageTarget() for more information.
	 *
	 * @param String|Array [settings.id] The id of an ad to refresh,
	 * or an object with several ad ids to refresh.
	 * If this parameter is used, then only the ads specified here will be refreshed.
	 * If the id is in this list, then even if the ad was defined with refresh:false setting,
	 * it will force a refresh.
	 *
	 * @param String|Array [settings.idSkip] The id of an ad to exclude from refresh,
	 * or an object with several ad ids to exclude from refresh.
	 * This parameter cannot be used if the settings.id parameter is used.
	 *
	 * @param String|Array [settings.pos] The POS value of an ad to refresh,
	 * or an object with several ad positions to refresh.
	 * If this parameter is used, then only the ads specified here will be refreshed.
	 * If the pos value is in this list, then even if the ad was defined with refresh:false setting,
	 * it will force a refresh.
	 *
	 * @param String|Array [settings.posSkip] The POS value of an ad to exclude from refresh,
	 * or an object with several ad positions to exclude from refresh.
	 * This parameter cannot be used if the settings.pos parameter is used.
	 *
	 * @example
	 * // Refresh all ads except those that were defined with refresh:false
	 * webmd.ads2.refresh()
	 *
	 * @example
	 * // Refresh all ads except those that were defined with refresh:false,
	 * // and change the page targeting before refreshing the ads
	 * webmd.ads2.refresh({keys:{xpg:"1012"}})
	 *
	 * @example
	 * // Refresh a single ad position
	 * webmd.ads2.refresh({pos:5000});
	 *
	 * @example
	 * // Refresh several ad positions
	 * webmd.ads2.refresh({pos:{5000:true,5001:true}});
	 *
	 * @example
	 * // Refresh all ads except for one ad position
	 * webmd.ads2.refresh({posSkip:5000});
	 *
	 * @example
	 * // Refresh all ads except for several ad positions
	 * webmd.ads2.refresh({posSkip:{5000:true,5001:true}});
	 */
    refresh: function(settings) {
        function invokeRefreshLogic() {
            webmd.debug("refresh"), // Create an array of slots to send to refresh function.
            self.slots = [], // Loop through all the ads that were defined using webmd.ads2.defineAd()
            // so we can gather an array of ads to refresh
            $.each(self.ads, function(id, adSettings) {
                var pos, slot;
                // Check if we should refresh only certain ad positions
                // Note: you cannot use both settings.pos and settings.id
                if (slot = adSettings.slot, pos = adSettings.pos, "undefined" != typeof settings.pos) // Check of the pos values were provided as an object or a single pos
                $.isPlainObject(settings.pos) ? // It is an object, so see if the pos value of this ad is in the list
                settings.pos[pos] === !0 && // Show this ad position
                self.slots.push(slot) : // settings.pos is a single ad position,
                // so only refresh that one position
                String(pos) === String(settings.pos) && self.slots.push(slot); else if ("undefined" != typeof settings.id) // Check of the pos values were provided as an object or a single pos
                $.isPlainObject(settings.id) ? // It is an object, so see if the pos value of this ad is in the list
                settings.id[id] === !0 && // Show this ad position
                self.slots.push(slot) : // settings.id is a single ad id,
                // so only refresh that one ad
                String(id) === String(settings.id) && self.slots.push(slot); else {
                    // There was not a list of ads to refresh, so we will
                    // refresh each ad unless it was defined as a non-refreshable ad,
                    // and unless it was listed in the posSkip parameter.
                    // If this ad was defined with refresh:false then it should not be refreshed.
                    // Refer to defineAd() for more info.
                    if (adSettings.refresh === !1) // Move on to the next ad in the list
                    return !0;
                    // If this ad pos is in the settings.posSkip list then it should not be refreshed
                    if ("undefined" != typeof settings.posSkip) // Check of the posSkip values were provided as an object or a single pos
                    if ($.isPlainObject(settings.posSkip)) {
                        if (settings.posSkip[pos] === !0) // Skip this ad position
                        return !0;
                    } else // settings.posSkip is a single ad position so only skip that one position
                    if (String(pos) === String(settings.posSkip)) // Skip this ad position
                    return !0;
                    // If this ad id is in the settings.idSkip list then it should not be refreshed
                    if ("undefined" != typeof settings.idSkip) // Check of the idSkip values were provided as an object or a single id
                    if ($.isPlainObject(settings.idSkip)) {
                        if (settings.idSkip[id] === !0) // Skip this ad
                        return !0;
                    } else // settings.idSkip is a single ad id so only skip that one ad
                    if (String(id) === String(settings.idSkip)) // Skip this ad
                    return !0;
                    // If we get here, then the ad should not be skipped,
                    // so add it to the list of ads to be refreshed
                    self.slots.push(slot);
                }
            }), // trigger 'before_adrefresh' event
            $(document).trigger("before_adrefresh"), // PPE-56979: Blank ads on Slideshows, monographs, & quizzes
            // from Google DoubleClick Publisher:
            // Our best bet is to use the GPT clear() function googletag.pubads().clear() in the ad tags before the refresh() function.
            // This will clear the object values of the ad slot where the creative is intended to render before auto-refreshing the slot.
            self.slots.length > 0 ? googletag.pubads().clear(self.slots) : googletag.pubads().clear(), 
            //masking the "url" parameter to only be the hostname-no subdomians
            googletag.pubads().set("page_url", window.location.protocol + "//www." + webmd.url.getSLD()), 
            googletag.pubads().refresh(self.slots), webmd.debug("refresh - inside timeout"), 
            // trigger refreshAds event
            $(document).trigger("refreshAds", settings);
        }
        var self, fn;
        // Allow this function to be chained
        // Make sure this is an object in case nothing was passed in
        //if display was called before this,
        //fire invokeRefreshLogic
        // execute 3rd party ad services
        return self = this, settings = settings || {}, self.displayCalled ? (webmd.debug("invoking refresh not using event"), 
        "undefined" != typeof webmd.tpsvc ? self.callThirdPartyAdServices(invokeRefreshLogic) : invokeRefreshLogic()) : $(document).on("DFP_DISPLAY_CALLED", function() {
            webmd.debug("invoking refresh using event"), fn = function() {
                //using setTimeout to skip curerent frame before invoking
                setTimeout(invokeRefreshLogic, 1);
            }, "undefined" != typeof webmd.tpsvc ? // execute 3rd party ad services
            self.callThirdPartyAdServices(fn) : fn();
        }), this;
    },
    /**
	 * Destroy some or all ads slots on the page. The ads must have been created with a call to webmd.ads.defineAd()
	 * 
	 * @param Array [ads] The array containing IDs of ad slots to destroy. 
	 * Array is optional; all ad slots will be destroyed if it is unspecified.
	 * 
	 * @returns Boolean: true if ad slots have been successfully destroyed, false otherwise.
	 *
	 * @example
	 * // destroy specific ads
	 * webmd.ads.destroy(['top-ad', 'right-rail-ad'])
	 *
	 * @example 
	 * // destroy all ads
	 * webmd.ads.destroy()
	 */
    destroy: function(ids) {
        var slots = [];
        if (Array.isArray(ids)) {
            if (// gather up all the slots we want to destroy
            ids.forEach(function(id) {
                id in webmd.ads2.ads && slots.push(webmd.ads2.ads[id].slot);
            }), googletag.destroySlots(slots)) // if we have successfully removed slot objects from GPT, 
            // free the memory associated with the destroyed slots in webmd.ads2.ads collection
            return ids.forEach(function(id) {
                id in webmd.ads2.ads && (delete webmd.ads2.ads[id], webmd.debug("destroyed ad: ", id));
            }), $(document).trigger("destroyAdsComplete"), !0;
        } else if (googletag.destroySlots()) // if we have successfully removed all slot objects from GPT, 
        // reset webmd.ads2.ads collection. Memory will be freed during garbage collection.
        return webmd.ads2.ads = {}, $(document).trigger("destroyAdsComplete"), webmd.debug("destroyed all ads"), 
        !0;
        return !1;
    },
    /**
	 * Helper function to set the appropriate Google NetworkCode based on environment and lifecycle.
	 * Logic:
	 * Production Live - live network code
	 * Production Preview/Staging - sandbox network code
	 * Lower QA environments (QA02/PERF, QA01, QA00) - sandbox network code
	 */
    setNetworkCode: function() {
        var network = {
            live: "4312434",
            sandbox: "8668145"
        }, env = webmd.url.getEnv() || "";
        // if env is production (or functions errored), there will be no value.
        // other lower envs return values (eg: .qa00).
        // if env is production (or functions errored), there will be no value.
        // other lower envs return values (eg: .qa00).
        return "" === env ? network.live : network.sandbox;
    },
    /**
	 * sets the ads following functionality on priority basis, value can be served dynamically. 
	 * 
	 * @param  target {string} - the cbp/any other value passed dynamically 
	 *
	 * @returns null
	 * @example webmd.ads2.setAdsFollowing('CBP');
	 * @description First priority is parameter, 
	 * if the target is not available then go for cookie and pass it to ads call on 
	 * every page load, if the cookie isavailable
	 */
    setAdsFollowing: function(target) {
        var sess = webmd.adsCookie.get("sess");
        // If no cookie and target available, return 
        if (!sess && !target) return void webmd.debug("No cookie or target available for ads following");
        if (target) this.setPageTarget("dsf", target), webmd.adsCookie.set({
            type: "sess",
            prefix: "ds",
            value: "sp",
            count: target
        }); else if (sess && sess.ds && sess.ds.sp && "string" == typeof sess.ds.sp) {
            var matches = sess.ds.sp.match(/^dssp_(.+)x$/);
            matches && webmd.ads2.setPageTarget("dsf", matches[1]);
        }
    }
}, // webmd.ads2.consumer.js
// DEPENDENCIES: webmd.ads2.js
// This library is used on WebMD, Boots, O&O, but not Medscape
/*
 * Layer on top of webmd.ads2 or consumer websites.
 */
webmd.ads2Consumer = {
    /**
	 * set by certain pages that dont want their Ad Target overwritten by the defaults in sensitive/sponsored/etc scenarios. e.g responsive daily video player.
	 */
    skipDefaultAdUnits: !1,
    /**
	 * This function provides a single call for several things that the ad module must do.
	 * It is provided as a shortcut to reduce the amount of javascript code that must
	 * be dropped on the page from the ad module.
	 *
	 * @param Object settings
	 * @param Object [settings.blockCodes]
	 * @param Object settings.id
	 * @param Object settings.pos
	 * @param Object settings.sizes
	 * @param Object [settings.targets]
	 *
	 */
    defineAd: function(settings) {
        var ads2, self, targets, ecdCode;
        self = this, ads2 = webmd.ads2, // shortcut variable to make code minify better
        ads2.init(), targets = settings.targets || {}, window.ads2_ignore = window.ads2_ignore || {}, 
        ecdCode = webmd.url.getParam("ecd"), // Get the ecd param from the URL.
        ecdCode && ecdCode.indexOf("conmkt") > -1 && settings && (settings.isMobile ? window.ads2_ignore[1901] = !0 : window.ads2_ignore[901] = !0), 
        ads2.googleDefer(function() {
            // Fix some of the targets because runtime sends some extraneous text that we don't want
            targets.env ? targets.env = ads2.fixTarget("env", targets.env) : // PPE-73736: SET env in PROD ACTIVE to '0'. every other env is '1'
            targets.env = webmd.url.getEnv() || webmd.url.getLifecycle() ? "1" : "0", targets.leaf && (targets.leaf = ads2.fixTarget("leaf", targets.leaf)), 
            targets.uri && (targets.uri = ads2.fixTarget("uri", targets.uri)), "" === targets.pt && delete targets.pt, 
            "[exgid]" === targets.ex && delete targets.ex, // Legacy functionality:
            // global variable webmd.adappid can be set to indicate the app value for all ad calls
            webmd.adappid && (targets.app = webmd.adappid), /**
			 * PPE-60843: Corrected format for PUG to DFP
			 * Change the DFP code for PUGs as follows:
			 * If the value is blank or if (as in CMS) it's two underscores "__" nothing should be sent to DFP
			 * If the value is populated DFP code can send as-is. The format is already correct in these use cases on all Runtimes - CMS, O&O, Vits/Sups, Drugs.
			 * Single value is just a number, such as "444444", Multiple values is sent as "4444,22222,11111"
			 */
            targets.hasOwnProperty("pug") && (targets.pug && "__" !== targets.pug || delete targets.pug), 
            //set default segment if none is defined
            targets.segm || (targets.segm = "0"), //provide a default size if no size is defined
            self.sizeIsNotDefined(settings.sizes) && (settings.sizes = self.getSizeForPos(settings.pos)), 
            // add default ad sizes to existing list of sizes
            settings.sizes = self.addSizes(settings.pos, settings.sizes), // Set ad tag emb=1 to indicate if the current page is an embedded asset
            "undefined" != typeof window.ads2_emb && "1" === window.ads2_emb && (targets.emb = "1"), 
            // PPE-49123: Pass CUI Values to the DFP Ad Call
            // 2) call this function from "defineAd" just before ads2.setPageTarget(targets).
            webmd.isIE9AndBelow ? ("rd" in targets && delete targets.rd, webmd.debug("The browser is IE9 and Below, No rd values.")) : (// TODO:
            // NOTE: Add any new parameters that we want to send in DFP call inside
            // this IF CONDITION
            self.setResponsive(targets), // PPE-88551: We should observe lineItemId passed as 0 on the first ad call
            self.setTargets(targets)), // Set the page targets
            ads2.setPageTarget(targets), // Set default slot level targets
            self.setSlotLevelTargets(settings), // Set the block codes
            ads2.setPageExclusionUnderscore(settings.blockCodes), // Check if safe-select needs to be triggered
            self.checkRules(), // Define the ad
            ads2.defineAd(settings);
        });
    },
    /**
	 * This function should be called at end of the page to display the DFP ads.
	 */
    display: function() {
        var ads2, cmt, self, usprivacycookie;
        ads2 = webmd.ads2, self = this, webmd.ads2.googleDefer(function() {
            if (// Check if PIM maximum has been reached
            // (or if something else on the page has already claimed the PIM interrupt)
            // Note this is also done at the top of the page but we repeat it at the bottom.
            webmd.object.get("webmd.p.pim.isAllowed") && !webmd.p.pim.isAllowed() && ads2.setPageTarget("pimx", "1"), 
            //Pass Lotame ID stored in a cooke to DFP - https://jira.webmd.net/browse/PPE-121501
            !webmd.cookie.get("lpid") || webmd.isIE9AndBelow || webmd.cookie("WBMD_AUTH") || ads2.setPageTarget("lpid", webmd.cookie.get("lpid")), 
            // Capture cmt campaign values from cmt cookie value
            // Split the values and pass to 'cmt' in ad call if it is 3 digit
            // else pass it to 'ml' in ad call
            cmt = webmd.cookie.get("cmt")) try {
                if (cmt = JSON.parse(cmt), "undefined" != typeof cmt.campaigns) {
                    for (var cmtData = [], mlData = [], i = 0; i < cmt.campaigns.length; i++) 3 === cmt.campaigns[i].length ? cmtData.push(cmt.campaigns[i]) : mlData.push(cmt.campaigns[i]);
                    ads2.setPageTarget("cmt", cmtData.join(",")), ads2.setPageTarget("ml", mlData.join(","));
                }
            } catch (e) {
                webmd.debug("Something went wrong while trying to parse cmt cookie.\n", e);
            }
            if (// get usprivacy cookie value and pass it to 'usps' as page level target value
            // pass 3rd character of the cookie value to 'usoo' as page level target value
            usprivacycookie = webmd.cookie.get("usprivacy")) try {
                var usoo = usprivacycookie.charAt(2);
                ads2.setPageTarget("usps", usprivacycookie), ads2.setPageTarget("usoo", usoo);
            } catch (e) {
                webmd.debug("Something went wrong while fetching the usprivacy cookie", e);
            }
            ads2.display();
        });
    },
    hasStorage: function() {
        try {
            return sessionStorage.setItem("test", "1"), sessionStorage.removeItem("test"), !0;
        } catch (e) {
            return !1;
        }
    },
    setSafeSelect: function() {
        webmd.ads2.setPageExclusion("ssg");
    },
    // set IU parts for user-generated content
    setUserGeneratedContent: function() {
        var adUnit2, map, setUgc;
        // IU parts are defined as a folder hierarchy. For example "4312434/consumer/webmd".
        // Some applications like local health directory, are defined as sub-folders of a parent app;
        // for example "4312434/consumer/webmd/dirconwbmd".
        // since we can potentially have several apps defined as subfolders of a parent app, we can represent the
        // hierarchy with the following data structure.
        map = {
            webmd: [ "webmdugc", {
                "dir-conwbmd": "dir-wbmdugc"
            } ],
            mednet: [ "mednetugc" ],
            rxlist: [ "rxlistugc" ],
            emed: [ "emedugc" ],
            onhealth: [ "onhealthugc" ],
            webmdmobileweb: [ "webmdmobilewebugc", {
                "dir-cmbwwbmd": "dir-wbmdmwugc"
            } ],
            mednetmobileweb: [ "mednetmobilewebugc" ],
            rxlistmobileweb: [ "rxlistmobilewebugc" ],
            emedmobileweb: [ "emedmobilewebugc" ],
            onhealthmobileweb: [ "onhealthmobilewebugc" ]
        }, setUgc = function(pivot) {
            Object.keys(map).forEach(function(item) {
                if (map[item][0] === pivot && "undefined" != typeof map[item][1]) {
                    var obj = map[item][1], key = webmd.ads2.adTarget[2];
                    "undefined" != typeof obj[key] && (webmd.ads2.adTarget[2] = obj[key]);
                }
            });
        }, // Set ad unit 2 based on the mapping.
        // Note: since this function could potentially run multiple times
        // we can't just append "ugc" onto the end.
        adUnit2 = webmd.ads2.adTarget[1], adUnit2 = map[adUnit2] || adUnit2, Array.isArray(adUnit2) ? webmd.ads2.adTarget[1] = adUnit2[0] : webmd.ads2.adTarget[1] = adUnit2, 
        webmd.ads2.adTarget.length > 2 && // i.e [consumer,webmd,dir-conwbmd]
        setUgc(webmd.ads2.adTarget[1]), // Set ad unit 1 to consugc or consugcmobileweb based on desktop vs mobile
        webmd.ads2.adTarget[0] = webmd.ads2.adTarget[0].indexOf("mobile") > 0 ? "consugcmobileweb" : "consugc", 
        // Also turn on "ssg"
        this.setSafeSelect();
    },
    setSensitive: function() {
        var map, _this = this;
        // PPE-105363 skipDefaultAdUnits is set by certain pages that dont want their Ad Target overwritten by the default code below. e.g responsive daily video player.
        _this.skipDefaultAdUnits || (// Ad unit 3 must be set to a special value based on ad unit 2,
        // so create an object to map the correct value
        map = {
            webmd: "st-conwbmd",
            webmdmobileweb: "st-cmbwwbmd",
            mednet: "st-conmnet",
            mednetmobileweb: "st-cmbwmnet",
            rxlist: "st-conrxl",
            rxlistmobileweb: "st-cmbwrxl",
            emed: "st-conemed",
            emedmobileweb: "st-cmbwemed",
            onhealth: "st-cononh",
            onhealthmobileweb: "st-cmbwonh"
        }, // set adunit 4 to indicate sensitive topic.
        // special case for LHD: see https://jira.webmd.net/browse/PPE-209765
        window.location.hostname.indexOf("doctor.") > -1 && webmd.ads2.adTarget[2] ? "mobile" === webmd.useragent.ua.type ? webmd.ads2.adTarget[3] = "dirst-cmbwwbmd" : webmd.ads2.adTarget[3] = "dirst-conwbmd" : // Set ad unit 3 to indicate sensitive topic
        webmd.ads2.adTarget[2] = map[webmd.ads2.adTarget[1]] || ""), // Also turn on "ssg"
        _this.setSafeSelect();
    },
    setHomepage: function() {
        var map;
        // Ad unit 3 must be set to a special value based on ad unit 2,
        // so create an object to map the correct value
        map = {
            webmd: "hp-conwbmd",
            webmdmobileweb: "hp-cmbwwbmd",
            mednet: "hp-conmnet",
            mednetmobileweb: "hp-cmbwmnet",
            rxlist: "hp-conrxl",
            rxlistmobileweb: "hp-cmbwrxl",
            emed: "hp-conemed",
            emedmobileweb: "hp-cmbwemed",
            onhealth: "hp-cononh",
            onhealthmobileweb: "hp-cmbwonh"
        }, // set adunit 4 to indicate homepage.
        // special case for LHD: see https://jira.webmd.net/browse/PPE-209765
        window.location.hostname.indexOf("doctor.") > -1 && webmd.ads2.adTarget[2] ? "mobile" === webmd.useragent.ua.type ? webmd.ads2.adTarget[3] = "dirhp-cmbwwbmd" : webmd.ads2.adTarget[3] = "dirhp-conwbmd" : // Set ad unit 3 to indicate we are on a homepage
        webmd.ads2.adTarget[2] = map[webmd.ads2.adTarget[1]] || "", // Also turn on "ssg"
        this.setSafeSelect();
    },
    setSponsored: function() {
        var map, _this = this;
        // PPE-105363+PPE-120631 skipDefaultAdUnits is set by certain pages that dont want their Ad Target overwritten by the default code below. e.g responsive daily video player.
        _this.skipDefaultAdUnits || (// Ad unit 3 must be set to a special value based on ad unit 2,
        // so create an object to map the correct value
        map = {
            webmd: "sp-conwbmd",
            webmdmobileweb: "sp-cmbwwbmd",
            mednet: "sp-conmnet",
            mednetmobileweb: "sp-cmbwmnet",
            rxlist: "sp-conrxl",
            rxlistmobileweb: "sp-cmbwrxl",
            emed: "sp-conemed",
            emedmobileweb: "sp-cmbwemed",
            onhealth: "sp-cononh",
            onhealthmobileweb: "sp-cmbwonh"
        }, // set adunit 4 to indicate sponsored page.
        // special case for LHD: see https://jira.webmd.net/browse/PPE-209765
        window.location.hostname.indexOf("doctor.") > -1 && webmd.ads2.adTarget[2] ? "mobile" === webmd.useragent.ua.type ? webmd.ads2.adTarget[3] = "dirsp-cmbwwbmd" : webmd.ads2.adTarget[3] = "dirsp-conwbmd" : // Set ad unit 3 to indicate sponsored page
        webmd.ads2.adTarget[2] = map[webmd.ads2.adTarget[1]] || ""), // Also turn on "ssg"
        _this.setSafeSelect();
    },
    /**
     * Add default key/value pair to slot level targets
     * @param Object settings - settings from defineAd 
     * 
    */
    setSlotLevelTargets: function(settings) {
        // map with the pos value from settings and assign default keys
        this.rules.slotTargets[settings.pos] && (settings.keys = settings.keys || {}, settings.keys = Object.assign(settings.keys, this.rules.slotTargets[settings.pos]));
    },
    /*
	 * add key/pair values to ad targets
	 * @param target Object - object representing key/pair values
	 * @returns Object
	 PPE-88551, PPE-90003, PPE-92440, PPE-92430, PPE-172510
	 only get from sessionStorage. cookie->session is only one-time when page-init.
	*/
    setTargets: function(targets) {
        if (this.hasStorage()) {
            if (!targets.lif) {
                var lif = window.sessionStorage.getItem("lif");
                targets.lif = lif || 0;
            }
            if (!targets.saf) {
                var saf = window.sessionStorage.getItem("saf");
                targets.saf = saf || 0;
            }
        }
        return targets;
    },
    /**
	 * PPE-61965: Identify Responsive Breakpoints to DFP
	 * Width 1240+ / bp=1
	 * Width 1023 - 1239 / bp=2
	 * Width 768 - 1019 / bp=3
	 * Width 640 - 767 / bp=4
	 * Width <640 / bp=5
	 * Also add parameter rd=1
	 */
    setResponsive: function(targets) {
        /**
		 * PPE-63134: Identify Responsive Pages to DFP
		 *  When DFP Ad calls are made we should pass the appropriate rd value,
		 * The rd =1 scenario should only be on responsive pages.
		 * Does this really need?
		 * if ('rd' in targets) {
		 *	targets.rd = 1;
		 * }
		 */
        return targets = targets || {}, targets.bp = webmd.getResponsiveWidthType(), targets;
    },
    /**
	 * Check various rules for safe select, user generated content, sensitive topics,
	 * sponsorted destinations, and home pages.
	 */
    checkRules: function() {
        var exclusions, rules, targets;
        exclusions = webmd.ads2.pageExclusions, rules = this.rules, targets = webmd.ads2.pageTargets, 
        webmd.debug(targets), // Check for user-generated content.
        (rules.ugcApp[targets.app] || rules.ugcCc[targets.cc] || rules.ugcPt[targets.pt]) && (webmd.debug("UGC"), 
        this.setUserGeneratedContent()), // Check for sensitive topics
        (rules.sensitiveTopic[targets.pt] || rules.sensitiveTopic[targets.sec] || rules.sensitiveCc[targets.cc]) && (webmd.debug("Sensitive"), 
        this.setSensitive()), // Check for safe-select
        (!rules.adUnit1[webmd.ads2.adTarget[0]] || !rules.adUnit2[webmd.ads2.adTarget[1]] || targets.app && !rules.app[targets.app] || rules.cc[targets.cc] || rules.pt[targets.pt] || exclusions[0]) && (webmd.debug("Safe Select"), 
        this.setSafeSelect()), // Check for sponsorship
        (window.s_sponsor_program || rules.sponsoredPt[targets.pt] || targets.tug) && (webmd.debug("Sponsored"), 
        this.setSponsored()), // Check for homepage
        (rules.homepageCc[targets.cc] || rules.homepagePt[targets.pt]) && (webmd.debug("Homepage"), 
        this.setHomepage());
    },
    /*
	* This function takes a string of underscore separated _array_values_,
	* trims the underscores
	* and returns a js array object
	* @param String underscore delimited array
	* returns array
	*/
    splitPugFromString: function(str) {
        var splitArray;
        return "__" !== str ? (splitArray = str.split("_"), splitArray.shift(), splitArray.pop(), 
        splitArray) : [];
    },
    //return default size per position provided
    getSizeForPos: function(posId) {
        if (this.rules.defaultSizes[parseInt(posId, 0)]) //return the default size array
        return this.rules.defaultSizes[parseInt(posId, 0)];
        throw new Error("no position or default size defined");
    },
    //return true is size is not defined
    sizeIsNotDefined: function(sizesValue) {
        //if size value is defined, is an array and is populated
        //if size value is defined, is an array and is populated
        return sizesValue && $.isArray(sizesValue) && sizesValue.length >= 1 ? !1 : !0;
    },
    /*
	 * adds a default size to the existing array of sizes
	 * @param {String} pos - pos for an ad slot
	 * @param {Array} sizes - An array of sizes for the ad slot
	 * @returns {Array} sizes array with the default size added to it
	 */
    addSizes: function(pos, sizes) {
        // make sure sizes array is not empty
        // make sure it's a 2D array
        // if it's a 1D array, turn it into a 2D array and then push the fluid size into it
        // if the size for the pos is an array then push each into 'sizes'
        // if the size for the pos is array then looping it to push into sizes
        // if its string only then push it directly into sizes
        return parseInt(pos, 0) in this.rules.additionalSizesToSet && sizes.length && (Array.isArray(sizes[0]) || (sizes = [ sizes ]), 
        Array.isArray(this.rules.additionalSizesToSet[parseInt(pos, 0)]) ? this.rules.additionalSizesToSet[parseInt(pos, 0)].forEach(function(size) {
            sizes.push(size);
        }) : "fluid" === this.rules.additionalSizesToSet[parseInt(pos, 0)] && sizes.push(this.rules.additionalSizesToSet[parseInt(pos, 0)])), 
        sizes;
    },
    /*
	 * adds the location codes to the ad call as page level targets
	 *
	 * @returns {Bool} true if targets were added, false if they don't exist in the cookie
	 */
    addLocationData: function() {
        var gtinfo = webmd.cookie.get("gtinfo"), codes = {
            cntr: "dcou",
            ctc: "dctc",
            dma: "ddma",
            st: "dst",
            z: "dzip"
        };
        return "" === gtinfo ? !1 : (gtinfo = JSON.parse(gtinfo), $.each(codes, function(i, v) {
            "undefined" != typeof gtinfo[i] && webmd.ads2.setPageTarget(v, gtinfo[i]);
        }), !0);
    },
    /**
	 * Rules that will be used to determine when to set various flags
	 */
    rules: {
        // Ad unit 1 values (previously known as "site") that ALLOW safe select
        adUnit1: {
            consumer: !0,
            consmobileweb: !0,
            consuk: !0,
            consukmobileweb: !0
        },
        // Ad unit 2 values (previously known as "affiliate") that ALLOW safe select
        adUnit2: {
            webmd: !0,
            webmdmobileweb: !0,
            mednet: !0,
            mednetmobileweb: !0,
            rxlist: !0,
            rxlistmobileweb: !0,
            emed: !0,
            emedmobileweb: !0,
            onhealth: !0,
            onhealthmobileweb: !0
        },
        // App ids that ALLOW safe select
        // Any other app id (if set) will block safe select
        app: {
            7: !0,
            // Drug Database FDA
            8: !0,
            // Drug Database FDB
            18: !0,
            // V&S Database Reference Content
            22: !0,
            // O&O Slideshow and RMQ
            27: !0,
            // MedicineNet Drug Monographs
            28: !0
        },
        // Content classifications that must be blocked
        cc: {
            52: !0,
            // Tool – Assessment
            53: !0,
            // Tool – Calculator
            54: !0,
            // Tool – Animation
            55: !0,
            // Tool – Quiz
            84: !0,
            // Search: Nav - Medline Search
            85: !0,
            // Search: Nav - Recipe Finder
            86: !0,
            // Search: Nav - Search
            87: !0,
            // Search: Nav - Site Search
            90: !0,
            // Search: Nav - Web Search
            99: !0,
            // Tool - Am I a Candidate
            93: !0,
            // Symptom Checker
            100: !0,
            // Tool – Form
            111: !0,
            // Tool – Drugs
            112: !0,
            // Tool – Game
            113: !0,
            // Tool
            121: !0,
            // Search: Nav - Drug Search
            122: !0,
            // Search: Nav - Vitamins Search
            127: !0,
            // Search: Index
            128: !0,
            // Search: Index – Drugs
            129: !0,
            // Search: Index – Vitamins
            131: !0,
            // Tool – Viewer
            138: !0,
            // Tool – Action Plan
            139: !0
        },
        // Leaf ids to block
        leaf: {
            1141: !0,
            // symptom checker
            6141: !0,
            // symptom checker
            13404: !0
        },
        // Primary topic that must be blocked
        pt: {
            3644: !0,
            // Branded Recipe
            4117: !0,
            // symptom checker page 1
            4112: !0,
            // symptom checker page 2
            4113: !0,
            // symptom checker page 3
            4121: !0
        },
        // App ids for user generated content that must be blocked
        ugcApp: {
            2: !0,
            // Message Boards
            4: !0,
            // Blogs
            5: !0,
            // Physician Finder
            12: !0,
            // Drug Database UGC
            17: !0,
            // Blog User Comments - Psych Today
            19: !0,
            // V&S Database UGC
            21: !0,
            // O&O - UGC
            23: !0,
            // WebMD Answers
            200: !0,
            // WebMD Exchange - WebMD Hosted
            201: !0,
            // WebMD Exchange - Member Hosted
            202: !0,
            // WebMD Exchange - Nav pages
            203: !0,
            // WebMD Exchange - Moderated A to Z
            204: !0,
            // WebMD Exchange - Experts A to Z
            500: !0
        },
        // Content classifications for user generated content
        ugcCc: {
            109: !0,
            // Drug Review
            110: !0
        },
        // Primiary topic for user generated content
        ugcPt: {
            3552: !0,
            // Exchanges
            3562: !0
        },
        // Primary or secondary topics that should be marked as sensitive topics
        // TODO: can be just block all 7000 range topic ids? Also can we assume 8000 range are sponsored?
        sensitiveTopic: {
            4050: !0,
            // (Product Recall)
            7e3: !0,
            // (Abortion)
            7001: !0,
            // (Child Abuse)
            7002: !0,
            // (Addiction & Substance Abuse)
            7004: !0,
            // (Childhood Genetic Diseases)
            7005: !0,
            // (Domestic Abuse)
            7006: !0,
            // (Eating Disorders)
            7007: !0,
            // (Grief & Death)
            7009: !0,
            // (Miscarriage)
            7010: !0,
            // (Pregnancy Complications)
            7012: !0,
            // (Sexual Abuse)
            7013: !0,
            // (Suicide)
            7014: !0,
            // (Trauma)
            7015: !0,
            // (Violence)
            7019: !0,
            // (embargo ID)
            7021: !0,
            // (Body Image Issues)
            7022: !0,
            // (Binge Eating Disorder)
            7023: !0,
            // (Anorexia)
            7024: !0,
            // (Bulimia)
            7121: !0,
            // (Sensitive Sponsor)
            7122: !0
        },
        sensitiveCc: {
            20: !0,
            // Product recall
            61: !0
        },
        sponsoredPt: {
            3644: !0,
            // Branded Recipe
            4121: !0
        },
        homepageCc: {
            83: !0
        },
        homepagePt: {
            1728: !0,
            // Home and Top Stories
            home: !0
        },
        //default ad sizes per pos
        defaultSizes: {
            101: [ 728, 90 ],
            102: [ 1, 15 ],
            105: [ 970, 90 ],
            111: [ 120, 240 ],
            112: [ 120, 600 ],
            113: [ 160, 600 ],
            121: [ 300, 250 ],
            131: [ 300, 600 ],
            132: [ 300, 600 ],
            133: [ 300, 600 ],
            137: [ 300, 250 ],
            138: [ 300, 1050 ],
            141: [ 728, 90 ],
            404: [ 300, 250 ],
            700: [ 300, 198 ],
            701: [ 145, 199 ],
            901: [ 1, 1 ],
            903: [ 1, 4 ],
            921: [ 1, 7 ],
            1903: [ 1, 4 ],
            1921: [ 1, 7 ],
            5e3: [ 494, 1 ],
            5001: [ 494, 1 ],
            5002: [ 308, 1 ],
            5003: [ 308, 1 ],
            2051: [ 1, 15 ]
        },
        /*
		 * default ad sizes per pos value. This ad size will always be sent along in the ad call
		 * This effectively adds the 'fluid' size to every pos defined in this object.
		 * Sizes can be string for fluid or array of sizes like [[1,9],[9,2]]
		 */
        additionalSizesToSet: {
            141: [ "fluid", [ 728, 92 ], [ 1, 9 ] ],
            2026: [ "fluid", [ 320, 180 ] ],
            921: "fluid",
            1921: "fluid",
            923: [ "fluid", [ 9, 1 ] ],
            1923: [ "fluid", [ 9, 1 ], [ 300, 250 ] ],
            922: [ [ 970, 251 ] ],
            1922: [ [ 300, 601 ] ],
            5e3: [ "fluid", [ 640, 480 ] ],
            5004: "fluid",
            5054: "fluid",
            111: "fluid",
            1111: "fluid",
            121: [ "fluid", [ 1, 15 ] ],
            137: "fluid",
            102: "fluid",
            2051: "fluid"
        },
        /**
		 * These are default slot level targets for specific pos values
		 * key value pairs which are aded here will be sent in ad call prev_scp section 
		*/
        slotTargets: {
            141: {
                strnativekey: "kEMWZGoo8vzvtwJKrcPEDvnd"
            },
            2026: {
                strnativekey: "JP2PR9q6cJCLZtj36uN7K5cd"
            },
            923: {
                strnativekey: "Vjx59uEm8EVWkMyP8f8smvF8"
            },
            1923: {
                strnativekey: "Vjx59uEm8EVWkMyP8f8smvF8"
            },
            921: {
                strnativekey: "xP8Dby8p66dX1vZpKKVKX4fu"
            },
            1921: {
                strnativekey: "xP8Dby8p66dX1vZpKKVKX4fu"
            }
        }
    }
}, // webmd.sharethrough.js
// DEPENDENCIES: jQuery
// This library is used on webmd.responsiveAds.js, webmd.pagination.js (in responsive-scripts), and responsive-infinite-article.js (in mobile-infinite-scroll)
/**
 *	webmd.sharethrough is framework for incorporating sharethrough targets into a dfp call.
 */
webmd.sharethrough = {
    /**
	 *	current sharethrough key values that belong to certain pos values. For now they will be hard coded here, in the future we might
	 *	build some kind of api for retrieving them based on pos value
	 */
    sharethroughSlots: {
        1923: "Vjx59uEm8EVWkMyP8f8smvF8",
        923: "Vjx59uEm8EVWkMyP8f8smvF8",
        2026: "JP2PR9q6cJCLZtj36uN7K5cd"
    },
    res_st_parents: [],
    /**
	 *	This method will add a unique sharethrough ad slot in a certain element. It will define the ad and add a sharethrough slot level key.
	 *
	 *	id	{String}	the id we are going to be defining the sharethrough ad with (must be unique, if exists will not ad new one)
	 *	parent	{Object}	The element in which we are going to be placing the sharethrough ad
	 *	props	{props}	Any data that we need in order to be get the correct sharethrough ad (ie: pos vaue)
	 */
    addShareThroughAd: function(id, parent, props) {
        //default props for sharethrough ad call
        var dprops = {
            pos: "2026",
            sizes: [ [ 1, 9 ] ],
            refresh: !1,
            immediate: !1
        }, $p = $(parent);
        $("#" + id).length > 0 || (dprops.id = id, dprops = $.extend({}, dprops, props), 
        $p.append($('<div id="' + id + '"data-pos="' + dprops.pos + '"data-sizes="[' + dprops.sizes + ']">')), 
        //adding slot level sharethrough keys
        "undefined" != typeof this.sharethroughSlots[dprops.pos] && (dprops.keys = dprops.keys || {}, 
        dprops.keys.strnativekey = this.sharethroughSlots[dprops.pos]), //webmd ads definition
        webmd.ads2Consumer.defineAd(dprops));
    },
    /**
	 *	Calculates the position to place a template which will be used to replace the embedded assets.
	 *	Note: this was taken from the embedded-assets.js file.
	 *
	 *	page	{integer}	the current page the user is on
	 *
	 *	@return	embed_template	jQuery object connected to the template of the future embedded asset
	 */
    calculateAndSetEmbeddedAsset: function(page) {
        var nodes, target, inserted, tag = "", index = page - 1, //template for the embedded asset
        $embed_template = $('<div class="responsive_sharethrough embed_asset_override reltd_article clearfix native_ad module embed-asset"></div>'), nodeTags = [ // tags to match that we want to count
        "p", "h3", "aside", "ul" ];
        //if the current page already has an embedded asset template we will not be adding a new one
        //if the current page already has an embedded asset template we will not be adding a new one
        /* Gather elements in each article page that are in the list of acceptable node tags
		(that are NOT in the article footer, or in OLs or ULs)*/
        return $(".article-page").eq(index).find(".responsive_sharethrough").length > 0 ? $(".article-page").eq(index).find(".responsive_sharethrough") : (nodes = $(".article-page").eq(index).find(nodeTags.join()).not("footer *").not("ol *, ul *, table *"), 
        target = nodes.eq(Math.floor(nodes.length / 2) - 1), "undefined" != typeof target.prop("tagName") && (tag = target.prop("tagName").toLowerCase()), 
        "h3" === tag && (target = nodes.eq(Math.floor(nodes.length / 2) - 2), "undefined" != typeof target.prop("tagName") && "aside" === target.prop("tagName").toLowerCase()) ? (target.before($embed_template), 
        inserted = !0, $embed_template) : (target.after($embed_template), $embed_template));
    },
    /**
	 *	function used to set the sharethrough to refresh their ads when using a DFP refresh.
	 *	We need to set it in a timeout because there were some race conditions where we called STR.Tag.boot() before the function was available.
	 */
    setSharethroughAdRefresh: function() {
        $(document).on("sfpLoaded", function() {
            "undefined" != typeof STR && "undefined" !== STR.Tag && STR.Tag.boot();
        });
    },
    /**
	*	This will create the initial wrapper and sharethrough elements on all the responsive desktop pages.
	*
	*	@return	null
	*/
    desktopInitialWrapperSetup: function() {
        var $tmp, $article_page = $(".article-body .article-page"), _this = this;
        $article_page.each(function() {
            var $this = $(this), $wrapper = $('<div class="responsive-sharethrough-wrapper"></div>');
            $tmp = webmd.sharethrough.calculateAndSetEmbeddedAsset($this.data("page")), $wrapper.insertBefore($tmp), 
            $tmp.detach().prependTo($wrapper), _this.res_st_parents.push($tmp);
        });
    },
    /*
	*	page	{integer}	The page the user is on.
	*
	*	Used to retrieve the sharethrough element based on the page the user is on.
	*
	*	@return	Object	the sharethrough element in the current page.
	*/
    getDesktopWrapperByPage: function(page) {
        return this.res_st_parents[page - 1] || null;
    },
    /*
	*	Hides all the sharethrough desktop ads
	*
	*/
    hideAllDesktopSTAds: function() {
        for (var i = 0; i < this.res_st_parents.length; i++) $(this.res_st_parents[i]).parent().hide();
    },
    /*
	*	Shows the specific sharethrough ad
	*
	*	$stad	{Object}	The sharethrough ad that we want to become visible
	*
	*	@return	null
	*/
    showHiddenDesktopSTAd: function($stad) {
        $stad.parent().show();
    },
    /*
	*	Returns whether the page should have a sharethrough ad on it or not.
	*
	*	@return	Boolean	Whether or not the page should have a sharethrough ad on it or not.
	*/
    isSharethroughPage: function() {
        //Prevent Sharethrough ad to appear for the following publication sources
        var stPlacements = [ "WebMD Article", "WebMD Policy", "Política de WebMD", "WebMD Corporate", "WebMD Press Release" ];
        if (stPlacements.indexOf(window.s_publication_source) > -1) return !1;
        if ("undefined" != typeof window.s_business_reference && "undefined" != typeof window.s_sponsor_program) {
            var featureSponser = ("Feature" === window.s_business_reference || "Features" === window.s_business_reference) && "" !== window.s_sponsor_program, seoTest = webmd.articleConfig && webmd.articleConfig.seo && Array.isArray(webmd.articleConfig.seo.centerId) && webmd.articleConfig.seo.centerId.indexOf(window.center_id) > -1 && Array.isArray(webmd.articleConfig.seo.busRef) && webmd.articleConfig.seo.busRef.indexOf(window.s_business_reference) > -1;
            //PPE:205772 | SEO test optimisation and suppressShareThrough for special cases
            if (featureSponser || seoTest || webmd.suppressSharethrough) return !1;
        }
        switch (window.s_business_reference) {
          case "News":
          case "Medical Reference":
          case "Features":
          case "Feature":
          case "Expert Commentary":
          case "News - Product Recalls":
            return !0;

          default:
            return !1;
        }
    }
}, //
// DEPENDENCIES: jQuery, webmd.ads2.consumer.js
webmd.responsiveAds = {
    _breakPoint: "largeDesktop",
    _excludedPosValues: [],
    /**
	 * A boolean to test if a 137 exists on the page
	 */
    _is137: !1,
    /**
	 * An exclusions object for ads.  In General, the responsive xsl will convert ads based on device.
	 * This is to handle ads that get output to the dom but are not visible. e.g. left rail ads
	 */
    exclusions: {
        largeDesktop: [],
        smallDesktop: [],
        tablet: [ 113 ],
        phablet: [ 113, 5e3, 5001, 5002, 5003 ],
        mobile: [ 113, 5e3, 5001, 5002, 5003 ]
    },
    /**
	 *
	 * Entry point for responsive ad definition
	 * It grabs all divs with class .ad and grabs the ad params out
	 * of each's data attributes
	 */
    init: function() {
        var $res_st_parent, _this = this, disableAds = _this._checkAdsDisabled(), $stwrapper = $('<div class="responsive-sharethrough-wrapper"></div>');
        if (_this._calculateBreakPoint(), _this._setAds2globals(), $(".ad, .ad-no-css").each(function() {
            var scp, targets, $_this = $(this), adObject = {};
            if (targets = $_this.data("targets"), //slot level targets
            scp = $_this.data("scp"), targets || scp) {
                if (targets && (targets = targets.replace(/'/g, '"'), adObject.targets = JSON.parse(targets)), 
                scp && (scp = scp.replace(/'/g, '"'), adObject.keys = JSON.parse(scp)), adObject.blockCodes = $_this.data("block-codes"), 
                adObject.isMobile = $_this.data("is-mobile"), adObject.pos = $_this.data("pos"), 
                adObject.sizes = $_this.data("sizes"), adObject.id = $_this.attr("id"), adObject.targets && adObject.targets.leaf && (adObject.targets.leaf = adObject.targets.leaf.replace(/&leaf=/, "")), 
                adObject.targets && adObject.targets.env && (adObject.targets.env = adObject.targets.env.replace(/&env=/, "")), 
                137 === adObject.pos && (_this._is137 = !0), 2026 === adObject.pos) {
                    //currently the 137 ad is appearing on mobile pages as a 2026 ad. This should not be happening.
                    //as a quick fix this will stop the ad from appearing while we work out a more direct fix.
                    if ("ads2-pos-2026-pos-137" === this.id) return;
                    adObject.keys = {
                        strnativekey: webmd.sharethrough.sharethroughSlots[2026]
                    };
                }
                _this._applyMatrix(adObject);
            }
        }), webmd.sharethrough.isSharethroughPage() && (// adding a 3 lots of sharethrough ads on a mobile responsive page
        $(".ad").first().data("is-mobile") !== !0 ? (//for desktop allowing the sharethrough ads to refresh via pagination even if they were already loaded
        $(".bottom-ad-override").length > 0 && $(".bottom-ad-override").hide(), window.desktopSharethrough = !0, 
        //sets the sharethrough function that allows sharethrough ads to refresh
        webmd.sharethrough.setSharethroughAdRefresh(), //creates the initial wrappers for sharethrough on all the desktop pages
        webmd.sharethrough.desktopInitialWrapperSetup(), //makes sure that all the desktop sharethrough wrappers are not visible
        webmd.sharethrough.hideAllDesktopSTAds(), //creates and retrieves the first sharethrough element
        $res_st_parent = webmd.sharethrough.getDesktopWrapperByPage(webmd.url.getHash() || 1), 
        $res_st_parent && (webmd.sharethrough.showHiddenDesktopSTAd($res_st_parent), webmd.sharethrough.addShareThroughAd("ads2-pos-923-responsive-sharethrough-ad-page-1-1", $res_st_parent, {
            pos: 923,
            refresh: !0
        }))) : (//mobile version
        $res_st_parent = $(".bottom-ad-override"), $stwrapper.insertBefore($res_st_parent), 
        $res_st_parent.detach().prependTo($stwrapper), $('<span class="st-continue-reading-below">Continue Reading Below</span>').insertBefore($res_st_parent), 
        webmd.sharethrough.addShareThroughAd("ads2-pos-1923-responsive-sharethrough-ad-page-1-1", $res_st_parent, {
            pos: 1923,
            refresh: !1
        }))), !disableAds) {
            webmd.ads2Consumer.addLocationData();
            /*
			 * Test code for Delayed ad call. please refer to https://jira.webmd.net/browse/PPE-123017 for full gist
			 *
			 */
            //check for test options in DTM
            try {
                "undefined" != typeof window.webmd.articleConfig.adsSetting.delay.topicId && $.inArray(window.s_topic, window.webmd.articleConfig.adsSetting.delay.topicId) > -1 && "undefined" != typeof window.webmd.articleConfig.adsSetting.delay.timeout ? setTimeout(webmd.ads2Consumer.display, window.webmd.articleConfig.adsSetting.delay.timeout) : webmd.ads2Consumer.display();
            } catch (e) {
                webmd.ads2Consumer.display();
            }
        }
    },
    /**
	 * Applies the correct exclusion array for the current viewport then places ads
	 * @param {Object} adObject
	 * @param {Object[] }adObject.targets  array of ad targets and custom params
	 * @param {string} adObject.blockCodes  block code string
	 * @param {boolean} adObject.isMobile	bool for if a user is mobile
	 * @param {number} adObject.pos	ad POS
	 * @param {string[]} adObject.sizes	ad size array
	 * @param {string} adObject.id	ad placement target id
	 * @private
	 */
    _applyMatrix: function(adObject) {
        var _this = this, btmAdOverride = ".bottom-ad-override";
        _this._excludedPosValues = _this.exclusions[_this._breakPoint], 2026 === adObject.pos && $(btmAdOverride).length > 0 && (webmd.sharethrough.isSharethroughPage() ? _this._moveTo(adObject.id, btmAdOverride, "middle") : _this._moveTo(adObject.id, btmAdOverride)), 
        2026 === adObject.pos && adObject.sizes.push([ 320, 250 ]), _this.placeAd(adObject);
    },
    /**
	 * Defines an ad given a param object. Wrapper for webmd.ads2Consumer.defineAd
	 * @param {Object} adParams
	 * @param {Object[]}adParams.targets  array of ad targets and custum params
	 * @param {string}adParams.blockCodes  block code string
	 * @param {boolean}adParams.isMobile	bool for if a user is mobile
	 * @param {number}adParams.pos	ad POS
	 * @param {string[]}adParams.sizes	ad size array
	 * @param {string} adParams.id	ad placement target id
	 */
    placeAd: function(adParams) {
        var _this = this;
        //only call the ad if it isn't currently excluded.
        webmd.debug(adParams), _this._excludedPosValues.indexOf(adParams.pos) < 0 ? webmd.ads2Consumer.defineAd(adParams) : webmd.debug(adParams.pos + " was excluded");
    },
    /**
	 * Moves Ad to a new location
	 * @param  {String} ad           Ad to move
	 * @param  {String} newPlacement ELement to where to move the ad into
	 * @param  {String} location There are two choices you can choose 'top' or 'bottom'. Default is 'bottom'
	 */
    _moveTo: function(ad, newPlacement, location) {
        var $elmInsert, $sections = $(newPlacement).first().parent().find("p:not(:empty), ol, ul"), $ad = $("#" + ad);
        location = location || "bottom", $ad.length > 0 && ("top" === location ? $ad.prependTo(newPlacement) : "middle" === location && $sections.length > 0 ? ($elmInsert = $sections.eq(Math.ceil($sections.length / 2)), 
        $elmInsert.prev("h1, h2, h3, h4").length > 0 ? $ad.detach().insertBefore($elmInsert.prev("h1, h2, h3, h4")) : $ad.detach().insertBefore($elmInsert)) : $ad.appendTo(newPlacement));
    },
    /**
	 * Calculates the breakpoint of the loaded screen.
	 *
	 * @private
	 */
    _calculateBreakPoint: function() {
        var _this = this, width = _this._getBrowserWidth(), isMobileAds = $(".ad").first().data("is-mobile") === !0;
        width > 1239 ? _this._breakPoint = "largeDesktop" : width > 1023 ? _this._breakPoint = "smallDesktop" : width > 767 ? _this._breakPoint = "tablet" : 767 >= width && isMobileAds ? _this._breakPoint = "phablet" : 640 > width && isMobileAds ? _this._breakPoint = "mobile" : _this._breakPoint = "tablet";
    },
    /**
	 * Returns the Browser pixel Width
	 *
	 * @returns {Number|number}
	 * @private
	 */
    _getBrowserWidth: function() {
        return window.innerWidth || document.documentElement.clientWidth;
    },
    /**
	 * Sets ads2 global ad targets for mobile.
	 * @private
	 */
    _setAds2globals: function() {
        var _this = this;
        ("mobile" === _this._breakPoint || "phablet" === _this._breakPoint) && (-1 === webmd.ads2.adTarget.indexOf("consmobileweb") && ("tool - messageboards" === window.s_business_reference ? webmd.ads2.adTarget = [ "consugcmobileweb", "webmdmobilewebugchttps" ] : "Blog Post" === window.s_business_reference ? webmd.ads2.adTarget = [ "consugcmobileweb", "webmdmobilewebugc" ] : (webmd.ads2.adTarget[0] = "consmobileweb", 
        webmd.ads2.adTarget[1] = "webmdmobileweb")), window.s_sponsor_program && !webmd.ads2Consumer.skipDefaultAdUnits && webmd.ads2.adTarget.push("sp-cmbwwbmd"));
    },
    /**
	 * Allows for ads to be disabled in preview and staging with query param ?noads=true
	 * added to the end of the url
	 * @returns {boolean}
	 * @private
	 */
    _checkAdsDisabled: function() {
        var _url = webmd.url, lc = _url.getLifecycle(), p = _url.getParam("noads");
        return "true" === p ? "" !== lc : !1;
    }
}, $(function() {
    // If property is true, do not init on pageload
    webmd.ads2.disableAdsInit || webmd.responsiveAds.init();
}), /*! webmd.debug */
/**
 * Display a message to the console if debug mode is on.
 *
 * <p>Call {@link webmd.debug.activate()} or add the following to the page URL to turn on debug mode: ?webmddebug=1</p>
 *
 * <p>Call {@link webmd.debug.deactivate()} or add the following to the page URL to turn off debug mode: ?webmddebug=0</p>
 *
 * @namespace Display debug messages if debug mode is on.
 * @param {*} o... One or more strings or javascript objects to write to the console
 *
 * @example
 * webmd.debug('Hello');
 *
 * @example
 * webmd.debug('My object: ', myobject, anotherVariable);
 *
 * @requires jQuery
 * @requires webmd.url
 * @requires webmd.cookie
 */
webmd.debug = function() {
    // Turn arguments into a real array
    var args = Array.prototype.slice.call(arguments);
    webmd.debug.active && window.console && (console.log.apply ? console.log.apply(console, args) : // Some browsers don't support .apply() for console.log, so just pass an array
    console.log(args));
}, $.extend(webmd.debug, /** @lends webmd.debug */ {
    active: !1,
    cookie: "webmddebug",
    param: "webmddebug",
    /**
	 * This function runs at page load to determine if webmd.debug() should be active.
	 */
    autoDetect: function() {
        // Check for the webmddebug URL parameter
        var param = webmd.url.getParam(this.param);
        "0" === param ? // webmddebug=0 means to deactivate debug mode
        this.deactivate() : ("1" === param || webmd.cookie.exists(this.cookie)) && // If webmddebug=1 or if the cookie exists, then activate debug mode
        this.activate();
    },
    /**
	 * Turn on webmd.debug messages. Sets a cookie so debug mode will carry through to subsequent pages.
	 */
    activate: function() {
        this.active = !0, webmd.cookie.set(this.cookie, "1");
    },
    /**
	 * Turn off webmd.debug messages. Removes the cookie so debug mode will stay off on subsequent pages.
	 */
    deactivate: function() {
        this.active = !1, webmd.cookie.deleteCookie(this.cookie);
    }
}), // Check if we should activate debug messages
// (if the cookie is set, or the url parameter is set)
webmd.debug.autoDetect(), /*!
ColorBox v1.3.15 - a full featured, light-weight, customizable lightbox based on jQuery 1.3+
Copyright (c) 2010 Jack Moore - jack@colorpowered.com
Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
*/
// This has been modified by Tom Hoppe to remove the slideshow and photo code as WebMD will not use it, along with cleaning up the div structure of colorbox as we are using progressively enhanced CSS borders instead of imagery
function($, window) {
    // ****************
    // HELPER FUNCTIONS
    // ****************
    // jQuery object generator to reduce code size
    function $div(id, css) {
        return id = id ? ' id="' + prefix + id + '"' : "", css = css ? ' style="' + css + '"' : "", 
        $("<div" + id + css + "/>");
    }
    // Convert % values to pixels
    function setSize(size, dimension) {
        return dimension = "x" === dimension ? $window.width() : $window.height(), "string" == typeof size ? Math.round(/%/.test(size) ? dimension / 100 * parseInt(size, 10) : parseInt(size, 10)) : size;
    }
    // Assigns function results to their respective settings.  This allows functions to be used as values.
    function process(settings) {
        for (var i in settings) $.isFunction(settings[i]) && "on" !== i.substring(0, 2) && (// checks to make sure the function isn't one of the callbacks, they will be handled at the appropriate time.
        settings[i] = settings[i].call(element));
        return settings.rel = settings.rel || element.rel || "nofollow", settings.href = settings.href || $(element).attr("href"), 
        settings.title = settings.title || element.title, settings;
    }
    function trigger(event, callback) {
        callback && callback.call(element), $.event.trigger(event);
    }
    function launch(elem) {
        if (!closing) {
            if (element = elem, settings = process($.extend({}, $.data(element, colorbox))), 
            $related = $(element), index = 0, "nofollow" !== settings.rel && ($related = $("." + boxElement).filter(function() {
                var relRelated = $.data(this, colorbox).rel || this.rel;
                return relRelated === settings.rel;
            }), index = $related.index(element), // Check direct calls to ColorBox.
            -1 === index && ($related = $related.add(element), index = $related.length - 1)), 
            !open) {
                if (open = active = !0, // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.
                $box.show(), settings.returnFocus) try {
                    element.blur(), $(element).one(event_closed, function() {
                        try {
                            this.focus();
                        } catch (e) {}
                    });
                } catch (e) {}
                // +settings.opacity avoids a problem in IE when using non-zero-prefixed-string-values, like '.5'
                $overlay.css({
                    opacity: +settings.opacity,
                    cursor: settings.overlayClose ? "pointer" : "auto"
                }).show(), "mobile" == webmd.useragent.getType() && $overlay.css({
                    height: document.height + "px"
                }), // Opens inital empty ColorBox prior to content being loaded.
                settings.w = setSize(settings.initialWidth, "x"), settings.h = setSize(settings.initialHeight, "y"), 
                publicMethod.position(0), isIE6 && $window.bind("resize." + event_ie6 + " scroll." + event_ie6, function() {
                    $overlay.css({
                        width: $window.width(),
                        height: $window.height(),
                        top: $window.scrollTop(),
                        left: $window.scrollLeft()
                    });
                }).trigger("scroll." + event_ie6), trigger(event_open, settings.onOpen), $close.html(settings.close).show();
            }
            publicMethod.load(!0);
        }
    }
    var // Cached jQuery Object Variables
    $overlay, $box, $wrap, $content, $related, $window, $loaded, $loadingBay, $loadingOverlay, $close, // Variables for cached values or use across multiple functions
    interfaceHeight, interfaceWidth, loadedHeight, loadedWidth, element, index, settings, open, active, publicMethod, // ColorBox Default Settings.
    // See http://colorpowered.com/colorbox for details.
    defaults = {
        transition: "none",
        speed: 300,
        width: !1,
        initialWidth: "600",
        innerWidth: !1,
        maxWidth: !1,
        height: !1,
        initialHeight: "450",
        innerHeight: !1,
        maxHeight: !1,
        scrolling: !0,
        inline: !1,
        html: !1,
        iframe: !1,
        photo: !1,
        href: !1,
        title: !1,
        rel: !1,
        opacity: .7,
        preloading: !0,
        close: "close",
        open: !1,
        returnFocus: !0,
        loop: !0,
        onOpen: !1,
        onLoad: !1,
        onComplete: !1,
        onCleanup: !1,
        onClosed: !1,
        overlayClose: !0,
        escKey: !0,
        arrowKey: !0,
        hideCloseButton: !1
    }, // Abstracting the HTML and event identifiers for easy rebranding
    colorbox = "colorbox", prefix = "webmdHover", // Events
    event_open = prefix + "_open", event_load = prefix + "_load", event_complete = prefix + "_complete", event_cleanup = prefix + "_cleanup", event_closed = prefix + "_closed", event_purge = prefix + "_purge", event_loaded = prefix + "_loaded", // Special Handling for IE
    isIE = $.browser.msie && !$.support.opacity, // feature detection alone gave a false positive on at least one phone browser and on some development versions of Chrome.
    isIE6 = isIE && $.browser.version < 7, event_ie6 = prefix + "_IE6", closing = !1, boxElement = prefix + "Element";
    // ****************
    // PUBLIC FUNCTIONS
    // Usage format: $.fn.colorbox.close();
    // Usage from within an iframe: parent.$.fn.colorbox.close();
    // ****************
    publicMethod = $.fn[colorbox] = $[colorbox] = function(options, callback) {
        var autoOpen, $this = this;
        // detects $.colorbox() and $.fn.colorbox()
        return !$this[0] && $this.selector ? $this : (options = options || {}, callback && (options.onComplete = callback), 
        $this[0] && void 0 !== $this.selector || ($this = $("<a/>"), options.open = !0), 
        $this.each(function() {
            $.data(this, colorbox, $.extend({}, $.data(this, colorbox) || defaults, options)), 
            $(this).addClass(boxElement);
        }), autoOpen = options.open, $.isFunction(autoOpen) && (autoOpen = autoOpen.call($this)), 
        autoOpen && launch($this[0]), $this);
    }, // Initialize ColorBox: store common calculations, preload the interface graphics, append the html.
    // This preps colorbox for a speedy open when clicked, and lightens the burdon on the browser by only
    // having to run once, instead of each time colorbox is opened.
    publicMethod.init = function() {
        // Create & Append jQuery Objects
        $window = $(window), $box = $div().attr({
            id: colorbox,
            "class": isIE ? prefix + "IE" : ""
        }), $overlay = $div("Overlay", isIE6 ? "position:absolute" : "").hide(), $wrap = $div("Wrapper"), 
        $content = $div("Content").append($loaded = $div("LoadedContent", "width:0; height:0; overflow:hidden"), $loadingOverlay = $div("LoadingOverlay"), $close = $div("Close")), 
        $wrap.append($content), $loadingBay = $div(!1, "position:absolute; width:9999px; visibility:hidden; display:none"), 
        $("body").prepend($overlay, $box.append($wrap, $loadingBay)), $content.children().hover(function() {
            $(this).addClass("hover");
        }, function() {
            $(this).removeClass("hover");
        }).addClass("hover"), // Cache values needed for size calculations
        interfaceHeight = $content.outerHeight(!0) - $content.height(), //Subtraction needed for IE6
        interfaceWidth = $content.outerWidth(!0) - $content.width(), loadedHeight = $loaded.outerHeight(!0), 
        loadedWidth = $loaded.outerWidth(!0), // Setting padding to remove the need to do size conversions during the animation step.
        $box.css({
            "padding-bottom": interfaceHeight,
            "padding-right": interfaceWidth
        }).hide(), // Setup button events.
        $close.click(publicMethod.close), // Adding the 'hover' class allowed the browser to load the hover-state
        // background graphics.  The class can now can be removed.
        $content.children().removeClass("hover"), $("." + boxElement).live("click", function(e) {
            // checks to see if it was a non-left mouse-click and for clicks modified with ctrl, shift, or alt.
            0 !== e.button && "undefined" != typeof e.button || e.ctrlKey || e.shiftKey || e.altKey || (e.preventDefault(), 
            launch(this));
        }), $overlay.click(function() {
            settings.overlayClose && publicMethod.close();
        }), // Set Navigation Key Bindings
        $(document).bind("keydown", function(e) {
            open && settings.escKey && 27 === e.keyCode && (e.preventDefault(), publicMethod.close());
        });
    }, publicMethod.remove = function() {
        $box.add($overlay).remove(), $("." + boxElement).die("click").removeData(colorbox).removeClass(boxElement);
    }, publicMethod.position = function(speed, loadedCallback) {
        function modalDimensions(that) {
            // loading overlay height has to be explicitly set for IE6.
            $content[0].style.width = that.style.width, $loadingOverlay[0].style.height = $content[0].style.height = that.style.height;
        }
        var animate_speed, // keeps the top and left positions within the browser's viewport.
        posTop = Math.max(document.documentElement.clientHeight - settings.h - loadedHeight - interfaceHeight, 0) / 2 + $window.scrollTop(), posLeft = Math.max($window.width() - settings.w - loadedWidth - interfaceWidth, 0) / 2 + $window.scrollLeft();
        // setting the speed to 0 to reduce the delay between same-sized content.
        animate_speed = $box.width() === settings.w + loadedWidth && $box.height() === settings.h + loadedHeight ? 0 : speed, 
        // this gives the wrapper plenty of breathing room so it's floated contents can move around smoothly,
        // but it has to be shrank down around the size of div#colorbox when it's done.  If not,
        // it can invoke an obscure IE bug when using iframes.
        $wrap[0].style.width = $wrap[0].style.height = "9999px", 0 == animate_speed ? (// removing all the colorbox animate and doing inline styling and inline callback instead
        $box[0].style.width = settings.w + "px", $box[0].style.height = settings.h + "px", 
        $box[0].style.top = posTop + "px", $box[0].style.left = posLeft + "px", $box[0].style.display = "block", 
        active = !1, // shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE's iframe implementation.
        $wrap[0].style.width = settings.w + loadedWidth + interfaceWidth + "px", $wrap[0].style.height = settings.h + loadedHeight + interfaceHeight + "px", 
        loadedCallback && loadedCallback()) : $box.dequeue().animate({
            width: settings.w + loadedWidth,
            height: settings.h + loadedHeight,
            top: posTop,
            left: posLeft
        }, {
            duration: animate_speed,
            complete: function() {
                modalDimensions(this), active = !1, // shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE's iframe implementation.
                $wrap[0].style.width = settings.w + loadedWidth + interfaceWidth + "px", $wrap[0].style.height = settings.h + loadedHeight + interfaceHeight + "px", 
                loadedCallback && loadedCallback();
            },
            step: function() {
                modalDimensions(this);
            }
        });
    }, publicMethod.resize = function(options) {
        if (open) {
            if (options = options || {}, options.width && (settings.w = setSize(options.width, "x") - loadedWidth - interfaceWidth), 
            options.innerWidth && (settings.w = setSize(options.innerWidth, "x")), $loaded.css({
                width: settings.w
            }), options.height && (settings.h = setSize(options.height, "y") - loadedHeight - interfaceHeight), 
            options.innerHeight && (settings.h = setSize(options.innerHeight, "y")), !options.innerHeight && !options.height) {
                var $child = $loaded.wrapInner("<div style='overflow:auto'></div>").children();
                // temporary wrapper to get an accurate estimate of just how high the total content should be.
                settings.h = $child.height(), $child.replaceWith($child.children());
            }
            $loaded.css({
                height: settings.h
            }), publicMethod.position("none" === settings.transition ? 0 : settings.speed);
        }
    }, publicMethod.prep = function(object) {
        function getWidth() {
            return settings.w = settings.w || $loaded.width(), settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w, 
            settings.w;
        }
        function getHeight() {
            return settings.h = settings.h || $loaded.height(), settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h, 
            settings.h;
        }
        function setPosition(s) {
            $related.length, settings.loop;
            publicMethod.position(s, function() {
                function defilter() {
                    isIE && //IE adds a filter when ColorBox fades in and out that can cause problems if the loaded content contains transparent pngs.
                    $box[0].style.removeAttribute("filter");
                }
                open && (isIE && photo && $loaded.fadeIn(100), $loaded.show(), trigger(event_loaded), 
                $loadingOverlay.hide(), "fade" === settings.transition ? $box.fadeTo(speed, 1, function() {
                    defilter();
                }) : defilter(), $window.bind("resize." + prefix, function() {
                    publicMethod.position(0);
                }), trigger(event_complete, settings.onComplete));
            });
        }
        if (open) {
            var photo, speed = "none" === settings.transition ? 0 : settings.speed;
            $window.unbind("resize." + prefix), $loaded.remove(), $loaded = $div("LoadedContent").html(object), 
            $loaded.hide().appendTo($loadingBay.show()).css({
                width: getWidth(),
                overflow: settings.scrolling ? "auto" : "hidden"
            }).css({
                height: getHeight()
            }).prependTo($content), $loadingBay.hide(), // floating the IMG removes the bottom line-height and fixed a problem where IE miscalculates the width of the parent element as 100% of the document width.
            $("#" + prefix + "Photo").css({
                cssFloat: "none",
                marginLeft: "auto",
                marginRight: "auto"
            }), // Hides SELECT elements in IE6 because they would otherwise sit on top of the overlay.
            isIE6 && $("select").not($box.find("select")).filter(function() {
                return "hidden" !== this.style.visibility;
            }).css({
                visibility: "hidden"
            }).one(event_cleanup, function() {
                this.style.visibility = "inherit";
            }), "fade" === settings.transition ? $box.fadeTo(speed, 0, function() {
                setPosition(0);
            }) : setPosition(speed);
        }
    }, publicMethod.load = function(launched) {
        var href, prep = publicMethod.prep;
        active = !0, element = $related[index], launched || (settings = process($.extend({}, $.data(element, colorbox)))), 
        trigger(event_purge), trigger(event_load, settings.onLoad), settings.h = settings.height ? setSize(settings.height, "y") - loadedHeight - interfaceHeight : settings.innerHeight && setSize(settings.innerHeight, "y"), 
        settings.w = settings.width ? setSize(settings.width, "x") - loadedWidth - interfaceWidth : settings.innerWidth && setSize(settings.innerWidth, "x"), 
        // Sets the minimum dimensions for use in image scaling
        settings.mw = settings.w, settings.mh = settings.h, // Re-evaluate the minimum width and height based on maxWidth and maxHeight values.
        // If the width or height exceed the maxWidth or maxHeight, use the maximum values instead.
        settings.maxWidth && (settings.mw = setSize(settings.maxWidth, "x") - loadedWidth - interfaceWidth, 
        settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw), 
        settings.maxHeight && (settings.mh = setSize(settings.maxHeight, "y") - loadedHeight - interfaceHeight, 
        settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh), 
        href = settings.href, $loadingOverlay.show(), settings.inline ? (// Inserts an empty placeholder where inline content is being pulled from.
        // An event is bound to put inline content back when ColorBox closes or loads new content.
        $div().hide().insertBefore($(href)[0]).one(event_purge, function() {
            $(this).replaceWith($loaded.children());
        }), prep($(href))) : settings.iframe ? (// IFrame element won't be added to the DOM until it is ready to be displayed,
        // to avoid problems with DOM-ready JS that might be trying to run in that iframe.
        $box.one(event_loaded, function() {
            var iframe = $("<iframe frameborder='0' style='width:100%; height:100%; border:0; display:block'/>")[0];
            iframe.name = +new Date(), iframe.src = settings.href, settings.scrolling || (iframe.scrolling = "no"), 
            isIE && (iframe.allowtransparency = "true"), $(iframe).appendTo($loaded).one(event_purge, function() {
                iframe.src = "//about:blank";
            });
        }), prep(" ")) : settings.html ? prep(settings.html) : href && $loadingBay.load(href, function(data, status, xhr) {
            prep("error" === status ? "Request unsuccessful: " + xhr.statusText : $(this).children());
        });
    }, // Navigates to the next page/image in a set.
    // Note: to use this within an iframe use the following format: parent.$.fn.colorbox.close();
    publicMethod.close = function() {
        open && !closing && (closing = !0, open = !1, trigger(event_cleanup, settings.onCleanup), 
        $window.unbind("." + prefix + " ." + event_ie6), $overlay.hide(), $box.stop().hide(), 
        trigger(event_purge), $loaded.remove(), $box.add($overlay).css({
            opacity: 1,
            cursor: "auto"
        }).hide(), closing = !1, trigger(event_closed, settings.onClosed));
    }, // A method for fetching the current element ColorBox is referencing.
    // returns a jQuery object.
    publicMethod.element = function() {
        return $(element);
    }, publicMethod.settings = defaults;
}(jQuery, this), /*
 *  WebMD Overlay Interface
 *
 *	Usage:
 * 	webmd.overlay.open(o): pass through an object to open an overlay. If colorbox isn't initialized, it will also do it for you. Syntax for object: http://colorpowered.com/colorbox/
 *
 *	webmd.overlay.close(): This method initiates the close sequence, which does not immediately complete. The lightbox will be completely closed only when the 'cbox_closed' event is fired.
 *
 *	webmd.overlay.element(): This method is used to fetch the current HTML element that ColorBox is associated with. Returns a jQuery object containing the element.
 *
 *	webmd.overlay.resize(): This allows ColorBox to be resized based on it's own auto-calculations, or to a specific size. This must be called manually after ColorBox's content has loaded.
 *
 *	webmd.overlay.init(): If you want to pre-initialize colorbox in case you will use it later. It will be auto initialized if you just use .open, but that causes a very slightly delay in opening. Can pass in a function that will be executed upon init complete.
 *
 *  webmd.overlay.remove(): Removes all traces of ColorBox from the document. Not the same as $.colorbox.close(), which tucks colorbox away for future use.
 *
 *  webmd.overlay.replace(o): Replaces all the content of the currently open colorbox with the object. Syntax for object: http://colorpowered.com/colorbox/
 */
webmd.overlay = function(el, o, callback) {
    0 === $("#colorbox").length && $.fn.colorbox.init(), $(el).colorbox(o, callback);
}, webmd.overlay = $.extend(webmd.overlay, {
    open: function(o) {
        var _this = this;
        /* removed the init from the actual colorbox code, and placing it here instead */
        _this.init(), // hideCloseButton needs to be applied every time colorbox is opened
        $("#webmdHoverClose").css("visibility", o.hideCloseButton ? "hidden" : "visible"), 
        $.fn.colorbox(o, o.callback);
    },
    close: function() {
        $.fn.colorbox.close();
    },
    resize: function(o) {
        $.fn.colorbox.resize(o);
    },
    init: function() {
        0 === $("#colorbox").length && $.fn.colorbox.init(), // global event bindings
        $("body").on("webmdHover_open", function() {
            // add class to prevent page from scrolling behind overlay mask
            $(this).attr("data-content-masked", "true");
        }), $("body").on("webmdHover_closed", function() {
            // remove overlay mask class
            $("body").removeAttr("data-content-masked");
        });
    },
    remove: function() {
        $.fn.colorbox.remove();
    },
    replace: function(o) {
        this.open(o, !1);
    },
    alert: function(o) {
        var options = {};
        "string" == typeof o ? options.text = o : options = $.extend(!0, options, o), options.cancel = "", 
        this.confirm(options);
    },
    confirm: function(o) {
        var _this = this, confirmResult = !1, options = {
            text: "",
            ok: "OK",
            okSizeClass: "webmd-btn-xs",
            cancel: "Cancel",
            cancelSizeClass: "webmd-btn-xs",
            width: "",
            callback: function() {}
        };
        options = $.extend(!0, options, o), "string" == typeof o && (options.text = o), 
        options.buttons = webmd.substitute('<button id="webmd_confirm_true_button" class="webmd-btn webmd-btn-sc {okSizeClass}">{ok}</button>', options), 
        options.cancel && (options.buttons += webmd.substitute('<button id="webmd_confirm_false_button" class="webmd-btn webmd-btn-sc {cancelSizeClass}">{cancel}</button>', options));
        var confirmContent = webmd.substitute('<div id="webmd_confirm"><div class="webmd_confirm_content">{text}</div><div class="webmd_confirm_buttons">{buttons}</div></div>', options);
        this.open({
            html: confirmContent,
            innerWidth: options.width,
            onComplete: function() {
                $("#webmd_confirm_true_button").click(function() {
                    return confirmResult = !0, _this.close(), !1;
                }), $("#webmd_confirm_false_button").click(function() {
                    return confirmResult = !1, _this.close(), !1;
                });
            },
            onClosed: function() {
                options.callback(confirmResult);
            }
        });
    }
}), /*! webmd.useragent */
/**
 * Sniffs out user agent string. Requires Modernizr.js which is compiled into scripts.js 
 *
 * <p>Adds classes to HTML element for certain browsers (xx = major version, yy = minor version)</p>
 *
 * <dl>
 *   <dt>Firefox:</dt>
 *   <dd>.browserFF .browserFF_xx browserFF_xx_yy</dd>
 *
 *   <dt>Internet Explorer:</dt>
 *   <dd>.browserIE .browserIE_xx browserIE_xx_yy</dd>
 *
 *   <dt>WebKit:</dt>
 *   <dd>.browserWK .browserWK_xx browserWK_xx_yy</dd>
 * </dl>
 *
 * <p>Also adds two CSS classes to the document so one can create overrides for specific types or devices</p>
 *
 * <pre>
 * .mydiv { width:400px; }
 * .ua_type_mobile .mydiv { width:100%; }
 * .ua_type_iphone .mydiv { width:320px; }
 * </pre>
 *
 * @namespace
 */
webmd.useragent = {
    ua: {
        type: "desktop",
        device: "pc",
        browser: "",
        major_version: "",
        minor_version: ""
    },
    init: function() {
        var self = this, matches = "";
        if (self.agent = self._getNavigatorUserAgent(), /* Test for MSIE x.x; */
        (matches = /MSIE\s(\d+)\.(\d+);/.exec(self.agent)) ? (this.ua.browser = "browserIE", 
        this.ua.major_version = matches[1], this.ua.minor_version = matches[2]) : (matches = /Firefox[\/\s](\d+)\.(\d+)/.exec(self.agent)) ? (this.ua.browser = "browserFF", 
        this.ua.major_version = matches[1], this.ua.minor_version = matches[2]) : (matches = /Chrome\/(\d+)\.(\d+)/.exec(self.agent)) ? (this.ua.browser = "browserCH", 
        this.ua.major_version = matches[1], this.ua.minor_version = matches[2]) : self.agent.indexOf("Safari") > -1 && -1 === self.agent.indexOf("Chrome") ? (// grabs the major and minor version of Safari
        matches = /like Gecko\) \w*\/(\d+)\.(\d+)/.exec(self.agent), this.ua.browser = "browserSF", 
        this.ua.major_version = matches[1], this.ua.minor_version = matches[2]) : (matches = /AppleWebKit\/(\d+)\.(\d+)/.exec(self.agent)) && (this.ua.browser = "browserWK", 
        this.ua.major_version = matches[1], this.ua.minor_version = matches[2]), -1 === self.agent.indexOf("AppleWebKit") || -1 === self.agent.indexOf("Mobile") && -1 === self.agent.indexOf("webOS") || (this.ua.type = "mobile"), 
        -1 !== self.agent.indexOf("iPad") && (this.ua.type = "tablet", this.ua.device = "ipad"), 
        -1 !== self.agent.indexOf("iPhone") && (this.ua.type = "mobile", this.ua.device = "iphone"), 
        -1 !== self.agent.indexOf("Android") && (// check for Samsung and Motorola tablets
        -1 !== self.agent.indexOf("SM-P600") || -1 !== self.agent.indexOf("SCH-I800") || -1 !== self.agent.indexOf("Xoom") ? this.ua.type = "tablet" : this.ua.type = "mobile", 
        this.ua.deviceVer = parseInt(self.agent.match(/Android [0-9.]+/)[0].replace("Android ", "")), 
        this.ua.device = "android"), -1 !== self.agent.indexOf("Blackberry") && (this.ua.type = "mobile", 
        this.ua.device = "blackberry"), (-1 !== self.agent.indexOf("Silk") || -1 !== self.agent.indexOf("Kindle")) && (this.ua.type = "tablet", 
        -1 === self.agent.indexOf("Android") && (this.ua.device = "kindle")), -1 !== self.agent.indexOf("webmdapp") && (this.ua.appview = "webmdapp"), 
        $("html").addClass("ua_type_" + this.ua.type).addClass("ua_device_" + this.ua.device), 
        this.ua.deviceVer && $("html").addClass("ua_deviceVer_" + this.ua.deviceVer), this.ua.appview && $("html").addClass("ua_app_" + this.ua.appview), 
        this.ua.browser) if ($("html").addClass(this.ua.browser).addClass(this.ua.browser + "_" + this.ua.major_version).addClass(this.ua.browser + "_" + this.ua.major_version + "_" + this.ua.minor_version), 
        "browserIE" === this.ua.browser && document.documentMode) {
            var doc = document.documentMode;
            5 === doc && (doc = "quirks"), $("html").addClass("IEDocMode_" + doc);
        } else "browserIE" === this.ua.browser && 7 === this.ua.major_version && $("html").addClass("IEDocMode_7");
        $("html").removeClass("no-js").addClass("js");
    },
    /**
	 * Private function that just grabs and returns the navigator.useragent. Using this to write unit testing.
	 *
	 * @return {string} navigator.userAgent
	 */
    _getNavigatorUserAgent: function() {
        return navigator.userAgent;
    },
    /**
	 * Retrieves the device.
	 *
	 * "pc" - Normal computer
	 * "ipad" - Has iPad in the user agent string
	 * "iphone" - Has iPhone in the user agent string
	 * "android" - Has Android  in the user agent
	 *
	 * @return {string} Device
	 */
    getDevice: function() {
        return this.ua.device;
    },
    getDeviceVer: function() {
        return this.ua.deviceVer;
    },
    /**
	 * Retrieves the device type.
	 *
	 * "desktop" - The default value for a regular computer
	 * "tablet" - Currently defining this as ipad only. Will include android tablets
	 * "mobile" - The WebMD definition of mobile which is a webkit based mobile browser
	 *
	 * @return {string} Device type
	 */
    getType: function() {
        return this.ua.type;
    },
    /**
	 * Checks if this is a touch device.
	 *
	 * true - ontouchstart is a valid function and it meets our standards for a "touch" device
	 * false - doesn't contain said touch function
	 *
	 * @return {Boolean}
	 */
    getTouch: function() {
        return webmd.debug("webmd.useragent.getTouch is depracated, please use modernizr instead"), 
        Modernizr.touch ? !0 : !1;
    },
    /** The following are responsive functions to be used for the flexible template. 
	 *  Putting them in here as it's MUCH easier just having one public API and letting pages call these functions or not. 
	 * The Flexible base template will include JS that will call the "setupResponsive" function
	 */
    /**
	 * setupResponsive runs the function to set classes and attaches to the resize event to add or remove the thin class if you resize your browser during a page view
	 *
	 * Also does a bit of hackey user agent sniffing to make sure that our most popular tablets look awesome. They all have their own way of interpreting desktop 
	 * web pages, and this baselines them. 
	 * 
	 * @public
	 */
    setupResponsive: function() {
        var self = this;
        /* Adding a meta tag so that iPad plays nice and pretty with the thinner version of our site */
        -1 !== navigator.userAgent.indexOf("iPad") ? $("head").append('<meta name="viewport" content="width=device-width">') : "mobile" === webmd.useragent.getType() && $("head").append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">'), 
        // calling responsive classes initially
        self._setResponsiveHTMLClasses(), // sets the "old width". This is used when we compare the current width on window resize to see if we should trigger our custom resize event
        self.oldWidth = self.whichWidth(), // setting up a single timed out resize event to reset the responsive classes and also call our custom event
        self._singleResizeEvent(function() {
            self._setResponsiveHTMLClasses(), self._triggerResponsiveEvents();
        });
    },
    /**
	 * This is our custom resize event handler. It uses a 250ms timeout to make sure we don't constantly fire the resize event. 
	 * We also bind to jQuery's resize instead of window.resize as it does a good job making the resize sausage for us for cross browser compatibility
	 * 
	 * @private
	 */
    _singleResizeEvent: function(callback, timeout) {
        return $(window).resize(function() {
            clearTimeout(timeout), timeout = setTimeout(callback, 250);
        }), callback;
    },
    /**
	 * This creates a simple window based custom event for a responsiveResize. The 'responsiveResize' event carries a custom parameter which is the new
	 * size of the window. This custom event will only get called when the window changes types not just on the resize itself
	 *
	 * @example
	 * $(window).on('responsiveResize',function(event, width){console.log(width);});
	 * 
	 * @private
	 */
    _triggerResponsiveEvents: function() {
        var self = this;
        self.oldWidth !== self.whichWidth() && ($(window).trigger("responsiveResize", [ self.whichWidth() ]), 
        self.oldWidth = self.whichWidth());
    },
    /**
	 * Sets HTML classes depending on screen width 
	 *
	 * @private
	 */
    _setResponsiveHTMLClasses: function() {
        // using global call here as we're calling this function inside of a setTimeout
        $("html").removeClass("small thin normal").addClass(webmd.useragent.whichWidth());
    },
    /**
	 * DEPRACATED - use getWidth() instead
	 *
	 * @depracated
	 */
    whichWidth: function() {
        return this.getWidth();
    },
    /**
	 * Public function which returns a string with 'thin' or 'normal' depending on which size of site we have
	 *
	 * @returns {String} the name of the site size
	 *
	 * @example
	 * if (webmd.useragent.getWidth() = 'thin') { doSomething(); }
	 *
	 * @public
	 */
    getWidth: function() {
        /* If we can run with media queries, use those, it's nice and clean. Otherwise, let's borrow jQuery.
		 *
		 * Sometimes the window width doesn't get reported to us right, so just in case if you are on a 1024 screen, 
		 * we'll give you the thin version anyways, as it would look ugly having horizontal scroll.
		 * 
		 * We are using ems instead of hardcoded pixels here (px / 16) in order to provide a good experience to zoomed
		 * in users on bigger browser screens. 
		 *
		 * The general idea here is: 
		 * Desktops and Laptops will get a 968px "normal" view and if they make their window smaller they will
		 * get a thin view. If they go too small, we'll go with horizonal scroll vs a small view. The "small" view would trigger an
		 * ad refresh to a 300x50 ad vs the 728x90 so we want to avoid doing that. 
		 * 
		 * Tablets in Portrait get a 768px "thin" view at 100% zoom. In Landscape they still get the 768px "thin" view, but we let the
		 * device zoom in vs trying to fill out the screen. This gives people bigger font size and a 1.3 zoom for a better experience
		 *
		 * Smaller devices (phones and phablets) get the "small" view, which is a 100% width view for devices smaller than 768 physical
		 * or simulated pixels but with 1 rail instead of 2. If you have a phablet landscape, you'll get some extra content/whitespace, but if you 
		 * have an iphone or somewhere in the range of 320-400px physical pixels, you'll get the best optimized view.
		 * 
		 */
        /* If we can run with media queries, use those, it's nice and clean. Otherwise, let's borrow jQuery.
		 *
		 * Sometimes the window width doesn't get reported to us right, so just in case if you are on a 1024 screen, 
		 * we'll give you the thin version anyways, as it would look ugly having horizontal scroll.
		 * 
		 * We are using ems instead of hardcoded pixels here (px / 16) in order to provide a good experience to zoomed
		 * in users on bigger browser screens. 
		 *
		 * The general idea here is: 
		 * Desktops and Laptops will get a 968px "normal" view and if they make their window smaller they will
		 * get a thin view. If they go too small, we'll go with horizonal scroll vs a small view. The "small" view would trigger an
		 * ad refresh to a 300x50 ad vs the 728x90 so we want to avoid doing that. 
		 * 
		 * Tablets in Portrait get a 768px "thin" view at 100% zoom. In Landscape they still get the 768px "thin" view, but we let the
		 * device zoom in vs trying to fill out the screen. This gives people bigger font size and a 1.3 zoom for a better experience
		 *
		 * Smaller devices (phones and phablets) get the "small" view, which is a 100% width view for devices smaller than 768 physical
		 * or simulated pixels but with 1 rail instead of 2. If you have a phablet landscape, you'll get some extra content/whitespace, but if you 
		 * have an iphone or somewhere in the range of 320-400px physical pixels, you'll get the best optimized view.
		 * 
		 */
        // Leaving this in here, but commenting it out. Right now, we're going to push big screens with tiny browsers into the thin
        // view as we don't want to have to switch out ads
        // if (window.matchMedia("(max-width: 788px) and (min-device-width: 1025px)").matches) {
        // 	// matches desktops or otherwise big screens where someone either smooshed the display or isn't viewing something full size
        // 	return 'small';
        // } else 
        // this is our exception case for older browsers. If you have a smaller window and a crappy browser, we'll give you a thin view, but that's it. 
        return window.matchMedia ? window.matchMedia("(max-width: 50em) and (max-device-width: 767px)").matches ? "small" : window.matchMedia("(max-width: 63em), (max-device-width: 1025px)").matches ? "thin" : "normal" : $(window).width() < 1e3 ? "thin" : "normal";
    },
    /**
	 * Public function which returns a boolean if we have a thin site
	 *
	 * @returns {Boolean} 
	 *
	 * @example
	 * if (!webmd.useragent.isThin()) { doSomething(); }
	 *
	 * @public
	 */
    isThin: function() {
        var self = this;
        return "thin" === self.whichWidth();
    },
    /**
	 * Public function which removes responsiveness from a website
	 *
	 * @example
	 * webmd.useragent.removeResponsive();
	 *
	 * @public
	 */
    removeResponsive: function() {
        $(window).unbind("resize.responsive"), $("html").removeClass("thin");
    }
}, /* Initilizing now so this can be put on the document before HTML starts to load */
webmd.useragent.init(), /*! webmd.m.nls.overlay.controller */
// Wait for document ready, then pull in hover newsletter center id mappings
// Display newsletter module on every page (previously relied on window.center_id to be present on page)
$(function() {
    setTimeout(function() {
        require([ "newsletter-hover/1/hover-newsletter-center-id" ], function(module) {
            module.init();
        });
    }, 2e3);
}), /*! webmd.offsite */
/**
 * @namespace Contains functions for properly handling external links
 */
webmd.offsite = {
    /**
	  * Displays the interstitial from the onclick event
	  * @param  {string} href taken from the href attribute of the link
	  * @return {boolean} true if successful, false if failed
	  */
    showInterstitial: function(href) {
        var interstitial_window = null, goURL = unescape(webmd.url.getParam("url", href)) || "http://www.webmd.com", windowParams = "width=470,height=195,resizable=no,toolbar=no,left=350,top=300,location=0", popUrl = -1 == href.indexOf("preview.webmd.com") ? "http://www.webmd.com/privacy-window-2010" : "http://www.preview.webmd.com/privacy-window-2010";
        // if "/click?url" is in the link AND the 'url' parameter is not webmd then execute
        // if "/click?url" is in the link AND the 'url' parameter is not webmd then execute
        /* CREATE SPECIAL EXCEPTION CASES FOR CUSTOM POPUPS HERE */
        /* if you are coming from a fit.webmd.com page, open up a custom intersititial */
        /* open window and assign the reference to a variable */
        return -1 != href.indexOf("/click?") && "http://www.webmd.com" != goURL ? ("specialreport" == webmd.url.getParam("custom", href) && (windowParams = "width=325,height=175,resizable=no,toolbar=no,left=350,top=300", 
        popUrl = "http://www.webmd.com/interstitial-nl"), (document.location.href.match(/^(https?):\/\/fit\./) || document.location.href.match(/^(https|http?):\/\/(blogs|blogpub.qa01|blog.qa01?).webmd.com\/fit/)) && (popUrl = "http://fit.webmd.com/interstitial", 
        windowParams = "width=325,height=250,resizable=no,toolbar=no,left=350,top=300"), 
        interstitial_window = window.open(popUrl, "privacy_window", windowParams), !0) : !1;
    }
}, /*! webmd.p.adscookie */
/**
 * @namespace
 */
webmd.adsCookie = {
    /**
	 *
	 */
    config: {
        perm: {
            name: "ads_perm",
            expire: 365
        },
        sess: {
            name: "ads_sess",
            expire: null
        }
    },
    /**
	 *
	 */
    baseDomain: location.hostname.replace(/.*(\.[^.]+\.[^.]+)$/, "$1"),
    /**
	 *
	 */
    get: function(type) {
        var j = webmd.cookie(this.config[type].name);
        return null === j ? {} : JSON.parse(j);
    },
    /**
	 *
	 */
    deleteCookie: function(type) {
        return webmd.cookie(this.config[type].name, "", {
            domain: this.baseDomain,
            expires: -1
        });
    },
    /**
	 * @example
	 * set({type:'sess', prefix:'p', value:'123CTL', count:'123'});
	 */
    set: function(o) {
        var currentCookie = webmd.adsCookie.get(o.type);
        // check to see if that prefix already exists
        // set the object value to the string delimiter that Steve needs to filter on
        // if there is a count, add that as well
        return currentCookie[o.prefix] || (currentCookie[o.prefix] = {}), currentCookie[o.prefix][o.value] = o.prefix + o.value + "x", 
        o.count && (currentCookie[o.prefix][o.value] = currentCookie[o.prefix][o.value].split("x")[0] + "_" + o.count + "x"), 
        "sess" == o.type ? webmd.cookie(this.config[o.type].name, JSON.stringify(currentCookie), {
            domain: this.baseDomain
        }) : webmd.cookie(this.config[o.type].name, JSON.stringify(currentCookie), {
            domain: this.baseDomain,
            expires: this.config[o.type].expire
        });
    },
    /**
	 * @example
	 * remove({type:'sess', prefix:'p', value:'123CTL'});
	 */
    remove: function(o) {
        var currentCookie = webmd.adsCookie.get(o.type);
        // if you forgot to include prefix, leave
        if (o.prefix && currentCookie[o.prefix]) // check to see if that prefix already exists
        {
            // check to see if you provided a value to delete. If no, delete whole prefix, otherwise delete the value
            if (o.value) {
                if (!currentCookie[o.prefix][o.value]) return;
                delete currentCookie[o.prefix][o.value];
            } else delete currentCookie[o.prefix];
            return webmd.cookie(this.config[o.type].name, JSON.stringify(currentCookie), {
                domain: this.baseDomain,
                expires: this.config[o.type].expire
            });
        }
    }
}, /*! webmd.visit */
/**
 * @fileOverview 
 * This JS will track a number of items pertaining to a user's visit via session JSON cookie, 'vtime' property. 
 * For now, the only thing it actually will do, is before a pageview ping a cookie to see if we are in the middle
 * of an active session. Currently a session is defined as 30 minutes and set as a default paramater. 
 * If a session has been idle for over 30 minutes, we will start a new session on the next pageview.
 * 
 * NOTE! The logic to set isNewVisit to true or false is purely triggered by pageviews. This means:
 * 		- webmd.visit does not use any timers, so a user in an active visit that is sitting on a page 
 * 		  for 2 hours with no pageviews triggered will still be in an exisiting, non-new visit
 * 		- dynamic web pages must be certain to trigger page views before refreshing / updating any 
 * 		  other connected content to make certain webmd.visit is reporting accurately on visit status
 * 
 * @namespace
 * @author <a href="mailto:thoppe@webmd.net">Tom Hoppe</a>
 * @require webmd.cookie
 * @version 2
 */
webmd.visit = {
    /*==CONFIG================================================*/
    /**
	 * Length of a session in minutes
	 * @type {integer}
	 */
    lengthOfSessionInMinutes: 30,
    /**
	 * Cookie name where we will store the session timestamp. For now we reuse 
	 * the ui cookie, but we might want to put this somewhere else later
	 * @type {string}
	 */
    cookieName: "ui",
    /**
	 * local variable to keep track of whether we are in a first page view of a visit or not
	 * initially is null before init
	 * @type {boolean}
	 */
    _inCurrentNewVisit: null,
    /**
	 * local variable to track first pageview in order to suppress an action below
	 * @type {boolean}
	 */
    _lastView: null,
    /**
	 * number of milliseconds before accepting a new visitview
	 * @type {boolean}
	 */
    _lastViewWaitMilliseconds: 1e3,
    /*==FUNCTIONS================================================*/
    /**
	 * This is a "private" method that returns minutes from epoch
	 * @private
	 */
    _minutesFromEpoch: function() {
        return Math.floor(+new Date() / 6e4);
    },
    /**
	 * This is a public method for identifying new user visits. It makes use of a 
	 * private property "_inCurrentNewVisit" to store this status, and only updates
	 * this status on pageview events that trigger the visitView method.
	 * 
	 * @param ignoreFlag {boolean}  Where or not to use the saved _inCurrentNewVisit flag  
	 * @public
	 */
    isNewVisit: function(ignoreFlag) {
        var self = this, sessCookie = webmd.cookie.getJson(this.cookieName);
        // If flag is set, return that value _unless_ ignoreFlag is true
        // If flag is set, return that value _unless_ ignoreFlag is true
        // if there is a visit timestamp (vtime), let's compare our timestamp 
        // to minuesFromEpoch. If we are under 30 minutes, we're still in an 
        // existing visit
        return "boolean" != typeof self._inCurrentNewVisit || ignoreFlag ? sessCookie.vtime && !isNaN(sessCookie.vtime) && self._minutesFromEpoch() - sessCookie.vtime <= self.lengthOfSessionInMinutes ? !1 : !0 : self._inCurrentNewVisit;
    },
    /**
	 * This is the public interface for connecting the Omniture pageview event
	 * with this object - it updates timestamp saved in the session cookie
	 *   
	 * @public
	 **/
    visitView: function() {
        var self = this, sessCookie = webmd.cookie.getJson(this.cookieName);
        // if time since last view isn't over lastViewWaitMilliseconds, wait
        // don't register the view.
        // if time since last view isn't over lastViewWaitMilliseconds, wait
        // don't register the view.
        // go ahead and update the visit timestamp (vtime) to current time as we 
        // just had a pageview
        // sets the cookie with the additional timestamp data. Makes it across 
        // the entire current domain so its accessible anywhere on whatever.com
        return self._lastView && +new Date() - self._lastView <= self._lastViewWaitMilliseconds ? !1 : (self._inCurrentNewVisit = self.isNewVisit(!0), 
        self._lastView = +new Date(), webmd.debug("webmd.visit: " + self._inCurrentNewVisit), 
        sessCookie.vtime = self._minutesFromEpoch(), void webmd.cookie.setJson(self.cookieName, sessCookie, {
            domain: webmd.url.getSLD()
        }));
    },
    /**
	 * The self init function will bind to the before pageview event and when 
	 * that event is triggered we will update the session data in the cookie. 
	 * 
	 * @public
	 **/
    init: function() {
        var self = this;
        self._inCurrentNewVisit = self.isNewVisit(), // bind to the before_pv and before_adrefresh events to go ahead and update 
        // the timestamp. This will happen on the real page view as well as any 
        // dynamic page views that might occur during the usage of this page/
        // application
        $(document).on("before_pv before_adrefresh", function() {
            self.visitView();
        });
    }
}, webmd.visit.init(), /*! wembd.m.firstImpression */
/**
 * @namespace
 */
webmd.m.firstImpression = {
    /**
	 * First impression value
	 * @type {Number}
	 */
    siteImpression: 0,
    /**
	 * Page target to use for site impressions in DFP
	 * @type {String}
	 */
    siteImpressionTarget: "fis",
    /**
	 * First impression topic
	 * @type {Array}
	 */
    topicImpression: "",
    /**
	 * List of topics visited
	 * @type {Array}
	 */
    visitedTopics: [],
    /**
	 * Page target to use for primary topic impressions in DFP
	 * @type {String}
	 */
    topicImpressionTarget: "fipt",
    /**
	 * Page target to use for first impression following in DFP
	 * Value is set by Ad Server
	 * @type {String}
	 */
    followingImpressionTarget: "fif",
    /**
	 * Call to create the first impression cookie
	 */
    init: function() {
        var self = this;
        // If we are inside of an iframe, get out as we don't want to run any of this code
        top.location === location && (self.checkNewVisit().setTopicImpression().setPageTargets().addLotameMeta(), 
        // run firstImpression before every ad refresh
        $(document).on("before_adrefresh", function() {
            webmd.m.firstImpression.checkNewVisit().setTopicImpression().setPageTargets();
        }));
    },
    /**
	 * reset the values on new visit
	 */
    checkNewVisit: function() {
        var self = this, storage = window.localStorage;
        return webmd.visit.isNewVisit() ? (self.siteImpression = 1, self.followingImpression = null, 
        webmd.adsCookie.remove({
            type: "sess",
            prefix: "fi"
        }), self.visitedTopics = [], storage && storage.removeItem(self.topicImpressionTarget)) : (self.siteImpression = 0, 
        webmd.adsCookie.get("sess") && webmd.adsCookie.get("sess").fi && (self.followingImpression = Object.keys(webmd.adsCookie.get("sess").fi).toString())), 
        self;
    },
    /**
	 * set the topicImpression and save the topics vistited to localStorage, which only
	 * supports strings, so need to use JSON.parse and JSON.stringify to make it save arrays
	 */
    setTopicImpression: function() {
        var self = this, storage = window.localStorage, topic = window.s_topic || window.s_channel;
        if (self.topicImpression = 0, storage && topic && (self.visitedTopics = storage.getItem(self.topicImpressionTarget) ? JSON.parse(storage.getItem(self.topicImpressionTarget)) : [], 
        -1 === $.inArray(topic, self.visitedTopics))) {
            self.topicImpression = topic, self.visitedTopics.push(topic);
            // Adding Try/Catch to fix localStorage issue in Safari private
            // browsing browser & devices
            try {
                storage.setItem(self.topicImpressionTarget, JSON.stringify(self.visitedTopics));
            } catch (e) {}
        }
        return self;
    },
    /**
	 * Set DFP page targets
	 */
    setPageTargets: function() {
        var self = this;
        return webmd.debug("site impression: " + self.siteImpression), webmd.debug("topic impression: " + self.topicImpression), 
        webmd.debug("following impression: " + self.followingImpression), webmd.ads2.setPageTarget(self.siteImpressionTarget, self.siteImpression), 
        webmd.ads2.setPageTarget(self.topicImpressionTarget, self.topicImpression), self.followingImpression && webmd.ads2.setPageTarget(self.followingImpressionTarget, self.followingImpression), 
        self;
    },
    /**
	 *	If first impression, add meta tag to page head that includes current topic
	 */
    addLotameMeta: function() {
        var self = this;
        1 === self.siteImpression && $("<meta/>").attr({
            name: "s_1stimp",
            content: self.topicImpression
        }).appendTo("head");
    }
}, webmd.m.firstImpression.init(), /*! webmd.p.pim */
/**
 * @namespace PIM - program interrupt management
 * This code will run on both the WebMD core and the O&O sites.
 */
webmd.p.pim = {
    /**
	 * Interruptions to allow per session
	 * @type {Number}
	 */
    maxSession: 2,
    /**
	 * Ad server cookie that records impression count
	 * @type {Object}
	 */
    cookieCount: {
        type: "sess",
        prefix: "pim",
        value: "c",
        count: 0
    },
    /**
	 * Ad server cookie that records max impressions reached
	 * @type {Object}
	 */
    cookieMax: {
        type: "sess",
        prefix: "pim",
        value: "m"
    },
    /**
	 * Ad server cookie that records a timestamp: "pimt_[timestamp]x"
	 * @type {Object}
	 */
    cookieExpire: {
        type: "sess",
        prefix: "pim",
        value: "t"
    },
    /**
	 * Number of milliseconds for the cookie expiration
	 * 86400000 == 1000ms * 60sec/min * 60min/hr * 24hr
	 * @type {Number}
	 */
    expireMS: 864e5,
    /**
	 * Module name to use for metrics call.
	 * Set to blank to turn off metrics.
	 */
    metricsModule: "pim",
    /**
	 * Has an intrusion occurred on this page already?
	 * @private
	 */
    _occurredOnPage: !1,
    /**
	 * @private
	 */
    _baseDomain: location.hostname.replace(/.*(\.[^.]+\.[^.]+)$/, "$1"),
    /**
	 * If the interrupt is allowed, increment the count, then run a callback function.
	 *
	 * @example
	 * webmd.p.pim.runIfAllowed(function(){ alert('Interrupt!'); });
	 * webmd.p.pim.runIfAllowed(function(){ alert('Interrupt!'); }, function(){ alert('No Interrupt!'); });
	 *
	 * @param  {Function} callback     Runs if interrupt is allowed.
	 * @param  {Function} [nocallback] Runs if interrupt is not allowed.
	 */
    runIfAllowed: function(callback, nocallback) {
        return this.isAllowed() ? (this.increment(), callback && callback()) : nocallback && nocallback(), 
        this;
    },
    /**
	 * Determine if an interrupt is allowed.
	 *
	 * To be allowed, the following two tests must pass:
	 *
	 * An interruption must not have occurred already on this page.
	 * AND
	 * Less than the maxSession interrupts have occured during this session
	 *
	 * @return {Boolean} [description]
	 */
    isAllowed: function() {
        // Check if something on the page has already claimed the interrupt
        // Before checking, expire the cookie if necessary
        // Check if something on the page has already claimed the interrupt
        return this.checkExpiration(), this._occurredOnPage ? !1 : Boolean(this.getCount() < this.maxSession);
    },
    /**
	 * Increment the interrupt counter.
	 */
    increment: function() {
        var self = this, count = 0;
        // Before incrementing, expire the cookie if necessary
        //this.checkExpiration();
        // Immediately mark this interrupt for the page
        // Get the current count from the cookie and increment it
        // Save the new count in the cookie
        // If the count has reached the maximum per session, also set pim_max in the cookie
        // Also set the current timestamp in the cookie
        // Set DFP ad parameter in case ads are refreshed
        // to prevent the ad server from sending an interruption
        return self._occurredOnPage = !0, count = self.getCount() + 1, self.cookieCount.count = count, 
        webmd.adsCookie.set(self.cookieCount), count >= self.maxSession && webmd.adsCookie.set(self.cookieMax), 
        self.cookieExpire.count = new Date().getTime(), webmd.adsCookie.set(self.cookieExpire), 
        self.setAds2PageTarget(), self;
    },
    /**
	 * Returns the current number of interrupts from the count cookie
	 */
    getCount: function() {
        var o, count;
        // Before checking, expire the cookie if necessary
        //this.checkExpiration();
        // Try to get the cookie
        // Extract the count from the cookie value like "pimc_2x"
        return o = webmd.adsCookie.get(this.cookieCount.type), o[this.cookieCount.prefix] && o[this.cookieCount.prefix][this.cookieCount.value] ? (count = o[this.cookieCount.prefix][this.cookieCount.value].replace(/.*_(\d+)x$/, "$1"), 
        parseInt(count, 10) || 0) : 0;
    },
    /**
	 * Delete all PIM cookie values if the timestamp is expired
	 */
    checkExpiration: function() {
        var o, timestamp, now = new Date().getTime();
        // Get the ads cookie object that contains the PIM values
        o = webmd.adsCookie.get(this.cookieExpire.type), // Make sure the PIM data is part of the cookie and that it has a timestamp value
        o[this.cookieExpire.prefix] && o[this.cookieExpire.prefix][this.cookieExpire.value] && (// Extract the timestamp from the cookie value like "pimt_1321566886068x"
        timestamp = o[this.cookieExpire.prefix][this.cookieExpire.value].replace(/.*_(\d+)x$/, "$1"), 
        // Convert the count to a number, or return zero if something went wrong
        timestamp = parseInt(timestamp, 10) || 0), timestamp && timestamp + this.expireMS < now && // Remove all cookies with the pim prefix
        webmd.adsCookie.remove({
            type: this.cookieExpire.type,
            prefix: this.cookieExpire.prefix
        });
    },
    /**
	 * Set a targeting value for DFP ads,
	 * to tell the ad system that interruptions are not allowed.
	 */
    setAds2PageTarget: function() {
        webmd.ads2 && webmd.ads2.isInitialized() && (webmd.ads2.setPageTarget("pimc", webmd.p.pim.getCount()), 
        webmd.ads2.setPageTarget("pimx", "1"));
    }
}, // webmd.p.pim
// Immediately on every pageview - check if the cookie should be expired
// Not needed here anymore because call to isAllowed() will check expiration
// webmd.p.pim.checkExpiration();
// Immediately on every pageview - set DFP ad parameter if necessary
webmd.p.pim.isAllowed() || webmd.p.pim.setAds2PageTarget();

/*! webmd.metrics */
// Requires: jquery, webmd.core.js
var s_pageview_id, s_module_impressions = [];

/**
 * @namespace Namespace for all metrics code
 */
webmd.metrics = {
    /**
	 * @Pageview ID function
	 *
	 * This JS executes and creates a window global JS variable that contains a 19 digit page view ID
	 * This PVID can then be used by the ad modules to be pushed to the ads and is also picked up by the Omniture beacon
	 * That allows us to marry page views and ad impressions in our reporting suites
	 * Doesn't return anything as it sets/resets a global variable from in here. Doing this as I don't want
	 * anyone abusing this function for anything else
	 *
	 * @author <a href="mailto:thoppe@webmd.net">Tom Hoppe</a>
	 *
	 * @version 2
	 *
	 * @public
	 */
    // creating a local scope for any local variables, but otherwise just executing. Not bothering with a module or anything else more complicated
    createPageviewId: function() {
        var timestamp, randomNumber;
        // Get the seconds since epoch and convert to a string max 10 digits.
        timestamp = Math.floor(new Date().getTime() / 1e3).toString().substr(0, 10), // Making an 8 digit random number
        // Sometimes random() returns somethign with less digits like .5
        // In that case we use toFixed() to convert to a string and pad with zeroes
        // Then we lop of the "0." at the front of the string and take the next eight digits
        randomNumber = Math.random().toFixed(8).substr(2, 8), // set the global variable to the 19 digit page view id
        window.s_pageview_id = timestamp + randomNumber, // Update the PVID value for DFP ad calls
        webmd.ads2 && webmd.ads2.setPageTarget("pvid", window.s_pageview_id);
    },
    /**
	 * @name Dynamic Page View
	 * @public
	 *
	 * @description
	 * This is the new standard function to be called when we have something that is a dynamic page view
	 * By default this function will call a dynamic pageview (wmdPageview) with the page's location.href and refresh ads (webmd.ads.refresh)
	 * with all default settings. The reason for this function to exist is that before these two are done, it reset the pageview id. Doing all
	 * this in the correct order makes sure we have pageview id matched up with pageviews as well as ad impressions, which really is the
	 * whole point of pageview id.
	 *
	 * @param {object} options
	 * This object takes in a configuration for the dynamic page view and extends the default settings
	 *
	 * options.pageName is the page name you'd like to include into wmdPageview
	 *     - If you pass in a pageName as a string, it will send it straight to wmdPageview
	 *     - If you DO NOT pass in a pageName it will send s_pagename over to wmdPageview
	 *
	 * options.moduleName is the module that you'd like to pass into wmdTrack
	 *     - It will call wmdTrack with your module id
	 *     - if you do not pass in a module id, it will NOT make a wmdTrack call at all
	 *
	 * options.iCount is used for slideshows and other tools that have multiple slides. An additional parameter that gets passed intto wmdPageview
	 *     - Should be self explanatory. I decided to keep the iCount naming scheme instead of some generic object here, as actually a large
	 *       amount of products do this
	 *
	 * options.refresh is an object passed through into webmd.ads.refresh
	 *     - If this is an object, it will pass that straight through into webmd.ads to use.
	 *     - If this is set to false or 0, it will suppress ad refreshing
	 *
	 * @example
	 * The follwing will create a module click of 'asdf' follwed by a page view passing only 'fdsa', pass the icount
	 * in the pageview call and add an extra param to all ads during a refresh
	 * webmd.metrics.dpv({
	 *		moduleName: 'asdf',
	 *		pageName: 'fdsa',
	 *		iCount: 2,
	 *		refresh: {params: { extra: 2}}
	 *	});
	 *
	 * @ example
	 * The following will not make a module click call, will call a page view passinly only 'fdsa' and refresh
	 * all standard ads with a standard refresh
	 * webmd.metrics.dpv({
	 *		pageName: 'fdsa'
	 *	});
	 *
	 * @ example
	 * The following will not make a module click call, will call a page view passinly only 'fdsa' and suppress ads refresh
	 * webmd.metrics.dpv({
	 *		pageName: 'fdsa',
	 *      refresh: false
	 *	});
	 *
	 * @author <a href="mailto:thoppe@webmd.net">Tom Hoppe</a>
	 * @version 1
	 */
    dpv: function(options) {
        // setup the defaults
        var self = this, settings = {
            pageName: window.s_pagename || window.location.href,
            moduleName: "",
            iCount: "",
            refresh: !0
        };
        // reset the pageview id. We want to do this before we call page view or ads refresh
        // this is the whole point of this dynamic page view function
        self.createPageviewId(), // pass in the options
        settings = $.extend(settings, options), // if we have moduleName, pass it into wmdTrack first
        "" !== settings.moduleName && wmdTrack(settings.moduleName), // next we'll call the pageview event
        wmdPageview(settings.pageName, settings.iCount), settings.refresh && // lastly, refresh the ads
        webmd.ads2.refresh(settings.refresh), $(window).trigger("wbmd:dpv-fired");
    },
    /**
	 * Function for tracking previous url
	 * Sniffs out illegal characters and puts in to string in global var
	 */
    linktext: function(url) {
        /* create a variable to track link text */
        window.s_linktext = "", "string" != typeof url && (window.s_linktext = $(url).text().trim().replace(/[^\w\s]/g, "").replace(/\s+/g, " ") || $(url).find("img").attr("alt"));
    },
    /**
	 * Global click handler for metrics (moduleID_linkID). No more onclicks.
	 * We are catching any clicks on a elements and firing off some metrics
	 *
	 * This uses HTML5 data attributes to select HTML elements to create metrics
	 *
	 * - data-metrics-module: <required> This will be the module value. It should be on the module containing div, as clicks on a elements will look
	 *   up in the DOM tree until they find a metrics-module value and use that. There can be multiples of this on a module, and any link will
	 *   use the closest one to it as the module value. If this is left off the parent module, there will be no metrics calls.
	 *
	 * - data-metrics-sel: <optional> This is the selector to get link ID's and should be placed on the same node as metrics-module
	 *	 (unless metrics-section is being used). Since most modules have simple 1-X link id naming, this allows for us to not have to specify
	 *	 this for every link. The code will use the metrics-module node and .find this selector and grab the clicked on index to pass into the link value.
	 *   If this, as well as the metrics-link on a particular link is missing, the code will pass a link id of 0
	 *
	 * - data-metrics-link: <optional> This is the override to metrics-sel. If this data attribute exists on a link or one of it's parents,
	 *   it will be used for the link id. If this is missing, the code will look for it on the closest parent. If it's not found,
	 *   metrics-sel to pick link id. If both are missing, 0 will be passed
	 *
	 * - data-metrics-section: <optional>.  If present, its value will be placed in front of the metrics-link value with a dash as the separator between the 2.
	 *   This serves as an convenience attribute for the requirement that divides multiple sections within a given metric-module.
	 *   If data-metrics-sel is used, it should be placed on the same element as this data-metrics-section.
	 *   Sample usage can be found in the footer section of any harmony pages.
	 *
	 * - data-metrics-type: <optional> "track" or "ad-hoc". The default is "track", which is a standard wmdTrack call when going to a new page or calling a
	 *   dynamic page view right after. If your a element is instead triggering some sort of page action that doesn't result in a new
	 *   page view, you can specify "ad-hoc" and the code will make a wmdPageLink call instead.

	 */
    bindDataMetricsModule: function() {
        var self = this;
        // for chainability
        return $("html").on("click", "a, button", function() {
            var $type, metricsValue, linkUrl, win = window.top.webmd ? window.top : window;
            // if we don't find a module metrics value, go ahead and get out, we don't need to do anything
            if (// Set linkText
            self.linktext(this), metricsValue = self._getMetricsValue(this)) // and we'll call track or link based on that possible override
            if (// let's see if we have a type override
            $type = $(this).data("metrics-type") || "track", "track" === $type) {
                // update later
                // if the url has the click page, it opens another window to an offsite link
                if (win.wmdTrack(metricsValue), linkUrl = $(this).attr("href"), linkUrl && linkUrl.indexOf("/click?url=") > -1) return win.open(linkUrl, "", "width=1000,height=600,left=25,top=25,scrollbars=1,toolbar=1,resizable=1,status=1,menubar=1"), 
                win.webmd.offsite.showInterstitial(linkUrl), !1;
            } else win.wmdPageLink(metricsValue);
        }), this;
    },
    /**
	 * crawls the dom and reads data values to return the metrics value of an element
	 * @see bindDataMetricsModule
	 * @param  {Object} el "a" or "button" element
	 * @return {String} the metrics value of element
	 */
    _getMetricsValue: function(el) {
        var metricsValue, $module, moduleMetricsValue, $link, elementSelector, $allElementsFoundBySelector, $metricsSection, $contextElement, linkMetricsValue = "0", moduleToLinkSeperator = "_", sectionToLinkSeperator = "-", sectionValue = "", hasMetricsSection = !1;
        // if we don't find a module metrics call, go ahead and get out, we don't need to do anything
        // we're going to do stuff in order to make this code as efficient as possible
        // if we don't find a module metrics call, go ahead and get out, we don't need to do anything
        // we are to get the metrics-section value
        // we ONLY process the section element if it is inside the $module.  this prevent processing section outside of the structure...
        //[section-case-1]:  each section is marked by html attributes
        // we can defintely grab this as we've verified that by now, there is this data attribute
        // now we try to grab the link value override. If this exists, we'll use it, no need to crawl looking for dynamic naming
        // if we have one of these, use it for the link metrics value, otherwise, do it dynamically
        // grab the element selector if it exists
        // we need to determine the context element first: which can either be a module or section
        // if so, let's use it
        // grab all the elements found by selector
        // in this set of elements, find the one we clicked on, this is our metrics value. Add 1, since that's how .index works
        //this 'if' will prevent orphaned '-' at the end...
        // remove separator '_' when either metrics-module or metrics-link is an empty string.
        // this provides flexibility of passing metrics values that do not require a link ID or separator
        return $module = $(el).closest("*[data-metrics-module]"), $module.length ? ($metricsSection = $(el).closest("*[data-metrics-section]"), 
        $metricsSection.length > 0 && $.contains($module[0], $metricsSection[0]) === !0 && (sectionValue = $metricsSection.data("metrics-section") || ""), 
        hasMetricsSection = $metricsSection.length > 0 && "" !== sectionValue, moduleMetricsValue = $module.data("metrics-module"), 
        $link = $(el).closest("*[data-metrics-link]"), $link.length ? linkMetricsValue = $link.data("metrics-link") : ($contextElement = hasMetricsSection === !0 ? $metricsSection : $module, 
        elementSelector = $contextElement.data("metrics-sel") || "", elementSelector && ($allElementsFoundBySelector = $contextElement.find(elementSelector), 
        linkMetricsValue = $allElementsFoundBySelector.index($(el).parents(elementSelector)) + 1)), 
        hasMetricsSection === !0 ? ("" === linkMetricsValue && (sectionToLinkSeperator = ""), 
        metricsValue = moduleMetricsValue + moduleToLinkSeperator + sectionValue + sectionToLinkSeperator + linkMetricsValue) : (("" === moduleMetricsValue || "" === linkMetricsValue) && (moduleToLinkSeperator = ""), 
        metricsValue = moduleMetricsValue + moduleToLinkSeperator + linkMetricsValue), metricsValue) : !1;
    },
    /**
	 * A wrapper for private function _getMetricsValue
	 * @see getMetricsValue
	 * @param  {Object} el "a" or "button" element
	 * @return {String} the metrics value of element
	 */
    getMetricsValue: function(el) {
        var _self = this;
        return _self._getMetricsValue(el);
    },
    /**
	 * Shows metrics debugging info.
	 * Turn on by adding "?webmdmetrics=1" to the url.
	 * Turn off by adding "?webmdmetrics=0" to the url or by closing your browing session.
	 *
	 * @return {Object} returns "this" for chainability
	 */
    showMetricsInfo: function() {
        var self = this, urlParam = webmd.url.getParam("webmdmetrics"), storage = window.sessionStorage;
        return urlParam && ("0" === urlParam ? storage.removeItem("webmdmetrics") : storage.webmdmetrics = 1), 
        storage.webmdmetrics && (require([ "tooltips/1/tooltips" ], function() {
            $("a, button").each(function() {
                var metricsValue = self._getMetricsValue(this);
                metricsValue && ($(this).attr({
                    title: metricsValue
                }), $(this).webmdTooltip({
                    content: {
                        text: metricsValue
                    }
                }));
            });
        }), $("*[data-metrics-module]").each(function() {
            var moduleName = $(this).data("metrics-module"), pos = $(this).position();
            $("<div/>").css({
                position: "absolute",
                top: pos.top,
                left: pos.left,
                border: "1px solid #f00",
                background: "#fff",
                padding: "5px",
                "z-index": "999",
                "box-shadow": "8px 8px 20px 0px #333"
            }).html(moduleName).appendTo("body");
        })), this;
    }
}, /**
 * @namespace Object for metrics CTR functions
 */
webmd.metrics.ctr = {
    /**
	 * jQuery selector to get elements that are modules.
	 * The element must also have an ID attribute to indicate the module name.
	 */
    moduleSelector: ".moduleImpression",
    // ^^^ Note:
    // A class selector without an element is faster in modern browsers:
    // http://jsperf.com/jquery-selector-speed-tests
    /**
	 * Name of the impression cookie for deferred impressions.
	 * The cookie will contain a comma-separated list of module impressions
	 */
    cookieName: "mimp",
    /**
	 * Options for the impression cookie, including the domain and expiration.
	 */
    cookieOptions: {
        domain: location.hostname.replace(/.*(\.[^.]+\.[^.]+)$/, "$1")
    },
    /**
	 * Find all the on-page modules and add them to s_module_impressions
	 *
	 * This should be called immediately before each metrics pageview.
	 */
    findModules: function() {
        var self = this;
        // Get the module ids on the page
        $(this.moduleSelector).each(function() {
            // Make sure the element has an ID
            this.id && self.addImpression(this.id);
        });
    },
    /**
	 * Record a module impression for the next available page view.
	 *
	 * The module name will be stored in the deferred cookie and reported
	 * on the next available page view.
	 *
	 * @param  module Name of the module
	 */
    addImpression: function(module) {
        var csv;
        // Add the module name to the cookie
        // First get the impressions that are already stored in the cookie
        csv = this.getCookie(), // Add the new module impression to the comma-separated list
        csv && (csv += ","), csv += module, // Save the updated cookie
        this.setCookie(csv);
    },
    /**
	 * Get impressions that were stored in the cookie.
	 *
	 * Module names are stored in a cookie as a comma-separated list of module names.
	 * This function is called immediately before the pageview to read the cookie and add
	 * the modules to the s_module_impressions array, then it clears the cookie.
	 */
    getImpressions: function() {
        var self = this;
        $.each(self.getCookie().split(","), function(index, module) {
            module && s_module_impressions.push(module);
        }), self.setCookie("");
    },
    //==================================================
    // Cookie functions
    //==================================================
    /**
	 * Get the deferred module impressions stored in the cookie.
	 *
	 * @return String with a comma-separated list of module names (or empty string)
	 */
    getCookie: function() {
        return webmd.cookie.get(this.cookieName);
    },
    /**
	 * Set the deferred module impressions stored in the cookie.
	 *
	 * If you supply an empty string for the value, then the cookie will be deleted.
	 *
	 * @param value String with a comma-separated list of module names (or empty string)
	 */
    setCookie: function(value) {
        value ? webmd.cookie.set(this.cookieName, value, this.cookieOptions) : webmd.cookie.deleteCookie(this.cookieName, this.cookieOptions);
    }
}, /**
 * Object for metrics ICM CTR functions
 * Used in ICM sl() function to record module impressions for ad-served modules
 * before final pageview call.
 * @namespace
 */
webmd.metrics.icm = {
    /**
	 * Set the module name for pass through to CTR module impression.
	 * Module name will be adjusted only if it begins with "sb-".
	 * @param url String referencing module parent window hrefaaaw
	 * @param moduleName String module omniture id
	 * @return moduleName
	 */
    adjustModuleName: function(element, moduleName) {
        var pt, ct, self = this, my_s_sponsor_program = window.s_sponsor_program || "", my_s_business_reference = window.s_business_reference || "", my_s_furl = window.s_furl || "", my_s_package_type = window.s_package_type || "";
        /* sometimes a string url is passed - if so, just return module name */
        /* sometimes a string url is passed - if so, just return module name */
        /* used for smart sponsor boxes. Identify if the links parent is a sponsor box */
        /* clean out tag if its an old style one */
        /* add rail location identifier */
        /* add medical ref location identifies */
        /* add guide location identifier */
        /* add topic center location identifier */
        /* add topic center location identifier */
        /* add program location identifier if it does not exist */
        return "string" == typeof element ? moduleName : ($(element).closest(".icm,.icm_wrapper,.sponsorBox_right_rdr,.sponsorbox_rdr").length && (moduleName = moduleName.replace(/sb-.{2}-(.+)-(.+)-([0-9]+)/, "sb-$1-$2-$3"), 
        moduleName = "right" === self.getColumnPosition(element) ? moduleName.replace(/sb-(.+)/, "sb-rr-$1") : moduleName.replace(/sb-(.+)/, "sb-cw-$1"), 
        "" === my_s_sponsor_program && -1 !== my_s_business_reference.indexOf("Medical Reference") && (moduleName = moduleName.replace(/sb-.{2}-(.+)/, "sb-mr-$1")), 
        -1 !== my_s_furl.indexOf("/guide/") && (moduleName = moduleName.replace(/sb-.{2}-(.+)/, "sb-gc-$1")), 
        -1 !== my_s_furl.indexOf("/tc/") && (moduleName = moduleName.replace(/sb-.{2}-(.+)/, "sb-tc-$1")), 
        (-1 !== my_s_furl.indexOf("/news/") || -1 !== my_s_furl.indexOf("/features/") || -1 !== my_s_furl.indexOf("/news-features")) && (moduleName = moduleName.replace(/sb-.{2}-(.+)/, "sb-nf-$1"))), 
        null === /sb-.{2}-.{4}-[a-z]*-.*/.exec(moduleName) && (pt = my_s_package_type.toLowerCase(), 
        ct = "none", 0 === pt.indexOf("topic center") && (ct = "tc"), 0 === pt.indexOf("slide show") && (ct = "ss"), 
        0 === pt.indexOf("sas") && (ct = "sas"), 0 === pt.indexOf("sas in motion") && (ct = "sasm"), 
        0 === pt.indexOf("quiz") && (ct = "qq"), 0 === pt.indexOf("poll") && (ct = "poll"), 
        0 === pt.indexOf("healthzone") && (ct = "hz"), 0 === pt.indexOf("healthzone in motion") && (ct = "hzim"), 
        0 === pt.indexOf("editorial special") && (ct = "edsp"), 0 === pt.indexOf("community - neighborhood") && (ct = "cone"), 
        0 === pt.indexOf("calculator") && (ct = "calc"), 0 === pt.indexOf("ask-a-specialist tv") && (ct = "atsp"), 
        0 === pt.indexOf("custom targeted program") && (ct = "tts"), moduleName = moduleName.replace(/(sb-.{2}-.{4})-(.+)/, "$1-" + ct + "-$2")), 
        moduleName);
    },
    /**
	 * Get column position of module in center or right rail.
	 *
	 * Module posiiton will be returned to insert position indicator
	 * to module names that start with "sb-" and will change.
	 * @param element DOM Element
	 * @return string Right or center rail
	 */
    getColumnPosition: function(element) {
        return $(element).parents("#thirdCol_ctr").length ? "right" : "center";
    }
}, /*
 * Set metrics click handler and execute Pageview id code to set pageview id for initial page view and ad calls
 */
webmd.metrics.bindDataMetricsModule().createPageviewId(), $(window).load(function() {
    webmd.metrics.showMetricsInfo();
}), /*! webmd.externalLinks.js */
// Requires: jquery, webmd.core.js, webmd.metrics.js
webmd.object.set("webmd.externalLinks"), /**
 * @namespace Handles links to external sites
 */
webmd.externalLinks = {
    timer: "",
    /* Timer variable needs to be accessible by the entire object as several methods need to set and clear the setTimeoutID when a link is clicked. */
    init: function() {
        webmd.debug("|||||||||| webmd.externalLnk ----->", "init");
        var _this = this, $allLinks = $("a");
        _this.reformatLinks($allLinks);
    },
    /**
	 * A function to reformat links that use legacy metrics and /click
	 * @param  {Object} a jQuery object of all 'a' tags
	 */
    reformatLinks: function($allLinks) {
        var _this = this;
        $allLinks.each(function() {
            var onclickMetrics, override, $link = $(this), $href = $link.attr("href") || "", $onclick = $link.attr("onclick") || "", slashClickSubstring = ($link.attr("data-metrics-link") || "", 
            "/click?url="), slashClickString = $href.indexOf(slashClickSubstring), externalLink = decodeURIComponent($href.split(slashClickSubstring)[1]), onclickSlString = $onclick.indexOf("return sl");
            // if link has override data attribute, set variable (not yet used)
            "false" === $link.attr("data-popup") && (override = !0), // get legacy sl metrics
            onclickSlString > -1 && (onclickMetrics = _this.getLinkMetrics($link)), // for pages on m.webmd.com,
            // if link has oslink class, remove it
            $link.hasClass("oslink") && $link.removeClass("oslink"), // if link contains /click substring,
            // replace href with external link
            slashClickString > -1 && $(this).attr({
                href: externalLink
            }), // if link is external
            (slashClickString > -1 || _this.isExternalLink($href) === !0) && (// if sl onclick function or
            // Revenue onclick hack,
            // remove onclick
            onclickSlString > -1 && $(this).attr("onclick", null), // when link is clicked,
            // prevent default behavior
            $(this).on("click", function(e) {
                e.preventDefault(), // if onclickMetrics has not been set by legacy sl,
                // get new metrics via webmd.metrics.getMetricsValue()
                void 0 === onclickMetrics && (onclickMetrics = webmd.metrics.getMetricsValue($link[0])), 
                // pass externalLink if it exists, otherwise $href to
                // setGlobalWmdPageLinkVar() in omniture-beacon/src/common/consumer_functions.js
                // which assigns url to content variable and caches module name
                "undefined" !== externalLink ? window.top.setGlobalWmdPageLinkVar(onclickMetrics, externalLink) : window.top.setGlobalWmdPageLinkVar(onclickMetrics, $href), 
                // call triggerInterstitial()
                _this.triggerInterstitial(this, onclickMetrics);
            }));
        });
    },
    /**
	 * A function to determine metrics from a link
	 * @param  {Object} a jQuery object of 'a' tag
	 * @return {String} the module ID and link ID for Omniture
	 */
    getLinkMetrics: function($link) {
        var metrics, $onclick = $link.attr("onclick") || "", $dataMetric = $link.attr("data-metrics-link") || "", onclickSlSubstring = "return sl", onclickSlString = $onclick.indexOf(onclickSlSubstring);
        // data metrics
        // legacy sl metrics
        /*
			 * Look at the value of the onclick attribute and extract the content contained in the parentheses. If a match exists,
			 * split it by commas.  Then, look at the last entry of that array via pop().  Split that string up by single quotes, which
			 * produces an array. Only look at the last element in that array.
			 *
			 * Some pages have improperly coded sl() functions in the onclick attribute.  Normally, sl() is supposed to have three parameters,
			 * but on some pages, only two or fewer parameters are passed.
			 */
        return $dataMetric > -1 && (metrics = webmd.metrics.getMetricsValue($link)), onclickSlString > -1 && (metrics = $onclick.match(/\(([^)]+)\)/)[1].split(",").pop().split("'")[1]), 
        metrics;
    },
    /**
	 * A function to determine if a link is external
	 * @param  {String} a link's href value
	 * @return {Boolean} true of false depending on conditions
	 */
    isExternalLink: function(url) {
        var status, anchor = url.match(/^#/), noprotocol = url.match(/^\/\//), relative = url.match(/^(https?:\/\/)/), jslink = url.match(/^javascript/), webmdUrl = url.match(/^\S{0,30}\.webmd.com/), webmdShortcode = url.match(/^http:\/\/wb.md\//), medscapeOAuth = url.match(/medscape\.com\/px\/sso\/oauthlogin/), externalExcluded = [ "app.readspeaker.com" ];
        // if url begins with a hash (anchor or placholder),
        // or javascript,
        // status is false
        // if url is internal link,
        // but not a link w/o protocol,
        // status is false
        // if url is external but excluded from interstitial,
        // or if url includes medscape oAuth,
        // status is false
        // if url is not a webmd link and status has not been set to false,
        // status is true
        return (anchor || jslink) && (status = !1), relative > -1 && !noprotocol && (status = !1), 
        (externalExcluded.indexOf(url) > -1 || webmdShortcode || medscapeOAuth) && (status = !1), 
        null === webmdUrl && status !== !1 && (status = !0), status;
    },
    /**
	 * A function to create button events
	 * @param  {String} a link's metric value
	 */
    createButtonEvents: function(onclickMetrics) {
        var _this = this;
        /*
		 * setTimer() calls Javascript setTimeout() function.  setTimer() returns a setTimeoutId that can be
		 * cancelled when the user closes the overlay or clicks on the OK button in the overlay.
		 */
        _this.timer = _this.setTimer(onclickMetrics), // on click of action button,
        // clearTimeout,
        // send metrics,
        // close overlay
        // Namespace the click event so it can be removed when the overlay closes via .off() to prevent memory leaks
        // http://api.jquery.com/off/
        window.top.$('a[data-js="oslink"]').on("click.overlay", function() {
            // clear timeout
            window.top.clearTimeout(_this.timer), // check for wmdPageLink
            // make call to Omniture
            void 0 !== window.top.wmdPageLink && window.top.wmdPageLink(onclickMetrics), // close overlay
            webmd.overlay.close();
        });
    },
    /**
	 * A function to create a setTimeout
	 * @param  {String} a link's metric value
	 */
    setTimer: function(onclickMetrics) {
        /* Set a timeout to trigger click on link after 5 seconds.
		 * Return the setTimeoutID to caller
		 */
        return window.top.setTimeout(function() {
            window.top.$('a[data-js="oslink"]')[0].click();
        }, 5e3);
    },
    /**
	 * A function to trigger the interstitial in an overlay
	 * @param  {String} a link's href
	 * @param  {String} a link's metric value
	 */
    triggerInterstitial: function(link, onclickMetrics) {
        var offsiteLink = link.href, intersititialWidth = "435", intersititialMsg = '<div class="os-disclaimer" style="box-sizing: border-box; max-width: 435px; padding: 15px 10px 15px 15px;"><h3>Thank you for visiting WebMD</h3><p>You are about to visit a website outside of WebMD. Please familiarize yourself with this other website\'s Privacy Policy as it differs from ours.</p><p><a data-js="oslink" class="webmd-btn webmd-btn-pr webmd-btn-s webmdBtn" href="' + offsiteLink + '"rel="nofollow">Go</a></p></div>', _this = this;
        // if on mobile set width to a percentage
        "yes" === window.s_mobileweb && (intersititialWidth = "90%"), // prepending 'parent' in case link is in iframe
        parent.webmd.overlay.open({
            width: intersititialWidth,
            html: intersititialMsg,
            onComplete: function() {
                _this.createButtonEvents(onclickMetrics);
            },
            onClosed: function() {
                /* Remove the event listener created in createButtonEvents() to prevent memory leaks */
                window.top.$('a[data-js="oslink"]').off("click.overlay");
            }
        });
    }
}, $(function() {
    webmd.externalLinks.init();
}), /*! webmd.m.regCheck */
/**
 * @description Checks if service is down.
 *
 * @returns {Boolean} If the service is down, returns true.
 *
 * @param {String} Name of service to check.  Only current option is 'reg'.
 *
 * @example
 * if(!webmd.isDown('reg')){ //display down message }
 */
webmd.isDown = function(service) {
    // If the cookie is set, assume the service is up so it can be tested
    // If the cookie is set, assume the service is up so it can be tested
    return webmd.cookie.exists("ignoremaint") ? !1 : webmd.object.get(service, webmd.status) === !1;
}, /*! webmd.tablet.core */
/*
 * If running on a touch device, load some additional javascript code after the page finishes loading.
 */
webmd.useragent.getTouch() && webmd.load({
    js: [ image_server_url + "/webmd/PageBuilder_Assets/JS_static/tablet/modules/webmd.m.nav.tablet.js", image_server_url + "/webmd/PageBuilder_Assets/JS_static/tablet/webmd.mobile.swipe.min.js", image_server_url + "/webmd/PageBuilder_Assets/JS_static/tablet/modules/webmd.mobile.m.swipeshow.min.js" ]
}), /**
 * Sets the "dmp" parameter in ad-calls with latest Adobe Audience cookie values
 */
function() {
    function setAAM() {
        var parts, aamCookie = webmd.cookie.get("aam"), auu = webmd.cookie.get("aam_uuid");
        // set aam_uuid
        // if dmp key already exists in pagetargets, 
        // re-use the same dmp key for dynamic ad requests.
        // otherwise, set it
        // aam cookie structure: "aam=999999, 999992, ..."
        // if we have dmp values, set dmp in ads pagetarget
        // set aam_uuid
        // set auu only if the pagetarget isn't already set
        // if aam_uuid cookie doesn't exist, set auu to 0.
        return aamCookie && (webmd.ads2.pageTargets.dmp || (parts = aamCookie.split("="), 
        parts.length > 1 && "" !== parts[1] && webmd.ads2.setPageTarget("dmp", parts[1]))), 
        auu ? void (webmd.ads2.pageTargets.auu || webmd.ads2.setPageTarget("auu", auu)) : void webmd.ads2.setPageTarget("auu", 0);
    }
    webmd.tpsvc = webmd.tpsvc || {}, // initialize the webmd.tpsvc command queue for storing third party service commands
    webmd.tpsvc.cmds = webmd.tpsvc.cmds || [], webmd.tpsvc.cmds.push(setAAM);
}();

/*
 *  Amazon A9 Header bidding
 */
var webmd = webmd || {}, requestedSlots = {}, amznA9 = {
    // create a jQuery deferred that will either get resolved or rejected at some point.
    deferred: $.Deferred(),
    // determine if we are on video content 
    isVideoContent: function() {
        for (var _vhbf = !1, metas = document.getElementsByTagName("meta"), meta_types = [ /^video/i ], i = 0; i < metas.length; i++) if ("og:type" === metas[i].getAttribute("property")) for (var content = metas[i].getAttribute("content"), j = 0; j < meta_types.length; j++) if (meta_types[j].test(content)) return !0;
        return _vhbf;
    },
    // returns an array of pos's for slots we want Amazon to bid on
    getBidsPos: function() {
        return "mobile" === webmd.useragent.ua.type ? [ "2025", "2026" ] : [ "101", "113", "121", "137", "147" ];
    },
    // load a script tag
    loadScript: function(tagSrc) {
        if ("http" !== tagSrc.substr(0, 4)) {
            var isSSL = !0;
            tagSrc = (isSSL ? "https:" : "http:") + tagSrc;
        }
        var scriptTag = document.createElement("script"), placeTag = document.getElementsByTagName("script")[0];
        scriptTag.type = "text/javascript", scriptTag.src = tagSrc, scriptTag.async = !0, 
        placeTag.parentNode.insertBefore(scriptTag, placeTag);
    },
    // Load and initialize the apstag headbidding Javascript Library and bootstrap the API methods
    loadA9: function() {
        var self = this;
        !function(a9, a, p, s, t) {
            function q(c, r) {
                a[a9]._Q.push([ c, r ]);
            }
            a[a9] || (a[a9] = {
                init: function() {
                    q("i", arguments);
                },
                fetchBids: function() {
                    q("f", arguments);
                },
                setDisplayBids: function() {},
                targetingKeys: function() {
                    return [];
                },
                _Q: []
            }, self.loadScript(t));
        }("apstag", window, document, "script", "//c.amazon-adsystem.com/aax2/apstag.js"), 
        // initialize the library
        window.apstag.init({
            pubID: "3100",
            adServer: "googletag"
        });
    },
    // get the A9 bids
    getA9Bids: function() {
        try {
            var a9TimeoutHandler, a9TimeoutRequestAds, mappings = this.getBidsPos(), a9Timeout = 800, slots = [], gptSlots = googletag.pubads().getSlots();
            if ("undefined" == typeof window.apstag) return void webmd.debug("===== APSTAG is undefined =====");
            if (gptSlots.length < 1) return;
            // This function will be called if the A9 bid request fails to complete in time.
            a9TimeoutHandler = function() {
                amznA9.deferred.reject("A9 bid request failed to complete in time");
            }, // save a reference to the promise object, so we can handle it when the request completes or timeout
            webmd.tpsvc.promises.push(this.deferred.promise()), // if A9 request does not return in time, reject the deferred object. 
            a9TimeoutRequestAds = setTimeout(a9TimeoutHandler, a9Timeout), /*
       * create the bid requests based on slots we want Amazon to bid on
       * A9 developer reference: https://ams.amazon.com/webpublisher/uam/docs/web-integration-documentation/integration-guide/javascript-guide/display.html
       */
            $.each(gptSlots, function(id, ad) {
                if (mappings.indexOf(ad.getTargeting("pos")[0]) > -1 && "undefined" == typeof requestedSlots[ad.getSlotElementId()]) {
                    var slot = {};
                    slot.slotID = ad.getSlotElementId(), // i'm cheating here: googletag.Slot.getSizes is an undocumented function in the gpt library, but it is still currently exposed!
                    slot.sizes = ad.getSizes().map(function(size) {
                        return Object.values(size);
                    }), slot.slotName = ad.getAdUnitPath() + "/" + ad.getSlotElementId(), slots.push(slot), 
                    requestedSlots[ad.getSlotElementId()] = !0;
                }
            }), slots.length > 0 && // if there aren't any slots to bid on
            window.apstag.fetchBids({
                slots: slots,
                timeout: a9Timeout
            }, function(bids) {
                // set the apstag targeting on googletag
                googletag.cmd.push(function() {
                    window.apstag.setDisplayBids(), // clear the a9 timeout
                    clearTimeout(a9TimeoutRequestAds), // resolve the deferred
                    amznA9.deferred.resolve(bids);
                });
            });
        } catch (e) {}
    }
};

// initialize the third party service namepace, command queue and promises queue
webmd.tpsvc = webmd.tpsvc || {}, // The ads code will execute every command inside this queue before an ad request is made
webmd.tpsvc.cmds = webmd.tpsvc.cmds || [], // The ads code will wait for every promise in this queue to resolve before an ad request is made
webmd.tpsvc.promises = webmd.tpsvc.promises || [], function() {
    // if in iframe or video article, exit immediately;
    if (window.top === window.self && !amznA9.isVideoContent()) {
        // if we are on sensitive topic pages 
        if (window.s_sensitive && "true" === window.s_sensitive) return !1;
        // if we are on fit domain or member pages, return immediately
        if ("undefined" == typeof document.domain || !(document.domain.toLowerCase().indexOf("fit.") >= 0 || document.domain.toLowerCase().indexOf("member.") >= 0)) {
            //If User is logged in do not load amazon headerbidding
            if (window.webmd.cookie("WBMD_AUTH")) return !1;
            // allow other code to disable this beacon
            if (webmd.beaconDisable) return webmd.debug("===== Amazon headerbidding not loaded due to beaconDisable ===="), 
            !1;
            // do not run header bidding if it is a sponserd programme page
            if (window.s_sponsor_brand && window.s_sponsor_brand.length > 0) return !1;
            amznA9.loadA9(), /*
   * queue the A9 bid request.
   * This will be executed in the future, just before the webmd ad request is made
   */
            webmd.tpsvc.cmds.push(amznA9.getA9Bids.bind(amznA9));
        }
    }
}(), /**
 * Adomik javascript random value generator 
 * for ad call key value targeting
 */
window.Adomik = window.Adomik || {
    randomAdGroup: function() {
        var rand = Math.random(), bool = !1, ad_ex = .09 > rand, ad_bc = .1 > rand;
        switch (bool) {
          case !ad_ex:
            return "ad_ex" + Math.floor(100 * rand);

          case !ad_bc:
            return "ad_bc";

          default:
            return "ad_opt";
        }
    },
    // set the adomik targeting on googletag
    adomikAsyncRequest: function() {
        window.googletag.cmd.push(function() {
            // Get all Ad slots and set adomik key values for each ad slot
            try {
                for (var adSlots = window.googletag.pubads().getSlots(), i = 0; i < adSlots.length; i++) adSlots[i].setTargeting("ad_group", window.Adomik.randomAdGroup()), 
                adSlots[i].setTargeting("ad_h", new Date().getUTCHours().toString());
            } catch (e) {
                webmd.debug(e);
            }
        });
    }
};

// initialize the third party service namepace queue
var webmd = window.webmd || {};

webmd.tpsvc = webmd.tpsvc || {}, // initialize the webmd.tpsvc command queue - a queue for storing third party service commands
webmd.tpsvc.cmds = webmd.tpsvc.cmds || [], /*
 * queue the request
 * This will be executed just before the webmd ad request is made
 */
webmd.tpsvc.cmds.push(window.Adomik.adomikAsyncRequest);

/**
 * PPE-206379 - Google has implemented unified pricing for all indirect demand sources.
 * This will require us to set a single price floor across all demand sources.
 * It’s a challenge for us as a business because we historically had set different
 * floors per demand source.  In this new world we’d likely have to set our floor at the
 * lowest common denominator to ensure we make all inventory available.  So if we typically had
 * a $5 floor for AppNexus demand and a $3 floor for AdX demand we’d now need to set the floor at $3.
 * This isn’t great because now AppNexus could buy our inventory for $3 when they typically would have spent $5.
 *
 * We’d like to test and analyze changing our floor price while Google Is still implementing unified pricing.
 * To do this we need to split our visitors into different cohorts and use DFP to target them differently.
 */
/**
 * Create a function to generate a random number (b/t 1-4)
 * Create a key (pch) and assign it to the random number
 * Set pair/value to page level target (not slot-level)
 * Push to webmd.tpsvc.cmds function
 */
var webmd = window.webmd || {}, cohort = {
    /**
	 * generateNumber
	 * @param {number} theNumber - generates a value from 1 to 4
	 * @returns {number} theNumber returns a value from 1 to 4
	 */
    generateNumber: function() {
        var theNumber = Math.floor(4 * Math.random()) + 1;
        return theNumber;
    },
    /**
	 * setCohorts - A function to a randomly generated number and use it to set a key (pch) value pair
	 * and use it to set a page target
	 * @param {function} theValue - function call to get a random number
	 * @return {function} an anonomous function
	 */
    setCohorts: function() {
        var theValue = this.generateNumber();
        try {
            webmd.ads2.setPageTarget("pch", theValue);
        } catch (e) {
            window.webmd.debug("failed to set the page target", e);
        }
        /**
		 * Return an empty function to prevent the function from running more than once
		 */
        return function() {};
    }
};

/**
 * initialize the third party service namepace queue
 */
webmd.tpsvc = webmd.tpsvc || {}, /**
 * initialize the webmd.tpsvc command queue - a queue for storing third party service commands
 */
webmd.tpsvc.cmds = webmd.tpsvc.cmds || [], /*
 * queue the request
 * This will be executed just before the webmd ad request is made
 */
webmd.tpsvc.cmds.push(cohort.setCohorts()), /**
 * for ad call key value targeting
 */
window.facebook = window.facebook || {
    facebookRequest: function() {
        window.googletag.cmd.push(function() {
            try {
                for (var adSlots = window.googletag.pubads().getSlots(), i = 0; i < adSlots.length; i++) "2026" === adSlots[i].getTargetingMap().pos[0] && adSlots[i].setTargeting("fbid", "385978254785998_2217983684918770");
            } catch (e) {
                webmd.debug(e);
            }
        });
    }
};

// initialize the third party service namepace queue
var webmd = window.webmd || {};

webmd.tpsvc = webmd.tpsvc || {}, // initialize the webmd.tpsvc command queue - a queue for storing third party service commands
webmd.tpsvc.cmds = webmd.tpsvc.cmds || [], /*
 * queue the request
 * This will be executed just before the webmd ad request is made
 */
webmd.tpsvc.cmds.push(window.facebook.facebookRequest), /*! webmd.experian */
//
// Creates an iframe over to a file on akamai, which in turns calls a scripts to experian for matchback purposes
// There is cookie logic built in, utilizing the UI cookie, in order to only create this iframe once per session
//
// Create a local scope and run on document ready
$(function() {
    // if in iframe, exit;
    if (top !== self) return webmd.debug("matchback beacons not fired in iframe."), 
    !1;
    // if we are on sensitive topic pages 
    if (window.s_sensitive && "true" === window.s_sensitive) return !1;
    if (window.location.host.indexOf("member") > -1) return webmd.debug("matchback not fired for member pages"), 
    !1;
    // allow other code to disable the beacon
    if (webmd.beaconDisable) return webmd.debug("matchback beacons not fired due to beaconDisable."), 
    !1;
    // we need to exclude fit, so doing a simple match on "fit." in the hostname
    if (window.location.hostname.indexOf("fit.") > -1) return webmd.debug("matchback beacons not fired on Fit"), 
    !1;
    // we need to not fire these beacons on iOS or inside the WebMD app
    if (webmd.useragent.ua.appview) return webmd.debug("matchback beacons not fired in WebMD App"), 
    !1;
    // grab the expmatch value out of the UI cookie. This is true if the experian matchback has already been done, and false if it hasn't
    var uiCookie = webmd.cookie.getJson("ui"), expCalls = uiCookie.expmatch || 0, turnID = webmd.cookie.get("turn"), pvid = window.s_pageview_id || "";
    // 1.	always fire beacon on first visit.
    // 2.	if we've fired the beacon less than 3 times and still have blank turn cookie value, try again
    // create needed iframe for beacon
    // set experian matchback to true in the cookie and reset it
    // we have to use this across the whole network, so getting the current domain and using that in the cookieoptions
    return 0 === expCalls || 3 > expCalls && !turnID ? (webmd.debug("matchback beacon call - try #" + (expCalls + 1) + "..."), 
    $("<iframe/>").attr({
        id: "matchbackBeacon",
        src: "//img.webmd.com/pixel/aiq.a.html?domain=" + webmd.url.getSLD() + "&pvid=" + pvid,
        style: "width:0px; height:0px; border:0px;"
    }).appendTo("body"), uiCookie.expmatch = expCalls + 1, webmd.cookie.setJson("ui", uiCookie, {
        domain: webmd.url.getSLD()
    }), webmd.debug("matchback beacon call done.")) : webmd.debug("matchback beacon not needed."), 
    !0;
}), /**
 * Created by ryarborough on 12/23/16.
 */
$(function() {
    "use strict";
    /**
	 * Create an iframe with a src/domain of (http(s)://img.webmd.com/pixel/liveramp.a.html), and add it into the main
	 * DOM.
	 * merge local branch into integration perf
	 * push into origin integration perf
	 */
    // if in iframe, exit;
    if (window.top !== window.self) return webmd.debug("beacon not fired inside of iframe"), 
    !1;
    // if we are on sensitive topic pages 
    if (window.s_sensitive && "true" === window.s_sensitive) return !1;
    if (window.location.host.indexOf("member") > -1) return webmd.debug("beacon not fired for member pages"), 
    !1;
    // allow other code to disable the beacon
    if (webmd.beaconDisable) return webmd.debug("Liveramp beacon not fired due to beaconDisable."), 
    !1;
    // we need to exclude fit, so doing a simple match on "fit." in the hostname
    if (window.location.hostname.indexOf("fit.") > -1) return webmd.debug("beacon not fired on Fit"), 
    !1;
    // we need to not fire these beacons on iOS or inside the WebMD app
    if (webmd.useragent.ua.appview) return webmd.debug("beacon not fired in WebMD App"), 
    !1;
    // get the liverframe ID out of the LR_ID cookie.
    var liverampID = webmd.cookie.get("lrid"), lrPVID = window.s_pageview_id || "";
    liverampID || 0 !== $("#liverampBeacon").length ? webmd.debug("beacon not needed") : $("<iframe/>").attr({
        id: "liverampBeacon",
        src: "//img.webmd.com/pixel/liveramp.a.html?domain=" + webmd.url.getSLD() + "&lrPVID=" + lrPVID,
        style: "width:0px; height:0px; border:0px;"
    }).appendTo("body");
}), /*! webmd.hoverIntent */
/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
function($) {
    $.fn.hoverIntent = function(f, g) {
        // default configuration options
        var cfg = {
            sensitivity: 3,
            interval: 100,
            timeout: 100
        };
        // override configuration options with user supplied object
        cfg = $.extend(cfg, g ? {
            over: f,
            out: g
        } : f);
        // instantiate variables
        // cX, cY = current X and Y position of mouse, updated by mousemove event
        // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
        var cX, cY, pX, pY, track = function(ev) {
            cX = ev.pageX, cY = ev.pageY;
        }, compare = function(ev, ob) {
            // compare mouse positions to see if they've crossed the threshold
            // compare mouse positions to see if they've crossed the threshold
            // set hoverIntent state to true (so mouseOut can be called)
            // set previous coordinates for next time
            // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
            return ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t), Math.abs(pX - cX) + Math.abs(pY - cY) < cfg.sensitivity ? ($(ob).unbind("mousemove", track), 
            ob.hoverIntent_s = 1, cfg.over.apply(ob, [ ev ])) : (pX = cX, pY = cY, ob.hoverIntent_t = setTimeout(function() {
                compare(ev, ob);
            }, cfg.interval), void 0);
        }, delay = function(ev, ob) {
            return ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t), ob.hoverIntent_s = 0, 
            cfg.out.apply(ob, [ ev ]);
        }, handleHover = function(e) {
            // copy objects to be passed into t (required for event object to be passed in IE)
            var ev = jQuery.extend({}, e), ob = this;
            // cancel hoverIntent timer if it exists
            ob.hoverIntent_t && (ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t)), // if e.type == "mouseenter"
            "mouseenter" == e.type ? (// set "previous" X and Y position based on initial entry point
            pX = ev.pageX, pY = ev.pageY, // update "current" X and Y position based on mousemove
            $(ob).bind("mousemove", track), // start polling interval (self-calling timeout) to compare mouse coordinates over time
            1 != ob.hoverIntent_s && (ob.hoverIntent_t = setTimeout(function() {
                compare(ev, ob);
            }, cfg.interval))) : (// unbind expensive mousemove event
            $(ob).unbind("mousemove", track), // if hoverIntent state is true, then call the mouseOut function after the specified delay
            1 == ob.hoverIntent_s && (ob.hoverIntent_t = setTimeout(function() {
                delay(ev, ob);
            }, cfg.timeout)));
        };
        // bind the function to the two event listeners
        return this.bind("mouseenter", handleHover).bind("mouseleave", handleHover);
    };
}(jQuery), /*! se5r  */
/**
 * Fire off a tracking pixel that records the total cookie length, and the name and length
 * of each invidiual cookie. This will be used to generate a report of all cookies.
 *
 * Note: this will only run for modern browsers that support sessionStorage,
 * so we can avoid repeated calls on each pageview when the cookies do not change
 *
 * @private
 */
webmd.cookie.trackCookies = function() {
    var cookieLength, oldLength, cookieArray, i, nameAndValue, name, valueLength, url, storage;
    // Make sure document.cookie exists
    if (// Type of storage to use: localStorage or sessionStorage
    // Note: for some reason could not get localStorage to work.
    storage = window.sessionStorage, // URL of the tracking pixel
    url = "http://bi.webmd.com/1x1.gif", document.cookie && window == window.top && storage) // Don't run if localStorage is not available, to prevent too many calls.
    // Losing old browsers probably is not important in this case.
    {
        if (window.location.host.indexOf("member") > -1) return void webmd.debug("cookie tracking not fired for member pages");
        // Exit if the cookie length has not changed since the last save
        if (// Get current length of all cookies
        // (and cast to a string so we can compare to the string in storage)
        cookieLength = "" + document.cookie.length, // Check the length of the cookies that we previously logged (if any)
        oldLength = storage.cookieLength, webmd.debug("cookie length = ", cookieLength, oldLength), 
        cookieLength !== oldLength && !(6e3 > cookieLength)) // Exit if the cookie length is below minimum
        {
            // Loop through all cookies to get the cookie name and the length of the cookie value
            for (// Save the cookie length in local storage for next pageview
            storage.cookieLength = cookieLength, // Separate individual cookies
            cookieArray = document.cookie.split(";"), // Create the URL to fetch
            // ?l={length}&n={name:size},{name:size}
            url = webmd.url.addParam("cookieLength", cookieLength, url), i = 0; i < cookieArray.length; i++) // Split the "name=value" into an array
            nameAndValue = jQuery.trim(cookieArray[i]).split("="), // Get the name of the cookie
            name = nameAndValue[0] || "", // Get the length of the value part
            valueLength = (nameAndValue[1] || "").length, // Make sure neither name nor value was blank
            name && valueLength && (url = webmd.url.addParam(name, valueLength, url));
            webmd.debug("Logging cookie sizes: ", url), // Fetch the URL to log the cookies
            $(function() {
                // Must add the image to the page to ensure it is fetched properly
                $("<img/>").hide().appendTo("body").attr("src", url);
            });
        }
    }
}, /**
 * If cookies are too large and are about to break the server, then delete the largest cookie.
 * @private
 */
webmd.cookie.cleanup = function() {
    var max, cookieArray, i, largestCookie, largestLength, nameAndValue, name, valueLength;
    // Make sure document.cookie exists
    if (// Maximum length allowed for all cookies
    max = 8e3, document.cookie && !(document.cookie.length <= max)) // If total cookies are not too big, we are done
    {
        // Loop through all cookies to get the cookie name and the length of the cookie value
        for (// -== Cookies are too big! ==-
        // Separate individual cookies
        cookieArray = document.cookie.split(";"), // Use this to keep track of the largest cookie
        largestCookie = "", largestLength = 0, i = 0; i < cookieArray.length; i++) // Split the "name=value" into an array [name,value]
        nameAndValue = jQuery.trim(cookieArray[i]).split("="), // Get the name of the cookie
        name = nameAndValue[0] || "", // Get the length of the value part
        valueLength = (nameAndValue[1] || "").length, name && valueLength > largestLength && (largestCookie = name, 
        largestLength = valueLength);
        // If we found the largest cookie, try to delete it
        largestCookie && (webmd.debug("deleting largest cookie " + largestCookie), webmd.cookie.deleteCookie(largestCookie, {
            path: "/",
            domain: "webmd.com"
        }));
    }
}, // Run on document ready
$(function() {
    webmd.cookie && (webmd.cookie.trackCookies(), webmd.cookie.cleanup());
}), /*! webmd.mediaNet */
/*
 * Handler for media.net tags placement on core WebMD site
 * @requires jQuery
 *
 * https://confluence.webmd.net/display/CPM/Media.net+Implementation
 * https://confluence.webmd.net/download/attachments/14713870/Medianet%20-%20Integration%20Guide.pdf?api=v2
 */
function() {
    var isSSL = "https:" === document.location.protocol, propProgram = window.s_sponsor_program || "", propBrand = window.s_sponsor_brand || "", geo = window.s_geo || "", corporateSites = [ "WebMD Policy", "Política de WebMD", "WebMD Corporate", "WebMD Press Release" ], sensitive = window.s_sensitive || "";
    // allow other code to disable the beacon
    // allow other code to disable the beacon
    // if in iframe, exit;
    // exclude from member pages
    // if we are inside the webmd app, disable lotame
    // only run this if the article is not funded and not sensitive
    // Remove MediaNet Unit from Corporate Pages on WebMD - PPE-158687
    return window._mNHandle = window._mNHandle || {}, window._mNHandle.queue = window._mNHandle.queue || [], 
    window.medianet_versionId = "121199", webmd.beaconDisable ? (webmd.debug("Media.net beacon not fired due to beaconDisable."), 
    !1) : window.top !== window.self ? (webmd.debug("Media.net Ads not fired in iframe."), 
    !1) : window.location.host.indexOf("member") > -1 ? (webmd.debug("Media.net not fired for member pages"), 
    !1) : webmd.useragent.ua.appview ? (webmd.debug("Media.net not fired within webmd mobile apps."), 
    !1) : "true" === sensitive || propBrand || propProgram || geo ? !1 : corporateSites.indexOf(window.s_publication_source) > -1 ? !1 : (window.top !== window.self || "undefined" != typeof window.advBidxc && window.advBidxc.isLoaded || webmd.load({
        js: "//contextual.media.net/dmedianet.js?cid=8CUU54RQD" + (isSSL ? "&https=1" : "")
    }), void (webmd.medianet = function() {
        var /**
		 * config object for medianet placements
		 * @private
		 */
        _placements = {}, /**
		 * Return keys for an object.
		 * Object.keys() does not work in IE8.
		 *
		 * @private
		 * @param Object obj - A dictionary object to return keys for
		 * @return {array} An array of object keys
		 */
        _keys = function(obj) {
            var arr = [];
            return obj = obj || {}, $.each(obj, function(index, value) {
                arr.push(index);
            }), arr;
        };
        // public interface
        return {
            /*
			 * show the medianet unit.
			 * @return {void}
			 */
            showPlacements: function() {
                var $node, container, mediaNetContainer, asset = this.getAsset(), layout = this.getLayout(), placement = this.getPlacement(asset), $medianet = $(".medianet-ctr"), seoTest = webmd.articleConfig && webmd.articleConfig.seo && Array.isArray(webmd.articleConfig.seo.centerId) && webmd.articleConfig.seo.centerId.indexOf(window.center_id) > -1 && Array.isArray(webmd.articleConfig.seo.busRef) && webmd.articleConfig.seo.busRef.indexOf(window.s_business_reference) > -1;
                // if there is no media.net configuration for this layout, exit
                if (!placement[layout]) return !1;
                // suppression of ads on article which matches articleConfig setting with cenetrID or businessReference
                if (seoTest) return !1;
                // if the medianet div is not already on the page, insert it
                $medianet.length || (container = placement[layout].container, // if we have a list of container options indictating where to place this unit,
                // go through the list till we find a matching element on the page.
                $.isArray(container) ? $.each(container, function(key, value) {
                    return $node = $(value), $node.length ? !1 : void 0;
                }) : $node = $(container), $node.length && (placement[layout].position ? $node.after('<div class="medianet-ctr"></div>') : $node.before('<div class="medianet-ctr"></div>'), 
                $medianet = $(".medianet-ctr"))), // need to do this in order to prevent multiple placements appearing.
                $medianet.empty();
                try {
                    mediaNetContainer = placement[layout], $medianet.attr("id", mediaNetContainer.id), 
                    window._mNHandle.queue.push(function() {
                        window._mNDetails.loadTag(mediaNetContainer.id, mediaNetContainer.size, mediaNetContainer.id);
                    }), // save the placement parameters for later if we need to refresh the unit
                    this._refreshParams = [ mediaNetContainer.id, mediaNetContainer.size, mediaNetContainer.id ], 
                    // cache the placement div
                    this.container = $medianet;
                } catch (e) {}
            },
            /**
			 * get config object for medianet tag placements via our proxy API to workaround cross domain restrictions
			 *
			 * @return {void}
			 */
            getPlacements: function() {
                var self = this, url = window.image_server_url + "/webmd/PageBuilder_Assets/JS_static/medianet/config.js";
                "https:" === window.location.protocol && (url = url.replace(/http:/gi, "https:")), 
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    url: window.location.protocol + "//" + window.location.host + "/api/proxy/proxy.aspx?url=" + url,
                    success: function(data) {
                        try {
                            /**
							 * A collection of placement config objects that store details for
							 * medianet tag placement on the page based on the asset and layout type.
							 *
							 * @param placement.container {String} A class name or ID indicating where the tag appears on the page relative to the container.
							 * @param placement.id {String} The ID of the medianet placement unit.
							 * @param placement.size {String} The dimension of the medianet unit when it is rendered on the page.
							 * @param placement.position {boloean} A flag indicating whether the unit should be placed below (true) or above (false | undefined) the container.
							 */
                            _placements = data;
                        } catch (e) {
                            webmd.debug("===== MEDIA.NET CONFIG ERROR ====");
                        }
                        self.showPlacements();
                    },
                    error: function(xhr, status, error) {
                        webmd.debug("FAILED TO GET MEDIA.NET PLACEMENT CONFIG: " + error);
                    }
                });
            },
            /**
			 * get a placement based on asset type i.e slideshow, video, quiz, article..
			 *
			 * @param {String} asset The asset for which you want the placement config for.
			 * @return {object}
			 */
            getPlacement: function(asset) {
                return "undefined" != typeof asset && _placements[asset] ? _placements[asset] || !1 : !1;
            },
            /**
			 * get placement asset type based on s_vars
			 *
			 * quiz, slideshows, video assets will be identified using s_package_type variable.
			 * everything else is considered a 'regular article'.
			 * @return {String}
			 */
            getAsset: function() {
                var keys = _keys(_placements), asset = "article", packageType = window.s_package_type || "", businessRef = window.s_business_reference || "";
                // check package type and business reference to determine asset type
                return $.each(keys, function(index, asset_name) {
                    return packageType.indexOf(asset_name) > -1 || businessRef.toLowerCase().indexOf(asset_name) > -1 ? (asset = asset_name, 
                    !1) : void 0;
                }), asset;
            },
            /**
			 * determine the layout type i.e harmony, medref, legacy..
			 * @return {String} The layout type.
			 */
            getLayout: function() {
                var layout = "flexible", // setting default layout-type to flexible
                $elHtml = $("html");
                return $elHtml.hasClass("responsive") ? layout = "responsive" : $elHtml.hasClass("harmony") ? layout = "harmony" : $elHtml.hasClass("site-modernization") ? layout = "site-modernization" : $elHtml.hasClass("legacy") ? layout = "legacy" : $elHtml.hasClass("ua_type_mobile") && (layout = "mobile"), 
                layout;
            },
            /*
			 * refresh the medianet placement.
			 * This will only refresh a unit that exists on the page. you can't refresh 'nothing'
			 */
            refresh: function() {
                "container" in this && (this.container.empty(), window._mNDetails.loadTag.apply(null, this._refreshParams || []));
            }
        };
    }()));
}(), $(function() {
    webmd.medianet && webmd.medianet.getPlacements();
}), /*!
 * webmd.medscape - target and flight medscape ads to users on WebMD identified as medscape users.
 * https://confluence.webmd.net/pages/viewpage.action?spaceKey=ProfessionalDev&title=Target+medscape+users+on+webmd.com
 * https://confluence.webmd.net/pages/viewpage.action?pageId=19540841
 * https://jira.webmd.net/browse/PPE-56960
 * make a call to the api in medscape.com to get the user details and write the cookie with updated info.
 */
function() {
    // if in iframe, exit;
    // if in iframe, exit;
    // allow other code to disable the beacon
    // if we are on sensitive topic pages 
    // we need to exclude fit, so doing a simple match on "fit." in the hostname
    // we need to not fire these beacons on iOS or inside the WebMD app
    return window.top !== window.self ? (webmd.debug("medscape beacon not fired in iframe."), 
    !1) : window.location.host.indexOf("member") > -1 ? (webmd.debug("medscape not fired for member pages"), 
    !1) : webmd.beaconDisable ? (webmd.debug("Medscape beacon not fired due to beaconDisable."), 
    !1) : window.s_sensitive && "true" === window.s_sensitive ? !1 : window.location.hostname.indexOf("fit.") > -1 ? (webmd.debug("medscape beacon not fired on Fit"), 
    !1) : webmd.useragent.ua.appview ? (webmd.debug("medscape beacon not fired in WebMD App"), 
    !1) : (webmd.medscape = {
        /*
		 * medscape cookie
		 */
        medat: webmd.cookie.get("medat"),
        /*
		 * a list key definitions for custom params we want to set in dfp.
		 */
        dfp_params_to_set: [ "occ", "ct", "pf", "st", "tar", "usp", "tc", "gd" ],
        /*
		 * the amount of time we will wait to get a response from the medscape API
		 */
        timeout: 600,
        init: function() {
            var cookieParts, options, self = this;
            /*
			 * check if a medat cookie exists, if it does not, do nothing.
			 * if it does, then check if it is more than 60 minutes old and refresh the cookie if it is.
			 */
            this.medat ? (cookieParts = this.parseCookie(this.medat, "&"), // get the values we need from the cookie
            options = this.pluck(cookieParts), // set custom params
            webmd.isIE9AndBelow || webmd.ads2.setPageTarget(options), // refresh the medscape cookie if it is more than 1 hour old.
            cookieParts.dt && new Date() - new Date(cookieParts.dt) > 36e5 && (webmd.debug("refreshing medscape cookie..."), 
            $.ajax({
                url: "http://api.medscape.com/servicegateway/medscapeuserdata",
                xhrFields: {
                    withCredentials: !0
                },
                timeout: self.timeout,
                success: function(d, status, xhr) {
                    if (d) {
                        /*
								 * medscape calls out to an external API to get tac info.
								 * sometimes that external API request times out and tac parameter is returned in the
								 * medscape API response as an empty array; i.e "guid=591959259&tl=[]&c=us&p=20&o=1014&tac=[]&..."
								 * to help performance, we save the value of the tac parameter in the cookie prior to calling the medscape API,
								 * and we set this value in the updated medscape cookie if tac is empty in the api response.
								 */
                        var tac = cookieParts.tc;
                        d.match(/tac=\[\]/) && (d = d.replace(/tac=\[\]/, "tac=" + tac)), // refresh the medscape cookie with latest user info
                        $("<iframe/>").attr({
                            id: "medscapeBeacon",
                            src: "//img.webmd.com/medscape/medscapebeacon.html?" + d,
                            style: "width:0px; height:0px; border:0px;"
                        }).appendTo("body");
                    } else webmd.debug("==== empty response from medscape API ====");
                },
                error: function(xhr, status, error) {
                    "timeout" === error ? webmd.debug("MEDSCAPE API REQUEST TIMED OUT") : webmd.debug("MEDSCAPE CONNECTION FAILED: " + error);
                }
            }))) : webmd.debug("medscape cookie not needed.");
        },
        /*
		 * get a subset of an object containing custom params we want to set in DFP.
		 * @param {Object} obj: An object containing key/value pairs.
		 * @return {Object} a dictionary containing custom parameters to set in DFP.
		 */
        pluck: function(obj) {
            var key, options = {};
            for (key in obj) $.inArray(key, this.dfp_params_to_set) > -1 && (options[key] = obj[key]);
            return options;
        },
        /*
		 * split a cookie string into key/value pairs
		 * @example
		 * "guid=591884712&tar=[]&ct=us&pf=10&occ=0&tac=[]&st=ny&ps=32" becomes
		 * {"guid":"591884712", "tar":"[]", "ct":"us", "pf":"10", "occ": "0", "tac":"[]", "st":"ny", "ps":"32"}
		 *
		 * @str {String} str: A delimeted string
		 * @delimeter {String} delimeter: A string used to separate parameters
		 * @return {Object} an object containing key/value pairs.
		 */
        parseCookie: function(str, delimeter) {
            var o, j, i, l, options = {};
            for (o = str.split(delimeter), l = o.length, i = 0; l > i; i++) j = o[i].split("="), 
            j[0] && (options[[ j[0] ]] = j[1] || "", options[[ j[0] ]] = options[[ j[0] ]].replace(/,\s+/g, ","));
            return options;
        }
    }, void webmd.medscape.init());
}(), /*! webmd.m.appAdStatus */
/* 
 * 
 * This function will suppress certain items on the pages if we are viewing items inside the appview
 * It also sets a "global" variable for the ads to check into. If webmd.m.appAdStatus.suppress = true then ads won't write themselves
 * @namespace
*/
webmd.m.appAdStatus = {
    suppress: !1,
    init: function() {
        var _self = this, isWebMDApp = ($('div[class~="ad_placeholder"]'), navigator.userAgent.match(/(webmdapp)/i)), isMedscapeApp = navigator.userAgent.match(/(medscapeapp)/i);
        if (isWebMDApp || isMedscapeApp) {
            webmd.debug("WEBAPP VIEW - suppress ads."), // viewed in app, drop in a class into the HTML to hide everything we need
            $('html,.lrgTitle:contains("Top Picks")').addClass("app_view"), // if we are in the mobile app view, suppress all ads EXCEPT pos 2040.
            // TODO: implement smart searching of ad modules on the page to pass pos to ads2_ignore()
            // adsPlaceholder
            window.ads2_ignore = {
                101: !0,
                103: !0,
                113: !0,
                115: !0,
                121: !0,
                131: !0,
                137: !0,
                409: !0,
                700: !0,
                701: !0,
                901: !0,
                902: !0,
                1901: !0,
                2025: !0,
                2026: !0,
                2050: !0,
                2051: !0,
                5e3: !0,
                5001: !0,
                5002: !0,
                5003: !0,
                5100: !0
            };
            // In the new WebMD 4.0 app, we show a lot of tests and procedures content inside of HW Med Ref content. There is no pretty way to identify these across one center
            // as they are all over the site. The ONLY thing they have in common is s_publication_source="WebMD Medical Reference from Healthwise"
            // So here we'll tie into that global variable and if it exists on the page and we are in the app, we'll add a special class to hide a bunch of stuff
            var pubSource = window.s_publication_source || "";
            "WebMD Medical Reference from Healthwise" === pubSource && $("html").addClass("app_medrefcontent"), 
            // drop in app specific classe as we want to hide more on medscape
            isMedscapeApp && $("html").addClass("app_medscape");
            var isFirstPageview = "" === document.referrer, isPaginated = webmd.url.deleteParam("page", document.referrer) !== webmd.url.deleteParam("page");
            //set trigger to suppress ads
            _self.suppress = !0, //checks to see if first pageview, then checks to see if the referrer and current url are same, without page param
            isFirstPageview && isPaginated || (//on secondary page, flag is set to false so ads can be shown and the advertisement labels are displayed as well
            $("html").addClass("show_ads"), _self.suppress = !1);
        }
    }
}, // self init to make sure the ads have access to the "global" var and the html classes make it into the DOM before rendering
webmd.m.appAdStatus.init(), /*! webmd.mobile.appViewHandler */
/**
 * sniff out user agent string for specific WebMD App values
 * @namespace
 */
webmd.appViewHandler = {
    /**
	 * @type {Object}
	 */
    appView: {
        WebMDApp: !1,
        whichOne: ""
    },
    /**
	 *
	 */
    init: function() {
    },
    /**
	 *
	 */
    whichApp: function() {
        return this.appView.whichOne;
    },
    /**
	 *
	 */
    inWebMDApp: function() {
        return this.appView.WebMDApp;
    }
}, /* Initilizing now so this can be put on the document before HTML starts to load */
webmd.appViewHandler.init();

// create webmd object, if necessary
var webmd = window.webmd || {};

// if not in an iframe
window.top === window.self && (/**
	 * webmd.dfpNative
	 * 
	 * This DFP Native script replaces OAS functionality.
	 * On page load, modules containing default drivers display. 
	 * This code looks for those placements and then makes dedicated DFP ad requests
	 * to replace them with programmed slots from the ad server.
	 * This code was ported over and updated from a Adobe Target A/B Test
	 * 
	 * Currently targeting five modules on webmd.com
	 * 
	 * Featured Health Topics & Living Healthy
	 * https://www.webmd.com/default.htm
	 * 
	 * Dynamic Lead & Today on WebMD
	 * https://www.webmd.com/allergies/default.htm
	 * 
	 * Top Picks
	 * https://www.webmd.com/cold-and-flu/cough-get-rid-home-hacks
	 * 
	 * @object
	 * @return {Object} DFP Native object
	 */
webmd.dfpNative = function() {
    /**
		 * $cache
		 * Cache to store all ad containers so we don't have to scan multipe times
		 */
    var $cache = {}, ads = {}, hasRun = {}, native = {
        /**
			* defineAd
			* Define ad slot
			* @param  {object} settings
			*/
        defineAd: function(settings) {
            // Check for required settings
            if (// Make sure settings is an object
            settings = settings || {}, !(settings.id && settings.sizes && settings.pos)) throw "Missing id, pos, or sizes for defineAd";
            // Save these settings because we will use them later to actually display the ads
            ads[settings.id] = settings, function(s) {
                googletag.cmd.push(function() {
                    var adUnit, adSlot;
                    adUnit = "/" + webmd.ads2.networkCode + "/" + webmd.ads2.adTarget.join("/"), // Create the ad slot and set the "pos" key
                    adSlot = googletag.defineSlot(adUnit, s.sizes, s.id).addService(googletag.pubads()).setTargeting("pos", s.pos), 
                    // Save the ad slot for future use when we refresh ads
                    settings.slot = adSlot, // Set extra individual targeting keys if any were provided
                    s.keys && $.each(s.keys, function(key, value) {
                        adSlot.setTargeting(key, value);
                    });
                });
            }(settings);
        },
        /**
			* dynamicLead
			* creates the native ad slots for the Dynamic Lead module
			*/
        dynamicLead: function() {
            var _this = this, $module = $(".module-promo-slide-show .slider .slide"), pos = [ 9011, 9012, 9013, 9014, 9015 ], slots = [], slotcode = "dynamic_lead", moduleId = "prm-hc";
            // if this has already run, exit
            hasRun.dynamic_lead !== !0 && (webmd.debug("##### dfpNative: dynamicLead"), $module.each(function(i) {
                var $this = $(this), index = parseInt(i + 1, 10), obj = {};
                this.id = "dfpslot_" + slotcode + "_" + index, $this.attr("data-sizes", '[[1,10],"fluid"]'), 
                $this.attr("data-pos", pos[i]), $this.attr("data-scp", "{'mod' : " + moduleId + "}"), 
                obj.id = this.id, obj.sizes = [ [ 1, 10 ], "fluid" ], obj.pos = pos[i], obj.keys = {
                    mod: moduleId
                }, $cache[this.id] = $this, // do we need this?
                // define ad
                _this.defineAd(obj), // push slots into array so we can refresh later
                slots.push(obj.slot);
            }), // add to hasRun object
            hasRun.dynamic_lead = !0, // refresh this module's slots to display
            // display() does not work
            googletag.pubads().refresh(slots));
        },
        /**
			* todayOnWebmd
			* creates the native ad slots for the Today On Webmd module
			*/
        todayOnWebmd: function() {
            var _this = this, $module = $(".module-ed-urr.dfp-native .entry_fmt").not(".entry_fmt_st"), pos = [ 9001, 9002, 9003, 9004 ], slots = [], slotcode = "tow", moduleId = "ed-urr";
            // if this has already run, exit
            hasRun.tow !== !0 && (webmd.debug("##### dfpNative: todayOnWebmd"), // rename the ids
            $module.each(function(i) {
                var $this = $(this), index = parseInt(i + 1, 10), obj = {};
                this.id = "dfpslot_" + slotcode + "_" + index, $this.attr("data-sizes", '[[1,10],"fluid"]'), 
                $this.attr("data-pos", pos[i]), $this.attr("data-scp", "{'mod' : " + moduleId + "}"), 
                obj.id = this.id, obj.sizes = [ [ 1, 10 ], "fluid" ], obj.pos = pos[i], obj.keys = {
                    mod: moduleId
                }, $cache[this.id] = $this, // do we need this?
                // define ad
                _this.defineAd(obj), // push slots into array so we can refresh later
                slots.push(obj.slot);
            }), // add to hasRun object
            hasRun.tow = !0, // refresh this module's slots to display
            // display() does not work
            googletag.pubads().refresh(slots));
        },
        /**
			* topPicksModule
			* Creates the native ad slots for the Top Picks module
			*/
        // 
        topPicksModule: function() {
            var _this = this, $module = $(".module-lln-toppks li"), pos = [ 9021, 9022, 9023, 9024, 9025, 9026 ], slots = [], moduleId = "lln-toppks";
            // if this has already run, exit
            hasRun.top_picks !== !0 && (webmd.debug("##### dfpNative: topPicksModule"), // rename the ids
            $module.each(function(i) {
                var $this = $(this), index = parseInt(i + 1, 10), obj = {};
                this.id = "top_picks_slot_" + index, // this.id = 'dfpslot_' + slotcode + '_' + index;
                $this.attr("data-sizes", '[[1,10],"fluid"]'), $this.attr("data-pos", pos[i]), $this.attr("data-scp", "{'mod': " + moduleId + "}"), 
                obj.id = this.id, obj.sizes = [ [ 1, 10 ], "fluid" ], obj.pos = pos[i], obj.keys = {
                    mod: moduleId
                }, $cache[this.id] = $this, // do we need this?
                // define ad
                _this.defineAd(obj), // push slots into array so we can refresh later
                slots.push(obj.slot);
            }), // add to hasRun object
            hasRun.top_picks = !0, // refresh this module's slots to display
            // display() does not work
            googletag.pubads().refresh(slots));
        },
        /**
			* featuredHealthTopicsImage
			* Creates the native ad slot for the Featured Health Topics image on homepage
			*/
        featuredHealthTopicsImage: function() {
            var _this = this, $module = $(".mainCondition"), pos = [ 9030 ], slots = [], slotcode = "featured_topic_image", moduleId = "ed-hlthcndtns-hp";
            // if this has already run, exit
            hasRun.featured_topic_image !== !0 && (webmd.debug("##### dfpNative: featuredHealthTopicsImage"), 
            $module.each(function(i) {
                var $this = $(this), index = parseInt(i + 1, 10), obj = {};
                this.id = "dfpslot_" + slotcode + "_" + index, $this.attr("data-sizes", '[[1,10],"fluid"]'), 
                $this.attr("data-pos", pos[i]), $this.attr("data-scp", "{'mod' : " + moduleId + "}"), 
                obj.id = this.id, obj.sizes = [ [ 1, 10 ], "fluid" ], obj.pos = pos[i], obj.keys = {
                    mod: moduleId
                }, $cache[this.id] = $this, // do we need this?
                // define ad
                _this.defineAd(obj), // push slots into array so we can refresh later
                slots.push(obj.slot);
            }), // add to hasRun object
            hasRun.featured_topic_image = !0, // refresh this module's slots to display
            // display() does not work
            googletag.pubads().refresh(slots));
        },
        /**
			* featuredHealthTopicsLinks
			* Creates native ad slots for the Featured Health Topics links on homepage
			*/
        featuredHealthTopicsLinks: function() {
            var _this = this, $module = $(".conditionsLists li"), pos = [ 9031, 9032, 9033, 9034, 9035, 9036 ], slots = [], slotcode = "featured_topic_link", moduleId = "ed-hlthcndtns-hp";
            // if this has already run, exit
            hasRun.featured_topic_link !== !0 && (webmd.debug("##### dfpNative: featuredHealthTopicsLinks"), 
            $module.each(function(i) {
                var obj = {}, index = parseInt(i + 1, 10), $this = $(this);
                this.id = "dfpslot_" + slotcode + "_" + index, $this.attr("data-sizes", '[[1,10],"fluid"]'), 
                $this.attr("data-pos", pos[i]), $this.attr("data-scp", "{'mod' : " + moduleId + "}"), 
                obj.id = this.id, obj.sizes = [ [ 1, 10 ], "fluid" ], obj.pos = pos[i], obj.keys = {
                    mod: moduleId
                }, $cache[this.id] = $this, // do we need this?
                // define ad
                _this.defineAd(obj), // push slots into array so we can refresh later
                slots.push(obj.slot);
            }), // add to hasRun object
            hasRun.featured_topic_link = !0, // refresh this module's slots to display
            // display() does not work
            googletag.pubads().refresh(slots));
        },
        /**
			* dynamicLead
			* Creates the native ad slots for the Living Healthy module on homepage
			*/
        livingHealthy: function() {
            var _this = this, $module = $(".module-ed-lvnghlthy-hp li"), pos = [ 9041, 9042, 9043, 9044, 9045, 9046, 9047, 9048, 9049 ], slots = [], slotcode = "living_healthy_slot", moduleId = "ed-lvnghlthy-hp";
            // if this has already run, exit
            hasRun.living_healthy_slot !== !0 && (webmd.debug("##### dfpNative: livingHealthy"), 
            $module.each(function(i) {
                var obj = {}, index = parseInt(i + 1, 10), $this = $(this);
                this.id = "dfpslot_" + slotcode + "_" + index, $this.attr("data-sizes", '[[1,10],"fluid"]'), 
                $this.attr("data-pos", pos[i]), $this.attr("data-scp", "{'mod' : " + moduleId + "}"), 
                obj.id = this.id, obj.sizes = [ [ 1, 10 ], "fluid" ], obj.pos = pos[i], obj.keys = {
                    mod: moduleId
                }, $cache[this.id] = $this, // do we need this?
                // define ad
                _this.defineAd(obj), // push slots into array so we can refresh later
                slots.push(obj.slot);
            }), // add to hasRun object
            hasRun.living_healthy_slot = !0, // refresh this module's slots to display
            // display() does not work
            googletag.pubads().refresh(slots));
        },
        /**
			* Optimized CardModule for global solution
			*/
        webmdCardModule: function(cardObject) {
            var _this = this, $module = $(cardObject.element).find("ul li"), pos = cardObject.pos, slots = [], slotcode = "card-module", moduleId = cardObject.element.getAttribute("data-metrics-module") || "";
            $module.each(function(i) {
                // if dfp native called, return
                if ($this = $(this), !$this[0] || !$this[0].getAttribute("data-google-query-id")) {
                    var index = parseInt(i + 1, 10), obj = {};
                    this.id = "dfpslot_" + slotcode + "_" + index + "_" + (65536 * (1 + Math.random()) | 0).toString(16).substring(1), 
                    $this.attr("data-sizes", '[[1,10],"fluid"]'), $this.attr("data-pos", pos[i]), $this.attr("data-scp", "{'mod' : " + moduleId + "}"), 
                    obj.id = this.id, obj.sizes = [ [ 1, 10 ], "fluid" ], obj.pos = pos[i], obj.keys = {
                        mod: moduleId
                    }, $cache[this.id] = $this, // do we need this?
                    // define ad
                    _this.defineAd(obj), // push slots into array so we can refresh later
                    slots.push(obj.slot);
                }
            }), // refresh this module's slots to display
            // display() does not work
            googletag.pubads().refresh(slots);
        },
        /**
			* requestSlots
			* Checks the DOM and global hasRun object 
			* If valid, requests appropriate ad slots 
			*/
        requestSlots: function() {
            var _this = this, $container2 = $(".main-container-2"), $dynamicLead = $container2.find(".module-promo-slide-show"), $todayOnWebmd = $(".main-container-3 .unified_right_inner_v2_rdr"), $topPicksModule = $container2.find(".module-top-picks"), $featuredHealthTopics = $container2.find(".featuredTopics"), cardModules = $("[data-card-modules*=cards]");
            /**
				* Find the elements with data-modules and append the card modules based on how many cards they want 
				* This works fore site fronts, pregnancy and othe pages wherever we see this atttribute 
				*/
            if (// For each module check that it exists and if its key is in the hasRun object
            $dynamicLead.length > 0 && !hasRun.hasOwnProperty("dynamic_lead") && _this.dynamicLead(), 
            $todayOnWebmd.length > 0 && !hasRun.hasOwnProperty("tow") && _this.todayOnWebmd(), 
            $topPicksModule.length > 0 && !hasRun.hasOwnProperty("top_picks") && _this.topPicksModule(), 
            $featuredHealthTopics.length > 0 && !hasRun.hasOwnProperty("featured_topic_image") && (_this.featuredHealthTopicsImage(), 
            _this.featuredHealthTopicsLinks(), _this.livingHealthy()), cardModules && cardModules.length) for (var i = 0; i < cardModules.length; i++) {
                var noOfCards = cardModules[i].getAttribute("data-card-modules");
                switch (noOfCards) {
                  case "3cards":
                    _this.webmdCardModule({
                        element: cardModules[i],
                        pos: [ 723, 724, 725 ]
                    });
                    break;

                  case "4cards-v1":
                    _this.webmdCardModule({
                        element: cardModules[i],
                        pos: [ 623, 624, 625, 626 ]
                    });
                    break;

                  case "4cards-v2":
                    _this.webmdCardModule({
                        element: cardModules[i],
                        pos: [ 723, 724, 725, 726 ]
                    });
                    break;

                  case "4cards-v3":
                    _this.webmdCardModule({
                        element: cardModules[i],
                        pos: [ 823, 824, 825, 826 ]
                    });
                }
            }
        },
        cache: $cache
    };
    return native;
}(), // Caching elements to key off
// Best option without refactoring entire code
$(document).ready(function() {
    var sbrand = window.s_sponsor_brand || "", sprogram = window.s_sponsor_program || "", stug = window.s_tug || "", fundedDelay = 1e3, blockedURL = "/food-recipes/video/truth-coffee";
    // if we are on this video page, return
    // if we are on this video page, return
    return window.location.href.indexOf(blockedURL) > -1 ? void webmd.debug("##### dfpNative: suppressed on this url") : void googletag.cmd.push(function() {
        // instead of using a delay timer to separate the direct sold ad requests from the native ad requests,
        // we use the slotRequested event before we request the native units.
        googletag.pubads().addEventListener("slotRenderEnded", function(event) {
            // verify slots exist
            "undefined" != typeof event.slot && event.slot.getSlotElementId().indexOf("ad-banner") > -1 && (// we need to delay the DFP Native call on funded pages
            // there are no funded events available so, check for funded values
            // if they exist, delay DFP Native replacement with setTimeout 
            // :-(
            "" !== sbrand || "" !== sprogram || "" !== stug ? setTimeout(function() {
                webmd.debug("##### dfpNative: Requesting slots on funded page"), webmd.dfpNative.requestSlots();
            }, fundedDelay) : (webmd.debug("##### dfpNative: Requesting slots on non-funded page"), 
            webmd.dfpNative.requestSlots()));
        });
    });
}));

// Media Omniture Tracking
// Listen for omniture info from ad creatives sent via postmessage
// global array for pvids
var pvidArr = [ window.s_pageview_id ];

// global listeners owe don't add these all over the place
window.addEventListener("message", function(e) {
    var obj, adclass = e.data.classname, message = e.data.message;
    // Post message to remove an ad label from the 923/1923 safeframe
    // the post-message:
    // <script id="remove-ad-label-923-1923">
    // var pageId = '%%PATTERN:pvid%%';
    // var pos = '%%PATTERN:pos%%';
    // var adURl = document.referrer;
    // window.parent.postMessage({
    // 	'pos':pos,
    // 	'pvid': pageId,
    // 	'wbmd': {
    // 		'func': 'removeAdLabel'
    // 	}
    // }, adURl);
    // </script>
    if ("removeShareThroughText" === message && "responsive-sharethrough-wrapper" === adclass && $(".responsive-sharethrough-wrapper").remove(), 
    // listen for omniture data from creatives
    "string" == typeof e.data && e.data.indexOf("omniture") > -1 && (obj = e.data.replace(/'/g, '"'), 
    obj = JSON.parse(obj), webmd.debug("wbmd: creative pvid", obj.pvid), pvidArr.indexOf(obj.pvid) > -1 && obj.omniture && (// adhoc metrics`
    obj.message && "adhoc" === obj.message ? wmdPageLink(obj.omniture, obj.omnitureParams) : (window.s_linktext = obj.linktext, 
    wmdTrack(obj.omniture)))), -1 !== pvidArr.indexOf(e.data.pvid) && e.data.wbmd) {
        window.webmd.debug("origin: ", e.origin);
        try {
            var theAdFunction = e.data.wbmd.func, thePOS = e.data.pos;
            if ("removeAdLabel" === theAdFunction) {
                // get the div via POS with the class as a backup
                var adBorder = document.querySelectorAll('[data-pos="' + thePOS + '"] > div:first-child'), pStyle = window.parent.document.createElement("link");
                // the important is overriding us hence the rule above
                return pStyle.rel = "stylesheet", pStyle.href = "//css.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/ad-border-removal/css/remove-ad-border.css?_=" + new Date().toString().split(" ").slice(0, 4).join(" "), 
                pStyle.id = "remove-ad-border-stylesheet", null === window.parent.document.getElementById("remove-ad-border-stylesheet") && window.parent.document.getElementsByTagName("head")[0].appendChild(pStyle), 
                void (adBorder && (adBorder[0].setAttribute("style", "border: 0px !important"), 
                adBorder[0].classList.add("remove_border"), adBorder[0].classList.add("remove_content_text")));
            }
        } catch (error) {
            window.console.info("Something went wrong.", error, e);
        }
    }
    // post message for survey runner code
    if (e.target.location.origin && e.target.location.origin === window.parent.location.origin && e.data.message && "surveywriter" === e.data.message && e.data.source) {
        var tag = document.createElement("script");
        tag.setAttribute("src", e.data.source), document.body.appendChild(tag);
    }
    /**
	 *	New Listener
	 *	Syntax - targetWindow.postMessage(message, targetOrigin, [transfer]);
	 *
	 *	@param {string} adURl - The origin of the parent window that sent the message at the time postMessage was called;
	 *	@example
	 *		var adURl = window.parent.location.origin;
	 *		window.parent.postMessage('', adURl);
	 *
	 *	@param {object} wbmd - a new object within e.data for WebMD's post-messages
	 *	@example
	 *	window.parent.postMessage({'wbmd': {}}, adURl);
	 *
	 *	@param {string} evt - A Custom WebMD Event fired through a post-message
	 *	@example
	 *	window.parent.postMessage({'wbmd': {'evt': 'webmdCustomEvent'}, adURl);
	 *
	 *	@param {string} func - The Function name you want the listener to call
	 *	@example
	 *		window.parent.postMessage({'wbmd': {'func': 'readPageHeight'}}, adURl);
	 *		The listener would look inside the wbmd object for the global function readPageHeight() or
	 *		would alternatively be written window["readPageHeight"]();
	 *
	 *	@param (string) theIframe - A variable to hold the id of the iframe the ad creative is sitting in;
	 *	@example
	 *		var theIframe = window.frameElement.getAttribute('id');
	 *
	 *	@param {string} origin - The origin iFrame id. Note this value requres a friendly iFrame. A safe frame will return null
	 *	@example
	 *		window.parent.postMessage({'wbmd': {'func': 'readPageHeight', 'origin': theIframe}}, adURl);
	 *		The listener would look inside the 'origin' iframe for the function readPageHeight();
	 *
	 *	@param {boolean} postback - the default value is false, Tell the listener you want to postMessage back to the iframe
	 *	@example
	 *		window.parent.postMessage({'wbmd': {'func': 'readPageHeight', 'postback': true}}, adURl);
	 *		To Come - To do this we need a way to identify the frame we want to target.
	 *
	 *	@param {array} namespace - any additional steps to get tot he function you want to fire
	 *	@example
	 *		window.parent.postMessage({'wbmd': {'func': 'readPageHeight', 'namespace': ['webmd', 'adViewability']}}, adURl);
	 *		The listener would look inside the for the namespaced function webmd.adViewability.readPageHeight();
	 *		the function call would look like this: window['webmd']['adViewability']['readPageHeight']();
	 *
	 *	@param {array} options - Any additional parameters you want to pass to the function
	 *	@example
	 *		window.parent.postMessage({'wbmd': {'func': 'readPageHeight', 'options': ['param1', 'param2']}}, adURl);
	 *		The listener would look for the global function readPageHeight('param1', 'param2');.
	 *		To add the params to the function call we utilize JQuery apply() which requires the params as an array.
	 *		the function call would look like this: window[functionCallVar].apply(arrayOfParams);
	 */
    if (// window.parent.postMessage({'isUnStickyDFPServed': true}}, adURl)
    // check the value of isUnStickyDFPServed and if it is true make to add unstickey
    "object" == typeof e.data && e.data.isUnStickyDFPServed && window.webmd.adViewability.makeTopAdUnSticky(), 
    e.origin === window.parent.location.origin && -1 !== pvidArr.indexOf(e.data.pvid) && "object" == typeof e.data && e.data.wbmd) {
        var theFunction = e.data.wbmd.func || "", theEvent = e.data.wbmd.evt || "", theOptions = e.data.wbmd.options || [], theNamespace = e.data.wbmd.namespace || [], theOrigin = e.data.wbmd.origin || "", postBack = e.data.wbmd.postback || !1, thePath = window;
        try {
            if ("string" == typeof theFunction && Array.isArray(theOptions)) {
                // Call a function in the WebMD Namespace
                if (Array.isArray(theNamespace) && theNamespace.length > 1) {
                    for (var i = 0; i < theNamespace.length; i++) thePath = thePath[theNamespace[i]];
                    return thePath[theFunction].apply(thePath, theOptions);
                }
                if ("string" == typeof theOrigin && theOrigin.length > 1) {
                    var theIframe = 'iframe[id="' + theOrigin + '"]' || "";
                    document.querySelector(theIframe).contentWindow[theFunction].apply(this, theOptions);
                } else if ("boolean" == typeof postBack && postBack === !0) {
                    window.location.origin;
                } else theEvent || window[theFunction].apply(this, theOptions);
            }
        } catch (error) {
            window.console.info("Something went wrong. Please check that your function exists and your variables are of the correct type.", error, e);
        }
    }
}, !1), // We use pvid to ensure the message received by our global listener is from our ad creative.
// Since the pvid changes when DPV is fired, we push the updated pvid into the global pvid array
// to keep parent page and creative pvids in sync.
$(window).on("wbmd:dpv-fired", function(event, data) {
    -1 === pvidArr.indexOf(window.s_pageview_id) && pvidArr.push(window.s_pageview_id), 
    webmd.debug("wbmd:dpv-fired");
}), /*! webmd.oas */
/**
 * @namespace Object for deprecated OAS
 *
 * PPE-191871 & PPE-192934: The OAS script has been removed as part of OAS Migration.
 * This object is added to the global scripts build so code referencing the 
 * webmd.oas or webmd.oas.init() do not return a "...is not a function" error
 * 
 */
webmd.oas = {
    init: function() {
        webmd.debug("##### webmd.oas is deprecated. Please remove all calls to this file.");
    }
};