import os, glob, time, json, re, redis, socket

os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

def getDevice():
    try:
        hostname = socket.gethostname()
        with open('./etc/devices.json') as json_file:
            data = json.load(json_file)
            for d in data['devices']:
                if d['host'] == hostname:
                    return(d)
    except(Exception) as error :
            print(error)
def c2f(c):
    return (c * 9.0) / 5.0 + 32.0

def f2c(f):
    return ((f - 32) * (5/9))
def read_temp_raw(device, address, deviceFile):
    f = open(device + "/" + address + "/" + deviceFile, 'r')
    lines = f.readlines()
    f.close()
    return lines

def read_temp(device, address, deviceFile, name):
    r = redis.Redis(host='localhost', port=6379, db=0)
    lines = read_temp_raw(device, address, deviceFile)
    
    equals_pos = lines[1].find('t=')
    if equals_pos != -1:
        temp_string = lines[1][equals_pos+2:]
        if float(temp_string) == 0.0:
            temp_c = f2c(float(r.get(name)))
            print(temp_c)
        else:
            temp_c = float(temp_string) / 1000.0
        temp_f = c2f(temp_c)
        r.set(name, temp_f)
        return json.dumps({"device": name, "c": temp_c, "f": temp_f})

if __name__ == '__main__':
    try:
        device = getDevice()
        for d in device["temperatureSensors"]:
            temp = read_temp(d['path'], d['address'], d['deviceFile'], d['name'])
            print(temp)
    except Exception as e:
        print("General exception occurred: %s" % str(e) + '\n')
    except:
        import traceback
        print("Unhandled exception caught!\n")
        print(traceback.print_exc())
    finally:
        exit(0)

