import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { redirect } from "next/navigation";
import {OnboardingClient} from "./_client";

export default async function OnboardingPage() {
   const {userId,user}=await getCurrentUser({allData:true}) 
   console.log({userId,user})

   if(userId ==null) return redirect("/")
    if(user !=null) return redirect("/app")

        return <div className=" container flex flex-col justify-center items-center gap-4 h-screen">

            <h1 className="text-4xl">Creating your account...</h1>
            <OnboardingClient userId={userId} />
        </div>
}