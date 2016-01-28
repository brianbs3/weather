<?php
  global $db;
  $db = mysql_connect("bsserver.home.bs", "bs", "bs");
  mysql_select_db("weather", $db) or die(mysql_error());
?>
