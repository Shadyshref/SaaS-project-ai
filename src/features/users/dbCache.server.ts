import "server-only";

import { revalidateTag } from "next/cache";
import { getUserGlobalTag, getUserIdTag } from "./dbCache";

export function revalidateUserCache(id: string) {
  revalidateTag(getUserGlobalTag(), "max");
  revalidateTag(getUserIdTag(id), "max");
}
