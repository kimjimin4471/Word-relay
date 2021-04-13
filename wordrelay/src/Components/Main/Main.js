import React, { useState, memo, useRef } from 'react';
import Words from './words/Words';
import * as s from './style';

const word = new Array('개나리', '복숭아', '사과', '바나나', '딸기');

const Main = memo(() => {
  const [baseWord, setBaseWord] = useState(word[Math.floor(Math.random()*word.length)]);
  const [userWord, setUserWord] = useState('');
  // const [wrongAnswer, setWrongAnswer] = useState(false);
  const [words, setWords] = useState([]);
  const fontAnim = useRef(null);

  const onChangeInput = (e) => {
    setUserWord(e.target.value);
  };

  const onSubmitWord = (e) => {
    e.preventDefault();
    if(userWord[0] == baseWord[baseWord.length-1]){
      setUserWord('');
      setWords([
        ...words,
        userWord,
      ]);
      setBaseWord(userWord);
    }
    else {
      alert("실패!");
      window.location.reload();
      // setWrongAnswer(true);
    }
  }

  let timer = 0;

  const test = () => {
    setInterval(() => {
      if(!fontAnim.current){
        return;
      }
      timer += 1;
      fontAnim.current.style.fontSize = `${20-timer/2}vmin`;
      
    }, 500);
  }

  test();
  return(
    <>
      <s.FirstWord ref={fontAnim}>{baseWord}</s.FirstWord>
      <div>
        {words.map((v, i) => {
          return(
            <Words key={i} words = {i==words.length-1?v : v+' -> '}></Words>
          );
        })}
      </div>
      <form onSubmit={onSubmitWord}>
        <s.UserWordInput onChange={onChangeInput} value={userWord}></s.UserWordInput>
      </form>
    </>
  );
});

export default Main;