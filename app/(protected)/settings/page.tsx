"use server"
import { auth } from "@/auth"
import { Session } from "next-auth"

const SettingsPage = async() => {
    const session : Session | null = await auth()
    return(
        <div>
            <p>data from user authenticate</p>
            {JSON.stringify(session)}
        </div>
    )
}

export default SettingsPage;