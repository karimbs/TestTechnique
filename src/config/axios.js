import axios from "axios";
import { HOST } from "./constant";
axios.defaults.headers.authorization = "Bearer 8c5ba20bc481c4d2803325833a5cf54771f6ba45";
export default axios.create({
    baseURL:HOST
});