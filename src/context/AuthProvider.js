import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from "../supabase";

//Maybe add React.createContext if this doesnt work
const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const signIn = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

const signOut = () => supabase.auth.signOut();

const passwordReset = (email) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/update-password"
  });

const updatePassword = (updatePassword) =>
  supabase.auth.updatePassword({ password: updatePassword });

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);
      setAuth(currentUser ? true : false);
      setLoading(false);
    };
    getUser();
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY"){
        setAuth(false);
      } else if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        auth, 
        user, 
        signIn, 
        signOut, 
        passwordReset, 
        updatePassword
      }}>
      {!loading && children}  
    </AuthContext.Provider>
  );
};

export default AuthProvider;