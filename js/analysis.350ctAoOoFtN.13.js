function sha1(e) {
	function t(e) {
		return unescape(encodeURIComponent(e))
	}
	var n, o, r, i, a, c, u, l, s, f, d = function(e, t) {
			return e << t | e >>> 32 - t
		},
		g = function(e) {
			var t, n, o = "";
			for(t = 7; t >= 0; t--) n = e >>> 4 * t & 15, o += n.toString(16);
			return o
		},
		m = [],
		p = 1732584193,
		h = 4023233417,
		v = 2562383102,
		E = 271733878,
		y = 3285377520,
		T = [];
	for(e = t(e), f = e.length, o = 0; o < f - 3; o += 4) r = e.charCodeAt(o) << 24 | e.charCodeAt(o + 1) << 16 | e.charCodeAt(o + 2) << 8 | e.charCodeAt(o + 3), T.push(r);
	switch(3 & f) {
		case 0:
			o = 2147483648;
			break;
		case 1:
			o = e.charCodeAt(f - 1) << 24 | 8388608;
			break;
		case 2:
			o = e.charCodeAt(f - 2) << 24 | e.charCodeAt(f - 1) << 16 | 32768;
			break;
		case 3:
			o = e.charCodeAt(f - 3) << 24 | e.charCodeAt(f - 2) << 16 | e.charCodeAt(f - 1) << 8 | 128
	}
	for(T.push(o); 14 !== (15 & T.length);) T.push(0);
	for(T.push(f >>> 29), T.push(f << 3 & 4294967295), n = 0; n < T.length; n += 16) {
		for(o = 0; o < 16; o++) m[o] = T[n + o];
		for(o = 16; o <= 79; o++) m[o] = d(m[o - 3] ^ m[o - 8] ^ m[o - 14] ^ m[o - 16], 1);
		for(i = p, a = h, c = v, u = E, l = y, o = 0; o <= 19; o++) s = d(i, 5) + (a & c | ~a & u) + l + m[o] + 1518500249 & 4294967295, l = u, u = c, c = d(a, 30), a = i, i = s;
		for(o = 20; o <= 39; o++) s = d(i, 5) + (a ^ c ^ u) + l + m[o] + 1859775393 & 4294967295, l = u, u = c, c = d(a, 30), a = i, i = s;
		for(o = 40; o <= 59; o++) s = d(i, 5) + (a & c | a & u | c & u) + l + m[o] + 2400959708 & 4294967295, l = u, u = c, c = d(a, 30), a = i, i = s;
		for(o = 60; o <= 79; o++) s = d(i, 5) + (a ^ c ^ u) + l + m[o] + 3395469782 & 4294967295, l = u, u = c, c = d(a, 30), a = i, i = s;
		p = p + i & 4294967295, h = h + a & 4294967295, v = v + c & 4294967295, E = E + u & 4294967295, y = y + l & 4294967295
	}
	return s = g(p) + g(h) + g(v) + g(E) + g(y), s.toLowerCase()
}
"object" != typeof JSON && (window.JSON = {}),
	function() {
		"use strict";

		function f(e) {
			return e < 10 ? "0" + e : e
		}

		function quote(e) {
			return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
				var t = meta[e];
				return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
			}) + '"' : '"' + e + '"'
		}

		function str(e, t) {
			var n, o, r, i, a, c = gap,
				u = t[e];
			switch(u && "object" == typeof u && "function" == typeof u.toJSON && (u = u.toJSON(e)), "function" == typeof rep && (u = rep.call(t, e, u)), typeof u) {
				case "string":
					return quote(u);
				case "number":
					return isFinite(u) ? String(u) : "null";
				case "boolean":
				case "null":
					return String(u);
				case "object":
					if(!u) return "null";
					if(gap += indent, a = [], "[object Array]" === Object.prototype.toString.apply(u)) {
						for(i = u.length, n = 0; n < i; n += 1) a[n] = str(n, u) || "null";
						return r = 0 === a.length ? "[]" : gap ? "[\n" + gap + a.join(",\n" + gap) + "\n" + c + "]" : "[" + a.join(",") + "]", gap = c, r
					}
					if(rep && "object" == typeof rep)
						for(i = rep.length, n = 0; n < i; n += 1) "string" == typeof rep[n] && (o = rep[n], r = str(o, u), r && a.push(quote(o) + (gap ? ": " : ":") + r));
					else
						for(o in u) Object.prototype.hasOwnProperty.call(u, o) && (r = str(o, u), r && a.push(quote(o) + (gap ? ": " : ":") + r));
					return r = 0 === a.length ? "{}" : gap ? "{\n" + gap + a.join(",\n" + gap) + "\n" + c + "}" : "{" + a.join(",") + "}", gap = c, r
			}
		}
		"function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
		}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
			return this.valueOf()
		});
		var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			gap, indent, meta = {
				"\b": "\\b",
				"\t": "\\t",
				"\n": "\\n",
				"\f": "\\f",
				"\r": "\\r",
				'"': '\\"',
				"\\": "\\\\"
			},
			rep;
		"function" != typeof JSON.stringify && (JSON.stringify = function(e, t, n) {
			var o;
			if(gap = "", indent = "", "number" == typeof n)
				for(o = 0; o < n; o += 1) indent += " ";
			else "string" == typeof n && (indent = n);
			if(rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
			return str("", {
				"": e
			})
		}), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
			function walk(e, t) {
				var n, o, r = e[t];
				if(r && "object" == typeof r)
					for(n in r) Object.prototype.hasOwnProperty.call(r, n) && (o = walk(r, n), void 0 !== o ? r[n] = o : delete r[n]);
				return reviver.call(e, t, r)
			}
			var j;
			if(text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
					return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
				})), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
				"": j
			}, "") : j;
			throw new SyntaxError("JSON.parse")
		})
	}();
