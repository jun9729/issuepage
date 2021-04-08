import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from '../../Config/firebaseConfig';
const StockDiv = styled.div`
  width: 99%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  margin-top: 10px;
  width: 40%;
  height: 120px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  margin-left: 10px;
  @media (max-width: 650px) {
    width: 46.5%;
    height: 100px;
  }
`;

const TslaTitle = styled.h1`
  font-size: 24px;
  font-family: TeslaFont;
`;

const ApplTitle = styled.h1`
  font-size: 24px;
  font-family: HelveticaFont;
`;
const Price = styled.span`
  margin-top: 100px;
  font-size: 28px;
  font-family: Recipekorea;
  @media (max-width: 650px) {
    font-size: 12px;
  }
`;

const Dollar = styled.span`
  margin-top: 100px;
  margin-left: 10px;
  font-family: Recipekorea;
  font-size: 16px;
  color: red;
  @media (max-width: 650px) {
    font-size: 8px;
  }
`;

const Percent = styled.span`
  margin-top: 100px;
  margin-left: 10px;
  font-family: Recipekorea;
  font-size: 16px;
  color: red;
  @media (max-width: 650px) {
    font-size: 8px;
  }
`;

const Live = styled.span`
  font-family: Recipekorea;
  font-size: 16px;
  color: red;
  @media (max-width: 650px) {
    font-size: 8px;
  }
`;

function Stock() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [tsla, setTsla] = useState({});
  const [appl, setAppl] = useState({});

  const GetDB = () => {
    const tsladb = firebase.database().ref().child('stocks').child('tsla');
    const appldb = firebase.database().ref().child('stocks').child('aapl');
    tsladb.on('value', (snap) => {
      setTsla(snap.val());
    });
    appldb.on('value', (snap) => {
      setAppl(snap.val());
    });
  };

  useEffect(() => {
    GetDB();
  }, []);
  return (
    <>
      <StockDiv>
        <Card>
          <TslaTitle>
            TSLA<Live>(실시간)</Live>
          </TslaTitle>
          <Price>{tsla.price}</Price>
          <Dollar>{tsla.dollar}</Dollar>
          <Percent>{tsla.percent}</Percent>
          <br />
        </Card>
        <Card>
          <ApplTitle>
            AAPL<Live>(실시간)</Live>
          </ApplTitle>
          <Price>{appl.price}</Price>
          <Dollar>{appl.dollar}</Dollar>
          <Percent>{appl.percent}</Percent>
        </Card>
      </StockDiv>
    </>
  );
}

export default Stock;
