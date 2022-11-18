const filterList = ["all", "poem", "play", "narrative", "persuasive", "expository"]

export default function PromptFilter({ currentFilter, changeFilter }) {
  // newFilter is what the user clicks & is what filter is in our map below
  const handleClick = (newFilter) => {
    changeFilter(newFilter)
  }
  
  return (
    <div className="prompt-filter">
      <nav>
        <p>Filter by:</p>
        {filterList.map(filter => (
          <button
            key={filter}
            onClick={() => handleClick(filter)}
            // if currentFilter match filter (what user clicks) apply the active classname
            className={currentFilter === filter ? "active" : ""}
          >
            {filter}
          </button>
        ))}
      </nav>
    </div>
  )
}
