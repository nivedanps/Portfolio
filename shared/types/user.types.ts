import type { z } from "zod";
import type { users, insertUserSchema } from "../schemas/user.schema";

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

