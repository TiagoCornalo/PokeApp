import React, { useEffect, useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
/* ACTIONS */
import { getPokemons, detailCleanup, searchPokemon, sortPokemon, filterPokemon, typesFilter, getTypes, notFoundCleanup } from '../../actions'
/* COMPONENTES */
import Nav from './navigation/Nav'
import Loader from '../desing/Loader/Loader'
import Cards from '../desing/Card/Cards'
import Pagination from './pagination/pagination'
import Search from './search/Search'
/* STYLES */
import '../desing/Card/cardStyle.css'
import Classes from './home.module.css'
/* ASSETS */
import notFound from '../../assets/notfound.gif'
import Refresh from '../../assets/refresh.png'

export default function Card () {
  const dispatch = useDispatch()
  const pokemon = useSelector(state => state.pokemonsCopy)
  const types = useSelector(state => state.types)
  // eslint-disable-next-line no-unused-vars
  const [refresh, setRefresh] = useState(false)

  const [origin, setOrigin] = useState('All')
  // eslint-disable-next-line no-unused-vars
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(detailCleanup())
    dispatch(getPokemons())
    dispatch(getTypes())
  }, [dispatch])

  const pageHandler = (page) => {
    setCurrentPage(page)
  }
  const handleReload = () => {
    window.location.reload()
  }
  /* <------------- Filters ---------------------> */
  const handleSearch = (value) => {
    dispatch(searchPokemon(value))
    setCurrentPage(1)
  }
  const handleFilter = (e) => {
    setOrigin(e.target.value)
    dispatch(filterPokemon(e.target.value))
    setCurrentPage(1)
    setRefresh((prevState) => !prevState)
  }
  const handleSort = (e) => {
    dispatch(sortPokemon(e.target.value))
    setRefresh((prevState) => !prevState)
  }
  const handleFilterByType = (e) => {
    dispatch(typesFilter(e.target.value, origin))
    setCurrentPage(1)
    setRefresh((prevState) => !prevState)
  }

  // set an amount of pokemons per page
  const indexOfLastPokemon = currentPage * pokemonsPerPage
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
  const currentPokemons = pokemon.length > 0 && pokemon.slice(indexOfFirstPokemon, indexOfLastPokemon)

  if (currentPokemons && loading) {
    setLoading(false)
  }
  if (currentPokemons.length > 0 && !loading) {
    return (
      <Fragment>
        <Nav />
        <Search onSearch={handleSearch} />
        <div className={Classes.flexContainer}>

        <div className={Classes.filters}>
          <div className={Classes.selects}>
            <select
              onChange={handleSort}
              className={Classes.select}
              name="Type"
              defaultValue="Sort by name"
            >
              <option value="Sort by name" disabled>
                Sort by name
              </option>
              <option value="AscendingName">Ascending</option>
              <option value="DescendingName">Descending</option>
            </select>
            <select
              onChange={handleSort}
              className={Classes.select}
              name="Type"
              defaultValue="Sort by attack"
            >
              <option value="Sort by attack" disabled>
                Sort by attack
              </option>
              <option value="AscendingAttack">Ascending</option>
              <option value="DescendingAttack">Descending</option>
            </select>
            <select
              onChange={handleFilterByType}
              className={Classes.select}
              name="Type"
              defaultValue="Filter by type"
            >
              <option value="Filter by type" disabled>
                Sort by type
              </option>
              {types &&
                types.map((type) => {
                  return (
                    <option key={type.name} value={type.name}>
                      {type.name}
                    </option>
                  )
                })}
            </select>
            <select
              onChange={handleFilter}
              className={Classes.select}
              name="Origin"
              defaultValue="Filter by origin"
            >
              <option value="Filter by origin" disabled>
                Filter by origin
              </option>
              <option value="All">All</option>
              <option value="Existing">Existing</option>
              <option value="Created">Created</option>
            </select>
          </div>
          <div className={Classes.pagination}>
            <Pagination
              pokemonPerPage={pokemonsPerPage}
              pokemonQuantity={pokemon.length}
              onSetPage={pageHandler}
            />
          </div>
          <button onClick={handleReload} className={Classes.refreshButton}>
            <img alt="Reload" src={Refresh} />
          </button>
        </div>

        <div className={Classes.cardsContainer}>

          {currentPokemons.map((p) => (
            <Cards key={p.id} id={p.id} stringId={p.id} name={p.name} types={p.types} hp={p.hp} attack={p.attack} defense={p.defense} speed={p.speed} img={p.img} />
          ))}
        </div>
        <div className='paginationContainer'>
        <Pagination pokemonsPerPage={pokemonsPerPage} totalPokemons={pokemon.length} currentPage={pageHandler}/>
        </div>
        </div>

      </Fragment>
    )
  }
  if (!currentPokemons && !loading) {
    setTimeout(() => {
      dispatch(notFoundCleanup())
    }, 5000)

    return (
      <Fragment>
       <Nav/>
      <div className={Classes.notFound}>
        <h1>No results for that pokemon name.</h1>
        <img src={notFound} alt='notFound' />
      </div>
      </Fragment>
    )
  }
  return (
          <Loader />
  )
}
