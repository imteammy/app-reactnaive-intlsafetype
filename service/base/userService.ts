import axios from "../axios";
import UserServiceAbstacts from "./abstracts";

class UserServiceClass implements UserServiceAbstacts {
  login = async (user: { username: string; password: string }): Promise<{ token: string; success: boolean }> => {
    try {
      type Res = {
        token: string;
        success: boolean;
      };
      const res = await axios().post<Res>("/login", user);
      return {
        token: res.data.token,
        success: res.data.success,
      };
    } catch (error) {
      console.log(error);
      // throw error;
      return {
        success: false,
        token: "",
      };
    } finally {
      console.log("error at /login");
    }
  };
  register = async (user: { email?: string | undefined; username: string; password: string }): Promise<boolean> => {
    try {
      const res = await axios().post("/login", user);
      console.log("🚀 ~ file: abstracts.ts:29 ~ UserServiceClass ~ register= ~ res:", res);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      console.log("err");
    }
  };
  deleteUser?: ((user: { username: string; userId: string }) => Promise<boolean>) | undefined;
  updatePassword?: ((value: { userId: string; oldPassword: string; newPassword: string }) => Promise<boolean>) | undefined;
}

const userService = new UserServiceClass();
export default userService;
