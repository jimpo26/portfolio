import "./timeline.css"
import {useEffect, useRef, useState} from "react";

export default function Timeline({x}) {
    const svgRef = useRef(null);
    const pathRef = useRef(null);
    const visibleSvgRef = useRef(null);
    const containerRef = useRef(null);

    const circles = [useRef(null), useRef(null), useRef(null), useRef(null)]
    const circlesText = [useRef(null), useRef(null), useRef(null), useRef(null)]

    let dashoffset = 0;
    const [visible, setVisible] = useState(false);
    const [startingSvg, setStartingSvg] = useState(0);
    const [textVisible, setTextVisible] = useState(false);
    const [startingText, setStartingText] = useState(0);

    // use intersection observer to check if the svg is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target.id !== "container" && entry.isIntersecting) {
                setVisible(true)
                observer.unobserve(entry.target);
            } else if(entry.target.id === "container" && entry.isIntersecting) {
                setTextVisible(true)
                observer.unobserve(entry.target);
            }
    })}, {threshold: 0.1})

    if(pathRef.current !== null && containerRef.current !== null){
        let pathLen = pathRef.current.getTotalLength();
        if(visible && startingSvg === 0) setStartingSvg(x);
        if(textVisible && startingText === 0) setStartingText(x);
        if(startingSvg !== 0 && x !== startingSvg) {
            // get height of the svg
            let height = svgRef.current.querySelector("use").getBoundingClientRect().height;
            // get screen width
            let width = window.innerWidth;
            let baseLog = 3.6
            if(width > 468 && width < 768) {
                baseLog = 3.5
            } else if(width > 768 && width < 1024) {
                baseLog = 3.55
            } else if(width < 468) {
                baseLog = 2
            }
            let n = Math.log(x) / Math.log(baseLog);
            // take only decimal part of the log

            n -= Math.floor(n);
            if(n<0.3) n += 1;
            let done = pathLen - (((x-startingSvg) * pathLen) / height) * n;

            if (done < 170.4) {
                circles[0].current.style.opacity = 1;
                circlesText[0].current.style.opacity = 1;
            } else if(Math.floor(done) === 171) {
                // get pixels from dashoffset
                console.log(x - startingText)
                circlesText[0].current.style.top =  x-startingText + "px"//height * (pathLen - done) / (pathLen * n) +624/2+circlesText[0].current.getBoundingClientRect().height/2 + "px";
            }
            else {
                circles[0].current.style.opacity = 0;
                circlesText[0].current.style.opacity = 0;
            }

            if(done < 118) {
                circles[1].current.style.opacity = 1;
                circlesText[1].current.style.opacity = 1;
            } else if(Math.floor(done) === 119) {
                console.log(x-startingSvg)
                circlesText[1].current.style.top = x-startingText - circlesText[0].current.getBoundingClientRect().height+ "px"//height * (pathLen - done) / (pathLen * n) + 624/2 + circlesText[1].current.getBoundingClientRect().height/2 + "px";
            } else {
                circles[1].current.style.opacity = 0;
                circlesText[1].current.style.opacity = 0;
            }

            if(done < 63) {
                circles[2].current.style.opacity = 1;
                circlesText[2].current.style.opacity = 1;
            } else if(Math.floor(done) === 64) {
                console.log(height * (pathLen - done) / (pathLen * n))
                circlesText[2].current.style.top = x-startingText - circlesText[0].current.getBoundingClientRect().height - circlesText[1].current.getBoundingClientRect().height + "px"
            } else {
                circles[2].current.style.opacity = 0;
                circlesText[2].current.style.opacity = 0;
            }

            if(done < 16.4) {
                circles[3].current.style.opacity = 1;
                circlesText[3].current.style.opacity = 1;
            } else if(Math.floor(done) === 17) {
                circlesText[3].current.style.top = x-startingText - circlesText[0].current.getBoundingClientRect().height - circlesText[1].current.getBoundingClientRect().height - circlesText[2].current.getBoundingClientRect().height + "px"
            } else {
                circles[3].current.style.opacity = 0;
                circlesText[3].current.style.opacity = 0;
            }


/*            if(done > 164.1 && done < 170.1)
                done = 164.1 - (170.1 - done);
            else if(done < 164.1)
                done = done - 6;

            if(done > 118 && done < 112)
                done = 118 - (112 - done);
            else if(done < 118)
                done = done - 6;

            if(done > 57 && done < 63)
                done = 57 - (63 - done);
            else if(done < 57)
                done = done - 6;

            if(done > 16.4 && done < 10.1)
                done = 16.4 - (10.1 - done);
            else if(done < 16.4)
                done = done - 6;*/
            if(done <= pathLen)
                visibleSvgRef.current.setAttributeNS(null, "stroke-dashoffset", done.toString());
        }
    }

    useEffect(() => {
        let l = pathRef.current.getTotalLength();
        dashoffset = l;

        visibleSvgRef.current.setAttributeNS(null, "stroke-dasharray", l);
        visibleSvgRef.current.setAttributeNS(null, "stroke-dashoffset", l);
        observer.observe(svgRef.current);
        observer.observe(containerRef.current);

    }, [visibleSvgRef, pathRef, containerRef])
    return (
        <div className="timeline" ref={containerRef} id="container">
            <div className="text" ref={circlesText[0]}>
                <span>
                    My programming journey kicked off in early 2021 when I ventured into the world of code. My initial focus
                    was on Python, and I began by constructing basic Telegram bots. Right from the start, I sought to connect
                    my bots with external APIs, such as Amazon PAAPI5. This hands-on approach led me to dive into documentation
                    reading and grasp fundamental concepts like REST APIs, JSON handling, and HTTP requests.
                </span>
            </div>
            <div className="text toRight" ref={circlesText[1]}>
                <span>
                    Towards the close of 2021, an intriguing project emerged – a client requested a mobile application.
                    This marked my introduction to React Native, though I didn&apos;t delve deeply into mobile development.
                    Nevertheless, I absorbed knowledge about React and vital JavaScript concepts like asynchronous
                    programming and promises. Little did I know, these insights would lay a solid foundation for my future
                    web application endeavors.
                </span>
            </div>
            <div className="text" ref={circlesText[2]}>
                <span>
                    As summer transitioned into the close of 2022, my focus shifted towards unraveling the intricacies of
                    Amazon&apos;s ecosystem. I embraced web scraping and honed my skills in debugging private APIs using tools
                    like Postman and Mitmproxy, alongside dissecting internet traffic with Wireshark. This exploration
                    deepened my understanding of the HTTP protocol, paving the way for the creation of Aurora, my
                    personalized Amazon bot, and NowPrice, my startup venture.
                </span>
            </div>
            <div className="text halfRight" ref={circlesText[3]}>
                <span>
                    Throughout the last year, my dedication primarily revolved around refining NowPrice and Aurora,
                    all the while maintaining a commitment to continuous learning. My knowledge expanded to encompass
                    databases, both SQL and NoSQL, and extended into the realm of UI/UX design. Recent times have seen
                    me delving into lower-level languages such as Go and Rust, broadening my programming horizons.
                </span>
            </div>
            <svg ref={svgRef}
                    viewBox="0 0 40 150"
                xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient
                        id="linearGradient54-1">
                        <stop
                            style={{stopColor:"#ff006e",stopOpacity:1}}
                            offset="0"
                            id="stop623" />
                        <stop
                            style={{stopColor:"#f15b64",stopOpacity:1}}
                            offset="0.25342098"
                            id="stop624" />
                        <stop
                            style={{stopColor:"#fee440",stopOpacity:1}}
                            offset="0.49995938"
                            id="stop625" />
                        <stop
                            style={{stopColor:"#00bbf9",stopOpacity:1}}
                            offset="0.75435537"
                            id="stop626" />
                        <stop
                            style={{stopColor:"#00f5d4",stopOpacity:1}}
                            offset="1"
                            id="stop10" />
                    </linearGradient>
                    <linearGradient
                        xlinkHref="#linearGradient54-1"
                        id="linearGradient640"
                        x1="-40.064178"
                        y1="88.158348"
                        x2="-40.064178"
                        y2="-46.855255"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(52.824768,46.855254)" />
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(131,58,180,1)" />
                        <stop offset="50%" stopColor="rgba(253,29,29,1)" />
                        <stop offset="100%" stopColor="rgba(252,176,69,1)" />
                    </linearGradient>
                    <path ref={pathRef}
                        fill="none"
                        style={{stroke: "url(#linearGradient640)"}}
                        d="M 7,0 V 0.9894 C 7,1.9899 6.6046,2.9499 5.8999,3.6602 L 4.6166,4.9537 C 3.8555,5.7208 3.4285,6.7576 3.4285,7.8382 v 10 c -1.7819,0 -2.674,2.1543 -1.4141,3.4141 1.2599,1.2599 3.4141,0.3678 3.4141,-1.4141 0,-1.7819 -2.1543,-2.674 -3.4141,-1.4141 -1.2599,1.2599 -0.3678,3.4141 1.4141,3.4141 v 10 c 0,2.1889 1.2367,4.1899 3.1945,5.1688 l 0.7541,0.3771 c 1.9578,0.9789 3.1945,2.9799 3.1945,5.1688 v 10 c -1.7819,0 -2.674,2.1543 -1.4141,3.4141 1.2599,1.2599 3.4141,0.3678 3.4141,-1.4141 0,-1.7819 -2.1543,-2.674 -3.4141,-1.4141 -1.2599,1.2599 -0.3678,3.4141 1.4141,3.4141 v 10 c 0,2.2776 -0.9574,4.4503 -2.6382,5.9873 L 6.1357,74.184 c -1.682,1.5381 -2.6464,3.708 -2.6607,5.9872 v 10 c -1.7819,0 -2.674,2.1543 -1.4141,3.4141 1.2599,1.2599 3.4141,0.3678 3.4141,-1.4141 0,-1.7819 -2.1543,-2.674 -3.4141,-1.4141 -1.2599,1.2599 -0.3678,3.4141 1.4141,3.4141 v 8.13373 c 0,1.03071 -0.031295,2.74628 0.3969834,3.675 0.2296669,0.49802 0.5543982,0.95287 0.9621166,1.33657 l 0.958,0.9016 c 0.77082,0.72545 1.2078915,1.73699 1.2079,2.7955 v 10 c -1.7819,0 -2.674,2.1543 -1.4141,3.4141 C 6.8458,125.6876 9,124.7955 9,123.0136 9,121.2317 6.8457,120.3396 5.5859,121.5995 4.326,122.8594 5.2181,125.0136 7,125.0136"
                        id="Path_440" />
                    <path

                        d="M 3.1161 19.0898 C 3.2314 18.9746 3.0586 18.8019 2.9433 18.9171 l -0.854 0.854 c -0.0478 0.0477 -0.0478 0.1251 0 0.1727 l 0.854 0.854 c 0.1152 0.115 0.2879 -0.0577 0.1727 -0.1727 L 2.3482 19.8574 Z m 0.6692 0 C 3.6703 18.9746 3.843 18.8019 3.958 18.9171 l 0.854 0.854 c 0.0478 0.0477 0.0478 0.1251 0 0.1727 l -0.854 0.854 c -0.1152 0.115 -0.2879 -0.0577 -0.1727 -0.1727 l 0.7678 -0.7676 z"
                        id="circle1"
                        fill="url(#linearGradient640)"
                    />
                    <path
                        id="circle2"
                        d="M 11.6069 54.0397 h 0 q -0.051 -0.0174 -0.1028 -0.0325 q 0.0086 -0.0349 0.0158 -0.0703 c 0.0779 -0.3787 0.027 -0.6837 -0.1468 -0.7842 c -0.1664 -0.0964 -0.4392 0.0041 -0.7145 0.2442 q -0.0406 0.0355 -0.0795 0.0732 q -0.026 -0.025 -0.0532 -0.049 c -0.2885 -0.2567 -0.5777 -0.3649 -0.7512 -0.2641 c -0.1664 0.0966 -0.2158 0.3833 -0.1457 0.7422 q 0.0105 0.0532 0.0236 0.106 c -0.0409 0.0116 -0.0805 0.0241 -0.1183 0.0373 C 9.1965 54.1607 8.9805 54.3459 8.9805 54.538 c 0 0.1985 0.2319 0.3974 0.5841 0.5181 q 0.0429 0.0146 0.0865 0.0271 Q 9.6369 55.1396 9.626 55.1974 c -0.0666 0.3527 -0.0146 0.6327 0.1514 0.7287 c 0.1715 0.0991 0.4592 -0.0027 0.7396 -0.2483 q 0.0333 -0.0291 0.0666 -0.0616 q 0.0421 0.0407 0.0865 0.0789 c 0.2715 0.2341 0.5397 0.3287 0.7054 0.2325 c 0.1714 -0.0994 0.2271 -0.4002 0.1547 -0.7662 q -0.0083 -0.0419 -0.0192 -0.0856 q 0.0303 -0.009 0.0594 -0.0186 c 0.366 -0.1216 0.6045 -0.3182 0.6045 -0.5191 C 12.1749 54.3452 11.9519 54.1587 11.6069 54.0397 Z m -0.8585 -0.5396 c 0.2358 -0.2057 0.4562 -0.2869 0.5567 -0.2289 h 0 c 0.1069 0.0618 0.1485 0.3111 0.0813 0.6381 q -0.0067 0.0319 -0.0144 0.0637 a 3.2465 3.2465 90 0 0 -0.4271 -0.0676 a 3.2029 3.2029 90 0 0 -0.27 -0.3377 Q 10.7108 53.5329 10.7483 53.5001 Z M 9.9237 54.7021 q 0.0433 0.0839 0.0906 0.1656 q 0.0481 0.0835 0.1003 0.1644 a 2.8968 2.8968 90 0 1 -0.2944 -0.0475 C 9.8484 54.8934 9.8831 54.7986 9.9237 54.7021 Z m 0 -0.3216 c -0.0399 -0.0944 -0.0737 -0.1873 -0.1015 -0.277 c 0.0912 -0.0204 0.1883 -0.0371 0.2896 -0.0498 q -0.0509 0.0795 -0.098 0.1613 T 9.9235 54.3804 Z m 0.0725 0.1609 q 0.0631 -0.1316 0.1359 -0.2581 h 0 q 0.0727 -0.1264 0.1549 -0.2471 c 0.095 -0.0072 0.1925 -0.011 0.2909 -0.011 s 0.1965 0.0038 0.2914 0.011 q 0.0813 0.1204 0.1539 0.2462 t 0.1377 0.2569 Q 11.0968 54.6713 11.0236 54.7984 h 0 q -0.0726 0.1264 -0.1531 0.2478 c -0.0948 0.0067 -0.193 0.0103 -0.2928 0.0103 s -0.1961 -0.0031 -0.2892 -0.0092 q -0.0827 -0.1211 -0.1561 -0.2482 T 9.996 54.5413 Z M 11.1417 54.8668 q 0.0482 -0.0837 0.0926 -0.1696 h 0 a 2.9309 2.9309 90 0 1 0.1073 0.2816 A 2.8912 2.8912 90 0 1 11.0435 55.0297 Q 11.0942 54.9492 11.1417 54.8668 Z m 0.0913 -0.4863 q -0.0442 -0.0842 -0.0919 -0.1664 h 0 q -0.0466 -0.0811 -0.0971 -0.1601 c 0.1019 0.0129 0.1997 0.0301 0.2913 0.051 A 2.9275 2.9275 90 0 1 11.233 54.3805 Z M 10.5792 53.6654 h 0 a 2.9265 2.9265 90 0 1 0.188 0.2275 q -0.1887 -0.009 -0.3776 0 C 10.4517 53.8108 10.5153 53.7346 10.5792 53.6654 Z M 9.8434 53.2753 c 0.1069 -0.062 0.3432 0.0266 0.5923 0.248 c 0.0159 0.0142 0.0319 0.029 0.0479 0.0444 A 3.2701 3.2701 90 0 0 10.2117 53.9052 a 3.3216 3.3216 90 0 0 -0.4263 0.0666 q -0.0122 -0.049 -0.022 -0.0986 h 0 C 9.7031 53.5655 9.743 53.3335 9.8434 53.2753 Z M 9.6876 54.9514 q -0.0399 -0.0114 -0.0789 -0.0247 c -0.1557 -0.0532 -0.2844 -0.1227 -0.3727 -0.1984 C 9.157 54.6605 9.1169 54.5928 9.1169 54.538 c 0 -0.1165 0.1734 -0.2652 0.4627 -0.366 q 0.0545 -0.019 0.1099 -0.0347 a 3.2845 3.2845 90 0 0 0.1557 0.4043 A 3.3439 3.3439 90 0 0 9.6876 54.9514 Z m 0.7396 0.6234 c -0.124 0.1086 -0.2482 0.1856 -0.3576 0.2244 h 0 c -0.0984 0.0348 -0.1767 0.0358 -0.224 0.0085 c -0.1008 -0.0582 -0.1427 -0.2831 -0.0855 -0.5847 q 0.0102 -0.0532 0.0233 -0.1065 a 3.2001 3.2001 90 0 0 0.4305 0.0625 a 3.3355 3.3355 90 0 0 0.2742 0.3394 C 10.4681 55.5378 10.4478 55.5566 10.4271 55.5747 Z m 0.1559 -0.1545 c -0.0647 -0.0699 -0.1292 -0.1473 -0.1922 -0.2305 q 0.0918 0.0036 0.1869 0.0036 c 0.0651 0 0.1295 -0.0014 0.193 -0.0043 A 2.9237 2.9237 90 0 1 10.583 55.4202 Z m 0.8287 0.1903 c -0.019 0.1028 -0.0573 0.1713 -0.1046 0.1987 c -0.1007 0.0584 -0.316 -0.0175 -0.5481 -0.2178 c -0.0266 -0.0229 -0.0532 -0.0475 -0.0803 -0.0732 a 3.2246 3.2246 90 0 0 0.2677 -0.3407 a 3.18 3.18 90 0 0 0.4326 -0.0669 q 0.0098 0.0395 0.0173 0.0775 h 0 C 11.4283 55.3498 11.4328 55.4961 11.4117 55.6105 Z m 0.1158 -0.6831 h 0 c -0.0174 0.0058 -0.0354 0.0114 -0.0536 0.0168 a 3.2161 3.2161 90 0 0 -0.1618 -0.4056 a 3.2045 3.2045 90 0 0 0.1555 -0.3997 c 0.0327 0.0095 0.0644 0.0195 0.095 0.0301 c 0.2956 0.102 0.476 0.2529 0.476 0.3689 C 12.0385 54.6617 11.8437 54.8224 11.5275 54.9274 Z M 10.5777 54.8239 a 0.2862 0.2862 90 1 0 -0.2852 -0.2862 A 0.2856 0.2856 90 0 0 10.5777 54.8239 Z"
                        fill="#61dafb"
                    />
                    <path
                        id="circle31"
                        d="M 3.258 8.196 h -0.55 c -0.386 0 -0.7 -0.314 -0.7 -0.7 V 5.101 c 0 -0.386 0.314 -0.7 0.7 -0.7 h 0.55 c 0.386 0 0.7 0.314 0.7 0.7 v 2.395 c 0 0.386 -0.314 0.7 -0.7 0.7 z m -0.549 -3.395 c -0.165 0 -0.3 0.135 -0.3 0.3 v 2.395 c 0 0.165 0.135 0.3 0.3 0.3 h 0.55 c 0.165 0 0.3 -0.135 0.3 -0.3 V 5.101 c 0 -0.165 -0.135 -0.3 -0.3 -0.3 h -0.55 z M 8.348 1.377 h -0.55 c -0.386 0 -0.7 0.314 -0.7 0.7 v 2.079 c -0.183 -0.086 -0.384 -0.142 -0.595 -0.16 v -0.688 c 0 -0.386 -0.314 -0.7 -0.7 -0.7 h -0.55 c -0.386 0 -0.7 0.314 -0.7 0.7 v 4.189 c 0 0.386 0.314 0.7 0.7 0.7 h 0.55 c 0.382 0 0.693 -0.307 0.7 -0.687 c 0.211 -0.018 0.412 -0.074 0.595 -0.16 v 0.147 c 0 0.386 0.314 0.7 0.7 0.7 h 0.55 c 0.386 0 0.7 -0.314 0.7 -0.7 v -5.42 c 0 -0.386 -0.315 -0.7 -0.7 -0.7 z m -0.85 3.64 c 0.136 0.212 0.215 0.464 0.215 0.735 c 0 0.27 -0.079 0.522 -0.215 0.735 v -1.47 z m -2.512 0.735 c 0 -0.668 0.482 -1.225 1.117 -1.341 v 2.682 c -0.635 -0.116 -1.117 -0.673 -1.117 -1.341 z m 0.267 -2.745 h 0.55 c 0.165 0 0.3 0.135 0.3 0.3 v 0.699 c -0.466 0.066 -0.874 0.314 -1.15 0.67 V 3.307 c 0 -0.165 0.135 -0.3 0.3 -0.3 z m 0.55 4.789 h -0.55 c -0.165 0 -0.3 -0.135 -0.3 -0.3 v -0.668 c 0.275 0.356 0.683 0.605 1.15 0.67 c -0.001 0.165 -0.135 0.298 -0.3 0.298 z m 0.7 -0.689 v -2.71 c 0.218 0.024 0.42 0.1 0.595 0.216 v 2.279 c -0.175 0.115 -0.377 0.191 -0.595 0.215 z m 0.995 0.389 v -0.169 l 0.466 0.469 h -0.166 c -0.166 0 -0.3 -0.134 -0.3 -0.3 z m 1.15 0 c 0 0.113 -0.063 0.212 -0.156 0.263 l -0.828 -0.832 c 0.279 -0.312 0.449 -0.724 0.449 -1.175 c 0 -0.534 -0.239 -1.014 -0.615 -1.337 V 2.077 c 0 -0.165 0.135 -0.3 0.3 -0.3 h 0.55 c 0.165 0 0.3 0.135 0.3 0.3 v 5.419 z M 8.922 8.813 h -0.1 c -0.055 0 -0.1 -0.045 -0.1 -0.1 s 0.045 -0.1 0.1 -0.1 h 0.1 c 0.055 0 0.1 0.045 0.1 0.1 s -0.044 0.1 -0.1 0.1 z m -0.5 0 h -0.1 c -0.055 0 -0.1 -0.045 -0.1 -0.1 s 0.045 -0.1 0.1 -0.1 h 0.1 c 0.055 0 0.1 0.045 0.1 0.1 s -0.044 0.1 -0.1 0.1 z m -0.5 0 h -0.1 c -0.055 0 -0.1 -0.045 -0.1 -0.1 s 0.045 -0.1 0.1 -0.1 h 0.1 c 0.055 0 0.1 0.045 0.1 0.1 s -0.044 0.1 -0.1 0.1 z m -0.5 0 h -0.1 c -0.055 0 -0.1 -0.045 -0.1 -0.1 s 0.045 -0.1 0.1 -0.1 h 0.1 c 0.055 0 0.1 0.045 0.1 0.1 s -0.044 0.1 -0.1 0.1 z m -0.5 0 h -0.1 c -0.055 0 -0.1 -0.045 -0.1 -0.1 s 0.045 -0.1 0.1 -0.1 h 0.1 c 0.055 0 0.1 0.045 0.1 0.1 s -0.044 0.1 -0.1 0.1 z m -0.5 0 h -0.1 c -0.055 0 -0.1 -0.045 -0.1 -0.1 s 0.045 -0.1 0.1 -0.1 h 0.1 c 0.055 0 0.1 0.045 0.1 0.1 s -0.044 0.1 -0.1 0.1 z m -0.5 0 h -0.1 c -0.055 0 -0.1 -0.045 -0.1 -0.1 s 0.045 -0.1 0.1 -0.1 h 0.1 c 0.055 0 0.1 0.045 0.1 0.1 s -0.044 0.1 -0.1 0.1 z m -0.5 0 h -0.1 c -0.055 0 -0.1 -0.045 -0.1 -0.1 s 0.045 -0.1 0.1 -0.1 h 0.1 c 0.055 0 0.1 0.045 0.1 0.1 s -0.044 0.1 -0.1 0.1 z m -0.5 0 h -0.1 c -0.055 0 -0.1 -0.045 -0.1 -0.1 s 0.045 -0.1 0.1 -0.1 h 0.1 c 0.055 0 0.1 0.045 0.1 0.1 s -0.044 0.1 -0.1 0.1 z m -0.5 0 h -0.1 c -0.055 0 -0.1 -0.045 -0.1 -0.1 s 0.045 -0.1 0.1 -0.1 h 0.1 c 0.055 0 0.1 0.045 0.1 0.1 s -0.044 0.1 -0.1 0.1 z m -0.5 0 h -0.1 c -0.055 0 -0.1 -0.045 -0.1 -0.1 s 0.045 -0.1 0.1 -0.1 h 0.1 c 0.055 0 0.1 0.045 0.1 0.1 s -0.044 0.1 -0.1 0.1 z m -0.5 0 h -0.1 c -0.055 0 -0.1 -0.045 -0.1 -0.1 s 0.045 -0.1 0.1 -0.1 h 0.1 c 0.055 0 0.1 0.045 0.1 0.1 s -0.044 0.1 -0.1 0.1 z m -0.5 0 h -0.1 c -0.055 0 -0.1 -0.045 -0.1 -0.1 s 0.045 -0.1 0.1 -0.1 h 0.1 c 0.055 0 0.1 0.045 0.1 0.1 s -0.044 0.1 -0.1 0.1 z m -0.5 0 h -0.1 c -0.055 0 -0.1 -0.045 -0.1 -0.1 s 0.045 -0.1 0.1 -0.1 h 0.1 c 0.055 0 0.1 0.045 0.1 0.1 s -0.044 0.1 -0.1 0.1 z m -0.5 0 h -0.1 c -0.055 0 -0.1 -0.045 -0.1 -0.1 s 0.045 -0.1 0.1 -0.1 h 0.1 c 0.055 0 0.1 0.045 0.1 0.1 s -0.044 0.1 -0.1 0.1 z m -0.5 0 h -0.1 c -0.055 0 -0.1 -0.045 -0.1 -0.1 s 0.045 -0.1 0.1 -0.1 h 0.1 c 0.055 0 0.1 0.045 0.1 0.1 s -0.044 0.1 -0.1 0.1 z m -0.144 -0.356 c -0.055 0 -0.1 -0.045 -0.1 -0.1 v -0.1 c 0 -0.055 0.045 -0.1 0.1 -0.1 s 0.1 0.045 0.1 0.1 v 0.1 c 0 0.055 -0.045 0.1 -0.1 0.1 z m 0 -0.5 c -0.055 0 -0.1 -0.045 -0.1 -0.1 v -0.1 c 0 -0.055 0.045 -0.1 0.1 -0.1 s 0.1 0.045 0.1 0.1 v 0.1 c 0 0.055 -0.045 0.1 -0.1 0.1 z m 0 -0.5 c -0.055 0 -0.1 -0.045 -0.1 -0.1 v -0.1 c 0 -0.055 0.045 -0.1 0.1 -0.1 s 0.1 0.045 0.1 0.1 v 0.1 c 0 0.055 -0.045 0.1 -0.1 0.1 z m 0 -0.5 c -0.055 0 -0.1 -0.045 -0.1 -0.1 v -0.1 c 0 -0.055 0.045 -0.1 0.1 -0.1 s 0.1 0.045 0.1 0.1 v 0.1 c 0 0.055 -0.045 0.1 -0.1 0.1 z m 0 -0.5 c -0.055 0 -0.1 -0.045 -0.1 -0.1 v -0.1 c 0 -0.055 0.045 -0.1 0.1 -0.1 s 0.1 0.045 0.1 0.1 v 0.1 c 0 0.055 -0.045 0.1 -0.1 0.1 z m 0 -0.5 c -0.055 0 -0.1 -0.045 -0.1 -0.1 v -0.1 c 0 -0.055 0.045 -0.1 0.1 -0.1 s 0.1 0.045 0.1 0.1 v 0.1 c 0 0.055 -0.045 0.1 -0.1 0.1 z m 0 -0.5 c -0.055 0 -0.1 -0.045 -0.1 -0.1 v -0.1 c 0 -0.055 0.045 -0.1 0.1 -0.1 s 0.1 0.045 0.1 0.1 v 0.1 c 0 0.055 -0.045 0.1 -0.1 0.1 z m 0 -0.5 c -0.055 0 -0.1 -0.045 -0.1 -0.1 v -0.1 c 0 -0.055 0.045 -0.1 0.1 -0.1 s 0.1 0.045 0.1 0.1 v 0.1 c 0 0.055 -0.045 0.1 -0.1 0.1 z m 0 -0.5 c -0.055 0 -0.1 -0.045 -0.1 -0.1 v -0.1 c 0 -0.055 0.045 -0.1 0.1 -0.1 s 0.1 0.045 0.1 0.1 v 0.1 c 0 0.055 -0.045 0.1 -0.1 0.1 z m 0 -0.5 c -0.055 0 -0.1 -0.045 -0.1 -0.1 v -0.1 c 0 -0.055 0.045 -0.1 0.1 -0.1 s 0.1 0.045 0.1 0.1 v 0.1 c 0 0.055 -0.045 0.1 -0.1 0.1 z m 0 -0.5 c -0.055 0 -0.1 -0.045 -0.1 -0.1 v -0.1 c 0 -0.055 0.045 -0.1 0.1 -0.1 s 0.1 0.045 0.1 0.1 v 0.1 c 0 0.055 -0.045 0.1 -0.1 0.1 z m 0 -0.5 c -0.055 0 -0.1 -0.045 -0.1 -0.1 v -0.1 c 0 -0.055 0.045 -0.1 0.1 -0.1 s 0.1 0.045 0.1 0.1 v 0.1 c 0 0.055 -0.045 0.1 -0.1 0.1 z m 0 -0.5 c -0.055 0 -0.1 -0.045 -0.1 -0.1 v -0.1 c 0 -0.055 0.045 -0.1 0.1 -0.1 s 0.1 0.045 0.1 0.1 v 0.1 c 0 0.055 -0.045 0.1 -0.1 0.1 z"
                        fill="yellow"
                    />
                    <g id="circle3" style={{transform: "translate(1.5px, 90.4px)"}}>
                        <path
                            d="M 1.1403 2.8686 h -0.1925 c -0.1351 0 -0.245 -0.1099 -0.245 -0.245 V 1.7854 c 0 -0.1351 0.1099 -0.245 0.245 -0.245 h 0.1925 c 0.1351 0 0.245 0.1099 0.245 0.245 v 0.8383 c 0 0.1351 -0.1099 0.245 -0.245 0.245 z m -0.1921 -1.1883 c -0.0578 0 -0.105 0.0473 -0.105 0.105 v 0.8383 c 0 0.0578 0.0473 0.105 0.105 0.105 h 0.1925 c 0.0578 0 0.105 -0.0473 0.105 -0.105 V 1.7854 c 0 -0.0578 -0.0473 -0.105 -0.105 -0.105 h -0.1925 z"
                            fill="url(#gradient)" />
                        <path
                            d="M 2.9218 0.4819 h -0.1925 c -0.1351 0 -0.245 0.1099 -0.245 0.245 v 0.7277 c -0.0641 -0.0301 -0.1344 -0.0497 -0.2082 -0.056 v -0.2408 c 0 -0.1351 -0.1099 -0.245 -0.245 -0.245 h -0.1925 c -0.1351 0 -0.245 0.1099 -0.245 0.245 v 1.4661 c 0 0.1351 0.1099 0.245 0.245 0.245 h 0.1925 c 0.1337 0 0.2425 -0.1075 0.245 -0.2405 c 0.0739 -0.0063 0.1442 -0.0259 0.2082 -0.056 v 0.0514 c 0 0.1351 0.1099 0.245 0.245 0.245 h 0.1925 c 0.1351 0 0.245 -0.1099 0.245 -0.245 v -1.897 c 0 -0.1351 -0.1103 -0.245 -0.245 -0.245 z m -0.2975 1.274 c 0.0476 0.0742 0.0752 0.1624 0.0752 0.2572 c 0 0.0945 -0.0277 0.1827 -0.0752 0.2572 v -0.5145 z m -0.8792 0.2572 c 0 -0.2338 0.1687 -0.4288 0.391 -0.4693 v 0.9387 c -0.2223 -0.0406 -0.391 -0.2355 -0.391 -0.4693 z m 0.0935 -0.9607 h 0.1925 c 0.0578 0 0.105 0.0473 0.105 0.105 v 0.2447 c -0.1631 0.0231 -0.3059 0.1099 -0.4025 0.2345 V 1.1575 c 0 -0.0578 0.0473 -0.105 0.105 -0.105 z m 0.1925 1.6762 h -0.1925 c -0.0578 0 -0.105 -0.0473 -0.105 -0.105 v -0.2338 c 0.0963 0.1246 0.239 0.2117 0.4025 0.2345 c -0.0004 0.0578 -0.0473 0.1043 -0.105 0.1043 z m 0.245 -0.2412 v -0.9485 c 0.0763 0.0084 0.147 0.035 0.2082 0.0756 v 0.7977 c -0.0612 0.0403 -0.132 0.0669 -0.2082 0.0752 z m 0.3483 0.1361 v -0.0591 l 0.1631 0.1641 h -0.0581 c -0.0581 0 -0.105 -0.0469 -0.105 -0.105 z m 0.4025 0 c 0 0.0396 -0.0221 0.0742 -0.0546 0.0921 l -0.2898 -0.2912 c 0.0977 -0.1092 0.1572 -0.2534 0.1572 -0.4113 c 0 -0.1869 -0.0837 -0.3549 -0.2152 -0.4679 V 0.7269 c 0 -0.0578 0.0473 -0.105 0.105 -0.105 h 0.1925 c 0.0578 0 0.105 0.0473 0.105 0.105 v 1.8966 z"
                            fill="url(#gradient)" />
                        <path d="M 2.2225 1.5361 c -0.2632 0 -0.4774 0.2142 -0.4774 0.4774 S 1.9593 2.4906 2.2225 2.4906 s 0.4774 -0.2142 0.4774 -0.4774 S 2.4857 1.5361 2.2225 1.5361 z"
                              fill="#ff000044" />
                        <path
                            d="M 2.2225 1.6159 c -0.049 0 -0.0973 0.0088 -0.1428 0.0262 c -0.0182 0.007 -0.027 0.0273 -0.02 0.0452 c 0.007 0.0182 0.0273 0.027 0.0452 0.02 c 0.0374 -0.0143 0.077 -0.0217 0.1176 -0.0217 c 0.1806 0 0.3272 0.147 0.3272 0.3272 c 0 0.0689 -0.0214 0.1348 -0.0612 0.1908 c -0.0154 0.0217 -0.0336 0.0413 -0.0542 0.0588 c -0.0147 0.0126 -0.0164 0.0347 -0.0039 0.0493 c 0.007 0.008 0.0168 0.0123 0.0266 0.0123 c 0.008 0 0.0161 -0.0028 0.0227 -0.0084 c 0.0245 -0.021 0.0469 -0.0448 0.0658 -0.0714 c 0.0486 -0.0679 0.0746 -0.1477 0.0746 -0.2317 c -0.0004 -0.2184 -0.1785 -0.3966 -0.3976 -0.3966 z"
                            fill="#ff99fc" />
                    </g>

                    <g id="circle4">
                        <path
                            d="m 6.2 122.8144 a 0.1 0.1 90 0 0 -0.1 0.1 a 0.1 0.1 90 0 0 0.1 0.1 h 0.4 a 0.1 0.1 90 0 0 0.1 -0.1 a 0.1 0.1 90 0 0 -0.1 -0.1 z"
                            fill="url(#linearGradient640)" />
                        <path
                            d="m 7.8 123.3014 a 0.1 0.1 90 0 0 -0.1 0.1 v 0.3586 l -0.0293 -0.0293 A 0.1 0.1 90 0 0 7.6 123.7014 a 0.1 0.1 90 0 0 -0.0707 0.0293 a 0.1 0.1 90 0 0 0 0.1414 l 0.2 0.2 a 0.1 0.1 90 0 0 0.0047 0.0037 a 0.1 0.1 90 0 0 0.0086 0.0068 a 0.1 0.1 90 0 0 0.009 0.0057 a 0.1 0.1 90 0 0 0.0105 0.0051 a 0.1 0.1 90 0 0 0.0104 0.0035 a 0.1 0.1 90 0 0 0.0105 0.0025 a 0.1 0.1 90 0 0 0.0119 0.0014 a 0.1 0.1 90 0 0 0.0051 0.0006 a 0.1 0.1 90 0 0 0.0051 -0.0006 a 0.1 0.1 90 0 0 0.0119 -0.0014 a 0.1 0.1 90 0 0 0.0105 -0.0025 a 0.1 0.1 90 0 0 0.0104 -0.0035 a 0.1 0.1 90 0 0 0.0105 -0.0051 a 0.1 0.1 90 0 0 0.009 -0.0057 a 0.1 0.1 90 0 0 0.0086 -0.0068 a 0.1 0.1 90 0 0 0.0047 -0.0037 l 0.2 -0.2 a 0.1 0.1 90 0 0 0 -0.1414 a 0.1 0.1 90 0 0 -0.1414 0 L 7.9 123.76 v -0.3586 a 0.1 0.1 90 0 0 -0.1 -0.1 z"
                            fill="url(#linearGradient640)" />
                        <path
                            d="m 6.2 122.0014 a 0.1 0.1 90 0 0 -0.1 0.1 a 0.1 0.1 90 0 0 0.1 0.1 h 0.4 a 0.1 0.1 90 0 0 0.1 -0.1 a 0.1 0.1 90 0 0 -0.1 -0.1 z"
                            fill="url(#linearGradient640)" />
                        <path
                            d="m 6.2 123.6014 a 0.1 0.1 90 0 0 -0.1 0.1 a 0.1 0.1 90 0 0 0.1 0.1 h 0.4 a 0.1 0.1 90 0 0 0.1 -0.1 a 0.1 0.1 90 0 0 -0.1 -0.1 z"
                            fill="url(#linearGradient640)" />
                        <path
                            d="m 6 121.6014 c -0.1645 0 -0.3 0.1355 -0.3 0.3 v 0.4 c 0 0.0766 0.0297 0.1467 0.0777 0.2 c -0.0481 0.0533 -0.0777 0.1234 -0.0777 0.2 v 0.4 c 0 0.0766 0.0297 0.1467 0.0777 0.2 c -0.0481 0.0533 -0.0777 0.1234 -0.0777 0.2 v 0.4 c 0 0.1645 0.1355 0.3 0.3 0.3 h 1.3111 c 0.1264 0.1236 0.299 0.2 0.4889 0.2 c 0.3854 0 0.7 -0.3146 0.7 -0.7 c 0 -0.2782 -0.1639 -0.5195 -0.4 -0.6322 v -0.3678 c 0 -0.0766 -0.0297 -0.1467 -0.0777 -0.2 c 0.0481 -0.0533 0.0777 -0.1234 0.0777 -0.2 v -0.4 c 0 -0.1645 -0.1355 -0.3 -0.3 -0.3 z m 0 0.2 h 1.8 c 0.0571 0 0.1 0.0429 0.1 0.1 v 0.4 c 0 0.0571 -0.0429 0.1 -0.1 0.1 h -1.8 c -0.0571 0 -0.1 -0.0429 -0.1 -0.1 v -0.4 c 0 -0.0571 0.0429 -0.1 0.1 -0.1 z m 0 0.8 h 1.8 c 0.0571 0 0.1 0.0429 0.1 0.1 v 0.3072 c -0.0327 -0.0047 -0.066 -0.0072 -0.1 -0.0072 c -0.1899 0 -0.3625 0.0764 -0.4889 0.2 H 6 c -0.0571 0 -0.1 -0.0429 -0.1 -0.1 v -0.4 c 0 -0.0571 0.0429 -0.1 0.1 -0.1 z m 1.8 0.6 c 0.2773 0 0.5 0.2227 0.5 0.5 c 0 0.2773 -0.2227 0.5 -0.5 0.5 c -0.1441 0 -0.2732 -0.0602 -0.3643 -0.1568 a 0.1 0.1 90 0 0 -0.0168 -0.0186 C 7.3447 123.9388 7.3 123.8256 7.3 123.7014 c 0 -0.1256 0.0459 -0.24 0.1217 -0.3275 a 0.1 0.1 90 0 0 0.0065 -0.0076 c 0.0913 -0.1014 0.2238 -0.1648 0.3719 -0.1648 z m -1.8 0.2 h 1.1678 c -0.0435 0.091 -0.0678 0.1927 -0.0678 0.3 c 0 0.1073 0.0243 0.209 0.0678 0.3 H 6 c -0.0571 0 -0.1 -0.0429 -0.1 -0.1 v -0.4 c 0 -0.0571 0.0429 -0.1 0.1 -0.1 z"
                            fill="url(#linearGradient640)" />
                    </g>

                </defs>
                <use ref={visibleSvgRef} id="theFill" xlinkHref="#Path_440" stroke="#000" strokeWidth="0.2" />
                <use ref={circles[0]} xlinkHref="#circle1" className="symbol"/>
                <use ref={circles[1]} xlinkHref="#circle2" className="symbol"/>
                <use ref={circles[2]} xlinkHref="#circle3" className="symbol"/>
                <use ref={circles[3]} xlinkHref="#circle4" className="symbol"/>

            </svg>
        </div>
    )
}