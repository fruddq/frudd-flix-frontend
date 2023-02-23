
import { Link } from "react-router-dom"

import { MenuBar } from "./MenuBar"

import logo from '../assets/mobile-logo-test.png'

export const Header: React.FunctionComponent = () =>
(
  <div className="header">
    <Link to="/movies/1">  <img className="frudd-flix-logo" src={logo} alt="frudd-flix logo" /></Link>
    <MenuBar />
  </div>
)

