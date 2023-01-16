import redis

red = redis.Redis(
    host='localhost')

target_temp = 35
heater_status = 'off'

if __name__ == '__main__':
    try:

      target_temp = float(red.get('shop_heater_target_temp'))
      f1 = float(red.get('inside_temp_f'))
      if f1 < target_temp:
        heater_status = 'on'
      
      red.set('heater_status', heater_status)
      print("current temp: {}".format(f1))
      print("heater status: {}".format(heater_status))
      print("target temp: {}".format(target_temp))
    except KeyboardInterrupt:
        print("killed by keystroke")

