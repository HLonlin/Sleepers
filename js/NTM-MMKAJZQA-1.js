/* Generated By NetEase Analytic Manager */ ! function(t, e) {
	"object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.postscribe = e() : t.postscribe = e()
}(this, function() {
	return function(t) {
		function e(r) {
			if(n[r]) return n[r].exports;
			var o = n[r] = {
				exports: {},
				id: r,
				loaded: !1
			};
			return t[r].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports
		}
		var n = {};
		return e.m = t, e.c = n, e.p = "", e(0)
	}([function(t, e, n) {
		"use strict";
		var r = function(t) {
			return t && t.__esModule ? t : {
				default: t
			}
		}(n(1));
		t.exports = r.default
	}, function(t, e, n) {
		"use strict";

		function r() {}

		function o() {
			var t = f.shift();
			if(t) {
				var e = u.last(t);
				e.afterDequeue(), t.stream = i.apply(void 0, t), e.afterStreamStart()
			}
		}

		function i(t, e, n) {
			function i(t) {
				t = n.beforeWrite(t), h.write(t), n.afterWrite(t)
			}(h = new c.default(t, n)).id = p++, h.name = n.name || h.id, a.streams[h.name] = h;
			var u = t.ownerDocument,
				l = {
					close: u.close,
					open: u.open,
					write: u.write,
					writeln: u.writeln
				};
			s(u, {
				close: r,
				open: r,
				write: function() {
					for(var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
					return i(e.join(""))
				},
				writeln: function() {
					for(var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
					return i(e.join("") + "\n")
				}
			});
			var f = h.win.onerror || r;
			return h.win.onerror = function(t, e, r) {
				n.error({
					msg: t + " - " + e + ": " + r
				}), f.apply(h.win, [t, e, r])
			}, h.write(e, function() {
				s(u, l), h.win.onerror = f, n.done(), h = null, o()
			}), h
		}

		function a(t, e, n) {
			if(u.isFunction(n)) n = {
				done: n
			};
			else if("clear" === n) return f = [], h = null, void(p = 0);
			n = u.defaults(n, l);
			var i = [t = /^#/.test(t) ? window.document.getElementById(t.substr(1)) : t.jquery ? t[0] : t, e, n];
			return t.postscribe = {
				cancel: function() {
					i.stream ? i.stream.abort() : i[1] = r
				}
			}, n.beforeEnqueue(i), f.push(i), h || o(), t.postscribe
		}
		e.__esModule = !0;
		var s = Object.assign || function(t) {
			for(var e = 1; e < arguments.length; e++) {
				var n = arguments[e];
				for(var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
			}
			return t
		};
		e.default = a;
		var c = function(t) {
				return t && t.__esModule ? t : {
					default: t
				}
			}(n(2)),
			u = function(t) {
				if(t && t.__esModule) return t;
				var e = {};
				if(null != t)
					for(var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
				return e.default = t, e
			}(n(4)),
			l = {
				afterAsync: r,
				afterDequeue: r,
				afterStreamStart: r,
				afterWrite: r,
				autoFix: !0,
				beforeEnqueue: r,
				beforeWriteToken: function(t) {
					return t
				},
				beforeWrite: function(t) {
					return t
				},
				done: r,
				error: function(t) {
					throw new Error(t.msg)
				},
				releaseAsync: !1
			},
			p = 0,
			f = [],
			h = null;
		s(a, {
			streams: {},
			queue: f,
			WriteStream: c.default
		})
	}, function(t, e, n) {
		"use strict";

		function r(t, e) {
			if(!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
		}

		function o(t, e) {
			var n = u + e,
				r = t.getAttribute(n);
			return c.existy(r) ? String(r) : r
		}

		function i(t, e) {
			var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
				r = u + e;
			c.existy(n) && "" !== n ? t.setAttribute(r, n) : t.removeAttribute(r)
		}
		e.__esModule = !0;
		var a = Object.assign || function(t) {
				for(var e = 1; e < arguments.length; e++) {
					var n = arguments[e];
					for(var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
				}
				return t
			},
			s = function(t) {
				return t && t.__esModule ? t : {
					default: t
				}
			}(n(3)),
			c = function(t) {
				if(t && t.__esModule) return t;
				var e = {};
				if(null != t)
					for(var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
				return e.default = t, e
			}(n(4)),
			u = "data-ps-",
			l = "ps-style",
			p = "ps-script",
			f = function() {
				function t(e) {
					var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
					r(this, t), this.root = e, this.options = n, this.doc = e.ownerDocument, this.win = this.doc.defaultView || this.doc.parentWindow, this.parser = new s.default("", {
						autoFix: n.autoFix
					}), this.actuals = [e], this.proxyHistory = "", this.proxyRoot = this.doc.createElement(e.nodeName), this.scriptStack = [], this.writeQueue = [], i(this.proxyRoot, "proxyof", 0)
				}
				return t.prototype.write = function() {
					var t;
					for((t = this.writeQueue).push.apply(t, arguments); !this.deferredRemote && this.writeQueue.length;) {
						var e = this.writeQueue.shift();
						c.isFunction(e) ? this._callFunction(e) : this._writeImpl(e)
					}
				}, t.prototype._callFunction = function(t) {
					var e = {
						type: "function",
						value: t.name || t.toString()
					};
					this._onScriptStart(e), t.call(this.win, this.doc), this._onScriptDone(e)
				}, t.prototype._writeImpl = function(t) {
					this.parser.append(t);
					for(var e = void 0, n = void 0, r = void 0, o = [];
						(e = this.parser.readToken()) && !(n = c.isScript(e)) && !(r = c.isStyle(e));)(e = this.options.beforeWriteToken(e)) && o.push(e);
					o.length > 0 && this._writeStaticTokens(o), n && this._handleScriptToken(e), r && this._handleStyleToken(e)
				}, t.prototype._writeStaticTokens = function(t) {
					var e = this._buildChunk(t);
					return e.actual ? (e.html = this.proxyHistory + e.actual, this.proxyHistory += e.proxy, this.proxyRoot.innerHTML = e.html, this._walkChunk(), e) : null
				}, t.prototype._buildChunk = function(t) {
					for(var e = this.actuals.length, n = [], r = [], o = [], i = t.length, a = 0; a < i; a++) {
						var s = t[a],
							c = s.toString();
						if(n.push(c), s.attrs) {
							if(!/^noscript$/i.test(s.tagName)) {
								var f = e++;
								r.push(c.replace(/(\/?>)/, " " + u + "id=" + f + " $1")), s.attrs.id !== p && s.attrs.id !== l && o.push("atomicTag" === s.type ? "" : "<" + s.tagName + " " + u + "proxyof=" + f + (s.unary ? " />" : ">"))
							}
						} else r.push(c), o.push("endTag" === s.type ? c : "")
					}
					return {
						tokens: t,
						raw: n.join(""),
						actual: r.join(""),
						proxy: o.join("")
					}
				}, t.prototype._walkChunk = function() {
					for(var t = void 0, e = [this.proxyRoot]; c.existy(t = e.shift());) {
						var n = 1 === t.nodeType;
						if(!(n && o(t, "proxyof"))) {
							n && (this.actuals[o(t, "id")] = t, i(t, "id"));
							var r = t.parentNode && o(t.parentNode, "proxyof");
							r && this.actuals[r].appendChild(t)
						}
						e.unshift.apply(e, c.toArray(t.childNodes))
					}
				}, t.prototype._handleScriptToken = function(t) {
					var e = this,
						n = this.parser.clear();
					n && this.writeQueue.unshift(n), t.src = t.attrs.src || t.attrs.SRC, (t = this.options.beforeWriteToken(t)) && (t.src && this.scriptStack.length ? this.deferredRemote = t : this._onScriptStart(t), this._writeScriptToken(t, function() {
						e._onScriptDone(t)
					}))
				}, t.prototype._handleStyleToken = function(t) {
					var e = this.parser.clear();
					e && this.writeQueue.unshift(e), t.type = t.attrs.type || t.attrs.TYPE || "text/css", (t = this.options.beforeWriteToken(t)) && this._writeStyleToken(t), e && this.write()
				}, t.prototype._writeStyleToken = function(t) {
					var e = this._buildStyle(t);
					this._insertCursor(e, l), t.content && (e.styleSheet && !e.sheet ? e.styleSheet.cssText = t.content : e.appendChild(this.doc.createTextNode(t.content)))
				}, t.prototype._buildStyle = function(t) {
					var e = this.doc.createElement(t.tagName);
					return e.setAttribute("type", t.type), c.eachKey(t.attrs, function(t, n) {
						e.setAttribute(t, n)
					}), e
				}, t.prototype._insertCursor = function(t, e) {
					this._writeImpl('<span id="' + e + '"/>');
					var n = this.doc.getElementById(e);
					n && n.parentNode.replaceChild(t, n)
				}, t.prototype._onScriptStart = function(t) {
					t.outerWrites = this.writeQueue, this.writeQueue = [], this.scriptStack.unshift(t)
				}, t.prototype._onScriptDone = function(t) {
					return t !== this.scriptStack[0] ? void this.options.error({
						msg: "Bad script nesting or script finished twice"
					}) : (this.scriptStack.shift(), this.write.apply(this, t.outerWrites), void(!this.scriptStack.length && this.deferredRemote && (this._onScriptStart(this.deferredRemote), this.deferredRemote = null)))
				}, t.prototype._writeScriptToken = function(t, e) {
					var n = this._buildScript(t),
						r = this._shouldRelease(n),
						o = this.options.afterAsync;
					t.src && (n.src = t.src, this._scriptLoadHandler(n, r ? o : function() {
						e(), o()
					}));
					try {
						this._insertCursor(n, p), n.src && !r || e()
					} catch(t) {
						this.options.error(t), e()
					}
				}, t.prototype._buildScript = function(t) {
					var e = this.doc.createElement(t.tagName);
					return c.eachKey(t.attrs, function(t, n) {
						e.setAttribute(t, n)
					}), t.content && (e.text = t.content), e
				}, t.prototype._scriptLoadHandler = function(t, e) {
					function n() {
						t = t.onload = t.onreadystatechange = t.onerror = null
					}

					function r() {
						n(), null != e && e(), e = null
					}

					function o(t) {
						n(), s(t), null != e && e(), e = null
					}

					function i(t, e) {
						var n = t["on" + e];
						null != n && (t["_on" + e] = n)
					}
					var s = this.options.error;
					i(t, "load"), i(t, "error"), a(t, {
						onload: function() {
							if(t._onload) try {
								t._onload.apply(this, Array.prototype.slice.call(arguments, 0))
							} catch(e) {
								o({
									msg: "onload handler failed " + e + " @ " + t.src
								})
							}
							r()
						},
						onerror: function() {
							if(t._onerror) try {
								t._onerror.apply(this, Array.prototype.slice.call(arguments, 0))
							} catch(e) {
								return void o({
									msg: "onerror handler failed " + e + " @ " + t.src
								})
							}
							o({
								msg: "remote script failed " + t.src
							})
						},
						onreadystatechange: function() {
							/^(loaded|complete)$/.test(t.readyState) && r()
						}
					})
				}, t.prototype._shouldRelease = function(t) {
					return !/^script$/i.test(t.nodeName) || !!(this.options.releaseAsync && t.src && t.hasAttribute("async"))
				}, t
			}();
		e.default = f
	}, function(t, e, n) {
		! function(e, n) {
			t.exports = n()
		}(0, function() {
			return function(t) {
				function e(r) {
					if(n[r]) return n[r].exports;
					var o = n[r] = {
						exports: {},
						id: r,
						loaded: !1
					};
					return t[r].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports
				}
				var n = {};
				return e.m = t, e.c = n, e.p = "", e(0)
			}([function(t, e, n) {
				"use strict";
				var r = function(t) {
					return t && t.__esModule ? t : {
						default: t
					}
				}(n(1));
				t.exports = r.default
			}, function(t, e, n) {
				"use strict";

				function r(t) {
					if(t && t.__esModule) return t;
					var e = {};
					if(null != t)
						for(var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
					return e.default = t, e
				}

				function o(t, e) {
					if(!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}
				e.__esModule = !0;
				var i = r(n(2)),
					a = r(n(3)),
					s = function(t) {
						return t && t.__esModule ? t : {
							default: t
						}
					}(n(6)),
					c = n(5),
					u = {
						comment: /^<!--/,
						endTag: /^<\//,
						atomicTag: /^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,
						startTag: /^</,
						chars: /^[^<]/
					},
					l = function() {
						function t() {
							var e = this,
								n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
								r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
							o(this, t), this.stream = n;
							var a = !1,
								c = {};
							for(var u in i) i.hasOwnProperty(u) && (r.autoFix && (c[u + "Fix"] = !0), a = a || c[u + "Fix"]);
							a ? (this._readToken = (0, s.default)(this, c, function() {
								return e._readTokenImpl()
							}), this._peekToken = (0, s.default)(this, c, function() {
								return e._peekTokenImpl()
							})) : (this._readToken = this._readTokenImpl, this._peekToken = this._peekTokenImpl)
						}
						return t.prototype.append = function(t) {
							this.stream += t
						}, t.prototype.prepend = function(t) {
							this.stream = t + this.stream
						}, t.prototype._readTokenImpl = function() {
							var t = this._peekTokenImpl();
							if(t) return this.stream = this.stream.slice(t.length), t
						}, t.prototype._peekTokenImpl = function() {
							for(var t in u)
								if(u.hasOwnProperty(t) && u[t].test(this.stream)) {
									var e = a[t](this.stream);
									if(e) return "startTag" === e.type && /script|style/i.test(e.tagName) ? null : (e.text = this.stream.substr(0, e.length), e)
								}
						}, t.prototype.peekToken = function() {
							return this._peekToken()
						}, t.prototype.readToken = function() {
							return this._readToken()
						}, t.prototype.readTokens = function(t) {
							for(var e = void 0; e = this.readToken();)
								if(t[e.type] && !1 === t[e.type](e)) return
						}, t.prototype.clear = function() {
							var t = this.stream;
							return this.stream = "", t
						}, t.prototype.rest = function() {
							return this.stream
						}, t
					}();
				e.default = l, l.tokenToString = function(t) {
					return t.toString()
				}, l.escapeAttributes = function(t) {
					var e = {};
					for(var n in t) t.hasOwnProperty(n) && (e[n] = (0, c.escapeQuotes)(t[n], null));
					return e
				}, l.supports = i;
				for(var p in i) i.hasOwnProperty(p) && (l.browserHasFlaw = l.browserHasFlaw || !i[p] && p)
			}, function(t, e) {
				"use strict";
				e.__esModule = !0;
				var n = !1,
					r = !1,
					o = window.document.createElement("div");
				try {
					var i = "<P><I></P></I>";
					o.innerHTML = i, e.tagSoup = n = o.innerHTML !== i
				} catch(t) {
					e.tagSoup = n = !1
				}
				try {
					o.innerHTML = "<P><i><P></P></i></P>", e.selfClose = r = 2 === o.childNodes.length
				} catch(t) {
					e.selfClose = r = !1
				}
				o = null, e.tagSoup = n, e.selfClose = r
			}, function(t, e, n) {
				"use strict";

				function r(t) {
					if(-1 !== t.indexOf(">")) {
						var e = t.match(a.startTag);
						if(e) {
							var n = function() {
								var t = {},
									n = {},
									r = e[2];
								return e[2].replace(a.attr, function(e, o) {
									arguments[2] || arguments[3] || arguments[4] || arguments[5] ? arguments[5] ? (t[arguments[5]] = "", n[arguments[5]] = !0) : t[o] = arguments[2] || arguments[3] || arguments[4] || a.fillAttr.test(o) && o || "" : t[o] = "", r = r.replace(e, "")
								}), {
									v: new i.StartTagToken(e[1], e[0].length, t, n, !!e[3], r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""))
								}
							}();
							if("object" === (void 0 === n ? "undefined" : o(n))) return n.v
						}
					}
				}
				e.__esModule = !0;
				var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
					return typeof t
				} : function(t) {
					return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
				};
				e.comment = function(t) {
					var e = t.indexOf("--\x3e");
					if(e >= 0) return new i.CommentToken(t.substr(4, e - 1), e + 3)
				}, e.chars = function(t) {
					var e = t.indexOf("<");
					return new i.CharsToken(e >= 0 ? e : t.length)
				}, e.startTag = r, e.atomicTag = function(t) {
					var e = r(t);
					if(e) {
						var n = t.slice(e.length);
						if(n.match(new RegExp("</\\s*" + e.tagName + "\\s*>", "i"))) {
							var o = n.match(new RegExp("([\\s\\S]*?)</\\s*" + e.tagName + "\\s*>", "i"));
							if(o) return new i.AtomicTagToken(e.tagName, o[0].length + e.length, e.attrs, e.booleanAttrs, o[1])
						}
					}
				}, e.endTag = function(t) {
					var e = t.match(a.endTag);
					if(e) return new i.EndTagToken(e[1], e[0].length)
				};
				var i = n(4),
					a = {
						startTag: /^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
						endTag: /^<\/([\-A-Za-z0-9_]+)[^>]*>/,
						attr: /(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g,
						fillAttr: /^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i
					}
			}, function(t, e, n) {
				"use strict";

				function r(t, e) {
					if(!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}
				e.__esModule = !0, e.EndTagToken = e.AtomicTagToken = e.StartTagToken = e.TagToken = e.CharsToken = e.CommentToken = e.Token = void 0;
				var o = n(5),
					i = (e.Token = function t(e, n) {
						r(this, t), this.type = e, this.length = n, this.text = ""
					}, e.CommentToken = function() {
						function t(e, n) {
							r(this, t), this.type = "comment", this.length = n || (e ? e.length : 0), this.text = "", this.content = e
						}
						return t.prototype.toString = function() {
							return "\x3c!--" + this.content
						}, t
					}(), e.CharsToken = function() {
						function t(e) {
							r(this, t), this.type = "chars", this.length = e, this.text = ""
						}
						return t.prototype.toString = function() {
							return this.text
						}, t
					}(), e.TagToken = function() {
						function t(e, n, o, i, a) {
							r(this, t), this.type = e, this.length = o, this.text = "", this.tagName = n, this.attrs = i, this.booleanAttrs = a, this.unary = !1, this.html5Unary = !1
						}
						return t.formatTag = function(t) {
							var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
								n = "<" + t.tagName;
							for(var r in t.attrs)
								if(t.attrs.hasOwnProperty(r)) {
									n += " " + r;
									var i = t.attrs[r];
									void 0 !== t.booleanAttrs && void 0 !== t.booleanAttrs[r] || (n += '="' + (0, o.escapeQuotes)(i) + '"')
								}
							return t.rest && (n += " " + t.rest), n += t.unary && !t.html5Unary ? "/>" : ">", void 0 !== e && null !== e && (n += e + "</" + t.tagName + ">"), n
						}, t
					}());
				e.StartTagToken = function() {
					function t(e, n, o, i, a, s) {
						r(this, t), this.type = "startTag", this.length = n, this.text = "", this.tagName = e, this.attrs = o, this.booleanAttrs = i, this.html5Unary = !1, this.unary = a, this.rest = s
					}
					return t.prototype.toString = function() {
						return i.formatTag(this)
					}, t
				}(), e.AtomicTagToken = function() {
					function t(e, n, o, i, a) {
						r(this, t), this.type = "atomicTag", this.length = n, this.text = "", this.tagName = e, this.attrs = o, this.booleanAttrs = i, this.unary = !1, this.html5Unary = !1, this.content = a
					}
					return t.prototype.toString = function() {
						return i.formatTag(this, this.content)
					}, t
				}(), e.EndTagToken = function() {
					function t(e, n) {
						r(this, t), this.type = "endTag", this.length = n, this.text = "", this.tagName = e
					}
					return t.prototype.toString = function() {
						return "</" + this.tagName + ">"
					}, t
				}()
			}, function(t, e) {
				"use strict";
				e.__esModule = !0, e.escapeQuotes = function(t) {
					var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
					return t ? t.replace(/([^"]*)"/g, function(t, e) {
						return /\\/.test(e) ? e + '"' : e + '\\"'
					}) : e
				}
			}, function(t, e) {
				"use strict";

				function n(t) {
					return t && "startTag" === t.type && (t.unary = a.test(t.tagName) || t.unary, t.html5Unary = !/\/>$/.test(t.text)), t
				}

				function r(t, e) {
					var r = t.stream,
						o = n(e());
					return t.stream = r, o
				}

				function o(t, e) {
					var n = e.pop();
					t.prepend("</" + n.tagName + ">")
				}

				function i() {
					var t = [];
					return t.last = function() {
						return this[this.length - 1]
					}, t.lastTagNameEq = function(t) {
						var e = this.last();
						return e && e.tagName && e.tagName.toUpperCase() === t.toUpperCase()
					}, t.containsTagName = function(t) {
						for(var e, n = 0; e = this[n]; n++)
							if(e.tagName === t) return !0;
						return !1
					}, t
				}
				e.__esModule = !0, e.default = function(t, e, a) {
					function c() {
						var e = r(t, a);
						e && l[e.type] && l[e.type](e)
					}
					var u = i(),
						l = {
							startTag: function(n) {
								var r = n.tagName;
								"TR" === r.toUpperCase() && u.lastTagNameEq("TABLE") ? (t.prepend("<TBODY>"), c()) : e.selfCloseFix && s.test(r) && u.containsTagName(r) ? u.lastTagNameEq(r) ? o(t, u) : (t.prepend("</" + n.tagName + ">"), c()) : n.unary || u.push(n)
							},
							endTag: function(n) {
								u.last() ? e.tagSoupFix && !u.lastTagNameEq(n.tagName) ? o(t, u) : u.pop() : e.tagSoupFix && (a(), c())
							}
						};
					return function() {
						return c(), n(a())
					}
				};
				var a = /^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i,
					s = /^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i
			}])
		})
	}, function(t, e) {
		"use strict";

		function n(t) {
			return void 0 !== t && null !== t
		}

		function r(t, e, n) {
			var r = void 0,
				o = t && t.length || 0;
			for(r = 0; r < o; r++) e.call(n, t[r], r)
		}

		function o(t, e, n) {
			for(var r in t) t.hasOwnProperty(r) && e.call(n, r, t[r])
		}

		function i(t, e) {
			return !(!t || "startTag" !== t.type && "atomicTag" !== t.type || !("tagName" in t) || !~t.tagName.toLowerCase().indexOf(e))
		}
		e.__esModule = !0;
		var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
			return typeof t
		} : function(t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		};
		e.existy = n, e.isFunction = function(t) {
			return "function" == typeof t
		}, e.each = r, e.eachKey = o, e.defaults = function(t, e) {
			return t = t || {}, o(e, function(e, r) {
				n(t[e]) || (t[e] = r)
			}), t
		}, e.toArray = function(t) {
			try {
				return Array.prototype.slice.call(t)
			} catch(n) {
				var e = function() {
					var e = [];
					return r(t, function(t) {
						e.push(t)
					}), {
						v: e
					}
				}();
				if("object" === (void 0 === e ? "undefined" : a(e))) return e.v
			}
		}, e.last = function(t) {
			return t[t.length - 1]
		}, e.isTag = i, e.isScript = function(t) {
			return i(t, "script")
		}, e.isStyle = function(t) {
			return i(t, "style")
		}
	}])
}),
function(t, e) {
	function n(t, e) {
		for(; t && 9 !== t.nodeType;) {
			if(f.call(t, e)) return t;
			t = t.parentNode
		}
	}

	function r(t, e, r, o) {
		return function(r) {
			r.delegateTarget = n(r.target, e), r.delegateTarget && o.call(t, r)
		}
	}
	var o = {},
		i = {
			"antanalysis.js": !1,
			"html.complete": !1
		},
		a = !1,
		s = function() {
			document.removeEventListener("DOMContentLoaded", s), window.removeEventListener("load", s), i["html.complete"] = !0, c()
		},
		c = function() {
			if(!a && !0 === i["antanalysis.js"] && !0 === i["html.complete"]) {
				var e;
				"function" == typeof window.Event ? e = new Event("NTMReady") : (e = document.createEvent("CustomEvent")).initCustomEvent("NTMReady", !1, !1, void 0), t.dispatchEvent(e), a = !0
			}
		};
	if(window.NTESAntAnalysis) i["antanalysis.js"] = !0, c();
	else {
		var u = document.getElementsByTagName("script")[0],
			l = document.createElement("script");
		l.async = !0, l.src = "//static.ws.126.net/utf8/3g/util/antanalysis.min.js", u.parentNode.insertBefore(l, u), l.onload = function() {
			i["antanalysis.js"] = !0, c()
		}
	}
	"complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? (i["html.complete"] = !0, window.setTimeout(c)) : (document.addEventListener("DOMContentLoaded", s), window.addEventListener("load", s));
	var p = window.document.documentElement,
		f = p.matches || p.matchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector || p.webkitMatchesSelector || function(t) {
			for(var e = document.querySelectorAll(t), n = e.length; --n >= 0 && e.item(n) !== this;);
			return n > -1
		};
	o.clickEventName = function() {
		var t = !1;
		return function(e) {
			(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0)
		}(navigator.userAgent || navigator.vendor || window.opera), t
	}() ? "touchstart" : "click", o.initialPath = window.location.pathname, o.delegate = function(t, e, n, o, i) {
		var a = r.apply(this, arguments);
		return t.addEventListener(n, a, i), {
			destroy: function() {
				t.removeEventListener(n, a, i)
			}
		}
	}, o.html = postscribe, o.varFuncError = function(t) {
		return console.error(t, "自定义变量错误！"), -1
	}, o.getCookie = function(t) {
		var e = ("; " + document.cookie).split("; " + t + "=");
		if(2 == e.length) return e.pop().split(";").shift()
	}, o.getSearch = function(t) {
		var e = window.location.href;
		t = t.replace(/[\[\]]/g, "\\$&");
		var n = new RegExp("[?&]" + t + "(=([^&#]*)|&|#|$)").exec(e);
		if(!n || !n[2]) return "";
		var r = decodeURIComponent(n[2].replace(/\+/g, " "));
		return isNaN(r) ? r : new Number(r)
	}, t.ntm = o
}(window, document), window.addEventListener("NTMReady", function() {
	NTESAntAnalysis.sendData({
		val_nm: "c-ntm",
		val_act: "pageview",
		projectid: "NTM-MMKAJZQA-1"
	})
});