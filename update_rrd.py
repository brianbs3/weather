import os, glob, time, json, redis, rrdtool
from datetime import datetime, timedelta

red = redis.Redis(
    host='localhost')

timestamp = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.000Z')
red.set('rrdUpdate_startTime', timestamp)

f1 = float(red.get('F1'))
f2 = float(red.get('F2'))
c1 = float(red.get('C1'))
c2 = float(red.get('C2'))
humidity = float(red.get('humidity'))
cpuTemp = float(red.get('CPU'))

rrdString = "N:{}:{}:{}:{}:{}:{}:{}".format(f1, c1, f2, c2, humidity, 0, cpuTemp)
print(rrdString)

rrdtool.update('/data/weather/shopWeather2.rrd', rrdString)

timestamp = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.000Z')
red.set('rrdUpdate_endTime', timestamp)
