import { useState } from "react" 
import { useNavigate } from "react-router-dom"
import { useFirestore } from "../../hooks/useFirestore"
import { useAuthContext } from "../../hooks/useAuthContext"
import Select from "react-select"
import "./Create.css"

const categories = [
  { value: "poem", label: "Poem" },
  { value: "play", label: "Plays" },
  { value: "narrative", label: "Narrative" },
  { value: "persuasive", label: "Persuasive" },
  { value: "expository", label: "Expository" }
]

export default function Create() {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { addDocument, response } = useFirestore("prompts")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if(!category) {
      setFormError("Please select a category")
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const prompt = {
      title: title,
      description: description,
      category: category.value,
      createdBy: createdBy,
      comments: []
    }
    // console.log(prompt)
    await addDocument(prompt)

    if(!response.error) {
      navigate("/dashboard")
    }
  }

  return (
    <div className="create">
      <div className="header-box">
        <h2>Compose</h2>
      </div>

      <div className="paper">
        <div className="paper-content">
          <form onSubmit={handleSubmit}>
            <input
              required
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <span>Title</span>
            <textarea
              required
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}>
            </textarea>
            <span className="span2">Description</span>

            <div className="select">
              <Select 
                onChange={(option) => setCategory(option)}
                options={categories}
              />
            </div>

            <button className="btn">Submit Prompt</button>
            {formError && <p className="error">{formError}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
