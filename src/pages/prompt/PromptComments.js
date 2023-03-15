import { useState } from 'react'
import { timestamp } from "../../firebase.config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Avatar from '../../components/Avatar'
import "./Prompt.css"

export default function PromptComments({ prompt }) {
  const { updateDocument, response } = useFirestore("prompts")
  const { user } = useAuthContext()
  const [newComment, setNewComment] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    // create new comment {} which represents the comment we want to add
    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      // so we can order comments by date or time
      createdAt: timestamp,
      // giving each comments an id so we can map through them
      id: Math.random()
    }
    // console.log(commentToAdd)
    // await updateDocument(prompt.id, {
    //   comments: [...prompt.comments, commentToAdd]
    // })
    if (!response.error) {
      setNewComment("")
      await updateDocument(prompt.id, {
        comments: [...prompt.comments, commentToAdd]
      })
    }
  }

  return (
    <div className="prompt-comments">
      <div className="title">
        <h3>Comments</h3>
      </div>

      <span>Leave a public comment on this prompt</span>
      <div className="comment-form">
        <form className="add-comment" onSubmit={handleSubmit}>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}>
          </textarea>
          <button className="btn">Submit</button>
        </form>
      </div>

      <div className="comment-card">
      <h3>All comments ({prompt.comments.length})</h3>
        <ul>
          {prompt.comments.length > 0 && prompt.comments.map(comment => (
            <li key={comment.id}>
              {/* we got these properties from the comment obj we created above */}
              <div className="comment-author">
                <Avatar src={comment.photoURL} className="avatar" />
                <p>{comment.displayName} · </p>
                
                <div className="comment-date">
                  <p>
                    {formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}
                  </p>
                </div>
              </div>

              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
