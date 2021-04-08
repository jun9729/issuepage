import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from '../../Config/firebaseConfig';

const CommentDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const CommentPannel = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 10px;
  width: 600px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  padding: 15px 10px;
  @media (max-width: 650px) {
    width: 300px;
  }
`;

const CommentForm = styled.form``;

const CommentTextarea = styled.textarea`
  width: 100%;
  height: 20px;
  border: none;
  border-bottom: 2px solid #aaa;
  background-color: transparent;
  resize: none;
  outline: none;
  transition: 0.5s;
  font-family: TmoneyRoundWindRegular;
  z-index: 2;
  &:focus {
    height: 100px;
    @media (max-width: 650px) {
      height: 50px;
    }
  }
  &::webkit-scrollbar {
    display: none;
  }
`;

const CommentBtn = styled.i`
  border: none;
  position: absolute;
  margin-top: -35px;
  right: 10px;
  cursor: pointer;
  z-index: 1;
  color: red;
`;

const ListPannel = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 10px;
  width: 600px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  padding: 15px 10px;
  @media (max-width: 650px) {
    width: 300px;
  }
`;

const ListIcon = styled.i`
  top: 10px;
  font-size: 32px;
`;

const DateSpan = styled.span`
  top: 10px;
  right: 10px;
  position: absolute;
  font-size: 12px;
  font-family: TmoneyRoundWindRegular;
`;

const ContentSpan = styled.span`
  font-size: 14px;
  font-family: TmoneyRoundWindRegular;
  width: 100%%;
  word-break: break-all;
`;

const DownScroll = styled.div`
  width: 100%;
  text-align: center;
  align-items: center;
`;

const DownIcon = styled.i`
  font-size: 48px;
  cursor: pointer;
`;

function Comments() {
  const [comment, setComment] = useState([]);
  const [list, setList] = useState(8);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const noWords = [ "금지어"
  ];
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const GetComments = () => {
    const readdb = firebase.database().ref().child('Comments');
    readdb.on('value', (snap) => {
      setComment(snap.val().reverse());
      setTotal(snap.val().length);
      return setLoading(false);
    });
  };

  const WriteComments = () => {
    let badwords = false;
    const contents = document.getElementsByName('contents')[0].value.trim();
    if (contents == '') {
      alert('내용을 작성하세요');
    } else {
      for (var i in noWords) {
        if (contents.includes(noWords[i])) {
          alert('좋은 단어를 사용해주세요:) [' + noWords[i] + ']');
          badwords = true;
          break;
        }
      }
      if (contents.length >= 200) {
        alert(
          '글자수를 200자 이내로 작성해주세요 :) [' + contents.length + '자]',
        );
        badwords = true;
      }
      if (!badwords) {
        const writedb = firebase
          .database()
          .ref()
          .child('Comments')
          .child(total)
          .set({
            date: date,
            content: contents,
          });
        document.getElementsByName('contents')[0].value = '';
      }
    }
  };

  const infinitescroll = useCallback(() => {
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    );

    const scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop,
    );

    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight == scrollHeight) {
      if (list < total) {
        setList(list + 8);
      }
    }
  });

  const searchKeyPress = (e) => {
    //엔터시 전송
    if (e.key === 'Enter') {
      WriteComments();
    }
  };

  const ClickDownArrow = () => {
    if (list < total) {
      setList(list + 8);
    }
  };

  useEffect(() => {
    setLoading(true);
    GetComments();
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    const now = year + '/' + month + '/' + day + '/' + hours + ':' + min;
    setDate(now);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', infinitescroll, true);
  }, [infinitescroll]);

  return (
    <>
      {loading ? (
        <div className="loader" />
      ) : (
        <>
          <CommentDiv>
            <CommentPannel>
              <CommentForm>
                <CommentTextarea
                  placeholder="의견을 입력하세요(베타 서비스이므로 삭제가 불가능합니다)"
                  name="contents"
                  onKeyPress={searchKeyPress}
                ></CommentTextarea>
                <CommentBtn className="material-icons" onClick={WriteComments}>
                  send
                </CommentBtn>
              </CommentForm>
            </CommentPannel>

            {comment.slice(0, list).map((id, index) => {
              return (
                <ListPannel key={index}>
                  <ListIcon className="material-icons">face</ListIcon>
                  <br />
                  <ContentSpan>{id.content}</ContentSpan>
                  <DateSpan>{id.date}</DateSpan>
                </ListPannel>
              );
            })}
            {list < total ? (
              <DownScroll>
                <DownIcon className="material-icons " onClick={ClickDownArrow}>
                  keyboard_arrow_down
                </DownIcon>
              </DownScroll>
            ) : null}
          </CommentDiv>
        </>
      )}
    </>
  );
}

export default Comments;
