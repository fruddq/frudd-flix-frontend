import { useState } from "react";

export const ComponentMenu = () => {
    const [showMenu, setShowMenu] = useState(false);

    const handleSort = () => {
        console.log("hello");
    };

    const handleSearch = () => { };

    const handleSubmit = () => { };

    const handleSClick = () => {
        setShowMenu(true);
    };

    const handleMenuClick = () => {
        setShowMenu(false);
    };

    return (
        <nav className="menu">
            {!showMenu && (
                <>
                    <button className="menu-item menu-button" onClick={handleSort}>
                        Browse
                    </button>
                    <button className="menu-item menu-button" onClick={handleSort}>
                        Year
                    </button>
                    <button className="menu-item menu-button" onClick={handleSort}>
                        Rating
                    </button>
                    <button className="menu-item menu-button" onClick={handleSort}>
                        Popularity
                    </button>
                    <button className="menu-item menu-button" onClick={handleSort}>
                        Filter
                    </button>
                    {!showMenu && (
                        <button className="menu-item menu-button" onClick={handleSClick}>
                            S
                        </button>
                    )}
                </>
            )}
            {showMenu && (
                <>
                    <button className="menu-item menu-button" onClick={handleMenuClick}>
                        Menu
                    </button>
                    <form
                        className="menu-item menu-form"
                        onSubmit={handleSubmit}
                    >
                        <input
                            className="menu-item menu-input"
                            id="search"
                            type="text"
                            onChange={handleSearch}
                            placeholder="Search"
                        />
                        <button type="submit">Submit</button>
                    </form>
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


