import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './component/ErrorBoundary/ErrorBoundary.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ImageProvider } from './context/ImageContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <ImageProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ImageProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
)

