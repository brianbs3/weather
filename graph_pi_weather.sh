#!/bin/bash

W=600
H=300

HOSTNAME=`/bin/hostname`

rrdtool graph /opt/bsWeather/weather/"$HOSTNAME"_temperature_2hrs.png --start -7200 -a PNG -t "Temperature F 2hrs" --vertical-label "Degrees F" -w $W -h $H -r \
DEF:a=/opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd:temp_f1:AVERAGE  \
DEF:b=/opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd:temp_f2:AVERAGE  \
DEF:c=/opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd:humidity:AVERAGE  \
CDEF:cdefbf=237.7,17.271,a,32,-,1.8,/,*,237.7,a,32,-,1.8,/,+,/,c,100,/,LOG,+,*,17.271,17.271,a,32,-,1.8,/,*,237.7,a,32,-,1.8,/,+,/,c,100,/,LOG,+,-,/,1.8,*,32,+ \
AREA:a#FFC73BFF:"F1"  \
GPRINT:a:LAST:"      Last%8.2lf %s"  \
GPRINT:a:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:a:MAX:"Max%8.2lf %s"  \
GPRINT:a:MIN:"Min%8.2lf %s\n"  \
LINE2:b#FF7D00FF:"F2"  \
GPRINT:b:LAST:"      Last%8.2lf %s"  \
GPRINT:b:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:b:MAX:"Max%8.2lf %s"  \
GPRINT:b:MIN:"Min%8.2lf %s\n"  \
LINE2:c#3D168BFF:"Humidity"  \
GPRINT:c:LAST:"Last%8.2lf %s"  \
GPRINT:c:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:c:MAX:"Max%8.2lf %s"  \
GPRINT:c:MIN:"Min%8.2lf %s\n"  \
LINE3:cdefbf#FF00FFFF:"dewpoint" \
GPRINT:cdefbf:LAST:"Last%8.2lf %s"  \
GPRINT:cdefbf:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:cdefbf:MAX:"Max%8.2lf %s"  \
GPRINT:cdefbf:MIN:"Min%8.2lf %s\n"  

rrdtool graph /opt/bsWeather/weather/"$HOSTNAME"_temperature_6hrs.png --start -21600 -a PNG -t "Temperature F 6hrs" --vertical-label "Degrees F" -w $W -h $H -r \
DEF:a=/opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd:temp_f1:AVERAGE  \
DEF:b=/opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd:temp_f2:AVERAGE  \
DEF:c=/opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd:humidity:AVERAGE  \
CDEF:cdefbf=237.7,17.271,a,32,-,1.8,/,*,237.7,a,32,-,1.8,/,+,/,c,100,/,LOG,+,*,17.271,17.271,a,32,-,1.8,/,*,237.7,a,32,-,1.8,/,+,/,c,100,/,LOG,+,-,/,1.8,*,32,+ \
AREA:a#FFC73BFF:"F1"  \
GPRINT:a:LAST:"      Last%8.2lf %s"  \
GPRINT:a:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:a:MAX:"Max%8.2lf %s"  \
GPRINT:a:MIN:"Min%8.2lf %s\n"  \
LINE2:b#FF7D00FF:"F2"  \
GPRINT:b:LAST:"      Last%8.2lf %s"  \
GPRINT:b:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:b:MAX:"Max%8.2lf %s"  \
GPRINT:b:MIN:"Min%8.2lf %s\n"  \
LINE2:c#3D168BFF:"Humidity"  \
GPRINT:c:LAST:"Last%8.2lf %s"  \
GPRINT:c:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:c:MAX:"Max%8.2lf %s"  \
GPRINT:c:MIN:"Min%8.2lf %s\n"  \
LINE3:cdefbf#FF00FFFF:"dewpoint" \
GPRINT:cdefbf:LAST:"Last%8.2lf %s"  \
GPRINT:cdefbf:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:cdefbf:MAX:"Max%8.2lf %s"  \
GPRINT:cdefbf:MIN:"Min%8.2lf %s\n"  

