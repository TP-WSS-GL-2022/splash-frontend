import {
    collection,
    CollectionReference,
    DocumentReference,
} from "firebase/firestore";
import { fs } from "../util/firebase";
import { User } from "./User";

export interface Message {
    authorRef: DocumentReference<User>;
    content: string;
    createdAt: Date;
}

export const Messages = collection(fs, "messages") as CollectionReference<Message>;
