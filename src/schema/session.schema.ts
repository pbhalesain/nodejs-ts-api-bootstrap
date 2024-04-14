import { object, string } from "zod";

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: "email is required",
    }).email("email must be a valid email address"),
    password: string({
      required_error: "password is required",
    }).min(8, "password must be at least 8 characters"),
  }),
});
