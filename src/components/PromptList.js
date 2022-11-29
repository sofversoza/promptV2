import { Link } from "react-router-dom"
import "../pages/home/Home.css"
import Avatar from "./Avatar"

export default function PromptList({ prompts }) {
  return (
    <div className="prompt-list">
      {prompts.length === 0 && <p>No prompts to show</p>}
      {prompts.map(prompt => (
        <Link to={`/prompts/${prompt.id}`} key={prompt.id}>
          <div className="prompt-card">

            <div className="user-info">
              <Avatar src={prompt.createdBy.photoURL} alt="User's avatar" />
              <span>{prompt.createdBy.displayName}</span>
              {"·"}
              <p> {prompt.createdAt.toDate().toDateString()}</p>
            </div>

            <div className="prompt-info">
              <span>{prompt.title}</span>
              <p>{prompt.description.substring(0, 55)}...</p>
              {/* <p>{prompt.description > 70 ? prompt.description.substring(0, 70) : prompt.description}</p> */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
