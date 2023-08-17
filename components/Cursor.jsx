import "./cursor.css"
import useMousePosition from "../hooks/useMousePosition";
import React, {useContext, useRef} from "react";
import {MouseContext} from "@/context/mouse";

const Cursor = () => {
    const { x, y } = useMousePosition();
    const { cursorType } = useContext(MouseContext);
    const cursorRef = useRef(null);
    const innerCursor = useRef(null);

    if(innerCursor.current !== null) {
        innerCursor.current.animate({
            left: x + 'px',
            top: y + 'px'
        }, {duration: 250, fill: 'forwards'})

    }

    if (cursorRef.current !== null) {
        cursorRef.current.animate({
            left: x + 'px',
            top: y + 'px'
        }, {duration: 500, fill: 'forwards'})

        if (cursorType.includes("hovered")) {
            cursorRef.current.animate({
                width: '200px',
                height: '200px',
            }, {duration: 500, fill: 'forwards'})
        } else {
            if(cursorRef.current.offsetTop > 30){
                cursorRef.current.animate({
                    width: '30px',
                    height: '30px',
                }, {duration: 500, fill: 'forwards'})
            }
        }
    }



    return (
        <div>
            <div className={"innerCursor " + cursorType} ref={innerCursor}></div>
            <div className={"cursor"} ref={cursorRef}></div>
        </div>
    )
}

export default Cursor;