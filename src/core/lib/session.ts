"use server";

import { cookies } from "next/headers";

/**
 * Get the authentication token from cookies
 * Token validation is handled by the backend
 */
export const getSession = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token_h");

    if (!token) {
        return null;
    }

    return { token };
};

/**
 * Get just the token value (convenience helper)
 */
export const getToken = async () => {
    const cookieStore = await cookies();
    return cookieStore.get("token_h")?.value || null;
};

/**
 * Clear the session (logout)
 */
export const clearSession = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("token_h");
};

/**
 * Set the session token (after login)
 */
export const setSessionToken = async (token: string) => {
    const cookieStore = await cookies();
    cookieStore.set("token_h", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });
};
