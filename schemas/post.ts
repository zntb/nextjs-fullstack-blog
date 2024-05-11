import * as z from 'zod';

const requiredString = z.string().min(1, 'Required');

export const categoryTypes = [
  'style',
  'fashion',
  'food',
  'culture',
  'travel',
  'coding',
];

export const PostSchema = z.object({
  title: z
    .string()
    .min(3, 'Title is too short!')
    .max(100, 'Title is too long!'),
  desc: z.string().min(3, 'Description is too short!'),
  img: z.optional(z.string()),
  catSlug: requiredString.refine((value) => categoryTypes.includes(value), {
    message: 'Category is required',
  }),
});

export type CreatePostValues = z.infer<typeof PostSchema>;
