import axios, { AxiosResponse } from "axios";
import { User } from "../interfaces";

const API_URL = process.env.NODE_ENV === "production"
? "https://talku-talku-v3-server.vercel.app"
: "http://localhost:5000";

// Two interfaces, ILogin and ISetAvatar, are defined to specify the expected response data types for certain API calls. few notes to rookies, in "status?: boolean" indicates that the status property is optional. This means that an object that implements this interface may or may not include the status property.
interface ILogin {
  status?: boolean;
  user?: User;
  msg?: string;
}

interface ISetAvatar {
  image: string;
  isSet: boolean;
}

export const host = `${API_URL}`;

const API = axios.create({
  baseURL: host,
});

export const signUp = (FormData: {
  password: string;
  username: string;
  email: string;
}) => API.post("/api/auth/register", FormData);

export const login = (FormData: {
  password: string;
  username: string;
  // Expects a response that matches the ILogin interface.
}): Promise<AxiosResponse<ILogin>> => API.post("/api/auth/login", FormData);

export const setProfileAvatar = (
  id: string,
  avatar: string
): Promise<AxiosResponse<ISetAvatar>> =>
  API.post(`/api/auth/setAvatar/${id}`, { image: avatar });

// getAllUsers: Sends a GET request to /api/auth/allUsers/{currentUserId}to get a list of all users except the current user (currentUserId. Expects a response that contains an array of User objects.
export const getAllUsers = (
  currentUserId: string
): Promise<AxiosResponse<User[]>> =>
  API.get(`/api/auth/allUsers/${currentUserId}`);

// sendMessage: Sends a POST request to  /api/messages/addMessage with form data containing from (sender ID), to (recipient ID), message, and an optional image URL. Does not expect a response.
export const sendMessage = (
  from: string,
  to: string,
  message: string,
  image: string = ""
) => {
  API.post(`/api/messages/addMessage`, { from, to, message, image });
};

export const getAllMessages = (from: string, to: string) =>
  API.post(`api/messages/getMessages`, { from, to });
