"use client";

import "./parallaxButton.css"
import Image from "next/image";
import React, {useEffect} from "react";
import Link from "next/link";

export default function ParallaxButton() {
    const ref = React.useRef(null);

    // @ts-ignore
    const translate = (innerTarget, innerEffect, innerEvent) => {
        let delta = parseInt(innerEffect.delta)
        let deltaX = ((2 * delta) / innerTarget.targetInfo.width) * (innerTarget.targetInfo.left + innerTarget.targetInfo.width / 2 - innerEvent.clientX)
        let deltaY = ((2 * delta) / innerTarget.targetInfo.height) * (innerTarget.targetInfo.top + innerTarget.targetInfo.height / 2 - innerEvent.clientY);

        if (innerEffect.direction && innerEffect.direction === 'follow') {
            deltaX *= -1
            deltaY *= -1
        }
        innerEffect.element.style.transform = "translateX(" + deltaX + "px) translateY(" + deltaY + "px)";
    };

    // @ts-ignore
    function handleParallax(target, effect, event) {
        let effectType = "parallax";
        if (effectType === "parallax") {
            translate(target, effect, event)
        }
    }

    // @ts-ignore
    function CursorFx(options) {
        this.target = options.target;
        this.objects = options.objects;
        this.animating = false;
        this.animatingId = false;

        this.target.addEventListener("mousemove", (event) => {
            if (!this.animating){
                this.animating = true;
                this.animatingId = window.requestAnimationFrame(() => {
                        this.targetInfo = this.target.getBoundingClientRect();
                        for (let i = 0; i < this.objects.length; i++) {
                            handleParallax(this, this.objects[i], event);
                        }
                        this.animating = false;
                    }
                );}
        });
            this.target.addEventListener("mouseleave", () => {
                if(this.animatingId){
                    window.cancelAnimationFrame(this.animatingId);
                    this.animatingId = false;
                    this.animating = false;
                }
            });
    }
    const btn = function (element) {
        this.element = element;
        this.bgImg = this.element.getElementsByClassName("js-parallax-btn__bg-img");
        this.translateDelta = parseInt(getComputedStyle(this.element).getPropertyValue("--parallax-btn-cursor-fx-delta")) || 20;

        if(this.bgImg.length > 1){
            console.warn("Parallax button component: only one image allowed");
            return
        }
        // @ts-ignore
        new CursorFx({
            target: this.element,
            objects: [
                {
                    element: this.bgImg[0],
                    effect: "parallax",
                    delta: this.translateDelta,
                },
            ],
        });
    };

    let parallaxBtn = ref;
    useEffect(() => {
        if (parallaxBtn.current !== null) {
            new btn(parallaxBtn.current)
        }
    }, [parallaxBtn]);


    return (
        <Link href={"/blog"} style={{cursor: "none"}}>
            <div className="container1">

                <button className="parallax-btn text-md js-parallax-btn" ref={ref}>
                    <span className="parallax-btn__content">Blog</span>
                    <div className="parallax-btn__bg js-parallax-btn__bg">
                        <div className="parallax-btn__bg-front"></div>
                        <div className="parallax-btn__bg-back">
                            <Image width={1200} height={1200} className="parallax-btn__bg-img js-parallax-btn__bg-img"
                                 src="/universe.jpg"
                                 alt="Blog" />
                        </div>
                    </div>
                </button>
            </div>
        </Link>
    )
}