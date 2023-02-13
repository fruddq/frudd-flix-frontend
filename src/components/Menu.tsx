import { useCallback, useState } from "react";
import { Dropdown } from "./Dropdown";
import { SearchSVG } from "./SearchSVG";
// import { ReactSVG } from 'react-svg';
// import ButtonSVG from "../assets/search2.svg"

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

          <button className="menu-filter-btn nav-btn" onClick={handleSort}>
            Favourites
          </button>

          <button className="menu-filter-btn nav-btn" onClick={handleSort}>
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


// export const ComponentMenu: React.FunctionComponent = () => {

//     function handleSort() {
//         console.log('hello')
//     }

//     function handleSearch() {
//     }


//     return (
//         <>
//             <nav className="menu">
//                 <button className="menu-item menu-button" onClick={() => handleSort()}>Browse</button>
//                 <button className="menu-item menu-button" onClick={() => handleSort()}>Year </button>
//                 <button className="menu-item menu-button" onClick={() => handleSort()}>Rating </button>
//                 <button className="menu-item menu-button" onClick={() => handleSort()}>Popularity </button>
//                 <button className="menu-item menu-button" onClick={() => handleSort()}>Filter </button>
//                 <button className="menu-item menu-button" onClick={() => handleSort()}>S </button>

//                 <label htmlFor="search">
//                     <input className="menu-item menu-input" id="search" type="text" onChange={handleSearch} placeholder="Search" />
//                 </label>
//             </nav>
//         </>
//     )
// }


