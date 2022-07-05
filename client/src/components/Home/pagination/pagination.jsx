import { Fragment } from 'react'
import PropTypes from 'prop-types'
import './pagination.css'

export default function Pagination ({ pokemonsPerPage, totalPokemons, currentPage }) {
  Pagination.propTypes = {
    pokemonsPerPage: PropTypes.number,
    totalPokemons: PropTypes.number,
    currentPage: PropTypes.func
  }

  const pageNumber = []

  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pageNumber.push(i)
  }

  const handlePage = (event) => {
    for (const number of pageNumber) {
      if (number === parseInt(event.target.value)) {
        document.getElementById(number).classList.add('btn__active')
      } else {
        document.getElementById(number).classList.remove('btn__active')
      }
    }
    currentPage(event.target.value)
    window.scrollTo(0, 0)
  }

  return (
    <Fragment>
      <div className='containerPage'>
          {pageNumber.map((number) => (
              <button key={number} id={number} className='btn' value={number} onClick={handlePage}>{number}</button>
          ))}
          </div>
      </Fragment>
  )
}
