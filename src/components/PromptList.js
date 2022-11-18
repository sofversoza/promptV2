import { Link } from "react-router-dom"
import Avatar from "./Avatar"

export default function PromptList({ prompts }) {
  return (
    <div className="prompt-list">
      {prompts.length === 0 && <p>No prompts to show</p>}
      {prompts.map(prompt => (
        <Link to={`/prompts/${prompt.id}`} key={prompt.id}>
          <h4>{prompt.title}</h4>
          <p>Submitted on: {prompt.createdAt.toDate().toDateString()}</p>
        </Link>
      ))}
    </div>
  )
}
