
import axios from "axios";

export const bitblogApi = axios.create({
  baseURL: "http://localhost:3000/api/v1",

})