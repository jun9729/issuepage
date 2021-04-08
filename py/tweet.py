import pyrebase
from bs4 import BeautifulSoup
import time
import requests
import os
import sys
from datetime import datetime
import chardet
from youtubesearchpython import SearchVideos
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import twitter

config = {
    "apiKey": 'AIzaSyBsXWdr72sKIwBQkb9OnvFDiAega9kfz7k',
    "authDomain": 'teslam-c231a.firebaseapp.com',
    "databaseURL": 'https://teslam-c231a.firebaseio.com',
    "projectId": 'teslam-c231a',
    "storageBucket": 'teslam-c231a.appspot.com',
    "messagingSenderId": '975651984805',
    "appId": '1:975651984805:web:0417a0ba07a8602bd5844c',
    "measurementId": 'G-E40V768N33',
}

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36"}

urls = "https://search.naver.com/search.naver?where=news&query=%ED%85%8C%EC%8A%AC%EB%9D%BC&sm=tab_srt&sort=1&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so%3Add%2Cp%3Aall%2Ca%3Aall&mynews=0&refresh_start=0&related=0"
links = []
news_names = 'Trump'
posts_len = 0
# firebase = pyrebase.initialize_app(config)
cred = credentials.Certificate("/home/ubuntu/teslam-admin.json")
firebase = firebase_admin.initialize_app(cred, {
    'databaseURL': "https://teslam-c231a.firebaseio.com"
})
db = db.reference('/')
err_log = "/home/ubuntu/save/{}.log".format(news_names)  # 에러로그 저장 이름
save_news = "/home/ubuntu/save/{}.txt".format(news_names)


def errlog(er, erstr):
    now = datetime.now()
    errlog = open(err_log, "a+")  # dc txt에 갤 넘버 저장
    errlog_content = (str(now) + " // " + str(er) + erstr)
    errlog.write(str(errlog_content).strip() + "\n")  # dc txt 갤 넘버 작성
    errlog.close()  # dc  txt 닫기
    print(str(er) + " : " + erstr)


def getreq(rlink):
    req = requests.get(rlink, headers=headers)
    if chardet.detect(req.content)['encoding'] == 'EUC-KR':
        soup = BeautifulSoup(req.content.decode(
            'euc-kr', 'replace'), "html.parser")
    else:
        soup = BeautifulSoup(req.content, "html.parser")
    return soup


def getlen():
    try:
        global posts_len
        company = db.child(news_names).get()
        posts_len = len(company)
        if posts_len >= 200:
            db.child(news_names).delete()
            posts_len = 0
            os.remove(save_news)
            f = open(save_news, "w")
            f.close()
    except Exception as er:
        errlog(er, "글 수 가져오기 에러")
        pass


twitter_consumer_key = "TxmrL7a4UPCNdSIc3tZ2MkYp1"
twitter_consumer_secret = "WuA8cc6KfgDIH2HGVGwXzu59lzqFR41yUtkw7vRWWItSisAjX3"
twitter_access_token = "841270447744389120-vfcZxoTv4u1rQlHlmcAV6uHYSXLYoBI"
twitter_access_secret = "AVFk7ZVlaL1D25DyCsMYlmBknjSnHsgazAjmlLCSNBxaM"
twitter_api = twitter.Api(consumer_key=twitter_consumer_key,
                          consumer_secret=twitter_consumer_secret,
                          access_token_key=twitter_access_token,
                          access_token_secret=twitter_access_secret)

getlen()
account = "@realDonaldTrump"
while True:
    err_log = "/home/ubuntu/save/{}.log".format(news_names)  # 에러로그 저장 이름
    save_news = "/home/ubuntu/save/{}.txt".format(news_names)
    time.sleep(600)
    ids = []
    if posts_len >= 200:
        db.child(news_names).delete()
        posts_len = 0
        os.remove(save_news)
        f = open(save_news, "w")
        f.close()
    try:
        if account == "@realDonaldTrump":
            account == "@realDonaldTrump"
            statuses = twitter_api.GetUserTimeline(
                screen_name=account, count=5, include_rts=True, exclude_replies=False)
            for i in reversed(statuses):
                ids.append(str(i.id))
            getlen()
        else:
            account == "@elonmusk"
            statuses = twitter_api.GetUserTimeline(
                screen_name=account, count=5, include_rts=True, exclude_replies=False)
            for i in reversed(statuses):
                ids.append(str(i.id))
            getlen()

        read_save_news = open(save_news, "r")  # 저장된 갤번호 읽어오기
        read_data = []
        for data in read_save_news:
            read_data.append(str(data).rstrip())
        read_save_news.close()

        same_gall = all(elem in read_data for elem in ids)
        if same_gall:
            print("전체복사")
            if account == "@realDonaldTrump":
                account = "@elonmusk"
                news_names = "ElonMusk"
                print('트럼프 끝')
            else:
                account = "@realDonaldTrump"
                news_names = "Trump"
                print('머스크 끝')
            pass
        else:
            for index, value in enumerate(ids):
                if value in read_data:
                    print(str(value) + "중복")
                    pass
                else:
                    try:
                        db.child(news_names).child(str(posts_len)).set(
                            {"id": value})
                        posts_len = posts_len + 1
                        write_gall_num = open(
                            save_news, "a+")  # 넘버 저장파일 열기
                        write_gall_num.write(
                            value.strip() + "\n")  # 넘버 저장
                        write_gall_num.close()
                    except Exception as er:
                        write_gall_num = open(
                            save_news, "a+")  # 넘버 저장파일 열기
                        write_gall_num.write(
                            value.strip() + "\n")  # 넘버 저장
                        write_gall_num.close()
                        errlog(er, "삽입에러" + str(value))
                        pass
    except Exception as er:
        errlog(er, "전체에러")
        getlen()
        pass
