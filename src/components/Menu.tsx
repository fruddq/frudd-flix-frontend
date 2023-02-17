import { useCallback, useState } from "react"
import { navigate } from "wouter/use-location"
import { Dropdown } from "./Dropdown"
import { SearchSVG } from "./SearchSVG"

export const Menu: React.FC = () => {
  const [showMenuButton, setShowMenu] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const handleSort = useCallback(() => {
    console.log("hello")
  }, [])

  const handleSearch = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "Go" || event.key === "Search") {
      navigate(`/search/${event.currentTarget.value}/1`)
      return null
    }
  }, [])

  const handleSClick = useCallback(() => {
    setShowMenu(true)
  }, [])

  const handleMenuClick = useCallback(() => {
    setShowMenu(false)
  }, [])

  const handleBrowseClick = useCallback(() => {
    setShowDropdown((prevState) => !prevState)
  }, [])

  const handleWatchLater = useCallback(() => {
    navigate("/watch-later/1")
    return null
  }, [])

  const handleFavorites = useCallback(() => {
    navigate("/favorites/1")
    return null
  }, [])

  return (
    <nav className="menu">
      {!showMenuButton && (
        <>
          <button className="menu-browse-btn nav-btn" onClick={handleBrowseClick}>
            Browse
          </button>

          <button className="menu-year-btn nav-btn" onClick={handleSort}>
            Year
          </button>

          <button className="menu-rating-btn nav-btn" onClick={handleSort}>
            Rating
          </button>

          <button className="menu-filter-btn nav-btn" onClick={handleFavorites}>
            Favorites
          </button>

          <button className="menu-filter-btn nav-btn" onClick={handleWatchLater}>
            Watch later
          </button>

          <button className="menu-search-btn nav-btn" onClick={handleSClick}>
            <SearchSVG height={"30"} width={"30"} />
          </button>

          {showDropdown && <Dropdown />}
        </>
      )}
      {showMenuButton && (
        <>
          <button className="menu-menu-btn nav-btn" onClick={handleMenuClick}>
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