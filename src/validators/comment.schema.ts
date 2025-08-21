import z from "zod";

export const commentDataSchema = z.object({
  id: z.string().optional(),
  content: z.string().min(1, { message: "Comment wajib di isi" }),
  taskId: z.string(),
});

export type CommentDataSchema = z.infer<typeof commentDataSchema>;
