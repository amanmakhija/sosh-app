import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [copied, setCopied] = useState("Share");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const history = useHistory();
  const url = window.location;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://soshial.herokuapp.com/api/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      const details = {
        trigger: "Like",
        senderId: currentUser._id,
        receiverId: post.userId,
        postId: post._id
      }

      axios.post("https://soshial.herokuapp.com/api/notifications", details);
      axios.put("https://soshial.herokuapp.com/api/posts/" + post._id + "/like", { userId: currentUser._id });

      if (like >= 0) {
        setLike(!isLiked && like + 1);
        setIsLiked(isLiked);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const dislikeHandler = () => {
    try {
      const details = {
        trigger: "Dislike",
        senderId: currentUser._id,
        receiverId: post.userId,
        postId: post._id
      }

      axios.post("https://soshial.herokuapp.com/api/notifications", details);
      axios.put("https://soshial.herokuapp.com/api/posts/" + post._id + "/dislike", { userId: currentUser._id });

      if (like > 0) {
        setLike(isLiked && like - 1);
        setIsLiked(!isLiked);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandle = async () => {
    await axios.delete(`https://soshial.herokuapp.com/api/posts/${post._id}/${user._id}`);
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
    <div className="post">
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
              onClick={dislikeHandler}
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
  );
}
