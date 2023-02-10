export const ComponentMenu: React.FunctionComponent = () => {

    function handleSort() {
        console.log('hello')
    }

    function handleSearch() {
    }

    return (
        <>
            <nav className="menu">
                <button className="menu-item menu-button" disabled onClick={() => handleSort()}>Discover</button>
                <button className="menu-item menu-button" onClick={() => handleSort()}>Popularity</button>
                <button className="menu-item menu-button" onClick={() => handleSort()}>Year</button>
                <label htmlFor="search">
                    <input className="menu-item menu-input" id="search" type="text" onChange={handleSearch} placeholder="Search" />
                </label>
            </nav>
        </>
    )
}


{/* <input id="search" type="text" value={searchValue} onChange={handleSearch} /> */ }
