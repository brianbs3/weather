import redis

red = redis.Redis(
    host='localhost')

target_temp = 60
heater_status = 'off'

f1 = float(red.get('F1'))
if f1 < target_temp:
  heater_status = 'on'

red.set('heater_status', heater_status)
print("current temp: {}".format(f1))
print("heater status: {}".format(heater_status))
