! function(e, n, i) {
	if(!e.AppCore) {
		e.AppCore = {
			getAppName: function(e) {
				var n = o.is();
				return e ? n : n[0]
			},
			getOSName: function() {
				return r.os
			},
			reg: function(e, n, i) {
				return o.reg(e, n, i), this
			}
		};
		var t = e.navigator.userAgent.toLowerCase(),
			r = {
				ua: t,
				os: /(?:iphone|ipad|ipod)/.test(t) ? "ios" : /(?:android|adr )/.test(t) ? "android" : "other",
				sendCmd: function(i, t) {
					if(r.__lastCmd !== i) {
						if(r.__lastCmd = i, e.setTimeout(function() {
								r.__lastCmd = ""
							}, 500), "href" === t) return void(e.location.href = i);
						var o = n.getElementById("__cmdFrame");
						o || (o = n.createElement("iframe"), o.id = "__cmdFrame", n.body.appendChild(o), o.style.display = "none"), o.src = i
					}
				},
				checkShareObj: function(t) {
					var r = i.isFunction(t) ? t() || {} : t,
						o = r.img = (r.img || r.image || "").replace(/^\/\//, e.location.protocol + "//");
					return o && !/^http/i.test(o) && (r.img = n.URL.match("/" == o.substr(0, 1) ? /^http.+?\/\/[^\/]+/ : /^http.+?\/\/.+\//)[0] + o), i.extend({
						title: n.title,
						link: r.url || n.URL,
						desc: r.des || r.content || n.title,
						get: function() {
							var e, n = arguments,
								t = this;
							return i.each(n, function(n, i) {
								e = e || t[i]
							}), e
						}
					}, r)
				},
				showLayout: function(t) {
					var o = "shareBoxLayout";
					i("#" + o + ",#shareBoxImgLoading").remove(), i(n.body).append('<div id="' + o + '"></div>');
					var a = i("#" + o).addClass("appShare_" + t);
					e.setTimeout(function() {
						a.click(r.hideLayout)
					}, 500)
				},
				hideLayout: function() {
					i("#shareBoxLayout").remove()
				},
				preloadLayout: function() {
					i("#shareBoxImgLoading")[0] || i(function() {
						i(n.body).append('<div id="shareBoxImgLoading"></div>')
					})
				}
			},
			o = {
				cache: {},
				cacheIndex: [],
				reg: function(e, n, t) {
					"boolean" != typeof e && (t = n, n = e, e = !1);
					var r = this.cache[n],
						a = {};
					r || (this.cacheIndex.push(n), r = this.cache[n] = {}), i.extend(r, t || {}), i.each(r, function(n, t) {
						!/^(?:is|version|ready)$/.test(n) && 0 !== n.indexOf("_") && i.isFunction(t) && (e && (a[n] = t), o.extendCore(n)), 1 === {
							version: 1,
							ready: 1
						}[n] && (a[n] = t)
					}), AppCore[n] = AppCore[n] || {}, i.extend(AppCore[n], a)
				},
				is: function() {
					var e = [],
						n = o.cache;
					return i.each(this.cacheIndex, function(t, o) {
						var a = n[o];
						i.isFunction(a.is) && a.is(r.ua, r.os) === !0 && e.push(o)
					}), e
				},
				findAppOwnMethod: function(e) {
					var n, t = o.cache;
					return i.each(o.is(), function(r, o) {
						return i.isFunction(t[o][e]) ? (n = o, !1) : void 0
					}), n
				},
				extendCore: function(e) {
					if(e && !AppCore[e] && 0 !== e.indexOf("_")) {
						var n = o.hooks[e] || {};
						AppCore[e] = function() {
							var i = o.findAppOwnMethod(e),
								t = Array.prototype.slice.call(arguments, 0);
							if(!i) return n.defaultFn ? n.defaultFn.apply(this, t) : 0;
							var r = o.cache[i][e];
							return n.run ? n.run.apply(this, [r, i].concat(t)) : (r.apply(this, t), this)
						}
					}
				},
				hooks: {
					sendCmd: {
						defaultFn: function(e, n) {
							r.sendCmd(e, n || "iframe")
						}
					},
					login: {
						defaultFn: function() {
							alert("\u5f53\u524d\u73af\u5883\u4e0d\u652f\u6301\u767b\u5f55")
						},
						run: function(t, r, o, a, s) {
							i.isFunction(o) && (s = a, a = o, o = 0);
							var p = {
								success: i.isFunction(a) ? a : function() {
									e.location.href = o
								},
								fail: i.isFunction(s) ? s : function() {}
							};
							t(o = o || n.URL, function(e, n) {
								"success" === e ? p.success(n) : p.fail(e)
							})
						}
					},
					share: {
						defaultFn: function() {
							alert("\u5f53\u524d\u73af\u5883\u6682\u65f6\u4e0d\u652f\u6301\u5206\u4eab")
						},
						run: function(e, t, a, s) {
							var p = o.cache[t],
								c = i.isFunction(p.shareNow) ? p.shareNow : o.hooks.share.notSupport;
							AppCore.helper.loadTextCss("#shareBoxImgLoading,#shareBoxLayout{position:fixed;z-index:99999;left:0;top:0;width:100%;height:100%;background:url(http://pimg1.126.net/mail/AppCore/bin/css/img/share.png) 87% 5% no-repeat rgba(0,0,0,.7);background-size:75% auto}#shareBoxImgLoading{position:absolute;width:1px;height:1px;left:-9999px;top:-9999px}.share,[cmd=share]{cursor:pointer}"), e(function() {
								return r.checkShareObj(a)
							}, function(e, n) {
								i.isFunction(s) && s(!!{
									ok: 1,
									confirm: 1,
									"true": 1
								}[e], n)
							}), o.hooks.share.shareNow = c, this.bindDocListen || a.initOnly || (this.bindDocListen = 1, i(n).ready(function() {
								i(n.body).delegate(".share,a[href*='#share'],a[href='share://'],[cmd=share]", "click", function(e) {
									o.hooks.share.shareNow(e), e.preventDefault()
								})
							}))
						}
					}
				}
			};
		AppCore.helper = {
			showLayout: r.showLayout,
			hideLayout: r.hideLayout,
			preloadLayout: r.preloadLayout,
			os: r.os,
			ua: r.ua,
			loadTextCss: function(e) {
				if(e) {
					var i = n.createElement("style"),
						t = n.head || n.getElementsByTagName("head")[0],
						r = n.createTextNode(e);
					i.type = "text/css", i.appendChild(r), t.appendChild(i)
				}
			}
		}, i.each("getUrlPara removeUrlPara format".split(" "), function(n, t) {
			var r = i[t] || (e.AppCoreTools || {})[t];
			r && !AppCore.helper[t] && (AppCore.helper[t] = r)
		}), o.extendCore("sendCmd"), i(n).ready(function() {
			i(n.body).delegate("*[cmd]", "click", function(t) {
				var a = i(this).attr("cmd");
				if("share" != a) {
					var s = e.appId || n.body.id,
						p = o.is()[0];
					r.sendCmd(a), p && p === s && t.preventDefault()
				}
			})
		})
	}
}(window, window.document, window.Zepto || window.jQuery),
function(e, n) {
	var i = n || {
			each: function(e, n) {
				for(var i = 0; i < e.length; i++) n(i, e[i])
			},
			map: function(e, n) {
				for(var i = 0; i < e.length; i++) e[i] = n(e[i], i)
			}
		},
		t = function(e, n) {
			var t = {};
			return i.each(("" + e).match(/([^=&#\?]+)=[^&#]+/g) || [], function(e, n) {
				var i = n.split("="),
					r = decodeURIComponent(i[1]);
				void 0 !== t[i[0]] ? t[i[0]] += "," + r : t[i[0]] = r
			}), n ? t[n] || "" : t
		},
		r = {
			getUrlPara: function(n) {
				var i = e.location.search.replace(/^\?/g, ""),
					r = i;
				try {
					r = decodeURI(i)
				} catch(o) {
					r = i.replace(/"%26"/g, "&")
				}
				return t(r, n)
			},
			removeUrlPara: function(e, n) {
				var t = e.split("#"),
					r = t[0].split("?"),
					o = r[0],
					a = r.length > 1 ? r[1] : "",
					s = t.length > 1 ? "#" + t[1] : "",
					p = "string" == typeof n && n ? [n] : n.join ? n : [];
				return p.length && a ? (i.map(p, function(e) {
					return e.replace(/([\\\(\)\{\}\[\]\^\$\+\-\*\?\|])/g, "\\$1")
				}), (o + "?" + a.replace(new RegExp("(?:^|&)(?:" + p.join("|") + ")=[^&$]+", "g"), "").replace(/^&/, "")).replace(/\?$/, "") + s) : o.replace(/\?.+$/, "") + s
			},
			format: function(e) {
				var n = /\{([\w\.]+)\}/g,
					i = /^\d+$/,
					t = n.compile ? n.compile(n.source, "g") || n : n,
					r = Object.prototype.toString,
					o = Array.prototype.slice;
				return function(n, a) {
					if(a === e || null === a) return n;
					var s = !0,
						p = r.call(a),
						c = "[object Object]" === p ? (s = !1, a) : "[object Array]" === p ? a : o.call(arguments, 1),
						u = s ? c.length : 0;
					return String(n).replace(t, function(n, t) {
						var r, o, a, p = i.test(t);
						if(p && s) return r = parseInt(t, 10), u > r ? c[r] : n;
						o = t.split("."), a = c;
						for(var d = 0; d < o.length; d++) a = a[o[d]];
						return a === e ? n : a
					})
				}
			}()
		};
	n ? (n.extend(n, r), n.extend(e.AppCore ? AppCore.helper : {}, r)) : e.AppCoreTools = r
}(window, window.jQuery || window.Zepto), AppCore.reg("weixin", {
		is: function(e) {
			return e.indexOf("micromessenger") >= 0
		},
		version: function() {
			if(/micromessenger\/(\d+)\.([\d\.]+)/.test(AppCore.helper.ua)) {
				var e = RegExp.$1,
					n = RegExp.$2.replace(/\./g, "");
				return +(e + "." + n)
			}
		},
		ready: function(e) {
			return window.WeixinJSBridge ? e(WeixinJSBridge) : void document.addEventListener("WeixinJSBridgeReady", function() {
				e(window.WeixinJSBridge)
			}, !1)
		}
	}),
	function() {
		var e, n, i = function(n) {
				var i = e();
				switch(n) {
					case "timeline":
						return {
							title: i.get("wxtTitle", "wxTitle", "imTitle", "title"),
							link: i.get("wxtLink", "wxLink", "imLink", "link"),
							desc: i.get("wxtDesc", "wxDesc", "imDesc", "desc"),
							img_url: i.get("wxtImg", "wxImg", "imImg", "img")
						};
					case "appmessage":
					case "qq":
						return {
							title: i.get("wxTitle", "imTitle", "title"),
							link: i.get("wxLink", "imLink", "link"),
							desc: i.get("wxDesc", "imDesc", "desc"),
							img_url: i.get("wxImg", "imImg", "img")
						}
				}
				return i
			},
			t = function() {},
			r = function() {
				var e = function() {
					return n.apply(this, arguments)
				};
				AppCore.weixin.ready(function(n) {
					n && (n.call("showOptionMenu"), n.on("menu:share:timeline", function() {
						AppCore.helper.hideLayout(), n.invoke("shareTimeline", i("timeline"), e)
					}), n.on("menu:share:appmessage", function() {
						AppCore.helper.hideLayout(), n.invoke("sendAppMessage", i("appmessage"), e)
					}), n.on("menu:share:qq", function() {
						AppCore.helper.hideLayout(), n.invoke("shareQQ", i("qq"), e)
					}))
				}), AppCore.helper.preloadLayout(), r = function() {}
			};
		AppCore.reg("weixin", {
			share: function(i, o) {
				e = i, n = function(e) {
					var n = "error";
					/^(?:.+):(cancel|fail|ok)/.test(e.err_msg) && (n = RegExp.$1), o(n, e.err_msg)
				}, t(), r()
			},
			shareNow: function() {
				t(), AppCore.helper.showLayout("weixin")
			}
		}), AppCore.reg(!0, "weixin", {
			updateShareInfo: t
		})
	}(window.jQuery || window.Zepto), AppCore.reg("yixin", {
		is: function(e) {
			return e.indexOf("yixin") >= 0
		},
		ready: function(e) {
			return window.YixinJSBridge ? e(YixinJSBridge) : void document.addEventListener("YixinJSBridgeReady", function() {
				e(window.YixinJSBridge)
			}, !1)
		}
	}),
	function() {
		var e, n, i = function() {
				var n = e();
				window.shareData = {
					imgUrl: n.img,
					fTitle: n.get("wxTitle", "imTitle", "title"),
					fImgUrl: n.get("wxImg", "imImg", "img"),
					sendFriendLink: n.get("wxLink", "imLink", "link"),
					fContent: n.get("wxDesc", "imDesc", "desc"),
					tTitle: n.get("wxtTitle", "wxTitle", "imTitle", "title"),
					tImgUrl: n.get("wxtImg", "wxImg", "imImg", "img"),
					timeLineLink: n.get("wxtLink", "wxLink", "imLink", "link"),
					tContent: n.get("wxtDesc", "wxDesc", "imDesc", "desc"),
					wImgUrl: n.get("wbImg", "img"),
					weiboLink: n.get("wbLink", "link"),
					wContent: n.get("wbDesc", "desc")
				}
			},
			t = function() {
				var i = function() {
					return n.apply(this, arguments)
				};
				AppCore.yixin.ready(function(n) {
					n && (n.on("menu:share:timeline", function() {
						var t = e();
						AppCore.helper.hideLayout(), n.invoke("shareTimeline", {
							title: t.get("yxtTitle", "yxTitle", "imTitle", "title"),
							link: t.get("yxtLink", "yxLink", "imLink", "link"),
							desc: t.get("yxtDesc", "yxDesc", "imDesc", "desc"),
							img_url: t.get("yxtImg", "yxImg", "imImg", "img")
						}, i)
					}), n.on("menu:share:appmessage", function() {
						var t = e();
						AppCore.helper.hideLayout(), n.invoke("sendAppMessage", {
							title: t.get("yxTitle", "imTitle", "title"),
							link: t.get("yxLink", "imLink", "link"),
							desc: t.get("yxDesc", "imDesc", "desc"),
							img_url: t.get("yxImg", "imImg", "img")
						}, i)
					}))
				}), AppCore.helper.preloadLayout(), t = function() {}
			};
		AppCore.reg("yixin", {
			share: function(r, o) {
				e = r, n = function(e) {
					var n = "error";
					/^(?:.+):(cancel|fail|ok)/.test(e.err_msg) && (n = RegExp.$1), o(n, e.err_msg)
				}, i(), t()
			},
			shareNow: function() {
				i(), AppCore.helper.showLayout("yixin")
			}
		}), AppCore.reg(!0, "yixin", {
			updateShareInfo: i
		})
	}(window.jQuery || window.Zepto), AppCore.reg("newsapp", {
		is: function(e) {
			return e.indexOf("newsapp") > 0
		},
		version: function() {
			var e, n = AppCore.helper.ua;
			return /newsapp\/(\d+)\.(\d*)/.test(n) && (e = +(RegExp.$1 + "." + RegExp.$2)), e
		}
	}),
	function(e) {
		var n = AppCore.newsapp.version() >= 3.9,
			i = function() {},
			t = function(e, n) {
				var i = e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
				return n ? i.replace(/=&quot;(.*?)&quot;/g, '="$1"').replace(/=&#39;(.*?)&#39;/g, "='$1'") : i.replace(/</g, "&lt;").replace(/>/g, "&gt;")
			},
			r = function() {
				var n = i();
				n && (e("#__newsShareInfo").remove(), e(document.body).prepend("<div style='display:none' id='__newsShareInfo'></div>"), e("#__newsShareInfo").html(["<div id='__newsapp_sharetext'>\/\/分享:" + t(n.desc) + " " + n.link + "</div>", "<div id='__newsapp_sharephotourl'>" + n.img + "</div>", "<div id='__newsapp_sharewxtitle'>" + t(n.get("wxtTitle", "wxTitle", "imTitle", "title")) + "</div>", "<div id='__newsapp_sharewxtext'>" + t(n.get("wxtDesc", "wxDesc", "imDesc", "desc")) + "</div>", "<div id='__newsapp_sharewxurl'>" + n.get("wxtLink", "wxLink", "imLink", "link") + "</div>", "<div id='__newsapp_sharewxthumburl'>" + n.get("wxtImg", "wxImg", "imImg", "img") + "</div>"].join("")))
			};
		AppCore.reg("newsapp", {
			share: function(n, t) {
				i = n, e(document).ready(r), window.__newsapp_share_done = function() {
					t("ok")
				}
			},
			shareNow: function() {
				return n ? (r(), void AppCore.sendCmd("share://")) : void AppCore.helper.showLayout("newsapp")
			}
		}), AppCore.reg(!0, "newsapp", {
			updateShareInfo: r
		}), "newsapp" === AppCore.getAppName() && e(function() {
			e("#__newsapp_sharetext")[0] || e(document.body).prepend("<div style='display:none' id='__newsShareInfo'><div id='__newsapp_sharetext'>" + t(document.title) + " " + document.URL + "</div></div>")
		})
	}(window.Zepto || window.jQuery), AppCore.reg("caipiao", {
		is: function(e) {
			return e.indexOf("cpclient") > 0 || e.indexOf("cp_client") > 0
		},
		version: function(e) {
			var n = AppCore.helper,
				i = 0,
				t = 0;
			return /cpclient\/[^\/]+\/([^\/]+)\/(\d+)/.test(n.ua) && (i = RegExp.$1, t = +RegExp.$2), e ? i : t
		},
		ready: function(e) {
			if(window.CPJsApi) return e(CPJsApi);
			var n = AppCore.caipiao.version() > {
				ios: 392,
				android: 4020
			}[AppCore.helper.os];
			n ? document.addEventListener("CPJsBridgeReady", function() {
				e(window.CPJsApi)
			}) : $(function() {
				e(window.CPJsApi)
			})
		}
	}),
	function() {
		var e, n = !1;
		AppCore.reg("caipiao", {
			share: function(i, t) {
				n = AppCore.caipiao.version() > {
					ios: 314,
					android: 3320
				}[AppCore.helper.os], n && (e = i, window.Methods = window.Methods || {}, window.Methods.cpShareCb = function(e) {
					var n = "error",
						i = "unknown";
					/^(?:sharetype=)*(.+):(cancel|fail|ok)/i.test(e + "") && (n = RegExp.$2, i = RegExp.$1), t(n, i)
				})
			},
			shareNow: function() {
				if(!n) return void alert("\u5ba2\u6237\u7aef\u7248\u672c\u592a\u4f4e\uff0c\u4e0d\u652f\u6301\u5206\u4eab\u529f\u80fd\uff01");
				var i = e(),
					t = AppCore.helper.removeUrlPara(i.link, ["token", "udid", "sessionId", "username", "userName"]),
					r = encodeURIComponent,
					o = ["ntescaipiao://share?type=1", "&linkUrl=" + r(t), "&jsCallback=cpShareCb", "&logo=" + r(i.img), "&title=" + r(i.title), "&content=" + r(i.desc || i.title || " "), "&showCircle=1"].join("");
				AppCore.sendCmd(o)
			}
		})
	}(),
	function(e) {
		AppCore.reg("trip", {
			is: function(e) {
				return e.indexOf("train163") > 0
			},
			version: function(e) {
				var n, i = AppCore.helper,
					t = 0;
				if(/train163internal\(([\.\d]+)\)/i.test(i.ua)) {
					n = RegExp.$1, t = n.split(".");
					for(var r = 0, o = t.length; o > r; r++) t[r] = +t[r]
				}
				return e ? n : t
			},
			ready: function(i) {
				var t = 3 == n || 12 == n;
				return window.mapp ? i(mapp) : void(t ? document.addEventListener("LDJSBridgeReady", function() {
					i(window.mapp)
				}) : e(function() {
					i(window.mapp)
				}))
			}
		});
		var n = function() {
			var e = AppCore.trip.version(),
				n = AppCore.helper.os;
			return "ios" === n ? e[0] > 3 || 3 == e[0] && e[1] >= 0 ? 3 : e[0] > 2 || 2 == e[0] && e[1] >= 7 ? 2 : 1 : "android" === n ? e[0] > 2 || 2 == e[0] && e[1] >= 11 ? 12 : 11 : 0
		}()
	}(window.Zepto || window.jQuery),
	function(e) {
		var n, i, t = encodeURIComponent,
			r = function() {
				var e = n(),
					i = ["train163://share?", "stateWX=" + t(e.get("statewxt", "wxtDesc", "statewx", "wxDesc", "imDesc", "desc")), "&title=" + t(e.title), "&shareContent=" + t(e.desc), "&stateYX=" + t(e.get("stateyxt", "yxtDesc", "stateyx", "yxDesc", "imDesc", "desc")), "&stateSMS=" + t(e.get("statesms", "smsDesc", "desc")), "&stateWB=" + t(e.get("statewb", "wbDesc", "desc")), "&wxJumpUrl=" + t(e.get("wxjumpurl", "wxtLink", "wxLink", "imLink", "link")), "&yxJumpUrl=" + t(e.get("yxjumpurl", "yxtLink", "yxLink", "imLink", "link")), "&imageUrl=" + t(e.img)].join("");
				AppCore.sendCmd(i)
			};
		AppCore.reg("trip", {
			share: function(t, r) {
				n = t, i = e.isFunction(r) ? r : function() {};
				var o = t().showTopShareBtn;
				o && AppCore.trip.setActionButton({
					title: "\u5206\u4eab"
				}, AppCore.shareNow)
			},
			shareNow: function() {
				AppCore.trip.ready(function(t) {
					var o = n(),
						a = e.isFunction(o.notice) ? o.notice : e.noop;
					t && t.share ? t.share.showShareMenu(e.extend({
						title: o.title,
						content: o.desc,
						statesms: o.get("smsDesc", "desc"),
						statewx: o.get("wxDesc", "imDesc", "desc"),
						statewxt: o.get("wxtTitle", "imTitle", "title"),
						statewb: o.get("wbDesc", "desc"),
						stateyx: o.get("yxDesc", "imDesc", "desc"),
						stateyxt: o.get("yxtDesc", "imDesc", "desc"),
						wxjumpurl: o.get("wxtLink", "wxLink", "imLink", "link"),
						yxjumpurl: o.get("yxtLink", "yxLink", "imLink", "link"),
						wbjumpurl: o.get("wbLink", "link"),
						imageurl: o.img
					}, o), function(e) {
						var n = {};
						try {
							n = JSON.parse(e)
						} catch(t) {
							n = {}
						}
						i(1 == n.code ? "ok" : "fail", "unknown"), a("callback", 1 == n.code, "unknown")
					}) : (r(), a("notSupport", !0))
				})
			}
		}), AppCore.reg(!0, "trip", {
			setActionButton: function(e, n) {
				AppCore.trip.ready(function(i) {
					i && i.ui && i.ui.setActionButton(e || {
						title: ""
					}, n || function() {})
				})
			}
		})
	}(window.jQuery || window.Zepto), AppCore.reg("movie", {
		is: function(e) {
			return e.indexOf("movie163") > 0
		},
		version: function(e) {
			var n = AppCore.helper,
				i = 0,
				t = 0;
			return /movie163internal\/[^\/]+\/([^\/]+)\/(\d+)/.test(n.ua) && (i = RegExp.$1, t = +RegExp.$2), e ? i : t
		},
		ready: function(e) {
			var n = AppCore.movie.version(),
				i = AppCore.helper.os,
				t = "ios" === i && n >= 67 || "android" === i && n >= 2;
			return window.LDMJsApi ? e(LDMJsApi) : void(t ? document.addEventListener("LDMJsBridgeReady", function() {
				e(window.LDMJsApi)
			}) : $(function() {
				e(window.LDMJsApi)
			}))
		}
	}),
	function() {
		var e, n;
		AppCore.reg("movie", {
			share: function(i, t) {
				e = i, n = t
			},
			shareNow: function() {
				AppCore.movie.ready(function(n) {
					if(!n || !n.share) return alert("\u60a8\u7684\u5ba2\u6237\u7aef\u7248\u672c\u592a\u4f4e\uff0c\u8bf7\u5347\u7ea7\u5ba2\u6237\u7aef\u3002");
					var t = e();
					n.share.onShare($.extend({
						commonTitle: t.title,
						commonContent: t.desc,
						commonJumpUrl: t.link,
						commonImageUrl: t.img,
						wbContent: t.wbDesc,
						wbJumpUrl: t.wbLink,
						wbImageUrl: t.wbImg,
						imContent: t.wbDesc,
						imJumpUrl: t.imLink,
						imImageUrl: t.imImg,
						wxContent: t.wxDesc,
						wxJumpUrl: t.wxLink,
						wxImageUrl: t.wxImg,
						wxtContent: t.wxtDesc,
						wxtJumpUrl: t.wxtLink,
						wxtImageUrl: t.wxtImg,
						yxContent: t.yxDesc,
						yxJumpUrl: t.yxLink,
						yxImageUrl: t.yxImg,
						yxtContent: t.yxtDesc,
						yxtJumpUrl: t.yxtLink,
						yxtImageUrl: t.yxtImg
					}, t), function(e) {
						var n = 1 == e.code,
							t = n ? e.sharetype : e.errordesc;
						i(n, t)
					})
				})
			}
		})
	}(), AppCore.reg("wap", {
		is: function() {
			return !0
		}
	}),
	function(e) {
		var n, i = [{
				name: "yixin",
				cn: "\u6613\u4fe1",
				url: "http://open.yixin.im/share?appKey=&type=webpage&title={yxTitle}&desc={yxDesc}&userdesc=&pic={yxImg}&url={yxLink}"
			}, {
				name: "sina",
				cn: "\u65b0\u6d6a\u5fae\u535a",
				url: "http://v.t.sina.com.cn/share/share.php?url={wbLink}&title={wbTitle}&searchPic=true&pic={wbImg}"
			}, {
				name: "qqzone",
				cn: "QQ\u7a7a\u95f4",
				url: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={imLink}&desc={imDesc}&summary= &title={imTitle}&site={site}&otype=share&pics={imImg}"
			}, {
				name: "qqweibo",
				cn: "\u817e\u8baf\u5fae\u535a",
				url: "http://share.v.t.qq.com/index.php?c=share&a=index&site={site}&url={wbLink}&title={wbTitle}&pic={wbImg}"
			}, {
				name: "renren",
				cn: "\u4eba\u4eba\u7f51",
				url: "http://widget.renren.com/dialog/share?resourceUrl={url}&title={title}&description={desc}&charset=utf-8&pic={img}"
			}, {
				name: "mail",
				cn: "\u90ae\u4ef6",
				url: function(e) {
					var n, i = e.mailDesc;
					switch(AppCore.helper.os) {
						case "ios":
							n = encodeURIComponent(i.replace(/&/g, "&amp;") + "   ") + e._url;
							break;
						case "android":
							n = encodeURIComponent(i + " ") + e._url;
							break;
						default:
							n = i.replace(/&/g, "%26") + " " + e._url
					}
					return "mailto:?subject=" + e.title + "&body=" + n
				}
			}, {
				name: "sms",
				cn: "\u77ed\u4fe1",
				url: function(e) {
					if("android" === AppCore.helper.os) {
						var n = e.smsDesc.substr(0, 140).replace(/\?/g, "\uff1f");
						return "sms:?body=" + encodeURIComponent(n + " " + e._url)
					}
				}
			}],
			t = ['<div id="wapShareWrap">', '<div id="wapShareLayout" class="wapShareLayout"></div>', '<div id="wapShareDialog" class="wapShareDialog">{0}</div>', "</div>"].join(""),
			r = function() {
				e("#wapShareWrap").remove()
			},
			o = encodeURIComponent;
		AppCore.reg("wap", {
			share: function(e) {
				var i = window.AppName || window.appName || window.appId || location.host;
				n = function() {
					var n = e();
					return {
						yxTitle: o(n.get("yxTitle", "imTitle", "title")),
						yxDesc: o(n.get("yxDesc", "imDesc", "desc")),
						yxImg: o(n.get("yxImg", "imImg", "img")),
						yxLink: o(n.get("yxLink", "imLink", "link")),
						wbLink: o(n.get("wbLink", "imLink", "link")),
						wbTitle: o(n.get("wbTitle", "imTitle", "title")),
						wbImg: o(n.get("wbImg", "imImg", "img")),
						imTitle: o(n.get("imTitle", "title")),
						imDesc: o(n.get("imDesc", "desc")),
						imImg: o(n.get("imImg", "img")),
						imLink: o(n.get("imLink", "link")),
						site: o(i),
						title: o(n.title),
						desc: o(n.desc),
						url: o(n.link),
						img: o(n.img),
						smsDesc: n.get("smsDesc", "desc"),
						mailDesc: n.get("mailDesc", "desc"),
						_site: i,
						_title: n.title,
						_desc: n.desc,
						_url: n.link,
						_img: n.img
					}
				}, AppCore.helper.loadTextCss("#wapShareWrap{position:fixed;left:0;top:0;width:100%;height:100%;overflow:hidden;z-index:9999}#wapShareWrap a{color:#666;-webkit-tap-highlight-color:transparent;text-decoration:none}.wapShareLayout{position:absolute;left:0;top:0;width:100%;height:100%;overflow:hidden;background:rgba(0,0,0,.2);z-index:1}.wapShareDialog{position:absolute;left:0;top:0;width:100%;height:auto;z-index:2;background:rgba(255,255,255,.95);padding:1rem 0 0;box-shadow:0 2px 4px #666}.wapShareDialog .wapShareLink{display:inline-block;width:25%;min-width:5rem;text-align:center;margin:0 0 1rem;padding-top:3rem;background-repeat:no-repeat;background-position:50% 0;font-size:1rem;background-size:auto 2.5rem}#wapShareLink_yixin{background-image:url(http://pimg1.126.net/mail/AppCore/bin/css/img/yixin.png)}#wapShareLink_sina{background-image:url(http://pimg1.126.net/mail/AppCore/bin/css/img/weibo.png)}#wapShareLink_qqzone{background-image:url(http://pimg1.126.net/mail/AppCore/bin/css/img/qqzone.png)}#wapShareLink_qqweibo{background-image:url(http://pimg1.126.net/mail/AppCore/bin/css/img/qqweibo.png)}#wapShareLink_renren{background-image:url(http://pimg1.126.net/mail/AppCore/bin/css/img/renren.png)}#wapShareLink_mail{background-image:url(http://pimg1.126.net/mail/AppCore/bin/css/img/mail.png)}#wapShareLink_sms{background-image:url(http://pimg1.126.net/mail/AppCore/bin/css/img/sms.png)}")
			},
			shareNow: function() {
				var o = n(),
					a = [];
				r(), e.each(i, function(n, i) {
					var t = e.isFunction(i.url) ? i.url(o) : AppCore.helper.format(i.url, o),
						r = /^http/i.test(t);
					t && a.push('<a class="wapShareLink"' + (r ? ' target="_share"' : "") + ' id="wapShareLink_' + i.name + "\" href='" + t + "'><span>" + i.cn + "</span></a>")
				}), e(document.body).prepend(AppCore.helper.format(t, a.join(""))), e("#wapShareLayout,#wapShareDialog .wapShareLink").click(r)
			}
		})
	}(window.jQuery || window.Zepto),
	function(e) {
		if(e && window.AppCore) {
			document.addEventListener("DOMContentLoaded", function() {
				AppCore.helper.loadTextCss("@media screen and (min-width:240px){#wapShareWrap a{font-size:9px}}@media screen and (min-width:320px){#wapShareWrap a{font-size:12px}}@media screen and (min-width:380px){#wapShareWrap a{font-size:14px}}@media screen and (min-width:420px){#wapShareWrap a{font-size:16px}}@media screen and (min-width:450px){#wapShareWrap a{font-size:18px}}@media screen and (min-width:480px){#wapShareWrap a{font-size:18px}}@media screen and (min-width:540px){#wapShareWrap a{font-size:20.25px}}@media screen and (min-width:600px){#wapShareWrap a{font-size:22px}}@media screen and (min-width:640px){#wapShareWrap a{font-size:24px}}")
			}, !1);
			var n = {
				conf: {},
				fixNewsAppInfo: function(n) {
					var i = {};
					e.each("text photourl wxtitle wxtext wxurl wxthumburl".split(" "), function(n, t) {
						var r = e("#__newsapp_share" + t);
						r[0] && (i[t] = r.text(), r.remove())
					});
					var t = n || {};
					return t.title = t.title || i.wxtitle || "", t.desc = t.desc || i.wxtext || "", t.url = t.url || i.wxurl || "", t.img = t.img || i.wxthumburl || "", t
				},
				getConf: function() {
					var e = n.conf || {};
					return e.notice = window.__shareNotice, e
				},
				fireCallback: function() {
					(n.conf.callback || window.__shareCallback || function() {}).apply(this, arguments)
				},
				ready: function(e, i) {
					n.__inited ? e() : window.console && console.log(i)
				}
			};
			window.h5Share = {
				init: function(e) {
					n.conf = n.fixNewsAppInfo(e), n.getConf.initOnly = 1, AppCore.share(n.getConf, n.fireCallback), n.__inited = 1, h5Share.init = function() {}
				},
				conf: function(e) {
					n.ready(function() {
						var i = e || {};
						for(var t in i) n.conf[t] = i[t] || n.conf[t];
						var r = AppCore.getAppName();
						(AppCore[r].updateShareInfo || function() {}).call(AppCore[r])
					}, "[h5Share] conf\u65b9\u6cd5\u9700\u8981\u5728init\u4e4b\u540e\u8c03\u7528")
				},
				share: function() {
					n.ready(function() {
						AppCore.shareNow()
					}, "[h5Share] share\u65b9\u6cd5\u9700\u8981\u5728init\u4e4b\u540e\u8c03\u7528")
				},
				confAndBind: function(e) {
					AppCore.share(e, window.__shareCallback), this.__inited = 1
				}
			}
		}
	}(window.jQuery || window.Zepto);