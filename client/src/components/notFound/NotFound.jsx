import React from 'react'
import Classes from './notfound.module.css'
import { Link } from 'react-router-dom'
import Psyduck from '../../assets/psyduck.gif'

const NotFound = () => {
  return (
    <div className={Classes.container}>
      <div>
        <h1>ERROR 404 (NOT FOUND)</h1>
        <h2>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Oops! <br /> Seems like you got lost! <br /> Don't worry, let's get
          back home.
        </h2>
        <Link to="/home">
          <button className="button">GO BACK HOME</button>
        </Link>
      </div>
      <div>
        <img alt="Lost Psyduck" src={Psyduck} />
      </div>
    </div>
  )
}
export default NotFound
