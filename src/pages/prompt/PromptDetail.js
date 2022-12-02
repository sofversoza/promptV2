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
        <h2>{prompt.title}</h2>

        <div className="user-info">
          <Avatar src={prompt.createdBy.photoURL} alt="user's avatar" />
          <p>Submitted by {prompt.createdBy.displayName}</p>
          <p>Submitted on {prompt.createdAt.toDate().toDateString()}</p>
        </div>

        <div className="prompt-body">
          <p>{prompt.description}</p>
        </div>

        <div className="buttons">
          {/* only show delete & update button if the current user is the creator */}
          {user.uid === prompt.createdBy.id && (
            <>
              {/* <p>Edit <MdEditNote className="icon1" onClick={() => setUpdate(true)} /></p>
              <p>Delete <MdDeleteSweep className="icon2" onClick={handleClick} /></p> */}
              <p onClick={() => setUpdate(true)}>Edit </p>
              <p onClick={handleClick}>Delete </p>
            </>
          )}
        </div>
      </div>
    }
    </>
  )
}
