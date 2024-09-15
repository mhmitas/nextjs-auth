import { signIn } from '@/auth'
import React from 'react'

function Oauth2() {
    return (
        <div>
            <form
                action={async () => {
                    "use server"
                    await signIn("google")
                }}
            >
                <button type="submit">Signin with Google</button>
            </form>
        </div>
    )
}

export default Oauth2