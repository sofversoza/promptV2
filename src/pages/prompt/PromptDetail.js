import { useNavigate } from "react-router-dom"
import { useFirestore } from "../../hooks/useFirestore"
import { useAuthContext } from "../../hooks/useAuthContext"
import Avatar from "../../components/Avatar"

export default function PromptDetail({ prompt }) {
  const { user } = useAuthContext()
  const { deleteDocument } = useFirestore("prompts")
  const navigate = useNavigate()

  const handleClick = (e) => {
    deleteDocument(prompt.id)
    navigate("/dashboard")
  }

  return (
    <div className="prompt-detail">
      <h2>{prompt.title}</h2>
      <Avatar src={prompt.createdBy.photoURL} />
      <p>Submitted by {prompt.createdBy.displayName}</p>
      <p>Submitted on {prompt.createdAt.toDate().toDateString()}</p>
      <p>{prompt.description}</p>

      <div>
        {/*only show the delete button if the current user is the owner of the project*/}
        {user.uid === prompt.createdBy.id && (
          <button className="btn" onClick={handleClick}>Delete</button>
        )}
      </div>
    </div>
  )
}
