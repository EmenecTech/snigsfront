import axios from "axios";

export default axios.create({
    baseURL: "http://snigsbackend.com/api",
    headers: {
        "Content-type": "application/json"
    }
})
