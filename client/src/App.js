import './App.css'
import Home from './components/Home/Home'
import { Fragment } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import PokeCreate from './components/createForm/PokeCreate'
import CardDetail from './components/desing/CardDetail/CardDetail'
import LandingPage from './components/landingPage/LandingPage'
import About from './components/about/About'
import NotFound from './components/notFound/NotFound'
function App () {
  return (
    <Fragment>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/create'element={<PokeCreate/>}/>
      <Route path='/pokedex/:id'element={<CardDetail/>} />
      <Route path='/about' element={<About/>}/>
      <Route path='*' element={<NotFound/>}/>
      </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
