"use client";

import "./background.css"
import {useEffect, useRef} from "react";
import * as d3 from 'd3';

export default function Background() {
    const ref = useRef(null)

    const colors = ['#610D33', "#652439", "#491645", "#311357", "#0E030D"]
    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    const randomFloat = (min, max) => Math.random() * (max - min) + min;

    const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

    async function animateBackground() {
        // check if browser is firefox
        if (typeof undefined !== 'undefined') {
            div.style.filter = 'blur(110px)'
        }
        else if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
            div.style.filter = 'blur(100px)'
        }
        else if (navigator.userAgent.indexOf('Chrome') !== -1 && navigator.userAgent.indexOf('Safari') !== -1) {
            div.style.filter = 'blur(110px)'
        }

        for (let i=0;i<5;i++){generateShapes(random(3,7))}
    }

    async function generateShapes(num) {
        let n = random(3,5); // number of points
        let f = randomFloat(0.5,1.5) // level of randomness
        let color = randomColor() // fill color
        const mapX = d3.scaleLinear()
            .domain([-1, 1])
            .range([100, 400])

        const mapY = d3.scaleLinear()
            .domain([-1, 1])
            .range([100, 400])

        const svg = d3.create("svg")
        const path = d3.line()
            .x(d => mapX(d.x))
            .y(d => mapY(d.y))
            .curve(d3.curveBasisClosed) // this smooth the path


        const thePath = svg.append('path')
        generatePath(n, f, color, path, thePath);
        svg.style('visibility', 'hidden')
        // add class to the svg
        svg.attr('class', 'shape')

        const res = div.appendChild(svg.node())
        await delay(20);
        let bb = res.childNodes[0].getBBox()
        res.setAttribute('viewBox', `${bb.x} ${bb.y} ${bb.width} ${bb.height}`)
        res.style.position = 'absolute'

        const coordinates = generateCoordinates();

        if(coordinates.outerStart){
            res.style.width = 3*bb.width + "px"
            res.style.height = 3*bb.height + "px"
            const animation = res.animate([
                { transform: `translate(${coordinates.left}vw, ${coordinates.top}vh) scale(1) rotate(0deg)` },
                { transform: `translate(${coordinates.oppositeLeft}vw, ${coordinates.oppositeTop}vh) scale(0.9) rotate(324deg)`, offset: 0.9 },
                { transform: `translate(${coordinates.oppositeLeft}vw, ${coordinates.oppositeTop}vh) scale(0) rotate(360deg)` }
            ], {
                duration: random(10000, 20000),
                easing: 'ease-in-out'
            })
            animation.onfinish = () => {
                res.remove()
                return generateShapes(1)
            }
            //num++;
        } else {
            res.style.top = `${coordinates.top}%`
            res.style.left = `${coordinates.left}%`
            res.style.width = 3*bb.width + "px"
            res.style.height = 3*bb.height + "px"
            const animation = res.animate([
                { transform: `scale(1)` },
                { transform: `scale(0)` }
            ], {
                duration: 20000,
            })
            animation.onfinish = () => {
                res.remove()
                return generateShapes(1)
            }
        }
        res.style.visibility = 'visible'
    }

    function generatePath(n, f, color, path, thePath) {
        // this is the core part, we create a dataset of points
        const data = d3.range(n).map((d,i) => {
            const w = Math.PI * 2 / n
            const a = w * i
            const x = Math.cos(a) + (Math.random()*f - (f/2))
            const y = Math.sin(a) + (Math.random()*f - (f/2))
            return {x, y}
        })

        // update the path
        thePath.transition()
            .attr('d', path(data))
            .style('fill', color)
    }

    function generateCoordinates() {
        const vw = 150, vh = 200;
        const place = random(0,4)
        /*
        * 0: top
        * 1: right
        * 2: bottom
        * 3: left
        * 4: in-screen
        */
        switch(place){
            case 0:
                let top0 = random((100 - vh) / 2, 0)
                let left0 = random(0, 100)
                return {
                    top: top0,
                    left: left0,
                    right: 0,
                    bottom: 0,
                    oppositeTop: 100 - top0,
                    oppositeLeft: left0,
                    outerStart: true
                }
            case 1:
                let top1 = random(0, 100)
                let left1 = random(100, (vw + 100) / 2)
                return {
                    top: top1,
                    left: left1,
                    right: 0,
                    bottom: 0,
                    oppositeTop: top1,
                    oppositeLeft: 100 - left1,
                    outerStart: true
                }
            case 2:
                let top2 = random(100, (vh + 100) / 2)
                let left2 = random(0, 100)
                return {
                    top: top2,
                    left: left2,
                    right: 0,
                    bottom: 0,
                    oppositeTop: 100 - top2,
                    oppositeLeft: left2,
                    outerStart: true
                }
            case 3:
                let top3 = random(0, 100)
                let left3 = random((100 - vw) / 2, 0)
                return {
                    top: top3,
                    left: left3,
                    right: 0,
                    bottom: 0,
                    oppositeTop: top3,
                    oppositeLeft: 100 - left3,
                    outerStart: true
                }
            default:
                return {
                    top: random(0, 100),
                    left: random(0, 100),
                    oppositeTop: 0,
                    oppositeLeft: 0,
                    right: 0,
                    bottom: 0,
                    outerStart: false
                }

        }
    }
    let div = null;
    useEffect(() => {
        if (ref.current !== null){

            div = ref.current
            // if device is mobile, don't animate
            if (window.innerWidth < 768) return
            animateBackground()
        }
    }, [ref])

    return (
        <div className="inner" ref={ref}></div>
    )
}