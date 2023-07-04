export interface Profile {
    email: string;
    firstName: string;
    lastName: string;
    phone: number;
    website: string;
}

export type Roles = 'admin' | 'user';

export type AuthData = {
    login: string;
    password: string;
};
