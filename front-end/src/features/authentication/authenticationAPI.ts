import axios from "axios";
import { loginURL, registerURL } from "../../endpoints/endpoints";
import { Login, Register } from "../../models/Authentication";

const register = async (userData: Register) => {
    const response = await axios.post(registerURL, userData);
    console.log(response.data);
    return response.data;
};

const login = async (userData: Login) => {
    const response = await axios.post(loginURL, userData);

    if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data));
        setupLogoutTimer(); // Set up the logout timer
    }

    return response.data;
};

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_staff");
    localStorage.removeItem("userName");
};

// Function to set up the logout timer
const setupLogoutTimer = () => {
    const logoutTimeout = 10 * 1000; // 10 seconds in milliseconds
    let timerId: NodeJS.Timeout | null = null;

    // Clear the existing timer if present
    if (timerId) {
        clearTimeout(timerId);
    }

    // Set up a new timer
    timerId = setTimeout(() => {
        logout();
        timerId = null;
    }, logoutTimeout);
};

const authenticationService = {
    register,
    login,
    logout,
};

export default authenticationService;
