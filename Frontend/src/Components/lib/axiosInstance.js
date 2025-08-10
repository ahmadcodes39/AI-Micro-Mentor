import axios from"axios"

const api = axios.create({
    baseURL:"https://ai-micro-mentor-fod5.vercel.app/api",
    withCredentials:true,
})

export default api