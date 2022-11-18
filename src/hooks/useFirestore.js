import { useReducer, useEffect, useState } from "react"
import { db, timestamp } from "../firebase.config"
import { collection, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore"

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
}

// we use this firestoreReducer to update some initial states (declared above)
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'UPDATED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }  
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload }
    default:
      return state
  }
}

export const useFirestore = (collectionName) => {
  // response is what we get after updating the initial states inside firestoreReducer
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection ref
  const ref = collection(db, collectionName)

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" })

    try {
      const createdAt = timestamp
      const addedDocument = await addDoc(ref, { ...doc, createdAt })
      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument })
    }
    catch(err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
    }
  }

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" })

    try {
      await deleteDoc(doc(id))
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" })
    }
    catch(err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete" })
    }
  }

  // update a document (to add comments)
  const updateDocument = async (id, updates) => {
    dispatch({ type: "IS_PENDING" })

    try {
      const updatedDocument = await updateDoc(doc(ref, id), updates)
      dispatchIfNotCancelled({ type: "UPDATE_DOCUMENT", payload: updatedDocument})
      return updatedDocument
    }
    catch(err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
      return null
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, updateDocument, response }
}
