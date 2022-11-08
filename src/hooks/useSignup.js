import { useState, useEffect } from "react"
import { auth, storage, db } from "../firebase.config"
import { useAuthContext } from "../hooks/useAuthContext"
import { createUserWithEmailAndPassword } from "firebase/auth"

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, avatar) => {
    setError(null)
    setIsPending(true)

    try {
      // sign up
      const res = await createUserWithEmailAndPassword(auth, email, password)

      if (!res) {
        throw new Error("Could not complete signing up")
      }

      // upload user avatar
      const uploadPath = `avatars/${res.user.uid}/${avatar.name}`
      const img = await storage.ref(uploadPath).put(avatar)
      const imgURL = await img.ref.getDownloadURL()

      // add display name and avatar img to user
      await res.user.updateProfile({ displayName, photoURL: imgURL })

      // create a user document 
      await db.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: imgURL
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

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

  return { error, isPending, signup }
}