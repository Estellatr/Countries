import React from 'react'
import './App.css'
import {Countries} from './components/Countries/Countries'
import { Footer } from './components/Header and Footer/Footer'
import { Header } from './components/Header and Footer/Header'


const App = () => {
  return (
    <div className="App">
      <Header />
      < Countries />
      <Footer />
    </div>
  )
}

export default App
