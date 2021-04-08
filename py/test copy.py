from bs4 import BeautifulSoup
import time
import requests
import os
import sys
import json
from datetime import datetime
import chardet
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36"}


def getreq(rlink):
    req = requests.get(rlink, headers=headers)
    if chardet.detect(req.content)['encoding'] == 'EUC-KR':
        soup = BeautifulSoup(req.content.decode(
            'euc-kr', 'replace'), "html.parser")
    else:
        soup = BeautifulSoup(req.content, "html.parser")
    return soup


urls = "https://search.naver.com/search.naver?where=news&query=%EC%95%A0%ED%94%8C&sm=tab_srt&sort=1&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so%3Add%2Cp%3Aall%2Ca%3Aall&mynews=0&refresh_start=0&related=0"
live_news = getreq(urls)
news_titles = live_news.select('.list_news li a[title]')
for i in reversed(news_titles):
    print(i.attrs['href'])
