import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BrowseMenu } from "./BrowseMenu"
import { SearchSVG } from "./SearchSVG"

// @TODO fix sort functions
export const MenuBar: React.FC = () => {
  const navigate = useNavigate()

  const searchMovies = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "Go" || event.key === "Search") {
      navigate(`/search/${event.currentTarget.value}/1`)
    }
  }, [navigate])

  const [showMenuAndSearchButton, setShowMenuAndSearch] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

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

  const [isSticky, setIsSticky] = useState(false)
  const stickyPosition = 100 // set the position value where the menu should become sticky

  useEffect(() => {
    const makeMenuSticky = () => {
      const scrollPosition = window.scrollY
      setIsSticky(scrollPosition >= stickyPosition)
    }

    window.addEventListener('scroll', makeMenuSticky)

    return () => {
      window.removeEventListener('scroll', makeMenuSticky)
    }
  }, [stickyPosition])


  return (
    <nav className={`menu ${isSticky ? 'menu-sticky' : ''}`}>
      {!showMenuAndSearchButton && (
        <>
          <button className={`nav-btn ${isSticky ? 'nav-btn-sticky' : ''} ${showDropdown ? 'browse-btn-active' : ''}`} onClick={toggleDropdown}>
            Browse
          </button>

          <button className={`nav-btn ${isSticky ? 'nav-btn-sticky' : ''}`} onClick={navigateToFavorites}>
            Favorites
          </button>

          <button className={`nav-btn ${isSticky ? 'nav-btn-sticky' : ''}`} onClick={navigateToWatchLater}>
            Watch later
          </button>

          <button className={`nav-btn ${isSticky ? 'nav-btn-sticky' : ''}`} onClick={showMenuAndSearch}>
            <SearchSVG height={"30"} width={"30"} />
          </button>

          {showDropdown && <BrowseMenu toggleDropdown={toggleDropdown} isSticky={isSticky} />}
        </>
      )}
      {showMenuAndSearchButton && (
        <>
          <button className={`menu-menu-btn nav-btn ${isSticky ? 'nav-btn-sticky' : ''}`} onClick={hideMenuAndSearch}>
            Menu
          </button>

          <input
            className="menu-input"
            id="search"
            type="text"
            onKeyUp={searchMovies}
            placeholder="Search"
          />
        </>
      )}
    </nav>
  )
}