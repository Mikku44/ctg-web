import {
    onAuthStateChanged, signInWithEmailAndPassword, signOut,
    setPersistence, browserLocalPersistence, browserSessionPersistence
} from "firebase/auth";
import { auth } from "./config";
import { useEffect } from "react";
import { redirect, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

export async function loginWithEmail({ email, password, rememberMe }: { email: string; password: string; rememberMe: boolean }) {
    try {
        await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);

        const result = await signInWithEmailAndPassword(auth, email, password);
        return { user: result.user };
    } catch (error: any) {
        return { errorCode: error.code, errorMessage: error.message };
    }
}


export function signOutFromAdmin() {
    signOut(auth).then(() => {
        // Sign-out successful.
        toast("Signed out successfully");
        redirect("/admin/login");
    }).catch((error) => {
        // An error happened.
        toast(`Sign out failed: ${error.message}`);
        
    });
}


export function useAuthListener() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User logged in:", user.uid);

                if (location.pathname === "/admin/login") {
                    navigate("/admin");
                }
            } else {
                console.log("User is logged out");
                navigate("/admin/login");
            }
        });

        return () => unsubscribe();
    }, [location.pathname]);
}