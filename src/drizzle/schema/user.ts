import {  pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { JobInfoTable } from "./jobInfo";

export const UsersTable=pgTable("users",{
    id:varchar().primaryKey(),
    name:varchar().notNull(),
    email:varchar().notNull().unique(),
    imageUrl:varchar().notNull(),
    createdAt,
    updatedAt
})


export const userRelation=relations(UsersTable,({many})=>({
    jobInfo:many(JobInfoTable)
}))