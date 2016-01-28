#!/usr/bin/python

import json
import sys
from cassandra.cluster import Cluster

data = sys.stdin.readlines()
cluster = Cluster(['cassandra1.bs'])
session = cluster.connect('mykeyspace')

for d in data:
  jdata = json.loads(d)
  #print json.dumps(jdata) 
  query = "INSERT INTO pi2(id,"
  for j in jdata:
    if j != 'hostname':
      query = query + j + ","
  query = query.rstrip(',')
  query = query + ") VALUES(" + jdata['ts'] + ","
  for j in jdata:
    if j != 'hostname':
      query = query + jdata[j] + ","
  query = query.rstrip(",")
  query = query + ")"
  print query
  session.execute(query)
  #for j in jdata:
