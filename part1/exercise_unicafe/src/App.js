import React, {useState} from 'react';

const Button = ({text, handleClick}) => {
  /* Component to create buttons with its respective text and onClick handler */
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  /** Component to handle the display of the state variables and its statistics */
  // calculing the statistics of feedback to be displayed
  const all = good + neutral + bad
  const average = all !== 0? (good - bad)/all:0
  const positive = all !== 0? good/all*100 + "%":0

  // adding conditional rendering to only display the statistics when there are feedback interactions
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}</p>
    </div>
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}

export default App;
