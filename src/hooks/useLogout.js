import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from "../firebase.config"
import { signOut } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"
import { useAuthContext } from "../hooks/useAuthContext"

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch, user } = useAuthContext()
  const navigate = useNavigate()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      // update user's online status before the user is logged out
      const { uid } = user
      await updateDoc(doc(db, "users", uid), {
        online: false
      })

      // sign out user
      await signOut(auth)

      // dispatch logout action
      dispatch({ type: "LOGOUT" })
      navigate("/")

      // update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    }
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isPending }
}