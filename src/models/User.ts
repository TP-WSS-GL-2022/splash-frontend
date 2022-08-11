import {
    collection,
    CollectionReference,
    DocumentReference,
} from "firebase/firestore";
import { createContext } from "react";
import { fs } from "../util/firebase";

export interface SocialPlatforms {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    tiktok?: string;
}

export interface User {
    id: DocumentReference<User>;
    username: string;
    photo?: string;
    followerCount: number;
    following: DocumentReference<User>[];
    bio: string;
    social: SocialPlatforms;
}

export const Users = collection(fs, "users") as CollectionReference<User>;
