import { createContext } from "react";
import "./App.css";
import Header from "./components/Header";
import InputBody from "./components/InputBody";
import SpreadSheet from "./components/SpreadSheet";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./components/Footer";
import { SpreadsheetProvider } from "./components/SpreadsheetContext";
import { Analytics } from "@vercel/analytics/react"
import useManagedState from "./hooks/useManagedState";
import {
  DEFAULT_INPUT_TEXT_VALUE,
  DEFAULT_QUERY_LANGUAGE_VALUE,
} from "./data/defaultValues";

export const QueryContext = createContext({
  inputText: "",
  queryLanguage: "",
  setQueryLanguage: () => {},
  setInputText: () => {},
  localStorageSettings: {},
  setLocalStorageSettings: () => {},
});

function App() {
  // Manage `inputText` with custom hook, based on settings
  const [inputText, setInputText] = useManagedState(DEFAULT_INPUT_TEXT_VALUE);

  // Manage `queryLanguage`, also based on settings
  const [queryLanguage, setQueryLanguage] = useManagedState(
    DEFAULT_QUERY_LANGUAGE_VALUE
  );

  return (
    <QueryContext.Provider
      value={{
        inputText,
        queryLanguage,
        setInputText,
        setQueryLanguage,
      }}
    >
      <SpreadsheetProvider>
        <div className="bg-primary text-primary-foreground">
          <Header />
          <InputBody />
          <SpreadSheet />
          <Toaster />
          <Footer />
          <Analytics />
        </div>
      </SpreadsheetProvider>
    </QueryContext.Provider>
  );
}

export default App;
