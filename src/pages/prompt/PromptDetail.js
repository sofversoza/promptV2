import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFirestore } from "../../hooks/useFirestore"
import { useAuthContext } from "../../hooks/useAuthContext"
import { MdDeleteSweep, MdEditNote } from "react-icons/md"
import Avatar from "../../components/Avatar"
import UpdatePrompt from "./UpdatePrompt"
import "./Prompt.css"

export default function PromptDetail({ prompt }) {
  const [update, setUpdate] = useState(false)
  const { user } = useAuthContext()
  const { deleteDocument } = useFirestore("prompts")
  const navigate = useNavigate()

  const handleClick = (e) => {
    deleteDocument(prompt.id)
    navigate("/dashboard")
  }

  return (
    <>
    {update ? 
      <UpdatePrompt prompt={prompt} setUpdate={setUpdate} />
      :
      <div className="prompt-detail">
        <div className="prompt-body">
          <h2>{prompt.title}</h2>

          <div className="user-info">
            <Avatar src={prompt.createdBy.photoURL} alt="user's avatar" />
            <span>{prompt.createdBy.displayName}</span>
            <p>·</p>
            <span className="date">{prompt.createdAt.toDate().toDateString()}</span>
          </div>

          <div className="text-cont">
            <p>{prompt.description}</p>
          </div>
        </div>

        <div className="actions">
          {/* only show delete & update button if the current user is the creator */}
          {user.uid === prompt.createdBy.id && (
            <>
              <button onClick={() => setUpdate(true)}>Update</button>
              <button onClick={handleClick}>Delete</button>
            </>
          )}
        </div>
      </div>
    }
    </>
  )
}
