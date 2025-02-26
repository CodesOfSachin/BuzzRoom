import axios from "axios";
import { HOST } from "/utils/constants";

export const apliclient = axios.create({
    baseURL: HOST,
});

 