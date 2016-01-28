#!/bin/bash

HOSTNAME=`/bin/hostname`
echo $HOSTNAME
/usr/bin/rsync /opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd /data/nas/weather/rrd/"$HOSTNAME"/
