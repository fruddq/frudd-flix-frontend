import './App.css'

import { useReducer } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import { Home } from './routes/Home'
import { Movies } from './routes/Movies'
import { storeFavorites } from './stores/favorites'
import { storeWatchLater } from './stores/watchLater'
import { storeBrowseMenu } from './stores/browseMenu'
import { Favorites } from './routes/Favorites'
import { WatchLater } from './routes/WatchLater'
import { Search } from './routes/Search'
import { Error404 } from './components/Error404'
import { Browse } from './routes/Browse'
import { Global } from './components/global'
import { GlobalContext, GlobalDispatchContext, GlobalInitialState, GlobalReducer } from './stores/global'

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/movies/:page",
    element: <Movies />,
  },
  {
    path: "/favorites/:page",
    element: <Favorites />,
  },
  {
    path: "/watch-later/:page",
    element: <WatchLater />,
  },
  {
    path: "/search/:query/:page",
    element: <Search />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/*",
    element: <Error404 />,
  },
])

const App: React.FunctionComponent = () => {
  const [stateFavorites, dispatchFavorites] = useReducer(storeFavorites.reducer, storeFavorites.initialState)
  const [stateWatchLater, dispatchWatchLater] = useReducer(storeWatchLater.reducer, storeWatchLater.initialState)
  const [stateDropdown, dispatchDropdown] = useReducer(storeBrowseMenu.reducer, storeBrowseMenu.initialState)
  const [stateGlobal, dispatchGlobal] = useReducer(GlobalReducer, GlobalInitialState)

  return (
    <GlobalContext.Provider value={stateGlobal}>
      <GlobalDispatchContext.Provider value={dispatchGlobal}>
        <storeBrowseMenu.contextState.Provider value={stateDropdown}>
          <storeBrowseMenu.contextDispatch.Provider value={dispatchDropdown}>
            <storeWatchLater.contextState.Provider value={stateWatchLater}>
              <storeWatchLater.contextDispatch.Provider value={dispatchWatchLater}>
                <storeFavorites.contextState.Provider value={stateFavorites}>
                  <storeFavorites.contextDispatch.Provider value={dispatchFavorites}>
                    <RouterProvider router={Router} />
                    <Global />
                  </storeFavorites.contextDispatch.Provider>
                </storeFavorites.contextState.Provider>
              </storeWatchLater.contextDispatch.Provider>
            </storeWatchLater.contextState.Provider>
          </storeBrowseMenu.contextDispatch.Provider>
        </storeBrowseMenu.contextState.Provider>
      </GlobalDispatchContext.Provider>
    </GlobalContext.Provider>
  )
}

export default App
