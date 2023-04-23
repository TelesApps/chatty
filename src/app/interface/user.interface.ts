export interface User {
    userId: string;
    userName: string;
    email: string;
    emailVerified: boolean;
    photoUrl?: string;
}

export function CreateUser(userId: string, userName: string, email: string, emailVerified: boolean = false, photoUrl?: string): User {
    const player: User = {
        userId,
        userName,
        email,
        emailVerified,
        photoUrl
    }
    return player;
}