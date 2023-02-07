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

while True:
    led.high()
    
    # Get Humidity Sensor Readings
    d = dht.DHT11(machine.Pin(16))
    d.measure()
    temp_c = d.temperature() # eg. 23 (°C)
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
    
    led.low()
    time.sleep(3)