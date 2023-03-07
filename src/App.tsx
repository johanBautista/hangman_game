import './App.css'
import { useEffect, useState } from 'react';
import { HangImage } from './components/HangImage';
import { letters } from './helpers/letters';
import { getRandomWords } from './helpers/getRandomWords';

function App() {
  const[attempts, setAttempts] = useState(0)
  const [word, setWord] = useState(getRandomWords());
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);

  const checkLetter = (letter: string) => {
    if(lose) return;
    if(won) return;

    if(!word.includes(letter)){
      setAttempts(Math.min(attempts +1, 9))
      return;
    }

    const hiddenWordArray = hiddenWord.split(' ');

    for (let i = 0; i < word.length; i++) {
      if(word[i] === letter){
        hiddenWordArray[i] = letter;
      }
      setHiddenWord(hiddenWordArray.join(' '));
    }
  }

  const newGame = () =>{
    const newWord = getRandomWords()
    setWord(newWord)

    setHiddenWord('_ '.repeat(newWord.length))
    setAttempts(0)
    setLose(false)
    setWon(false)
  }

  useEffect(() => {
    if (attempts >= 9) {
      setLose(true)
    }
  }, [attempts])
  
  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(' ').join('')
    if (currentHiddenWord === word) {
      setWon(true)
    }
  }, [hiddenWord])
  


  return (
    <div className="App">

      <HangImage imageNumber={attempts}/>

      <div>
        <h1>JB_Hangman</h1>
        <small className="read-the-docs">
          guess the word and beat the machine
        </small>
      </div>

      <h2 className='hiddenWord'>{hiddenWord}</h2>

      <h3>Intentos : {attempts}</h3>
      <div>
        { lose  ? <h2>Perdio {word}</h2> : '' }
        { won  ? <h2>Acertaste {word}</h2> : '' }
      </div>
      <div className="letras">
        {letters.map( letter =>(
          <button key={letter} className='letras' onClick={() => checkLetter(letter)}>{letter}</button>
        ))}
      </div>
      <div>
        <button onClick={newGame}>Nuevo juego ?</button>
      </div>

    </div>
  )
}

export default App
