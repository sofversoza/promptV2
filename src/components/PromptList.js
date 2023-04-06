import { Link } from "react-router-dom"
import Avatar from "./Avatar"
import "../pages/home/Home.css"

export default function PromptList({ prompts }) {
  const maxLength = 100;

  return (
    <div className="prompt-list flexbox-cont">
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
              <h5>{prompt.title}</h5>
              {prompt.description.length > maxLength ? 
                  ( <p>{prompt.description.substring(0, maxLength)}...
                    <span className="read-more">read more</span></p>
                  ) 
                :
                  <p>{prompt.description}</p>
              }
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
