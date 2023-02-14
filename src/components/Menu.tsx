import { useCallback, useState } from "react";
import { navigate } from "wouter/use-location";
import { Dropdown } from "./Dropdown";
import { SearchSVG } from "./SearchSVG";

export const Menu: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const handleSort = useCallback(() => {
    console.log("hello");
  }, []);

  // @TODO use callback
  const handleSearch = useCallback(() => {
    // function body
  }, []);

  const handleSClick = useCallback(() => {
    setShowMenu(true);
  }, []);

  const handleMenuClick = useCallback(() => {
    setShowMenu(false);
  }, []);

  const handleBrowseClick = useCallback(() => {
    setShowDropdown(prevState => !prevState);
  }, []);

  const handleWatchLater = useCallback(() => {
    const watchLater = localStorage.getItem('watchLater')
    navigate(`/watch-later/movieIDs=${watchLater}/1`);

    console.log(watchLater);
  }, []);

  const handleFavorites = useCallback(() => {
    const favorites = localStorage.getItem('favorites')
    navigate(`/favorites/movieIDs=${favorites}/1`);
  }, []);

  return (
    <nav className="menu">
      {!showMenu && (
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
      {showMenu && (
        <>
          <button className="menu-menu-btn nav-btn" onClick={handleMenuClick}>
            Menu
          </button>

          <input
            className="menu-input"
            id="search"
            type="text"
            onChange={handleSearch}
            placeholder="Search"
          />
        </>
      )}
    </nav>
  );
};



