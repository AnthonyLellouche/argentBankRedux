// src/components/Profil.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../features/auth/authSlice";

const Profil = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      console.log("User Profile:", user);
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const profile = user?.profile?.body;

  return (
    <div>
      <h1>Profile Page</h1>
      {profile ? (
        <div>
          <p>Email: {profile.email}</p>
          <p>Username: {profile.userName}</p>
          {/* Affichez d'autres informations du profil si nécessaire */}
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
};

export default Profil;
