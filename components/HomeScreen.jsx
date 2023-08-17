"use client"

import './HomeScreen.css'
import {useRef} from "react";

export default function HomeScreen() {
    const ref = useRef(null)

    return (
        <div className="home-screen">
            <div className="home-screen__content" ref={ref}>
                <div ><div className="home-screen__title s0">Lorenzo Dal Zotto</div></div>
                <div style={{ perspective: '30em'}} className="right"><div className="home-screen__sub s0125">web developer</div></div>
                <div style={{perspective: '20em'}}><div className="home-screen__sub pl-36 s025">& digital</div></div>
                <div style={{perspective: '10em'}} className="right"><div className="home-screen__sub right s0375">dreamweaver</div></div>
            </div>
        </div>
    )
}