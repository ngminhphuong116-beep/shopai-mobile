import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Tên đăng nhập phải ít nhất 3 ký tự'),

  phone: z
    .string()
    .min(9, 'Số điện thoại không hợp lệ'),
});