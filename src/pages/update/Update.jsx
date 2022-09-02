import "./update.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Cancel, Label, PermMedia, Room } from "@material-ui/icons";
import Popup from "reactjs-popup";
import csc from "countries-states-cities";
import Ads from "../../components/ads/Ads";

export default function Update() {
    const history = useHistory();
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState();
    const [newFile, setNewFile] = useState();
    const [message, setMessage] = useState("");
    const [friends, setFriends] = useState([]);
    const [geoLocations, setGeoLocations] = useState([]);
    const [locationName, setLocationName] = useState("");
    const [feeling, setFeeling] = useState({
        name: "",
        emoji: ""
    });

    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get(`https://soshial.herokuapp.com/api/posts/${id}`);
            console.log(res);
            setMessage(res.data.desc);
            setLocationName(res.data.location);
            setFeeling({
                name: res.data.feeling.name,
                emoji: res.data.feeling.emoji
            });
            setNewFile(res.data.img);
        }

        fetchPost();
    }, [id]);

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

    const submitHandler = async (e) => {
        e.preventDefault();

        if (feeling.name === "Feelings" && locationName === "Location") {
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
                await axios.put(`https://soshial.herokuapp.com/api/posts/${id}`, newPost);
                history.push(`/post/${id}`);
            } catch (err) {
                console.log(err);
            }
        } else if (locationName === "Location") {
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
                await axios.put(`https://soshial.herokuapp.com/api/posts/${id}`, newPost);
                history.push(`/post/${id}`);
            } catch (err) {
                console.log(err);
            }
        } else if (feeling.name === "Feelings") {
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
                await axios.put(`https://soshial.herokuapp.com/api/posts/${id}`, newPost);
                history.push(`/post/${id}`);
            } catch (err) {
                console.log(err);
            }
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
                await axios.put(`https://soshial.herokuapp.com/api/posts/${id}`, newPost);
                history.push(`/post/${id}`);
            } catch (err) {
                console.log(err);
            }
        }
    };

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get("https://soshial.herokuapp.com/api/users/friends/" + user._id);
            setFriends(res.data);
        }

        getFriends();
    }, [user._id]);

    const handleClick = async (user) => {
        const newFriends = friends.filter(f => f.username !== user);
        setFriends(newFriends);
        const name = message + "@" + user + " ";
        setMessage(name);
    }

    const tagHandler = () => {
        setMessage("@")
    }

    return (
        <>
            <Topbar />
            <div className="updateContainer">
                <div className="side">
                    <Sidebar />
                </div>
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
                            onChange={(e) => setMessage(e.target.value)}
                            list="usernames"
                        />
                    </div>
                    <hr className="shareHr" />
                    {newFile && (
                        <div className="shareImgContainer">
                            <img className="shareImg" src={PF + newFile} alt="" />
                            <Cancel className="shareCancelImg" onClick={() => setNewFile(null)} />
                        </div>
                    )}
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
                                    onChange={(e) => { setFile(e.target.files[0]); setNewFile(null) }}
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
                            Update
                        </button>
                    </form>
                </div>
                <div className="adsContainer">
                    {adsDetail.map(a => (
                        <Ads key={a.desc} ad={a} />
                    ))}
                </div>
            </div>
        </>
    )
}
