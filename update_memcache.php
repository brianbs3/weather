<?php
#require_once('weather/sqlinfo.php');

function c2f($c){
  return ($c * 9.0) / 5.0 + 32.0;
}
  $hostname = exec('/bin/hostname');
  if($hostname != "bsweb1" && $hostname != "bsweb2")
  { 
    $humidity_arr = array();
    $h = 0;
    $c2 = 0;
    $f2 = 0;
  
    $temp_arr = array();
    $c = 0; 
    $f = 0;
    exec('python ~/weather/get_temp.py', $temp_arr);
    print_r($temp_arr);
    if(isset($temp_arr[0])) {
      $t_arr = json_decode($temp_arr[0]);
      print_r($t_arr);
      //$t_arr = explode(', ', $temp_arr[0]);
      $c1 = $t_arr->c; //ltrim($t_arr[0], '(');
      $f1 = $t_arr->f; //rtrim($t_arr[1], ')');
    }

    if(isset($temp_arr[1])) {
      //$t_arr = explode(', ', $temp_arr[1]);
      $t_arr = json_decode($temp_arr[1]);
      $c2 = $t_arr->c; //ltrim($t_arr[0], '(');
      $f2 = $t_arr->f; //rtrim($t_arr[1], ')');
    }
  
    $cpu_temp = file('/sys/class/thermal/thermal_zone0/temp');
    if(isset($cpu_temp[0]))
      $cpu = $cpu_temp[0] / 1000;
    else
      $cpu = 0;
  
    $f1 = number_format($f1, 2);
    $f2 = number_format($f2, 2);
    $c1 = number_format($c1, 2);
    $c2 = number_format($c2, 2);
    $h = number_format($h, 2);
    $ts = date('U');
    $cpu = number_format($cpu, 2);
  //  $w = "F1:$f F2:$f2 Humidity:$h";
    $w = array(
      'F1' => $f1,
      'F2' => $f2,
      'C1' => $c1,
      'C2' => $c2,
      'CPU' => c2f($cpu),
      'Humidity' => $h,
      'ts' => $ts,
      'hostname'=>$hostname,
    );
    
  }
  else
  {
    $w = array(
      "F1" => "77.86",
      "F2"=>"77.80",
      "C1"=>"13.812",
      "C2"=>"16",
      "CPU"=>"40.08",
      "Humidity"=>"40.00",
      "ts"=>"1395197589",
      'hostname'=>$hostname,
    );
  }
  $rrd_file = "/data/weather/{$hostname}.rrd";
  $json_weather = json_encode($w);
  #$memcache_obj = memcache_connect("localhost", 11211);
  #memcache_set($memcache_obj, "{$hostname}_weather", $json_weather, MEMCACHE_COMPRESSED, 600);
  #$result = memcache_get($memcache_obj, "{$hostname}_weather");

  $jw = (array) json_decode($result);

  /**************
  * Redis
  **************/
   
  $redis = new Redis(); 
  $redis->connect('127.0.0.1', 6379); 
  $redis->set("F1", "{$jw['F1']}"); 
  $redis->set("F2", "{$jw['F2']}"); 
  $redis->set("CPU", "{$jw['CPU']}");  
  $redis->set("HOSTNAME", "{$hostname}");  
  $redis->set("ts", "{$ts}");  

  $w = "N:{$jw['F1']}:{$jw['C1']}:{$jw['F2']}:{$jw['C2']}:{$jw['Humidity']}:0:{$jw['CPU']}";
  //$w = "N:$f:$c:$f2:$c2:$h";
  $rrd_return = rrd_update($rrd_file, array($w));

  //$query = "INSERT IGNORE INTO $hostname(f1,f2,humidity,cpu) VALUES('{$jw['F1']}', '{$jw['C1']}', '{$jw['Humidity']}', '{$jw['CPU']}')";
  //mysql_query($query) or die(mysql_error());
  //$memcache_obj = memcache_connect("localhost", 11211);

  print_r($result);
  //echo "return: $rrd_return $w";
  //echo "$w";
?>
