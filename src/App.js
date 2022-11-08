import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Login from './pages/login-signup/Login'
import Signup from './pages/login-signup/Signup'
import Create from './pages/create/Create'
import Project from './pages/project/Project'
import LandingPage from './pages/landing/LandingPage'


function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <div className="app-container">
            {user && <Navbar />}
            <Routes>
              <Route 
                path="/landing-page" 
                element={!user && <LandingPage />}
              />
              <Route 
                path="/"
                element={user ? <Home /> : <Navigate to="/landing-page" />}
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
                path="/create"
                element={user ? <Create /> : <Navigate to="/landing-page" />}
              />
              <Route 
                path="/projects/:id"
                element={user ? <Project /> : <Navigate to="/landing-page" />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
