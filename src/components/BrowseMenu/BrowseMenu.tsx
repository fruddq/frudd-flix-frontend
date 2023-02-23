import { useCallback, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { storeBrowseMenu } from "../../stores/browseMenu"
import { BrowseMenuGenres } from "./BrowseMenuGenres"
import { BrowseMenuSlider } from "./BrowseMenuSlider"

// @TODO Change dropdown to relate to browse
export const BrowseMenu: React.FunctionComponent<{
  readonly toggleDropdown: () => void
  readonly isSticky: boolean
}> = ({ toggleDropdown, isSticky }) => {
  const browseMenuData = useContext(storeBrowseMenu.contextState)

  const navigate = useNavigate()

  const findMovies = useCallback(() => {
    const selectedGenreNames = browseMenuData.genres
      .filter(genre => genre.selected)
      .map(genre => genre.name)
      .join('-')

    navigate(`/browse?from=${browseMenuData.yearRange.from}&to=${browseMenuData.yearRange.to}&genres=${selectedGenreNames}&page=1`)

    toggleDropdown()
  }, [toggleDropdown, navigate, browseMenuData])

  return (
    <div className={`browse-menu ${isSticky ? 'browse-menu-sticky' : ''}`}  >

      <BrowseMenuSlider />

      <BrowseMenuGenres />

      <button className="menu-filter-btn" onClick={findMovies}>
        Find Movies
      </button>
    </div>
  )
}

