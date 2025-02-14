import axios from "axios";
import { User } from "./types";
import { baseURL } from "globals/server";

export const fetchUserData = async (
  username: string,
  password: string,
): Promise<User> => {
  const response = await axios.get(`${baseURL}/users`, {
    params: {
      username,
      password,
    },
  });

  return response.data[0] as User;
};
