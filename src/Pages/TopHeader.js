import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';

const HeaderSection = styled.nav`
  width: 100%;
`;
const Title = styled.h1`
  font-family: TeslaFont;
  font-size: 28px;
  color: black;
  text-align: center;
  cursor: pointer;
`;

const MenuBar = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
`;

const MenuUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  @media (max-width: 650px) {
    padding: 6px 7px;
    font-size: 16px;
    margin-left: 5px;
  }
`;

const MenuLi = styled.li`
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  cursor: pointer;
  font-family: TmoneyRoundWindRegular;
  &:hover:not(.actiove) {
    background-color: #800000;
  }
  @media (max-width: 650px) {
    padding: 4px 4px;
    font-size: 12px;
  }
`;
function TopHeader() {
  return (
    <>
    <h2>광고</h2>
      <HeaderSection>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Title>오늘의 이슈</Title>
        </Link>
        <MenuBar>
          <MenuUl>
            <Link to="/issue1" style={{ textDecoration: 'none' }}>
              <MenuLi>무야호</MenuLi>
            </Link>
            <Link to="/issue2" style={{ textDecoration: 'none' }}>
              <MenuLi>롤린</MenuLi>
            </Link>
            <Link to="/issue3" style={{ textDecoration: 'none' }}>
              <MenuLi>LH</MenuLi>
            </Link>
            <Link to="/issue4" style={{ textDecoration: 'none' }}>
              <MenuLi>싱어게인</MenuLi>
            </Link>
            {/* <Link to="/issue5" style={{ textDecoration: 'none' }}>
              <MenuLi>이슈5</MenuLi>
            </Link> */}
            {/* <a
              href="https://toon.at/donate/637417816954926452"
              style={{ textDecoration: 'none' }}
            >
              <MenuLi>후원</MenuLi>
            </a> */}
          </MenuUl>
        </MenuBar>
      </HeaderSection>
    </>
  );
}

export default TopHeader;
