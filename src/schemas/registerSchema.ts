import { z } from "zod";

export const registerSchema = z.object({

  username: z
    .string()
    .min(3, "Tên phải ít nhất 3 ký tự"),

  phone: z
    .string()
    .min(9, "Số điện thoại không hợp lệ"),

  email: z
    .string()
    .email("Email không hợp lệ")

});