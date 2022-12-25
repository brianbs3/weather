import os, glob, time, json, redis, rrdtool
from datetime import datetime, timedelta

timestamp = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.000Z')
print(timestamp)

os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

red = redis.Redis(
    host='localhost')

red.set('hostname', os.uname()[1])
red.set('temperature_startTime', timestamp)

base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'
temps = {}

def get_cpu_temp():
  f = open('/sys/class/thermal/thermal_zone0/temp')
  lines = f.readlines()
  return (float(lines[0]) / 1000.0) * 9.0 / 5.0 + 32.0

def read_temp_raw(device):
    f = open(device + "/w1_slave", 'r')
    lines = f.readlines()
    f.close()
    return lines

def read_temp(device, d):
    lines = read_temp_raw(device)
    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = read_temp_raw()
    equals_pos = lines[1].find('t=')
    if equals_pos != -1:
        temp_string = lines[1][equals_pos+2:]
        temp_c = float(temp_string) / 1000.0
        temp_c = round(temp_c, 3)
        temp_f = temp_c * 9.0 / 5.0 + 32.0
        temp_f = round(temp_f, 3)
        return json.dumps({"device": d, "c": temp_c, "f": temp_f})

  
devices = ["28-0312949750dd", "28-011455020eaa",  "28-030894971c6d"]
rrd = {}


for d in devices:
    dev = base_dir + d
    temps = read_temp(base_dir + d, d)
    print(temps)
    #r.set(d, json.dumps(temps)['f'])
    str =   json.loads(temps)
    if(d == '28-011455020eaa'):
      red.set('inside_temp_f', str['f'])
      red.set('inside_temp_c', str['c'])
    elif(d == '28-0312949750dd'):
      red.set('heater_temp_f', str['f'])
      red.set('heater_temp_c', str['c'])
    elif(d == '28-030894971c6d'):
      red.set('outside_temp_f', str['f'])
      red.set('outside_temp_c', str['c'])


cpuTemp = get_cpu_temp()
red.set('CPU', cpuTemp)
#rrdString = "N:{}:{}:{}:{}:{}:{}:{}".format(rrd['F1'], rrd['C1'], rrd['F2'], rrd['C2'], humidity, 0, cpuTemp)
#rrdtool.update('/data/weather/shopWeather2.rrd', rrdString)
#print(rrdString)

timestamp = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.000Z')
red.set('temperature_endTime', timestamp)
print("cpu: {}".format(cpuTemp))
