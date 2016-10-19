/**
 * 博客详情脚本
 * create by 小刀 2016-10-19
 * 修改记录：
 */

/**
 * 富编辑器
 */
$(function() {
	layui.use('layedit', function() {
		var layedit = layui.layedit;
		layedit.build('content', {
			height: 190,
			width: 710
		});
	});
});