export interface Course {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
}

export interface AdminProfile {
    id?: string;
    name: string;
    background: string;
    profilePictureUrl: string;
}
