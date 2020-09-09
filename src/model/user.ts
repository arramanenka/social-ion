export interface User {
    name: string;
    id: string;
    avatarUrl: string;
    followerAmount?: number;
    followingAmount?: number;
    bio?: string;
    userMeta?: UserMetaInf;
}

export interface UserMetaInf {
    isBlacklisted: boolean;
    /**
     * is obtained user followed by querying user
     */
    isFollowed: boolean;
}
