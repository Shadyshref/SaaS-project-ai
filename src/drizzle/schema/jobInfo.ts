import {  pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { UsersTable } from "./user";
import { relations } from "drizzle-orm";
import { QuestionTable } from "./question";
import { InterviewTable } from "./interview";
export const experienceLevel=["junior","mid-level","senior" ] as const;


export type ExperienceLevel=(typeof experienceLevel)[number];

export const experienceLevelEnum=pgEnum("job_info_experince_level",experienceLevel);


export const JobInfoTable=pgTable("job_info",{
    id,
    title:varchar(),
    name:varchar().notNull(),
    experienceLevel:experienceLevelEnum().notNull(),
    description:varchar().notNull(),
    userId:varchar().references(()=>UsersTable.id,{onDelete:"cascade"}).notNull(),
    
    createdAt,
    updatedAt
})

export const jobInfoRelation=relations(JobInfoTable,({one,many})=>({
    user:one(UsersTable,{
        fields:[JobInfoTable.userId],
        references:[UsersTable.id]

    }),
    question:many(QuestionTable),
    interview:many(InterviewTable)

}))
