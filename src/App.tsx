import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GiftExchangePage from './components/GiftExchangePage'
import { OccasionsPage } from './components/OccasionsPage'
import { LandingPage } from './components/LandingPage'
import { SignInForm } from './components/auth/SignInForm'
import { SignUpForm } from './components/auth/SignUpForm'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { MainLayout } from './components/layout/MainLayout'
import { useAuth } from './context/AuthContext'

function App(): JSX.Element {
  const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, signOut } = useAuth();
    const authenticatedUser = user ? { 
      id: 1, // Using mock ID since we're using Supabase auth
      name: user.email ?? 'User',
      isAuthenticated: true 
    } : null;

    if (!authenticatedUser) return <>{children}</>;
    
    return (
      <MainLayout 
        user={authenticatedUser} 
        onSignOut={signOut}
      >
        {children}
      </MainLayout>
    );
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route 
              path="/occasions" 
              element={
                <ProtectedRoute>
                  <LayoutWrapper>
                    <OccasionsPage />
                  </LayoutWrapper>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/occasions/:occasionId" 
              element={
                <ProtectedRoute>
                  <LayoutWrapper>
                    <GiftExchangePage />
                  </LayoutWrapper>
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App