import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Login from './pages/login-signup/Login'
import Signup from './pages/login-signup/Signup'
import Create from './pages/create/Create'
import Prompt from './pages/prompt/Prompt'
import LandingPage from './pages/landing/LandingPage'
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/dashboard/Dashboard"
import Settings from "./pages/settings/Settings"

function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="app-container">
            {user && <Navbar />}
            <Routes>
              <Route 
                path="/"
                element={user ? <Home /> : <LandingPage />}
              />
              <Route 
                path="/login"
                element={user ? <Navigate to="/" /> : <Login />}
              />
              <Route 
                path="/signup"
                element={user ? <Navigate to="/" /> : <Signup />}
              />
              <Route 
                path="/dashboard"
                element={user && <Dashboard />}
              />
              <Route 
                path="/settings"
                element={user && <Settings />}
              />
              <Route 
                path="/create"
                element={user && <Create />}
              />
              <Route 
                path="/prompts/:id"
                element={user && <Prompt />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
