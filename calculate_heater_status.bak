import redis

red = redis.Redis(
    host='localhost')

target_temp = 35
heater_status = 'off'

if __name__ == '__main__':
    try:

      f1 = float(red.get('inside_temp_f'))
      if f1 < target_temp:
        heater_status = 'on'
      
      red.set('heater_status', heater_status)
      print("current temp: {}".format(f1))
      print("heater status: {}".format(heater_status))
    except KeyboardInterrupt:
        print("killed by keystroke")

