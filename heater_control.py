import os, glob, time, json, redis
from datetime import datetime, timedelta
import RPi.GPIO as GPIO

heaterPin = 11    # define ledPin
delay = 5


red = redis.Redis(
    host='localhost')


def setup():
    GPIO.setmode(GPIO.BOARD)       # use PHYSICAL GPIO Numbering
    GPIO.setup(heaterPin, GPIO.OUT)   # set the ledPin to OUTPUT mode
    GPIO.output(heaterPin, GPIO.LOW)  # make ledPin output LOW level 

def loop():
    while True:
      status = red.get('heater_status').decode("utf-8")
      print("status: {}".format(status))
      if(status == 'on'):
        GPIO.output(heaterPin, GPIO.HIGH)  # make ledPin output HIGH level to turn on heater 
        print ('heater turned on >>>')     # print information on terminal
      else:
        GPIO.output(heaterPin, GPIO.LOW)   # make heaterPin output LOW level to turn off heater
        print ('heater turned off <<<')
      
      time.sleep(delay)                   # Wait for 1 second

def destroy():
    GPIO.cleanup()                      # Release all GPIO

if __name__ == '__main__':    # Program entrance
    print ('Program is starting ... \n')
    setup()
    try:
        loop()
    except KeyboardInterrupt:   # Press ctrl-c to end the program.
        destroy()

