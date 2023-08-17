"use client";

import "./style.css";
import Background from "@/components/background";
import ParallaxButton from "@/components/parallaxButton";
import HomeScreen from "@/components/HomeScreen";
import {AboutScreen} from "@/components/AboutScreen";
import Cursor from "@/components/Cursor";
import {ProjectsScreen} from "@/components/ProjectsScreen";
import React from "react";
import Lenis from '@studio-freight/lenis'
import Timeline from "@/components/timeline";
import ContactScreen from "@/components/contact";

export default function Home() {
    const ref= React.useRef<HTMLDivElement>(null);
    const [scroll, setScroll] = React.useState(0);
    React.useEffect(() => {
        if (ref.current){
            //instanciate new Lenis object, and pass ref.current as {wrapper}
            const lenis = new Lenis({
                wrapper: ref.current,
            })
            const raf = (time: any) => {
                lenis.raf(time)
                requestAnimationFrame(raf)
            }
            requestAnimationFrame(raf)

        }
        if (ref.current !== null) {
            ref.current.addEventListener("scroll", () => {
                setScroll((ref.current as HTMLDivElement).scrollTop);
            });
        }
        document.body.style.height = `${ref.current?.scrollHeight}px`;
    }, [ref.current]);
    return (
        <div style={{cursor: "none"}}>
            <Cursor />
            <Background />
            <div className="container2" ref={ref}>
                <nav className="navbar">
                    <ul className="list">
                        <li>Lorenzo</li>
                        <li><a href="#about" className="link">About</a></li>
                        <li><a href="#skills" className="link">Skills</a></li>
                        <li><a href="#projects" className="link">Projects</a></li>
                        <li>
                            <ParallaxButton />
                        </li>
                    </ul>
                </nav>
                <div className="content">
                    <HomeScreen />
                    <AboutScreen />
                    <ProjectsScreen />
                    {window.innerWidth > 768 && <Timeline x={scroll}/>}
                    <ContactScreen />
                </div>
            </div>
        </div>
    )
}
