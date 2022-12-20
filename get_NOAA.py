import requests,time, redis

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

            noaa = response.json()
            status_code = response.status_code
            if status_code != 200:
                time.sleep(20)
            else:
                red.set('NOAA', noaa)
    except KeyboardInterrupt:
        print("killed by keystroke")
