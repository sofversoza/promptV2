import React from 'react'
import { useCollection } from "../../hooks/useCollection"
import { useAuthContext } from "../../hooks/useAuthContext"

export default function FavoriteList() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    "prompts",
    [favoritedBy.id, "==", user.uid]
  )


  return (
    <div>
      
    </div>
  )
}