rrdtool graph /opt/bsWeather/weather/"$HOSTNAME"_temperature_day.png --start -86400 -a PNG -t "Temperature F Day" --vertical-label "Degrees F" -w $W -h $H -r \
DEF:a=/opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd:temp_f1:AVERAGE  \
DEF:b=/opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd:temp_f2:AVERAGE  \
DEF:c=/opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd:humidity:AVERAGE  \
CDEF:cdefbf=237.7,17.271,a,32,-,1.8,/,*,237.7,a,32,-,1.8,/,+,/,c,100,/,LOG,+,*,17.271,17.271,a,32,-,1.8,/,*,237.7,a,32,-,1.8,/,+,/,c,100,/,LOG,+,-,/,1.8,*,32,+ \
AREA:a#FFC73BFF:"F1"  \
GPRINT:a:LAST:"      Last%8.2lf %s"  \
GPRINT:a:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:a:MAX:"Max%8.2lf %s"  \
GPRINT:a:MIN:"Min%8.2lf %s\n"  \
LINE2:b#FF7D00FF:"F2"  \
GPRINT:b:LAST:"      Last%8.2lf %s"  \
GPRINT:b:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:b:MAX:"Max%8.2lf %s"  \
GPRINT:b:MIN:"Min%8.2lf %s\n"  \
LINE2:c#3D168BFF:"Humidity"  \
GPRINT:c:LAST:"Last%8.2lf %s"  \
GPRINT:c:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:c:MAX:"Max%8.2lf %s"  \
GPRINT:c:MIN:"Min%8.2lf %s\n"  \
LINE3:cdefbf#FF00FFFF:"dewpoint" \
GPRINT:cdefbf:LAST:"Last%8.2lf %s"  \
GPRINT:cdefbf:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:cdefbf:MAX:"Max%8.2lf %s"  \
GPRINT:cdefbf:MIN:"Min%8.2lf %s\n"  

rrdtool graph /opt/bsWeather/weather/"$HOSTNAME"_temperature_month.png --start -2419200 -a PNG -t "Temperature F Month" --vertical-label "Degrees F" -w $W -h $H -r \
DEF:a=/opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd:temp_f1:AVERAGE  \
DEF:b=/opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd:temp_f2:AVERAGE  \
DEF:c=/opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd:humidity:AVERAGE  \
CDEF:cdefbf=237.7,17.271,a,32,-,1.8,/,*,237.7,a,32,-,1.8,/,+,/,c,100,/,LOG,+,*,17.271,17.271,a,32,-,1.8,/,*,237.7,a,32,-,1.8,/,+,/,c,100,/,LOG,+,-,/,1.8,*,32,+ \
AREA:a#FFC73BFF:"F1"  \
GPRINT:a:LAST:"      Last%8.2lf %s"  \
GPRINT:a:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:a:MAX:"Max%8.2lf %s"  \
GPRINT:a:MIN:"Min%8.2lf %s\n"  \
LINE2:b#FF7D00FF:"F2"  \
GPRINT:b:LAST:"      Last%8.2lf %s"  \
GPRINT:b:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:b:MAX:"Max%8.2lf %s"  \
GPRINT:b:MIN:"Min%8.2lf %s\n"  \
LINE2:c#3D168BFF:"Humidity"  \
GPRINT:c:LAST:"Last%8.2lf %s"  \
GPRINT:c:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:c:MAX:"Max%8.2lf %s"  \
GPRINT:c:MIN:"Min%8.2lf %s\n"  \
LINE3:cdefbf#FF00FFFF:"dewpoint" \
GPRINT:cdefbf:LAST:"Last%8.2lf %s"  \
GPRINT:cdefbf:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:cdefbf:MAX:"Max%8.2lf %s"  \
GPRINT:cdefbf:MIN:"Min%8.2lf %s\n"  

rrdtool graph /opt/bsWeather/weather/"$HOSTNAME"_temperature_year.png --start -1y -a PNG -t "Temperature F Year" --vertical-label "Degrees F" -w $W -h $H -r \
DEF:a=/opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd:temp_f1:AVERAGE  \
DEF:b=/opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd:temp_f2:AVERAGE  \
DEF:c=/opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd:humidity:AVERAGE  \
CDEF:cdefbf=237.7,17.271,a,32,-,1.8,/,*,237.7,a,32,-,1.8,/,+,/,c,100,/,LOG,+,*,17.271,17.271,a,32,-,1.8,/,*,237.7,a,32,-,1.8,/,+,/,c,100,/,LOG,+,-,/,1.8,*,32,+ \
AREA:a#FFC73BFF:"F1"  \
GPRINT:a:LAST:"      Last%8.2lf %s"  \
GPRINT:a:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:a:MAX:"Max%8.2lf %s"  \
GPRINT:a:MIN:"Min%8.2lf %s\n"  \
LINE2:b#FF7D00FF:"F2"  \
GPRINT:b:LAST:"      Last%8.2lf %s"  \
GPRINT:b:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:b:MAX:"Max%8.2lf %s"  \
GPRINT:b:MIN:"Min%8.2lf %s\n"  \
LINE2:c#3D168BFF:"Humidity"  \
GPRINT:c:LAST:"Last%8.2lf %s"  \
GPRINT:c:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:c:MAX:"Max%8.2lf %s"  \
GPRINT:c:MIN:"Min%8.2lf %s\n"  \
LINE3:cdefbf#FF00FFFF:"dewpoint" \
GPRINT:cdefbf:LAST:"Last%8.2lf %s"  \
GPRINT:cdefbf:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:cdefbf:MAX:"Max%8.2lf %s"  \
GPRINT:cdefbf:MIN:"Min%8.2lf %s\n"  

