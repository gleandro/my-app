import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';


const points = [0, 0, 0, 0, 0, 0]
console.log(points)

const nextAnectdote = (setSelected) => {
  let number = Math.floor(Math.random() * anecdotes.length)
  setSelected(number)
}

const voteAnecdote = (index, setFav) => {
  points[index] += 1
  const max_val = Math.max(...points);
  const max_index = points.indexOf(max_val);
  setFav(max_index)
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [fav, setFav] = useState(0)

  return (
    <>
      <div>
        <h3>anecdote of the day</h3>
        {props.anecdotes[selected]}
      </div>
      <div>
        <button onClick={() => voteAnecdote(selected, setFav)}>vote</button>
        <button onClick={() => nextAnectdote(setSelected)}>next anecdote</button>
      </div>
      <div>
        <h3>anecdote withe most votes</h3>
        {props.anecdotes[fav]}
      </div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App anecdotes={anecdotes} />
);

