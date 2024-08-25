
import Buscar from "./components/Buscar";
import FormCriar from './components/FormCriar.jsx'
import React from "react";

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App(){
    return (
      <main>
      <BrowserRouter>
          <Routes>
              <Route  path="/" element={<Buscar />} />
              <Route  path="/formcriar" element={<FormCriar />} />
          </Routes>
      </BrowserRouter>
  </main>
);
}
    
export default App;