var NTESAnalysis = {
	util: {
		extend: function(e, t) {
			for(var n in t) e[n] = t[n];
			return e
		}
	},
	plugin: {},
	addEvent: function(e, t, n, o) {
		e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener && e.addEventListener(t, n, !1)
	},
	removeEvent: function(e, t, n) {
		e.detachEvent ? e.detachEvent("on" + t, n) : e.removeEventListener && e.removeEventListener(t, n, !1)
	},
	cookie: {
		get: function(e, t) {
			var n, e = encodeURIComponent(e) + "=",
				o = document.cookie,
				r = o.indexOf(e);
			return -1 === r ? t || "" : (r += e.length, n = o.indexOf(";", r), n === -1 && (n = o.length), decodeURIComponent(o.substring(r, n)))
		},
		set: function(e, t, n, o, r, i) {
			var a = [encodeURIComponent(e) + "=" + encodeURIComponent(t)];
			if(n) {
				var c;
				n.toString && "[object Date]" === n.toString() ? c = n : isNaN(n) || (c = new Date, c.setTime(c.getTime() + 60 * n * 1e3)), c && a.push("expires=" + c.toUTCString())
			}
			r && a.push("path=" + r), o && a.push("domain=" + o), i && a.push("secure"), document.cookie = a.join(";")
		}
	}
};
! function(e) {
	function t() {
		if(!a) {
			try {
				document.documentElement.doScroll("left")
			} catch(e) {
				return void setTimeout(t, 1)
			}
			n()
		}
	}

	function n() {
		if(!a) {
			if(!document.body) return setTimeout(n, 13);
			if(a = !0, c) {
				for(var e = -1, t = c.length; ++e < t;) c[e].call(document);
				c = null
			}
		}
	}

	function o() {
		if(!r) {
			if("complete" === document.readyState) return n();
			if(document.addEventListener) document.addEventListener("DOMContentLoaded", n, !1), window.addEventListener("load", n, !1);
			else if(document.attachEvent) {
				document.attachEvent("onreadystatechange", n), window.attachEvent("onload", n);
				var e;
				try {
					e = null == window.frameElement
				} catch(o) {}
				document.documentElement.doScroll && e && t()
			}
			r = !0
		}
	}
	var r, i, a, c = [];
	document.addEventListener ? i = function() {
		document.removeEventListener("DOMContentLoaded", i, !1), n()
	} : document.attachEvent && (i = function() {
		"complete" === document.readyState && (document.detachEvent("onreadystatechange", i), n())
	}), e.ready = function(e) {
		return o(), a ? e.call(document) : c.push(e), this
	}
}(NTESAnalysis), NTESAnalysis.namespace = function() {
		var e, t, n, o, r = arguments,
			i = null;
		for(e = 0, o = r.length; e < o; e++)
			for(n = ("" + r[e]).split("."), i = window.NTESAnalysis, t = "NTESAnalysis" == n[0] ? 1 : 0; t < n.length; t += 1) i[n[t]] = i[n[t]] || {}, i = i[n[t]];
		return i
	},
	function(e) {
		e.namespace("NTESAnalysis.plugin"), e.namespace("NTESAnalysis.util");
		var t = e.util,
			n = t.extend,
			o = e.plugin,
			r = function(e, t) {
				return o[e] = t, t
			},
			i = function(e) {
				return o[e]
			};
		n(e, {
			addPlugin: r,
			getPlugin: i
		})
	}(NTESAnalysis),
	function(e) {
		e.namespace("NTESAnalysis.util.event");
		var t = e.util,
			n = t.extend,
			o = [].slice,
			r = ([].indexOf || function(e) {
				for(var t = 0, n = this.length; t < n; t++)
					if(t in this && this[t] === e) return t;
				return -1
			}, {}.hasOwnProperty, {
				bind: function(e, t) {
					var n, o, r, i, a;
					for(o = e.split(" "), n = this.hasOwnProperty("_callbacks") && this._callbacks || (this._callbacks = {}), i = 0, a = o.length; i < a; i++) r = o[i], n[r] || (n[r] = []), n[r].push(t);
					return this
				},
				one: function(e, t) {
					return this.bind(e, function() {
						return this.unbind(e, arguments.callee), t.apply(this, arguments)
					})
				},
				trigger: function() {
					var e, t, n, r, i, a, c;
					if(e = 1 <= arguments.length ? o.call(arguments, 0) : [], n = e.shift(), r = this.hasOwnProperty("_callbacks") && (null != (c = this._callbacks) ? c[n] : void 0)) {
						for(i = 0, a = r.length; i < a && (t = r[i], t.apply(this, e) !== !1); i++);
						return !0
					}
				},
				unbind: function(e, t) {
					var n, o, r, i, a, c;
					if(!e) return this._callbacks = {}, this;
					if(r = null != (c = this._callbacks) ? c[e] : void 0, !r) return this;
					if(!t) return delete this._callbacks[e], this;
					for(o = i = 0, a = r.length; i < a; o = ++i)
						if(n = r[o], n === t) {
							r = r.slice(), r.splice(o, 1), this._callbacks[e] = r;
							break
						}
					return this
				}
			}),
			i = function(t, n, o, r) {
				t.addEvent(o, function(o) {
					for(var i = o.target || o.srcElement; i && !e(i).hasClass(n) && i != t;) i = i.parentNode;
					if(i && e(i).hasClass(n)) return r.call(i, o, t)
				})
			},
			a = function(e) {
				return e = e == window ? {
					0: e
				} : e, n(e, r)
			};
		n(t.event, {
			customEvent: a,
			delegate: i
		})
	}(NTESAnalysis),
	function(e) {
		e.namespace("NTESAnalysis.util.log");
		var t = e.util,
			n = t.extend,
			o = [].slice,
			r = {
				trace: !0,
				logPrefix: ":::NTESAnalysis:::",
				log: function() {
					var e;
					if(e = 1 <= arguments.length ? o.call(arguments, 0) : [], this.trace) return this.logPrefix && e.unshift(this.logPrefix), "undefined" != typeof console && null !== console && "function" == typeof console.log && console.log.apply(console, e), this
				}
			};
		n(t.log, {
			log: r
		})
	}(NTESAnalysis),
	function(e) {
		e.namespace("NTESAnalysis.util.dimension");
		var t = e.util,
			n = t.extend,
			o = function(e) {
				var t = navigator.userAgent.toLowerCase(),
					n = t.indexOf("opera") != -1,
					o = (t.indexOf("msie") != -1 && !n, "string" == typeof e ? document.getElementById(e) : e);
				if(null === o.parentNode || "none" == o.style.display) return !1;
				var r, i = null,
					a = [];
				if(o.getBoundingClientRect) {
					r = o.getBoundingClientRect();
					var c = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
						u = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
					return {
						x: r.left + u,
						y: r.top + c
					}
				}
				if(document.getBoxObjectFor) {
					r = document.getBoxObjectFor(o);
					var l = o.style.borderLeftWidth ? parseInt(o.style.borderLeftWidth) : 0,
						s = o.style.borderTopWidth ? parseInt(o.style.borderTopWidth) : 0;
					a = [r.x - l, r.y - s]
				} else {
					if(a = [o.offsetLeft, o.offsetTop], i = o.offsetParent, i != o)
						for(; i;) a[0] += i.offsetLeft, a[1] += i.offsetTop, i = i.offsetParent;
					(t.indexOf("opera") != -1 || t.indexOf("safari") != -1 && "absolute" == o.style.position) && (a[0] -= document.body.offsetLeft, a[1] -= document.body.offsetTop)
				}
				for(i = o.parentNode ? o.parentNode : null; i && "BODY" != i.tagName && "HTML" != i.tagName;) a[0] -= i.scrollLeft, a[1] -= i.scrollTop, i = i.parentNode ? i.parentNode : null;
				return {
					x: a[0],
					y: a[1]
				}
			},
			r = function() {
				return document.body.scrollTop || document.documentElement.scrollTop
			},
			i = function() {
				return document.body.scrollLeft || document.documentElement.scrollLeft
			};
		n(t.dimension, {
			getElementPosition: o,
			getPageScrollTop: r,
			getPageScrollLeft: i
		})
	}(NTESAnalysis),
	function(e) {
		e.namespace("NTESAnalysis.util.size");
		var t = e.util,
			n = t.extend,
			o = function(e) {
				return e.clientHeight || e.offsetHeight || 0
			},
			r = function(e) {
				return e.clientWidth || e.offsetWidth || 0
			},
			i = function() {
				return window.innerWidth ? window.innerWidth : document.getElementsByTagName("html")[0].offsetWidth
			},
			a = function() {
				return window.innerHeight ? window.innerHeight : document.getElementsByTagName("html")[0].offsetHeight
			},
			c = function() {
				return Math.max(i(), document.getElementsByTagName("body")[0].scrollWidth)
			},
			u = function() {
				return Math.max(a(), document.getElementsByTagName("body")[0].scrollHeight)
			};
		n(t.size, {
			getElementWidth: r,
			getElementHeight: o,
			getViewHeight: a,
			getViewWidth: i,
			getPageHeight: u,
			getPageWidth: c
		})
	}(NTESAnalysis),
	function(e) {
		e.namespace("NTESAnalysis.util.event.scroll");
		var t = e.util,
			n = t.extend,
			o = t.event,
			r = function(t, n, r) {
				var i = null,
					a = null,
					c = function(e) {
						return r ? void(i = setTimeout(function() {
							e()
						}, r)) : void e()
					},
					u = function() {
						i && (clearTimeout(i), i = null)
					};
				return a = o.customEvent(t), r = r || 0, e.addEvent(t, "scroll", function(e) {
					u(), c(function() {
						a.trigger(n, e)
					})
				}), a
			};
		n(t.event.scroll, {
			create: r
		})
	}(NTESAnalysis),
	function(e, t, n) {
		if(!t.NTESLogger) {
			var o = e.util,
				r = e.cookie,
				i = o.extend,
				a = "",
				c = t,
				u = document,
				l = u.body,
				s = u.documentElement,
				f = (t.NTES_logger_start_time || new Date).getTime(),
				d = t.sha1,
				g = t.JSON || t.JSON2,
				m = Array.prototype.slice,
				p = t.navigator.userAgent || "",
				h = t.navigator.platform || "",
				v = (t.location.href || "", 0),
				E = 0,
				y = !0,
				T = "",
				w = "",
				b = "",
				S = "",
				N = "",
				L = null,
				C = null,
				k = "undefined",
				x = "_n_f_l_n3",
				_ = "js_logger_image_",
				A = "vinfo",
				O = ".",
				D = "0",
				j = "1",
				P = "s",
				I = {
					loggerPath: "",
					visitInfoEnable: !0,
					deviceInfoEnable: !0,
					userinfoEnable: !0,
					pathInfoEnable: !0,
					cookieEnable: !0,
					onunloadClearQueueEnable: !1,
					errorEnable: !0,
					cookiePath: "",
					cookieDomain: "",
					cookieSecure: !1,
					resendCountOnFail: 5,
					visitCookieTimeout: 525600,
					sessionCookieTimeout: 30,
					heartbeatTimeout: 5e3,
					onunloadClearQueueTimeout: 1e3
				},
				J = {
					project: "",
					event: "",
					esource: "",
					etype: "",
					einfo: "",
					cost: "",
					uuid: "",
					uname: "",
					uemail: "",
					unew: "",
					uctime: "",
					utime: "",
					ultime: "",
					uvcount: "",
					resolution: "",
					avlbsize: "",
					pagesize: "",
					pagescroll: "",
					exy: "",
					ua: "",
					url: "",
					ref: "",
					cvar: "",
					cdata: "",
					r: ""
				},
				W = function() {},
				H = W,
				U = function() {
					G(), t.NTESLogger = t.NTESLogger || pe
				},
				M = function(e) {
					return !(!e || typeof e == k)
				},
				F = function() {
					return(new Date).getTime()
				},
				B = function() {
					return m.call(arguments).join("/")
				},
				R = function(e) {
					return e + x
				},
				z = function(e) {
					return e = e || new Date, e.getTime()
				},
				V = function() {
					if(!y)
						for(var e = I.onunloadClearQueueTimeout, t = F() + e; F() >= t;);
				},
				Y = function() {
					return r.get(R(P))
				},
				X = function(e) {
					clearTimeout(X.timer), X.timer = setTimeout(function() {
						r.set(R(P), 0, -1, I.cookieDomain, I.cookiePath)
					}, 60 * I.sessionCookieTimeout * 1e3), r.set(R(P), e, null, I.cookieDomain, I.cookiePath, I.cookieSecure)
				},
				q = function() {
					var e = R(A),
						t = r.get(e),
						n = null;
					if(t && "undefined" != t) n = t.split(O), n.splice(1, j, 1);
					else {
						var o = z();
						b = d([p, h, o].join("")).slice(0, 16), n = [b, D, 0, o, 0, o]
					}
					return n
				},
				Q = function(e) {
					r.set(R(A), e, I.visitCookieTimeout, I.cookieDomain, I.cookiePath, I.cookieSecure)
				},
				$ = function() {
					var e = q(),
						t = Y();
					t && "undefined" != t || e[1] != D && (e[2]++, e[4] = e[5]), e[5] = z(), Q(e.join(O));
					var n = t || e[0] + "" + (new Date).getTime();
					return X(n), {
						uuid: e[0],
						unew: e[1],
						uvcount: e[2],
						uctime: e[3],
						ultime: e[4],
						utime: e[5],
						sid: n
					}
				},
				Z = function() {
					var e = "";
					try {
						e = t.top.document.referrer
					} catch(n) {
						if(t.parent) try {
							e = t.parent.document.referrer
						} catch(o) {
							e = ""
						}
					}
					return "" === e && (e = u.referrer), e
				},
				G = function(e, n) {
					T = e ? e : t.location.href, n ? w = n : !w && (w = Z())
				},
				K = function() {
					return G(), {
						url: encodeURIComponent(T),
						ref: encodeURIComponent(w)
					}
				},
				ee = function(e, t) {
					S = e, N = t
				},
				te = function() {
					try {
						N = N || r.get("P_INFO").split("|")[0]
					} catch(e) {}
					return {
						uname: S,
						uemail: N
					}
				},
				ne = function(e) {
					L = e
				},
				oe = function() {
					return L ? {
						cdata: g.stringify(L)
					} : {}
				},
				re = function(e) {
					C = e
				},
				ie = function() {
					return C ? {
						cvar: g.stringify(C)
					} : {}
				},
				ae = function() {
					++E >= v && (y = !0)
				},
				ce = function(e, n, o) {
					var r = null,
						i = "";
					y = !1, o = o || 0, i = [_, String(++v)].join(""), t[i] = r = new Image, r.onload = function() {
						r.onload = null, t[i] = r = null, ae(), n && n()
					}, r.onerror = r.onabort = function() {
						r.onerror = r.onabort = null, t[i] = r = null, ae(), n && o++ < I.resendCountOnFail && setTimeout(function() {
							ce(e, n, o)
						}, 20)
					}, r.src = e
				},
				ue = function(e) {
					l || (l = u.body);
					var o, c = [],
						f = [];
					e = i(i({}, J), e || {}), t.NTESLogger.pgr = t.NTESLogger.pgr || q()[0] + "" + z() + Math.floor(1e4 * Math.random()), t.NTESLogger._pgrInitDone || (t.NTESLogger.prevPgr = r.get(R("pgr")), r.set(R("pgr"), 0, -1, I.cookieDomain, I.cookiePath), t.NTESLogger._pgrInitDone = !0), ue.entryDone || /163.com/.test(Z()) || (this.entry = 1, ue.entryDone = !0), i(e, {
						utime: (new Date).getTime(),
						r: Math.random() + "_0602",
						pgr: t.NTESLogger.pgr,
						prev_pgr: t.NTESLogger.prevPgr,
						entry: this.entry || ""
					});
					var d = t.innerWidth,
						g = t.innerHeight;
					isNaN(d) && ("number" == document.compatMode ? (d = document.documentElement.clientWidth, g = document.documentElement.clientHeight) : (d = document.body.clientWidth, g = document.body.clientHeight)), i(e, {
						resolution: B(screen.width, screen.height),
						avlbsize: B(document.documentElement.clientWidth, document.documentElement.clientHeight),
						pagesize: B(l.scrollWidth, l.scrollHeight),
						pagescroll: B(l.scrollLeft || s.scrollLeft, l.scrollTop || s.scrollTop)
					}), I.visitInfoEnable && I.cookieEnable && i(e, $()), I.pathInfoEnable && i(e, K()), I.userinfoEnable && i(e, te()), I.customDataEnable && (i(e, oe()), i(e, ie())), i(e, me());
					for(o in e) "" !== e[o] && e[o] !== n && c.push([o, e[o]].join("="));
					f.push(a, "?", c.join("&")), ce(f.join(""))
				},
				le = function(e) {
					if(!M(e) && I.errorEnable) throw "reportState with unkown data!";
					e.event = "statereport", ue(e)
				},
				se = function() {
					return I
				},
				fe = function(e, t) {
					if(!M(e)) throw "unkown project id!";
					J.project = e, M(t) && i(I, t), a = I.loggerPath, c.detachEvent ? c.detachEvent("onbeforeunload", V) : c.removeEventListener && c.removeEventListener("beforeunload", V, !1), I.onunloadClearQueueEnable && (c.attachEvent ? c.attachEvent("onbeforeunload", V) : c.addEventListener && c.addEventListener("beforeunload", V, !1)), I.pathInfoEnable && G(), H = ue
				},
				de = function() {
					return f
				},
				ge = function(e) {
					var t = null;
					return e = e || 100,
						function() {
							var n = (new Date).getTime(),
								o = !1;
							return t && n - t < e && (o = !0), t = n, o
						}
				},
				me = function() {
					var e = location.host.toLowerCase();
					if("163.com" == e || "www.163.com" == e || "netease.com" == e || "www.netease.com" == e) {
						if(me.cache) return me.cache;
						var t = r.get(R("pver"));
						if(!t) {
							var n = ["b"],
								o = "a",
								i = Math.floor(1e3 * Math.random()),
								a = i < n.length ? n[i] : o,
								c = 10080;
							r.set(R("pver"), a, c, I.cookieDomain, I.cookiePath)
						}
						var u = document.getElementById("ne_ptype");
						return me.cache = {
							ptype: u ? u.value : "",
							pver: t || ""
						}, me.cache
					}
				},
				pe = {
					log: function(e) {
						return H(e), pe
					},
					reportState: function(e) {
						return le(e), pe
					},
					getConfigure: function() {
						return se()
					},
					getStartTime: function() {
						return de()
					},
					setConfigure: function(e, t) {
						return fe(e, t), pe
					},
					updatePathInfo: function(e, t) {
						return G(e, t), pe
					},
					updateUserInfo: function(e, t) {
						return ee(e, t), pe
					},
					updateCustomVar: function(e) {
						return re(e), pe
					},
					updateCustomData: function(e) {
						return ne(e), pe
					},
					getPreventFunc: function(e) {
						return ge(e)
					}
				};
			U()
		}
	}(NTESAnalysis, window), window.NTESLogger_run || (window.NTESLogger_run = !0, function(e) {
		if(!window.NTESLogger_project) {
			var t = ((location.host.match(/([^\/]+).163.com/) || [])[1] || "").replace(".", "_"),
				n = ((location.pathname.match(/\/(.+)\//) || [])[1] || "").split("/").slice(0, 2).join("_");
			n.length < 1 && (n = "index"), window.NTESLogger_project = t + "_" + n
		}
		e.setConfigure(window.NTESLogger_project, {
			loggerPath: "http://web.stat.ws.126.net/stat/",
			userinfoEnable: !0,
			pathInfoEnable: !0,
			customDataEnable: !0,
			cookieDomain: ".163.com",
			cookiePath: "/"
		})
	}(NTESLogger)),
	function() {
		function e() {
			var e, t = "ne_analysis_trace_id";
			return /163.com/.test(document.referrer) && (e = NTESAnalysis.cookie.get(t)), e || (e = (new Date).getTime(), NTESAnalysis.cookie.set(t, e, void 0, ".163.com", "/")), e
		}
		if(!NTESLogger.traceDone) {
			var t, n, o;
			t = e(), n = NTESAnalysis.cookie.get("P_INFO").split("|")[0], window.NE && NE.store && NE.store.get && (o = NE.store.get("_ntes", "_nvsf")), NTESLogger.updateCustomVar({
				trace_id: t,
				email: n,
				nvsf: o
			}), NTESLogger.traceDone = !0
		}
	}(),
	function(e, t, n) {
		var o = t.NTESLogger,
			r = o.log,
			i = o.getStartTime(),
			a = function() {
				if(!o.launchDone) {
					var n, a = {
							event: "launch",
							etype: "process",
							cost: (new Date).getTime() - i
						},
						c = t.commentData;
					c && (n = {
						ccount: parseInt(c.count),
						ctotalcount: parseInt(c.count) + parseInt(c.diggCount)
					}), e.util.extend(a, n);
					var u = document.getElementById("ne_article_source");
					if(u) {
						var l = /\u7f51\u6613\u539f\u521b\u7cbe\u54c1/.test(u.innerText || u.textContent);
						l && e.util.extend(a, {
							csource: "yuanchuang"
						})
					}
					r(a), o.launchDone = !0
				}
			};
		a()
	}(NTESAnalysis, window),
	function(e, t, n) {
		var o = t.NTESLogger,
			r = o.getStartTime(),
			i = (new Date).getTime(),
			a = o.log,
			c = t,
			u = function() {
				setTimeout(function() {
					var t = (new Date).getTime() - i;
					e.ready(function() {
						a({
							event: "initialized",
							etype: "process",
							cost: l(t)
						})
					}), e.addEvent(c, "load", function n() {
						a({
							event: "launched",
							etype: "process",
							cost: l(t)
						}), e.removeEvent(c, "load", n)
					})
				}, 20)
			},
			l = function(e) {
				return(new Date).getTime() - e - r
			};
		u()
	}(NTESAnalysis, window),
	function(e, t, n) {
		var o = t.NTESLogger,
			r = o.log,
			i = o.getStartTime(),
			a = o.getPreventFunc(100),
			c = t,
			u = function() {
				e.addEvent(c, "focus", function(e) {
					a() || r({
						event: "actived",
						etype: "process",
						cost: l()
					})
				}), e.addEvent(c, "blur", function(e) {
					a() || r({
						event: "background",
						etype: "process",
						cost: l()
					})
				})
			},
			l = function() {
				var e = (new Date).getTime(),
					t = e - i;
				return i = e, t
			};
		u()
	}(NTESAnalysis, window),
	function(e) {
		function t(e) {
			return(e || "").replace(/^\s+|\s+$/g, "")
		}
		var n = "_n_f_l_n3",
			o = function(e) {
				return e + n
			},
			r = window.NTESLogger.log,
			i = "ontouchstart" in document.documentElement ? "touchstart" : "click";
		e.addEvent(document, i, function(n) {
			var i = {},
				a = n.target || n.srcElement || {};
			if(i.pageX = n.pageX, i.pageY = n.pageY, n.clientX) {
				var c = document.documentElement,
					u = document.body;
				i.pageX = n.clientX + (c && c.scrollLeft || u && u.scrollLeft || 0) - (c && c.clientLeft || u && u.clientLeft || 0), i.pageY = n.clientY + (c && c.scrollTop || u && u.scrollTop || 0) - (c && c.clientTop || u && u.clientTop || 0)
			}
			i.time = (new Date).getTime(), i.tag = (a.tagName || "").toLowerCase(), "img" == i.tag && (i.img = a.getAttribute("src")), i.jcid = function() {
				for(var e, t = a; t && 1 == t.nodeType;) {
					if(e = t.getAttribute("jcid") || t.getAttribute("_jcid")) return e;
					t = t.parentNode
				}
			}();
			for(var l = a; l; l = l.parentNode)
				if("a" == (l.tagName || "").toLowerCase()) {
					var s = /\bnph_btn_pphoto\b/.test(l.className) || /\bnph_btn_nphoto\b/.test(l.className);
					if(s) break;
					i.href = encodeURIComponent(l.getAttribute("href")), i.text = encodeURIComponent(t(l.innerText || l.textContent)), r({
						event: "click",
						cdata: JSON.stringify(i)
					});
					var f = window.NTESLogger.getConfigure();
					e.cookie.set(o("pgr"), window.NTESLogger.pgr, null, f.cookieDomain, f.cookiePath, f.cookieSecure);
					break
				}
		})
	}(NTESAnalysis),
	function(e) {
		e.addEvent(window, "unload", function() {
			window.NTESLogger.log({
				event: "exit",
				cdata: (new Date).getTime()
			})
		})
	}(NTESAnalysis),
	function(e, t, n) {
		var o = e.util,
			r = o.event.scroll,
			i = o.size,
			a = o.dimension.getPageScrollTop,
			c = 20,
			u = 3e3,
			l = "SCROLL_NTES_VIEW_FOCUS",
			s = t.NTESLogger.log,
			f = t.NTESLogger.getPreventFunc(100),
			d = t,
			g = r.create(d, l, c),
			m = 0,
			p = 0,
			h = 0,
			v = 1,
			E = 0,
			y = null,
			T = function() {
				b(), g.bind(l, function(e) {
					w(), h = a();
					var t = h % m,
						n = (h - t) / m + 1;
					t > m / 2 && n++, y = setTimeout(function() {
						n !== E && (E = n, s({
							event: "viewFocus",
							esource: "process"
						}))
					}, u)
				}), e.addEvent(d, "resize", function() {
					b()
				}), e.addEvent(d, "focus", function() {
					f() || g.trigger(l)
				}), e.addEvent(d, "blur", function() {
					f() || w()
				}), g.trigger(l)
			},
			w = function() {
				y && (clearTimeout(y), y = null)
			},
			b = function() {
				m = i.getViewHeight(), p = i.getPageHeight(), v = Math.ceil(p / m), E = 0
			};
		T()
	}(NTESAnalysis, window),
	function(e, t) {
		function n(e, t) {
			var n = t.target;
			t.target || (n = t.srcElement || document);
			var o = t.relatedTarget;
			t.relatedTarget || (o = t.fromElement === n ? t.toElement : t.fromElement);
			for(var r = o; r && r != e;) try {
				r = r.parentNode
			} catch(t) {
				break
			}
			return r != e
		}
		var o, r;
		t.NELogTabSwitch = function(i, a) {
			e(i).each(function(i, c) {
				e(a, c).each(function(i) {
					e.event.addEvent(this, "mouseenter", function(e) {
						if(n(this, e) && this != r) {
							var a = c.getAttribute("data-module-name"),
								u = {
									event: "tabSwitch",
									esource: a,
									einfo: i
								};
							o && (u.cdata = JSON.stringify(o)), t.NTESLogger && t.NTESLogger.log(u), o = {
								reltab: {
									esource: a,
									einfo: i
								}
							}, r = this
						}
					})
				})
			})
		};
		try {
			var i = location.host.toLowerCase();
			"163.com" != i && "www.163.com" != i && "netease.com" != i && "www.netease.com" != i || t.NELogTabSwitch("div.tab-main", ".tab-hd-con")
		} catch(a) {}
	}(window.NTES, window);