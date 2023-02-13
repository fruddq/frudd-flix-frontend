import './App.css'
import { ComponentHome } from './components/ComponentHome'
import { Router, Route, BaseLocationHook } from "wouter";
import { useLocationProperty, navigate } from "wouter/use-location";

const hashLocation = () => window.location.hash.replace(/^#/, "") || "/";
const hashNavigate = (to: string) => navigate(`${to}`);
const useHashLocation: BaseLocationHook = () => {
  const location = useLocationProperty(hashLocation);
  return [location, hashNavigate];
};

const App: React.FunctionComponent = () => {


  return (
    <Router hook={useHashLocation}>
      <Route path="/" component={ComponentHome} />
      {/* <Route path="/page/:page" component={ComponentHome} /> */}
      <Route path="/:page" component={ComponentHome} />
    </Router>
  )
}

export default App