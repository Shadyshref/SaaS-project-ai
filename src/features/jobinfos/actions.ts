"use server"

import z from "zod";
import { jobInfoFormSchema } from "./schema";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { redirect } from "next/navigation";
import { insertJobInfo ,updateJobInfo as updateJobInfoDb} from "./db";
import db from "@/drizzle/db";
import { and, eq } from "drizzle-orm";
import { JobInfoTable } from "@/drizzle/schema";
import { getInfoIdTag } from "./dbCache";
import { cacheTag } from "next/cache";


export async function CreateJobInfo(unSafeData:z.infer<typeof jobInfoFormSchema>){
    const {userId} = await getCurrentUser()
    if(userId ==null ) {
        return {
            error :true,
            message:"You don't have permission to do this"
        }
    }

    const {success,data}= await jobInfoFormSchema.safeParse(unSafeData)
    if (!success){
        return {
            error :true,
            message:"Invalid job data"
        }
    }
const jobInfo=  await insertJobInfo({...data,userId})
redirect(`/job-infos/${jobInfo.id}`)

}

export async function updateJobInfo(id:string,unSafeData:z.infer<typeof jobInfoFormSchema>){
    const {userId} = await getCurrentUser()
    if(userId ==null) {
        return {
            error :true,
            message:"You don't have permission to do this"
        }
    }

    const {success,data}= await jobInfoFormSchema.safeParse(unSafeData)
    if (!success){
        return {
            error :true,
            message:"Invalid job data"
        }
    }

    const existingJobInfo= await getJobInfo(id,userId)
    if(existingJobInfo ==null){
        return {
            error :true,
            message:"You don't have permission to do this"
        }
    }

const jobInfo=  await updateJobInfoDb(id,data)
redirect(`/job-infos/${jobInfo.id}`)

}



async function getJobInfo(id:string,userId:string){
    "use cache"
    cacheTag(getInfoIdTag(id))
    return  db.query.JobInfoTable.findFirst({
        where:and(eq(JobInfoTable.id,id),eq(JobInfoTable.userId,userId)),
        with:{user:true}
        
    })

}