<?php

  require 'sqlinfo.php';
  $hostname = gethostname();
  $memcache_obj = memcache_connect("localhost", 11211);
  $result = memcache_get($memcache_obj, $hostname.'_weather');
  $jw = (array) json_decode($result);
  $w = "F1:{$jw['F1']} F2:{$jw['F2']} Humidity:{$jw['Humidity']}";
  echo $w;
  $f = $jw['F1'];
  $f2 = $jw['F2'];
  $h = $jw['Humidity'];
  $query = "INSERT IGNORE INTO $hostname(f1,f2,humidity) VALUES('$f', '$f2', '$h')";
  mysql_query($query) or die(mysql_error());
/*
require_once('sqlinfo.php');


  $humidity_arr = array();
  $h = 0;
  $c2 = 0;
  $f2 = 0;
  for($i = 0; $i < 50; $i++)
  {
    if($h == null)
    {
      exec('sudo /usr/local/bin/Adafruit_DHT 11 18 | grep Hum', $humidity_arr);
//      echo"<pre>";
//      print_r($humidity_arr);
//      echo"</pre>";
      
      if(isset($humidity_arr[0]))
      {
        $t_arr = explode(' ', $humidity_arr[0]);
        $c2 = trim($t_arr[2]);
        $f2 = (($c2 * 9)/5) + 32;
        $h_arr = explode('Hum =', $humidity_arr[0]);
        $h = trim(rtrim($h_arr[1], '%'));
      }
//      echo"h: $h\n";
    }
  }


  $temp_arr = array();
  $c = 0; 
  $f = 0;
  exec('python /home/pi/pi/get_temp.py', $temp_arr);
  if(isset($temp_arr[0]))
  {
    $t_arr = explode(', ', $temp_arr[0]);

    $c = ltrim($t_arr[0], '(');
    $f = rtrim($t_arr[1], ')');
  }

  $f = number_format($f, 2);
  $f2 = number_format($f2, 2);
  $h = number_format($h, 2);
  $w = "F1:$f F2:$f2 Humidity:$h";
  
  $query = "INSERT IGNORE INTO pi(f1,f2,humidity) VALUES('$f', '$f2', '$h')";
  mysql_query($query) or die(mysql_error());
  echo "$w";
*/
?>
