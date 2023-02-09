import network
import time
import json
import urequests
import ubinascii
import random
from machine import Pin
import dht

led = Pin("LED", Pin.OUT)
led.high()

wlan = network.WLAN(network.STA_IF)

mac = ubinascii.hexlify(network.WLAN().config('mac'), ':').decode()
ip = wlan.ifconfig()[0]

led.low()
time.sleep(2)
sensor_temp = machine.ADC(4)
conversion_factor = 3.3 / (65535)
while True:
    try:
        led.high()
        reading = sensor_temp.read_u16() * conversion_factor 
        temp_c = 27 - (reading - 0.706)/0.001721
        
    # Get Humidity Sensor Readings
        d = dht.DHT11(machine.Pin(16))
        d.measure()
#        temp_c = d.temperature() # eg. 23 (°C)
        humidity = d.humidity()    # eg. 41 (% RH)
    
        temp_f = (temp_c * (9.0 / 5.0)) + 32.0
    
        response = urequests.post("http://bsserver.home.bs:8081/pico", json={
            'mac': mac,
            'ip': ip,
            'temp_f': temp_f,
            'temp_c': temp_c,
            'humidity': humidity
            })
        response.close()
        print("temp_f: {}".format(temp_f))
        print("humidity: {}".format(humidity))
    except Exception as e:
        print("caught Exception {}".format(e))
        pass
    
    led.low()
    time.sleep(30)