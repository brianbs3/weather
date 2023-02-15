import network
import time
import json
import urequests
import ubinascii
import random
from machine import Pin
import dht
import onewire, ds18x20

version = "0.0.5"
poll_interval = 3

led = Pin(15, Pin.OUT)
led.high()
OneWireSensorPin = Pin(28, Pin.IN)
wlan = network.WLAN(network.STA_IF)

mac = ubinascii.hexlify(network.WLAN().config('mac'), ':').decode()
ip = wlan.ifconfig()[0]

led.low()
time.sleep(2)
sensor_temp = machine.ADC(4)
conversion_factor = 3.3 / (65535)
onewire_sensor = ds18x20.DS18X20(onewire.OneWire(OneWireSensorPin))
roms = onewire_sensor.scan()

while True:
    try:
        led.high()
        reading = sensor_temp.read_u16() * conversion_factor 
        onboard_temp_c = 27 - (reading - 0.706)/0.001721
        
    # Get Humidity Sensor Readings
        d = dht.DHT11(machine.Pin(16))
        d.measure()
        humidity_temp_c = d.temperature() # eg. 23 (°C)
        humidity = d.humidity()    # eg. 41 (% RH)
        onewire_sensor.convert_temp()
        onewire_temp_c = 0
    
        for rom in roms:
            onewire_temp_c = round(onewire_sensor.read_temp(rom),4)
        
        response = urequests.post("http://bsserver.home.bs:8081/pico", json={
            'mac': mac,
            'ip': ip,
            'onboard_temp_c': onboard_temp_c,
            'humidity_temp_c': humidity_temp_c,
            'onewire_temp_c': onewire_temp_c,
            'humidity': humidity,
            'version': version
            })

        if 'poll_interval' in response.json():
            poll_interval = response.json()['poll_interval']
        
        response.close()
        print("onboard_temp_c: {}".format(onboard_temp_c))
        print("humidity_temp_c: {}".format(humidity_temp_c))
        print("onewire_temp_fc: {}".format(onewire_temp_c))
#        print("humidity: {}".format(humidity))
    except Exception as e:
        print("caught Exception {}".format(e))
        pass
    
    led.low()
    time.sleep(poll_interval)



