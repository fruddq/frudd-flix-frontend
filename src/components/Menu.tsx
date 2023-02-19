import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Dropdown } from "./Dropdown"
import { SearchSVG } from "./SearchSVG"

// @TODO fix sort functions
export const Menu: React.FC = () => {
  const [showMenuAndSearchButton, setShowMenuAndSearch] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  // const handleSort = useCallback(() => {
  //   console.log("hello")
  // }, [])

  const navigate = useNavigate()

  const handleSearch = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "Go" || event.key === "Search") {
      navigate(`/search/${event.currentTarget.value}/1`)
    }
  }, [navigate])

  const showMenuAndSearch = useCallback(() => {
    setShowMenuAndSearch(true)
  }, [setShowMenuAndSearch])

  const hideMenuAndSearch = useCallback(() => {
    setShowMenuAndSearch(false)
  }, [setShowMenuAndSearch])

  const toggleDropdown = useCallback(() => {
    setShowDropdown((prevState) => !prevState)
  }, [setShowDropdown])

  const navigateToWatchLater = useCallback(() => {
    navigate("/watch-later/1")
  }, [navigate])

  const navigateToFavorites = useCallback(() => {
    navigate("/favorites/1")
  }, [navigate])

  return (
    <nav className="menu">
      {!showMenuAndSearchButton && (
        <>
          <button className="menu-browse-btn nav-btn" onClick={toggleDropdown}>
            Browse
          </button>

          {/* <button className="menu-year-btn nav-btn" onClick={handleSort}>
            Year
          </button>

          <button className="menu-rating-btn nav-btn" onClick={handleSort}>
            Rating
          </button> */}

          <button className="menu-filter-btn nav-btn" onClick={navigateToFavorites}>
            Favorites
          </button>

          <button className="menu-filter-btn nav-btn" onClick={navigateToWatchLater}>
            Watch later
          </button>

          <button className="menu-search-btn nav-btn" onClick={showMenuAndSearch}>
            <SearchSVG height={"30"} width={"30"} />
          </button>

          {showDropdown && <Dropdown toggleDropdown={toggleDropdown} />}
        </>
      )}
      {showMenuAndSearchButton && (
        <>
          <button className="menu-menu-btn nav-btn" onClick={hideMenuAndSearch}>
            Menu
          </button>

          <input
            className="menu-input"
            id="search"
            type="text"
            onKeyUp={handleSearch}
            placeholder="Search"
          />
        </>
      )}
    </nav>
  )
}