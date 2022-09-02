import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react"
import axios from "axios";

export default function Topbar() {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [userName, setUserName] = useState("");
  const [notiLen, setNotiLen] = useState(null);
  const [frLen, setFrLen] = useState(null);

  useEffect(() => {
    const fetchNotify = async () => {
      const res = await axios.get(`https://soshial.herokuapp.com/api/notifications/${user._id}`);
      setNotiLen(res.data.length);
    }

    const fetchFrRequest = async () => {
      const res = await axios.get(`https://soshial.herokuapp.com/api/friendRequests/${user._id}`);
      setFrLen(res.data.length);
    }

    fetchNotify();
    fetchFrRequest();
  }, [user._id]);

  const changeHandler = async () => {
    history.push(`/profile/${userName}`);
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Sosh</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input onClick={() => changeHandler()} className="searchBtn" value="Search" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" className="topbarLink">Homepage</Link>
          <Link to={`/timeline/${user.username}`} className="topbarLink">Timeline</Link>
        </div>
        <div className="topbarIcons">
          <Link to={`/friends/notification/${user.username}`}>
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">{frLen}</span>
            </div>
          </Link>
          <Link to={`/messenger/${user.username}`}>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge"></span>
            </div>
          </Link>
          <Link to={`/notification/${user.username}`}>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">{notiLen}</span>
            </div>
          </Link>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
