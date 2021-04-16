import React, { useState, memo, useRef, useEffect } from 'react';
import Words from './words/Words';
import GameOver from './gameover/GameOver';
import * as s from './style';

const korea_pattern = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;

const word = new Array('개나리', '복숭아', '사과', '바나나', '딸기');
let timer = 0;

const Main = memo(() => {
  const [baseWord, setBaseWord] = useState('');
  const [userWord, setUserWord] = useState('');
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [words, setWords] = useState([]);
  const fontAnim = useRef(null);
  const gameTimer = useRef(null);
  const textInput = useRef(null);

  const gameStart = () => {
    setWords([]);
    setBaseWord(word[Math.floor(Math.random()*word.length)]);
    timer = 0;
    setGameOver(false);
    setMessage('');
    clearInterval(gameTimer.current);
    textInput.current.focus();
    textInput.current.readOnly=false;
  }

  const onChangeInput = (e) => {
    setUserWord(e.target.value.replace(korea_pattern, ''));
  };

  const onSubmitWord = (e) => {
    e.preventDefault();

    if(userWord == '') {
      return;
    }
    if(words.indexOf(userWord) != -1) {
      setGameOver(true);
      setMessage('똑같은 단어 입력!');
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
      setGameOver(true);
      setMessage(`'${baseWord[baseWord.length-1]}'로 시작하지 않습니다!`);
      return;
    }
  }

  useEffect(() => {
    clearInterval(gameTimer.current);

    gameTimer.current = setInterval(()=> {
      if(!fontAnim.current){
        return;
      }

      if((20-timer) <= 0) {
        setGameOver(true);
        setMessage('시간 초과!');
      }

      timer += 1;
      fontAnim.current.style.fontSize = `${20-timer}vmin`;
    }, 1000);

  }, [baseWord]);

  const onClickWhiteBox = () => {
    gameStart();
  }

  useEffect(() => {
    if(gameOver) {
      clearInterval(gameTimer.current);
      setUserWord('');
      textInput.current.readOnly= true;
    }
    else{
      gameStart();
    }
  }, [gameOver]);

  return(
    <>
      {gameOver ? <div>
        <s.WhiteBox onClick = {onClickWhiteBox}></s.WhiteBox>
        <GameOver gameStart={gameStart} wordCnt = {words.length} message={message}></GameOver>
      </div> : null}
      <s.FirstWord ref={fontAnim}>{baseWord}</s.FirstWord>
      <div>
        {words.map((v, i) => {
          return(
            <Words key={i} words = {i==words.length-1 ? v : v +' -> '}></Words>
          );
        })}
      </div>
      <form onSubmit={onSubmitWord}>
        <s.UserWordInput ref={textInput} onChange={onChangeInput} value={userWord}></s.UserWordInput>
      </form>
    </>
  );
});

export default Main;