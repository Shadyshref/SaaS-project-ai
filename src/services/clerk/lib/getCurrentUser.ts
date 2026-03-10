import db from "@/drizzle/db";
import { UsersTable } from "@/drizzle/schema";
import { getUserIdTag } from "@/features/users/dbCache";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

export async function getCurrentUser({allData=false}={} ){
    const {userId,redirectToSignIn}= await auth();

    return{
        userId,
        redirectToSignIn,
        user:allData &&userId != null ? await getUser(userId):undefined
    }

}

export async function getUser(id:string) {
    "use cache"
    cacheTag(getUserIdTag(id))
    const user = await db.query.UsersTable.findFirst({
      where: eq(UsersTable.id, id),
    })
    return user;
  }
