import React, {useEffect,useState} from "react";
import { NativeBaseProvider, useTheme } from "native-base";
import DBConnection from "./utils/DBConnection";
import ButtonBar from "./pages/ButtonBar";

export const GlobalContext = React.createContext();

export default function App() {
  const globals = {
    db: new DBConnection("authandcruds"),
  };


  return (
    <NativeBaseProvider>
      <GlobalContext.Provider value={globals}>
        <ButtonBar/>
      </GlobalContext.Provider>
    </NativeBaseProvider>
  );
}
