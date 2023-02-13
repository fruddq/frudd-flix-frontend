
import { ComponentMenu } from "./ComponentMenu";
import logo from '../assets/mobile-logo.png';
import { Link } from 'wouter'
// import { ComponentMobileLogoSVG } from "./ComponentMobileLogoSVG";
// import { ComponentLogoSVG } from "./ComponentLogoSVG";

export const ComponentHeader: React.FunctionComponent = () => {
    return (
        <div className="header">
            <Link href="/"> <img className="frudd-flix-logo" src={logo} alt="frudd-flix logo" /></Link>
            <ComponentMenu />
        </div>
    )
}


// @TODO clicking title should take you to first page
