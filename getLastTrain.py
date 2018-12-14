import requests
from bs4 import BeautifulSoup
import datetime
import re
import urllib
from tqdm import tqdm
import concurrent.futures
import json
import resource
import asyncio
from getStations import allStations


# for debug!!
#allStations = allStations[:5:]
allStations=allStations[::-1]


def search(st1, st2, y=None, m=None, d=None):
    def createUrl(st1, st2, y, m, d):
        if y == None and m == None and d == None:
            today = datetime.datetime.now()
            y = today.year
            m = today.month
            d = today.day
        url = "https://transit.yahoo.co.jp/search/result?flatlon=&from={0}&tlatlon=&to={1}&viacode=&via=&viacode=&via=&viacode=&via=&y={2}&m={3}&d={4}&hh=14&m2=8&m1=3&type=2&ticket=ic&expkind=1&ws=3&s=0&al=1&shin=1&ex=1&hb=1&lb=1&sr=1&kw={1}".format(
            urllib.parse.quote(st1), urllib.parse.quote(st2), y, m, d)

        return url
    # print("{0}→{1}:start".format(st1,st2))

    url = createUrl(st1, st2, y, m, d)
    with requests.Session() as s:
        try:
            response = s.get(url,timeout=30).text

            soup = BeautifulSoup(response, "html.parser")
            results = soup.find_all("li", class_="time")

            bestResult = results[1]
            requiredTime = bestResult.find(class_="small").text
            bestResult = bestResult.text
            bestResult = bestResult[:len(bestResult) - len(requiredTime):]
            start, goal = bestResult.split("→")
            retval = st1, st2, start, goal, requiredTime
        except:
            print("Error about {0}→{1}".format(st1, st2))
            retval = st1, st2, "", "", ""

    return ",".join(retval)


async def listUp(st, filename=None):
    if filename == None:
        filename = "./data/" + st + ".csv"

    #today = datetime.datetime.now() + datetime.timedelta(days=7)
    y = 2018
    m = 12
    d = 11
    """
    with concurrent.futures.ThreadPoolExecutor() as executor:
        submitted = {executor.submit(search,st,st2,y,m,d):st2 for st2 in allStations if st!=st2}
        for future in concurrent.futures.as_completed(submitted):
            retval.append(",".join(future.result()))
            """
    async def run_search(st1, st2, y, m, d):
        return await loop.run_in_executor(None, search, st1, st2, y, m, d)

    retval = [run_search(st, st2, y, m, d) for st2 in allStations]
    results = await asyncio.gather(*retval)
    return results

    """
    with open(filename,"w") as f:
        f.write("\n".join(retval))
        """


if __name__ == "__main__":
    s = datetime.datetime.now()
    for station in tqdm(allStations[26::]):
        loop = asyncio.get_event_loop()
        results = loop.run_until_complete(listUp(station))
        with open("./data/{}.csv".format(station), "w") as f:
            f.write("\n".join(results))
    print(datetime.datetime.now() - s)
