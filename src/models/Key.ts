import { collection, CollectionReference, DocumentReference } from "firebase/firestore"

import { fs } from "../util/firebase"

export interface Key {
    ref: DocumentReference<Key>;
    secret: string;
}

export const Keys = collection(fs, "keys") as CollectionReference<Key>;
