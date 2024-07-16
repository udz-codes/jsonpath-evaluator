import { useState, createContext } from 'react'
import './App.css'
import Header from './components/Header'
import InputBody from './components/InputBody'

export const QueryContext = createContext({
  inputText: '',
  queryLanguage: '',
  setQueryLanguage: () => {},
  setInputText: () => {}
});

function App() {
  const [inputText, setInputText] = useState("$.")
  const [queryLanguage, setQueryLanguage] = useState("JSONPath")

  return (
    <QueryContext.Provider value={{inputText, queryLanguage, setInputText, setQueryLanguage}}>
      <div className='bg-primary text-primary-foreground'>
        <Header />
        <InputBody />
      </div>
    </QueryContext.Provider>
  )
}

export default App
