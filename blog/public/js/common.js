/**
 * 公共脚本库
 * create by simless 2016-10-14
 * 修改记录：
 * add some function on 2016-10-21 by simless
 * add some function on 2016-10-22 by simless
 */
var common  = {
	HOSTURL : 'http://mmblog.duapp.com/blogGard/api',
	ajax : function(url, data, callback){
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": url,
			"method": "POST",
			"headers": {
			    "content-type": "application/x-www-form-urlencoded"
			},
			    "data": data
		}
		$.ajax(settings).done(function(response) {
		    callback(response);
		});
	},
	/**
     * 设置cookies
     * @param c_name
     * @param value
     * @param expiredays
     */
    setCookie : function(c_name,value,expiredays) {
    	
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
		
	},
	/**
	 * 获取cookies
	 * @param key
	 * @returns
	 */
	getCookie : function(key) {
		
		var cookieStr = document.cookie;
		var cookieArr = cookieStr.split(';');
		var Arr = new Array();
		for(var i=0;i<cookieArr.length;i++){
			Arr[$.trim(cookieArr[i].split('=')[0])] = $.trim(cookieArr[i].split('=')[1]);
		}
		return Arr[key];
		
	},
	/**
     * 删除cookie
     * @param String name
     * @return
     */
    del: function (name) {
    	
    	common.setCookie(name, "", -1);  
    },
    /**
     * 获取表单元素，拼成json
     * @param id
     * @returns 
     */
    getForm : function(id) {
    	var json = {};
    	$(id).find('[name]').each(function(i, k){	
    		json[$(k).attr('name')] = $(k).val();
    	});
    	return json;
    },
    /**
     * 
     * @param id    选择器
     * @param type  type=clear 清空所有数据  type=other 加载数据
     * @param json  type=other时要加载的数据
     */
    setForm : function(id, type, json) {
    	if(type == 'clear'){
    		$(id).find('[name]').each(function(i, k){
    			$(k).val('');
    		});
    	}else{
    		var name = new Array();
    		$(id).find('[name]').each(function(i, k){
    			$.each(json, function(j){
    				if($(k).attr('name') == j){
    					$(k).val(json[j]);	
    				}
    			});
    		});
    	}
    },
    /**
     * 时间戳转日期
     */
    time2date : function() {
    	var timestamp = arguments[0] ? arguments[0].toString() : '';
    	var newDate = new Date();
    	newDate.setTime(timestamp);
    	Date.prototype.format = function(format) {
    	       var date = {
    	              "M+": this.getMonth() + 1,
    	              "d+": this.getDate(),
    	              "h+": this.getHours(),
    	              "m+": this.getMinutes(),
    	              "s+": this.getSeconds(),
    	              "q+": Math.floor((this.getMonth() + 3) / 3),
    	              "S+": this.getMilliseconds()
    	       };
    	       if (/(y+)/i.test(format)) {
    	              format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    	       }
    	       for (var k in date) {
    	              if (new RegExp("(" + k + ")").test(format)) {
    	                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
    	                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    	              }
    	       }
    	       return format;
    	}
    	return newDate.format('yyyy-MM-dd h:m:s');	
    },
    /**
     * 日期转时间戳
     */
    date2time : function() {
    	var date = arguments[0] ? arguments[0].toString() : '';
    	var time = new Date((date).replace(new RegExp("-","gm"),"/")).getTime();
    	return time;
    },
    /**
     * 判断是不是空字符串
     * @param str
     * @returns {Boolean}
     */
    isNullString : function(str){
        
        if(str==undefined || str==null || str=="" || _trim(str)=="")
            return true;
        return false;
        
    },
    /**
     * 判断object/json是不是空对象
     * @param e
     * @returns {Number}
     */
    isEmptyObject : function(e) {  
       
        var t;  
        for (t in e)  
            return !1;  
        return !0 
        
    },
    /**
     * 判断字符串是不是url
     * @param url
     * @returns {Boolean}
     */
    isURL : function(url) {
        
        var strRegex = "^((https|http|ftp|rtsp|mms)://)?[a-z0-9A-Z]{3}\.[a-z0-9A-Z][a-z0-9A-Z]{0,61}?[a-z0-9A-Z]\.com|net|cn|cc (:s[0-9]{1-4})?/$";
        var re = new RegExp(strRegex);
        if (re.test(url)) {
            return true;
        } else {
            return false;
        }
        
    },
    /**
     * 判断字符串是不是电话或传真
     * @param str
     * @returns
     */
    isTel : function (str) {

        var pattern = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
        return pattern.exec(str);

    },
    /**
     * 判断字符串是不是手机号
     * @param str
     * @returns
     */
    isMobile : function (str) {

        var patrn = /^((13[0-9])|(15[0-35-9])|(17[0-9])|(18[0,2,3,5-9]))\d{8}$/;
        return patrn.exec(str);

    },
    /**
     * 判断字符串是不是email
     * @param str
     * @returns
     */
    isEmail : function (str) {

        var emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*\.[\w-]+$/i;
        return emailReg.test(str);

    },
    /**
     * 获取url参数
     * @param key
     * @param split
     * @returns
     * 
     * 比如http:www.cc.com?name=marry&&age=21
     * common.getHeader(name, '&&')  的返回值为marry
     */
    getHeader : function(key,split){
        
        var urlStr = location.href;
        var urlArr = urlStr.split('?');
        var needDo = urlArr[1];
        var getArr = needDo.split(split);
        var Arr = new Array();
        for(var i=0;i<getArr.length;i++){
            Arr[$.trim(getArr[i].split('=')[0])] = $.trim(getArr[i].split('=')[1]);
        }
        return Arr[key];
        
    },
    /**
     * 获取uuid
     * @returns
     */
    uuid : function() {
        
        var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var chars = CHARS, uuid = new Array(36), rnd=0, r;
        for (var i = 0; i < 36; i++) {
            if (i==8 || i==13 ||  i==18 || i==23) {
                uuid[i] = '-';
            } else if (i==14) {
                uuid[i] = '4';
            } else {
                if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
        return uuid.join('');
        
    },
    /**
     * 文字部分高亮
     * @param key  需要高亮的关键字              （必须参数）
     * @param content  高亮搜索的文字范围，内容  （必须参数）
     * @param styleClass 高亮文字部分的样式class （必须参数）
     * @returns
     * 功能说明：
     *  在content中找出key高亮
     * 使用方法：
     *   var html = lighten('maixiaojie', $('#content').html(), 'styleClass');
     *   $('#content').html(html);
     */
    lighten : function(key, content, styleClass){
        
        if(key == '' || content == '' || styleClass == ''){
            console.log("参数不完整");
        }else{
            var arr = content.split(key);
            var len = arr.length;
            /*
            *len == 1   content不包含key
            *len == 2   包含一个 
            */
            if(len >1){
                //至少需要一个高亮
                for(var i=0;i<len-1;i++){
                    arr[i] += '<span class="' + styleClass + '">' + key + '</span>';
                }
                return arr.join('');

            }else{
                //不需要高亮
                return content;
            }   
        }
        
    },
    /**
     * 给input输入框设置输入条件，只能为正整数，切最大值为max
     * @param ele input节点
     * @param event  事件触发事件
     * @param max     数据输入最大值
     * 说明：  输入不合法会清空输入框
     * 使用方法：common.onlyNum($('#pageNum'), 'keyup', 1000);
     */
    onlyNum : function(ele, event, max){
        
        ele.on(event, function(){
            var value = ele.val();
            if(value != '' && !isNaN(value) && parseInt(value)>0 && parseInt(value) <= max && value%1 === 0){
                //合法
                //console.log('ok');
            }else{
                //不合法
                ele.attr('value', '');
            }
        });
        
    },
    /**
     * html编码函数 (htmlspecialchars-处理特殊字符)
     * @param str
     * @returns {String}
     */
    htmlspecialchars : function(str){    
        var s = "";  
        if (str.length == 0) return "";  
        for   (var i=0; i<str.length; i++)  
        {  
            switch (str.substr(i,1))  
            {  
                case "<": s += "&lt;"; break;  
                case ">": s += "&gt;"; break;  
                case "&": s += "&amp;"; break;  
                case " ":  
                    if(str.substr(i + 1, 1) == " "){  
                        s += " &nbsp;";  
                        i++;  
                    } else s += " ";  
                    break;  
                case "\"": s += "&quot;"; break;  
                case "\n": s += "<br>"; break;  
                default: s += str.substr(i,1); break;  
            }  
        }  
        return s;  
    }
};

/**
 * @name 前端分页辅助函数
 * @author Simless
 * @createTime 2016-08-24 17:10:30
 * @description 
 * 使用方法：
 * $.getJSON('./page.json',function(data){
        if(data.result == 1){
            var json = data.data;
            var obj = pageHelper.start(json, 2, 8);
            console.log(obj.list);
        }
    });
 */
var pageHelper = {
    /**
     * 
     * @param {Object} json
     * @param {String} pageNum
     * @param {String} pageSize
     */
    start : function(json, pageNum, pageSize){
        if(json && json.length && pageNum>0 && pageSize>0){
            
            var total = json.length; //总记录数
            var totalPage = Math.ceil(total/pageSize);//总页数
            var hasLastPage = pageNum <= 1 ? false : true;//是否有上一页
            var hasNextPage = pageNum >= totalPage ? false : true;//是否存在下一页
            var start = (pageNum-1)*pageSize;
            var end = pageNum*pageSize-1;
            var list = {};
            if(pageNum < totalPage){            
                for(var i=start;i<=end; i++){
                    list[i] = json[i];
                }
            }else if(pageNum == totalPage){
                for(var i=start;i<=total-1; i++){
                    list[i] = json[i];
                }
            }else{
                list = null;
            }
            return {
                "start" : start,
                "end" : end,
                "pageNum" : pageNum,
                "pageSize" : pageSize,
                "total" : total,
                "totalPage" : totalPage,
                "hasLastPage" : hasLastPage,
                "hasNextPage" : hasNextPage,
                "list" : list
            }
        }else{
            return {
                "message" : "传入参数有误"
            }
        }
    }
};