import React from 'react'
import ContextProvider from './context/context';
import './global.css'

import Routes from './routes'

function App() {
  return (
    <ContextProvider>
      <Routes />
    </ContextProvider>
  );
}

export default App;
