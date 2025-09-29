export interface UserData {
    user: User;
    token: string;
}

export interface User {
    id: number;
    entriescount: number;
    username: string;
    email: string;
    about: string;
    created_at: string;
    isLoaded: boolean;
}

export const getInitialUser = (): User => ({
    id: 0,
    entriescount: 0,
    username: '',
    email: '',
    about: '',
    created_at: '',
    isLoaded: false,
});