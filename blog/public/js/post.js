/**
 * 发布博客脚本
 * create by 阿杰 2016-10-15
 * 修改记录：
 */
var page = {
	/**
	 * 表单验证
	 * @return {[blloean]} [表单验证结果，true或者false]
	 */
	validation : function(){		
		if($.trim($('#title').val()) === ''){
			layer.msg('请输入标题', {icon: 0});
			$('#title').focus();
			return false;
		}else if($.trim($('#content').val()) === ''){
			layer.msg('请输入内容', {icon: 0});
			return false;
		}else if($.trim($('#type').val()) === ''){
			layer.msg('请选择类别', {icon: 0});
			$('#type').focus();
			return false;
		}else if($.trim($('#tag').val()) === ''){
			layer.msg('请输入标签', {icon:0});
			$('#tag').focus();
			return false;
		}
		else{
			return true;
		}
	},
	/**
	 * 发布博客
	 * @param  {[string]} layedit [layui富文本编辑器模块]
	 * @param  {[string]} index   [layui富文本编辑器索引]
	 * @return 
	 */
	post : function(layedit, index){
		var that = this;
		
		$('#post').click(function(){
			if(that.validation()){
				//表单验证通过
				var sendData = {
					title : $('#title').val(),
					content : layedit.getContent(index),
					text : layedit.getText(index),
					typeid : $('#type').val(),
					tag : $('#tag').val()
				};
				console.log(sendData);
				//ajax请求后台
				
			}else{
				//表单验证未通过
			}
		});
	}

};

layui.all(function(){
  var layer = layui.layer,
  layedit = layui.layedit;
  
  	//建立编辑器
  	var index = layedit.build('content',{
		  	height : 300,
		  	uploadImage: {
		    url: '', //接口url
		    type: 'post' //默认post
	  	}
  	});

  	//发布博客
  	page.post(layedit, index);
});
