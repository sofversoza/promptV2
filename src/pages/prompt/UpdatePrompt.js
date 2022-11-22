import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFirestore } from "../../hooks/useFirestore"
import { serverTimestamp } from "firebase/firestore"
import Select from "react-select"

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
  const navigate = useNavigate()

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
    <div className="update">
      <h2>Update</h2>
      <form onSubmit={handleUpdate}>
        <label>
          <span>Prompt title:</span>
          <input
            required
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Prompt description:</span>
          <textarea
            required
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </label>
        <label>
          <span>Project category:</span>
          <Select 
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>

        <button className="btn">Update Prompt</button>
        <button className="btn" onClick={() => setUpdate(false)}>Cancel</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}
