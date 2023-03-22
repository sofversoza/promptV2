import { useParams } from "react-router-dom"
import { useDocument } from "../../hooks/useDocument"
import PromptComments from "./PromptComments"
import PromptDetail from "./PromptDetail"
import "./Prompt.css"

export default function Prompt() {
  const { id } = useParams()
  const { document, error } = useDocument("prompts", id)

  if(error) {
    return <div className="error">{error}</div>
  }
  if(!document) {
    return <div className="loading">Loading...</div>
  }

  return (
    <>
      {/* <div className="page-title-cont">
        <h2 className="page-title">
          <span className="title">{`${document.title}`} — </span> 
          <span className="user">{`${document.createdBy.displayName}`}</span>
        </h2>    
      </div> */}

      <div className="prompt">
        <PromptDetail prompt={document} />
        <PromptComments prompt={document} />
      </div>
    </>
  )
}
