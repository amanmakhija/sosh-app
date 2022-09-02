import Ads from "../../components/ads/Ads";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./notification.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import NotificationModel from "../../components/notificationModel/NotificationModel";

export default function Notification() {
    const [notifications, setNotifications] = useState([]);
    const { user } = useContext(AuthContext);

    const adsDetail = [
        {
            src: "https://tse4.explicit.bing.net/th?id=OIP.BhaOK9K7kzhIkLuPL_btvAHaJ4&pid=Api&P=0",
            desc: "Coca Cola 1940s Vintage"
        },
        {
            src: "https://tse3.mm.bing.net/th?id=OIP.EapIEZezofbeIIgUPinEYwHaKe&pid=Api&P=0",
            desc: "Red Bull Energy Drink"
        },
        {
            src: "https://tse4.mm.bing.net/th?id=OIP.2X3djh19UXzymkjYKunq6gHaFj&pid=Api&P=0",
            desc: "Free Ads Here"
        }
    ]

    useEffect(() => {
        const fetchNotifications = async () => {
            const res = await axios.get(`https://soshial.herokuapp.com/api/notifications/${user._id}`);
            setNotifications(res.data);
        }

        fetchNotifications();
    }, [user._id]);

    return (
        <>
            <Topbar />
            <div className="notiMain">
                <div className="notiSide">
                    <Sidebar />
                </div>
                <div className="notiCenter">
                    {notifications.length !== 0 ? notifications.map(n => (
                        <div key={n._id} className="notification">
                            <NotificationModel notification={n} />
                        </div>
                    )) :
                        <div className="nullDiv">
                            <span className="null">No Notifications</span>
                        </div>
                    }
                </div>
                <div className="adsContainer notiAds">
                    {adsDetail.map(a => (
                        <Ads key={a.desc} ad={a} />
                    ))}
                </div>
            </div>
        </>
    )
}
