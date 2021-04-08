import React, { useState, useEffect, useCallback } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from '../../Config/firebaseConfig';
import styled from 'styled-components';

const BannerDiv = styled.div`
  width: 95%;

  margin: 10px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;

  @media only screen and (max-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Items = styled.div`
  cursor: pointer;
`;

const Card = styled.a`
  min-height: 100%;
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #444;
  position: relative;
  top: 0;
  transition: all 0.1s ease-in;

  &:hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.5);
  }
`;

const ImgDiv = styled.div`
  padding-bottom: 60%;
  background-size: cover;
  background-position: center center;
`;

const Article = styled.article`
  padding: 20px;
  display: flex;

  flex: 1;
  justify-content: space-between;
  flex-direction: column;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 14px;
  margin: 0;
  color: #333;
  text-overflow: ellipsis;
  @media (max-width: 650px) {
    font-size: 12px;
  }
`;

const Contentpost = styled.span`
  width: 100%;
  font-size: 12px;
  font-weight: bold;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 2em 0 0 0;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 2.3em;
  @media (max-width: 650px) {
    width: 100px;
    font-size: 10px;
  }
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

const shuffleArr = () => {
  const arr = ['news', 'apple', 'StockNews'];
  arr.sort(() => {
    return Math.random() - Math.random();
  });
  return arr[0];
};

function Content({ child = shuffleArr() }) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [state, setState] = useState([]);
  const [total, setTotal] = useState(0);
  const [num, setNum] = useState(10);
  const [loading, setLoading] = useState(true);

  const GetDB = () => {
    const db = firebase.database().ref().child(child);
    db.on('value', (snap) => {
      setState(snap.val().reverse());
      setTotal(snap.val().length);
      return setLoading(false);
    });
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
      if (num < total) {
        setNum(num + 6);
      }
    }
  });

  const ClickDownArrow = () => {
    if (num < total) {
      setNum(num + 6);
    }
  };

  useEffect(() => {
    setLoading(true);
    GetDB();
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
            <h2>광고</h2>
          <BannerDiv>
            {state.slice(0, num).map((id, index) => {
              return (
                <Items key={index}>
                  <Card href={id.link}>
                    <ImgDiv
                      style={{
                        backgroundImage: `url(${id.img}), url(data:image/png;base64,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)`,
                      }}
                    ></ImgDiv>
                    <Article>
                      <Title>{id.title}</Title>
                      <Contentpost>{id.content}</Contentpost>
                    </Article>
                  </Card>
                </Items>
              );
            })}
          </BannerDiv>
          <h2>광고</h2>
          {num < total ? (
            <DownScroll>
              <DownIcon className="material-icons " onClick={ClickDownArrow}>
                keyboard_arrow_down
              </DownIcon>
            </DownScroll>
          ) : null}
        </>
      )}
    </>
  );
}

export default Content;
