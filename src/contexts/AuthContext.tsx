import { useContext } from "react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
  email: string | null;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid, email } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
          email,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid, email } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
        email,
      });
    }
  }
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}
