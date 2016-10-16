<?php
include_once("../lib/Mysql.php");

class SmsService 
{
	public $db;
	public function __construct() {
		
		$this->db = new MysqliDb (Array (
            'host' => DATABASE_HOST,
            'username' => DATABASE_USER, 
            'password' => DATABASE_PASS,
            'db'=> DATABASE_NAME,
            'port' => DATABASE_PORT,
            'prefix' => '',
            'charset' => 'utf8'));
	}
	/**
	 * 验证码在有效期内，将验证码信息存入数据库
	 * @param [type] 
	 */
	public function addCode($data) {
		$id = $this->db->insert('t_code', $data);
		if($id){
			return json_encode(Array("msg"=>"添加成功"));
		}else{
			return json_encode(Array("msg"=>"添加失败"));
		}
	}
	/**
	 * 检查验证码是否过期（5分钟后，需要重新发送短信）
	 * @param  [type] $mobile 
	 * @return [type] $code      
	 */
	public function checkCode($mobile){
		$this->db->where('mobile', $mobile);
		$this->db->orderBy("time","Desc");
		$info = $this->db->getOne('t_code');
		// echo json_encode($info);
		$data = array();
		if(empty($info)){
			//可以发送
			$data['res'] = '1101';
			$data['msg'] = "可以发送";
		}else{
			//继续检查验证码是否在有限期内
			echo $info['time'];
			$createTime = strtotime($info['time']); 
			$now = time();
			$dis = (int)$createTime - (int)$now;
			echo $createTime,"\\\\";
			echo $now,"\\\\";
			echo $dis;
			if($dis <= 300){
				//验证码未过期
				$data['res'] = '1102';
				$data['msg'] = "验证码未过期，不能再次发短信获取验证码";
			}else{
				//验证码已经过期，需要重新发送短信
				$data['res'] = '1103';
				$data['msg'] = "验证码已过期,重新发送短信获取";
			}
			
		}
		return json_encode($data);
	}
}
$sms = new SmsService();

// $sms->addCode($data);

echo $sms->checkCode('13304385326');
?>
