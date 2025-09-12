import { apiFecthNonAuthenticated } from "./client"

export async function apiLogin(username: string, password: string) {
    return await apiFecthNonAuthenticated('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })}
    )
}