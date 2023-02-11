
import { ComponentMenu } from "./ComponentMenu";
import logo from '../assets/mobile-logo.png';

export const ComponentHeader: React.FunctionComponent = () => {




    return (
        <div className="header">
            <img className="frudd-flix-logo" src={logo} alt="frudd-flix logo" />
            <ComponentMenu />
        </div>
    )
}


// @TODO clicking title should take you to first page
