<?php

  $w = new weather();

  $f = $w->f2c(87);
  echo"$f\n";
  $c = $w->c2f(40);
  echo"$c\n";

  $h = 41;
  $c = 23;
  $dp = $w->dew_point($c, $h);
  $dpf = $w->c2f($dp);
  echo"$dp\n";
  echo"$dpf\n";


  class weather
  {
    public function f2c($f)
    {
      $c = (($f - 32) * 5) / 9;
      return number_format($c, 2);
    }

    public function c2f($c)
    {
      $f = (($c * 9) / 5) + 32;
      return number_format($f, 2);
    }

    public function dew_point($t, $h)
    {
      $td = 243.04*(log($h/100)+((17.625*$t)/(243.04+$t)))/(17.625-log($h/100)-((17.625*$t)/(243.04+$t)));

      return number_format($td, 2);

    }
  }
?>
