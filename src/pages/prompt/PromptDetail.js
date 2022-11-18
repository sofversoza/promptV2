import { useNavigate } from "react-router-dom"
import { useFirestore } from "../../hooks/useFirestore"
import { useAuthContext } from "../../hooks/useAuthContext"
import Avatar from "../../components/Avatar"

export default function PromptDetail({ prompt }) {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  return (
    <div className="prompt-detail">
      <h2>{prompt.title}</h2>
      <Avatar src={prompt.createdBy.photoURL} />
      <p>Submitted by {prompt.createdBy.displayName}</p>
      <p>Submitted on {prompt.createdAt.toDate().toDateString()}</p>
      <p>{prompt.description}</p>
    </div>
  )
}
