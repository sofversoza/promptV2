import { useState, useEffect } from "react"
import { auth, storage, db } from "../firebase.config"
import { useAuthContext } from "../hooks/useAuthContext"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore"

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, avatar) => {
    setError(null)
    setIsPending(true)

    try {
      // sign up user
      const res = await createUserWithEmailAndPassword(auth, email, password)

      if (!res) {
        throw new Error("Could not complete signing up")
      }

      // upload user avatar
      const imgRef = ref(storage, `avatars/${res.user.uid}/${avatar.name}`)
      const imgPost = await uploadBytes(imgRef, avatar)
      const imgURL = await getDownloadURL(imgPost.ref)

      // add display name and avatar img to user
      await updateProfile(res.user, { displayName, photoURL: imgURL })

      // create a user document for every user to get all of signed up user's info (not just the currently online user)
      await setDoc(doc(db, "users", res.user.uid), {
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