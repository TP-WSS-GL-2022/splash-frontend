import { doc, getDoc } from "firebase/firestore";
import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { User } from "../models";
import { Users } from "../models/User";
import { auth } from "../util/firebase";

export const UserContext = createContext<User | null>(null);

export const UserProvider: FC<PropsWithChildren<{}>> = props => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async authUser => {
            if (!authUser) {
                setUser(null);
                console.log("User logged out");
                return;
            }

            const snap = await getDoc(doc(Users, authUser.uid));
            setUser(snap.data()!);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        if (user) {
            console.log("User logged in", user);
        }
    }, [user]);

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    );
};