##################
rrdtool graph /opt/bsWeather/weather/"$HOSTNAME"_temperature_week.png --start -432000 -a PNG -t "Temperature F Week" --vertical-label "Degrees F" -w $W -h $H -r \
DEF:a=/opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd:temp_f1:AVERAGE  \
DEF:b=/opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd:temp_f2:AVERAGE  \
DEF:c=/opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd:humidity:AVERAGE  \
CDEF:cdefbf=237.7,17.271,a,32,-,1.8,/,*,237.7,a,32,-,1.8,/,+,/,c,100,/,LOG,+,*,17.271,17.271,a,32,-,1.8,/,*,237.7,a,32,-,1.8,/,+,/,c,100,/,LOG,+,-,/,1.8,*,32,+ \
AREA:a#FFC73BFF:"F1"  \
GPRINT:a:LAST:"      Last%8.2lf %s"  \
GPRINT:a:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:a:MAX:"Max%8.2lf %s"  \
GPRINT:a:MIN:"Min%8.2lf %s\n"  \
LINE2:b#FF7D00FF:"F2"  \
GPRINT:b:LAST:"      Last%8.2lf %s"  \
GPRINT:b:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:b:MAX:"Max%8.2lf %s"  \
GPRINT:b:MIN:"Min%8.2lf %s\n"  \
LINE2:c#3D168BFF:"Humidity"  \
GPRINT:c:LAST:"Last%8.2lf %s"  \
GPRINT:c:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:c:MAX:"Max%8.2lf %s"  \
GPRINT:c:MIN:"Min%8.2lf %s\n"  \
LINE3:cdefbf#FF00FFFF:"dewpoint" \
GPRINT:cdefbf:LAST:"Last%8.2lf %s"  \
GPRINT:cdefbf:AVERAGE:"Avg%8.2lf %s"  \
GPRINT:cdefbf:MAX:"Max%8.2lf %s"  \
GPRINT:cdefbf:MIN:"Min%8.2lf %s\n"  

#rrdtool graph pi-temperature.png --start -86400 -a PNG -t "Temperature F" --vertical-label "Degrees F" -w $W -h $H -r \
#DEF:temp_f1=/home/pi/pi_weather.rrd:temp_f1:AVERAGE LINE2:temp_f1#00ff00:temp_f1 \
#DEF:temp_f2=/home/pi/pi_weather.rrd:temp_f2:AVERAGE LINE2:temp_f2#0000ff:temp_f2 \
#DEF:humidity=/home/pi/pi_weather.rrd:humidity:AVERAGE LINE2:humidity#ff0000:humidity

rrdtool graph /opt/bsWeather/weather/"$HOSTNAME"_humidity.png --start -21600 -a PNG -t "Humidity" --vertical-label "%" -w $W -h $H -r \
DEF:humidity=/opt/bsWeather/rrd/"$HOSTNAME"_weather.rrd:humidity:AVERAGE AREA:humidity#ff0000:humidity 
#
#cp pi-temperature.png /var/www/weather/pi-temperature.png
#cp pi-temperature_week.png /var/www/weather/pi-temperature_week.png
#cp pi-temperature_day.png /var/www/weather/pi-temperature_day.png
#cp pi-temperature_month.png /var/www/weather/pi-temperature_month.png
#cp pi-temperature_2hrs.png /var/www/weather/pi-temperature_2hrs.png
#cp pi-temperature_6hrs.png /var/www/weather/pi-temperature_6hrs.png
#cp pi-humidity.png /var/www/weather/pi-humidity.png


