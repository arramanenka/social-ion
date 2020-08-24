export interface User {
    name: string;
    id: string;
    avatarUrl: string;
    followerAmount?: number;
    followingAmount?: number;
    bio?: string;
}
