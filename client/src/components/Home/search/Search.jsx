import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import './search.css'

export default function Search ({ onSearch }) {
  Search.propTypes = {
    onSearch: PropTypes.func
  }
  // pasar al onSearch el local state
  const [pokemonSearch, setSearchPokemon] = useState('')
  // disable-eslint-next-line-no-unused-vars
  const handleSearchPokemon = (e) => {
    setSearchPokemon(e.target.value)
  }
  function handleSubmit (e) {
    e.preventDefault()
    console.log(pokemonSearch)
    onSearch(pokemonSearch)
    setSearchPokemon('')
  }
  function handleKeyPress (e) {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }
  return (
    <div className='search-container'>
    <div className="search-box">

    <button className="btn-search" onClick={handleSubmit} ><FontAwesomeIcon icon={faSearch}/></button>
    <input type="text" className="input-search" value={pokemonSearch} onChange={handleSearchPokemon} onKeyPress={handleKeyPress} placeholder="Type to Search..."></input>

  </div>
  </div>
  )
}
