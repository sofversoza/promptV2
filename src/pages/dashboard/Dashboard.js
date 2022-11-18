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
      <h1>Dashboard</h1>
      {error && <p className="error">{error}</p>}
      {documents && <PromptList prompts={documents} />}
    </div>
  )
}
