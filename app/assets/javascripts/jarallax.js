/*!
 * Name    : Just Another Parallax [Jarallax]
 * Version : 1.7.3
 * Author  : _nK https://nkdev.info
 * GitHub  : https://github.com/nk-o/jarallax
 */

! function(e) {
    "use strict";

    function t() {
        i = e.innerWidth || document.documentElement.clientWidth, a = e.innerHeight || document.documentElement.clientHeight
    }

    function n(e, t, n) {
        e.addEventListener ? e.addEventListener(t, n) : e.attachEvent("on" + t, function() {
            n.call(e)
        })
    }

    function o(n) {
        e.requestAnimationFrame(function() {
            "scroll" !== n.type && t();
            for (var e = 0, o = g.length; e < o; e++) "scroll" !== n.type && (g[e].coverImage(), g[e].clipContainer()), g[e].onScroll()
        })
    }
    Date.now || (Date.now = function() {
        return (new Date).getTime()
    }), e.requestAnimationFrame || ! function() {
        for (var t = ["webkit", "moz"], n = 0; n < t.length && !e.requestAnimationFrame; ++n) {
            var o = t[n];
            e.requestAnimationFrame = e[o + "RequestAnimationFrame"], e.cancelAnimationFrame = e[o + "CancelAnimationFrame"] || e[o + "CancelRequestAnimationFrame"]
        }
        if (/iP(ad|hone|od).*OS 6/.test(e.navigator.userAgent) || !e.requestAnimationFrame || !e.cancelAnimationFrame) {
            var i = 0;
            e.requestAnimationFrame = function(e) {
                var t = Date.now(),
                    n = Math.max(i + 16, t);
                return setTimeout(function() {
                    e(i = n)
                }, n - t)
            }, e.cancelAnimationFrame = clearTimeout
        }
    }();
    var i, a, r = function() {
            if (!e.getComputedStyle) return !1;
            var t, n = document.createElement("p"),
                o = {
                    webkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
            (document.body || document.documentElement).insertBefore(n, null);
            for (var i in o) "undefined" != typeof n.style[i] && (n.style[i] = "translate3d(1px,1px,1px)", t = e.getComputedStyle(n).getPropertyValue(o[i]));
            return (document.body || document.documentElement).removeChild(n), "undefined" != typeof t && t.length > 0 && "none" !== t
        }(),
        l = navigator.userAgent.toLowerCase().indexOf("android") > -1,
        s = /iPad|iPhone|iPod/.test(navigator.userAgent) && !e.MSStream,
        c = !!e.opera,
        m = /Edge\/\d+/.test(navigator.userAgent),
        p = /Trident.*rv[ :]*11\./.test(navigator.userAgent),
        u = !!Function("/*@cc_on return document.documentMode===10@*/")(),
        d = document.all && !e.atob;
    t();
    var g = [],
        f = function() {
            function e(e, n) {
                var o, i = this;
                if (i.$item = e, i.defaults = {
                        type: "scroll",
                        speed: .5,
                        imgSrc: null,
                        imgWidth: null,
                        imgHeight: null,
                        enableTransform: !0,
                        elementInViewport: null,
                        zIndex: -100,
                        noAndroid: !1,
                        noIos: !0,
                        onScroll: null,
                        onInit: null,
                        onDestroy: null,
                        onCoverImage: null
                    }, o = JSON.parse(i.$item.getAttribute("data-jarallax") || "{}"), i.options = i.extend({}, i.defaults, o, n), !(l && i.options.noAndroid || s && i.options.noIos)) {
                    i.options.speed = Math.min(2, Math.max(-1, parseFloat(i.options.speed)));
                    var a = i.options.elementInViewport;
                    a && "object" == typeof a && "undefined" != typeof a.length && (a = a[0]), !a instanceof Element && (a = null), i.options.elementInViewport = a, i.instanceID = t++, i.image = {
                        src: i.options.imgSrc || null,
                        $container: null,
                        $item: null,
                        width: i.options.imgWidth || null,
                        height: i.options.imgHeight || null,
                        useImgTag: s || l || c || p || u || m
                    }, i.initImg() && i.init()
                }
            }
            var t = 0;
            return e
        }();
    f.prototype.css = function(t, n) {
        if ("string" == typeof n) return e.getComputedStyle ? e.getComputedStyle(t).getPropertyValue(n) : t.style[n];
        n.transform && (n.WebkitTransform = n.MozTransform = n.transform);
        for (var o in n) t.style[o] = n[o];
        return t
    }, f.prototype.extend = function(e) {
        e = e || {};
        for (var t = 1; t < arguments.length; t++)
            if (arguments[t])
                for (var n in arguments[t]) arguments[t].hasOwnProperty(n) && (e[n] = arguments[t][n]);
        return e
    }, f.prototype.initImg = function() {
        var e = this;
        return null === e.image.src && (e.image.src = e.css(e.$item, "background-image").replace(/^url\(['"]?/g, "").replace(/['"]?\)$/g, "")), !(!e.image.src || "none" === e.image.src)
    }, f.prototype.init = function() {
        function e() {
            t.coverImage(), t.clipContainer(), t.onScroll(!0), t.options.onInit && t.options.onInit.call(t), setTimeout(function() {
                t.$item && t.css(t.$item, {
                    "background-image": "none",
                    "background-attachment": "scroll",
                    "background-size": "auto"
                })
            }, 0)
        }
        var t = this,
            n = {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                pointerEvents: "none"
            },
            o = {
                position: "fixed"
            };
        t.$item.setAttribute("data-jarallax-original-styles", t.$item.getAttribute("style")), "static" === t.css(t.$item, "position") && t.css(t.$item, {
            position: "relative"
        }), "auto" === t.css(t.$item, "z-index") && t.css(t.$item, {
            zIndex: 0
        }), t.image.$container = document.createElement("div"), t.css(t.image.$container, n), t.css(t.image.$container, {
            visibility: "hidden",
            "z-index": t.options.zIndex
        }), t.image.$container.setAttribute("id", "jarallax-container-" + t.instanceID), t.$item.appendChild(t.image.$container), t.image.useImgTag && r && t.options.enableTransform ? (t.image.$item = document.createElement("img"), t.image.$item.setAttribute("src", t.image.src), o = t.extend({
            "max-width": "none"
        }, n, o)) : (t.image.$item = document.createElement("div"), o = t.extend({
            "background-position": "50% 50%",
            "background-size": "100% auto",
            "background-repeat": "no-repeat no-repeat",
            "background-image": 'url("' + t.image.src + '")'
        }, n, o)), d && (o.backgroundAttachment = "fixed"), t.parentWithTransform = 0;
        for (var i = t.$item; null !== i && i !== document && 0 === t.parentWithTransform;) {
            var a = t.css(i, "-webkit-transform") || t.css(i, "-moz-transform") || t.css(i, "transform");
            a && "none" !== a && (t.parentWithTransform = 1, t.css(t.image.$container, {
                transform: "translateX(0) translateY(0)"
            })), i = i.parentNode
        }
        t.css(t.image.$item, o), t.image.$container.appendChild(t.image.$item), t.image.width && t.image.height ? e() : t.getImageSize(t.image.src, function(n, o) {
            t.image.width = n, t.image.height = o, e()
        }), g.push(t)
    }, f.prototype.destroy = function() {
        for (var e = this, t = 0, n = g.length; t < n; t++)
            if (g[t].instanceID === e.instanceID) {
                g.splice(t, 1);
                break
            }
        var o = e.$item.getAttribute("data-jarallax-original-styles");
        e.$item.removeAttribute("data-jarallax-original-styles"), "null" === o ? e.$item.removeAttribute("style") : e.$item.setAttribute("style", o), e.$clipStyles && e.$clipStyles.parentNode.removeChild(e.$clipStyles), e.image.$container.parentNode.removeChild(e.image.$container), e.options.onDestroy && e.options.onDestroy.call(e), delete e.$item.jarallax;
        for (var i in e) delete e[i]
    }, f.prototype.getImageSize = function(e, t) {
        if (e && t) {
            var n = new Image;
            n.onload = function() {
                t(n.width, n.height)
            }, n.src = e
        }
    }, f.prototype.clipContainer = function() {
        if (!d) {
            var e = this,
                t = e.image.$container.getBoundingClientRect(),
                n = t.width,
                o = t.height;
            if (!e.$clipStyles) {
                e.$clipStyles = document.createElement("style"), e.$clipStyles.setAttribute("type", "text/css"), e.$clipStyles.setAttribute("id", "#jarallax-clip-" + e.instanceID);
                var i = document.head || document.getElementsByTagName("head")[0];
                i.appendChild(e.$clipStyles)
            }
            var a = ["#jarallax-container-" + e.instanceID + " {", "   clip: rect(0 " + n + "px " + o + "px 0);", "   clip: rect(0, " + n + "px, " + o + "px, 0);", "}"].join("\n");
            e.$clipStyles.styleSheet ? e.$clipStyles.styleSheet.cssText = a : e.$clipStyles.innerHTML = a
        }
    }, f.prototype.coverImage = function() {
        var e = this;
        if (e.image.width && e.image.height) {
            var t = e.image.$container.getBoundingClientRect(),
                n = t.width,
                o = t.height,
                i = t.left,
                l = e.image.width,
                s = e.image.height,
                c = e.options.speed,
                m = "scroll" === e.options.type || "scroll-opacity" === e.options.type,
                p = 0,
                u = 0,
                d = o,
                g = 0,
                f = 0;
            m && (p = c < 0 ? c * Math.max(o, a) : c * (o + a), c > 1 ? d = Math.abs(p - a) : c < 0 ? d = p / c + Math.abs(p) : d += Math.abs(a - o) * (1 - c), p /= 2), u = d * l / s, u < n && (u = n, d = u * s / l), e.bgPosVerticalCenter = 0, !(m && d < a) || r && e.options.enableTransform || (e.bgPosVerticalCenter = (a - d) / 2, d = a), m ? (g = i + (n - u) / 2, f = (a - d) / 2) : (g = (n - u) / 2, f = (o - d) / 2), r && e.options.enableTransform && e.parentWithTransform && (g -= i), e.parallaxScrollDistance = p, e.css(e.image.$item, {
                width: u + "px",
                height: d + "px",
                marginLeft: g + "px",
                marginTop: f + "px"
            }), e.options.onCoverImage && e.options.onCoverImage.call(e)
        }
    }, f.prototype.isVisible = function() {
        return this.isElementInViewport || !1
    }, f.prototype.onScroll = function(e) {
        var t = this;
        if (t.image.width && t.image.height) {
            var n = t.$item.getBoundingClientRect(),
                o = n.top,
                l = n.height,
                s = {
                    position: "absolute",
                    visibility: "visible",
                    backgroundPosition: "50% 50%"
                },
                c = n;
            if (t.options.elementInViewport && (c = t.options.elementInViewport.getBoundingClientRect()), t.isElementInViewport = c.bottom >= 0 && c.right >= 0 && c.top <= a && c.left <= i, e || t.isElementInViewport) {
                var m = Math.max(0, o),
                    p = Math.max(0, l + o),
                    u = Math.max(0, -o),
                    g = Math.max(0, o + l - a),
                    f = Math.max(0, l - (o + l - a)),
                    h = Math.max(0, -o + a - l),
                    y = 1 - 2 * (a - o) / (a + l),
                    v = 1;
                if (l < a ? v = 1 - (u || g) / l : p <= a ? v = p / a : f <= a && (v = f / a), "opacity" !== t.options.type && "scale-opacity" !== t.options.type && "scroll-opacity" !== t.options.type || (s.transform = "translate3d(0, 0, 0)", s.opacity = v), "scale" === t.options.type || "scale-opacity" === t.options.type) {
                    var x = 1;
                    t.options.speed < 0 ? x -= t.options.speed * v : x += t.options.speed * (1 - v), s.transform = "scale(" + x + ") translate3d(0, 0, 0)"
                }
                if ("scroll" === t.options.type || "scroll-opacity" === t.options.type) {
                    var b = t.parallaxScrollDistance * y;
                    r && t.options.enableTransform ? (t.parentWithTransform && (b -= o), s.transform = "translate3d(0, " + b + "px, 0)") : t.image.useImgTag ? s.top = b + "px" : (t.bgPosVerticalCenter && (b += t.bgPosVerticalCenter), s.backgroundPosition = "50% " + b + "px"), s.position = d ? "absolute" : "fixed"
                }
                t.css(t.image.$item, s), t.options.onScroll && t.options.onScroll.call(t, {
                    section: n,
                    beforeTop: m,
                    beforeTopEnd: p,
                    afterTop: u,
                    beforeBottom: g,
                    beforeBottomEnd: f,
                    afterBottom: h,
                    visiblePercent: v,
                    fromViewportCenter: y
                })
            }
        }
    }, n(e, "scroll", o), n(e, "resize", o), n(e, "orientationchange", o), n(e, "load", o);
    var h = function(e) {
        ("object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName) && (e = [e]);
        var t, n = arguments[1],
            o = Array.prototype.slice.call(arguments, 2),
            i = e.length,
            a = 0;
        for (a; a < i; a++)
            if ("object" == typeof n || "undefined" == typeof n ? e[a].jarallax || (e[a].jarallax = new f(e[a], n)) : e[a].jarallax && (t = e[a].jarallax[n].apply(e[a].jarallax, o)), "undefined" != typeof t) return t;
        return e
    };
    h.constructor = f;
    var y = e.jarallax;
    if (e.jarallax = h, e.jarallax.noConflict = function() {
            return e.jarallax = y, this
        }, "undefined" != typeof jQuery) {
        var v = function() {
            var t = arguments || [];
            Array.prototype.unshift.call(t, this);
            var n = h.apply(e, t);
            return "object" != typeof n ? n : this
        };
        v.constructor = f;
        var x = jQuery.fn.jarallax;
        jQuery.fn.jarallax = v, jQuery.fn.jarallax.noConflict = function() {
            return jQuery.fn.jarallax = x, this
        }
    }
    n(e, "DOMContentLoaded", function() {
        h(document.querySelectorAll("[data-jarallax], [data-jarallax-video]"))
    })
}(window);
