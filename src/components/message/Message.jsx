import "./message.css"
import { format } from "timeago.js"

export default function Message({ message, own }) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src="https://tse3.mm.bing.net/th?id=OIP.Blag-F1I9HmWBEf6jGLw5gHaFF&pid=Api&P=0" alt="" />
                <p className={message.text === "  Message Deleted  " ? "deleted" : "messageText"}>{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}
