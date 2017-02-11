(function(window, document){
	var w = window,
		doc = document,
		Pl = function(selector){
			return new Pl.prototype.init(selector);
		};
		Pl.prototype = {
			constructor : Pl,
			length : 0,
			splice: [].splice,
			selector: '',
			init: function(selector){
				if(!selector) { return this; }
				/*
					首先selector可能为object的情况,比如传入的是原生dom对象,dom数组对象. 另外要记得转为数组`var selector = [selector];

					因为有可能是一个元素比如是window,document等否则没法循环

					然后selector如果是function那我们就认为他是domReady

					PS:在这我判断的并没有非常的全面,仅仅具备了基础功能
				*/
				if(typeof selector == 'object'){
					var selector = [selector];
					for(var i = 0, len = selector.length; i < len; i++){
						this[i] = selector[i];
					}
					this.length = selector.length;
					return this;
				} else if(typeof selector == 'function'){
					Pl.ready(selector);
					return;
				}
				
				var selector = selector.trim(),
					elm;
					
				if (selector.charAt(0) == '#' && !selector.match('\\s')) {
					selector = selector.substring(1);
					this.selector = selector;
					elm = doc.getElementById(selector);
					
					this[0] = elm;
					this.length = 1;
					return this;
				} else {
					elm = doc.querySelectorAll(selector);
					for (var i = 0; i < elm.length; i++) {
						this[i] = elm[i];
					}
					
					this.selector = selector;
					this.length = elm.length;
					return this;
				}
			},
			hasClass: function(cls){
				var reg = new RegExp('(\\s|^)'+cls+'(\\s|^)');
				var arr = [];
				for(var i = 0, len = this.length; i < len; i++){
					if( this[i].className.match(reg) ){
						arr.push(true);
					} else {
						arr.push(false);
					}
				}
				if(arr.indexOf(true) != -1){
					return true
				} else {
					return false;
				}
			},
			addClass: function(cls){
				var reg = new RegExp('(\\s|^)'+cls+'(\\s|^)');
				for(var i = 0, len = this.length; i < len; i++){
					if( !this[i].className.match(reg) ){
						this[i].className += ' '+cls;
					}
				}
				return this;
			},
			removeClass: function(cls){
				var reg = new RegExp('(\\s|^)'+cls+'(\\s|^)');
				for(var i = 0, len = this.length; i < len; i++){
					if(this[i].className.match(reg)){
						this[i].className = this.className.replace(' '+cls, '');
					}
				}
				return this;
			},
			css: function(attr, val){
				for(var i = 0, len = this.length; i < len; i++){
					if(typeof attr == 'string'){
						if(arguments.length == 1){
							return getComputedStyle(this[i], null)[attr];
						}
						this[i].style[attr] = val;
					} else {
						var _this = this[i];
						Pl.each(attr, function(attr, val){
							_this.style.cssText += ' '+attr+':'+val;
						});
					}
				}
				return this;
			},
			attr: function(attr, val){
				for(var i = 0, len = this.length; i < len; i++){
					if(typeof attr == 'string'){
						if(arguments.length == 1){
							return this[i].getAttribute(attr);
						}
						this[i].setAttribute(attr, val);
					} else {
						var _this = this[i];
						Pl.each(function(attr, val){
							_this.setAttribute(attr, val);
						});
					}
				}
				return this;
			},
			data: function(attr, val){
				for(var i = 0, len = this.length; i < len; i++){
					if(typeof attr == 'string'){
						if(arguments.length == 1 ){
							return this[i].getAttribute('data-'+attr);
						}
						this[i].setAttribute('data-'+attr, val);
					} else {
						var _this = this[i];
						Pl.each(attr, function(attr, val){
							_this.setAttribute('data-'+attr, val);
						});
					}
				}
				return this;
			},
			next: function(){
				return sibling(this[0], 'nextSibling');
			},
			prev: function(){
				return sibling(this[0], 'previonsSibling');
			},
			parent: function(){
				var parent = this[0].parentNode;
				parent && parent.nodeType !== 11 ? parent : null;
				var a = Pl();
					a[0] = parent;
					a.selector = parent.tagName.toLocaleLowerCase();
					a.length = 1;
				return a;
			},
			parents: function(){
				var a = Pl(),
					i = 0;
				while( (this[0] = this[0]['parentNode']) && this[0].nodeType !== 9 ){
					a[i] = this[0];
					i++;
				}
				a.length = i;
				return a;
			},
			find: function(selector){
				if(!selector){ return; }
				var context = this.selector;
				return new Pl(context + ' '+ selector);
			},
			first: function(){
				return new Pl(this[0]);
			},
			last: function(){
				var num = this.length - 1;
				return new Pl(this[num]);
			},
			eq: function(num){
				var num = num < 0 ? (this.length - 1) : num;
				return new Pl( this[num] );
			},
			get: function(num){
				var num = num < 0 ? (this.length - 1) : num;
				return this[num];
			},
			html: function(value){
				if( value === undefined ){
					return this[0].innerHTML;
				} else {
					for(var i = 0, len = this.length; i < len; i++){
						this[i].innerHTML = value;
					}
				}
				return this;
			},
			append: function(str){
				for(var i = 0, len = this.length; i < len; i++){
					domAppend(this[i], 'beforeend', str);
				}
				return this;
			},
			before: function(str){
				for(var i = 0, len = this.length; i < len; i++){
					domAppend(this[i], 'beforeBegin', str);
				}
				return this
			},
			after: function(str){
				for(var i = 0, len = this.length; i < len; i++){
					domAppend(this[i], 'afterEnd', str);
				}
				return this
			},
			remove: function(){
				for(var i = 0, len = this.length; i < len; i++){
					this[i].parentNode.removeChild(this[i]);
				}
				return this;
			},
			on: function(type, selector, fn){
				if(typeof selector == 'function'){
					/* 事件绑定 */
					fn = selector; /* 两个参数的情况 */
					for(var i = 0, len = this.length; i < len; i++){
						if(!this[i].guid){
							/* guid 不存在就给当前dom 一个 guid */
							this[i].guid = ++Pl.guid;

							Pl.Events[Pl.guid] = {};
							/* 给Events[guid] 开辟一个新对象 用于存储这个dom上的所有方法 */

							Pl.Events[Pl.guid][type] = [fn];/* 每个方法都是数组 */
							/* 给这个新对象，赋予事件数组 "click": [fn1, fn2, ....] */
							bind(this[i], type, this[i].guid);/* 绑定事件 */
						} else {
							var id = this[i].guid;
							if(Pl.Events[id][type]){
								/* 如果这存在是当前已经存过，不用在绑定事件，直接放入方法数组即可 */
								Pl.Events[id][type].push(fn);
							} else {
								/* 这是存新事件，所以需要重新绑定一次 */
								Pl.Events[id][type] = [fn];
								bind(this[i], type, id);
							}
						}
					}
				} else {
					/* 事件委托 */
					for(var i = 0, len = this.length; i < len; i++){
						if(!this[i].deleId){
							/* id 不存在 */
							this[i].deleId = ++Pl.deleId;

							Pl.deleEvents[Pl.deleId] = {};

							Pl.deleEvents[Pl.deleId][selector] = {};
							Pl.deleEvents[Pl.deleId][selector][type] = [fn];

							delegate(this[i], type, selector);
						} else {
							/* id存在 */
							var id = this[i].deleId,
								position = Pl.deleEvents[id];

							/* 先判断selector存储的对象是否存在 */
							if(!position[selector]){
								position[selector] = {};
								position[selector][type] = [fn];
								/* 因为是新的selector 所以要重新绑定 */
								delegate(this[i], type, selector);
							} else {
								if(position[selector][type]){
									position[selector][type].push(fn);
								} else {
									position[selector][type] = [fn];
									/* 因为是新的selector 所以要重新绑定 */
									delegate(this[i], type, selector);
								}
							}
						}
					}
				}
			},
			off: function(type, selector){
				if(arguments.length == 0){
					/* 如果没传参数，清空所有事件 */
					for(var i = 0, len = this.length; i < len; i++){
						var id = this[i].guid;
						for(var j in Pl.Events[id]){
							delete Pl.Events[id][j];
						}
					}
				} else if(arguments.length == 1){
					/* 指定一个参数，则清空对应type的事件 */
					for(var i = 0,len = this.length; i < len; i++){
						var id = this[i].guid;
						delete Pl.Events[id][type];
					}
				} else {
					for (var i = 0; i < this.length; i++) {
						var id = this[i].deleId;
						delete Pl.deleEvents[id][selector][type];
					}
				}
			},
			width: function(w){
				w = w ? w : '';
				return WHcommon.call(this, w, 'width');
			},
			height: function(h){
				h = h ? h : '';
				return WHcommon.call(this, h, 'height');
			},
			/* 原型链工具方法 */
			each: function(obj, callback){
				/* 兼容 工具方法和 原型 调用 */
				if(arguments.length == 1){
					callback = obj;
					obj = this;
				}

				var len = obj.length,
					constru = obj.constructor,
					i = 0;
				if(constru === window.p || isArray(obj) ){
					for(; i < len; i++){
						var val = callback.call(obj[i], i, obj[i]);
						if(val === false) break;
					}
				} else {
					for(i in obj){
						var val = callback.call(obj[i], i, obj[i]);
						if(val === false) break;
					}
				}
			}
		}
		Pl.prototype.init.prototype = Pl.prototype;

		Pl.Events = [];// 事件绑定存放的事件
		Pl.guid = 0;// 事件绑定的唯一标示

		Pl.deleEvents = []; //事件委托存放的事件
		Pl.deleId = 0; //事件委托的唯一标识

		/* 事件委托 */
		function delegate(agent, type, selector){
			var id = agent.deleId;
			agent.addEventListener(type, function(e){
				var target = e.target,
					ctarget = e.currentTarget,
					bubble = true;
				while(bubble && target != ctarget){
					if(fillter(agent, selector, target)){
						for (var i = 0; i < Pl.deleEvents[id][selector][type].length; i++) {
							bubble = Pl.deleEvents[id][selector][type][i].call(target, e);
							return bubble;
						}
					}
					target = target.parentNode;
				}
			}, false);
			/* 判断委托元素下 是否有指定元素 */
			function fillter(agent, selector, target){
				var nodes = agent.querySelectorAll(selector);
				for(var i = 0, len = nodes.length; i < len; i++){
					if(nodes[i] == target){
						return true;
					}
				}
			}
		}
		/* 绑定事件 */
		function bind(dom, type, guid){
			dom.addEventListener(type, function(e){
				for(var i = 0, len = Pl.Events[guid][type].length; i < len; i++){
					Pl.Events[guid][type][i].call(dom, e);
				}
			}, false);
		}

		/* 工具方法 */
		Pl.ajax = function(options){
			ajax(options);
		}
		Pl.ready = function(fn){
			doc.addEventListener('DOMContentLoaded', function(){
				fn && fn();
			}, false);
			doc.removeEventListener('DOMContentLoaded', fn, true);
		}
		Pl.each = Pl.prototype.each;

		Pl.get = function(url, sucBack, complete){
			var options = {
				url : url,
				success : sucBack,
				complete : complete
			};
			ajax(options);
		}
		Pl.post = function(url, data, sucBack, complete){
			var options = {
				url : url,
				type : 'POST',
				data : data,
				sucBack : sucBack,
				complete : complete
			};
			ajax(options);
		}
		Pl.prototype.extend = Pl.extend = extend;

		/* ajax请求 */
		function ajax(options){
			var defaultOptions = {
				url : false,
				type : 'GET',
				data : false,
				success : false, // 数据成功返回后的回调方法
				complete : false // ajax完成后的回调方法
			}
			options = extend('', defaultOptions, options);
			var xhr  = new XMLHttpRequest();
			var url = options.url;
			xhr.open(options.type, url);
			xhr.onreadystatechange = onStateChange;
			if(options.type === 'POST' || options.type === 'post'){
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			}
			xhr.send(options.data ? options.data : null);
			function onStateChange(){
				if(xhr.readyState == 4){
					var result,
						status = xhr.status;

					if( (status >= 200 && status < 300) || status == 304 ){
						result = xhr.responseText;
						if(window.JSON){
							result = JSON.parse(result);
						} else {
							result = eval( '(' + result + ')' );
						}
						ajaxSuccess(result, xhr);
					} else {
						console.log('ERR', status);
					}
				}
			}
			function ajaxSuccess(data, xhr){
				var status = 'success';
				options.success && options.success( data, options, status, xhr );
				ajaxComplete(status);
			}
			function ajaxComplete(status){
				options.complete && options.complete(status);
			}
		}
		/* extend 实现，照搬 jq 的 extend 实现方式 */
		function extend(deep, target, options){
		    var copyIsArray,  
		        toString = Object.prototype.toString,  
		        hasOwn = Object.prototype.hasOwnProperty;  
		  
		    class2type = {  
		        '[object Boolean]' : 'boolean',  
		        '[object Number]' : 'number',  
		        '[object String]' : 'string',  
		        '[object Function]' : 'function',  
		        '[object Array]' : 'array',  
		        '[object Date]' : 'date',  
		        '[object RegExp]' : 'regExp',  
		        '[object Object]' : 'object'  
		    },  
		  
		    type = function(obj) {  
		        return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";  
		    },  
		  
		    isWindow = function(obj) {  
		        return obj && typeof obj === "object" && "setInterval" in obj;  
		    },  
		  
		    isArray = Array.isArray || function(obj) {  
		        return type(obj) === "array";  
		    },  
		  
		    isPlainObject = function(obj) {  
		        if (!obj || type(obj) !== "object" || obj.nodeType || isWindow(obj)) {  
		            return false;  
		        }  
		  
		        if (obj.constructor && !hasOwn.call(obj, "constructor")  
		                && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {  
		            return false;  
		        }  
		  
		        var key;  
		        for (key in obj) {  
		        }  
		  
		        return key === undefined || hasOwn.call(obj, key);  
		    }

	        for (name in options) {  
	            src = target[name];  
	            copy = options[name];  
	  
	            if (target === copy) { continue; }  
	  
	            if (deep && copy  
	                    && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {  
	                if (copyIsArray) {  
	                    copyIsArray = false;  
	                    clone = src && isArray(src) ? src : [];  
	  
	                } else {  
	                    clone = src && isPlainObject(src) ? src : {};  
	                }  
	  
	                target[name] = extend(deep, clone, copy);  
	            } else if (copy !== undefined) {  
	                target[name] = copy;  
	            }  
	        }  
	  
	        return target;
		}
		/* 过滤dom */
		function sibling(cur, dir){
			while( (cur = cur[dir]) && cur.nodeType !== 1 ){}
			return cur;
		}
		/* 验证是否为数组 */
		function isArray(obj){
			return Array.isArray(obj);
		}
		/* 实现append、after、before操作 */
		function domAppend(elm, type, str){
			elm.insertAdjacentHTML(type, str);
		}
        /* 获取或者设置宽度、高度的通用方法 */
        function WHcommon(num, type){
        	console.log(this);
        	var Type = type.replace(/\b\w+\b/g, function(word){
							return word.substring(0,1).toUpperCase()+word.substring(1);
						});
			if(num){
				/* 先验证是否为 数字，如果不是验证是否 携带有 px 字样 */
				if(!unit.isNum(num)){
					if(num.indexOf('px') != -1){ num = num.split('px')[0]; }
					if(!unit.isNum(num)){ throw("TypeError : "+type+" function parameter typeof ERROR" ); }
				}
				for(var i = 0,len = this.length; i < len; i++){
					this[i].style.width = num + 'px';
				}
			} else {
				if(this[0].document == doc){
					return this[0]['inner'+Type];
				} else if(this[0].nodeType === 9){
					return document.documentElement['client'+Type];
				} else {
					return parseInt( getComputedStyle(this[0], null)[type] );
				}
			}
        }

        /* 工具类 */
        var unit = {
        	date : function(time){
        		time = time ? time : new Date();
        		return {
        			format : function(type){
		                /**
		                 * 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
		                 * 可以用 1-2 个占位符 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) eg: (new
		                 * Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
		                 * Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 (new
		                 * Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 (new
		                 * Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 (new
		                 * Date()).format("yyyy-M-d h:m:s.S q ") ==> 2006-7-2 8:9:4.18
		                 */
		                Date.prototype.format = function(fmt) {
		                    var o = {
		                        "Y+" : this.getFullYear(),
		                        "M+" : this.getMonth() + 1,
		                        // 月份
		                        "d+" : this.getDate(),
		                        // 日
		                        "h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
		                        // 小时
		                        "H+" : this.getHours(),
		                        // 小时
		                        "m+" : this.getMinutes(),
		                        // 分
		                        "s+" : this.getSeconds(),
		                        // 秒
		                        "q+" : Math.floor((this.getMonth() + 3) / 3),
		                        // 季度
		                        "S" : this.getMilliseconds()
		                        // 毫秒
		                    };
		                    var week = {
		                        "0" : "日",
		                        "1" : "一",
		                        "2" : "二",
		                        "3" : "三",
		                        "4" : "四",
		                        "5" : "五",
		                        "6" : "六"
		                    };
		                    if (/(y+)/.test(fmt)) {
		                        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		                    }
		                    if (/(E+)/.test(fmt)) {
		                        fmt = fmt.replace( RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""] );
		                    }
		                    for ( var k in o) {
		                        if (new RegExp("(" + k + ")").test(fmt)) {
		                            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		                        }
		                    }
		                    return fmt;
		                };
		                return new Date(time).format(type);
		        	},
		        	getYear : function(){
		        		return new Data(time).getFullYear();
		        	},
		        	getMonth : function(){
		        		return new Date(time).getMonth()+1;
		        	},
		        	getDay : function(){
		        		return new Date(time).getDate();
		        	},
		        	getHours : function(){
		        		var Time = new Date(time)
		        		return Time.getHours() % 12 == 0 ? 12 : Time.getHours() % 12;
		        	},
		        	getMinutes : function(){
		        		return new Date(time).getMinutes();
		        	},
		        	getSeconds : function(){
		        		return new Date(time).getSeconds();
		        	},
		        	getMilliseconds : function(){
		        		return new Date(time).getMilliseconds();
		        	},
		        	getWeek : function(){
		        		var week = {
	                        "0" : "日",
	                        "1" : "一",
	                        "2" : "二",
	                        "3" : "三",
	                        "4" : "四",
	                        "5" : "五",
	                        "6" : "六"
	                    };
		        		return week[ new Date(time).getDate() ];
		        	}
	        	}
        	},
            // 是否是邮箱
            isEmail : function(v) {
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!filter.test(v)) {
                    return false;
                } else {
                    return true;
                }
            },
            // 是否是数字
            isNum : function(v) {
                var reg = new RegExp("^[0-9]*$");
                if (!reg.test(v)) {
                    return false;
                }
                return true;
            },
            // 手机号码验证
            isMobileNum : function(v) {
                var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/;
                if (reg.test(v)) {
                    return true;
                } else {
                    return false;
                }
            },
            // 固定电话验证
            isTelPhone : function(v) {
                var filter = /^0([3-9][0-9]{1,2}|[1-2]\d)[1-9][0-9]{6,7}$/;
                return filter.test(v);
            },
            // 验证正整数
            isIntNum : function(v) {
                var filter = /^[1-9][0-9]*$/;
                if (filter.test(v)) {
                    return true;
                }
                return false;
            },
            // 判断是否为空
            isNull : function (value) {
                if (typeof value === "undefined" || typeof value === "" || typeof value === "null" || value == "null" || value == null || value == "" || value == "undefined") {
                    return true;
                } else {
                    return false;
                }
            },
            /* 数值对比 */
            contrast: function(valueTime, outTime) {
                if (valueTime > outTime) {
                    return false;
                } else {
                    return true;
                }
            },
            /* 判断中文 */
            checkzn: function(name) {
                if (!name) {
                    return false;
                }
                var reg = /^[\u4E00-\u9FA5]{2,}$/;
                if (reg.test(name.trim())) {
                    return true;
                } else {
                    return false;
                }
            },
            /* 判断是否为一个方法 */
            isFn : function(fn){
                return object.prototype.toString.call(fn) === "[object Function]"
            },
            /* 判断字符串是否为字母 */
            isString : function(value){
                var str = /^[A-Za-z]*$/;
                if( str.test(value) ){
                    return true;
                } else {
                    return false;
                }
            },
            /* 判断身份证号码是否正确 */
            idCardCheck : function(number){
            	return idCardNoUtil.checkIdCardNo(number);
            },
            /**
             * 随机生成32位字符串
             * @param  {[number]} len [随机字符串长度]
             * @return {[string]}     [生成后的字符串]
             */
            randomString: function(len) {
                len = len || 32;
                var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
                var maxPos = $chars.length;
                var pwd = '';
                for (i = 0; i < len; i++) {
                    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return pwd;
            },
            url : function(){
            	return {
		            search : function(name, type){
		                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		                var r = window.location.search.substr(1).match(reg);
		                if ( r != null ){
		                    return unescape(r[2]);
		                } else {
		                    return null;
		                }
		            },
		            hash : function(name){
		                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		                var r = window.location.hash.substr(1).match(reg);
		                if ( r != null ){
		                    return unescape(r[2]);
		                } else {
		                    return null;
		                }
		            }
            	}
            },
            strong : function(name){
            	if( !eval( "window."+name+"Storage" ) ){
                    throw("TypeError : Your current browser does not support "+name+"Storage" );
                }
            	return {
            		name : name,
		            get : function(key){
		                var value = eval( "window."+ this.name +"Storage" ).getItem(key);
		                return value;
		            },
		            set : function(key, value){
		                eval( "window."+ this.name +"Storage" ).setItem(key, value);
		                return this;
		            },
		            del : function(key){
		                eval( "window."+ this.name +"Storage" ).removeItem(key)
		                return this;
		            }
            	}
            },
            cookie : function(){
            	return {
		            /**
		             * 获取指定cookie
		             * @param  {[string]} name [cookie名字]
		             * @return {[string]}      [指定cookie的值]
		             */
		            get : function(name){
		                var cookieName = encodeURIComponent(name) +"=",
		                    cookieStart = document.cookie.indexOf(cookieName),
		                    cookieValue = null;
		                if(cookieStart != -1){
		                    var cookieEnd = document.cookie.indexOf(";",cookieStart);
		                    if(cookieEnd == -1){
		                        cookieEnd = document.cookie.length;
		                    }
		                    cookieValue =  decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
		                }
		                return cookieValue;
		            },
		            /**
		             * 设置cookie
		             * @param {[string]} name    [cookie名字]
		             * @param {[string]} value   [cookie内容]
		             * @param {[date]} expires [过期时间]
		             * @param {[string]} path    [cookie目录]
		             * @param {[type]} domain  [description]
		             * @param {[type]} secure  [description]
		             */
		            set : function(name, value, expires, path, domain, secure){
		                var cookieText = encodeURIComponent(name)+"="+encodeURIComponent(value);
		                if(expires instanceof Date){
		                    cookieText += "; expires=" + expires.toGMTString();
		                }
		                if(path){
		                    cookieText +="; path=" + path;
		                }
		                if (domain) {
		                    cookieText += "; domain=" + domain;
		                }
		                if (secure) {
		                    cookieText += "; secure";
		                }
		                document.cookie = cookieText;
		            },
		            /**
		             * 删除cookie
		             * @param {[string]} name    [cookie名字]
		             * @param {[date]} expires [过期时间]
		             * @param {[string]} path    [cookie目录]
		             * @param  {[type]} domain [description]
		             * @param  {[type]} secure [description]
		             */
		            unset: function (name, path, domain, secure){
		                this.set(name, "", new Date(0), path, domain, secure);
		            }
		        }
            },
            base64encode : function(str){
            	return encodeBase.base64encode(str);
            },
            base64decode : function(str){
            	return encodeBase.base64decode(str);
            },
	        event : {
	            /*通用函数初始化加载*/
	            addLoadEvent : function (fn){
	                var oldonload = window.onload;
	                if(typeof window.onload != "function"){
	                    window.onload = fn;
	                } else {
	                    window.onload = function(){
	                        oldonload();
	                        fn();
	                    }
	                }
	            },
	            /* 跨浏览器实现事件绑定 */
	            addEventHandler : function (ele, event, hanlder) {
	                if (ele.addEventListener) {
	                    ele.addEventListener(event, hanlder, false);
	                } else if (ele.attachEvent) {
	                    ele.attachEvent("on"+event, hanlder);
	                } else  {
	                    ele["on" + event] = hanlder;
	                }
	            },
	            /* 跨浏览器实现事件删除 */
	            removeEventHandler : function (ele, event, hanlder) {
	                if (ele.removeEventListener) {
	                    ele.removeEventListener(event, hanlder, false);
	                } else if (ele.detachEvent) {
	                    ele.detachEvent("on"+event, hanlder);
	                } else  {
	                    ele["on" + event] = null;
	                }
	            },
	            /* 获取event对象 */
	            getEvent : function (event){
	                return event ? event : window.event;
	            },
	            /* 获取目标元素 */
	            getTartget : function (event){
	                return event.target || event.srcElement;
	            },
	            /* 取消默认事件 */
	            preventDefault : function (event){
	                event.preventDefault ? event.preventDefault() : event.returnValue = false;
	            },
	            /* 阻止事件冒泡 */
	            stopPropagation : function (event){
	                event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	            },
	            /* 获取滚动条高度 */
	            scroll : function (){
	                return document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
	            },
	            /* 获取相关元素 */
	            getRelatedTarget : function (event){
	                if( event.relatedTarget ){
	                    return event.relatedTarget;
	                } else if( event.toElement ){
	                    return event.toElement;
	                } else if( event.fromElement ){
	                    return event.fromElement;
	                } else {
	                    return null;
	                }
	            },
	            /* 判断鼠标按键 */
	            getButton : function (event){
	                if( document.implementation.hasFeatuse("MouseEvents", "2.0") ){
	                    return event.button
	                } else {
	                    switch (event.button) {
	                        case 0:
	                        case 1:
	                        case 2:
	                        case 3:
	                        case 4:
	                            return 1;
	                        case 5:
	                        case 6:
	                            return 2;
	                        case 7:
	                            return 0;
	                    }
	                }
	            },
	            /* 鼠标滚轮事件 */
	            getWhell : function (event) {
	                if( event.whellData ){
	                    return (client.engine.opera && client.engine.opera < 9.5 ? -event.whellData : event.whellData);
	                } else {
	                    return -event.detail * 40;
	                }
	            },
	            /* 获取剪切板的数据，有2中格式，“text”、“URL” */
	            getClipboarText : function(event){
	                var clipboardData = ( event.clipboardData || window.clipboardData );
	                return clipboardData.getData('text');
	            },
	            /* 设置剪切板数据 */
	            setClipboarText : function(event,value){
	                console.log(window.clipboardData);
	                console.log(event.clipboardData);
	                if( event.clipboardData ){
	                    console.log(1);
	                    return event.clipboardData.setData("text/plain",vlaue);
	                } else if( window.clipboardData ){
	                    console.log(2);
	                    return window.clipboardData.setData("text",value);
	                }
	            },
	            /* 函数重载 */
	            addMethod : function(object, name, fn){
	                console.log(fn.length +" ===== "+arguments.length);
	                var old = object[name];
	                object[name] = function(){
	                    if(fn.length == arguments.length){
	                        return fn.apply(this, arguments);
	                    } else if(typeof old == "function"){
	                        return old.apply(this, arguments);
	                    }
	                }
	            }
	        }
        };
        /* 身份证号码验证 */
        var idCardNoUtil = {
            /* 省,直辖市代码表 */
            provinceAndCitys : {
                11 : "北京",
                12 : "天津",
                13 : "河北",
                14 : "山西",
                15 : "内蒙古",
                21 : "辽宁",
                22 : "吉林",
                23 : "黑龙江",
                31 : "上海",
                32 : "江苏",
                33 : "浙江",
                34 : "安徽",
                35 : "福建",
                36 : "江西",
                37 : "山东",
                41 : "河南",
                42 : "湖北",
                43 : "湖南",
                44 : "广东",
                45 : "广西",
                46 : "海南",
                50 : "重庆",
                51 : "四川",
                52 : "贵州",
                53 : "云南",
                54 : "西藏",
                61 : "陕西",
                62 : "甘肃",
                63 : "青海",
                64 : "宁夏",
                65 : "新疆",
                71 : "台湾",
                81 : "香港",
                82 : "澳门",
                91 : "国外"
            },

            /* 每位加权因子 */
            powers : [ "7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9",
                "10", "5", "8", "4", "2" ],

            /* 第18位校检码 */
            parityBit : [ "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2" ],

            /* 性别 */
            genders : {
                male : "男",
                female : "女"
            },

            /* 校验地址码 */
            checkAddressCode : function(addressCode) {
                var that = this;
                var check = /^[1-9]\d{5}$/.test(addressCode);
                if (!check)
                    return false;
                if (that.provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
                    return true;
                } else {
                    return false;
                }
            },

            /* 校验日期码 */
            checkBirthDayCode : function(birDayCode) {
                var that = this;
                var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/
                    .test(birDayCode);
                if (!check)
                    return false;
                var yyyy = parseInt(birDayCode.substring(0, 4), 10);
                var mm = parseInt(birDayCode.substring(4, 6), 10);
                var dd = parseInt(birDayCode.substring(6), 10);
                var xdata = new Date(yyyy, mm - 1, dd);
                if (xdata > new Date()) {
                    return false;// 生日不能大于当前日期
                } else if ((xdata.getFullYear() == yyyy)
                    && (xdata.getMonth() == mm - 1) && (xdata.getDate() == dd)) {
                    return true;
                } else {
                    return false;
                }
            },

            /* 计算校检码 */
            getParityBit : function(idCardNo) {
                var that = this;
                var id17 = idCardNo.substring(0, 17);
                /* 加权 */
                var power = 0;
                for (var i = 0; i < 17; i++) {
                    power += parseInt(id17.charAt(i), 10) * parseInt(that.powers[i]);
                }
                /* 取模 */
                var mod = power % 11;
                return that.parityBit[mod];
            },

            /* 验证校检码 */
            checkParityBit : function(idCardNo) {
                var that = this;
                var parityBit = idCardNo.charAt(17).toUpperCase();
                if (that.getParityBit(idCardNo) == parityBit) {
                    return true;
                } else {
                    return false;
                }
            },

            /* 校验15位或18位的身份证号码 */
            checkIdCardNo : function(idCardNo) {
                var that = this;
                // 15位和18位身份证号码的基本校验
                var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
                if (!check)
                    return false;
                // 判断长度为15位或18位
                if (idCardNo.length == 15) {
                    return that.check15IdCardNo(idCardNo);
                } else if (idCardNo.length == 18) {
                    return that.check18IdCardNo(idCardNo);
                } else {
                    return false;
                }
            },

            // 校验15位的身份证号码
            check15IdCardNo : function(idCardNo) {
                var that = this;
                // 15位身份证号码的基本校验
                var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/
                    .test(idCardNo);
                if (!check)
                    return false;
                // 校验地址码
                var addressCode = idCardNo.substring(0, 6);
                check = that.checkAddressCode(addressCode);
                if (!check)
                    return false;
                var birDayCode = '19' + idCardNo.substring(6, 12);
                // 校验日期码
                return that.checkBirthDayCode(birDayCode);
            },

            // 校验18位的身份证号码
            check18IdCardNo : function(idCardNo) {
                var that = this;
                // 18位身份证号码的基本格式校验
                var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/
                    .test(idCardNo);
                if (!check)
                    return false;
                // 校验地址码
                var addressCode = idCardNo.substring(0, 6);
                check = that.checkAddressCode(addressCode);
                if (!check)
                    return false;
                // 校验日期码
                var birDayCode = idCardNo.substring(6, 14);
                check = that.checkBirthDayCode(birDayCode);
                if (!check)
                    return false;
                // 验证校检码
                return that.checkParityBit(idCardNo);
            },

            formateDateCN : function(day) {
                var that = this;
                var yyyy = day.substring(0, 4);
                var mm = day.substring(4, 6);
                var dd = day.substring(6);
                return yyyy + '-' + mm + '-' + dd;
            },

            // 获取信息
            getIdCardInfo : function(idCardNo) {
                var that = this;
                var idCardInfo = {
                    gender : "", // 性别
                    birthday : "" // 出生日期(yyyy-mm-dd)
                };
                if (idCardNo.length == 15) {
                    var aday = '19' + idCardNo.substring(6, 12);
                    idCardInfo.birthday = that.formateDateCN(aday);
                    if (parseInt(idCardNo.charAt(14)) % 2 == 0) {
                        idCardInfo.gender = that.genders.female;
                    } else {
                        idCardInfo.gender = that.genders.male;
                    }
                } else if (idCardNo.length == 18) {
                    var aday = idCardNo.substring(6, 14);
                    idCardInfo.birthday = that.formateDateCN(aday);
                    if (parseInt(idCardNo.charAt(16)) % 2 == 0) {
                        idCardInfo.gender = that.genders.female;
                    } else {
                        idCardInfo.gender = that.genders.male;
                    }

                }
                return idCardInfo;
            },

            /* 18位转15位 */
            getId15 : function(idCardNo) {
                var that = this;
                if (idCardNo.length == 15) {
                    return idCardNo;
                } else if (idCardNo.length == 18) {
                    return idCardNo.substring(0, 6) + idCardNo.substring(8, 17);
                } else {
                    return null;
                }
            },

            /* 15位转18位 */
            getId18 : function(idCardNo) {
                var that = this;
                if (idCardNo.length == 15) {
                    var id17 = idCardNo.substring(0, 6) + '19' + idCardNo.substring(6);
                    var parityBit = that.getParityBit(id17);
                    return id17 + parityBit;
                } else if (idCardNo.length == 18) {
                    return idCardNo;
                } else {
                    return null;
                }
            }
        }
        /* base64 加解密 */
        var encodeBase = {
            base64EncodeChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            base64DecodeChars: new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57,
                58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6,
                7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
                25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
                37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1),
            base64encode: function(str) {
                var that = this;
                var out, i, len;
                var c1, c2, c3;
                len = str.length;
                i = 0;
                out = "";

                while (i < len) {
                    c1 = str.charCodeAt(i++) & 0xff;

                    if (i == len) {
                        out += that.base64EncodeChars.charAt(c1 >> 2);
                        out += that.base64EncodeChars.charAt((c1 & 0x3) << 4);
                        out += "==";
                        break
                    }

                    c2 = str.charCodeAt(i++);

                    if (i == len) {
                        out += that.base64EncodeChars.charAt(c1 >> 2);
                        out += that.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                        out += that.base64EncodeChars.charAt((c2 & 0xF) << 2);
                        out += "=";
                        break
                    }

                    c3 = str.charCodeAt(i++);
                    out += that.base64EncodeChars.charAt(c1 >> 2);
                    out += that.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += that.base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                    out += that.base64EncodeChars.charAt(c3 & 0x3F)
                }

                return out
            },
            base64decode: function(str) {
                var that = this;
                var c1, c2, c3, c4;
                var i, len, out;
                len = str.length;
                i = 0;
                out = "";

                while (i < len) {
                    do {
                        c1 = that.base64DecodeChars[str.charCodeAt(i++) & 0xff]
                    } while (i < len && c1 == -1);

                    if (c1 == -1) {
                        break;
                    }

                    do {
                        c2 = that.base64DecodeChars[str.charCodeAt(i++) & 0xff]
                    } while (i < len && c2 == -1);

                    if (c2 == -1) {
                        break;
                    }

                    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

                    do {
                        c3 = str.charCodeAt(i++) & 0xff;

                        if (c3 == 61) {
                            return out;
                        }

                        c3 = that.base64DecodeChars[c3]
                    } while (i < len && c3 == -1);

                    if (c3 == -1) {
                        break;
                    }

                    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

                    do {
                        c4 = str.charCodeAt(i++) & 0xff;

                        if (c4 == 61) {
                            return out;
                        }

                        c4 = that.base64DecodeChars[c4]
                    } while (i < len && c4 == -1);

                    if (c4 == -1) {
                        break;
                    }

                    out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
                }

                return out
            }
        }
		extend({}, Pl, unit);

		window.p = Pl;
})(window, document);