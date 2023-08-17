

const messagesByIp = {};

export default async function handler(req, res) {

    // check if the request is from the same ip address
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (messagesByIp[ip] && messagesByIp[ip] > 2) {
        return res.status(429).json({ error: 'Too many requests' });
    } else {
        messagesByIp[ip] = messagesByIp[ip] ? messagesByIp[ip] + 1 : 1;
        setTimeout(() => {
            messagesByIp[ip] = messagesByIp[ip] - 1;
        }, 600000);
    }

    const { name, email, message } = req.body;

    if (req.method === 'POST') {
        if (!name || !email || !message) {
            return res.status(422).json({ error: 'Invalid input' });
        }
        const msg = "Name: " + name + "\nEmail: " + email + "\nMessage: " + message + "\n\nIP: " + ip;
        // send a message on telegram
        const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: process.env.TELEGRAM_CHAT_ID,
                text: msg,
            })
        }).then(res => res.json())
        if (!response.ok) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }
        return res.status(201).json({ message: 'Successfully stored message!' });
    }
}