import { useState, createContext } from 'react'
import './App.css'
import Header from './components/Header'
import InputBody from './components/InputBody'
import SpreadSheet from './components/SpreadSheet'
import { Toaster } from "@/components/ui/toaster"
import Footer from './components/Footer'

export const QueryContext = createContext({
  inputText: '',
  queryLanguage: '',
  setQueryLanguage: () => {},
  setInputText: () => {}
});

function App() {
  const [inputText, setInputText] = useState("$.jokes[0]")
  const [queryLanguage, setQueryLanguage] = useState("JSONPath")

  return (
    <QueryContext.Provider value={{inputText, queryLanguage, setInputText, setQueryLanguage}}>
      <div className='bg-primary text-primary-foreground'>
        <Header />
        <InputBody />
        <SpreadSheet />
        <Toaster />
        <Footer />
      </div>
    </QueryContext.Provider>
  )
}

export default App
