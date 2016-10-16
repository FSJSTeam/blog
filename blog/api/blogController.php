<?php
require "../service/blogService.php";

class BlogController
{
	public $service;
	public function __construct() {
		$this->service = new BlogService();
	}

}

$action = $_GET['action'];
$method = new BlogController();
if(method_exists($method, $action)){
	$method->$action();	
}else{
	$arr['msg'] = "你请求的方法不存在";
	echo json_encode($arr);

}

?>