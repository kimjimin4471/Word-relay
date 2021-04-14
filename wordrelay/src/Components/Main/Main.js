import React, { useState, memo, useRef, useEffect } from 'react';
import Words from './words/Words';
import * as s from './style';

const blank_pattern = /[\s]/g;

const word = new Array('개나리', '복숭아', '사과', '바나나', '딸기');

const Main = memo(() => {
  const [baseWord, setBaseWord] = useState(word[Math.floor(Math.random()*word.length)]);
  const [userWord, setUserWord] = useState('');
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [words, setWords] = useState([]);
  const fontAnim = useRef(null);
  const gameTimer = useRef(null);

  const onChangeInput = (e) => {
    setUserWord(e.target.value);
  };

  const onSubmitWord = (e) => {
    e.preventDefault();
    if(blank_pattern.test(userWord) == true){
      setMessage('공백 입력!!');
      setUserWord('');
      return;
    }
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
      setGameOver(true);
    }
  }

  useEffect(() => {
    let timer = 0;

    fontAnim.current.style.fontSize = `${20}vmin`;

    clearInterval(gameTimer.current);

    gameTimer.current = setInterval( ()=> {
      if(!fontAnim.current){
        return;
      }

      if((20-timer) <= 0) {
        setMessage('타임오버!');
        clearInterval(gameTimer.current);
        setGameOver(true);
      }

      timer += 1;
      fontAnim.current.style.fontSize = `${20-timer}vmin`;
    }, 1000);

  }, [baseWord]);

  return(
    <>
      {gameOver ? <div>
        <s.WhiteBox></s.WhiteBox>
        
      </div> : null}
      <s.FirstWord ref={fontAnim}>{baseWord}</s.FirstWord>
      <div>
        {words.map((v, i) => {
          return(
            <Words key={i} words = {i==words.length-1?v : v+' -> '}></Words>
          );
        })}
      </div>
      <s.WrongAnswer>{message}</s.WrongAnswer>
      <form onSubmit={onSubmitWord}>
        <s.UserWordInput onChange={onChangeInput} value={userWord}></s.UserWordInput>
      </form>
    </>
  );
});

export default Main;