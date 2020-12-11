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
    blacklistedByQueryingPerson?: boolean;
    followedByQueryingPerson?: boolean;
    queryingPersonBlacklisted?: boolean;
    followingQueryingPerson?: boolean;
}

export interface UserRecommendation {
    user: User;
    depthOfConnection: number;
}
