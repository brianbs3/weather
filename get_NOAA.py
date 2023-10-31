import requests,time, redis, json

red = redis.Redis(
    host='localhost')

url = "https://api.weather.gov/gridpoints/RNK/50,19/forecast"

payload = {}
headers = {}


if __name__ == '__main__':
    try:
        status_code = 0
        while status_code != 200:
            response = requests.request("GET", url, headers=headers, data=payload)

            noaa = json.loads(response.text)
            for n in noaa['properties']['periods']:
              print("name: {} -> detailedForecast: {}".format(n['name'], n['detailedForecast']))
            status_code = response.status_code
            if status_code != 200:
                time.sleep(20)
            else:
                red.set('NOAA', json.dumps(noaa))
    except KeyboardInterrupt:
        print("killed by keystroke")
