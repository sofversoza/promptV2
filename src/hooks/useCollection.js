import { useState, useEffect, useRef } from "react"
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore"
import { db } from "../firebase"

// real time collection data. c is for collection, _q is for query
export const useCollection = (c, _q, _order) => {
  const [documents, setDocuments] = useState(null)

  // set up query. we wrapped it in useRef so it wont trigger our useEffect when it changes value because its in the array dependency (infinite loop otherwise)
  // _q is an array and is "different" on every function call  
  const q = useRef(_q).current
  const order = useRef(_order).current

  useEffect(() => {
    let ref = collection(db, c)

    // if there's a query (we dont have to pass it in) we'll change our ref
    if (q) {
      ref = query(ref, where(...q))
    }
    if (order) {
      ref = orderBy(ref, ...order)
    }

    // the 2nd argument (function) will fire everytime we get data changes in the collection, also fires once when we initially connect to it 
    const unsub = onSnapshot(ref, (snapshot) => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      })
      setDocuments(results)
    })

    // a clean up function so we can unsub from realtime db (onSnapshot) when a component unmounts
    return () => unsub()

    // c (for collection) as a dependency so when a collection changes it reruns this whole function
  }, [c, q, order])

  // lastly we'll return documents so we can use it in diff components
  return { documents }
}