import { useState } from "react"
import { auth } from "../firebase.config"
import { useAuthContext } from "../hooks/useAuthContext"
import { signInWithEmailAndPassword } from "firebase/auth"

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { dispatch } = useAuthContext()

  // we'll return this function from inside this hook to use in diff comps
  const login = (email, password) => {
    setError(null)
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // console.log("user logged in:", res.user)
        // we're updating the global state to be the user that just logged in
        dispatch({ type: "LOGIN", payload: res.user })  
      })
      .catch((err) => {
        setError(err.message)
      })
    setLoading(false)  
  }

  // these are what we can grab from diff comps to use this hook
  return { error, loading, login }
}