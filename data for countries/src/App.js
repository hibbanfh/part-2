import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country'

const App = () => {
	const [country, setCountry] = useState([])
	const [show, setShow] = useState('')

	useEffect(() => {
		axios
		.get('https://restcountries.eu/rest/v2/all')
		.then(response => {
			setCountry(response.data)
		})
	}, [])
	
	const setToShow = country.filter(c => c.name.match(new RegExp(show, 'i')))

	const handleShow = (e) => setShow(e.target.value)

	const setFilter = (show) => setShow(show)

	return (
		<div>
			<p>find countries <input value={show} onChange={handleShow}/></p>
			<Country country={setToShow} changeFilter={setFilter}/>
		</div>
	)
}


export default App;
