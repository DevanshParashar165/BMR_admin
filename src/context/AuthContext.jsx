import { createContext, useContext, useState } from 'react'
import { Login, Register, Logout } from '../services/apiService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Failed to parse stored user", error);
            return null;
        }
    })

    const login = async (username, password) => {
        const response = await Login(username, password)
        setUser(response.user)
        if (response.user) {
            localStorage.setItem("user", JSON.stringify(response.user))
        }
        if (response.token) {
            localStorage.setItem("token", response.token)
        }
    }

    const register = async (username, email, password, role) => {
        const response = await Register(username, email, password, role)
        setUser(response.user)
        if (response.user) {
            localStorage.setItem("user", JSON.stringify(response.user))
        }
        if (response.token) {
            localStorage.setItem("token", response.token)
        }
    }

    const logout = async () => {
        try {
            await Logout()
        } catch (error) {
            console.error("Logout failed on server:", error)
        } finally {
            setUser(null)
            localStorage.removeItem("user")
            localStorage.removeItem("token")
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}