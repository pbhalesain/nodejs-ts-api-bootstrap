import { object, string } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "name is required",
    }),
    password: string({
      required_error: "password is required",
    }).min(8, "password must be at least 8 characters"),
    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }).min(8, "passwordConfirmation must be at least 8 characters"),
    email: string({
      required_error: "email is required",
    }).email("email must be a valid email address"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "password and passwordConfirmation must match",
    path: ["password", "passwordConfirmation"],
  }),
});
