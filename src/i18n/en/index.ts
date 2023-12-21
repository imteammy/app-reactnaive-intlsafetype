import type { Translation } from "../i18n-types";

const en = {
  // TODO: your translations go here
  common: {
    email: "Email",
    login: "Login",
    password: "Password",
    passwordConfirm: "Confirm Password",
    username: "Username",
    register: "Register",
    reset: {
      main: "reset",
    },
  },
  HI: "Hi {name}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n",
  validation: {
    invalidEmail: "Invalid email",
    required: "{field} is required",
    min: {
      string: "{name} must contain at least {min} character(s)",
    },
  },
} satisfies Translation;

export default en;
