import { useState } from "react";
import { ComponentDropdown } from "./ComponentDropdown";
import { ComponentSearchSVG } from "./ComponentSearchSVG";
// import { ReactSVG } from 'react-svg';
// import ButtonSVG from "../assets/search2.svg"

export const ComponentMenu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const handleSort = () => {
        console.log("hello");
    };

    const handleSearch = () => { };

    // const handleSubmit = () => { };

    const handleSClick = () => {
        setShowMenu(true);
    };

    const handleMenuClick = () => {
        setShowMenu(false);
    };

    const handleBrowseClick = () => {
        setShowDropdown(!showDropdown); // update state variable for dropdown visibility
    }
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
                    <button className="menu-popularity-btn nav-btn" onClick={handleSort}>
                        Popularity
                    </button>
                    <button className="menu-filter-btn nav-btn" onClick={handleSort}>
                        Filter
                    </button>

                    <button className="menu-search-btn nav-btn" onClick={handleSClick}>
                        <ComponentSearchSVG height={"30"} width={"30"} />
                    </button>

                    {showDropdown && <ComponentDropdown />}
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


