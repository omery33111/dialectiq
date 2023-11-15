import axios, { AxiosRequestConfig } from "axios";
import { loginURL, registerURL } from "../../endpoints/endpoints";
import { Login, Register } from "../../models/Authentication";

const register = async (userData: Register) => {
    const myToken = JSON.parse(localStorage.getItem("token") as string);
    const accessToken = myToken ? myToken.access : "";
  
    const config: AxiosRequestConfig = {}; // Define the config object with AxiosRequestConfig type
  
    if (accessToken) {
      config.headers = { 'Authorization': `Bearer ${accessToken}` };
    }
    const response = await axios.post(registerURL, userData, config);
    return response.data;
};

const login = async (userData: Login) => {
    const response = await axios.post(loginURL, userData);

    if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data));
    }

    return response.data;
};

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_staff");
    localStorage.removeItem("userName");
    localStorage.removeItem("myID");
};



const authenticationService = {
    register,
    login,
    logout,
};

export default authenticationService;
