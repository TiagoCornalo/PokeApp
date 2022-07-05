import './App.css'
import Home from './components/Home/Home'
import { Fragment } from 'react'
import { Route } from 'react-router-dom'
import PokeCreate from './components/createForm/PokeCreate'
import CardDetail from './components/desing/CardDetail/CardDetail'
import LandingPage from './components/landingPage/LandingPage'
import About from './components/about/About'
function App () {
  return (
    <Fragment>
      <Route exact path={'/'} component={LandingPage}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/create'component={PokeCreate}/>
      <Route exact path='/pokedex/:id'component={CardDetail} />
      <Route exact path='/about' component={About}/>
    </Fragment>
  )
}

export default App
