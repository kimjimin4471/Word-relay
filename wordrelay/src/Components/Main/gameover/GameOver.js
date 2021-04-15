import React from 'react';
import * as s from './style';

const GameOver = (props) => {

  const onClickCheck = () => {
    props.gameStart();
  }

  return(
    <s.Container>
      <h1>GameOver!</h1>
      <p>입력한 단어의 수 : {props.wordCnt}개</p>
      <s.CheckBtn onClick={onClickCheck}>확인</s.CheckBtn>
    </s.Container>
  );
};

export default GameOver;