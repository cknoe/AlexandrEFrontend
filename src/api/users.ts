import { apiFecth } from "./client"

type UserDTO = {
    id: number
    username: string
    role: string
}

export type ApiUserResponse = {
    userDTO: UserDTO
    token: string
}

export async function apiMe() {
    return await apiFecth('/users', {
        method: 'GET'
    }
    )
}

export async function apiModifyUser(username: string, password: string): Promise<ApiUserResponse> {
    return await apiFecth('/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })}
    )
}