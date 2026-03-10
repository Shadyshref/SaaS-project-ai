type CacheTag="users"|"jobInfos"|"interviews"|"questions"

export  function getGlobalTag (tag:CacheTag){
    return `global:${tag}` as const
}


export function getUserTag(UserId:string,tag:CacheTag){
    return `user:${UserId}:${tag}` as const
}


export function getIdTag(tag:CacheTag,id:string){
    return `id:${id}:${tag}` as const
}