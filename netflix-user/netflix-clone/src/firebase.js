import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyBIAgHv4fgw55Hb-rVEy7cvGasVnlEuHZw",
    authDomain: "netflix-clone-e31a0.firebaseapp.com",
    projectId: "netflix-clone-e31a0",
    storageBucket: "netflix-clone-e31a0.appspot.com",
    messagingSenderId: "684791802666",
    appId: "1:684791802666:web:11f7ee018235597cbccc53"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        });
    } catch (error) {
        console.error("Error signing up:", error.message);
        if (error.code === 'auth/email-already-in-use') {
            toast.error(error.code.split('/')[1].split('-').join(" "));

        } else {
            toast.error(error.code.split('/')[1].split('-').join(" "));
        }
    }
};

export const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error logging in:", error.message);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

export const logout = () => {
    signOut(auth)
        .then(() => {
            console.log("User signed out successfully");
        })
        .catch((error) => {
            console.error("Error signing out:", error.message);
            //   alert(error.message);
            toast.error(error.code.split('/')[1].split('-').join(" "));

        });
};
