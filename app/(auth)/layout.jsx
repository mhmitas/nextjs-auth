import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import React from 'react'

const layout = async ({ children }) => {

    const session = await auth()

    return (
        <div>
            {children}
            <div className="fixed top-0 right-0 z-50 m-1 p-4 border rounded-lg bg-background/50 cursor-default">
                {session?.user ?
                    <>
                        <h3>{session.user.email}</h3>
                        <form
                            action={async () => {
                                "use server"
                                await signOut()
                            }}
                        >
                            <Button>Sign Out</Button>
                        </form>
                    </>
                    :
                    <div>Please sign in</div>
                }
            </div>
        </div>
    )
}

export default layout