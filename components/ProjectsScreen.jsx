"use client"

import './ProjectsScreen.css'
import Project from "@/components/Project";
import SlideInTitle from "@/components/SlideInTitle";
import {Parallax, ParallaxBanner, ParallaxProvider} from "react-scroll-parallax";
import Image from "next/image";

export function ProjectsScreen() {
    const images = [[
            {
                link: "/nowprice.png",
                title: "A new way to buy items online",
                scale: [0.6, 1.3],
                translateX: [80,-30],
                translateY: [0, 0],
            },
            {
                link: "/nowprice2.png",
                title: "A new way to buy items online",
                scale: [0, 0],
                translateX: [-20,-5],
                translateY: [0, 10]
            },
            {
                link: "/nowprice3.png",
                title: "A new way to buy items online",
                scale: [0, 0],
                translateX: [0, 0],
                translateY: [0, 0]
            },
        ], [
            {
                link: "/aurora.jpeg",
                title: "Blazingly fast Amazon Price Tracker",
                scale: [0, 0],
                translateX: [-20,-5],
                translateY: [0, 0]
            }
        ], [
            {
                link: "/portfolio.png",
                title: "Building my dream portfolio website",
                scale: [1.5,1],
                translateX: [50,0],
                translateY: [0, 0],
            }, {
                link: "/portfolio2.png",
                title: "Building my dream portfolio website",
                scale: [0, 0],
                translateX: [0, 50],
                translateY: [0, 0]
            }
        ]
    ]
    return (
        <div className="projects-section">
            <SlideInTitle>PersonalProjects</SlideInTitle>
            <ParallaxProvider>
                <Project title="A new way to buy items online" description={<div className={"desc1"}><span>I&apos;m currently building NowPrice, my startup. It offers a new way to buy items online. Thanks to my efficient price tracking scripts, you can buy items at the lowest price possible. You can find more information on the website</span></div>}
                     link={"/blog/nowprice"}
                     images={[
                         <Parallax translateX={images[0][0].translateX} translateY={images[0][0].translateY} scale={images[0][0].scale} key={0}>
                             <Image src={images[0][0].link} alt={images[0][0].title}
                                    width={700}
                                    height={700}
                             />
                         </Parallax>,
                         <Parallax translateX={images[0][1].translateX} translateY={images[0][1].translateY} key={1}>
                             <Image src={images[0][1].link} alt={images[0][1].title}
                                    width={700}
                                    height={700}
                             />
                         </Parallax>,
                         <ParallaxBanner layers={[{image: images[0][2].link, speed: -15}]} key={2}
                                         style={{width: "400px", height: "300px",
                             marginLeft: "auto", marginRight: "10%", alignSelf: "flex-end"}}/>
                     ]}
                />
                <Project title="Blazingly fast Amazon Price Tracker" description={<div className={"desc2"}><span>This is by far the project in where I spent more time. I&apos;m really proud of Aurora, and i keep it updated to keep it as fast as possible. If you want to check out how i built this, you can click here to read the full article on my blog</span></div>}
                    link={"/blog/aurora"}
                    images={[
                        <ParallaxBanner layers={[{image: "/aurora.jpeg", speed: -10}]}
                                        style={auroraStyle} key={0}
                        />

                    ]}
                />
                <Project title="Building my dream portfolio website" description={<div className={"desc3"}><span>It has been really hard to build this portfolio website. If you are interested in seeing the entire thinking and building process, you can click here and read the article on my blog</span></div>}
                    link={"/blog/portfolio"} bottom={false}
                     images={[
                         <Parallax translateX={images[2][0].translateX} translateY={images[2][0].translateY} scale={images[2][0].scale} key={0}>
                             <Image src={images[2][0].link} alt={images[2][0].title}
                                    width={700}
                                    height={700}
                             />
                         </Parallax>,
                         <Parallax translateX={images[2][1].translateX} translateY={images[2][1].translateY} key={1}>
                             <Image src={images[2][1].link} alt={images[2][1].title}
                                    width={700}
                                    height={700}
                             />
                            </Parallax>,
                    ]}
                />
            </ParallaxProvider>
        </div>
    )
}


const auroraStyle = window.innerWidth > 1024 ? {
    width: "550px", height: "366px",borderRadius: "20px"
} : window.innerWidth > 768 ? {
    width: "400px", height: "266px",borderRadius: "20px"
} : window.innerWidth > 425 ? {
    width: "300px", height: "200px",borderRadius: "20px"
} : {width: "100%", height: "200px",borderRadius: "20px"}