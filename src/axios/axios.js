import axios from "axios";

const instance = axios.create({ baseURL: "https://soshial.herokuapp.com/api" });

export default instance;