from bs4 import BeautifulSoup
import time
import requests
import os
import sys
import json
from datetime import datetime
import chardet
from youtubesearchpython import SearchVideos
import twitter

twitter_consumer_key = "TxmrL7a4UPCNdSIc3tZ2MkYp1"
twitter_consumer_secret = "WuA8cc6KfgDIH2HGVGwXzu59lzqFR41yUtkw7vRWWItSisAjX3"
twitter_access_token = "841270447744389120-vfcZxoTv4u1rQlHlmcAV6uHYSXLYoBI"
twitter_access_secret = "AVFk7ZVlaL1D25DyCsMYlmBknjSnHsgazAjmlLCSNBxaM"
twitter_api = twitter.Api(consumer_key=twitter_consumer_key,
                          consumer_secret=twitter_consumer_secret,
                          access_token_key=twitter_access_token,
                          access_token_secret=twitter_access_secret)

account = "@realDonaldTrump"
statuses = twitter_api.GetUserTimeline(
    screen_name=account, count=10, include_rts=True, exclude_replies=False)
for i in statuses:
    print(i.id)
