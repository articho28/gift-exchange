import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GiftExchangePage from './components/GiftExchangeMain'
import { LandingPage } from './components/LandingPage'
import { SignInForm } from './components/auth/SignInForm'
import { SignUpForm } from './components/auth/SignUpForm'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/app" element={<GiftExchangePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App