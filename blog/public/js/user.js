/**
 * 用户中心
 * update by 阿杰 2016-10-26
 * 修改记录：
 * 
 */
$(document).ready(function() {
	common.init('1');
	/*tab的事件监听*/
	layui.use('element', function(){
 		var element = layui.element();
	  	//一些事件监听
		element.on('tab(demo)', function(data){
		  	console.log(data);	
	  });
	});
	/*富文本编辑器*/
	layui.use('layedit', function(){
	  var layedit = layui.layedit;
	  layedit.build('main-textarea'); //建立编辑器
	});
});