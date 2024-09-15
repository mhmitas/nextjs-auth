"use client"
import React from 'react'

export const UserSessionLogClient = ({ session }) => {
    console.log(session?.user);
    return (
        <div>UserSessionLogClient</div>
    )
}
