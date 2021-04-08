import React from 'react';
import Comments from './Comments';
import { Helmet } from 'react-helmet';
function index() {
  return (
    <>
      <Helmet>
        <title>토론방 - 테슬람</title>
        <meta property="og:title" content="토론방 - 테슬람" />
        <meta property="og:url" content="https://teslam.kr/apple/talk" />
        <meta
          property="og:image"
          content="https://lh3.googleusercontent.com/pw/ACtC-3d8keGuhFl4mbrbYCNt5i58TE4QEi-YL7_ca_79Ffa7Z7mVCFid6I8J1aZhwU900cIqQWLIllmA9fc3eTct9zmPIZqkLxuOhKMhXvpPZNZ7n-mWUAzA2EMZwLsxjUkjMIfcHnS0QFRYI9P4HIMJ0g8=w443-h268-no?authuser=0"
        />
        <meta property="og:description" content="주식에 대해 토론하자!" />
        <meta name="description" content="주식에 대해 토론하자!" />
        <meta name="title" content="토론방 - 테슬람" />
        <meta name="url" content="https://teslam.kr/talk" />
        <meta name="writer" content="Teslam" />
        <meta name="subject" content="주식에 대해 토론하자!" />
        <meta name="copyright" content="@Teslam" />
      </Helmet>
      <Comments></Comments>
    </>
  );
}

export default index;
