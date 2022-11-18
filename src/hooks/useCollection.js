import { useState, useEffect, useRef } from "react"
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore"
import { db } from "../firebase.config"

// real time collection data. c is for collection, _q is for query
export const useCollection = (c, _q, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call  
  const q = useRef(_q).current
  const order = useRef(_orderBy).current

  useEffect(() => {
    let ref = collection(db, c)

    // if there's a query (we dont have to pass it in) we'll change our ref
    if (q) {
      ref = query(ref, where(...q))
    }
    if (order) {
      ref = orderBy(ref, ...order)
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      })
      setDocuments(results)
      setError(null)
    }, error => {
      console.log(error)
      setError("could not fetch data")
    })

    return () => unsub()

  }, [c, q, order])

  return { documents, error }
}