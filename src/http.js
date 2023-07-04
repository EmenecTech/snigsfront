import axios from "axios";

export default axios.create({
    baseURL: "https://snigsbackend.com/api",
    headers: {
        "Content-type": "application/json"
    }
})
