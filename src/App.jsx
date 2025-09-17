import { useState } from 'react'

import './App.css'
import Todo from './components/Todos'
import { ToastContainer } from 'react-toastify'

function App() {
  

  return (
    <>
    <ToastContainer autoClose={1000} />
     <Todo/>
    </>
  )
}

export default App
