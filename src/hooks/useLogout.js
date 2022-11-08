import { auth } from "../firebase"
import { signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext"

export const useLogout = () => {
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()

  // we'll return this function from inside this hook to use in diff comps
  const logout = () => {
    signOut(auth)
      .then(() => {
        // console.log("user signed out")
        dispatch({ type: "LOGOUT" })
        navigate("/")
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return { logout }
}