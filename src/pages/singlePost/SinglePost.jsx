import "./singlePost.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import Ads from "../../components/ads/Ads";
import { AuthContext } from "../../context/AuthContext";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { format } from "timeago.js";
import { MoreVert } from "@material-ui/icons";

export default function SinglePost() {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [like, setLike] = useState();
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const [copied, setCopied] = useState("Share");
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    const history = useHistory();
    const url = window.location;

    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get(`https://soshial.herokuapp.com/api/posts/${id}`);
            setPost(res.data);
            setLike(res.data.likes.length);
        }

        fetchPost();
    }, [id]);

    useEffect(() => {
        const updateLike = async () => {
            const res = await axios.get(`https://soshial.herokuapp.com/api/posts/${id}`);
            setIsLiked(res.data.likes.includes(currentUser._id));
        }

        updateLike();
    }, [id, currentUser._id, post.likes])


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
        const fetchUser = async () => {
            const res = await axios.get(`https://soshial.herokuapp.com/api/users?userId=${post.userId}`);
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);

    const likeHandler = () => {
        try {
            axios.put("https://soshial.herokuapp.com/api/posts/" + post._id + "/like", { userId: currentUser._id });
        } catch (err) {
            console.log(err);
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    const deleteHandle = async () => {
        await axios.delete(`https://soshial.herokuapp.com/api/posts/${post._id}`, { userId: currentUser._id });
        window.location.reload();
    }

    const updateHandle = async () => {
        history.push(`/update/${post._id}`);
    }

    const copyHandler = () => {
        if (copied === "Share") {
            setCopied("COPIED!");
        }
        setTimeout(() => {
            setCopied("Share");
        }, 5000);
    }

    return (
        <>
            <Topbar />
            <div className="updateContainer">
                <div className="side">
                    <Sidebar />
                </div>
                <div className={id ? "singlePost post" : "post"}>
                    <div className="postWrapper">
                        <div className="postTop">
                            <div className="postTopLeft">
                                <Link to={`/profile/${user.username}`}>
                                    <img
                                        className="postProfileImg"
                                        src={
                                            user.profilePicture
                                                ? PF + user.profilePicture
                                                : PF + "person/noAvatar.png"
                                        }
                                        alt={user.username}
                                    />
                                </Link>
                                <span className="postUsername">{user.username}</span>
                                {post.feeling && <span className="postFeeling">is {post.feeling.emoji} feeling {post.feeling.name}</span>}
                                {post.location && <span className="postLocation">at {post.location}</span>}
                                <span className="postDate">{format(post.createdAt)}</span>
                            </div>

                            <Popup className={post.userId === currentUser._id ? "options" : "simple"} closeOnDocumentClick position="left top" trigger={
                                <div className="postTopRight">
                                    <MoreVert />
                                </div>}
                            >
                                {post.userId === currentUser._id && (
                                    <>
                                        <h4 className="options" onClick={updateHandle}>Update</h4>
                                        <h4 className="options" onClick={deleteHandle}>Delete</h4>
                                    </>
                                )}
                                <CopyToClipboard text={`${url.protocol}://${url.hostname}:${url.port && url.port}/post/${post._id}`}>
                                    <h4 className={copied === "Share" ? "options" : "options copy"} onClick={copyHandler}>{copied}</h4>
                                </CopyToClipboard>
                            </Popup>

                        </div>
                        <div className="postCenter">
                            <span className="postText">{post?.desc}</span>
                            <img className="postImg" src={PF + post.img} alt="" />
                        </div>
                        <div className="postBottom">
                            <div className="postBottomLeft">
                                <img
                                    className="likeIcon"
                                    src={`${PF}like.png`}
                                    onClick={likeHandler}
                                    alt=""
                                />
                                <img
                                    className="likeIcon"
                                    src={`${PF}heart.png`}
                                    onClick={likeHandler}
                                    alt=""
                                />
                                <span className="postLikeCounter">{like} people like it</span>
                            </div>
                            <div className="postBottomRight">
                                <span className="postCommentText">{post.comment} comments</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="adsContainer">
                    {adsDetail.map(a => (
                        <Ads ad={a} />
                    ))}
                </div>
            </div>
        </>
    )
}
