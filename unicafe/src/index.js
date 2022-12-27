import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Button = ({ name, onClick }) => (
  <button onClick={onClick}>{name}</button>
)

const State = ({ name, value }) => (
  <div>
    {name} {value}
  </div>
)

const Statics = ({ good, regular, bad }) => {
  let total = good + regular + bad
  let positive = good / total * 100
  return (
    <div>
      <div>all {total}</div>
      <div>average 9</div>
      <div>positive {positive}</div>
    </div>
  )
}
const App = () => {

  const [good, setGood] = useState(0)
  const [regular, setRegular] = useState(0)
  const [bad, setBad] = useState(0)

  const setValue = (func, val) => {
    func(val + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button name="bueno" onClick={() => setValue(setGood, good)} />
      <Button name="neutral" onClick={() => setValue(setRegular, regular)} />
      <Button name="bad" onClick={() => setValue(setBad, bad)} />
      <h2>Stadistics</h2>
      <State name="good" value={good} />
      <State name="neutral" value={regular} />
      <State name="bad" value={bad} />
      <Statics good={good} regular={regular} bad={bad} />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);

