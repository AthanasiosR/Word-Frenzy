import React, { useState, useEffect} from "react";
import words from "./components/words";
import Container from "./components/container";
import Typeracer from "./components/typeracer";
import Results from "./components/results";
import './App.css';


function App() {
  const [word, setWord] = useState(words);
  const [newWord, setNewWord] = useState(word[0]);
  const [disabled, setDisabled] = useState(true);
  const [correctResults, setCorrectResults] = useState([]);
  const [wrongResults, setWrongResults] = useState([]);
  const [countCorrect, setCountCorrect] = useState(0);
  const [time, setTime] = useState(30);
  const [inputValue, setInputValue] = useState("");
  const [animation, setAnimation] = useState(null);
  
  console.log(word.length)

  let randomWord = Math.floor(Math.random() * word.length);
  console.log(word.legnth)

  const checkAnswer = () => {
    if(inputValue.trim () === newWord) {
      setCorrectResults((prevCorrect) => [...prevCorrect, newWord]);
      setCountCorrect((prevCorrect) => prevCorrect + 1);
      return;
    }
    setWrongResults((prevWrong) => [...prevWrong, inputValue]);
  };

  const handleInput = (e) => {
    if(e.charCode === 13 && inputValue.trim() !== ""){
      checkAnswer();
      setNewWord(word[randomWord]);
      setInputValue("");
    }
  };

  const handleStart = () => {
    setDisabled(!disabled);
    setCorrectResults([]);
    setWrongResults([]);
    setCountCorrect(0);
    setInputValue("");
    // setNewWord(word[randomWord]);
  };

  useEffect(() => {
    if(time <= 30 && time !== 0 && disabled === false){
      setTimeout(() => setTime(prevTime => prevTime - 1), 1000);
    } else if(disabled){
      setTime(30);
      setAnimation(null);
    } else if(time === 0){
      setDisabled(true);
    }
    if (time <= 10){
      setAnimation("scaleNumber 2s infinate");
    }
  }, [disabled, time]);

  useEffect(() => {
    setNewWord(word[randomWord]);
  },[]);

  return (
    <div className="App">
      <Container>
        <Typeracer 
          newWord = {newWord}
          inputValue = {inputValue}
          setInputValue = {setInputValue}
          disabled = {disabled}
          time = {time}
          animation = {animation}
          handleInput = {handleInput}
          handleStart = {handleStart}
        />
        </Container>
        <Results 
        correctResults = {correctResults}
        wrongResults = {wrongResults}
        countCorrect = {countCorrect}
        />
      

    </div>
  );
}

export default App;
