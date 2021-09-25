import React, {useState} from 'react';

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0);

  // functions to handle the onclick of each button to update the state
  const handleSetGood = () => {
    setGood(good + 1)
  }

  const handleSetNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleSetBad = () => {
    setBad(bad + 1)
  }
  
  return (
    <>
      <h2>give feedback</h2>
      <Button text='good' handleClick={handleSetGood} />
      <Button text='neutral' handleClick={handleSetNeutral} />
      <Button text='bad' handleClick={handleSetBad} />
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </>
  );
}

export default App;
