import loaderGif from '../../../assets/charizard.gif'
import Classes from './loader.module.css'

export default function Loader () {
  return (
    <div className={Classes.gifContainer}>
      <img src={loaderGif} alt="loader"/>
      <div className={Classes.loader} ></div>
    </div>
  )
}
