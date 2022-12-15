#!/usr/bin/env python3
# -*- coding: utf-8 -*-
########################################################################
# Filename    : I2CLCD1602.py
# Description : Use the LCD display data
# Author      : freenove
# modification: 2018/08/03
########################################################################
from PCF8574 import PCF8574_GPIO
from Adafruit_LCD1602 import Adafruit_CharLCD

import redis
from time import sleep, strftime
from datetime import datetime


red = redis.Redis(
    host='localhost')
 
def get_cpu_temp():     # get CPU temperature from file "/sys/class/thermal/thermal_zone0/temp"
    tmp = open('/sys/class/thermal/thermal_zone0/temp')
    cpu = tmp.read()
    tmp.close()
    return '{:.2f}'.format( float(cpu)/1000 ) + ' C'
 
def get_time_now():     # get system time
    return datetime.now().strftime('    %I:%M %p')
    
def loop():
    mcp.output(3,1)     # turn on LCD backlight
    lcd.begin(16,2)     # set number of LCD lines and columns
    while(True):         
        lcd.clear()
        lcd.setCursor(0,0)  # set cursor position
        f1 = round(float(red.get('F1')), 3)
        lcd.message("Inside Temp:\n{}".format(f1))
        sleep(5)
        lcd.clear()
        lcd.setCursor(0,0)  # set cursor position
        f2 = round(float(red.get('F2')), 3)
        lcd.message("Outside Temp:\n{}".format(f2))
        sleep(5)
        lcd.clear()
        lcd.setCursor(0,0)  # set cursor position
        heater_temp = round(float(red.get('heater_temp_f')), 3)
        lcd.message("Heater Temp:\n{}".format(heater_temp))
        sleep(5)
        
def destroy():
    lcd.clear()
    
PCF8574_address = 0x27  # I2C address of the PCF8574 chip.
PCF8574A_address = 0x3F  # I2C address of the PCF8574A chip.
# Create PCF8574 GPIO adapter.
try:
    mcp = PCF8574_GPIO(PCF8574_address)
except:
    try:
        mcp = PCF8574_GPIO(PCF8574A_address)
    except:
        print ('I2C Address Error !')
        exit(1)
# Create LCD, passing in MCP GPIO adapter.
lcd = Adafruit_CharLCD(pin_rs=0, pin_e=2, pins_db=[4,5,6,7], GPIO=mcp)

if __name__ == '__main__':
    print ('Program is starting ... ')
    try:
        loop()
    except KeyboardInterrupt:
        destroy()

