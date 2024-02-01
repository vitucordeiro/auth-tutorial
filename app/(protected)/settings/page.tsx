import { auth, signOut} from "@/auth"
import { Session } from "next-auth"

const SettingsPage = async() => {
    const session : Session | null = await auth()
    return(
        <div>
            <p>data from user authenticate</p>
            {JSON.stringify(session)}
            <form action={ async() => {
                "use server";

                await signOut();
            }}>
                <button>signOut</button>
            </form>
        </div>
    )
}

export default SettingsPage;