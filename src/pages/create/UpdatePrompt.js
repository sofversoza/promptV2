import { useState, useEffect } from "react"
import { useFirestore } from "../../hooks/useFirestore"
import { serverTimestamp } from "firebase/firestore"
import Select from "react-select"
import "./Create.css"

const categories = [
  { value: "poem", label: "Poem" },
  { value: "play", label: "Plays" },
  { value: "narrative", label: "Narrative" },
  { value: "persuasive", label: "Persuasive" },
  { value: "expository", label: "Expository" }
]

export default function UpdatePrompt({ prompt, setUpdate }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [formError, setFormError] = useState(null)

  const { updateDocument, response } = useFirestore("prompts")

  // setting input values to prompt's og values
  useEffect(() => {
    setTitle(prompt.title)
    setDescription(prompt.description)
  }, [])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setFormError(null)

    if (!category) {
      setFormError("Please select a category")
      return
    }

    await updateDocument(prompt.id, {
      title: title,
      description: description,
      category: category.value,
      createdBy: prompt.createdBy,
      comments: prompt.comments,
      updated_at: serverTimestamp()
    })

    if (!response.error) {
      setUpdate(false)
    }
  }

  return (
    <>
      <div className="page-title-cont">
        <h2 className="page-title">Update Prompt</h2>    
      </div>

      <div className="create flexbox-cont">
        <div className="paper-content">
          <form onSubmit={handleUpdate}>
            
            <div className="form-title">
              <input
                required
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                />
              <span>Title</span>
            </div>

            <div className="form-description">
              <textarea
                required
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}>
              </textarea>
              <span>Description</span>
            </div>

            <div className="form-last-item">
              <div className="form-category">
                <span>Category</span>
                  <Select 
                    onChange={(option) => setCategory(option)}
                    options={categories}
                    isClearable={true}
                    // value={category}
                  />
              </div>

              <div className="buttons">
                <button className="btn">Update</button>
                <button className="btn" onClick={() => setUpdate(false)}>Cancel</button>
              </div>
            </div>
            {formError && <p className="error">{formError}</p>}
          </form>
        </div>
      </div>
    </>
  )
}
