import React, { useState } from 'react'

const Anecdote = ({title, anecdote, votes}) => {
  return (
    <div>
      <h2>{title}</h2>
      {anecdote}
      <br />
      has {votes} votes
    </div>
  )
}

const MostVotedAnecdote = ({anecdote, votes}) => {
  if (votes === 0) {
    return (
      <Anecdote 
        title="Anecdote with most votes (none)"
        anecdote={anecdote}
        votes={votes}
      />
    )
  }

  return (
    <Anecdote
      title="Anecdote with most votes"
      anecdote={anecdote}
      votes={votes}
    />
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  // States to handle the current anecdote to be displayed
  const [selected, setSelected] = useState(0)

  // Function select randomly a anecdote of the list
  const handleRandomAnecdote = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  // States to handle the votes for each anecdote
  const [votes, setVotes] = useState({
    ...Object.fromEntries(anecdotes.map(key => [key, 0])) // creates a object using anecdotes like keys and init all votes in 0
  })

  // Function to handle the updating of votes and most voted
  const handleSetVotes = () => {
    setVotes({ // updating the votes
      ...votes,
      [anecdotes[selected]]: votes[anecdotes[selected]] + 1 // get the current anecdote displayed and update the vote
    })

    if (votes[anecdotes[selected]] + 1 >= mostVoted.votes) { // updating the most voted anecdote
      setMostVoted({
        "anecdote": anecdotes[selected],
        "votes": votes[anecdotes[selected]] + 1 // it is neccesary to add 1 because the votes aren't updated yet
      })
    }
  }

  // States to carry out the most voted anecdote
  const [mostVoted, setMostVoted] = useState({
    "anecdote": anecdotes[selected],
    "votes": 0
  })

  return (
    <div>
      <Anecdote 
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
        votes={votes[anecdotes[selected]]}
      />
      <button onClick={handleSetVotes}>vote</button>
      <button onClick={handleRandomAnecdote}>next anecdote</button>
      <MostVotedAnecdote
        anecdote={mostVoted.anecdote}
        votes={mostVoted.votes}
      />
    </div>
  )
}

export default App