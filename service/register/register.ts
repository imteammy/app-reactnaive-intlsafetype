import axios from "../axios";

export const registerService = async ({ password, username }: { username: string; password: string }): Promise<boolean> => {
  try {
    const response = await axios()<{
      success?: boolean;
    }>({
      url: "/register",
      method: "POST",
      data: {
        username,
        password,
      },
    });

    const result = response.data?.success ?? false;
    return result;
  } catch (error) {
    return false;
  }
};
