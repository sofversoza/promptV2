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
    <>
      <div className="page-title-cont">
        <h2 className="page-title">{`${user.displayName}'s Dashboard`}</h2>    
      </div>

      <div className="dashboard">
        {error && <p className="error">{error}</p>}
        {documents && <PromptList prompts={documents} />}
      </div>
    </>
  )
}
