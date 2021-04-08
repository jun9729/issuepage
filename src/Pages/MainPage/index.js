import React from 'react';
import Content from './Content';
import Stock from './Stock';
import { Helmet } from 'react-helmet';
function index() {
  return (
    <>
      <Helmet>
        <title>오이-오늘의 이슈!</title>
        <meta property="og:title" content="테슬람 - 주식정보를 한눈에!" />
        <meta property="og:url" content="https://teslam.kr" />
        <meta
          property="og:image"
          content="https://lh3.googleusercontent.com/pw/ACtC-3d8keGuhFl4mbrbYCNt5i58TE4QEi-YL7_ca_79Ffa7Z7mVCFid6I8J1aZhwU900cIqQWLIllmA9fc3eTct9zmPIZqkLxuOhKMhXvpPZNZ7n-mWUAzA2EMZwLsxjUkjMIfcHnS0QFRYI9P4HIMJ0g8=w443-h268-no?authuser=0"
        />
        <meta
          property="og:description"
          content="테슬라/애플 실시간시세 & 주식뉴스를 한눈에 모아보자!"
        />
        <meta
          name="description"
          content="테슬라/애플 실시간시세 & 주식뉴스를 한눈에 모아보자!"
        />
        <meta name="title" content="테슬람 - 주식정보를 한눈에!" />
        <meta name="url" content="https://teslam.kr" />
        <meta name="writer" content="Teslam" />
        <meta
          name="subject"
          content="테슬라/애플 실시간시세 & 주식뉴스를 한눈에 모아보자!"
        />
        <meta
          name="keywords"
          content="테슬라,애플,테슬라주가,애플주가,테슬라모음,테슬라정보,테슬라뉴스,스페이스x,일론머스크,tesla,테슬람,전기차,주식,주식뉴스,주식소식,해외뉴스"
        />
        <meta name="copyright" content="@Teslam" />
      </Helmet>

      
    </>
  );
}

export default index;
