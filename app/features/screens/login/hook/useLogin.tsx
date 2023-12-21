/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Login, loginSchema } from "./schema";
import { userService } from "@/service/base";
import { zodResolver } from "@hookform/resolvers/zod";

export function transformObject(original: any): any {
  const transformed: Record<string, unknown> = {};
  for (const key in original) {
    if (Object.prototype.hasOwnProperty.call(original, key)) {
      const values = original[key];
      transformed[key] = { message: values ? values?.join(", ") : undefined };
    }
  }
  return transformed;
}

function useLogin() {
  const schemaLogin = loginSchema();
  const form = useForm<Login>({
    // resolver(v) {
    //   try {
    //     schemaLogin.parse(v);
    //     return {
    //       errors: undefined,
    //       values: v,
    //     };
    //   } catch (error) {
    //     if (error instanceof ZodError) {
    //       const transformedErrors = transformObject(error?.flatten().fieldErrors);
    //       return {
    //         errors: transformedErrors,
    //         values: v,
    //       };
    //     }
    //     return {
    //       errors: undefined,
    //       values: v,
    //     };
    //   }
    // },
    resolver: zodResolver(schemaLogin),
  });
  const submit = async (data: Login): Promise<void> => {
    const res = await userService.deleteUser?.({ userId: "0", username: data.username });
    console.log(res);
  };
  return {
    form,
    onsubmit() {
      form.handleSubmit(
        (data) => {
          submit(data);
        },
        (err) => {
          console.error(err);
        }
      )();
    },
  };
}

export default useLogin;
