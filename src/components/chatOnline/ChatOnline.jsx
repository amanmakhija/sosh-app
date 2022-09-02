import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css"

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get("https://soshial.herokuapp.com/api/users/friends/" + currentId);
            setFriends(res.data);
        }

        getFriends();
    }, [currentId]);

    useEffect(() => {
        setOnlineFriends(friends.filter(f => onlineUsers.includes(f._id)));
    }, [onlineUsers, friends]);

    const handleClick = async (user) => {
        try {
            const res = await axios.get(`https://soshial.herokuapp.com/api/conversations/find/${currentId}/${user._id}`);
            setCurrentChat(res.data);
        } catch (error) {

        }
    }

    return (
        <div className="chatOnline">
            {onlineFriends.map(a => (
                <div className="chatOnlineFriend" onClick={() => handleClick(a)}>
                    <div className="chatOnlineImgContainer">
                        <img className="chatOnlineImg" src={a?.profilePicture ? PF + a.profilePicture : PF + "person/noAvatar.png"} alt="" />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{a?.username}</span>
                </div>
            ))}
        </div>
    )
}
