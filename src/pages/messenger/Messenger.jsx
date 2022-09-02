import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversations/Conversation"
import Message from "../../components/message/Message"
import ChatOnline from "../../components/chatOnline/ChatOnline"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { io } from "socket.io-client"
import { Delete } from "@material-ui/icons"

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useContext(AuthContext);
    const socket = useRef();
    const scrollRef = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages(prev => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users => {
            setOnlineUsers(user.followings.filter(f => users.some(u => u.userId === f)));
        });
    }, [user]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("https://soshial.herokuapp.com/api/conversations/" + user._id);
                setConversations(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        getConversations();
    }, [user._id]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("https://soshial.herokuapp.com/api/messages/" + currentChat?._id);
                setMessages(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }

        const receiverId = currentChat.members.find(member => member !== user._id);

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage
        });

        try {
            const res = await axios.post("https://soshial.herokuapp.com/api/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const deleteHandler = async (m) => {
        const newMessage = {
            text: "  Message Deleted  "
        }
        await axios.put(`https://soshial.herokuapp.com/api/messages/${m._id}/${m.sender}`, newMessage);
        console.log("Message Deleted");
    }

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {conversations.map(c => (
                            <div key={c.members} onClick={() => setCurrentChat(c)}>
                                <Conversation conversation={c} currentUser={user} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ?
                            <>
                                <div className="chatBoxTop">
                                    {messages.map(m => (
                                        <div key={m._id} className="message" ref={scrollRef}>
                                            <Message message={m} own={m.sender === user._id} />
                                            {m.sender === user._id && m.text !== "  Message Deleted  " && (
                                                <div onClick={() => deleteHandler(m)} className="deleteIcon">
                                                    <Delete style={{ height: "15px", width: "15px", marginTop: "2px" }} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <input onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className="chatMessageInput" placeholder="Write something..." />
                                    <button onClick={handleSubmit} className="chatSubmitBtn">Send</button>
                                </div>
                            </> : <span className="noConvo">Open a conversation to start a chat.</span>
                        }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
                    </div>
                </div>
            </div>
        </>
    )
}
