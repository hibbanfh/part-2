import React from 'react'

const Person = ({person, deleteToggle}) => {
    return(
        <li>{person.name} {person.number} <button onClick={deleteToggle}>delete</button></li>
    )
}

export default Person