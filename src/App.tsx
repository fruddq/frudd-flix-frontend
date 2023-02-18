import './App.css'

import { useReducer } from 'react'

import { MovieList } from './components/MovieList'
import { Router, Route, Redirect, Switch } from "wouter"
import { Error404 } from './components/Error404'
import { Favorites } from './components/Favorites'
import { storeFavorites } from './stores/favorites'
import { storeWatchLater } from './stores/watchLater'
import { WatchLater } from './components/WatchLater'
import { Browse } from './components/Browse'
import { storeDropdown } from './stores/dropdown'

// http://localhost:5173/browse/?from=100&to=200&genres=action-comedy

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
                <Router>
                  <Switch>
                    <Route path="/">
                      <Redirect to="/movies/1" />
                    </Route>

                    <Route path="/movies/:page">
                      {params => <MovieList page={Number(params['page'] || "1")} />}
                    </Route>

                    <Route path="/favorites/:page">
                      {params => <Favorites page={Number(params['page'] || "1")} />}
                    </Route>

                    <Route path="/watch-later/:page">
                      {params => <WatchLater page={Number(params['page'] || "1")} />}
                    </Route>

                    <Route path="/search/:query/:page">
                      {params => <MovieList page={Number(params['page'] || "1")} query={params['query'] || ""} />}
                    </Route>

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

                    <Route path="/browse/from=:from/to=:to/genres=:genres/:page">
                      {params => <Browse page={Number(params['page'] || "1")} from={Number(params['from'] || "1950")} to={Number(params['to'] || "2023")} genres={params['genres'] || ""} />}
                    </Route>

                    <Route path="/404" component={Error404} />

                    <Redirect to="/404" />
                  </Switch>
                </Router>

              </storeFavorites.contextDispatch.Provider>
            </storeFavorites.contextState.Provider>
          </storeWatchLater.contextDispatch.Provider>
        </storeWatchLater.contextState.Provider>
      </storeDropdown.contextDispatch.Provider>
    </storeDropdown.contextState.Provider>

  )
}

export default App
