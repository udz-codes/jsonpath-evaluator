import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import InputBody from './components/InputBody'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-primary text-primary-foreground'>
      <Header />
      <InputBody />
    </div>
  )
}

export default App
