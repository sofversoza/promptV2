import { useState } from "react"
import PromptList from "../../components/PromptList"
import { useCollection } from "../../hooks/useCollection"
import PromptFilter from "./PromptFilter"
import "./Home.css"

export default function Home() {
  const { documents, error } = useCollection("prompts")
  const [currentFilter, setCurrentFilter] = useState("all")

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  // checking for the diff types of filter then we pass it down to ProjectList as a prop to show just the filtered documents
  const filteredProjects = documents ? documents.filter((document) => {
    switch (currentFilter) {
      case "all":
        return true
      case "poem":
      case "play":
      case "narrative":
      case "persuasive":
      case "expository":   
        console.log(document.category, currentFilter)
        return document.category === currentFilter
      default:
        return true  
    }
  }) : null

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {documents && (
        <PromptFilter currentFilter={currentFilter} changeFilter={changeFilter} />
      )}
      {filteredProjects && <PromptList prompts={filteredProjects} />}
    </div>
  )
}
