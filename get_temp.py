import os, glob, time, json, redis

# 28-0114551eafaa has black mark

os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

r = redis.Redis(
    host='localhost')

base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'
temps = {}

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
        temp_f = temp_c * 9.0 / 5.0 + 32.0
        return json.dumps({"device": d, "c": temp_c, "f": temp_f})
  
devices = ["28-011455020eaa", "28-0114551eafaa"]
for d in devices:
    dev = base_dir + d
    temps = read_temp(base_dir + d, d)
    #r.set(d, json.dumps(temps)['f'])
    str =   json.loads(temps)
    print(str['f'])
    r.set(d, str['f'])

