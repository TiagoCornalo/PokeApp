import { getSinglePokemon, deletePokemon } from '../../../actions'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Classes from './cardDetail.module.css'
import styleCard from '../colors/colors'
import heart from '../../../assets/heart.gif'
import Loader from '../Loader/Loader'
import Scale from '../../../assets/scale.png'
import Height from '../../../assets/tree.png'
import Nav from '../../Home/navigation/Nav'
export default function PokeDetail () {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const pokemon = useSelector((state) => state.pokemonDetails)
  const [loading, setLoading] = useState(true)

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        dispatch(deletePokemon(id))
        navigate('/home')
      }
    })
  }
  useEffect(() => {
    dispatch(getSinglePokemon(id))
  }, [])

  if (pokemon && loading) {
    setLoading(false)
  }
  if (pokemon.name && !loading) {
    return (
      <div >
        <Nav />
        <div className={Classes.card}>
          {id.length > 3
            ? (
              <div className={Classes.leftBtn}>
              <button className={Classes.btn} onClick={handleDelete}>Delete Pokemon</button>
            </div>
              )
            : null}
          <div className={Classes.topContainer} >

            <div className={Classes.topStats}>
              <img
                src={heart}
                alt="life"
                style={{ width: '40px', height: '40px', alignSelf: 'center' }}
              />
              <span>{pokemon.hp}</span>
            </div>
          <div className={Classes.topStats}>
            <img src={Scale} alt={pokemon.weight} style={{ width: '40px', height: '40px', alignSelf: 'center' }} />
            <span>{pokemon.weight} Kg</span>
          </div>
          <div className={Classes.topStats}>
            <br />
            <img src={Height} alt={pokemon.height} style={{ width: '40px', height: '40px', alignSelf: 'flex-start' }}/>
            <span>{pokemon.height / 10} M</span>
          </div>
          </div>
            <img src={pokemon.img} alt={pokemon.name} />
            <h2 className={Classes.poke_name}>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h2>

            <div className={Classes.types}>
              {pokemon.types.map((t, index) => (
                <span key={index} style={{ background: `${styleCard(t)}` }}>
                  {t}
                </span>
              ))}
            </div>
            <div className={Classes.stats}>
              <div>
              <meter min="0" max="120" low="25" high="100" optimum="120" value={`${pokemon.attack}`}></meter>
                <p>Attack:</p>
                <p >{pokemon.attack}</p>
              </div>
              <div>

                <meter min="0" max="120" low="25" high="100" optimum="120" value={`${pokemon.defense}`}></meter>
                <p>Defense:</p>
                <p>{pokemon.defense}</p>
              </div>
              <div>
              <meter min="0" max="120" low="25" high="100" optimum="120" value={`${pokemon.speed}`}></meter>
                <p>Speed:</p>
                <p>{pokemon.speed}</p>
              </div>
            </div>

        </div>
      </div>
    )
  }

  return (
  <Loader />
  )
}
