
var page = {
	countdown : 80,
	//发送短信
	sendCode : function() {
		$('#smsCode').on('click', function() {
			var tel = $('#tel').val();
			if(tel.length == 11 && common.isMobile(tel)){
				//电话号通过验证
				page.timeout();
				var url = common.HOSTURL + '/smsController.php?action=sendCodes';
				var sendData = {
					mobile : tel
				};
				common.ajax(url, sendData, function(data) {
					var json = JSON.parse(data);
					if(json && json.code == 1){
						layer.alert("发送成功");
					}else{	
						layer.alert(json.msg);
					}
				});
			}else{
				//未通过验证
				layer.msg("请输入正确的手机号",{icon:0});
				$('#tel').focus();
			}
		});
	},
	//发送验证码倒计时
	timeout : function() {
		var val = $('#smsCode');
		setTimeout(function(){
			if (page.countdown == 0) { 
			val.attr("disabled", false);  
			val.css({'background':'#FF6838','cursor':'pointer'});  
			val.text("免费获取验证码"); 
			page.countdown = 80; 
			} else { 
				val.attr("disabled", 'disabled'); 
				val.css({'background':'#393D49','cursor':'not-allowed'});
				val.text("重新发送(" + page.countdown + ")"); 
				page.countdown--; 
				page.timeout();
			}
		}, 1000);
	},
	//表单验证
	validation : function() {
		var tel = $.trim($('#tel').val());
		var code = $.trim($('#code').val());
		var nickname = $.trim($('#nickname').val());
		var pwd = $.trim($('#pwd').val());
		var repwd = $.trim($('#repwd').val());
		if(tel.length != 11 || !common.isMobile(tel)) {
			layer.msg("请输入正确的手机号",{icon:0});
			$('#tel').focus();
			return false;
		}else if(code.length <=0 || code.length !=6){
			layer.msg("请输入正确的验证码",{icon:0});
			$('#code').focus();
			return false;
		}else if(nickname.length <=0){
			layer.msg("昵称不能为空",{icon:0});
			$('#nickname').focus();
			return false;
		}else if(nickname.length <3){
			layer.msg("昵称不能少于3个字符",{icon:0});
			$('#nickname').focus();
			return false;
		}else if(nickname.length >10){
			layer.msg("昵称不能多于10个字符",{icon:0});
			$('#nickname').focus();
			return false;
		}else if(pwd.length <=0){
			layer.msg("密码不能为空",{icon:0});
			$('#pwd').focus();
			return false;
		}else if(pwd.length <6){
			layer.msg("密码不能少于6个字符",{icon:0});
			$('#pwd').focus();
			return false;
		}else if(pwd.length >16){
			layer.msg("密码不能多于16个字符",{icon:0});
			$('#pwd').focus();
			return false;
		}else if(repwd.length <=0){
			layer.msg("确认密码不能为空",{icon:0});
			$('#repwd').focus();
			return false;
		}else if(pwd != repwd){
			layer.msg("两次密码输入不一致",{icon:0});
			$('#repwd').focus();
			return false;
		}else{
			return true;
		}
	},
	//注册
	post : function() {
		$('#post').on('click', function() {
			if(page.validation()){
				//表单验证通过
				$('#post').attr("disabled", 'disabled'); 
				$('#post').css({'background':'#393D49','cursor':'not-allowed'});  
				$('#post').text('注册中...');
				var url = common.HOSTURL +'/userController.php?action=register';
				var sendData = {
					mobile : $.trim($('#tel').val()),
					code : $.trim($('#code').val()),
					nickname : $.trim($('#nickname').val()),
					password : $.trim($('#pwd').val())
				};
				common.ajax(url, sendData, function(data) {
					$('#post').text('注册');
					$('#post').attr("disabled", false);  
					$('#post').css({'background':'#33AB9F','cursor':'pointer'}); 
					var json = JSON.parse(data);
					if(json && json.code === '1'){
						layer.msg('注册成功',{icon:1});
						setTimeout(function() {
						location.href = './login.html';
						},2000);
					}else{
						layer.msg(json.msg,{icon:0});
					}
				});
			}else{
				//表单验证未通过
			}
		});
	}
};
$(document).ready(function() {
	layui.use(['layer'],function() {
	 	var layer = layui.layer;

		page.sendCode();
		page.post();
	});
});