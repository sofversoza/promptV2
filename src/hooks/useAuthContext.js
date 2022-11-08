import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

// this hook contains the User
// this wraps our AuthContext and returns context so we can use it in diff comps
export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw Error("useAuthContext must be inside an AuthContextProvider")
  }

  return context
}