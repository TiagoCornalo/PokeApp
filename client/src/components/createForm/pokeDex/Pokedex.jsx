import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import './pokedex.css'
export default function PokeDex () {
  const pokemonBg = useSelector(state => state.pokedexImg)

  return (
    <Fragment>
      <div className="left-panel">
        {/* <!-- Top lights --> */}
        <div className="left-top-container">
          <svg height="100" width="225" className="left-svg">
            <polyline
              points="0,75 70,75 90,38 224,38"
              style={{ fill: 'none', stroke: 'black', strokeWidth: 3 }}
            />
          </svg>
          <div className="lights-container">
            <div className="big-light-boarder">
              <div className="big-light blue">
                <div className="big-dot light-blue"></div>
              </div>
            </div>
            <div className="small-lights-container">
              <div className="small-light red">
                <div className="dot light-red"></div>
              </div>
              <div className="small-light yellow">
                <div className="dot light-yellow"></div>
              </div>
              <div className="small-light green">
                <div className="dot light-green"></div>
              </div>
            </div>
          </div>
        </div>
        <div className='screenContainer'>
        <div className='greenScreen'>
          <div className='pokeImg'>
            {pokemonBg.length > 0
              ? (
              <img src={pokemonBg } alt="pokemon" style={{ width: '200px' }} />
                )
              : null }
          </div>
        </div>
        </div>
      </div>
      </Fragment>
  )
}
