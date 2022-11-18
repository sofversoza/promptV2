import { useState, useEffect } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase.config"

export const useDocument = (c, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const ref = doc(db, c, id)

    const unsub = onSnapshot(ref, (snapshot) => {
      // only subscribe if the document exist
      if(snapshot.data()) {
        setDocument({ ...snapshot.data(), id: snapshot.id })
        setError(null)
      }
      else {
        setError("document does not exist")
      }
    }, (err) => {
      console.log(err.message)
      setError("failed to get document")
    })

    return () => unsub()

  }, [c, id])

  return { document, error }
}