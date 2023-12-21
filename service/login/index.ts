import { Login } from "@/screens/login/hook";
import axios from "../axios";

export async function logInService({ username, password }: Login): Promise<{ success: boolean; token: string }> {
  try {
    const res = (
      await axios()<{
        success: boolean;
        token: string;
      }>({
        url: "/login",
        data: {
          username,
          password,
        },
      })
    ).data;

    return {
      success: res.success,
      token: res.token,
    };
  } catch (error) {
    return {
      success: true,
      token: "",
    };
  } finally {
    console.log("error /login");
  }
}
