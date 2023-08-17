import "./Project.css"
import React, {useContext} from "react";
import {MouseContext} from "@/context/mouse";
import Link from "next/link";


export default function Project({ title, description, images, link, bottom = true }) {
    const { cursorChangeHandler } = useContext(MouseContext);

    return (
        <Link href={link}>
        <div className="outerContainer" style={{marginBottom: !bottom ? "0" : "50vh"}}
             onMouseEnter={() => cursorChangeHandler("hovered1")}
             onMouseLeave={() => cursorChangeHandler("")}
        >
            <div className="project">
                <div className="column1 text-container">
                    <div className="project-title">
                        {title}
                    </div>
                    <div className="project-description">
                        {description}
                    </div>
                </div>
                <div className="column1">
                        {images[0]}
                </div>
            </div>
            <div className="images-container">
                    {images.slice(1).map((jsxElement, index) => (
                        <React.Fragment key={index}>{jsxElement}</React.Fragment>
                    ))}
            </div>
        </div>
        </Link>
    )

}