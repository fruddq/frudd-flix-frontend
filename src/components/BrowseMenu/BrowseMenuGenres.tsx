import { useCallback, useContext } from "react"
import { EActionBrowseMenu, storeBrowseMenu } from "../../stores/browseMenu"

// @TODO Change dropdown to relate to browse
export const BrowseMenuGenres: React.FunctionComponent = () => {
  const browseMenuData = useContext(storeBrowseMenu.contextState)
  const dispatchBrowseMenu = useContext(storeBrowseMenu.contextDispatch)

  const updateGenres = useCallback((id: number) => {
    const updatedGenres = browseMenuData.genres.map(genre => {
      if (genre.id === id) {
        return { ...genre, selected: !genre.selected }
      }
      return genre
    })

    dispatchBrowseMenu({
      type: EActionBrowseMenu.Replace,
      payload: { yearRange: { from: browseMenuData.yearRange.from, to: browseMenuData.yearRange.to }, genres: updatedGenres }
    })
  }, [browseMenuData])

  return (
    <div className="browse-genres">
      {browseMenuData.genres.map((genre) => (
        <button
          className={`button-genre ${genre.selected ? 'selected' : ''}`}
          key={genre.id}
          onClick={() => updateGenres(genre.id)}
          aria-label={genre.name}
        >
          {genre.name}
        </button>
      ))}
    </div>
  )
}

