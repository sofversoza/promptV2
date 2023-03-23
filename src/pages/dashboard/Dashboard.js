import { useCollection } from "../../hooks/useCollection"
import { useAuthContext } from "../../hooks/useAuthContext"
import "../dashboard/Dashboard.css"
import PromptList from "../../components/PromptList"

export default function Dashboard() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    "prompts",
    ["createdBy.id", "==", user.uid]
  )

  return (
    <div className="dashboard">
      <div className="page-title-cont">
        <h2 className="page-title">{`${user.displayName}'s Dashboard`}</h2>    
      </div>

      <h3>Prompt submissions ({documents ? documents.length : 0})</h3>

      <div>
        {error && <p className="error">{error}</p>}
        {documents && <PromptList prompts={documents} />}
      </div>

      <h3>Saved prompts ()</h3>
    </div>
  )
}
