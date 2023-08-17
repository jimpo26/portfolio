import {messagesByIp} from "../../middleware";

export default async function handler(req, res) {
    // get key and ip parameters from query
    const { key, ip } = req.query;
    // check if key is correct
    if(key !== process.env.PRIVATE_KEY) {
        return res.status(401).json({message: "Unauthorized"})
    }

    // check if ip is provided
    if(!ip) {
        return res.status(400).json({message: "Bad request"})
    }

    // check if ip is already banned
    if(messagesByIp[ip].banned) {
        return res.status(400).json({message: "IP already banned"})
    }
    messagesByIp[ip].banned = true;
}