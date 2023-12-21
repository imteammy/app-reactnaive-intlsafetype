import _ from 'lodash';
import { useI18nContext } from 'src/i18n/i18n-react';
import { z } from 'zod';

export interface Register {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  termsAgree: boolean;
}

export const registerSchema = () => {
  const { LL } = useI18nContext();
  const usernameErr = LL.validation.min.string({ name: _.upperFirst(LL.common.username()), min: 6 });
  const passwordErr = LL.validation.min.string({ name: _.upperFirst(LL.common.email()), min: 8 });
  const emailErr = LL.validation.required({ field: _.upperFirst(LL.common.email()) });
  const passwordCErr = LL.validation.min.string({ name: _.upperFirst(LL.common.passwordConfirm()), min: 8 });
  return z
    .object({
      username: z
        .string({
          invalid_type_error: usernameErr,
          required_error: usernameErr,
        })
        .min(6, usernameErr),
      email: z
        .string({
          required_error: emailErr,
        })
        .email(),
      password: z
        .string({
          invalid_type_error: passwordErr,
          required_error: passwordErr,
        })
        .min(8, passwordErr),
      passwordConfirm: z
        .string({
          invalid_type_error: passwordCErr,
          required_error: passwordCErr,
        })
        .min(8, passwordErr),
      termsAgree: z
        .boolean({
          required_error: 'Required Agreed Terms',
          invalid_type_error: 'Required Agreed Terms',
        })
        .refine((v) => v === true, { message: 'Agreed Terms is required' }),
    })
    .superRefine((v, ctx) => {
      if (v.password !== v.passwordConfirm) {
        ctx.addIssue({
          message: 'Password do not match',
          code: 'custom',
          path: ['passwordConfirm'],
        });
        return v;
      }
      return v;
    });
};
