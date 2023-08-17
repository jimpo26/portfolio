"use client"

import './Aboutcreen.css'
import React, {useContext, useRef} from "react";
import {MouseContext} from "@/context/mouse";
import Image from "next/image";
import useMousePosition from "@/hooks/useMousePosition";

export function AboutScreen() {
    const { cursorChangeHandler } = useContext(MouseContext);
    const { x, y } = useMousePosition()
    const ref = useRef(null);
    const imageRef = useRef(null);

    if(ref.current !== null) {
        // check if the mouse is inside the element
        const offset = ref.current.getBoundingClientRect()
        const posX = x - offset.left
        const posY = y - offset.top
        const inside = (posX > 0 && posX < ref.current.offsetWidth && posY > 0 && posY < ref.current.offsetHeight)
        if(inside) {
            ref.current.animate({
                opacity: 1,
            }, {duration: 250, fill: 'forwards'})
            ref.current.style.clipPath = `circle(${100}px at ${posX}px ${posY}px)`
        }
    }

    if (imageRef.current !== null) {
        imageRef.current.style.transform = `translate(${x / 20}px, ${y / 20}px)`
    }

    return (
        <div className="about-section" id="about">
            <div className="column">
                <div className="about-screen"
                     onMouseEnter={() => cursorChangeHandler("hovered")}
                     onMouseLeave={() => cursorChangeHandler("")}
                >
                    <div className="about-subheading">I develop software</div>
                    <div className="about-subheading-hidden" ref={ref}
                         onMouseOut={() => {
                             let anim = ref.current.animate({
                                 opacity: 0,
                             }, {duration: 300, fill: 'forwards'}
                             )
                             anim.onfinish = () => {
                                    ref.current.style.removeProperty('clip-path')
                             }
                         }}
                    >I make dreams come true</div>
                </div>
                <div className="about-image">
                    <Image src="/its-a-me.png" alt="about"
                         width={256} height={144} ref={imageRef}
                         style={{
                             filter: 'opacity(0.5) sepia(1) contrast(0.8) brightness(1.2)',
                            padding: '5% 15% 0 3%'
                         }}/>
                </div>

            </div>
            <div className="column">
                <div className="about-text">
                    <p style={{opacity: '0.8'}}>
                        Hey there, I'm a passionate developer always looking for new challenges.
                        I love trying out new stuff, especially when it comes to backend and frontend development.
                        Lately, I've also gotten into UI/UX design and I'm working on improving my skills in that area.
                        <br /><br/>
                        I always keep myself updated with the latest technologies and I'm always looking for new
                        opportunities to learn and grow.
                    </p>
                </div>
            </div>
        </div>

    )
}
