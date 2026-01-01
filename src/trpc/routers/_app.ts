import { baseProcedure, createTRPCRouter } from "../init";
import { db } from "@/config";
import { user } from "@/db";

export const appRouter = createTRPCRouter({
  getUser: baseProcedure.query(() => {
    return db.select().from(user);
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
