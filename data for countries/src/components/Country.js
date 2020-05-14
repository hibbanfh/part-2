import React from 'react'
import Weather from  './Weather'

const Country = ({country, changeFilter}) => {
    
    if(country.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if(country.length > 1 && country.length < 10) {
        let showCountry = country.map(country => <p key={country.name}>{country.name} <button onClick={() => changeFilter(country.name)}>show</button></p>)

        return(
            <div>{showCountry}</div>
        )
    } else {
        const showSpecific = country.map(country => 
                <div key={country.name}>
                    <h2>{country.name}</h2>
                    <p>Capital {country.capital}</p>
                    <p>Population {country.population}</p>
                    <h3>Languages</h3>
                    {country.languages.map(lang => <p key={lang.name}>{lang.name}</p>)}
                    <img style={{width:150, height:100, paddingTop:15}} src={country.flag} />
                    <Weather capitol={country.capital} />
                </div>
            ) 

        return (
            <>{showSpecific}</>
        )
    }
}

export default Country