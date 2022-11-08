import { useState, useEffect, useRef } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"

export const useDocument = (c, id) => {
  const [document, setDocument] = useState(null)

  useEffect(() => {
    let ref = doc(db, c, id)

    const unsub = onSnapshot(ref, (snapshot) => {
      setDocument({...snapshot.data(), id: snapshot.id})
    })

    return () => unsub()

  }, [c, id])

  return { document }
}