
import { Menu } from "./Menu"
import logo from '../assets/mobile-logo.png'
import { Link } from "react-router-dom"
// import { Link } from 'wouter'

export const Header: React.FunctionComponent = () => {
    return (
        <div className="header">
            <Link to="/movies/1">  <img className="frudd-flix-logo" src={logo} alt="frudd-flix logo" /></Link>
            <Menu />
        </div>
    )
}


// @TODO clicking title should take you to first page
