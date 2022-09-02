import axios from "axios";

const instance = axios.create({ baseURL: "https://soshial.herokuapp.com" });

export default instance;