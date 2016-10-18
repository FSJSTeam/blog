	/*tab的事件监听*/
	layui.use('element', function(){
 			 var element = layui.element();
  
  //一些事件监听
 			 element.on('tab(demo)', function(data){
  			  console.log(data);	
  });
});