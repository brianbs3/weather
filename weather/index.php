<?php
  require_once('sqlinfo.php');
  $hostname = exec('/bin/hostname');
  $memcache_obj = memcache_connect("localhost", 11211);
  $weather = memcache_get($memcache_obj, "{$hostname}_weather");
  $weather_arr = json_decode($weather);
  
/*
  $temp_arr = array();
  exec('python /home/pi/get_temp.py', $temp_arr);
  if(isset($temp_arr[0]))
  {
    $t_arr = explode(', ', $temp_arr[0]);

    $c = ltrim($t_arr[0], '(');
    $f = rtrim($t_arr[1], ')');
    echo"c: $c<br>f: $f<hr>";
  }
*/
/*
$query = "SELECT f1,ts FROM $hostname ORDER BY ts DESC LIMIT 1";
$result = mysql_query($query);
$f1 = 0;
$ts = 0;
while($r = mysql_fetch_array($result))
{
  $f1 = $r['f1'];
  $ts = $r['ts'];
}
*/
  $f1 = $weather_arr->F1;
  $ts = $weather_arr->ts;
echo "<h1 align=center>$f1&deg;</h1>";
echo "<h2 align=center>" . date('D, F d Y  @  h:i:s A', $ts) . "</h2>";

echo"<hr>";
//echo"<img src=pi-temperature.png border=0>";
echo"<img src={$hostname}_temperature_2hrs.png border=0>";
echo"<img src={$hostname}_temperature_6hrs.png border=0>";
echo"<img src={$hostname}_temperature_day.png border=0>";
echo"<img src={$hostname}_temperature_week.png border=0>";
echo"<img src={$hostname}_temperature_month.png border=0>";
echo"<img src={$hostname}_temperature_year.png border=0>";
echo"<img src={$hostname}_humidity.png border=0>";
?>
