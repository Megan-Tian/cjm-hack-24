import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home';
import './pages/Home.css'

function App() {

  return (
    <div className="container mx-auto">
      {/* <h1>Hello World</h1> */}
      <Home />
    </div>
  )
}

export default App
