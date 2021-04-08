import React from 'react';
import styled from 'styled-components';

const Foot = styled.footer`
  width: 100%;
  text-align: center;
  font-family: TmoneyRoundWindRegular;
`;

const TopArrow = styled.i`
  position: fixed;
  bottom: 10px;
  right: 0;
  font-size: 48px;
  cursor: pointer;
`;

const ClickTop = () => {
  window.scrollTo(0, 0);
};

function Footer() {
  return (
    <>
      <hr></hr>
      <Foot>문의:1212879@naver.com</Foot>
      <TopArrow className="material-icons" onClick={ClickTop}>
        arrow_circle_up
      </TopArrow>
    </>
  );
}

export default Footer;
