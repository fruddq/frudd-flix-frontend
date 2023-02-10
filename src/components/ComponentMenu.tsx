import { useState } from "react";


export const ComponentMenu: React.FunctionComponent = () => {
    const [showSearch, setShowSearch] = useState(false);

    function handleSort() {
        console.log('hello')
    }

    function handleSearch() {
    }

    function handleSubmit() {
    }

    return (
        <>
            <nav className="menu">
                {!showSearch && (
                    <>
                        <button
                            className="menu-item menu-button"
                            onClick={handleSort}
                        >
                            Browse
                        </button>
                        <button
                            className="menu-item menu-button"
                            onClick={handleSort}
                        >
                            Year{" "}
                        </button>
                        <button
                            className="menu-item menu-button"
                            onClick={handleSort}
                        >
                            Rating{" "}
                        </button>
                        <button
                            className="menu-item menu-button"
                            onClick={handleSort}
                        >
                            Popularity{" "}
                        </button>
                        <button
                            className="menu-item menu-button"
                            onClick={handleSort}
                        >
                            Filter{" "}
                        </button>
                        <button
                            className="menu-item menu-button"
                            onClick={() => setShowSearch(true)}
                        >
                            S
                        </button>
                    </>
                )}
                {showSearch && (
                    <form
                        className="menu-item menu-form"
                        onSubmit={handleSubmit}
                        onBlur={() => setShowSearch(false)}
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
                )}
            </nav>
        </>
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


