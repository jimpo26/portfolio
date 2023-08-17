import {useState} from "react";

import "./contact.css"

export default function ContactScreen() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [showSend, setShowSend] = useState(true)

    const sendMsg = () => {
        if (name === "" || email === "" || message === "") {
            alert("Please fill all the fields")
            return
        }
        // check that email is valid
        if (!email.includes("@") || !email.includes(".")) {
            alert("Please enter a valid email")
            return
        }
        setShowSend(false)
        // send a request to backend
         fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                message
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => {
            setShowSend(true)
            if (res.message) {
                alert("Message sent successfully")
            } else {
                alert("Error sending message\n" + res.error)
            }
         })
    }
    return (
        <div className="contact-screen">
            <div className="contact-screen__content">
                <div className="contact-screen__title">Contact</div>
                <div className="contact-screen__sub">I&apos;m available both for freelance work and full-time positions. If you want to get in touch with me, compile the form below </div>
                <div className="contact-screen__form">
                    <div className="contact-screen__form__input">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="contact-screen__form__input">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="contact-screen__form__input">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)}/>
                    </div>
                        <button className="contact-screen__form__input__btn" onClick={sendMsg} style={{display: showSend ? "flex" : "none"}}>Send</button>
                        <div className="loader" style={{display: showSend ? "none" : "flex"}}></div>
                </div>
            </div>
        </div>
    )
}