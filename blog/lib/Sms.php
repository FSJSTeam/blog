<?php
class Sms
{
	public $apikey = "345612d1736e66b9d994f3b89e159c12"; 
	public $mobile; 
	public $tpl_id;
	public $name;
	public $object;
	public $data;
	public function __construct($tpl_id, $mobile, $name, $object){
		$this->tpl_id = $tpl_id;
		$this->mobile = $mobile;
		$this->name = $name;
		$this->object = $object;
	}
	public function send(){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept:text/plain;charset=utf-8', 'Content-Type:application/x-www-form-urlencoded','charset=utf-8'));
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_TIMEOUT, 10);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		$this->data=array('tpl_id'=>$this->tpl_id,'tpl_value'=>('#name#').'='.urlencode($this->name).'&'.urlencode('#object#').'='.urlencode($this->object),'apikey'=>$this->apikey,'mobile'=>$this->mobile);
		curl_setopt ($ch, CURLOPT_URL, 'https://sms.yunpian.com/v2/sms/tpl_single_send.json');
	    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($this->data));
	    var_dump(curl_exec($ch));
	    curl_close($ch);
	}
}

?>