<?php

  $url = 'http://api.wunderground.com/api/82fdf29d7abafe2f/conditions/q/27011.json';

  $rrd_file = "/data/weather/shopWeather1.rrd";

  $memcache_obj = memcache_connect("localhost", 11211);
  $result = memcache_get($memcache_obj, 'shopWeather1');
  $jw = (array) json_decode($result);
  $w = "N:{$jw['F1']}:{$jw['C1']}:{$jw['F2']}:{$jw['C2']}:{$jw['Humidity']}";
  //$w = "N:$f:$c:$f2:$c2:$h";
  $rrd_return = rrd_update($rrd_file, array($w));
  echo "$rrd_return ($w)";
?>
