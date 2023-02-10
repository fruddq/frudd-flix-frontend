import { ComponentMovies } from "./ComponentMovies";
import { ComponentHeader } from "./ComponentHeader";
import { ComponentFooter } from "./ComponentFooter";


export const ComponentHome: React.FunctionComponent = () => {


    // @TODO add a button that takes user to top of page in mobile view

    return (
        <>
            <ComponentHeader />
            <ComponentMovies />
            <ComponentFooter />
        </>
    )
}



