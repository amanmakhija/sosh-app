import "./notificationModel.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function NotificationModel({ notification }) {
    const history = useHistory();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [pfp, setPfp] = useState(null);
    const [pic, setPic] = useState(null);
    const [sender, setSender] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`https://soshial.herokuapp.com/api/users?userId=${notification.senderId}`);
            setSender(res.data);
            setPfp(res.data.profilePicture);
        }

        const fetchPost = async () => {
            const res = await axios.get(`https://soshial.herokuapp.com/api/posts/${notification.postId}`);
            setPic(res.data.img);
        }

        fetchUser();
        fetchPost();
    }, [notification]);

    const clicked = () => {
        history.push(`/post/${notification.postId}`)
    }

    return (
        <div className="notiModelMain" onClick={clicked}>
            <div className="notiModelAvatar">
                <img
                    className="shareProfileImg"
                    src={pfp ? PF + pfp : PF + "person/noAvatar.png"}
                    alt=""
                />
            </div>
            <div className="notiModelText">
                <span><b>{sender.username}</b> {notification.trigger}d your post.</span>
            </div>
            <div className="notiModelImgContainer">
                {pic && <img
                    className="notiModelImg"
                    src={PF + pic}
                    alt=""
                />}
            </div>
        </div>
    )
}