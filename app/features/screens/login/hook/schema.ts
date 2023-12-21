import * as _ from 'lodash'
import { useI18nContext } from "src/i18n/i18n-react";
import { z } from "zod";

export type Login = {
  username: string;
  password: string;
};

export const createLoginSchema = () => {
  const { LL } = useI18nContext();
  const usernameReq = LL.validation.required({ field: _.upperFirst(LL.common.username()) });
  const passwordReq = LL.validation.required({ field: _.upperFirst(LL.common.password()) });
  return z.object({
    username: z
      .string({
        invalid_type_error: usernameReq,
        required_error: usernameReq,
      })
      .min(1, usernameReq),
    password: z.string({ invalid_type_error: passwordReq, required_error: passwordReq }).min(1, passwordReq),
  });
};
export const loginSchema = createLoginSchema;
