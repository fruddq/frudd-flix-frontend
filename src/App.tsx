import './App.css'
import { MovieList } from './components/MovieList'
import { Router, Route, Redirect, Switch } from "wouter";
import { Error404 } from './components/Error404';

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Redirect to="/movies/1" />
        </Route>

        <Route path="/movies/:page">
          {params => <MovieList page={Number(params['page'] || "1")} />}
        </Route>

        <Route path="/404" component={Error404} />

        <Redirect to="/404" />
      </Switch>
    </Router>
  )
}

export default App