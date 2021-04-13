import React, { useState, memo } from 'react';
import axios from 'axios';
import * as s from './style';

const Words = new Array('개나리', '복숭아', '사과', '바나나', '딸기');



const Main = memo(() => {
  const [baseWord, setBaseWord] = useState(Words[Math.floor(Math.random()*Words.length)]);
  const [userWord, setUserWord] = useState('');

  const onChangeInput = (e) => {
    setUserWord(e.target.value);
  };

  const onSubmitWord = (e) => {
    e.preventDefault();
    setUserWord('');
  }

  console.log(userWord);
  return(
    <>
      <s.FirstWord>{baseWord}</s.FirstWord>
      <form onSubmit={onSubmitWord}>
        <s.UserWordInput onChange={onChangeInput} value={userWord}></s.UserWordInput>
      </form>
    </>
  );
});

export default Main;