import axios from "axios"
import { HOST } from "@/utils/constants"

const apliclient = axios.create({
    baseURL: HOST,
})