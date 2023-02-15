import './App.css'

import { useReducer } from 'react'

import { MovieList } from './components/MovieList'
import { Router, Route, Redirect, Switch } from "wouter"
import { Error404 } from './components/Error404'
import { Favorites } from './components/Favorites'
import { storeFavorites } from './stores/favorites'

const App: React.FunctionComponent = () => {
  const [stateFavorites, dispatchFavorites] = useReducer(storeFavorites.reducer, storeFavorites.initialState)
  console.log("app run")
  return (
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

            {/* <Route path="/watch-later/movieIDs=:movieIDs/:page">
              {params => <MovieList page={Number(params['page'] || "1")} movieIDs={params['movieIDs']} />}
            </Route> */}

            <Route path="/favorites/:page">
              {params => <Favorites page={Number(params['page'] || "1")} />}
            </Route>

            <Route path="/404" component={Error404} />

            <Redirect to="/404" />
          </Switch>
        </Router>
      </storeFavorites.contextDispatch.Provider>
    </storeFavorites.contextState.Provider>
  )
}

export default App