! function(e, t) {
	var n = e.document,
		r = Object.prototype.toString,
		i = Object.prototype.hasOwnProperty,
		a = Array.prototype.push,
		o = Array.prototype.slice,
		s = Array.prototype.indexOf,
		u = String.prototype.trim,
		l, f = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
		c = {},
		d = [],
		p = "1.7.17",
		h = function(e, t) {
			return new h.fn.init(e, t)
		};
	h.fn = h.prototype = {
		version: p,
		constructor: h,
		init: function(e, t, r) {
			var i, a, o;
			if(!e) {
				return this
			}
			if(e.nodeType || e === window) {
				this.context = this[0] = e;
				this.length = 1;
				return this
			}
			if(r) {
				t = t || l;
				return S.exec(e, t)
			}
			if(typeof e === "string") {
				if(!t || t.version) {
					return(t || h(n)).find(e)
				} else {
					return this.constructor(t).find(e)
				}
			}
			if(e.selector !== undefined) {
				this.selector = e.selector;
				this.context = e.context
			}
			return h.makeArray(e, this)
		},
		selector: "",
		length: 0,
		toArray: function() {
			return o.call(this)
		},
		get: function(e) {
			return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
		},
		pushStack: function(e, t, n) {
			var r = h.array.merge(this.constructor(), e);
			r.prevObject = this;
			r.context = this.context;
			if(t === "find") {
				r.selector = this.selector + (this.selector ? " " : "") + n
			} else if(t) {
				r.selector = this.selector + "." + t + "(" + n + ")"
			}
			return r
		},
		each: function(e, t) {
			return h.array.each(this, e, t)
		},
		slice: function() {
			return this.pushStack(o.apply(this, arguments), "slice", o.call(arguments).join(","))
		},
		map: function(e) {
			return this.pushStack(h.map(this, function(t, n) {
				return e.call(t, n, t)
			}))
		},
		push: a,
		sort: [].sort,
		splice: [].splice
	};
	h.fn.init.prototype = h.fn;
	h.extend = h.fn.extend = function() {
		var e, t, n, r, i, a, o = arguments[0] || {},
			s = 1,
			u = arguments.length,
			l = false;
		if(typeof o === "boolean") {
			l = o;
			o = arguments[1] || {};
			s = 2
		}
		if(typeof o !== "object" && !h.isFunction(o)) {
			o = {}
		}
		if(u === s) {
			o = this;
			--s
		}
		for(; s < u; s++) {
			if((e = arguments[s]) != null) {
				for(t in e) {
					n = o[t];
					r = e[t];
					if(o === r) {
						continue
					}
					if(l && r && (h.isPlainObject(r) || (i = h.isArray(r)))) {
						if(i) {
							i = false;
							a = n && h.isArray(n) ? n : []
						} else {
							a = n && h.isPlainObject(n) ? n : {}
						}
						o[t] = h.extend(l, a, r)
					} else if(r !== undefined) {
						o[t] = r
					}
				}
			}
		}
		return o
	};
	var g = [],
		m, v;
	if(document.addEventListener) {
		v = function() {
			document.removeEventListener("DOMContentLoaded", v, false);
			w()
		}
	} else if(document.attachEvent) {
		v = function() {
			if("complete" === document.readyState) {
				document.detachEvent("onreadystatechange", v);
				w()
			}
		}
	}

	function y() {
		if(h.isReady) {
			return
		}
		try {
			document.documentElement.doScroll("left")
		} catch(e) {
			setTimeout(y, 1);
			return
		}
		w()
	}

	function w() {
		if(!h.isReady) {
			if(!document.body) {
				return setTimeout(w, 13)
			}
			h.isReady = true;
			if(g) {
				var e = -1,
					t = g.length;
				while(++e < t) {
					g[e].call(document)
				}
				g = null
			}
		}
	}

	function E() {
		if(m) {
			return
		}
		if("complete" === document.readyState) {
			return w()
		}
		if(document.addEventListener) {
			document.addEventListener("DOMContentLoaded", w, false);
			window.addEventListener("load", w, false)
		} else if(document.attachEvent) {
			document.attachEvent("onreadystatechange", w);
			window.attachEvent("onload", w);
			var e;
			try {
				e = window.frameElement == null
			} catch(t) {}
			document.documentElement.doScroll && e && y()
		}
		m = true
	}
	h.extend({
		version: p,
		makeArray: function(e, t) {
			var n, r = t || [];
			if(e != null) {
				n = h.type(e);
				if(e.length == null || n === "string" || n === "function" || n === "regexp") {
					a.call(r, e)
				} else {
					h.array.merge(r, e)
				}
			}
			return r
		},
		isFunction: function(e) {
			return h.type(e) === "function"
		},
		isWindow: function(e) {
			return e != null && e == e.window
		},
		isArray: Array.isArray || function(e) {
			return h.type(e) === "array"
		},
		isNumeric: function(e) {
			return !isNaN(parseFloat(e)) && isFinite(e)
		},
		isPlainObject: function(e) {
			if(!e || h.type(e) !== "object" || e.nodeType || h.isWindow(e)) {
				return false
			}
			try {
				if(e.constructor && !i.call(e, "constructor") && !i.call(e.constructor.prototype, "isPrototypeOf")) {
					return false
				}
			} catch(t) {
				return false
			}
			var n;
			for(n in e) {}
			return n === undefined || i.call(e, n)
		},
		type: function(e) {
			return e == null ? String(e) : c[r.call(e)] || "object"
		},
		trace: function(e) {
			if(typeof console != "undefined" && console.log) {
				console.log(e)
			}
		},
		parseXML: function(e) {
			if(typeof e !== "string" || !e) {
				return null
			}
			var t, n;
			try {
				if(window.DOMParser) {
					n = new DOMParser;
					t = n.parseFromString(e, "text/xml")
				} else {
					t = new ActiveXObject("Microsoft.XMLDOM");
					t.async = "false";
					t.loadXML(e)
				}
			} catch(r) {
				t = undefined
			}
			if(!t || !t.documentElement || t.getElementsByTagName("parsererror").length) {
				NE.trace("Invalid XML: " + e)
			}
			return t
		},
		ready: function(e) {
			E();
			if(h.isReady) {
				e.call(document)
			} else {
				g.push(e)
			}
			return this
		}
	});
	d = "Boolean Number String Function Array Date RegExp Object".split(" ");
	for(var b = 0, N = d.length; b < N; b++) {
		c["[object " + d[b] + "]"] = d[b].toLowerCase()
	}
	var x = document.createElement("div");
	x.innerHTML = "<p class='TEST'></p>";
	var S = {
		SPACE: /\s*([\s>~+,])\s*/g,
		ISSIMPLE: /^#?[\w\u00c0-\uFFFF_-]+$/,
		IMPLIEDALL: /([>\s~\+,]|^)([#\.\[:])/g,
		ATTRVALUES: /=(["'])([^'"]*)\1]/g,
		ATTR: /\[\s*([\w\u00c0-\uFFFF_-]+)\s*(?:(\S?\=)\s*(.*?))?\s*\]/g,
		PSEUDOSEQ: /\(([^\(\)]*)\)$/g,
		BEGINIDAPART: /^(?:\*#([\w\u00c0-\uFFFF_-]+))/,
		STANDARD: /^[>\s~\+:]/,
		STREAM: /[#\.>\s\[\]:~\+]+|[^#\.>\s\[\]:~\+]+/g,
		ISINT: /^\d+$/,
		enableQuerySelector: x.querySelectorAll && x.querySelectorAll(".TEST").length > 0,
		tempAttrValues: [],
		tempAttrs: [],
		idName: "NEUniqueId",
		id: 0,
		exec: function(e, t, n) {
			var r, i, s, u, l, f, c, d, p, g, m = S;
			e = NE.string.trim(e);
			if("" === e) {
				return []
			}
			if(t.nodeType == 9) {
				if(e === "body" && t.body) {
					v = t.body;
					if(n) n.push(v);
					return v
				}
			}
			if(m.ISSIMPLE.test(e)) {
				if(0 === e.indexOf("#") && typeof t.getElementById !== "undefined") {
					r = m.getElemById(t, e.substr(1));
					if(n && r) a.apply(n, [r], 0);
					return r
				} else if(typeof t.getElementsByTagName !== "undefined") {
					r = t.getElementsByTagName(e);
					if(n)
						for(var u = 0; u < r.length; u++) {
							n.push(r[u])
						}
					return r
				}
			}
			if(m.enableQuerySelector) {
				var v;
				if(NE.isArray(t)) {
					NE.array.each(t, function(t, n) {
						a.apply(v, S.exec(e, n), 0)
					})
				}
				try {
					r = o.call(t.querySelectorAll(e));
					if(n) a.apply(n, r, 0);
					return r
				} catch(y) {}
			}
			t = t.nodeType ? [t] : o.call(t);
			i = e.replace(m.SPACE, "$1").replace(m.ATTRVALUES, m.analyzeAttrValues).replace(m.ATTR, m.analyzeAttrs).replace(m.IMPLIEDALL, "$1*$2").split(",");
			s = i.length;
			u = -1;
			r = [];
			while(++u < s) {
				f = t;
				e = i[u];
				if(m.BEGINIDAPART.test(e)) {
					if(typeof t[0].getElementById !== "undefined") {
						f = [m.getElemById(t[0], RegExp.$1)];
						if(!f[0]) {
							continue
						}
						e = RegExp.rightContext
					} else {
						e = i[u]
					}
				}
				if(e !== "") {
					if(!m.STANDARD.test(e)) {
						e = " " + e
					}
					c = e.match(m.STREAM) || [];
					d = c.length;
					l = 0;
					while(l < d) {
						p = c[l++];
						g = c[l++];
						f = m.operators[p] ? m.operators[p](f, g) : [];
						if(0 === f.length) {
							break
						}
					}
				}
				h.array.merge(r, f)
			}
			m.tempAttrValues.length = m.tempAttrs.length = 0;
			r = r.length > 1 ? m.unique(r) : r;
			if(n) a.apply(n, r, 0);
			return r
		},
		analyzeAttrs: function(e, t, n, r) {
			return "[]" + (S.tempAttrs.push([t, n, r]) - 1)
		},
		analyzeAttrValues: function(e, t, n) {
			return "=" + (S.tempAttrValues.push(n) - 1) + "]"
		},
		generateId: function(e) {
			var t = this.idName,
				n;
			try {
				n = e[t] = e[t] || new Number(++this.id)
			} catch(r) {
				n = e.getAttribute(t);
				if(!n) {
					n = new Number(++this.id);
					e.setAttribute(t, n)
				}
			}
			return n.valueOf()
		},
		unique: function(e) {
			var t = [],
				n = 0,
				r = {},
				i, a;
			while(i = e[n++]) {
				if(1 === i.nodeType) {
					a = this.generateId(i);
					if(!r[a]) {
						r[a] = true;
						t.push(i)
					}
				}
			}
			return t
		},
		attrMap: {
			"class": "className",
			"for": "htmlFor"
		},
		getAttribute: function(e, t) {
			var n = this.attrMap[t] || t,
				r = e[n];
			if("string" !== typeof r) {
				if("undefined" !== typeof e.getAttributeNode) {
					r = e.getAttributeNode(t);
					r = undefined == r ? r : r.value
				} else if(e.attributes) {
					r = String(e.attributes[t])
				}
			}
			return null == r ? "" : r
		},
		getElemById: function(e, t) {
			var n = e.getElementById(t);
			if(n && n.id !== t && e.all) {
				n = e.all[t];
				if(n) {
					n.nodeType && (n = [n]);
					for(var r = 0; r < n.length; r++) {
						if(this.getAttribute(n[r], "id") === t) {
							return n[r]
						}
					}
				}
			} else {
				return n
			}
		},
		getElemsByTagName: function(e, t, n, r, i) {
			var a = [],
				o = -1,
				s = e.length,
				u, l, f;
			r !== "*" && (f = r.toUpperCase());
			while(++o < s) {
				u = e[o][t];
				l = 0;
				while(u && (!i || l < i)) {
					if(1 === u.nodeType) {
						(u.nodeName.toUpperCase() === f || !f) && a.push(u);
						l++
					}
					u = u[n]
				}
			}
			return a
		},
		checkElemPosition: function(e, t, n, r) {
			var i = [];
			if(!isNaN(t)) {
				var a = e.length,
					o = -1,
					s = {},
					u, l, f, c;
				while(++o < a) {
					u = e[o].parentNode;
					l = this.generateId(u);
					if(undefined === s[l]) {
						f = 0;
						c = u[n];
						while(c) {
							1 === c.nodeType && f++;
							if(f < t) {
								c = c[r]
							} else {
								break
							}
						}
						s[l] = c || 0
					} else {
						c = s[l]
					}
					e[o] === c && i.push(e[o])
				}
			}
			return i
		},
		getElemsByPosition: function(e, t, n) {
			var r = t,
				i = e.length,
				a = [];
			while(r >= 0 && r < i) {
				a.push(e[r]);
				r += n
			}
			return a
		},
		getElemsByAttribute: function(e, t) {
			var n = [],
				r, i = 0,
				a = this.attrOperators[t[1] || ""],
				o = "~=" === t[1] ? " " + t[2] + " " : t[2];
			if(a) {
				while(r = e[i++]) {
					a(this.getAttribute(r, t[0]), o) && n.push(r)
				}
			}
			return n
		},
		operators: {
			"#": function(e, t) {
				return S.getElemsByAttribute(e, ["id", "=", t])
			},
			" ": function(e, t) {
				var n = e.length;
				if(1 === n) {
					return e[0].getElementsByTagName(t)
				} else {
					var r = [],
						i = -1;
					while(++i < n) {
						h.array.merge(r, e[i].getElementsByTagName(t))
					}
					return r
				}
			},
			".": function(e, t) {
				return S.getElemsByAttribute(e, ["class", "~=", t])
			},
			">": function(e, t) {
				return S.getElemsByTagName(e, "firstChild", "nextSibling", t)
			},
			"+": function(e, t) {
				return S.getElemsByTagName(e, "nextSibling", "nextSibling", t, 1)
			},
			"~": function(e, t) {
				return S.getElemsByTagName(e, "nextSibling", "nextSibling", t)
			},
			"[]": function(e, t) {
				t = S.tempAttrs[t];
				if(t) {
					if(S.ISINT.test(t[2])) {
						t[2] = S.tempAttrValues[t[2]]
					}
					return S.getElemsByAttribute(e, t)
				} else {
					return e
				}
			},
			":": function(e, t) {
				var n;
				if(S.PSEUDOSEQ.test(t)) {
					n = parseInt(RegExp.$1);
					t = RegExp.leftContext
				}
				return S.pseOperators[t] ? S.pseOperators[t](e, n) : []
			}
		},
		attrOperators: {
			"": function(e) {
				return e !== ""
			},
			"=": function(e, t) {
				return t === e
			},
			"~=": function(e, t) {
				return(" " + e + " ").indexOf(t) >= 0
			},
			"!=": function(e, t) {
				return t !== e
			},
			"^=": function(e, t) {
				return e.indexOf(t) === 0
			},
			"$=": function(e, t) {
				return e.substr(e.length - t.length) === t
			},
			"*=": function(e, t) {
				return e.indexOf(t) >= 0
			}
		},
		pseOperators: {
			"first-child": function(e) {
				return S.checkElemPosition(e, 1, "firstChild", "nextSibling")
			},
			"nth-child": function(e, t) {
				return S.checkElemPosition(e, t, "firstChild", "nextSibling")
			},
			"last-child": function(e) {
				return S.checkElemPosition(e, 1, "lastChild", "previousSibling")
			},
			"nth-last-child": function(e, t) {
				return S.checkElemPosition(e, t, "lastChild", "previousSibling")
			},
			odd: function(e) {
				return S.getElemsByPosition(e, 0, 2)
			},
			even: function(e) {
				return S.getElemsByPosition(e, 1, 2)
			},
			lt: function(e, t) {
				return S.getElemsByPosition(e, t - 1, -1)
			},
			gt: function(e, t) {
				return S.getElemsByPosition(e, t + 1, 1)
			}
		}
	};
	h.find = S.exec;
	h.$ = function(e, t) {
		if(f.test(e)) {
			return n.getElementById(e.replace("#", ""))
		}
		return new h.fn.init(e, t, true)
	};
	h.fn.extend({
		find: function(e) {
			var t, n, r, i, a, o, s = this;
			o = this.pushStack("", "find", e);
			for(t = 0, n = this.length; t < n; t++) {
				r = o.length;
				h.find(e, this[t], o);
				if(t > 0) {
					for(i = r; i < o.length; i++) {
						for(a = 0; a < r; a++) {
							if(o[a] === o[i]) {
								o.splice(i--, 1);
								break
							}
						}
					}
				}
			}
			return o
		}
	});
	l = h(n);
	if(e[t]) {
		h.extend(e[t])
	}
	e[t] = h
}(window, "NE");
! function() {
	var e = window["NE"] || {};
	e.event = {
		name: "Event",
		space: "Events",
		eventNum: 0,
		add: function(e, t, n, r) {
			r = r || [];
			n = this.delegate(e, t, n, r);
			if(e.attachEvent) {
				e.attachEvent("on" + t, n)
			} else if(e.addEventListener) {
				e.addEventListener(t, n, false)
			}
		},
		remove: function(e, t, n) {
			_handle = this.getDelegate(e, t, n);
			if(_handle) {
				if(e.detachEvent) {
					e.detachEvent("on" + t, _handle)
				} else if(e.removeEventListener) {
					e.removeEventListener(t, _handle, false)
				}
				this.removeDelegate(e, t, n)
			}
		},
		trigger: function(e, t, n) {
			if(e && (e.nodeType === 3 || e.nodeType === 8)) {
				return
			}
			var r = this.getDelegateObj(e);
			if(!r || !r[t]) return;
			for(var i in r[t]) {
				r[t][i].call(e, n)
			}
		},
		delegate: function(e, t, n, r) {
			var i = e[this.space] = e[this.space] || {},
				a = n[this.name] = n[this.name] || ++this.eventNum,
				o = this;
			i[t] = i[t] || {};
			var s = i[t][a];
			if(!s) {
				s = function(t) {
					t = o.fix(t);
					var i = n.call(e, t, r);
					false === i && t.preventDefault();
					return i
				};
				i[t][a] = s
			}
			return s
		},
		getDelegate: function(e, t, n) {
			try {
				return e[this.space][t][n[this.name]]
			} catch(r) {}
			return n
		},
		removeDelegate: function(e, t, n) {
			try {
				return delete e[this.space][t][n[this.name]]
			} catch(r) {}
		},
		getDelegateObj: function(e) {
			try {
				return e[this.space]
			} catch(t) {
				return undefined
			}
		},
		fix: function(e) {
			if(!e) return;
			!e.target && (e.target = e.srcElement || document);
			3 == e.target.nodeType && (e.target = e.target.parentNode);
			e.preventDefault = e.preventDefault || function() {
				this.returnValue = false
			};
			e.stopPropagation = e.stopPropagation || function() {
				this.cancelBubble = true
			};
			if(undefined === e.pageX && undefined !== e.clientX) {
				var t = document.documentElement,
					n = document.body;
				e.pageX = e.clientX + (t.scrollLeft || n.scrollLeft || 0) - (t.clientLeft || 0);
				e.pageY = e.clientY + (t.scrollTop || n.scrollTop || 0) - (t.clientTop || 0)
			}
			if(!e.which && (e.charCode || e.charCode === 0 ? e.charCode : e.keyCode)) {
				e.which = e.charCode || e.keyCode
			}
			if(!e.which && e.button !== undefined) {
				e.which = e.button & 1 ? 1 : e.button & 2 ? 3 : e.button & 4 ? 2 : 0
			}
			return e
		}
	};
	window["NE"] = e;
	if(!e.fn) return;
	e.fn.extend({
		bind: function(t, n, r) {
			if(typeof t === "object") {
				for(var i in t) {
					this.bind(i, t[i], r)
				}
				return this
			}
			return this.each(function() {
				e.event.add(this, t, n, r)
			})
		},
		unbind: function(t, n) {
			if(typeof t === "object") {
				for(var r in t) {
					this.unbind(r, t[r])
				}
				return this
			}
			return this.each(function() {
				e.event.remove(this, t, n)
			})
		},
		trigger: function(t, n) {
			return this.each(function() {
				e.event.trigger(t, n, this)
			})
		}
	})
}();
! function() {
	var e = window["NE"] || {},
		t = /^-ms-/,
		n = /-([\da-z])/gi,
		r = function(e, t) {
			return(t + "").toUpperCase()
		};
	e.string = {
		camelCase: function(e) {
			return e.replace(t, "ms-").replace(n, r)
		},
		trim: function(e, t) {
			var n = {
				left: /^\s+/,
				right: /(\s*?$)/g,
				both: /^\s+|\s+$/g,
				all: /\s+/g
			};
			t = n[t] || n["both"];
			return e.replace(t, "")
		},
		guid: function() {
			return "ne" + (Math.random() * (1 << 30)).toString(16).replace(".", "")
		}
	};
	window["NE"] = e
}();
! function() {
	var e = Object.prototype.hasOwnProperty,
		t = window.NE || {};
	t.array = {
		each: function(e, t, n) {
			var r, i = 0,
				a = e.length,
				o = a === undefined;
			if(n) {
				if(o) {
					for(r in e) {
						if(t.apply(e[r], n) === false) {
							break
						}
					}
				} else {
					for(; i < a;) {
						if(t.apply(e[i++], n) === false) {
							break
						}
					}
				}
			} else {
				if(o) {
					for(r in e) {
						if(t.call(e[r], r, e[r]) === false) {
							break
						}
					}
				} else {
					for(; i < a;) {
						if(t.call(e[i], i, e[i++]) === false) {
							break
						}
					}
				}
			}
			return e
		},
		merge: function(e, t) {
			var n = t.length,
				r = e.length,
				i = 0;
			if(typeof n === "number") {
				for(; i < n; i++) {
					e[r++] = t[i]
				}
			} else {
				while(t[i] !== undefined) {
					e[r++] = t[i++]
				}
			}
			e.length = r;
			return e
		},
		indexOf: function(e, t) {
			if(e.indexOf) {
				return e.indexOf(t)
			}
			for(var n = 0, r = e.length; n < r; n++) {
				if(e[n] === t) {
					return n
				}
			}
			return -1
		},
		filter: function(e, t) {
			var n = [];
			for(var r = 0, i = e.length; r < i; r++) {
				var a = e[r];
				if(t(a)) {
					n.push(a)
				}
			}
			return n
		},
		keys: function(t, n) {
			var r = [];
			var i = n || true;
			if(typeof t != "object") return;
			for(var a in t) {
				if(i || e(a)) {
					r.push(a)
				}
			}
			return r
		},
		uniq: function(e) {
			var n = [];
			for(var r = 0, i = e.length; r < i; r++) {
				if(t.array.indexOf(n, e[r]) == -1) {
					n.push(e[r])
				}
			}
			return n
		},
		map: function(e, n, r) {
			var i, a, o = [],
				s = 0,
				u = e.length,
				l = e instanceof t || u !== undefined && typeof u === "number" && (u > 0 && e[0] && e[u - 1] || u === 0 || t.isArray(e));
			if(l) {
				for(; s < u; s++) {
					i = n(e[s], s, r);
					if(i != null) {
						o[o.length] = i
					}
				}
			} else {
				for(a in e) {
					i = n(e[a], a, r);
					if(i != null) {
						o[o.length] = i
					}
				}
			}
			return o.concat.apply([], o)
		}
	};
	window["NE"] = t
}();
! function() {
	var NE = window.NE || {};
	NE.json = {
		stringfy: function(e) {
			if(window.JSON && window.JSON.stringfy) {
				return window.JSON.stringfy(e)
			}
			if(e === null || e == undefined) {
				return ""
			}
			switch(e.constructor) {
				case String:
					return typeof e === "string" ? '"' + e.replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + '"' : String(e);
				case Array:
					return "[" + NE.array.map(e, NE.json.stringfy).join(",") + "]";
				case Object:
					var t = [];
					for(var n in e)
						if(typeof e[n] != "function") {
							t.push(NE.json.stringfy(n) + ":" + NE.json.stringfy(e[n]))
						}
					return "{" + t.join(",") + "}";
				case Number:
					if(isFinite(e)) {
						break
					}
				case Function:
					return '""';
				case Boolean:
					return e
			}
			return String(e)
		},
		parse: function(str) {
			if(window.JSON && window.JSON.parse) {
				return window.JSON.parse(str)
			}
			if(typeof str == "object") {
				return str
			}
			str = str != null ? str.split("\n").join("").split("\r").join("") : "";
			if(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/.test(str.replace(/\\./g, "@").replace(/"[^"\\\n\r]*"/g, ""))) {
				if(str != "") {
					return eval("(" + str + ")")
				}
			}
			return {}
		},
		encode: function(e, t, n) {
			if(typeof e == "string") {
				return e
			}
			t = t === undefined ? "&" : t;
			n = n === false ? function(e) {
				return e
			} : encodeURIComponent;
			var r = [];
			NE.array.each(e, function(e, t) {
				if(t !== null && typeof t != "undefined") {
					var i = n(e) + "=" + n(t);
					r.push(i)
				}
			});
			r.sort();
			return r.join(t)
		},
		decode: function(e, t) {
			var n = {},
				r = e.split("&");
			t = t || decodeURIComponent;
			for(var i = 0, a = r.length; i < a; i++) {
				var o = r[i].split("=");
				if(o && o[0]) {
					n[t(o[0])] = t(o[1] || "")
				}
			}
			return n
		},
		copy: function(e, t, n, r) {
			r = r || function(e) {
				return e
			};
			for(var i in t) {
				if(n || typeof e[i] === "undefined" || e[i] === null) {
					e[i] = r(t[i])
				}
			}
			return e
		}
	};
	window["NE"] = NE
}();
! function() {
	var e = window["NE"] || {};
	var t, n, r = navigator.userAgent;
	e.uaMatch = function(e) {
		e = e.toLowerCase();
		var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
		return {
			browser: t[1] || "",
			version: t[2] || "0"
		}
	};
	t = e.uaMatch(r);
	n = {};
	var i = "chrome webkit opera msie".split(" ");
	for(var a = 0, o = i.length; a < o; a++) {
		n[i[a]] = false
	}
	if(t.browser) {
		n[t.browser] = true;
		n.version = t.version
	}
	if(n.webkit) {
		n.safari = true
	} else {
		n.safari = false
	}
	n.webkit = n.chrome || n.webkit;
	n.is64 = function() {
		var e = false;
		var t = ["amd64", "ppc64", "_64", "win64"];
		var n = ["x86_64", "wow64"];
		var i = navigator.platform.toLowerCase();
		for(var a = 0, o = t.length; a < o; a++) {
			if(i.indexOf(t[a]) > -1) {
				e = true;
				break
			}
		}
		for(var a = 0, o = n.length; a < o; a++) {
			if(r.toLowerCase().indexOf(n[a]) > -1) {
				e = true;
				break
			}
		}
		return e
	}();
	n.mock = function() {
		var e = false;
		var t = ["maxthon", "tencent", "qqbrowser", " se "];
		for(var n = 0, i = t.length; n < i; n++) {
			if(r.toLowerCase().indexOf(t[n]) > -1) {
				e = true;
				break
			}
		}
		try {
			var a = typeof navigator.userProfile !== "undefined";
			var o = typeof(window.external + "") == "string"
		} catch(s) {}
		return e || a && o
	}();
	n.weixin = typeof window.WeixinJSBridge != "undefined";
	e.browser = n;
	window["NE"] = e
}(NE);
! function() {
	var e = {
		set: function(e, n, r, i, a, o) {
			if(!a) a = "/";
			if(!t.isNumeric(r)) r = 365;
			r = r * 864e5;
			var s = new Date;
			s.setTime(+s + r);
			document.cookie = e + "=" + encodeURIComponent(n) + (r ? "; expires=" + s.toGMTString() : "") + (i ? "; domain=" + i : "") + (a ? "; path=" + a : "") + (o ? "; secure" : "")
		},
		get: function(e) {
			var t = document.cookie.split("; ");
			for(var n = 0; n < t.length; n++) {
				var r = t[n].split("=");
				if(e == r[0]) try {
					return decodeURIComponent(r[1])
				} catch(i) {
					return null
				}
			}
			return ""
		},
		remove: function(e, t, n) {
			document.cookie = e + "=1" + (n ? "; path=" + n : "; path=/") + (t ? "; domain=" + t : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT"
		},
		getDomain: function() {
			return "." + location.host.split(".").slice(-2).join(".")
		}
	};
	var t = window["NE"] || {};
	t.cookie = e;
	window["NE"] = t
}();
! function() {
	var e = window["NE"] || {};
	e.date = {
		parseDate: function(e) {
			if(e instanceof Date) {
				return e
			}
			if(typeof e == "string") {
				var t = new Date(e);
				if(t.getTime()) {
					return t
				}
				var n = e.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
				if(n && n.length > 3) return new Date(parseFloat(n[1]), parseFloat(n[2]) - 1, parseFloat(n[3]));
				n = e.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
				if(n && n.length > 6) return new Date(parseFloat(n[1]), parseFloat(n[2]) - 1, parseFloat(n[3]), parseFloat(n[4]), parseFloat(n[5]), parseFloat(n[6]));
				n = e.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
				if(n && n.length > 7) return new Date(parseFloat(n[1]), parseFloat(n[2]) - 1, parseFloat(n[3]), parseFloat(n[4]), parseFloat(n[5]), parseFloat(n[6]), parseFloat(n[7]))
			}
			return null
		},
		format: function(e, t) {
			e = this.parseDate(e);
			if(e == null) {
				return null
			}
			if(e) {
				var n = {
					"M+": e.getMonth() + 1,
					"d+": e.getDate(),
					"h+": e.getHours(),
					"m+": e.getMinutes(),
					"s+": e.getSeconds(),
					"q+": Math.floor((e.getMonth() + 3) / 3),
					S: e.getMilliseconds()
				};
				if(/(y+)/.test(t)) {
					t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length))
				}
			}
			for(var r in n) {
				if(new RegExp("(" + r + ")").test(t)) {
					t = t.replace(RegExp.$1, RegExp.$1.length == 1 ? n[r] : ("00" + n[r]).substr(("" + n[r]).length))
				}
			}
			return t
		},
		diff: function(e, t) {
			var n = {};
			e = this.parseDate(e);
			t = this.parseDate(t);
			if(e == null || t == null) {
				return null
			}
			var r = 1e3,
				i = r * 60,
				a = i * 60,
				o = a * 24;
			var s = t - e;
			n.day = ~~(s / o), n.hours = ~~(s / a) % 24, n.minutes = ~~(s / i) % 60, n.seconds = Math.floor(~~(s % i) / r) == 60 || Math.floor(~~(s % i) / r) == -60 ? 0 : Math.floor(~~(s % i) / r);
			return n
		},
		stringToDate: function(e) {
			var t = Date.parse(e);
			var n = new Date(t);
			if(isNaN(n)) {
				var r = e.split("-");
				n = new Date(r[0], r[1], r[2])
			}
			return n
		}
	};
	window["NE"] = e
}();
! function() {
	NE = window["NE"] || {};
	NE.template = {
		replace: function(e, t, n) {
			if(!(Object.prototype.toString.call(t) === "[object Array]")) t = [t];
			var r = [];
			for(var i = 0, a = t.length; i < a; i++) {
				r.push(o(t[i]))
			}
			return r.join("");

			function o(t) {
				return e.replace(n || /\\?\{([^}]+)\}/g, function(e, n) {
					if(e.charAt(0) == "\\") return e.slice(1);
					return t[n] != undefined ? t[n] : ""
				})
			}
		}
	};
	window["NE"] = NE
}();
! function(e) {
	var t = window;
	var n = e.browser.msie;
	var r = location.protocol;
	var i = NE.$;
	var a = e.json.encode;
	var o = e.json.copy;
	var s = e.template.replace;
	var u = e.string.guid;
	var l = e.trace;
	e.extend({
		swf: {
			embed: f,
			version: p,
			get: h
		}
	});

	function f(e, n) {
		e.flashId = e.flashId || u();
		var r = e.flashId;
		var i = e.talker || "NESWF";
		var a;
		c(e);
		if(!t[i]) {
			t[i] = {}
		}
		t[i].call = function(e, n) {
			switch(e) {
				case "swfReady":
					o();
					l("swf Ready");
					break;
				case "trace":
					l(params);
					break;
				default:
					if(t[i][e]) {
						l(e);
						t[i][e](e, n, function(r) {
							t[i].callSwfBack(e, n, r)
						})
					} else {
						l("\u65b9\u6cd5" + e + "\u6682\u65f6\u672a\u5b9e\u73b0")
					}
			}
		};
		t[i].callSwfBack = function(e, t, n) {
			l("callSwfBack: " + t.requestId);
			if(t.requestId) {
				a.call(e, {
					args: t,
					data: n
				})
			} else {
				l("no legal requestId")
			}
		};

		function o() {
			a = h(r);
			n(a)
		}
	}

	function c(e, t) {
		var r = ['<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="{codebase}" width="{width}" height="{height}" id="{flashId}" align="middle" type="application/x-shockwave-flash" data="{swf}">', '<param name="allowScriptAccess" value="{allowScriptAccess}" />', '<param name="allowFullScreen" value="{allowFullScreen}" />', '<param name="movie" value="{swf}" />', '<param name="src" value="{swf}" />', '<param name="loop" value="false" />', '<param name="menu" value="{menu}" />', '<param name="quality" value="best" />', '<param name="bgcolor" value="{bgcolor}" />', '<param name="flashvars" value="{flashvars}"/>', '<param name="wmode" value="{wmode}"/>', "</object>"].join("");
		if(!n) {
			r = '<embed id="{flashId}" src="{swf}" loop="false" menu="{menu}" quality="best" bgcolor="{bgcolor}" width="{width}" height="{height}" name="{flashId}" align="middle" allowScriptAccess="{allowScriptAccess}" allowFullScreen="{allowFullScreen}" type="application/x-shockwave-flash" pluginspage="{pluginspage}" flashvars="{flashvars}" wmode="{wmode}" />'
		}
		e = d(e);
		target = i("#" + e.targetId);
		target.innerHTML = s(r, e)
	}

	function d(e) {
		var t = {
			width: "100%",
			height: "100%",
			bgcolor: "transparent",
			wmode: "transparent",
			allowFullScreen: "false",
			allowScriptAccess: "false",
			menu: "false",
			flashvars: {}
		};
		e = e || {};
		e = o(e, t);
		e.codebase = r + "//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0";
		e.pluginspage = r + "//www.macromedia.com/go/getflashplayer";
		e.flashvars.namespace = e.talker;
		e.flashvars = a(e.flashvars);
		return e
	}

	function p() {
		var e = "",
			t = navigator;
		if(t.plugins && t.plugins.length) {
			for(var n = 0; n < t.plugins.length; n++) {
				if(t.plugins[n].name.indexOf("Shockwave Flash") != -1) {
					e = t.plugins[n].description.split("Shockwave Flash ")[1];
					e = e.split(" ").join(".");
					break
				}
			}
		} else if(window.ActiveXObject) {
			var r = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			if(r) {
				e = r.GetVariable("$version").toLowerCase();
				e = e.split("win ")[1];
				e = e.split(",").join(".")
			}
		}
		return e
	}

	function h(e) {
		var t = document[e];
		if(n) {
			t = window[e]
		}
		return t
	}
}(NE);
! function() {
	var e = window["NE"] || {};
	e.para = {
		set: function(t, n, r) {
			t = e.string.trim(t);
			var i = n + "=" + r;
			var a = e.para.get(t, n);
			var o = "";
			if(a == "") {
				if(t.substring(t.length - 1) == "?") {
					o = t + i
				} else {
					o = t + (t.indexOf("?") == -1 ? "?" : "&") + i
				}
			} else {
				o = t.replace("&" + n + "=" + a, "&" + i);
				o = o.replace("?" + n + "=" + a, "?" + i)
			}
			return o
		},
		get: function(e, t) {
			var n = "",
				r = t + "=";
			var e = e.split("#!")[0] || "";
			if(e.indexOf("&" + r) > -1) {
				n = e.split("&" + r)[1].split("&")[0]
			}
			if(e.indexOf("?" + r) > -1) {
				n = e.split("?" + r)[1].split("&")[0]
			}
			return n
		},
		remove: function(t, n) {
			if(!n) {
				return t
			}
			var r = e.para.get(t, n);
			if(t.indexOf("&" + n + "=" + r) > -1) {
				t = t.replace("&" + n + "=" + r, "")
			} else if(t.indexOf("?" + n + "=" + r + "&") > -1) {
				t = t.replace(n + "=" + r + "&", "")
			} else {
				t = t.replace("?" + n + "=" + r, "")
			}
			return t
		}
	};
	window["NE"] = e
}(NE);
! function() {
	var e = window["NE"] || {};
	e.hash = {
		set: function(t, n) {
			var r = location.hash.split("#!")[1] || "";
			r = "?" + r;
			location.hash = e.para.set(r, t, n).replace("?", "!")
		},
		get: function(t) {
			var n = location.hash.split("#!")[1] || "";
			n = "?" + n;
			return e.para.get(n, t)
		},
		remove: function(t) {
			var n = location.hash.split("#!")[1] || "";
			n = "?" + n;
			location.hash = e.para.remove(n, t).replace("?", "!")
		}
	};
	window["NE"] = e
}();
! function() {
	var e = window["NE"] || {};
	var t = window.localStorage || {
		userdata_inpt: null,
		init: function() {
			var e = this;
			if(e.userdata_inpt == null) {
				try {
					e.userdata_inpt = document.createElement("input");
					e.userdata_inpt.type = "hidden";
					e.userdata_inpt.style.display = "none";
					e.userdata_inpt.addBehavior("#default#userData");
					document.body.appendChild(e.userdata_inpt);
					e.userdata_inpt.load("tools_userData")
				} catch(t) {
					return false
				}
			}
			return true
		},
		setItem: function(e, t) {
			var n = this;
			if(n.init()) {
				var r = n.userdata_inpt;
				r.setAttribute(e, t);
				r.save("tools_userData")
			}
		},
		getItem: function(e) {
			var t = this;
			if(t.init()) {
				var n = t.userdata_inpt;
				return n.getAttribute(e)
			}
			return null
		},
		removeItem: function(e) {
			var t = this;
			if(t.init()) {
				var n = t.userdata_inpt;
				n.removeAttribute(e);
				n.save("tools_userData")
			}
		}
	};
	e.store = {
		set: function(e, n, r) {
			if(!r || typeof r == undefined) {
				r = n;
				n = e
			} else if(e) {
				n = e + "." + n
			}
			t.setItem(n, r)
		},
		get: function(e, n) {
			if(typeof n == "string") {
				n = e + "." + n
			} else {
				n = e
			}
			var r = t.getItem(n) || "";
			return r
		},
		remove: function(e, n) {
			if(typeof n == "string") {
				n = e + "." + n
			} else {
				n = e
			}
			t.removeItem(n)
		}
	};
	window["NE"] = e
}();
! function() {
	var e = window["NE"] || {};
	var t = {
		json: e.json.parse,
		xml: e.parseXML
	};
	e.load = {
		isXD: function(e) {
			if(e.indexOf("http://") == -1 && e.indexOf("https://") == -1) {
				return false
			}
			var t = location.protocol + "//";
			var n = t + location.host;
			return e.indexOf(n) !== 0
		},
		js: function(t, n, r) {
			var i = document.createElement("script");
			r && (i.charset = r);
			i.src = t;
			document.getElementsByTagName("head")[0].appendChild(i);
			e.dom.ready(i, n)
		},
		css: function(e, t) {
			var n = document.createElement("link");
			n.href = e;
			n.type = "text/css";
			n.rel = "stylesheet";
			document.getElementsByTagName("head")[0].appendChild(n)
		},
		ajax: function(n, r) {
			var i = n.method || "get";
			i = i.toLowerCase();
			var a = false;
			if(n.async && n.async !== false) {
				a = true
			}
			var o = n.url,
				s = n.data || {};
			s = e.json.encode(s);
			if(i == "get") {
				if(o.indexOf("?") > -1) {
					o += "&" + s
				} else {
					o += "?" + s
				}
				setTimeout(function() {
					s = null
				}, 0)
			}
			var u = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest;
			u.open(i, o, a);
			u.setRequestHeader("Content-Type", n.contentType || "application/x-www-form-urlencoded");
			u.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			u.onreadystatechange = c;
			n.dataType = n.dataType || "string";
			var l = [];
			if(n.headers) {
				for(var f in n.headers) {
					if("content-type" === f.toLowerCase()) {
						l.push(n.headers[f])
					} else {
						u.setRequestHeader(f, n.headers[f])
					}
				}
			}
			l.length && u.setRequestHeader("Content-Type", l.join(";").replace(/;+/g, ";").replace(/;$/, ""));
			u.send(s);
			n.xhr = u;
			return n;

			function c() {
				if(u != null && u.readyState == 4) {
					if(n.dataType && n.dataType && t[n.dataType]) {
						r && r(t[n.dataType](u.responseText));
						return
					}
					r && r(u)
				}
			}
		},
		jsonp: function(t, n) {
			if(!t.url || !n) {
				return false
			}
			var r = t.url || "";
			var i = t.data || {};
			i = e.json.encode(i);
			var a = e.string.guid();
			window[a] = n;
			r = e.para.set(r, "callback", a);
			if(i) {
				r += "&" + i
			}
			var o = document.createElement("script");
			if(t.charset) {
				o.charset = t.charset
			}
			o.src = r;
			document.getElementsByTagName("head")[0].appendChild(o)
		},
		request: function(t, n) {
			var r = e.load;
			if(r.isXD(t.url)) {
				r.jsonp(t, n)
			} else {
				r.ajax(t, n)
			}
		}
	};
	window["NE"] = e
}();
! function() {
	var e = window["NE"] || {};
	e.prop = {
		set: function(e, t, n) {
			if(typeof n == "object") {
				var r = e[t];
				if(typeof r == "object") {
					for(var i in n) {
						e[t][i] = n[i]
					}
				}
				return
			}
			e[t] = n;
			e.setAttribute(t, n)
		},
		get: function(e, t) {
			return e[t] || e.getAttribute(t) || ""
		},
		remove: function(e, t) {
			e[t] = null;
			e.removeAttribute(t)
		}
	};
	window["NE"] = e;
	if(!e.fn) return;
	e.fn.extend({
		css: function(t, n) {
			var r = t,
				i = {};
			if(typeof r == "string" && typeof n == "undefined") {
				return e.classList.getStyle(this[0], r)
			}
			if(typeof r == "object") {
				return this.each(function(t, n) {
					e.classList.setStyle(n, r)
				})
			} else {
				t = e.string.camelCase(t)
			}
			return this.each(function(e, r) {
				r.style[t] = n
			})
		},
		attr: function(t, n) {
			if(typeof n == "undefined") {
				return e.prop.get(this[0], t)
			}
			return this.each(function(r, i) {
				e.prop.set(i, t, n)
			})
		}
	})
}(NE);
! function() {
	var e = window["NE"] || {};
	e.dom = {
		before: function(t, n) {
			if(!t || !n) return;
			if(t.version) {
				t.each(function() {
					e.dom.before(this, n)
				});
				return
			}
			var r = n.parentNode;
			if(r) {
				r.insertBefore(t, n)
			}
		},
		after: function(t, n) {
			if(!t || !n) return;
			if(t.ntes) {
				t.each(function() {
					e.dom.after(this, n)
				})
			}
			var r = n.parentNode;
			if(r.lastChild == n) {
				r.appendChild(t)
			} else {
				r.insertBefore(t, n.nextSibling)
			}
		},
		remove: function(t) {
			if(!t || t.nodeType !== 1) {
				return
			}
			if(t.ntes) {
				t.each(function() {
					e.dom.remove(this)
				})
			}
			t.parentNode.removeChild(t)
		},
		append: function(t, n) {
			if(t.ntes) {
				t.each(function() {
					e.dom.append(this, n)
				})
			}
			if(t.nodeType !== 1) {
				return
			}
			n.appendChild(t)
		},
		ready: function(t, n) {
			if(e.type(t) === "function") {
				n = t;
				t = document;
				if(document.addEventListener) {
					document.addEventListener("DOMContentLoaded", n, false)
				} else {
					document.attachEvent("onreadystatechange", n)
				}
				return
			}
			if(e.type(t) === "array") {
				t.each(function() {
					e.dom.ready(this, n)
				})
			}
			if(!n) {
				return false
			}
			if(e.browser.msie) {
				t.onreadystatechange = function() {
					if(this.readyState == "complete" || this.readyState == "loaded") {
						n()
					}
				}
			} else {
				t.onload = function() {
					n()
				}
			}
		},
		mock: function(t, n, r, i) {
			var a = typeof t == "string";
			var o = a ? t : e.string.guid();
			var t = a ? e.$("#" + t) : t;
			var i = i || e.$("body")[0];
			if(!t) {
				var n = n || "div";
				var s = document.createElement(n);
				s.className = r || "";
				s.id = o;
				i.appendChild(s);
				t = s
			}
			return t
		}
	};
	window["NE"] = e;
	if(!e.fn) return;
	e.fn.extend({
		before: function(t) {
			return this.each(function() {
				e.dom.before(t.cloneNode(true), this)
			})
		},
		after: function(t) {
			return this.each(function() {
				e.dom.after(t.cloneNode(true), this)
			})
		},
		remove: function(t) {
			return this.each(function() {
				e.dom.remove(this)
			})
		},
		append: function(t) {
			return this.each(function() {
				if(t.selector) {
					t.each(function() {
						e.dom.append(this.cloneNode(true), this)
					})
				} else {
					e.dom.append(t.cloneNode(true), this)
				}
			})
		}
	});
	e.fn.extend({
		show: function() {
			return this.each(function() {
				this.style.display = "block"
			})
		},
		hide: function() {
			return this.each(function() {
				this.style.display = "none"
			})
		},
		html: function(e) {
			if(typeof e != "undefined") {
				return this.each(function() {
					this.innerHTML = e
				})
			}
			return this[0].innerHTML || ""
		}
	})
}();
! function() {
	var e = function() {
			var e = document.createElement("div");
			e.className = "a";
			return !!e.classList
		}(),
		t = window["NE"] || {};
	var n, r, i, a, o, s;
	s = {
		fillOpacity: true,
		fontWeight: true,
		lineHeight: true,
		opacity: true,
		orphans: true,
		widows: true,
		zIndex: true,
		zoom: true
	};

	function u(e, t) {
		if(e.nodeType !== 1 || typeof t !== "string") {
			return false
		}
		return true
	}
	if(e) {
		n = function(e, t) {
			if(u(e, t)) return e.classList.contains(t);
			else return false
		};
		r = function(e, t) {
			var n = 0,
				r;
			if(u(e, t)) {
				t = t.split(" ");
				while(r = t[n++]) {
					e.classList.add(r)
				}
			}
		};
		i = function(e, t) {
			var n = 0,
				r;
			if(u(e, t)) {
				t = t.split(" ");
				while(r = t[n++]) {
					e.classList.remove(r)
				}
			}
		};
		a = function(e, t) {
			if(u(e, t)) {
				e.classList.toggle(t)
			}
		}
	} else {
		n = function(e, t) {
			if(u(e, t)) return(" " + e.className + " ").indexOf(" " + t + " ") != -1;
			else return false
		};
		r = function(e, t) {
			if(u(e, t) && !n(e, t)) {
				e.className += (e.className ? " " : "") + t
			}
		};
		i = function(e, t) {
			if(u(e, t)) {
				e.className = e.className.replace(RegExp("\\b" + t + "\\b", "g"), "")
			}
		};
		a = function(e, t) {
			n(e, t) ? i(e, t) : r(e, t)
		}
	}
	o = function(e, t, n) {
		i(e, t);
		r(e, n)
	};
	t.classList = {
		contains: n,
		add: r,
		remove: i,
		toggle: a,
		replace: o,
		cssNumber: s,
		getStyle: function(e, n) {
			n = t.string.camelCase(n);
			if(e.currentStyle) {
				return e.currentStyle[n] || ""
			} else if(window.getComputedStyle) {
				return window.getComputedStyle(e, null)[n]
			}
		},
		setStyle: function(e, n) {
			if(typeof n == "string") {
				e.style.cssText += ";" + n
			} else if(typeof n == "object") {
				var r = {};
				for(var i in n) {
					var a = t.string.camelCase(i);
					if(typeof n[i] === "number" && !t.classList.cssNumber[i]) {
						n[i] = n[i] + "px"
					}
					e.style[a] = n[i]
				}
			}
		}
	};
	window["NE"] = t;
	if(!t.fn) return;
	t.fn.extend({
		addClass: function(e) {
			var n, r, i, a, o, s, u;
			if(t.isFunction(e)) {
				return this.each(function(n) {
					t(this).addClass(e.call(this, n, this.className))
				})
			}
			if(e && typeof e === "string") {
				for(r = 0, i = this.length; r < i; r++) {
					t.classList.add(this[r], e)
				}
			}
			return this
		},
		removeClass: function(e) {
			var n, r, i;
			if(t.isFunction(e)) {
				return this.each(function(t) {
					N(this).removeClass(e.call(this, t, this.className))
				})
			}
			if(e && typeof e === "string" || e === undefined) {
				for(r = 0, i = this.length; r < i; r++) {
					n = this[r];
					t.classList.remove(n, e)
				}
			}
			return this
		},
		toggleClass: function(e) {
			return this.each(function() {
				t.classList.toggle(this, e)
			})
		},
		hasClass: function(e) {
			var n = 0,
				r = this.length;
			for(; n < r; n++) {
				if(t.classList.contains(this[n], e)) {
					return true
				}
			}
			return false
		}
	})
}();