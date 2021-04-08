import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
 
 
#Firebase database 인증 및 앱 초기화
cred = credentials.Certificate("teslam-admin.json")
firebase = firebase_admin.initialize_app(cred, {
    'databaseURL': "https://teslam-c231a.firebaseio.com"
})
 
dir = db.reference('/') #기본 위치 지정
print(dir.get())
 
