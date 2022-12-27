import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Button = ({ name, onClick }) => (
  <button onClick={onClick}>{name}</button>
)

const Statistics = ({ good, regular, bad }) => {
  let total = good + regular + bad
  let positive = good / total * 100
  let salida = "No existen datos"

  return (
    total === 0 ? salida :
      <div>
        <table>
          <tbody>
            <tr><td>good</td><td> {good}</td></tr>
            <tr><td>regular</td><td> {regular}</td></tr>
            <tr><td>bad</td><td> {bad}</td></tr>
            <tr><td>all</td><td> {total}</td></tr>
            <tr><td>positive</td><td> {positive}</td></tr>
          </tbody>
        </table>
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
      <Statistics good={good} regular={regular} bad={bad} />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);

