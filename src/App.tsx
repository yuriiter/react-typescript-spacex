import React from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import { Provider as URQLProvider, Client, defaultExchanges } from 'urql'

import './sass/_main.scss'

import { Launch } from './views/Launch'
import { Launches } from './views/Launches'
import { FavouritesProvider } from './contexts/FavouritesContext';

const client = new Client({
  url: 'https://api.spacex.land/graphql/',
  exchanges: defaultExchanges,
})

function App() {
  return (
    <div>
      <FavouritesProvider>
        <URQLProvider value={client}>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route path="/" element={<Launches />} />
                <Route path="launches/:id" element={<Launch />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </URQLProvider>
      </FavouritesProvider>
    </div>
  )
}

export default App
