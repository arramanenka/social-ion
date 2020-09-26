export interface User {
    name: string;
    id: string;
    avatarUrl: string;
    followersAmount?: number;
    followingAmount?: number;
    bio?: string;
    userMeta?: UserMetaInf;
}

export interface UserMetaInf {
    isBlacklistedByQueryingPerson: boolean;
    isFollowedByQueryingPerson: boolean;
    isQueryingPersonBlacklisted: boolean;
    isFollowingQueryingPerson: boolean;
}
