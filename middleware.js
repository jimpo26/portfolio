import {NextResponse} from "next/server";

export const messagesByIp = {

};

export async function middleware(req) {

    // if url is not /api/contact
    if(req.url !== "/api/contact") {
        return NextResponse.next()
    }

    const { headers } = req;
    // check if the request is from the same ip address
    const lastItem = headers.get('x-forwarded-for').split(",").pop()
    const ip = lastItem || headers.get('x-real-ip')
    if(messagesByIp[ip] && messagesByIp[ip].banned) {
        return NextResponse.next({
            status: 429,
            body: "Too many requests"
        })
    }
    if(messagesByIp[ip] && messagesByIp[ip] > 2) {
        // get timestamp of last request
        const lastRequest = messagesByIp[ip].timestamp
        // check if passed 10 minutes
        if(Date.now() - lastRequest > 600000) {
            // reset counter
            messagesByIp[ip] = 1
            // update timestamp
            messagesByIp[ip].timestamp = Date.now()
            return NextResponse.next()
        }
        return NextResponse.next({
            status: 429,
            body: "Too many requests"
        })
    }
    messagesByIp[ip] = messagesByIp[ip] ? messagesByIp[ip] + 1 : 1;
    messagesByIp[ip].timestamp = Date.now()
    return NextResponse.next()
}