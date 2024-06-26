import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {QueryClientProvider} from 'react-query'
import { QueryClient } from 'react-query'
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
  </>
)
