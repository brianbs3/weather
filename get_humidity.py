
import os, glob, time, json, redis, rrdtool
from datetime import datetime, timedelta
import RPi.GPIO as GPIO
import Freenove_DHT as DHT

DHTPin = 13     #define the pin of DHT11
humidityLoop = 5

GPIO.setwarnings(False)

timestamp = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.000Z')

# 28-0114551eafaa has black mark
os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

red = redis.Redis(
    host='localhost')

red.set('hostname', os.uname()[1])
red.set('humidity_startTime', timestamp)

def humidity_loop(loopCount):
    humiditySum = 0
    dht = DHT.DHT(DHTPin)   #create a DHT class object
    counts = 0 # Measurement counts
    while(counts < loopCount):
        counts += 1
        for i in range(0,15):            
            chk = dht.readDHT11()     #read DHT11 and get a return value. Then determine whether data read is normal according to the return value.
            if (chk is dht.DHTLIB_OK):      #read DHT11 and get a return value. Then determine whether data read is normal according to the return value.
                break
            time.sleep(0.1)
        humiditySum += dht.humidity
        time.sleep(2)       
        
    return (humiditySum / loopCount)
  


humidity = humidity_loop(humidityLoop)
humidity = round(humidity, 3)
red.set('humidity', humidity)

print("humidity: {}".format(humidity))
timestamp = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.000Z')
red.set('humidity_endTime', timestamp)
