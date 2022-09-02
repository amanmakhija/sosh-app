import axios from "axios";
import { useEffect, useState } from "react";
import "./friendNotificationModel.css";

export default function FriendNotificationModel({ content }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [pfp, setPfp] = useState(null);
    const [sender, setSender] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`https://soshial.herokuapp.com/api/users?userId=${content.senderId}`);
            setSender(res.data);
            setPfp(res.data.profilePicture);
        }

        fetchUser();
    }, [content]);

    return (
        <div className="frndNotiModelMain">
            <div className="frndNotiModelAvatar">
                <img
                    className="shareProfileImg"
                    src={pfp ? PF + pfp : PF + "person/noAvatar.png"}
                    alt=""
                />
            </div>
            <div className="frndNotiModelText">
                <span><b>{sender.username}</b> {content.trigger}ed you.</span>
            </div>
        </div>
    )
}
