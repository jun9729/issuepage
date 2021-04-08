import React from 'react';
import Content from '../MainPage/Content';
import { Helmet } from 'react-helmet';
function index() {
  return (
    <>
      <Helmet>
        <title>오이 - 오늘의 이슈</title>
        <meta property="og:title" content="오이 - 오늘의 이슈" />
        <meta property="og:url" content="https://teslam.kr/issue2" />
        <meta
          property="og:image"
          content="https://lh3.googleusercontent.com/pw/ACtC-3d8keGuhFl4mbrbYCNt5i58TE4QEi-YL7_ca_79Ffa7Z7mVCFid6I8J1aZhwU900cIqQWLIllmA9fc3eTct9zmPIZqkLxuOhKMhXvpPZNZ7n-mWUAzA2EMZwLsxjUkjMIfcHnS0QFRYI9P4HIMJ0g8=w443-h268-no?authuser=0"
        />
        <meta
          property="og:description"
          content="각종 이슈 및 뉴스 소식 모음"
        />
        <meta
          name="description"
          content="요즘 이슈 및 각종 기사 뉴스를 한번에 모아보자!"
        />
        <meta name="title" content="오이 - 오늘의 이슈" />
        <meta name="url" content="https://teslam.kr/issue2" />
        <meta name="writer" content="Teslam" />
        <meta
          name="subject"
          content="요즘 이슈 및 각종 기사 뉴스를 한번에 모아보자!"
        />
        <meta name="copyright" content="@Teslam" />
      </Helmet>
      <Content child={'singagain'}></Content>
    </>
  );
}

export default index;
