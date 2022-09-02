import "./sidebar.css";
import {
  RssFeed,
  Chat
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <Link to="/"><span className="sidebarListItemText">Feed</span></Link>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <Link to="/messenger"><span className="sidebarListItemText">Chats</span></Link>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
