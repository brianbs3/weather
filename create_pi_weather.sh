#!/bin/bash

HOSTNAME=`/bin/hostname`
echo "hostname: $HOSTNAME"
FILENAME=$HOSTNAME".rrd"

  echo "file does not exist"
  rrdtool create /data/weather/$FILENAME --step 60 \
  DS:temp_f1:GAUGE:120:-50:130 \
  DS:temp_c1:GAUGE:120:-50:100 \
  DS:temp_f2:GAUGE:120:-50:130 \
  DS:temp_c2:GAUGE:120:-50:100 \
  DS:humidity:GAUGE:120:0:100 \
  DS:pressure:GAUGE:120:0:100 \
  DS:cpu0temp:GAUGE:120:0:100 \
  RRA:AVERAGE:0.5:1:1440 \
  RRA:MIN:0.5:1:1440 \
  RRA:MAX:0.5:1:1440 \
  RRA:AVERAGE:0.5:30:17520 \
  RRA:MIN:0.5:30:17520 \
  RRA:MAX:0.5:30:17520
