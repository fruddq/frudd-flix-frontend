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
import { storeDropdown } from './stores/dropdown'
import { Favorites } from './routes/Favorites'
import { WatchLater } from './routes/WatchLater'
import { Search } from './routes/Search'
import { Error404 } from './components/Error404'

const router = createBrowserRouter([
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
    path: "/*",
    element: <Error404 />,
  },
])

const App: React.FunctionComponent = () => {
  const [stateFavorites, dispatchFavorites] = useReducer(storeFavorites.reducer, storeFavorites.initialState)
  const [stateWatchLater, dispatchWatchLater] = useReducer(storeWatchLater.reducer, storeWatchLater.initialState)
  const [stateDropdown, dispatchDropdown] = useReducer(storeDropdown.reducer, storeDropdown.initialState)

  return (
    <storeDropdown.contextState.Provider value={stateDropdown}>
      <storeDropdown.contextDispatch.Provider value={dispatchDropdown}>
        <storeWatchLater.contextState.Provider value={stateWatchLater}>
          <storeWatchLater.contextDispatch.Provider value={dispatchWatchLater}>
            <storeFavorites.contextState.Provider value={stateFavorites}>
              <storeFavorites.contextDispatch.Provider value={dispatchFavorites}>
                <RouterProvider router={router} />
                {/* <Route path="/browse">
                      {() => {
                        const params = new URLSearchParams(location.search)
                        return (
                          <Browse
                            from={Number(params.get('from') || '0')}
                            to={Number(params.get('to') || '0')}
                            genres={params.get('genres') || ''}
                            page={Number(params.get('page') || '1')}
                          />
                        )
                      }}
                    </Route> */}
                {/*Wouter prevents normal search params  */}

                {/* <Route path="/browse/from=:from/to=:to/genres=:genres/:page">
                      {params => <Browse page={Number(params['page'] || "1")} from={Number(params['from'] || "1950")} to={Number(params['to'] || "2023")} genres={params['genres'] || ""} />}
                    </Route>

                    <Route path="/404" component={Error404} />

                    <Redirect to="/404" />
                  </Switch>
                </Router> */}

              </storeFavorites.contextDispatch.Provider>
            </storeFavorites.contextState.Provider>
          </storeWatchLater.contextDispatch.Provider>
        </storeWatchLater.contextState.Provider>
      </storeDropdown.contextDispatch.Provider>
    </storeDropdown.contextState.Provider>

  )
}

export default App
