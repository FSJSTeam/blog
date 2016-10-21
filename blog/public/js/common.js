/**
 * 公共脚本库
 * create by simless 2016-10-14
 * 修改记录：
 * add some function on 2016-10-21 by simless
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
    }
};