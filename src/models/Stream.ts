import {
    collection,
    CollectionReference,
    DocumentReference,
} from "firebase/firestore";
import { fs } from "../util/firebase";
import { User } from "./User";

export interface Stream {
    id: DocumentReference<Stream>;
    title: string;
    categories: string[];
    startedAt?: Date;
    endedAt?: Date;
    nmsId: string;
    streamerId: DocumentReference<User>;
}

export const Streams = collection(fs, "streams") as CollectionReference<Stream>;
