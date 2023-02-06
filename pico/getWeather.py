import network
import secrets
import time
import json
import urequests
import ubinascii

wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(secrets.SSID, secrets.PASSWORD)

print("wlan connected: {}".format(wlan.isconnected()))


mac = ubinascii.hexlify(network.WLAN().config('mac'), ':').decode()
data = {'mac': mac}
stats = urequests.post("http://192.168.1.110:8081/pico", json=data)
print(stats.json())
