import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const axiosIns = axios.create({
    baseURL,
    withCredentials: true,
})

axiosIns.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const Login = async (username, password) => {
    try {
        const response = await axiosIns.post("/user/login", { username, password });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const Register = async (username, email, password, role) => {
    try {
        const response = await axiosIns.post("/user/register", { username, email, password, role });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const Logout = async () => {
    try {
        const response = await axiosIns.post("/user/logout");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const Upload = async (image) => {
    try {
        const response = await axiosIns.post("/image/upload", image, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const DeleteImage = async (Id) => {
    try {
        const response = await axiosIns.delete(`/image/delete/${Id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const UpdateImage = async (Id, caption) => {
    try {
        const response = await axiosIns.put(`/image/update/${Id}`, { caption });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GetAllImage = async () => {
    try {
        const response = await axiosIns.get("/image/all");
        return response.data;
    } catch (error) {
        throw error;
    }
}