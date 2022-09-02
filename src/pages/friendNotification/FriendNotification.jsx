import "./friendNotification.css";
import Ads from "../../components/ads/Ads";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import FriendNotificationModel from "../../components/friendNotificationModel/FriendNotificationModel";

export default function FriendNotification() {
    const [friendNotification, setFriendNotification] = useState(null);
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
        const fetchFRNotify = async () => {
            const res = await axios.get(`https://soshial.herokuapp.com/api/friendRequests/${user._id}`);
            setFriendNotification(res.data);
        }

        fetchFRNotify();
    }, [user._id]);

    return (
        <>
            <Topbar />
            <div className="frndNotiMain">
                <div className="frndNotiSide">
                    <Sidebar />
                </div>
                <div className="frndNotiCenter">
                    {friendNotification ? friendNotification.map(f => (
                        <FriendNotificationModel content={f} key={f._id} />
                    )) : <div className="nullDiv">
                        <span className="null">No Notifications</span>
                    </div>}
                </div>
                <div className="adsContainer frndNotiAds">
                    {adsDetail.map(a => (
                        <Ads key={a.desc} ad={a} />
                    ))}
                </div>
            </div>
        </>
    )
}
