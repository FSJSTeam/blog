var page = {
	validation : function() {
		var tel = $.trim($('#tel').val());
		var pwd = $.trim($('#pwd').val());
		if(tel.length != 11 || !common.isMobile(tel)) {
			layer.msg("请输入正确的手机号",{icon:0});
			$('#tel').focus();
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
		}else{
			return true;
		}
	},
	post : function() {
		$('#post').on('click', function() {
			if(page.validation()){
				//表单验证通过
				$('#post').attr("disabled", 'disabled'); 
				$('#post').css({'background':'#393D49','cursor':'not-allowed'}); 
				$('#post').text('登陆中');
				var url = common.HOSTURL + '/userController.php?action=login';
				var sendData = {
					mobile : $.trim($('#tel').val()),
					password : $.trim($('#pwd').val())
				};
				common.ajax(url ,sendData, function(data) {
					$('#post').attr("disabled", false); 
					$('#post').css({'background':'#33AB9F','cursor':'pointer'});
					$('#post').text('登陆');
					var json = JSON.parse(data);
					if(json && json.code == '1'){
						//登录成功
						common.setCookie('uuid',json.info.uuid,30);
						common.setCookie('mobile',json.info.mobile,30);
						common.setCookie('name',json.info.nickname,30);
						location.href = './blogdetail.html';

					}else{
						//登录失败
						layer.alert("用户名或密码错误");
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
		page.post();
	});
});