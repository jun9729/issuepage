# import pyrebase
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

urls = "https://search.naver.com/search.naver?sm=tab_hty.top&where=news&query=%EC%8B%B1%EC%96%B4%EA%B2%8C%EC%9D%B8&oquery=%EB%AC%B4%EC%95%BC%ED%98%B8&tqi=haryuwprvmsssuAaC%2BossssstHK-133305"
links = []
news_names = 'singagain'
posts_len = 0
# firebase = pyrebase.initialize_app(config)
cred = credentials.Certificate("todayissue.json")
firebase = firebase_admin.initialize_app(cred, {
    'databaseURL': "https://todayissue-21e8e-default-rtdb.firebaseio.com"
})
db = db.reference('/')

err_log = "{}.log".format(news_names)  # 에러로그 저장 이름
save_news = "{}.txt".format(news_names)


def errlog(er, erstr):
    now = datetime.now()
    errlog = open(err_log, "a+")  # dc txt에 갤 넘버 저장
    errlog_content = (str(now) + " // " + str(er) + erstr)
    errlog.write(str(errlog_content.strip()) + "\n")  # dc txt 갤 넘버 작성
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
        posts_len = 0
        pass


getlen()
tesla_youtue = True
while True:
    time.sleep(150)
    if posts_len >= 200:
        db.child(news_names).delete()
        posts_len = 0
        os.remove(save_news)
        f = open(save_news, "w")
        f.close()
    links = []
    title = []
    img = []
    try:
        if tesla_youtue:
            live_news = getreq(urls)
            news_titles = live_news.select('.list_news li a[title]')
            for i in reversed(news_titles):
                links.append(i.attrs['href'])
        else:
            search = SearchVideos("싱어게인", offset=1, mode="dict", max_results=20)
            result = search.result()
            for key in result['search_result']:
                links.append(key['link'])
                title.append(key['title'])
                img.append(key['thumbnails'][1])

        read_save_news = open(save_news, "r")  # 저장된 갤번호 읽어오기
        read_data = []
        for data in read_save_news:
            read_data.append(data.rstrip())
        read_save_news.close()

        same_gall = all(elem in read_data for elem in links)
        if same_gall:
            print("전체복사")
            if tesla_youtue:
                tesla_youtue = False
                print('유튜브 끝')
            else:
                tesla_youtue = True
                print('뉴스 시작')
            pass
        else:
            for index, value in enumerate(links):
                if value in read_data:
                    print(str(value) + "중복")
                    pass
                else:
                    try:
                        if tesla_youtue:
                            news_html = getreq(value)
                            try:
                                news_titles = news_html.find(
                                    "meta", {"property": "og:title"})
                                news_titles = news_titles.attrs['content']
                            except:
                                news_titles = news_html.find(
                                    "meta", {"name": "title"})
                                news_titles = news_titles.attrs['content']

                            try:
                                news_img = news_html.find(
                                    "meta", {"property": "og:image"})
                                news_img = news_img.attrs['content']
                                news_img = news_img.replace('http', 'https')
                                news_img = news_img.replace('httpss', 'https')
                            except Exception as er:
                                errlog(er, "이미지 없음" + str(value))
                                news_img = "null"

                            try:
                                news_content = news_html.find(
                                    "meta", {"property": "og:description"})
                                news_content = news_content.attrs['content']
                            except:
                                news_content = news_html.find(
                                    "meta", {"name": "description"})
                                news_content = news_content.attrs['content']
                        else:
                            news_titles = title[index]
                            news_content = "YouTube"
                            news_img = img[index]

                        db.child(news_names).child(str(posts_len)).set(
                            {"title": news_titles, "content": news_content, "img": news_img, "link": value})
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
