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

const customStyles = {
  control: (styles, state) => ({
    ...styles,
    backgroundColor: "#f5f5f5ac",
    height: "10px",
    minHeight: "40px",
    border: state.isFocused ? '1.5px solid #777EA6' : "transparent",
    boxShadow: 'none',
    borderColor: 'none',
    '&:hover': {
      color: '#777EA6'
    }
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isFocused && "#777EA6",
    color: state.isFocused && "#f4f4f4",
    fontSize: "14px",
    padding: "5px",
  })
}

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

  const handleReset = (e) => {
    e.preventDefault()
    setTitle("")
    setDescription("")
    setCategory(null)
    setFormError(null)
  }

  return (
    <>
      <div className="page-title-cont">
        <h2 className="page-title">Compose a new prompt</h2>    
      </div>
      <div className="create flexbox-cont">
        <div className="paper-content">
          <form onSubmit={handleSubmit}>
            <div className="form-title">
              <span>Title</span>
              <input
                required
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="form-description">
              <span>Description</span>
              <textarea
                required
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}>
              </textarea>
            </div>
            <div className="form-last-item">
              <div className="form-category">
                <span>Category</span>
                  <Select 
                    onChange={(option) => setCategory(option)}
                    options={categories}
                    isClearable={true}
                    value={category}
                    styles={customStyles}
                  />
              </div>
              <div className="buttons">
                <button className="btn">Submit</button>
                <button onClick={handleReset}>Reset form</button>
              </div>
            </div>
            {formError && <p className="error">{formError}</p>}
          </form>
        </div>
      </div>
    </>
  )
}
