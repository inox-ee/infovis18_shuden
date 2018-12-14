#わざわざWikipediaからスクレイピングしなくても、データあるみたい！！
#//いのくんありがとう
import requests
from bs4 import BeautifulSoup
import json
import numpy as np

"""
fp = open("./station.topojson", "r")
data = json.load(fp)
allStations = [i["properties"]["N02_005"]
               for i in data["objects"]["stationSection"]["geometries"]]

allStations = sorted(set(allStations))
"""
"""
fp=open("./eki.csv")
allStations=[]
for line in fp:
    allStations.append(line.split(",")[0])

allStations=sorted(set(allStations))
print(len(allStations))

"""
allStations=[]
fp = open("./kanto_station.topojson", "r")
data = json.load(fp)
arcs=data["arcs"]
stations=data["objects"]["stationSection"]["geometries"]
"""
for station in stations:
    name=station["properties"]["N02_005"]
    place=np.asarray(arcs[station["arcs"][0]])
    place=np.mean(place,axis=0)
    if place[0]>138.5 and place[1]<37:
        allStations.append(name)
        """
allStations=[station["properties"]["N02_005"] for station in stations]

allStations=list(sorted(set(allStations)))
allStations.remove("上野動物園東園")
allStations.remove("上野動物園西園")
allStations.remove("ガーラ湯沢")
allStations.remove("鹿島サッカースタジアム")
allStations.remove("十国登り口")
allStations.remove("ジヤトコ前(ジヤトコ1地区前)")
allStations.append("ジヤトコ前")
#print(allStations)
#print(len(allStations))
