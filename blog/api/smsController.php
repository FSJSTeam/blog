<?php
require "../lib/Sms.php";
require "../lib/Code.php";
require "../service/smsService.php";

class SmsController
{
	public $service;
	public function __construct() {
		$this->service = new SmsService();
	}
	public function sendMsg() {
		$mobile = "13304385326";
    	$tpl_id = '1593650';
		$name = "文玉杰";
		$object = 'php开发';
		$sms = new Sms($tpl_id, $mobile, $name, $object);
		$sms->send();

	}
	public function sendCode() {
		$num="";
	    for($i=0;$i<6;$i++){
	    	$num .= rand(0,9);
	    }
	    echo $num;
	    $mobile = "13304385326";
    	$code = new Code($mobile, $num);
		$res = $code->send();
		echo ($res);
		$result['vcode'] = $num;
		$result['service'] = $res;
		$result['mobile'] = $mobile;
		var_dump($result);
		$this->service->addCode($result);
	}
}

$action = $_GET['action'];
$sms = new SmsController();
if(method_exists($sms, $action)){
	$sms->$action();	
}else{
	$arr['msg'] = "你请求的方法不存在";
	echo json_encode($arr);

}

?>