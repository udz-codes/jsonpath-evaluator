import { useState, createContext } from 'react'
import './App.css'
import Header from './components/Header'
import InputBody from './components/InputBody'
import SpreadSheet from './components/SpreadSheet'
import { Toaster } from "@/components/ui/toaster"
import Footer from './components/Footer'
import { SpreadsheetProvider } from './components/SpreadsheetContext';
import { Analytics } from "@vercel/analytics/react"

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
      <SpreadsheetProvider>
        <div className='bg-primary text-primary-foreground'>
          <Header />
          <InputBody />
          <SpreadSheet />
          <Toaster />
          <Footer />
          <Analytics />
        </div>
      </SpreadsheetProvider>
    </QueryContext.Provider>
  )
}

export default App
