import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  Cancel,
} from "@material-ui/icons";
import { useEffect, useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import csc from "countries-states-cities";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [empty, setEmpty] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [friends, setFriends] = useState([]);
  const [geoLocations, setGeoLocations] = useState([]);
  const [locationName, setLocationName] = useState("Location");
  const [feeling, setFeeling] = useState({
    name: "Feelings",
    emoji: "😁"
  });

  const feelings = [
    {
      name: "happy",
      emoji: "😃"
    },
    {
      name: "excited",
      emoji: "🤩"
    },
    {
      name: "in love",
      emoji: "🥰"
    },
    {
      name: "sad",
      emoji: "😞"
    },
    {
      name: "busy",
      emoji: "😑"
    }
  ]

  const submitHandler = async (e) => {
    e.preventDefault();

    if (feeling.name === "Feelings" && locationName === "Location") {
      if (message === "" && file === null) {
        setEmpty(true);
      } else {
        const newPost = {
          userId: user._id,
          desc: desc.current.value
        };
        if (file) {
          const data = new FormData();
          const fileName = Date.now() + file.name;
          data.append("name", fileName);
          data.append("file", file);
          newPost.img = fileName;
          console.log(newPost);
          try {
            await axios.post("https://soshial.herokuapp.com/api/upload", data);
          } catch (err) {
            console.log(err);
          }
        }

        try {
          await axios.post("https://soshial.herokuapp.com/api/posts", newPost);
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      }
    } else if (locationName === "Location") {
      if (message === "" && file === null) {
        setEmpty(true);
      } else {
        const newPost = {
          userId: user._id,
          desc: desc.current.value,
          feeling: {
            name: feeling.name !== "Feelings" && feeling.name,
            emoji: feeling.emoji !== "😁" && feeling.emoji
          }
        };
        if (file) {
          const data = new FormData();
          const fileName = Date.now() + file.name;
          data.append("name", fileName);
          data.append("file", file);
          newPost.img = fileName;
          console.log(newPost);
          try {
            await axios.post("https://soshial.herokuapp.com/api/upload", data);
          } catch (err) {
            console.log(err);
          }
        }

        try {
          await axios.post("https://soshial.herokuapp.com/api/posts", newPost);
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      }
    } else if (feeling.name === "Feelings") {
      if (message === "" && file === null) {
        setEmpty(true);
      } else {
        const newPost = {
          userId: user._id,
          desc: desc.current.value,
          location: locationName !== "Location" && locationName
        };
        if (file) {
          const data = new FormData();
          const fileName = Date.now() + file.name;
          data.append("name", fileName);
          data.append("file", file);
          newPost.img = fileName;
          console.log(newPost);
          try {
            await axios.post("https://soshial.herokuapp.com/api/upload", data);
          } catch (err) {
            console.log(err);
          }
        }

        try {
          await axios.post("https://soshial.herokuapp.com/api/posts", newPost);
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      if (message === "" && file === null) {
        setEmpty(true);
      } else {
        const newPost = {
          userId: user._id,
          desc: desc.current.value,
          location: locationName !== "Location" && locationName,
          feeling: {
            name: feeling.name !== "Feelings" && feeling.name,
            emoji: feeling.emoji !== "😁" && feeling.emoji
          }
        };
        if (file) {
          const data = new FormData();
          const fileName = Date.now() + file.name;
          data.append("name", fileName);
          data.append("file", file);
          newPost.img = fileName;
          console.log(newPost);
          try {
            await axios.post("https://soshial.herokuapp.com/api/upload", data);
          } catch (err) {
            console.log(err);
          }
        }

        try {
          await axios.post("https://soshial.herokuapp.com/api/posts", newPost);
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      }

    }
  };

  const tagHandler = () => {
    setMessage("@")
  }

  const handleClick = async (user) => {
    const newFriends = friends.filter(f => f.username !== user);
    setFriends(newFriends);
    const name = message + "@" + user + " ";
    setMessage(name);
  }

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("https://soshial.herokuapp.com/api/users/friends/" + user._id);
      setFriends(res.data);
    }

    getFriends();
  }, [user._id]);

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
            value={message}
            onChange={(e) => { setMessage(e.target.value); setEmpty(false); }}
            list="usernames"
          />
          {empty && (
            <h6 className="empty">Message can't be empty</h6>
          )}
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => { setFile(e.target.files[0]); setEmpty(false); }}
              />
            </label>
            <Popup closeOnDocumentClick position="bottom center" trigger={<div onClick={tagHandler} className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>}>
              {friends.map(f => (
                <>
                  <h4 key={f.username} className="tagName" onClick={() => handleClick(f.username)}>{f.username}</h4>
                </>
              ))}
            </Popup>
            <Popup closeOnDocumentClick className="map" position="bottom center" trigger={<div className="shareOption">
              <Room onClick={() => setGeoLocations(csc.getAllCountries)} htmlColor="green" className="shareIcon" />
              <span onClick={() => setGeoLocations(csc.getAllCountries)} className="shareOptionText">{locationName}</span>
            </div>}>
              <h4 className="close" onClick={() => setLocationName("Location")}>X</h4>
              {geoLocations.map(g => (
                <h4 className="mapName" key={g.id} onClick={() => setLocationName(g.name)}>{g.name}</h4>
              ))}
            </Popup>
            <Popup closeOnDocumentClick position="bottom center" trigger={<div className="shareOption">
              <span className="shareIcon">{feeling.emoji}</span>
              <span className="shareOptionText">{feeling.name}</span>
            </div>}>
              <h4 className="close" onClick={() => setFeeling({
                name: "Feeling",
                emoji: "😁"
              })}>X</h4>
              {feelings.map(f => (
                <div className="feelingContainer" key={f.name}>
                  <div className="feelingEmoji">
                    <span>{f.emoji}</span>
                  </div>
                  <h4 className="feelingName" onClick={() => setFeeling({
                    name: f.name,
                    emoji: f.emoji
                  })}>{f.name}</h4>
                </div>
              ))}
            </Popup>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
