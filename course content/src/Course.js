import React from 'react'

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total exercise={course.parts} />
        </div>
    )
}

const Header = ({name}) => {
    return (
        <h2>{name}</h2>
    )
}

const Content = ({parts}) => {
    const rows = () => parts.map(part =>
        <Parts key={part.id} part={part} />    
    )
    
    return (
        <ul>{rows()}</ul>
    )
}

const Parts = ({part}) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Total = ({exercise}) => {
    const arr = exercise.map(part => part.exercises)
    const sum = (accumulator, currentValue) => accumulator + currentValue
    console.log(arr)
    return (
        <div>
            <strong>total of {arr.reduce(sum)} exercises</strong>
        </div>
    )
}

export default Course