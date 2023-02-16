import './App.css'

import { useReducer } from 'react'

import { MovieList } from './components/MovieList'
import { Router, Route, Redirect, Switch } from "wouter"
import { Error404 } from './components/Error404'
import { Favorites } from './components/Favorites'
import { storeFavorites } from './stores/favorites'
import { storeWatchLater } from './stores/watchLater'
import { WatchLater } from './components/WatchLater'

const App: React.FunctionComponent = () => {
  const [stateFavorites, dispatchFavorites] = useReducer(storeFavorites.reducer, storeFavorites.initialState)
  const [stateWatchLater, dispatchWatchLater] = useReducer(storeWatchLater.reducer, storeWatchLater.initialState)

  return (
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


                <Route path="/404" component={Error404} />

                <Redirect to="/404" />
              </Switch>
            </Router>
          </storeFavorites.contextDispatch.Provider>
        </storeFavorites.contextState.Provider>
      </storeWatchLater.contextDispatch.Provider>
    </storeWatchLater.contextState.Provider>

  )
}

export default App