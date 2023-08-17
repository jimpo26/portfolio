import "./ProjectsScreen.css"
import {Parallax, ParallaxProvider} from "react-scroll-parallax";

function SlideInTitle({ children }) {

    return (
        <ParallaxProvider>
            <Parallax translateX={[0, -30]}>
                <span
                    id="projects"
                    className="title"
                >
                    {children}
                </span>
            </Parallax>
        </ParallaxProvider>
    )
}

export default SlideInTitle;
