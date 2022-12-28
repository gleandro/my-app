import React from 'react';
import ReactDOM from 'react-dom/client';

const Header = ({ tittle }) => (<h1>{tittle}</h1>)

const Content = ({ parts }) => {

  let total = parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <div>
      {parts.map(x => <Part key={x.id} part={x} />)}
      <b>Total of {total} exercises</b>
    </div>
  )
}

const Part = ({ part }) => <div>{part.name} {part.exercises}</div>

const Course = ({ course }) => {
  return (
    <>
      <Header tittle={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  return courses.map(x => <Course key={x.id} course={x} />)


}


ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);


