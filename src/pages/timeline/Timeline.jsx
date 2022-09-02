import "./timeline.css";
import Topbar from "../../components/topbar/Topbar";
import Ads from "../../components/ads/Ads";
import { useContext, useEffect, useState } from "react";
import Post from "../../components/post/Post";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Timeline() {
    const [posts, setPosts] = useState([]);
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
        const fetchData = async () => {
            const res = await axios.get(`https://soshial.herokuapp.com/api/posts/timeline/${user._id}`);
            setPosts(res.data);
        }

        fetchData();
    }, [user._id]);

    return (
        <>
            <Topbar />
            <div className="main">
                <div className="leftSideBar">
                    <Sidebar />
                </div>
                <div className="timelinePosts">
                    {posts.map((p) => (
                        <Post key={p._id} post={p} />
                    ))}
                </div>
                <div className="adsContainer timelineAds">
                    {adsDetail.map(a => (
                        <Ads key={a.desc} ad={a} />
                    ))}
                </div>
            </div>
        </>
    )
}