import { Fragment } from 'react'
import './cardStyle.css'
import PropTypes from 'prop-types'
import heart from '../../../assets/heart.gif'
import { Link } from 'react-router-dom'
function styleCard (type) {
  switch (type) {
    case 'bug':
      return '#26de81'
    case 'dragon':
      return '#ffeaa7'
    case 'electric':
      return '#fed330'
    case 'fairy':
      return '#FF0069'
    case 'fighting':
      return '#30336b'
    case 'fire':
      return '#f0932b'
    case 'flying':
      return '#81ecec'
    case 'grass':
      return '#00b894'
    case 'ground':
      return '#EFB549'
    case 'ghost':
      return '#a55eea'
    case 'ice':
      return '#74b9ff'
    case 'normal':
      return '#95afc0'
    case 'poison':
      return '#6c5ce7'
    case 'psychic':
      return '#a29bfe'
    case 'rock':
      return '#2d3436'
    case 'water':
      return '#0190FF'
  }
}

export default function Cards ({ id, name, types, hp, attack, defense, speed, img }) {
  Cards.propTypes = {
    name: PropTypes.string.isRequired,
    types: PropTypes.array.isRequired,
    hp: PropTypes.number.isRequired,
    attack: PropTypes.number.isRequired,
    defense: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }

  return (
    <Fragment>

            <div key={name} style={{ background: `radial-gradient(circle at 50% 0%, ${styleCard(types[0])} 36%, #ffffff 36%)` }} className='card'>
              {/* conditional rendering button */}
              {/* <div>{typeof id === 'string' ? <div className='delBtn'><AiOutlineClose/></div> : null}</div> */}
              <div className='hp'>
                <img src={heart} alt='life' style={{ width: '30px', height: '30px', alignSelf: 'center' }}/>

                <p>{hp}</p>
              </div>
              <Link to={`/pokedex/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className='gifImg'>
              <img src={img} alt={name} />
              </div>
              </Link>
              <h2 className='poke-name'>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>

              <div className='types'>
                {types.map((t, index) => (
                  <span key={index} style={{ background: `${styleCard(t)}` }} >
                    {t}
                  </span>
                ))}
              </div>
              <div className="stats">

              </div>
            </div>

      </Fragment>
  )
}
