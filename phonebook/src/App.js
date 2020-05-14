import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import personServices from './services/person'

const App = () => {
	const [person, setPerson] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [show, setShow] = useState('')
	const [notification, setNotification] = useState(null)
	const [errorMsg, setErrorMsg] = useState(null)

	useEffect(() => {
		personServices
			.getAll()
			.then(initial => {
				setPerson(initial)
			})
	}, [])

	const addPerson = (e) => {
		e.preventDefault()
		const objPerson = {
			name: newName,
			number: newNumber
		}
		const checking = person.some(p => p.name === newName)
		const p = person.find(p => p.name === newName)
		const available = { ...p, number: newNumber }

		if(!checking) {
			personServices
				.create(objPerson)
				.then(returnedPerson => {
					setPerson(person.concat(returnedPerson))
					setNewName('')
					setNewNumber('')
				})
			setNotification(`${newName} has been added to the contact`)
		} else {
			if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
				personServices
				.update(available.id ,available)
				.then(newNum => {
					setPerson(person.map(p => p.name !== newName ? p : newNum))
					setNewName('')
					setNewNumber('')
				})
				
				setNotification(`Updated ${newName}`)
				setTimeout(() => {
					setNotification(null)
				}, 5000)
			}
		}
	}

	const deletePerson = id => {
		const user = person.find(p => p.id === id)
		console.log(user.id)

		if(window.confirm(`Delete ${user.name} ?`)) {
			personServices
				.deleteObj(user.id)
				.then(deletedPerson => {
					console.log(deletedPerson)
					window.location.reload()
				})
			setErrorMsg(`Information of ${user.name} has already been removed from the server`)
			setTimeout(() => {
				setErrorMsg(null)
			}, 5000)
		}
	}

	const setToShow = person.filter(p => p.name.match(new RegExp(show, 'i')))

	const handleNameChange = (e) => setNewName(e.target.value)

	const handleNumberChange = (e) => setNewNumber(e.target.value)

	const handleShow = (e) => setShow(e.target.value)

	const Notification = ({ message }) => {
		if(message === null) {
			return null
		}
	
		return (
			<div className='notification'>
				{message}
			</div>
		)
	}
	
	const Error = ({ message }) => {
		if(message === null) {
			return null
		}

		return (
			<div className='error'>
				{message}
			</div>
		)
	}

	return (
		<div>
			<h1>Phonebook</h1>
			<Error message={errorMsg} />
			<Notification message={notification} />
			<Filter show={show} handle={handleShow} />
			<h2>Add a new</h2>
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{setToShow.map(p => <Person key={p.name} person={p} deleteToggle={() => deletePerson(p.id) }/>)}
			</ul>
		</div>
	)
}

export default App;
