import { getGlobalTag, getIdTag, getUserTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";

export function getJobInfoGlobalTag(){
return getGlobalTag("jobInfos")

}

export function getInfoIdTag(id:string){
return getIdTag("jobInfos", id);

}

export function getJobInfoUserTag(userId:string){
return getUserTag(userId,"jobInfos")

}


export function revalidateJobInfoCache({id,userId }: { id: string; userId: string }) {
    revalidateTag(getJobInfoGlobalTag(), "max");
    revalidateTag(getJobInfoUserTag(userId), "max");
    revalidateTag(getInfoIdTag(id), "max");
}
