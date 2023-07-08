import { API_ENDPOINT } from "../configuration/settings";
import axios from "axios";

export const axiosAPIHandler = axios.create({ baseURL: API_ENDPOINT });