'use server'

import { cookies } from "next/headers"


export async function logoutUserAction() {
    try {
        (await cookies()).delete('token', {path: '/'});
        return{
            success: "Logout successful",
            staus: 200
        }
    } catch (e) {
        return{
            error: "Failed to logout! Try again after some time.",
            status: 500
        }
    }
}