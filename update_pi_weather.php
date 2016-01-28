<?php

    $url = 'http://api.wunderground.com/api/82fdf29d7abafe2f/conditions/q/27011.json';

    $rrd_file = "/home/pi/pi_weather.rrd";

/*
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

*/
  $memcache_obj = memcache_connect("localhost", 11211);
  $result = memcache_get($memcache_obj, 'pi_weather');
  $jw = (array) json_decode($result);
  $w = "N:{$jw['F1']}:{$jw['C1']}:{$jw['F2']}:{$jw['C2']}:{$jw['Humidity']}";
  //$w = "N:$f:$c:$f2:$c2:$h";
  $rrd_return = rrd_update($rrd_file, array($w));
  echo "$rrd_return ($w)";
?>
