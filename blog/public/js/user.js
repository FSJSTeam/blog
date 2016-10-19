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