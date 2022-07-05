import title from '../../assets/title.png'
import Classes from './landingPage.module.css'
import { Link } from 'react-router-dom'
export default function LandingPage () {
  return (
    <div>
      <div className={Classes.title}>
        <img src={title} alt="title" />
      </div>
        <div>
          <Link to='/home'>
       {/* eslint-disable-next-line react/no-unescaped-entities */}
      <button type="submit" className={Classes.eightbitBtn}>Cath 'Em All!</button>
      </Link>
      </div>

    </div>
  )
}
