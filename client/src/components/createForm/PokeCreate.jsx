import { Fragment, useState, useEffect } from 'react'
import { validate } from './validate'
import { postPokemon, getTypes, setImage } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import x from '../../assets/cross.png'
import Pokedex from './pokeDex/Pokedex'
import './pokeform.css'
import Nav from '../Home/navigation/Nav'
// make a form that will take in the following information:
// name of the pokemon
// height
// weight
// attack stat
// defense stat
// hp stat
// speed stat
// img url
// array of types

export default function PokeCreate () {
  const dispatch = useDispatch()
  const types = useSelector(state => state.types)
  const [input, setInput] = useState({
    name: '',
    height: '',
    weight: '',
    attack: '',
    defense: '',
    hp: '',
    speed: '',
    img: '',
    types: []
  })
  // eslint-disable-next-line no-unused-vars
  const [selectedTypes, setSelectedTypes] = useState([])
  const [errors, setErrors] = useState({})

  const handleImageChange = function (e) {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    dispatch(setImage(e.target.value))
  }
  const handleInputChange = function (e) {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const objtError = validate({ ...input, [e.target.name]: e.target.value })
    setErrors(objtError)
  }
  const handleDelete = () => {
    selectedTypes.pop()
    setSelectedTypes(selectedTypes)
    setInput({
      ...input,
      types: selectedTypes
    })
    setErrors(validate({ ...input, types: selectedTypes }))
  }
  const handleTypeCheck = (e) => {
    if (!selectedTypes.includes(e.target.name) && selectedTypes.length < 2) {
      selectedTypes.push(e.target.name)
    }
    setSelectedTypes(selectedTypes)
    setInput({ ...input, types: selectedTypes })
    setErrors(validate({ ...input, types: selectedTypes }))
  }

  const handleSubmit = function (e) {
    e.preventDefault()
    dispatch(postPokemon(input))
    setInput({
      name: '',
      height: '',
      weight: '',
      attack: '',
      defense: '',
      hp: '',
      speed: '',
      img: '',
      types: []
    })
  }

  /* const handleTypeChange = function (e) {
    const type = e.target.value
    if (e.target.checked) {
      setSelectedTypes(prev => [...prev, type])
    } else {
      setSelectedTypes(prev => prev.filter(t => t !== type))
    }
  } */
  useEffect(() => {
    dispatch(getTypes())
  }, [])

  return (
    <Fragment>
      <Nav />
      <Pokedex />
      <div className='bigContainer'>
      <div className='containerForm'>
      <form onSubmit={handleSubmit} className='form' autoComplete='off'>
        <h3>CREATE YOUR POKEMON</h3>
        <div className='c'>
          <div>
          <label>Name</label>
          <input
          className={errors.name && 'danger'}
          type="text"
          name="name"
          onChange={handleInputChange}
          value={input.name}
          placeholder="Insert name..."
          />
          </div>
          <div>
            <label>Height</label>
            <input
            className={errors.height && 'danger'}
            type="number"
            name="height"
            onChange={handleInputChange}
            value={input.height }
            placeholder="Insert Height..."
            />
          </div>
          <div>
            <label>Weight</label>
            <input
            className={errors.weight && 'danger'}
            type="number"
            name="weight"
            onChange={handleInputChange}
            value={input.weight}
            placeholder="Insert Weight..."
            />
          </div>
          <div>
            <label>Attack</label>
            <input
            className={errors.attack && 'danger'}
            type="number"
            name="attack"
            onChange={handleInputChange}
            value={input.attack}
            placeholder="Insert Attack..."
            />
          </div>
          <div>
            <label>Defense</label>
            <input
            className={errors.defense && 'danger'}
            type="number"
            name="defense"
            onChange={handleInputChange}
            value={input.defense}
            placeholder="Insert Defense..."
            />
          </div>
          <div>
            <label>HP</label>
            <input
            className={errors.hp && 'danger'}
            type="number"
            name="hp"
            onChange={handleInputChange}
            value={input.hp}
            placeholder="Insert HP..."
            />
          </div>
          <div>
            <label>Speed</label>
            <input
            className={errors.speed && 'danger'}
            type="number"
            name="speed"
            onChange={handleInputChange}
            value={input.speed}
            placeholder="Insert Speed..."
            />
          </div>
          <div>
            <label>Image</label>
            <input
            className={errors.img && 'danger'}
            type="text"
            name="img"
            onChange={handleImageChange}
            value={input.img}
            placeholder="Insert Image..."
            />
          </div>
          <div>
            <p>Types</p>
            <div
          name="types"
          className={errors.types ? 'typesWithError' : 'typesCheck'}
        >
          {selectedTypes &&
            selectedTypes.map((type) => {
              return <span key={type}>{type}</span>
            })}
          {selectedTypes.length > 0 && (
            <img
              alt="deleteIcon"
              onClick={handleDelete}
              className={{ cursor: 'pointer' }}
              width="20px"
              src={x}
            />
          )}
        </div>
            </div>
            </div>
           <div className="icons">
          {types &&
            types.map((type) => {
              return (
                <div key={type.name}>
                  <img
                    alt="TypeIcon"
                    onClick={handleTypeCheck}
                    name={type.name}
                    src={require(`../../assets/icons/${type.name}.png`).default}
                  />
                </div>
              )
            })}
        </div>
          <button type="submit" className='eightbit-btn'>Submit</button>
      </form>
      </div>
      </div>
    </Fragment>
  )
}
