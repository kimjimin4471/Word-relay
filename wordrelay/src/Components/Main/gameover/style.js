import styled from 'styled-components';

export const Container = styled.div`
  z-index: 2;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 330px;
  background-color: #efefef;
  opacity: 1;
  border: 2px solid;
  border-radius: 10px;

  h1{
    color: black;
    text-align: center;
    font-size: 60px;
    margin-top: 20px;
    margin-bottom: 40px;
  }

  p{
    color: black;
    text-align: center;
    margin-bottom: 30px;
    font-size: 20px;
  }
`

export const CheckBtn = styled.button`
  width: 100px;
  height: 50px;
  font-size: 25px;
  left: 50%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`