/**
 * 首页脚本
 * create by 阿杰 2016-10-14
 * 修改记录：
 * 
 */
var page = {
	event : {
		//跳转到发布页面
		post : function(){
			$('#post').on('click', function() {
				location.href = "./post.html";
			})
		}
	}
}
$(document).ready(function() {
	common.init();
	page.event.post();
});